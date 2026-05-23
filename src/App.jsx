import React, { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import {
  Search, X, Heart, Droplet, Sprout, Stethoscope, Activity, Brain,
  Siren, MapPin, Download, GraduationCap, Accessibility,
  Home, Utensils, ChevronLeft, ChevronRight
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { COUNTRY_DATA, PROGRAMS as PROGRAMS_BASE, PROGRAM_UNITS, PHOTO_MANIFEST, countrySlug } from './countryData';

// ============================================================
// HHRD GLOBAL IMPACT - ICNA 2026 Booth
// Target hardware: 1920x1080 Android touchscreen, web-based delivery via Vercel.
// Data lives in countryData.js. Photo files in public/photos/{slug}/{CODE}_{n}.jpg.
// ============================================================

// Map iconName strings (set in countryData.js) to imported lucide components.
// To add a program: import the icon, register it here, and reference iconName there.
const ICON_MAP = {
  Heart, GraduationCap, Accessibility, Droplet, Sprout, Home, Activity,
  Stethoscope, Siren, Utensils, Brain
};

// Resolve the Icon component for each program code on first import.
const PROGRAMS = Object.fromEntries(
  Object.entries(PROGRAMS_BASE).map(([code, p]) => [code, { ...p, Icon: ICON_MAP[p.iconName] }])
);

const COUNTRIES = COUNTRY_DATA;

// Lookup helpers. These hit a small in-memory array, so cost is negligible.
function getProgram(countryName, code) {
  const c = COUNTRIES.find(x => x.name === countryName);
  if (!c) return null;
  return c.programs.find(p => p.code === code) || null;
}

function getStories(countryName) {
  const c = COUNTRIES.find(x => x.name === countryName);
  if (!c) return [];
  return c.programs
    .filter(p => p.story)
    .map(p => ({
      quote: p.story.quote,
      attribution: p.story.attribution,
      programCode: p.code
    }));
}

function getMetric(countryName, code) {
  const p = getProgram(countryName, code);
  if (!p) return { value: "—", unit: PROGRAM_UNITS[code] || "active", cumulative: false };
  return { value: p.beneficiaries, unit: PROGRAM_UNITS[code] || "active", cumulative: !!p.cumulative };
}

// Resolve photo paths for a given country+program. Returns paths or [] if none manifested.
function getPhotoPaths(countryName, code) {
  const key = `${countryName}|${code}`;
  const n = PHOTO_MANIFEST[key];
  if (!n || n < 1) return [];
  const slug = countrySlug(countryName);
  return Array.from({ length: n }, (_, i) => `/photos/${slug}/${code}_${i + 1}.jpg`);
}

// TopoJSON decoder. Identical to the original; world-atlas ships topojson and d3-geo
// works with plain GeoJSON, so we convert on load.
function topoToGeoJSON(topology, objectName = "countries") {
  const obj = topology.objects && topology.objects[objectName];
  if (!obj || !obj.geometries) return { type: "FeatureCollection", features: [] };
  const arcs = topology.arcs;
  const tx = topology.transform;
  function decodeArc(arcIdx) {
    const reversed = arcIdx < 0;
    const arc = arcs[reversed ? ~arcIdx : arcIdx];
    const out = [];
    if (tx) {
      let prevX = 0, prevY = 0;
      for (let i = 0; i < arc.length; i++) {
        prevX += arc[i][0]; prevY += arc[i][1];
        out.push([prevX * tx.scale[0] + tx.translate[0], prevY * tx.scale[1] + tx.translate[1]]);
      }
    } else for (let i = 0; i < arc.length; i++) out.push([arc[i][0], arc[i][1]]);
    if (reversed) out.reverse();
    return out;
  }
  function decodeLine(arcIdxs) {
    const pts = [];
    for (let i = 0; i < arcIdxs.length; i++) {
      const seg = decodeArc(arcIdxs[i]);
      if (i > 0) seg.shift();
      for (let j = 0; j < seg.length; j++) pts.push(seg[j]);
    }
    return pts;
  }
  function decodePolygon(rings) { return rings.map(decodeLine); }
  function decodeGeometry(g) {
    if (!g) return null;
    switch (g.type) {
      case "Polygon":         return { type: "Polygon",         coordinates: decodePolygon(g.arcs) };
      case "MultiPolygon":    return { type: "MultiPolygon",    coordinates: g.arcs.map(decodePolygon) };
      case "LineString":      return { type: "LineString",      coordinates: decodeLine(g.arcs) };
      case "MultiLineString": return { type: "MultiLineString", coordinates: g.arcs.map(decodeLine) };
      default: return null;
    }
  }
  return {
    type: "FeatureCollection",
    features: obj.geometries.map(g => ({
      type: "Feature", id: g.id, properties: g.properties || {}, geometry: decodeGeometry(g)
    })).filter(f => f.geometry)
  };
}

// ============================================================
// Light theme palette
// ============================================================

const COLORS = {
  bg: "#ffffff",
  bgSubtle: "#f7f8fb",
  bgOverlay: "rgba(247, 248, 251, 0.92)",
  panel: "#ffffff",
  panelBorder: "#e2e8f0",
  panelBorderStrong: "#cbd5e1",
  shadowSoft: "0 10px 30px -8px rgba(12, 35, 64, 0.15), 0 4px 10px -4px rgba(12, 35, 64, 0.08)",
  shadowPop: "0 24px 50px -12px rgba(12, 35, 64, 0.22), 0 8px 18px -6px rgba(12, 35, 64, 0.12)",
  ocean: "#0c2340",
  oceanLight: "#1e3a5f",
  countryInactive: "#c4d0e0",
  countryInactiveStroke: "#94a5bd",
  countryActive: "#ffffff",
  countryActiveStroke: "#e63946",
  graticule: "#264769",
  pinCore: "#e63946",
  pinDot: "#ffffff",
  textPrimary: "#0c2340",
  textSecondary: "#475569",
  textMuted: "#94a3b8",
  accent: "#e63946",
  accentHover: "#dc2626",
  navy: "#0c2340",
  navyMid: "#1e3a5f"
};

const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Outfit:wght@300;400;500;600;700&display=swap";

const TOPOJSON_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const TOPOJSON_URL_FALLBACK = "https://unpkg.com/world-atlas@2/countries-110m.json";

// 90 seconds idle = session end. Booth visits typically run 30-90s.
const SESSION_TIMEOUT_MS = 90 * 1000;
const GLOBE_SIZE = 1000;

// Donate URL. UTM tags here let HHRD's analytics attribute booth-driven traffic.
// They're query parameters, not site changes - hhrd.org loads identically.
const HHRD_DONATE_URL = "https://hhrd.org/?utm_source=icna2026&utm_medium=booth&utm_campaign=globe";

// Photo carousel auto-advance interval. Manual taps reset this timer.
const CAROUSEL_INTERVAL_MS = 4500;

// Soft launch toggle. When true, the right-side photo pane is suppressed
// entirely: no stories, no photo cards, no gradient placeholders. The country
// popup carries the full experience (programs, beneficiary numbers, expandable
// descriptions, donate QR). The globe also stays full-width when a country is
// selected, since there's no pane to make room for.
//
// To switch back to the full experience once photos and stories are in place:
// flip this to `false`. No other code changes needed.
const SOFT_LAUNCH_MODE = true;

// ============================================================
// Analytics - persists via browser localStorage (per device).
// Survives reboots and app restarts. Wiped only by admin Reset or by clearing
// browser data. Silently swallows errors if storage is unavailable.
// ============================================================

const Analytics = {
  KEY: 'hhrd:analytics:v2',
  _read() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return this._empty();
      const parsed = JSON.parse(raw);
      return { ...this._empty(), ...parsed };
    } catch { return this._empty(); }
  },
  _empty() {
    return {
      totalSessions: 0,
      totalCountrySelections: 0,
      totalActiveSeconds: 0,
      totalSearches: 0,
      totalProgramExpansions: 0,
      totalDonateOpens: 0,
      totalSessionsWithSelection: 0,
      countryViews: {},
      countryDwellSeconds: {},
      searchQueries: {},
      programExpansions: {},
      donateOpensByCountry: {},
      firstCountryOfSession: {},
      sessionsByHour: {},
      firstSeen: null,
      lastSeen: null
    };
  },
  _write(obj) {
    try {
      obj.lastSeen = new Date().toISOString();
      if (!obj.firstSeen) obj.firstSeen = obj.lastSeen;
      localStorage.setItem(this.KEY, JSON.stringify(obj));
    } catch (e) { /* storage unavailable */ }
  },
  startSession() {
    const a = this._read();
    a.totalSessions += 1;
    const hour = new Date().getHours().toString().padStart(2, '0');
    a.sessionsByHour[hour] = (a.sessionsByHour[hour] || 0) + 1;
    this._write(a);
  },
  recordCountry(name, isFirstInSession) {
    const a = this._read();
    a.totalCountrySelections += 1;
    a.countryViews[name] = (a.countryViews[name] || 0) + 1;
    if (isFirstInSession) {
      a.totalSessionsWithSelection += 1;
      a.firstCountryOfSession[name] = (a.firstCountryOfSession[name] || 0) + 1;
    }
    this._write(a);
  },
  recordSessionTime(seconds) {
    const a = this._read();
    a.totalActiveSeconds += Math.max(0, Math.round(seconds));
    this._write(a);
  },
  recordSearch(query) {
    const q = String(query || "").trim().toLowerCase();
    if (q.length < 2) return;
    const a = this._read();
    a.totalSearches += 1;
    a.searchQueries[q] = (a.searchQueries[q] || 0) + 1;
    this._write(a);
  },
  recordProgramExpand(countryName, code) {
    if (!countryName || !code) return;
    const a = this._read();
    const key = `${countryName} | ${code}`;
    a.totalProgramExpansions += 1;
    a.programExpansions[key] = (a.programExpansions[key] || 0) + 1;
    this._write(a);
  },
  recordCountryDwell(countryName, seconds) {
    if (!countryName || seconds <= 0) return;
    const a = this._read();
    a.countryDwellSeconds[countryName] = (a.countryDwellSeconds[countryName] || 0) + Math.round(seconds);
    this._write(a);
  },
  recordDonateOpen(countryName) {
    if (!countryName) return;
    const a = this._read();
    a.totalDonateOpens += 1;
    a.donateOpensByCountry[countryName] = (a.donateOpensByCountry[countryName] || 0) + 1;
    this._write(a);
  },
  getSummary() { return this._read(); },
  reset() {
    try { localStorage.removeItem(this.KEY); } catch {}
  }
};

// ============================================================
// Donate modal - client-side QR (no external service dependency)
// ============================================================

function DonateModal({ country, onClose }) {
  // The URL embeds UTM tags so HHRD analytics can identify booth traffic.
  // hhrd.org doesn't need to change anything for these to be useful.
  const url = HHRD_DONATE_URL;

  // Track that the donate modal opened for this country.
  useEffect(() => {
    Analytics.recordDonateOpen(country.name);
  }, [country.name]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: "rgba(12, 35, 64, 0.6)", zIndex: 200, backdropFilter: "blur(2px)" }}
      onPointerUp={onClose}
    >
      <div
        onPointerUp={(e) => e.stopPropagation()}
        className="rounded-2xl overflow-hidden flex flex-col"
        style={{
          width: 480,
          background: COLORS.bg,
          boxShadow: COLORS.shadowPop,
          animation: "hhrd-pop-in 0.32s cubic-bezier(.2,.9,.2,1.1)"
        }}
      >
        <div className="px-8 pt-7 pb-6 flex items-start justify-between"
          style={{ background: COLORS.accent, color: "#fff" }}>
          <div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              opacity: 0.85,
              fontWeight: 600,
              marginBottom: 4
            }}>
              Support HHRD's work
            </div>
            <h3 style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: "28px",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              fontVariationSettings: "'opsz' 144"
            }}>
              Donate to HHRD
            </h3>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              opacity: 0.92,
              marginTop: 4
            }}>
              Inspired by {country.name}? Scan to give.
            </div>
          </div>
          <button onPointerUp={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.18)", color: "#fff", cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-7 flex flex-col items-center">
          <div style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontSize: "15px",
            fontStyle: "italic",
            color: COLORS.textSecondary,
            textAlign: "center",
            marginBottom: 20,
            lineHeight: 1.4
          }}>
            Scan with your phone camera. A volunteer can help direct your gift on the HHRD site.
          </div>

          <div className="rounded-lg p-4 mb-5"
            style={{
              background: "#fff",
              border: `2px solid ${COLORS.panelBorder}`,
              boxShadow: COLORS.shadowSoft
            }}>
            {/* Client-side QR. No network dependency once the app has loaded. */}
            <QRCodeSVG
              value={url}
              size={300}
              bgColor="#ffffff"
              fgColor={COLORS.navy}
              level="M"
              includeMargin={false}
            />
          </div>

          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "9.5px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: COLORS.textMuted,
            fontWeight: 600,
            marginBottom: 6
          }}>
            hhrd.org
          </div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "11px",
            color: COLORS.textSecondary,
            textAlign: "center"
          }}>
            Or visit the HHRD donation page directly.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Country popup (anchored to pin)
// ============================================================

function CountryPopup({ country, x, y, containerW, containerH, onClose }) {
  const POPUP_W = 420;
  const POPUP_H_MAX_BASE = 580;
  const margin = 16;
  const offset = 28;

  const [expanded, setExpanded] = useState(() => new Set());
  const [showDonate, setShowDonate] = useState(false);
  const toggleExpand = (code) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
        Analytics.recordProgramExpand(country.name, code);
      }
      return next;
    });
  };
  useEffect(() => { setExpanded(new Set()); setShowDonate(false); }, [country?.name]);

  const POPUP_H_MAX = Math.min(POPUP_H_MAX_BASE, Math.max(280, containerH - margin * 2));

  // Smart 4-side placement; prefer right, then left, then below, then above.
  const fitsRight = x + offset + POPUP_W <= containerW - margin;
  const fitsLeft  = x - offset - POPUP_W >= margin;
  const fitsBelow = y + offset + POPUP_H_MAX <= containerH - margin;
  const fitsAbove = y - offset - POPUP_H_MAX >= margin;

  let popupX, popupY, side;
  if (fitsRight) {
    popupX = x + offset; popupY = y - POPUP_H_MAX / 2; side = "right";
  } else if (fitsLeft) {
    popupX = x - offset - POPUP_W; popupY = y - POPUP_H_MAX / 2; side = "left";
  } else if (fitsBelow) {
    popupX = x - POPUP_W / 2; popupY = y + offset; side = "below";
  } else if (fitsAbove) {
    popupX = x - POPUP_W / 2; popupY = y - offset - POPUP_H_MAX; side = "above";
  } else {
    const rightSpace = containerW - x;
    const leftSpace = x;
    side = rightSpace >= leftSpace ? "right" : "left";
    popupX = side === "right" ? x + offset : x - offset - POPUP_W;
    popupY = y - POPUP_H_MAX / 2;
  }

  if (popupX + POPUP_W > containerW - margin) popupX = containerW - POPUP_W - margin;
  if (popupX < margin) popupX = margin;
  if (popupY + POPUP_H_MAX > containerH - margin) popupY = containerH - POPUP_H_MAX - margin;
  if (popupY < margin) popupY = margin;

  const arrowSize = 12;
  const arrowStyles = {
    right: {
      left: -arrowSize,
      top: Math.max(20, Math.min(POPUP_H_MAX - 30, y - popupY)) - arrowSize,
      borderTop: `${arrowSize}px solid transparent`,
      borderBottom: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid ${COLORS.panel}`,
      filter: "drop-shadow(-2px 0 1px rgba(12,35,64,0.08))"
    },
    left: {
      right: -arrowSize,
      top: Math.max(20, Math.min(POPUP_H_MAX - 30, y - popupY)) - arrowSize,
      borderTop: `${arrowSize}px solid transparent`,
      borderBottom: `${arrowSize}px solid transparent`,
      borderLeft: `${arrowSize}px solid ${COLORS.panel}`,
      filter: "drop-shadow(2px 0 1px rgba(12,35,64,0.08))"
    },
    below: {
      top: -arrowSize,
      left: Math.max(20, Math.min(POPUP_W - 30, x - popupX)) - arrowSize,
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      borderBottom: `${arrowSize}px solid ${COLORS.panel}`,
      filter: "drop-shadow(0 -2px 1px rgba(12,35,64,0.08))"
    },
    above: {
      bottom: -arrowSize,
      left: Math.max(20, Math.min(POPUP_W - 30, x - popupX)) - arrowSize,
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      borderTop: `${arrowSize}px solid ${COLORS.panel}`,
      filter: "drop-shadow(0 2px 1px rgba(12,35,64,0.08))"
    }
  };
  const transformOrigins = {
    right: "left center",
    left: "right center",
    below: "center top",
    above: "center bottom"
  };

  return (
    <>
    <div
      className="absolute pointer-events-auto"
      style={{
        left: popupX, top: popupY, width: POPUP_W, maxHeight: POPUP_H_MAX,
        background: COLORS.panel, border: `1px solid ${COLORS.panelBorder}`,
        borderRadius: 14, boxShadow: COLORS.shadowPop,
        animation: "hhrd-pop-in 0.32s cubic-bezier(.2,.9,.2,1.1)",
        transformOrigin: transformOrigins[side],
        display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 10
      }}
    >
      <div style={{ position: "absolute", width: 0, height: 0, ...arrowStyles[side] }} />

      <div className="px-5 pt-5 pb-3 flex items-start justify-between"
        style={{ borderBottom: `1px solid ${COLORS.panelBorder}` }}>
        <div className="flex-1 min-w-0 pr-3">
          <div style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "0.26em",
            textTransform: "uppercase", color: COLORS.accent, marginBottom: 4, fontWeight: 600
          }}>
            HHRD presence
          </div>
          <h2 style={{
            fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: "26px",
            letterSpacing: "-0.01em", color: COLORS.textPrimary, lineHeight: 1.1,
            fontVariationSettings: "'opsz' 144"
          }}>
            {country.name}
          </h2>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onPointerUp={() => setShowDonate(true)}
            className="flex items-center gap-1.5 px-3 h-9 rounded-full transition-all hover:scale-105"
            style={{
              background: COLORS.accent, border: `1px solid ${COLORS.accent}`,
              color: "#fff", cursor: "pointer",
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "12px",
              letterSpacing: "0.04em",
              boxShadow: `0 4px 12px -4px ${COLORS.accent}88`
            }}>
            <Heart size={13} fill="#fff" /> Donate
          </button>
          <button onPointerUp={onClose} className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110"
            style={{ background: COLORS.bgSubtle, border: `1px solid ${COLORS.panelBorder}`, color: COLORS.textSecondary, cursor: "pointer" }}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto overflow-x-hidden px-5 py-4 flex-1">
        <div style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "0.24em",
          textTransform: "uppercase", color: COLORS.textSecondary, marginBottom: 10, fontWeight: 600
        }}>
          {country.programs.length} active program{country.programs.length === 1 ? "" : "s"}  ·  tap to learn more
        </div>
        <div className="flex flex-col gap-2 mb-3">
          {country.programs.map(progData => {
            const code = progData.code;
            const p = PROGRAMS[code]; if (!p) return null;
            const I = p.Icon;
            const metric = getMetric(country.name, code);
            const isOpen = expanded.has(code);
            return (
              <button
                key={code}
                onPointerUp={() => toggleExpand(code)}
                className="rounded-lg overflow-hidden text-left transition-all"
                style={{
                  background: isOpen ? `${p.color}14` : `${p.color}08`,
                  border: `1.5px solid ${p.color}${isOpen ? "88" : "44"}`,
                  cursor: "pointer", width: "100%", padding: 0
                }}
              >
                <div className="flex items-center gap-3 px-3 py-3">
                  <div className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: `${p.color}22`, border: `1px solid ${p.color}66` }}>
                    <I size={18} style={{ color: p.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2" style={{ marginBottom: 2 }}>
                      <div style={{
                        fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "10.5px",
                        letterSpacing: "0.18em", color: p.color
                      }}>
                        {code}
                      </div>
                      {metric.cumulative && (
                        <div style={{
                          fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "8.5px",
                          letterSpacing: "0.16em", color: COLORS.textMuted,
                          textTransform: "uppercase", padding: "1px 6px",
                          background: COLORS.bgSubtle, borderRadius: 4,
                          border: `1px solid ${COLORS.panelBorder}`
                        }}>
                          Cumulative
                        </div>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span style={{
                        fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "20px",
                        color: COLORS.navy, lineHeight: 1, fontVariationSettings: "'opsz' 144"
                      }}>
                        {metric.value}
                      </span>
                      <span style={{
                        fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "11px",
                        color: COLORS.textSecondary
                      }}>
                        {metric.unit}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full"
                    style={{ background: isOpen ? p.color : "transparent", transition: "all 0.25s" }}>
                    <span style={{
                      color: isOpen ? "#fff" : p.color, fontSize: "11px", fontWeight: 700,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.25s", lineHeight: 1
                    }}>▾</span>
                  </div>
                </div>

                <div style={{
                  maxHeight: isOpen ? 600 : 0, overflow: "hidden",
                  transition: "max-height 0.32s cubic-bezier(.4,0,.2,1)"
                }}>
                  <div className="px-3 pb-3 pt-1" style={{ borderTop: `1px solid ${p.color}33` }}>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "12px",
                      color: COLORS.textPrimary, marginTop: 8, marginBottom: 4
                    }}>
                      {p.name}
                    </div>
                    <p style={{
                      fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "12.5px",
                      lineHeight: 1.55, color: COLORS.textSecondary
                    }}>
                      {progData.description || "Active program in this country."}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    {showDonate && <DonateModal country={country} onClose={() => setShowDonate(false)} />}
    </>
  );
}

// ============================================================
// Photo gallery card with click-to-advance carousel
// Behavior: photos auto-advance every CAROUSEL_INTERVAL_MS. Tapping the right
// half advances forward, left half goes backward. Dots are tappable jumps.
// Manual interaction resets the auto-advance timer so the next change feels
// coherent (no jarring quick-advance immediately after a tap).
// ============================================================

function ProgramPhotoCard({ code, countryName }) {
  const p = PROGRAMS[code];
  const photos = useMemo(() => getPhotoPaths(countryName, code), [countryName, code]);
  const [idx, setIdx] = useState(0);
  const [imgError, setImgError] = useState({});
  const timerRef = useRef(null);

  const advance = useCallback((direction = 1) => {
    if (photos.length <= 1) return;
    setIdx(i => {
      const n = photos.length;
      return (i + direction + n) % n;
    });
  }, [photos.length]);

  // Auto-advance timer. Reset whenever idx changes (including manual taps).
  useEffect(() => {
    if (photos.length <= 1) return;
    timerRef.current = setTimeout(() => advance(1), CAROUSEL_INTERVAL_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [idx, photos.length, advance]);

  // Reset to first photo when country changes (avoids out-of-range after swap).
  useEffect(() => { setIdx(0); setImgError({}); }, [countryName]);

  if (!p) return null;
  const I = p.Icon;
  const hasPhotos = photos.length > 0;

  return (
    <div className="rounded-xl overflow-hidden flex-shrink-0"
      style={{
        background: COLORS.bg,
        border: `1px solid ${COLORS.panelBorder}`,
        boxShadow: COLORS.shadowSoft
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3"
        style={{ borderBottom: `1px solid ${COLORS.panelBorder}` }}>
        <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ background: `${p.color}1f`, border: `1px solid ${p.color}55` }}>
          <I size={15} style={{ color: p.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "10px",
            letterSpacing: "0.18em", color: p.color
          }}>
            {code}
          </div>
          <div style={{
            fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: "13px",
            color: COLORS.textPrimary, lineHeight: 1.15, fontVariationSettings: "'opsz' 144"
          }}>
            {p.name}
          </div>
        </div>
      </div>

      {/* Photo area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        {hasPhotos ? (
          <>
            {photos.map((src, i) => {
              const errored = imgError[i];
              return (
                <div
                  key={src}
                  className="absolute inset-0"
                  style={{
                    opacity: i === idx ? 1 : 0,
                    transition: "opacity 0.55s ease-in-out",
                    background: errored ? `linear-gradient(135deg, ${p.color}dd 0%, ${COLORS.navy} 100%)` : "#000"
                  }}
                >
                  {!errored && (
                    <img
                      src={src}
                      alt={`${countryName} ${code}`}
                      onError={() => setImgError(e => ({ ...e, [i]: true }))}
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "cover", display: "block"
                      }}
                    />
                  )}
                  {errored && (
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <div style={{
                        fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "9px",
                        letterSpacing: "0.22em", color: "rgba(255,255,255,0.65)",
                        textTransform: "uppercase"
                      }}>
                        Photo {i + 1} pending
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Tap zones for manual advance. Invisible but cover left/right halves.
                Each zone is half the width of the photo area. Tap zones win over
                the underlying image's pointer events so this stays touch-friendly. */}
            {photos.length > 1 && (
              <>
                <div
                  onPointerUp={(e) => { e.stopPropagation(); advance(-1); }}
                  style={{
                    position: "absolute", top: 0, left: 0, bottom: 0, width: "40%",
                    cursor: "pointer", zIndex: 2
                  }}
                  aria-label="Previous photo"
                />
                <div
                  onPointerUp={(e) => { e.stopPropagation(); advance(1); }}
                  style={{
                    position: "absolute", top: 0, right: 0, bottom: 0, width: "40%",
                    cursor: "pointer", zIndex: 2
                  }}
                  aria-label="Next photo"
                />

                {/* Tap-zone affordance arrows. Subtle, fade in only on the active card. */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    width: 28, height: 28, borderRadius: 14,
                    background: "rgba(0,0,0,0.35)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    opacity: 0.55, zIndex: 3
                  }}>
                  <ChevronLeft size={16} color="#fff" />
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    width: 28, height: 28, borderRadius: 14,
                    background: "rgba(0,0,0,0.35)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    opacity: 0.55, zIndex: 3
                  }}>
                  <ChevronRight size={16} color="#fff" />
                </div>
              </>
            )}
          </>
        ) : (
          // No photos for this country+program. Show the colored gradient as a
          // visual placeholder so the card still looks intentional.
          <div className="absolute inset-0 flex flex-col justify-end p-4"
            style={{
              background: `linear-gradient(135deg, ${p.color}dd 0%, ${COLORS.navy} 100%)`
            }}>
            <div style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "9px",
              letterSpacing: "0.22em", color: "rgba(255,255,255,0.65)",
              textTransform: "uppercase"
            }}>
              Photo coming soon
            </div>
            <div style={{
              fontFamily: "'Fraunces', serif", fontWeight: 400, fontStyle: "italic",
              fontSize: "14px", color: "rgba(255,255,255,0.92)", marginTop: 4
            }}>
              {p.name} in {countryName}
            </div>
          </div>
        )}
      </div>

      {/* Dots - tappable jump-to-index */}
      {photos.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-2.5"
          style={{ background: COLORS.bgSubtle }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onPointerUp={(e) => { e.stopPropagation(); setIdx(i); }}
              className="rounded-full transition-all"
              style={{
                width: i === idx ? 16 : 6, height: 6,
                background: i === idx ? p.color : COLORS.panelBorderStrong,
                border: "none", cursor: "pointer", padding: 0
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Story card - rotates through any stories the country has
// ============================================================

function StoryCard({ stories, programLookup }) {
  const [idx, setIdx] = useState(0);

  // Auto-advance every 8 seconds when there are multiple stories.
  useEffect(() => {
    if (!stories || stories.length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % stories.length), 8000);
    return () => clearInterval(t);
  }, [stories?.length]);

  useEffect(() => { setIdx(0); }, [stories]);

  if (!stories || stories.length === 0) return null;
  const story = stories[idx];
  const programColor = story.programCode
    ? (programLookup[story.programCode]?.color || COLORS.accent)
    : COLORS.accent;

  return (
    <div className="rounded-xl overflow-hidden flex-shrink-0 relative"
      style={{
        background: COLORS.bg,
        border: `1px solid ${COLORS.panelBorder}`,
        boxShadow: COLORS.shadowSoft
      }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: programColor
      }} />

      <div className="px-5 pt-5 pb-4 pl-6">
        <div style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "0.26em",
          textTransform: "uppercase", color: programColor, fontWeight: 700, marginBottom: 12
        }}>
          Voices from the field
        </div>

        <div style={{
          fontFamily: "'Fraunces', serif", fontSize: "60px", lineHeight: 0.4,
          color: programColor, opacity: 0.18, height: 18, fontWeight: 600
        }}>“</div>

        <p style={{
          fontFamily: "'Fraunces', serif", fontWeight: 400, fontStyle: "italic",
          fontSize: "14.5px", lineHeight: 1.45, color: COLORS.textPrimary,
          marginTop: 4, marginBottom: 12,
          // Long stories scroll within the card rather than overflowing.
          maxHeight: 280, overflowY: "auto"
        }}>
          {story.quote}
        </p>

        <div style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "11px",
          letterSpacing: "0.05em", color: COLORS.textSecondary,
          paddingTop: 8, borderTop: `1px solid ${COLORS.panelBorder}`
        }}>
          — {story.attribution}
        </div>

        {stories.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {stories.map((_, i) => (
              <button
                key={i}
                onPointerUp={(e) => { e.stopPropagation(); setIdx(i); }}
                className="rounded-full transition-all"
                style={{
                  width: i === idx ? 16 : 6, height: 6,
                  background: i === idx ? programColor : COLORS.panelBorderStrong,
                  border: "none", cursor: "pointer", padding: 0
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Photo pane - right side, stories first then program photo cards
// ============================================================

function PhotoPane({ country }) {
  if (!country) return null;
  const stories = getStories(country.name);
  return (
    <div
      className="absolute top-0 right-0 bottom-0 flex flex-col"
      style={{
        width: 420,
        background: COLORS.bg,
        borderLeft: `1px solid ${COLORS.panelBorder}`,
        boxShadow: "-10px 0 30px -12px rgba(12, 35, 64, 0.12)",
        zIndex: 12,
        animation: "hhrd-slide-in-right 0.45s cubic-bezier(.2,.9,.2,1)"
      }}
    >
      <div className="px-6 pt-6 pb-4 flex-shrink-0"
        style={{ borderBottom: `1px solid ${COLORS.panelBorder}` }}>
        <div style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "0.28em",
          textTransform: "uppercase", color: COLORS.accent, marginBottom: 6, fontWeight: 600
        }}>
          From the field
        </div>
        <h3 style={{
          fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: "22px",
          letterSpacing: "-0.01em", color: COLORS.textPrimary, lineHeight: 1.1,
          fontVariationSettings: "'opsz' 144"
        }}>
          {country.name}
        </h3>
        <div style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "11px",
          letterSpacing: "0.04em", color: COLORS.textSecondary, marginTop: 4
        }}>
          {stories.length > 0 ? `${stories.length} ${stories.length === 1 ? "story" : "stories"} · ` : ""}{country.programs.length} program{country.programs.length === 1 ? "" : "s"} · scroll to browse
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-5 py-5 flex flex-col gap-3">
        {stories.length > 0 && <StoryCard stories={stories} programLookup={PROGRAMS} />}
        {country.programs.map((prog) => (
          <ProgramPhotoCard
            key={`${country.name}-${prog.code}`}
            code={prog.code}
            countryName={country.name}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Admin panel (5-tap on top-left corner)
// ============================================================

function AdminPanel({ onClose }) {
  const [data, setData] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => { setData(Analytics.getSummary()); }, []);

  const handleReset = () => {
    Analytics.reset();
    setData(Analytics.getSummary());
    setConfirmReset(false);
  };

  // CSV export. Multi-section format with summary block plus ranked lists.
  // Excel opens the BOM-prefixed UTF-8 cleanly.
  const handleExport = () => {
    if (!data) return;
    const escape = (v) => {
      if (v === null || v === undefined) return "";
      const s = String(v);
      if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };
    const lines = [];
    lines.push("HHRD Booth Analytics Export");
    lines.push(`Generated,${escape(new Date().toISOString())}`);
    lines.push(`First recorded,${escape(data.firstSeen || "")}`);
    lines.push(`Last recorded,${escape(data.lastSeen || "")}`);
    lines.push("");
    lines.push("Summary");
    lines.push("Metric,Value");
    lines.push(`Total sessions,${data.totalSessions || 0}`);
    lines.push(`Sessions with country selection,${data.totalSessionsWithSelection || 0}`);
    lines.push(`Total country selections,${data.totalCountrySelections || 0}`);
    lines.push(`Total searches,${data.totalSearches || 0}`);
    lines.push(`Total program expansions,${data.totalProgramExpansions || 0}`);
    lines.push(`Total donate opens,${data.totalDonateOpens || 0}`);
    lines.push(`Total active seconds,${data.totalActiveSeconds || 0}`);
    const totalSessions = data.totalSessions || 0;
    const avgSec = totalSessions > 0 ? Math.round(data.totalActiveSeconds / totalSessions) : 0;
    const conversionRate = totalSessions > 0 ? ((data.totalSessionsWithSelection / totalSessions) * 100).toFixed(1) : "0.0";
    const donateRate = totalSessions > 0 ? ((data.totalDonateOpens / totalSessions) * 100).toFixed(1) : "0.0";
    lines.push(`Avg session length (seconds),${avgSec}`);
    lines.push(`Engagement rate %,${conversionRate}`);
    lines.push(`Donate-open rate %,${donateRate}`);
    lines.push("");

    const dumpSection = (title, header, obj, valueFmt) => {
      lines.push(title);
      lines.push(header);
      Object.entries(obj || {})
        .sort((a, b) => b[1] - a[1])
        .forEach(([k, v]) => lines.push(`${escape(k)},${valueFmt ? valueFmt(v) : v}`));
      lines.push("");
    };

    dumpSection("Country views", "Country,Views", data.countryViews);
    dumpSection("First country of session", "Country,Times first", data.firstCountryOfSession);
    dumpSection("Donate opens by country", "Country,Opens", data.donateOpensByCountry);
    dumpSection("Search queries", "Query,Count", data.searchQueries);
    dumpSection("Program expansions", "Country | Program,Count", data.programExpansions);
    dumpSection("Country dwell time (seconds)", "Country,Seconds", data.countryDwellSeconds);
    dumpSection("Sessions by hour of day", "Hour (24h),Sessions", data.sessionsByHour);

    const csv = lines.join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().split("T")[0];
    const a = document.createElement("a");
    a.href = url;
    a.download = `hhrd-booth-analytics-${date}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (!data) return null;

  const topCountries = Object.entries(data.countryViews || {})
    .sort((a, b) => b[1] - a[1]).slice(0, 10);
  const topSearches = Object.entries(data.searchQueries || {})
    .sort((a, b) => b[1] - a[1]).slice(0, 10);
  const topExpansions = Object.entries(data.programExpansions || {})
    .sort((a, b) => b[1] - a[1]).slice(0, 10);
  const topDwell = Object.entries(data.countryDwellSeconds || {})
    .sort((a, b) => b[1] - a[1]).slice(0, 10);
  const topDonates = Object.entries(data.donateOpensByCountry || {})
    .sort((a, b) => b[1] - a[1]).slice(0, 10);
  const topFirstCountries = Object.entries(data.firstCountryOfSession || {})
    .sort((a, b) => b[1] - a[1]).slice(0, 10);
  const totalMinutes = Math.round(data.totalActiveSeconds / 60);
  const avgSession = data.totalSessions > 0 ? Math.round(data.totalActiveSeconds / data.totalSessions) : 0;
  const engagementRate = data.totalSessions > 0
    ? ((data.totalSessionsWithSelection / data.totalSessions) * 100).toFixed(1)
    : "0.0";
  const donateRate = data.totalSessions > 0
    ? ((data.totalDonateOpens / data.totalSessions) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="fixed inset-0 flex items-center justify-center"
      style={{ background: "rgba(12,35,64,0.65)", zIndex: 300, backdropFilter: "blur(3px)" }}
      onPointerUp={onClose}>
      <div onPointerUp={(e) => e.stopPropagation()}
        className="rounded-2xl overflow-hidden flex flex-col"
        style={{
          width: "min(960px, 92vw)", maxHeight: "92vh",
          background: COLORS.bg, boxShadow: COLORS.shadowPop
        }}>

        <div className="px-7 pt-6 pb-5 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: `1px solid ${COLORS.panelBorder}` }}>
          <div>
            <div style={{
              fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "0.3em",
              textTransform: "uppercase", color: COLORS.accent, fontWeight: 600, marginBottom: 4
            }}>
              Admin · booth analytics
            </div>
            <h3 style={{
              fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: "26px",
              color: COLORS.textPrimary, letterSpacing: "-0.01em",
              fontVariationSettings: "'opsz' 144"
            }}>
              Visitor engagement
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button onPointerUp={handleExport}
              className="flex items-center gap-1.5 px-3 h-9 rounded-full"
              style={{
                background: COLORS.bgSubtle, border: `1px solid ${COLORS.panelBorder}`,
                color: COLORS.textPrimary, fontFamily: "'Outfit', sans-serif",
                fontWeight: 600, fontSize: "12px", cursor: "pointer"
              }}>
              <Download size={13} /> Export CSV
            </button>
            <button onPointerUp={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full"
              style={{ background: COLORS.bgSubtle, border: `1px solid ${COLORS.panelBorder}`, color: COLORS.textSecondary, cursor: "pointer" }}>
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto px-7 py-6 flex-1">
          {/* Summary tiles - 6 across */}
          <div className="grid grid-cols-6 gap-3 mb-6">
            <StatTile label="Sessions" value={data.totalSessions} />
            <StatTile label="Engaged %" value={`${engagementRate}%`} />
            <StatTile label="Country views" value={data.totalCountrySelections} />
            <StatTile label="Donate opens" value={data.totalDonateOpens} />
            <StatTile label="Searches" value={data.totalSearches} />
            <StatTile label="Avg session" value={`${avgSession}s`} />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <StatTile label="Donate rate" value={`${donateRate}%`} />
            <StatTile label="Program expansions" value={data.totalProgramExpansions} />
            <StatTile label="Total active minutes" value={totalMinutes} />
          </div>

          {/* Ranked lists - two columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <RankList title="Most viewed countries" empty="No country views recorded yet."
              rows={topCountries} />
            <RankList title="Donate opens by country" empty="No donate scans recorded yet."
              rows={topDonates} />
            <RankList title="First country of session" empty="No engaged sessions yet."
              rows={topFirstCountries} />
            <RankList title="Top program expansions" empty="No program tiles opened yet."
              rows={topExpansions} />
            <RankList title="Longest dwell times" empty="No dwell time recorded yet."
              rows={topDwell} valueFormat={(v) => `${v}s`} />
            <RankList title="Top search queries" empty="No searches recorded yet."
              rows={topSearches} />
          </div>

          <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${COLORS.panelBorder}` }}>
            {!confirmReset ? (
              <button onPointerUp={() => setConfirmReset(true)}
                className="px-3 h-9 rounded-full"
                style={{
                  background: "transparent", border: `1px solid ${COLORS.panelBorder}`,
                  color: COLORS.textSecondary, fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500, fontSize: "12px", cursor: "pointer"
                }}>
                Reset analytics
              </button>
            ) : (
              <>
                <div style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: "12px",
                  color: COLORS.textPrimary, fontWeight: 500, marginBottom: 8
                }}>
                  Erase all booth analytics? This cannot be undone.
                </div>
                <div className="flex items-center gap-2">
                  <button onPointerUp={handleReset}
                    className="px-3 h-9 rounded-full"
                    style={{
                      background: COLORS.accent, border: `1px solid ${COLORS.accent}`,
                      color: "#fff", fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600, fontSize: "12px", cursor: "pointer"
                    }}>
                    Yes, erase all
                  </button>
                  <button onPointerUp={() => setConfirmReset(false)}
                    className="px-3 h-9 rounded-full"
                    style={{
                      background: "transparent", border: `1px solid ${COLORS.panelBorder}`,
                      color: COLORS.textSecondary, fontFamily: "'Outfit', sans-serif",
                      fontWeight: 500, fontSize: "12px", cursor: "pointer"
                    }}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value }) {
  return (
    <div className="px-3 py-3 rounded-lg" style={{ background: COLORS.bgSubtle, border: `1px solid ${COLORS.panelBorder}` }}>
      <div style={{
        fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "22px",
        color: COLORS.navy, lineHeight: 1, fontVariationSettings: "'opsz' 144"
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "9.5px",
        letterSpacing: "0.08em", color: COLORS.textSecondary, marginTop: 4,
        textTransform: "uppercase"
      }}>
        {label}
      </div>
    </div>
  );
}

function RankList({ title, empty, rows, valueFormat }) {
  const fmt = valueFormat || ((v) => v);
  return (
    <div className="mb-4">
      <div style={{
        fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "0.24em",
        textTransform: "uppercase", color: COLORS.textSecondary, fontWeight: 600, marginBottom: 10
      }}>
        {title}
      </div>
      {rows.length === 0 ? (
        <div style={{
          fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "13px",
          color: COLORS.textMuted
        }}>
          {empty}
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {rows.map(([name, count]) => {
            const max = rows[0][1];
            const pct = max > 0 ? (count / max) * 100 : 0;
            return (
              <div key={name} className="flex items-center gap-3 py-0.5">
                <div style={{
                  width: 180, fontFamily: "'Fraunces', serif", fontSize: "12.5px",
                  color: COLORS.textPrimary, flexShrink: 0, whiteSpace: "nowrap",
                  overflow: "hidden", textOverflow: "ellipsis"
                }}>
                  {name}
                </div>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: COLORS.bgSubtle }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: COLORS.accent, transition: "width 0.4s" }} />
                </div>
                <div style={{
                  width: 56, textAlign: "right", fontFamily: "'Outfit', sans-serif",
                  fontSize: "11.5px", fontWeight: 600, color: COLORS.textPrimary
                }}>
                  {fmt(count)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Globe component
// ============================================================

function Globe({ geoData, focusTarget, onPinTap, selectedCountry, onClosePopup, idleSpin }) {
  const [rotation, setRotation] = useState([20, -15, 0]);
  const [zoom] = useState(1);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const baseScale = GLOBE_SIZE / 2.2;

  const dragRef = useRef(null);
  const idleRef = useRef(idleSpin);
  const rotationRef = useRef(rotation);
  const rafRef = useRef();
  const animRef = useRef(null);
  const containerRef = useRef();

  useEffect(() => { idleRef.current = idleSpin; }, [idleSpin]);
  useEffect(() => { rotationRef.current = rotation; }, [rotation]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      const r = containerRef.current.getBoundingClientRect();
      setContainerSize({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let last = performance.now();
    const tick = (t) => {
      const dt = t - last; last = t;
      if (idleRef.current && !dragRef.current && !animRef.current && !selectedCountry) {
        setRotation(r => [r[0] + dt * 0.008, r[1], 0]);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [selectedCountry]);

  useEffect(() => {
    if (!focusTarget) return;
    const target = [-focusTarget.lon, -focusTarget.lat, 0];
    const start = rotationRef.current.slice();
    let dl = target[0] - start[0];
    while (dl > 180) dl -= 360;
    while (dl < -180) dl += 360;
    const startTime = performance.now();
    const duration = 1200;
    animRef.current = true;
    const step = (t) => {
      const k = Math.min(1, (t - startTime) / duration);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      setRotation([
        start[0] + dl * e,
        start[1] + (target[1] - start[1]) * e,
        0
      ]);
      if (k < 1) requestAnimationFrame(step); else animRef.current = null;
    };
    requestAnimationFrame(step);
  }, [focusTarget]);

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      x: e.clientX, y: e.clientY,
      r0: rotationRef.current.slice(),
      lastX: e.clientX, lastY: e.clientY,
      vx: 0, vy: 0, t: performance.now(), moved: false
    };
    animRef.current = null;
  };
  const handlePointerMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
    const sens = 90 / (baseScale * zoom);
    setRotation([
      dragRef.current.r0[0] + dx * sens * 1.4,
      Math.max(-88, Math.min(88, dragRef.current.r0[1] - dy * sens * 1.4)),
      0
    ]);
    const now = performance.now();
    const ddt = now - dragRef.current.t || 1;
    dragRef.current.vx = (e.clientX - dragRef.current.lastX) / ddt;
    dragRef.current.vy = (e.clientY - dragRef.current.lastY) / ddt;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    dragRef.current.t = now;
  };
  const handlePointerUp = () => {
    if (!dragRef.current) return;
    const wasMoved = dragRef.current.moved;
    let vx = dragRef.current.vx, vy = dragRef.current.vy;
    dragRef.current = null;
    if (!wasMoved) return;
    const sens = 90 / (baseScale * zoom);
    const decay = 0.93;
    const inertia = () => {
      if (dragRef.current) return;
      if (Math.abs(vx) < 0.002 && Math.abs(vy) < 0.002) return;
      setRotation(r => [
        r[0] + vx * 16 * sens * 1.4,
        Math.max(-88, Math.min(88, r[1] - vy * 16 * sens * 1.4)),
        0
      ]);
      vx *= decay; vy *= decay;
      requestAnimationFrame(inertia);
    };
    requestAnimationFrame(inertia);
  };

  const projection = useMemo(() =>
    d3.geoOrthographic()
      .scale(baseScale * zoom)
      .translate([GLOBE_SIZE / 2, GLOBE_SIZE / 2])
      .rotate(rotation)
      .clipAngle(90),
    [rotation, zoom, baseScale]
  );
  const path = useMemo(() => d3.geoPath(projection), [projection]);
  const graticule = useMemo(() => d3.geoGraticule().step([20, 20])(), []);

  const countryPaths = useMemo(() => {
    if (!geoData) return [];
    return geoData.features.map((f, i) => {
      const name = (f.properties && (f.properties.name || f.properties.NAME || f.properties.ADMIN)) || `c${i}`;
      const lname = name.toLowerCase();
      const isActive = COUNTRIES.some(c =>
        c.name.toLowerCase() === lname ||
        c.aliases.some(a => a.toLowerCase() === lname)
      );
      return { key: i, name, isActive, d: path(f) };
    }).filter(c => c.d);
  }, [geoData, path]);

  const pinData = useMemo(() => {
    return COUNTRIES.map(c => {
      const coords = projection([c.lon, c.lat]);
      if (!coords) return null;
      const r = rotation;
      const lambda = c.lon + r[0];
      const phi = c.lat + r[1];
      const cos = Math.cos(phi * Math.PI / 180) * Math.cos(lambda * Math.PI / 180);
      if (cos < -0.05) return null;
      return { c, x: coords[0], y: coords[1], visible: cos > 0 };
    }).filter(Boolean);
  }, [rotation, projection]);

  const toScreen = (svgX, svgY) => {
    const cw = containerSize.w, ch = containerSize.h;
    if (!cw || !ch) return { x: 0, y: 0 };
    let scale, padX = 0, padY = 0;
    if (cw / ch > 1) { scale = ch / GLOBE_SIZE; padX = (cw - ch) / 2; }
    else            { scale = cw / GLOBE_SIZE; padY = (ch - cw) / 2; }
    return { x: svgX * scale + padX, y: svgY * scale + padY };
  };

  const popupScreen = useMemo(() => {
    if (!selectedCountry) return null;
    const coords = projection([selectedCountry.lon, selectedCountry.lat]);
    if (!coords) return null;
    return toScreen(coords[0], coords[1]);
  }, [selectedCountry, projection, containerSize]);

  return (
    <div ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none overflow-hidden"
      style={{ touchAction: "none" }}>
      <svg
        viewBox={`0 0 ${GLOBE_SIZE} ${GLOBE_SIZE}`}
        className="w-full h-full max-w-full max-h-full"
        style={{ cursor: dragRef.current ? "grabbing" : "grab" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="oceanGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={COLORS.oceanLight} />
            <stop offset="60%" stopColor={COLORS.ocean} />
            <stop offset="100%" stopColor="#06182f" />
          </radialGradient>
          <radialGradient id="rimGlow" cx="50%" cy="50%" r="50%">
            <stop offset="92%" stopColor={COLORS.navy} stopOpacity="0" />
            <stop offset="100%" stopColor={COLORS.navy} stopOpacity="0.18" />
          </radialGradient>
          <filter id="pinGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <ellipse cx={GLOBE_SIZE / 2} cy={GLOBE_SIZE / 2 + baseScale * zoom * 0.95}
          rx={baseScale * zoom * 0.7} ry={baseScale * zoom * 0.06}
          fill="rgba(12, 35, 64, 0.18)" />

        <circle cx={GLOBE_SIZE / 2} cy={GLOBE_SIZE / 2} r={baseScale * zoom} fill="url(#oceanGrad)" />
        <path d={path(graticule)} fill="none" stroke={COLORS.graticule} strokeWidth="0.5" opacity="0.55" />

        {countryPaths.map(c => (
          <path key={c.key} d={c.d}
            fill={c.isActive ? COLORS.countryActive : COLORS.countryInactive}
            fillOpacity={c.isActive ? 1 : 0.85}
            stroke={c.isActive ? COLORS.countryActiveStroke : COLORS.countryInactiveStroke}
            strokeWidth={c.isActive ? 1.2 : 0.3}
            strokeOpacity={0.8} />
        ))}

        <circle cx={GLOBE_SIZE / 2} cy={GLOBE_SIZE / 2} r={baseScale * zoom} fill="url(#rimGlow)" pointerEvents="none" />

        {pinData.map(p => {
          const isSelected = selectedCountry?.name === p.c.name;
          const programCount = p.c.programs.length;
          const baseR = 5 + Math.min(programCount, 11) * 0.5;
          return (
            <g key={p.c.name} transform={`translate(${p.x}, ${p.y})`}
              opacity={p.visible ? 1 : 0.35} style={{ cursor: "pointer" }}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => { e.stopPropagation(); if (!dragRef.current?.moved) onPinTap(p.c); }}>
              <circle r={baseR + 6} fill="none" stroke={COLORS.accent} strokeWidth="1.4" opacity="0.65">
                <animate attributeName="r" values={`${baseR};${baseR + 14};${baseR}`} dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle r={baseR + 4} fill={COLORS.accent} opacity="0.2" filter="url(#pinGlow)" />
              <circle r={baseR} fill={COLORS.pinCore} stroke="#ffffff" strokeWidth={isSelected ? 2.5 : 1.5} />
              <circle r={baseR * 0.4} fill={COLORS.pinDot} />
            </g>
          );
        })}
      </svg>

      {selectedCountry && popupScreen && (
        <CountryPopup country={selectedCountry}
          x={popupScreen.x} y={popupScreen.y}
          containerW={containerSize.w} containerH={containerSize.h}
          onClose={onClosePopup} />
      )}
    </div>
  );
}

// ============================================================
// Main App
// ============================================================

export default function App() {
  const [geoData, setGeoData] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [focusTarget, setFocusTarget] = useState(null);
  const [query, setQuery] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [hasEngaged, setHasEngaged] = useState(false);
  const [attractMode, setAttractMode] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  const mode = attractMode ? "attract" : "active";

  const lastInteractionRef = useRef(Date.now());
  const sessionStartRef = useRef(null);
  const sessionFirstCountryRef = useRef(false);  // track whether this session has had a country selection yet
  const tapsRef = useRef({ count: 0, lastTap: 0 });

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTS_LINK;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    const fetchJson = async (url) => {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    };
    (async () => {
      let topo;
      try { topo = await fetchJson(TOPOJSON_URL); }
      catch (e1) {
        console.warn("Primary topojson source failed, trying fallback:", e1);
        try { topo = await fetchJson(TOPOJSON_URL_FALLBACK); }
        catch (e2) { console.error("Both topojson sources failed:", e2); setLoadError(true); return; }
      }
      const geo = topoToGeoJSON(topo, "countries");
      if (!geo.features.length) { setLoadError(true); return; }
      setGeoData(geo);
    })();
  }, []);

  // Session timeout watcher. Checks every 4s; if idle exceeds threshold,
  // record session time and reset back to attract mode.
  useEffect(() => {
    const interval = setInterval(() => {
      if (!sessionStartRef.current) return;
      const idleMs = Date.now() - lastInteractionRef.current;
      if (idleMs >= SESSION_TIMEOUT_MS) {
        const activeSec = Math.round((lastInteractionRef.current - sessionStartRef.current) / 1000);
        Analytics.recordSessionTime(activeSec);
        sessionStartRef.current = null;
        sessionFirstCountryRef.current = false;
        setSelectedCountry(null);
        setHasEngaged(false);
        setAttractMode(true);
        setSearchFocused(false);
        setQuery("");
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Also persist session time when the tab/page closes.
  useEffect(() => {
    const handler = () => {
      if (sessionStartRef.current) {
        const activeSec = Math.round((lastInteractionRef.current - sessionStartRef.current) / 1000);
        Analytics.recordSessionTime(activeSec);
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const onAnyInteraction = useCallback(() => {
    lastInteractionRef.current = Date.now();
    if (!sessionStartRef.current) {
      sessionStartRef.current = Date.now();
      sessionFirstCountryRef.current = false;
      Analytics.startSession();
    }
    if (attractMode) setAttractMode(false);
  }, [attractMode]);

  // Debounced search query tracking. Records what visitors searched for
  // 1.5s after they stop typing, whether or not they selected a country.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const t = setTimeout(() => { Analytics.recordSearch(q); }, 1500);
    return () => clearTimeout(t);
  }, [query]);

  // Per-country dwell time tracking.
  const dwellStartRef = useRef(null);
  const dwellCountryRef = useRef(null);
  useEffect(() => {
    if (dwellCountryRef.current && dwellStartRef.current) {
      const elapsed = (Date.now() - dwellStartRef.current) / 1000;
      Analytics.recordCountryDwell(dwellCountryRef.current, elapsed);
    }
    if (selectedCountry) {
      dwellStartRef.current = Date.now();
      dwellCountryRef.current = selectedCountry.name;
    } else {
      dwellStartRef.current = null;
      dwellCountryRef.current = null;
    }
  }, [selectedCountry]);

  // Also flush dwell on page close.
  useEffect(() => {
    const handler = () => {
      if (dwellCountryRef.current && dwellStartRef.current) {
        const elapsed = (Date.now() - dwellStartRef.current) / 1000;
        Analytics.recordCountryDwell(dwellCountryRef.current, elapsed);
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const handleSelectCountry = (c) => {
    onAnyInteraction();
    const isFirst = !sessionFirstCountryRef.current;
    sessionFirstCountryRef.current = true;
    Analytics.recordCountry(c.name, isFirst);
    setSelectedCountry(c);
    setHasEngaged(true);
    setFocusTarget({ lat: c.lat, lon: c.lon, ts: Date.now() });
  };

  const handleClosePopup = () => {
    onAnyInteraction();
    setSelectedCountry(null);
  };

  // 5-tap admin access on the invisible top-left corner trigger.
  const handleAdminTap = () => {
    const now = Date.now();
    if (now - tapsRef.current.lastTap < 700) tapsRef.current.count++;
    else tapsRef.current.count = 1;
    tapsRef.current.lastTap = now;
    if (tapsRef.current.count >= 5) {
      tapsRef.current.count = 0;
      setAdminOpen(true);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.aliases.some(a => a.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div
      onPointerDown={onAnyInteraction}
      className="w-full min-h-screen relative overflow-hidden"
      style={{
        background: COLORS.bg,
        fontFamily: "'Outfit', sans-serif",
        color: COLORS.textPrimary,
        minHeight: "100vh"
      }}
    >
      <div
        onPointerUp={handleAdminTap}
        style={{ position: "fixed", top: 0, left: 0, width: 60, height: 60, zIndex: 50, cursor: "default" }}
      />

      <div
        className="absolute"
        style={{
          left: 0,
          right: selectedCountry && !SOFT_LAUNCH_MODE ? 420 : 0,
          bottom: 0,
          top: mode === "active" ? "84px" : 0,
          opacity: 1,
          pointerEvents: "auto",
          transition: "top 0.55s cubic-bezier(.4,.0,.2,1), right 0.45s cubic-bezier(.2,.9,.2,1)",
          background: COLORS.bgSubtle
        }}
      >
        {(geoData || loadError) && (
          <Globe
            geoData={geoData || { features: [] }}
            focusTarget={focusTarget}
            onPinTap={handleSelectCountry}
            selectedCountry={selectedCountry}
            onClosePopup={handleClosePopup}
            idleSpin={true}
          />
        )}
      </div>

      {selectedCountry && mode === "active" && !SOFT_LAUNCH_MODE && <PhotoPane country={selectedCountry} />}

      <div
        className="absolute left-0 right-0 top-0"
        style={{
          height: "84px",
          background: COLORS.bg,
          borderBottom: `1px solid ${COLORS.panelBorder}`,
          opacity: mode === "active" ? 1 : 0,
          pointerEvents: "none",
          transition: "opacity 0.45s ease-out",
          zIndex: 15
        }}
      />

      <div
        className="absolute left-1/2 z-20"
        style={{
          top: "18px",
          transform: "translate(-50%, 0)",
          width: "min(600px, 86vw)",
          opacity: mode === "active" ? 1 : 0,
          pointerEvents: mode === "active" ? "auto" : "none",
          transition: "opacity 0.4s ease-out 0.2s"
        }}
      >
        <div className="flex items-center gap-3 rounded-2xl"
          style={{
            padding: "12px 18px",
            background: COLORS.bg,
            border: `1.5px solid ${(query || searchFocused) ? COLORS.accent : COLORS.panelBorderStrong}`,
            boxShadow: (query || searchFocused) ? `0 0 0 4px ${COLORS.accent}1f, ${COLORS.shadowSoft}` : COLORS.shadowSoft,
            transition: "all 0.22s"
          }}
        >
          <Search size={20}
            style={{ color: (query || searchFocused) ? COLORS.accent : COLORS.textSecondary, flexShrink: 0, transition: "all 0.3s" }} />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); onAnyInteraction(); }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
            placeholder={selectedCountry ? "Search another country..." : "Type or tap to browse 57 countries..."}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "17px",
              color: COLORS.textPrimary, minWidth: 0
            }}
          />
          {(query || selectedCountry) && (
            <button
              onPointerUp={() => {
                setQuery("");
                if (selectedCountry) setSelectedCountry(null);
              }}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
              style={{ background: COLORS.bgSubtle, color: COLORS.textSecondary, flexShrink: 0, cursor: "pointer" }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div
        className="absolute left-1/2 z-20"
        style={{
          top: "84px",
          transform: "translateX(-50%)",
          width: "min(600px, 86vw)",
          maxHeight: "min(60vh, 580px)",
          opacity: (mode === "active" && (searchFocused || query)) ? 1 : 0,
          pointerEvents: (mode === "active" && (searchFocused || query)) ? "auto" : "none",
          transition: "opacity 0.25s",
          background: COLORS.bg,
          border: `1px solid ${COLORS.panelBorder}`,
          borderRadius: 14,
          boxShadow: COLORS.shadowPop,
          overflow: "hidden",
          marginTop: 6,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div className="px-4 py-2 flex items-center justify-between flex-shrink-0"
          style={{
            borderBottom: `1px solid ${COLORS.panelBorder}`,
            fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "0.22em",
            textTransform: "uppercase", color: COLORS.textMuted, fontWeight: 600
          }}>
          <span>{filtered.length} {filtered.length === 1 ? "country" : "countries"}</span>
          <span>tap to select</span>
        </div>
        <div className="overflow-y-auto flex-1 p-2">
          {filtered.length === 0 && (
            <div style={{
              fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "14px",
              color: COLORS.textMuted, padding: "16px 12px", textAlign: "center"
            }}>
              No matching country yet. HHRD is always expanding.
            </div>
          )}
          {filtered.map(c => (
            <button key={c.name}
              onPointerUp={() => handleSelectCountry(c)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left mb-0.5"
              style={{
                background: COLORS.bg,
                border: "1px solid transparent",
                cursor: "pointer"
              }}
              onPointerEnter={(e) => {
                e.currentTarget.style.background = COLORS.bgSubtle;
                e.currentTarget.style.borderColor = COLORS.panelBorder;
              }}
              onPointerLeave={(e) => {
                e.currentTarget.style.background = COLORS.bg;
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${COLORS.accent}14`, border: `1px solid ${COLORS.accent}44` }}>
                <MapPin size={13} style={{ color: COLORS.accent }} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{
                  fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: "15px",
                  color: COLORS.textPrimary, lineHeight: 1.2, fontVariationSettings: "'opsz' 144"
                }}>
                  {c.name}
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "11px",
                  color: COLORS.textSecondary, marginTop: 1
                }}>
                  {c.programs.length} program{c.programs.length === 1 ? "" : "s"}
                </div>
              </div>
              <div className="flex gap-0.5 flex-shrink-0">
                {c.programs.slice(0, 5).map(prog => (
                  <div key={prog.code} className="w-2 h-2 rounded-full"
                    style={{ background: PROGRAMS[prog.code]?.color }} />
                ))}
                {c.programs.length > 5 && (
                  <span style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 600,
                    color: COLORS.accent, marginLeft: 2, alignSelf: "center"
                  }}>
                    +{c.programs.length - 5}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Screensaver overlay - rotating globe is already behind everything;
          this overlays a centered headline plus tap-to-begin hint. */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{
          opacity: mode === "attract" ? 1 : 0,
          transition: "opacity 0.5s ease-out",
          zIndex: 30
        }}
      >
        <div style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "12px", letterSpacing: "0.36em",
          textTransform: "uppercase", color: "#ffffff", marginBottom: 22,
          fontWeight: 600,
          textShadow: "0 2px 16px rgba(12,35,64,0.85), 0 0 30px rgba(12,35,64,0.55)",
          opacity: 0.9
        }}>
          Helping Hand for Relief and Development
        </div>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 400,
          fontSize: "clamp(48px, 7vw, 96px)",
          letterSpacing: "-0.02em",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: 1.05,
          maxWidth: "90vw",
          fontVariationSettings: "'opsz' 144",
          textShadow: "0 2px 20px rgba(12,35,64,0.92), 0 0 40px rgba(12,35,64,0.6)"
        }}>
          Find your country.
        </h1>
        <div style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(18px, 2.2vw, 28px)",
          color: "rgba(255,255,255,0.92)",
          marginTop: 18,
          textAlign: "center",
          textShadow: "0 2px 16px rgba(12,35,64,0.92), 0 0 28px rgba(12,35,64,0.55)"
        }}>
          See where HHRD is at work, and the lives behind the numbers.
        </div>
        <div style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "13px",
          letterSpacing: "0.32em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.8)", marginTop: 42,
          textShadow: "0 2px 14px rgba(12,35,64,0.92)",
          animation: "hhrd-pulse 2.4s ease-in-out infinite"
        }}>
          Tap anywhere to begin
        </div>
      </div>

      {/* Dark backdrop only behind the attract-mode headline so it reads clearly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(12,35,64,0.55) 0%, rgba(12,35,64,0.15) 60%, transparent 100%)",
          opacity: mode === "attract" ? 1 : 0,
          transition: "opacity 0.5s ease-out",
          zIndex: 25
        }}
      />

      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}

      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 40 }}>
          <div style={{
            background: COLORS.bg, border: `1px solid ${COLORS.panelBorder}`,
            borderRadius: 14, padding: "20px 28px", boxShadow: COLORS.shadowPop,
            fontFamily: "'Fraunces', serif", fontSize: "15px", color: COLORS.textPrimary,
            maxWidth: 480, textAlign: "center"
          }}>
            Unable to load globe data. Check the booth wifi connection and reload the page.
          </div>
        </div>
      )}

      <style>{`
        @keyframes hhrd-pop-in {
          0%   { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes hhrd-slide-in-right {
          0%   { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes hhrd-pulse {
          0%, 100% { opacity: 0.75; }
          50%      { opacity: 1; }
        }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.panelBorderStrong}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${COLORS.textMuted}; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
}
