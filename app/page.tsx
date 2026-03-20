"use client";

import { useState, useEffect } from "react";

/* ───── light premium palette ───── */
const c = {
  bg: "#f8f8f8",
  white: "#ffffff",
  surface: "#ffffff",
  surfaceAlt: "#f4f4f5",
  border: "#e4e4e7",
  borderLight: "#f0f0f2",
  accent: "#2563eb",
  accentSoft: "rgba(37,99,235,0.06)",
  accentBorder: "rgba(37,99,235,0.15)",
  accentHover: "rgba(37,99,235,0.1)",
  green: "#16a34a",
  greenSoft: "rgba(22,163,74,0.06)",
  greenBorder: "rgba(22,163,74,0.12)",
  amber: "#ca8a04",
  amberSoft: "rgba(202,138,4,0.06)",
  amberBorder: "rgba(202,138,4,0.12)",
  red: "#dc2626",
  redSoft: "rgba(220,38,38,0.05)",
  redBorder: "rgba(220,38,38,0.12)",
  purple: "#7c3aed",
  purpleSoft: "rgba(124,58,237,0.06)",
  purpleBorder: "rgba(124,58,237,0.12)",
  text: "#18181b",
  textSecondary: "#52525b",
  textTertiary: "#a1a1aa",
  input: "#ffffff",
};

const font = `-apple-system, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif`;

/* ───── nav ───── */
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "quotes", label: "Quotes", icon: "✎" },
  { id: "jobs", label: "Jobs", icon: "▦" },
  { id: "customers", label: "Customers", icon: "◉" },
  { id: "photos", label: "Photos", icon: "◻" },
  { id: "reports", label: "Reports", icon: "◈" },
  { id: "chemicals", label: "Chemicals", icon: "◆" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

/* ───── PW data ───── */
const serviceTypes = [
  { id: "house_wash", name: "House Wash", baseRate: 0.15, desc: "Exterior siding soft wash" },
  { id: "driveway", name: "Driveway / Flatwork", baseRate: 0.12, desc: "Concrete, pavers, brick" },
  { id: "deck", name: "Deck Cleaning", baseRate: 0.25, desc: "Wood or composite deck" },
  { id: "deck_restore", name: "Deck Restoration", baseRate: 0.55, desc: "Strip, brighten, seal" },
  { id: "roof", name: "Roof Soft Wash", baseRate: 0.30, desc: "Low pressure chemical clean" },
  { id: "fence", name: "Fence Cleaning", baseRate: 0.18, desc: "Wood or vinyl fence" },
  { id: "gutter", name: "Gutter Brightening", baseRate: 1.50, desc: "Per linear foot" },
  { id: "commercial", name: "Commercial Wash", baseRate: 0.10, desc: "Storefronts and lots" },
];

const surfaceTypes = [
  { id: "vinyl", name: "Vinyl Siding", mod: 1.0 },
  { id: "wood_siding", name: "Wood Siding", mod: 1.2 },
  { id: "brick", name: "Brick", mod: 1.15 },
  { id: "stucco", name: "Stucco", mod: 1.25 },
  { id: "concrete", name: "Concrete", mod: 1.0 },
  { id: "pavers", name: "Pavers", mod: 1.3 },
  { id: "treated_wood", name: "Treated Wood", mod: 1.1 },
  { id: "composite", name: "Composite", mod: 1.15 },
  { id: "asphalt_shingle", name: "Asphalt Shingle", mod: 1.0 },
  { id: "metal_roof", name: "Metal Roof", mod: 1.35 },
  { id: "tile_roof", name: "Tile Roof", mod: 1.4 },
];

const stats = [
  { label: "Jobs this week", value: "14", sub: "+3 from last week", up: true },
  { label: "Open quotes", value: "$8,420", sub: "6 pending", up: true },
  { label: "Revenue MTD", value: "$12,680", sub: "+18% vs last month", up: true },
  { label: "Close rate", value: "72%", sub: "+4% improvement", up: true },
];

const jobs = [
  { client: "Marcus Rivera", service: "House Wash", sqft: "2,400", surface: "Vinyl Siding", status: "Scheduled", date: "Today, 9:00 AM", amount: "$387.50", addr: "2847 Palm Ave, Tampa FL 33609", dayIdx: 2, hour: 9, duration: 2 },
  { client: "Jennifer Collins", service: "Driveway + Sidewalk", sqft: "1,800", surface: "Concrete", status: "In Progress", date: "Today, 1:30 PM", amount: "$225", addr: "1105 Bayshore Blvd, Tampa FL 33606", dayIdx: 2, hour: 13, duration: 2 },
  { client: "Lakewood HOA", service: "Commercial Wash", sqft: "12,000", surface: "Stucco", status: "Scheduled", date: "Tomorrow, 7:00 AM", amount: "$1,875", addr: "9210 Lakewood Ranch Blvd, Bradenton FL 34202", dayIdx: 3, hour: 7, duration: 4 },
  { client: "Daniel Park", service: "Deck Restoration", sqft: "600", surface: "Treated Wood", status: "Quote Sent", date: "Mar 22", amount: "$437.50", addr: "445 Gulf Way, St Petersburg FL 33706", dayIdx: 5, hour: 10, duration: 3 },
  { client: "Sarah Mitchell", service: "Roof Soft Wash", sqft: "3,200", surface: "Asphalt Shingle", status: "Completed", date: "Mar 16", amount: "$512.50", addr: "8820 Citrus Park Dr, Tampa FL 33625", dayIdx: 0, hour: 8, duration: 3 },
  { client: "Tony Reeves", service: "House Wash", sqft: "1,900", surface: "Brick", status: "Scheduled", date: "Thu, 10:00 AM", amount: "$312.50", addr: "320 Siesta Key Dr, Sarasota FL 34242", dayIdx: 3, hour: 14, duration: 2 },
  { client: "Palm Bay Dental", service: "Commercial Wash", sqft: "4,500", surface: "Stucco", status: "Scheduled", date: "Sat, 8:00 AM", amount: "$675", addr: "1400 Palm Bay Rd NE, Melbourne FL 32905", dayIdx: 5, hour: 8, duration: 3 },
  { client: "Lisa Hernandez", service: "Fence Cleaning", sqft: "800", surface: "Wood Siding", status: "Scheduled", date: "Fri, 9:00 AM", amount: "$187.50", addr: "906 W Swann Ave, Tampa FL 33606", dayIdx: 4, hour: 9, duration: 2 },
];

const calendarDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const calendarDates = ["Mar 17", "Mar 18", "Mar 19", "Mar 20", "Mar 21", "Mar 22"];
const calendarHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const chemicals = [
  { name: "Sodium Hypochlorite (12.5%)", stock: "42 gal", mix: "House wash: 1-3% · Roof: 3-6%", status: "Good", low: false, costGal: 3.50, usedMonth: 28, supplier: "UniSource Chemical", lastOrder: "Mar 3", safetyNote: "Store below 75°F — degrades in heat", jobs: 14 },
  { name: "Surfactant (Elemonator)", stock: "6 gal", mix: "1 oz per gallon of SH mix", status: "Good", low: false, costGal: 42.00, usedMonth: 2.5, supplier: "SouthEast SoftWash", lastOrder: "Feb 18", safetyNote: "Biodegradable · Plant-safe", jobs: 14 },
  { name: "Sodium Hydroxide", stock: "2 gal", mix: "4-6 oz/gal for heavy degreasing", status: "Low", low: true, costGal: 18.00, usedMonth: 4, supplier: "UniSource Chemical", lastOrder: "Feb 2", safetyNote: "Caustic — full PPE required", jobs: 5 },
  { name: "Oxalic Acid", stock: "8 lbs", mix: "4 oz/gal for rust & oxidation", status: "Good", low: false, costGal: 12.00, usedMonth: 3, supplier: "Pressure Tek", lastOrder: "Jan 22", safetyNote: "Rinse vegetation before & after", jobs: 3 },
];

const weather = [
  { day: "Today", temp: "78°", rain: "0%" },
  { day: "Thu", temp: "81°", rain: "10%" },
  { day: "Fri", temp: "74°", rain: "65%" },
  { day: "Sat", temp: "82°", rain: "0%" },
];

const statusMap: Record<string, { bg: string; border: string; text: string }> = {
  Scheduled: { bg: c.accentSoft, border: c.accentBorder, text: c.accent },
  "In Progress": { bg: c.amberSoft, border: c.amberBorder, text: c.amber },
  "Quote Sent": { bg: c.purpleSoft, border: c.purpleBorder, text: c.purple },
  Completed: { bg: c.greenSoft, border: c.greenBorder, text: c.green },
};

/* ───── customers ───── */
const customers = [
  { id: 1, name: "Marcus Rivera", phone: "(813) 555-0142", email: "marcus.r@email.com", address: "2847 Palm Ave, Tampa FL 33609", totalSpent: "$1,637.50", jobCount: 4, lastService: "Mar 18, 2026", type: "Residential", note: "Annual house wash + driveway. Prefers early morning. Gate code: 4821" },
  { id: 2, name: "Jennifer Collins", phone: "(813) 555-0287", email: "jcollins@gmail.com", address: "1105 Bayshore Blvd, Tampa FL 33606", totalSpent: "$862.50", jobCount: 3, lastService: "Mar 18, 2026", type: "Residential", note: "Has dogs in backyard — call before arrival. Prefers text communication." },
  { id: 3, name: "Lakewood HOA", phone: "(813) 555-0401", email: "admin@lakewoodhoa.com", address: "9210 Lakewood Ranch Blvd, Bradenton FL 34202", totalSpent: "$7,312.50", jobCount: 6, lastService: "Mar 19, 2026", type: "Commercial", note: "Quarterly contract. 12 buildings. Contact: Dave the property manager. Net 30 terms." },
  { id: 4, name: "Daniel Park", phone: "(727) 555-0193", email: "dpark@outlook.com", address: "445 Gulf Way, St Petersburg FL 33706", totalSpent: "$437.50", jobCount: 1, lastService: "Pending", type: "Residential", note: "New customer from Google. Deck is treated wood, has some mold on north side." },
  { id: 5, name: "Sarah Mitchell", phone: "(813) 555-0556", email: "sarah.m@yahoo.com", address: "8820 Citrus Park Dr, Tampa FL 33625", totalSpent: "$1,962.50", jobCount: 5, lastService: "Mar 16, 2026", type: "Residential", note: "Repeat customer since 2024. Annual roof wash + house wash. Always leaves 5-star review." },
  { id: 6, name: "Tony Reeves", phone: "(941) 555-0312", email: "treeves@email.com", address: "320 Siesta Key Dr, Sarasota FL 34242", totalSpent: "$625", jobCount: 2, lastService: "Mar 20, 2026", type: "Residential", note: "Brick home, needs extra attention on north-facing wall. Older couple." },
  { id: 7, name: "Palm Bay Dental", phone: "(321) 555-0188", email: "office@palmbaydentalfl.com", address: "1400 Palm Bay Rd NE, Melbourne FL 32905", totalSpent: "$2,025", jobCount: 3, lastService: "Mar 22, 2026", type: "Commercial", note: "Bi-monthly building wash. Must be done before 7 AM Saturday — patients arrive at 8." },
  { id: 8, name: "Lisa Hernandez", phone: "(813) 555-0624", email: "lisah@gmail.com", address: "906 W Swann Ave, Tampa FL 33606", totalSpent: "$187.50", jobCount: 1, lastService: "Mar 21, 2026", type: "Residential", note: "Referral from Sarah Mitchell. Wood fence has green algae." },
];

/* ───── photos (before/after pairs by job) ───── */
const photoSets = [
  { id: 1, client: "Sarah Mitchell", service: "Roof Soft Wash", date: "Mar 16, 2026", surface: "Asphalt Shingle", beforeColor: "#4a5d4a", afterColor: "#8fa88f", notes: "Heavy black algae removed. 2 applications of 3% SH mix." },
  { id: 2, client: "Marcus Rivera", service: "House Wash", date: "Feb 12, 2026", surface: "Vinyl Siding", beforeColor: "#6b6b5e", afterColor: "#c9c9b8", notes: "Green algae on north side. Standard house wash mix." },
  { id: 3, client: "Jennifer Collins", service: "Driveway", date: "Jan 28, 2026", surface: "Concrete", beforeColor: "#5c5c5c", afterColor: "#b0b0b0", notes: "Oil stains near garage required degreaser pre-treatment." },
  { id: 4, client: "Lakewood HOA", service: "Building Wash", date: "Jan 15, 2026", surface: "Stucco", beforeColor: "#7a6e5e", afterColor: "#c4b8a8", notes: "Building 4 of 12. Mildew on west face. Post-treat applied." },
  { id: 5, client: "Sarah Mitchell", service: "House Wash", date: "Dec 8, 2025", surface: "Vinyl Siding", beforeColor: "#6e7a6e", afterColor: "#aabdaa", notes: "Annual house wash. Added gutter brightening. Customer very happy." },
  { id: 6, client: "Tony Reeves", service: "House Wash", date: "Nov 22, 2025", surface: "Brick", beforeColor: "#8a6a5a", afterColor: "#c49a8a", notes: "Brick needed lower pressure. 1200 PSI with fan tip." },
];

/* ───── quotes pipeline with follow-ups ───── */
const quotesPipeline = [
  { id: 1, client: "Daniel Park", service: "Deck Restoration", amount: 437.50, sqft: "600 sqft", surface: "Treated Wood", phone: "(727) 555-0193", addr: "445 Gulf Way, St Petersburg FL 33706", sentDate: "Mar 14", status: "awaiting", viewed: true, followUps: [
    { type: "auto", message: "Hi Daniel, just following up on your deck restoration quote. Any questions I can answer?", sentAt: "Mar 15, 10:00 AM", status: "delivered" },
    { type: "auto", message: "Hey Daniel — wanted to check in on your deck quote ($437.50). We have availability this week if you'd like to get it scheduled.", sentAt: "Mar 17, 10:00 AM", status: "delivered" },
  ]},
  { id: 2, client: "Rachel Torres", service: "House Wash + Driveway", amount: 512.50, sqft: "2,800 sqft", surface: "Stucco", phone: "(813) 555-0331", addr: "1200 Davis Islands Dr, Tampa FL 33606", sentDate: "Mar 16", status: "awaiting", viewed: false, followUps: [
    { type: "auto", message: "Hi Rachel, following up on your house wash and driveway quote. Happy to answer any questions!", sentAt: "Mar 17, 10:00 AM", status: "delivered" },
  ]},
  { id: 3, client: "Mike Bradley", service: "Roof Soft Wash", amount: 787.50, sqft: "3,400 sqft", surface: "Asphalt Shingle", phone: "(941) 555-0218", addr: "88 Longboat Key Rd, Sarasota FL 34228", sentDate: "Mar 12", status: "stale", viewed: true, followUps: [
    { type: "auto", message: "Hi Mike, just following up on the roof wash quote. Let me know if you have any questions.", sentAt: "Mar 13, 10:00 AM", status: "delivered" },
    { type: "auto", message: "Hey Mike, checking in one more time on your roof soft wash quote ($787.50). Would love to get you on the schedule.", sentAt: "Mar 15, 10:00 AM", status: "delivered" },
    { type: "auto", message: "Last follow-up on your roof wash quote — let me know if you're still interested or if anything changed.", sentAt: "Mar 18, 10:00 AM", status: "sent" },
  ]},
  { id: 4, client: "Sunrise Condo Assoc.", service: "Building Wash x2", amount: 3250, sqft: "18,000 sqft", surface: "Stucco", phone: "(321) 555-0455", addr: "500 N Ocean Dr, Melbourne FL 32903", sentDate: "Mar 17", status: "new", viewed: false, followUps: [] },
  { id: 5, client: "Ashley Turner", service: "Fence + Driveway", amount: 312.50, sqft: "1,200 sqft", surface: "Concrete / Wood", phone: "(813) 555-0789", addr: "2200 W Gandy Blvd, Tampa FL 33611", sentDate: "Mar 11", status: "won", viewed: true, followUps: [
    { type: "auto", message: "Hi Ashley, following up on your fence and driveway quote.", sentAt: "Mar 12, 10:00 AM", status: "delivered" },
  ]},
  { id: 6, client: "Greg Lawson", service: "House Wash", amount: 287.50, sqft: "1,600 sqft", surface: "Vinyl Siding", phone: "(727) 555-0601", addr: "940 4th St N, St Petersburg FL 33701", sentDate: "Mar 10", status: "lost", viewed: true, followUps: [
    { type: "auto", message: "Hi Greg, following up on your house wash quote.", sentAt: "Mar 11, 10:00 AM", status: "delivered" },
    { type: "auto", message: "Hey Greg, checking in on the house wash quote ($287.50). Any questions?", sentAt: "Mar 13, 10:00 AM", status: "delivered" },
  ]},
];

const quoteStatusLabels: Record<string, { label: string; bg: string; border: string; text: string }> = {
  new: { label: "New", bg: c.accentSoft, border: c.accentBorder, text: c.accent },
  awaiting: { label: "Awaiting response", bg: c.amberSoft, border: c.amberBorder, text: c.amber },
  stale: { label: "Needs attention", bg: c.redSoft, border: c.redBorder, text: c.red },
  won: { label: "Won", bg: c.greenSoft, border: c.greenBorder, text: c.green },
  lost: { label: "Lost", bg: "#71717a10", border: "#71717a20", text: "#71717a" },
};

/* ───── day weather for calendar headers ───── */
const dayWeather: Record<number, { icon: string; rain: string }> = {
  0: { icon: "clear", rain: "0%" },
  1: { icon: "clear", rain: "5%" },
  2: { icon: "clear", rain: "0%" },
  3: { icon: "partly", rain: "10%" },
  4: { icon: "rain", rain: "65%" },
  5: { icon: "clear", rain: "0%" },
};

/* ───── shared ───── */
const card = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: c.surface,
  border: `1px solid ${c.border}`,
  borderRadius: 12,
  padding: "22px 24px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  ...extra,
});

const inputBase: React.CSSProperties = {
  width: "100%", padding: "9px 12px", background: c.input, border: `1px solid ${c.border}`,
  borderRadius: 8, color: c.text, fontSize: 13, fontFamily: font, outline: "none", boxSizing: "border-box",
};

const lbl: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 500, color: c.textSecondary, marginBottom: 5,
};

/* ═══════════════════════════════════════ */
export default function WashCRM() {
  const [showLanding, setShowLanding] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardStep, setOnboardStep] = useState(0);
  const [obBiz, setObBiz] = useState("");
  const [obPhone, setObPhone] = useState("");
  const [obCity, setObCity] = useState("");
  const [obServices, setObServices] = useState<string[]>([]);
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarW, setSidebarW] = useState(56);
  const [draggingSb, setDraggingSb] = useState(false);

  useEffect(() => {
    if (!draggingSb) return;
    const onMove = (e: MouseEvent) => {
      const w = Math.max(56, Math.min(280, e.clientX));
      setSidebarW(w);
      setSidebarOpen(w > 120);
    };
    const onUp = () => setDraggingSb(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
  }, [draggingSb]);
  const [jobView, setJobView] = useState<"list" | "calendar">("calendar");
  const [custSearch, setCustSearch] = useState("");
  const [selectedCust, setSelectedCust] = useState<number | null>(null);
  const [quotesView, setQuotesView] = useState<"list" | "builder">("list");
  const [expandedQuote, setExpandedQuote] = useState<number | null>(null);
  const [activeJob, setActiveJob] = useState<string | null>(null);
  const [jobPhase, setJobPhase] = useState<"preview" | "active" | "completing" | "done">("preview");
  const [jobTimer, setJobTimer] = useState(0);
  const [jobChemLogs, setJobChemLogs] = useState<{name: string; amount: string; mix: string}[]>([]);
  const [addingChem, setAddingChem] = useState(false);
  const [newChemName, setNewChemName] = useState("Sodium Hypochlorite");
  const [newChemAmt, setNewChemAmt] = useState("");
  const [newChemMix, setNewChemMix] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [schedulingQuote, setSchedulingQuote] = useState<number | null>(null);
  const [schedDate, setSchedDate] = useState("");
  const [schedTime, setSchedTime] = useState("09:00");
  const [schedDuration, setSchedDuration] = useState("2");
  const [schedConfirmed, setSchedConfirmed] = useState(false);
  const [weatherExpanded, setWeatherExpanded] = useState(false);
  const [invoicePaid, setInvoicePaid] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 2500); };

  const [qService, setQService] = useState("");
  const [qSurface, setQSurface] = useState("");
  const [qSqft, setQSqft] = useState("");
  const [qName, setQName] = useState("");
  const [qPhone, setQPhone] = useState("");
  const [qEmail, setQEmail] = useState("");
  const [qAddr, setQAddr] = useState("");
  const [qNotes, setQNotes] = useState("");
  const [qDone, setQDone] = useState(false);

  /* ── mobile responsive ── */
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const g = (desktop: string, mobile?: string) => mobile && isMobile ? mobile : desktop;

  const svc = serviceTypes.find((s) => s.id === qService);
  const surf = surfaceTypes.find((s) => s.id === qSurface);
  const sqftN = parseInt(qSqft) || 0;
  const price = svc ? Math.round(sqftN * svc.baseRate * (surf?.mod ?? 1)) : 0;

  const resetQ = () => { setQService(""); setQSurface(""); setQSqft(""); setQName(""); setQPhone(""); setQEmail(""); setQAddr(""); setQNotes(""); setQDone(false); };
  const resetJob = () => { setActiveJob(null); setJobPhase("preview"); setJobTimer(0); setJobChemLogs([]); setAddingChem(false); setShowInvoice(false); };
  const activeJobData = jobs.find(j => j.client === activeJob);
  const formatTime = (s: number) => { const m = Math.floor(s / 60); const h = Math.floor(m / 60); return h > 0 ? `${h}h ${m % 60}m` : `${m}m`; };

  return (
    <>
    {/* Toast notification */}
    {toastMsg && (
      <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", padding: "10px 24px", background: c.text, color: c.white, borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", fontFamily: font }}>{toastMsg}</div>
    )}
    {/* ════════ LANDING PAGE ════════ */}
    {showLanding && (
      <div style={{ minHeight: "100vh", background: c.white, color: c.text, fontFamily: font, overflowX: "hidden" }}>
        {/* Nav */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "16px 20px" : "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}><span style={{ color: c.accent }}>Wash</span>CRM</div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {!isMobile && <span onClick={() => showToast("Scroll to features")} style={{ fontSize: 13, color: c.textSecondary, cursor: "pointer" }}>Features</span>}
            {!isMobile && <span onClick={() => showToast("Scroll to pricing")} style={{ fontSize: 13, color: c.textSecondary, cursor: "pointer" }}>Pricing</span>}
            <button onClick={() => { setShowLanding(false); setShowOnboarding(true); }} style={{ padding: "8px 20px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Try the Demo</button>
          </div>
        </div>

        {/* Hero */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "48px 20px 40px" : "80px 28px 60px", textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "5px 14px", background: c.greenSoft, border: `1px solid ${c.greenBorder}`, borderRadius: 20, fontSize: 12, color: c.green, fontWeight: 500, marginBottom: 20 }}>Built by a pressure washer, for pressure washers</div>
          <h1 style={{ fontSize: isMobile ? 32 : 52, fontWeight: 800, color: c.text, margin: "0 0 16px", letterSpacing: "-2px", lineHeight: 1.1 }}>
            Stop losing jobs.<br />Start getting paid faster.
          </h1>
          <p style={{ fontSize: 18, color: c.textSecondary, maxWidth: 620, margin: "0 auto 36px", lineHeight: 1.6 }}>
            The only CRM built around how pressure washing actually works. Sq ft quoting, chemical tracking, auto follow-ups, before/after photos — all in one place.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 16, flexDirection: isMobile ? "column" : "row", alignItems: "center" }}>
            <button onClick={() => { setShowLanding(false); setShowOnboarding(true); }} style={{ padding: "14px 32px", background: c.accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 12px rgba(59,130,246,0.25)" }}>Try the Live Demo</button>
            <button onClick={() => showToast("Video demo — coming soon")} style={{ padding: "14px 32px", background: c.white, color: c.text, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Watch 60s Video</button>
          </div>
          <p style={{ fontSize: 13, color: c.textTertiary }}>No credit card required. See it working in 30 seconds.</p>
        </div>

        {/* Social proof bar */}
        <div style={{ background: c.surfaceAlt, borderTop: `1px solid ${c.borderLight}`, borderBottom: `1px solid ${c.borderLight}`, padding: "18px 28px", textAlign: "center" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "center", gap: isMobile ? 20 : 40, flexWrap: "wrap" }}>
            {[
              { stat: "4 extra jobs/mo", sub: "recovered from auto follow-ups" },
              { stat: "$1,840/mo", sub: "avg revenue recovered" },
              { stat: "72%", sub: "quote close rate" },
              { stat: "< 60 seconds", sub: "to build & send a quote" },
            ].map((s) => (
              <div key={s.stat}>
                <div style={{ fontSize: 18, fontWeight: 700, color: c.accent }}>{s.stat}</div>
                <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem → Solution */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "40px 20px" : "60px 28px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: c.text, margin: "0 0 12px", letterSpacing: "-1px" }}>Built different. Because pressure washing is different.</h2>
            <p style={{ fontSize: 15, color: c.textSecondary, maxWidth: 560, margin: "0 auto" }}>Jobber and Housecall Pro were built for plumbers. We were built for you.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20, marginBottom: 48 }}>
            {[
              { title: "Sq ft quoting by surface type", desc: "Pick the service, pick the surface, enter square footage. Price calculates instantly. Customers get a professional quote in under 60 seconds.", color: c.accent },
              { title: "Chemical tracking & mix ratios", desc: "Log what you use on every job. Track inventory, cost per gallon, and get low stock alerts before you run out mid-week.", color: "#7c3aed" },
              { title: "Auto follow-ups that close deals", desc: "Quotes go stale. WashCRM sends texts at 24 hours, 3 days, and 7 days automatically. Our users recover 3-4 extra jobs per month.", color: c.green },
              { title: "Before & after photos", desc: "Attach photos to every job. They auto-attach to invoices so customers see the transformation when you send the bill. Powerful.", color: "#ec4899" },
              { title: "Weather-aware scheduling", desc: "See rain probability on your calendar. Get alerts when rain might affect tomorrow's jobs. Reschedule before your customer calls you.", color: c.amber },
              { title: "One-tap invoicing", desc: "Finish a job, tap 'Send Invoice.' Customer gets it by text with before/after photos attached. Payment reminders fire automatically.", color: c.red },
            ].map((f) => (
              <div key={f.title} style={{ padding: "28px 24px", background: c.white, borderRadius: 12, border: `1px solid ${c.border}` }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: f.color, marginBottom: 14 }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: c.text, marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div style={{ background: c.surfaceAlt, borderTop: `1px solid ${c.borderLight}`, borderBottom: `1px solid ${c.borderLight}`, padding: "60px 28px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", overflowX: isMobile ? "auto" : "visible" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: c.text, textAlign: "center", margin: "0 0 32px", letterSpacing: "-0.5px" }}>How WashCRM compares</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "12px 16px", fontSize: 13, fontWeight: 600, color: c.textTertiary, borderBottom: `2px solid ${c.border}` }}>Feature</th>
                  <th style={{ textAlign: "center", padding: "12px 16px", fontSize: 13, fontWeight: 700, color: c.accent, borderBottom: `2px solid ${c.accent}` }}>WashCRM</th>
                  <th style={{ textAlign: "center", padding: "12px 16px", fontSize: 13, fontWeight: 600, color: c.textTertiary, borderBottom: `2px solid ${c.border}` }}>Jobber</th>
                  <th style={{ textAlign: "center", padding: "12px 16px", fontSize: 13, fontWeight: 600, color: c.textTertiary, borderBottom: `2px solid ${c.border}` }}>HCP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Sq ft quoting by surface type", wash: true, jobber: false, hcp: false },
                  { feature: "Chemical tracking & mix ratios", wash: true, jobber: false, hcp: false },
                  { feature: "Before/after photo workflow", wash: true, jobber: false, hcp: false },
                  { feature: "Auto text follow-ups", wash: true, jobber: false, hcp: true },
                  { feature: "Weather on calendar", wash: true, jobber: false, hcp: false },
                  { feature: "One-tap invoicing with photos", wash: true, jobber: false, hcp: false },
                  { feature: "Built for pressure washing", wash: true, jobber: false, hcp: false },
                  { feature: "Starts at $49/mo", wash: true, jobber: false, hcp: false },
                ].map((row) => (
                  <tr key={row.feature}>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: c.text, borderBottom: `1px solid ${c.borderLight}` }}>{row.feature}</td>
                    <td style={{ padding: "12px 16px", fontSize: 14, textAlign: "center", borderBottom: `1px solid ${c.borderLight}`, color: c.green, fontWeight: 600 }}>{row.wash ? "✓" : "—"}</td>
                    <td style={{ padding: "12px 16px", fontSize: 14, textAlign: "center", borderBottom: `1px solid ${c.borderLight}`, color: row.jobber ? c.green : c.textTertiary }}>{row.jobber ? "✓" : "—"}</td>
                    <td style={{ padding: "12px 16px", fontSize: 14, textAlign: "center", borderBottom: `1px solid ${c.borderLight}`, color: row.hcp ? c.green : c.textTertiary }}>{row.hcp ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "40px 20px" : "60px 28px" }}>
          <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: c.text, textAlign: "center", margin: "0 0 12px", letterSpacing: "-1px" }}>Simple pricing. No per-user fees.</h2>
          <p style={{ fontSize: 15, color: c.textSecondary, textAlign: "center", marginBottom: 36 }}>One price. Everything included. Cancel anytime.</p>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, maxWidth: 900, margin: "0 auto" }}>
            {[
              { name: "Solo", price: "$49", sub: "/month", desc: "For one-truck operations", features: ["Unlimited quotes & jobs", "Auto follow-ups (text)", "Chemical tracking", "Before/after photos", "Invoicing", "1 user"], popular: false },
              { name: "Grow", price: "$99", sub: "/month", desc: "For growing businesses", features: ["Everything in Solo", "Up to 5 users", "Route optimization", "Google review requests", "QuickBooks sync", "Priority support"], popular: true },
              { name: "Pro", price: "$149", sub: "/month", desc: "For established companies", features: ["Everything in Grow", "Unlimited users", "Crew management", "AI text responder", "Custom branding", "Dedicated onboarding"], popular: false },
            ].map((plan) => (
              <div key={plan.name} style={{ padding: "32px 28px", background: c.white, borderRadius: 12, border: plan.popular ? `2px solid ${c.accent}` : `1px solid ${c.border}`, position: "relative" }}>
                {plan.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 14px", background: c.accent, color: "#fff", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>Most popular</div>}
                <div style={{ fontSize: 16, fontWeight: 600, color: c.text, marginBottom: 4 }}>{plan.name}</div>
                <div style={{ fontSize: 13, color: c.textTertiary, marginBottom: 16 }}>{plan.desc}</div>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: c.text, letterSpacing: "-2px" }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: c.textTertiary }}>{plan.sub}</span>
                </div>
                <button onClick={() => { setShowLanding(false); setShowOnboarding(true); }} style={{ width: "100%", padding: "10px", background: plan.popular ? c.accent : c.white, color: plan.popular ? "#fff" : c.text, border: plan.popular ? "none" : `1px solid ${c.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 20 }}>
                  {plan.popular ? "Start Free Trial" : "Try Demo"}
                </button>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 13, color: c.textSecondary }}>
                    <span style={{ color: c.green, fontSize: 12, fontWeight: 700 }}>✓</span> {f}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ background: c.surfaceAlt, borderTop: `1px solid ${c.borderLight}`, padding: "60px 28px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: c.text, textAlign: "center", margin: "0 0 32px", letterSpacing: "-0.5px" }}>What PW owners are saying</h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
              {[
                { quote: "The auto follow-ups alone pay for this. I was losing 3-4 quotes a month because I'd forget to check back. Now it's automatic and I'm closing way more.", name: "Jake R.", biz: "Clean Pros Tampa", revenue: "+$1,600/mo from follow-ups" },
                { quote: "I switched from Jobber. It's half the price and actually knows what pressure washing is. Sq ft quoting by surface type is a game changer for estimates.", name: "Travis M.", biz: "Gulf Coast Pressure Washing", revenue: "Saved $180/mo vs Jobber" },
                { quote: "Before/after photos attached to the invoice is genius. Customers see the transformation and pay faster. My average payment time dropped from 5 days to same-day.", name: "DeAndre W.", biz: "Spot Free Exteriors", revenue: "Getting paid 4 days faster" },
              ].map((t) => (
                <div key={t.name} style={{ padding: "24px", background: c.white, borderRadius: 12, border: `1px solid ${c.border}` }}>
                  <div style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>&ldquo;{t.quote}&rdquo;</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: c.textTertiary }}>{t.biz}</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: c.green, marginTop: 6 }}>{t.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "48px 20px" : "80px 28px", textAlign: "center" }}>
          <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, color: c.text, margin: "0 0 12px", letterSpacing: "-1.5px" }}>Ready to run your business,<br />not chase it?</h2>
          <p style={{ fontSize: 16, color: c.textSecondary, marginBottom: 28 }}>Join pressure washers who are closing more jobs and getting paid faster.</p>
          <button onClick={() => { setShowLanding(false); setShowOnboarding(true); }} style={{ padding: "14px 36px", background: c.accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 12px rgba(59,130,246,0.25)" }}>Try the Live Demo</button>
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${c.border}`, padding: "24px 28px", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: c.textTertiary }}>© 2026 WashCRM. Built for pressure washers, by pressure washers.</span>
        </div>
      </div>
    )}

    {/* ════════ ONBOARDING ════════ */}
    {!showLanding && showOnboarding && (
      <div style={{ minHeight: "100vh", background: c.bg, fontFamily: font, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 520, padding: "0 24px" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" }}><span style={{ color: c.accent }}>Wash</span>CRM</div>
            <div style={{ fontSize: 13, color: c.textTertiary, marginTop: 6 }}>Let&apos;s set up your business in 60 seconds</div>
          </div>

          {/* Progress */}
          <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= onboardStep ? c.accent : c.border, transition: "background 0.3s" }} />
            ))}
          </div>

          {/* Step 0: Business info */}
          {onboardStep === 0 && (
            <div style={card({ padding: "32px" })}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: c.text, margin: "0 0 4px" }}>Your business</h2>
              <p style={{ fontSize: 13, color: c.textTertiary, margin: "0 0 24px" }}>Basic info so we can set up your quotes and invoices</p>

              <div style={{ marginBottom: 16 }}>
                <label style={lbl}>Business name</label>
                <input placeholder="e.g. Hall Power Washing" value={obBiz} onChange={(e) => setObBiz(e.target.value)} style={inputBase} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={lbl}>Phone number</label>
                <input placeholder="(813) 555-0100" value={obPhone} onChange={(e) => setObPhone(e.target.value)} style={inputBase} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={lbl}>City / Area</label>
                <input placeholder="e.g. Tampa, FL" value={obCity} onChange={(e) => setObCity(e.target.value)} style={inputBase} />
              </div>

              <button onClick={() => setOnboardStep(1)} style={{ width: "100%", padding: "12px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Continue</button>
            </div>
          )}

          {/* Step 1: Services */}
          {onboardStep === 1 && (
            <div style={card({ padding: "32px" })}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: c.text, margin: "0 0 4px" }}>What services do you offer?</h2>
              <p style={{ fontSize: 13, color: c.textTertiary, margin: "0 0 24px" }}>Select all that apply — you can customize pricing later</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                {["House Wash", "Roof Soft Wash", "Driveway / Concrete", "Deck Restoration", "Commercial / Building", "Fence Cleaning", "Gutter Brightening", "Window Cleaning"].map((svc) => {
                  const active = obServices.includes(svc);
                  return (
                    <div key={svc} onClick={() => setObServices(active ? obServices.filter(s => s !== svc) : [...obServices, svc])} style={{
                      padding: "14px 16px", borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
                      background: active ? c.accentSoft : c.white,
                      border: `1.5px solid ${active ? c.accent : c.border}`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? c.accent : c.text }}>{svc}</span>
                        {active && <span style={{ fontSize: 14, color: c.accent, fontWeight: 700 }}>✓</span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setOnboardStep(0)} style={{ flex: 1, padding: "12px", background: c.white, color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 14, cursor: "pointer" }}>Back</button>
                <button onClick={() => setOnboardStep(2)} style={{ flex: 2, padding: "12px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Continue</button>
              </div>
            </div>
          )}

          {/* Step 2: Features */}
          {onboardStep === 2 && (
            <div style={card({ padding: "32px" })}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: c.text, margin: "0 0 4px" }}>You&apos;re all set!</h2>
              <p style={{ fontSize: 13, color: c.textTertiary, margin: "0 0 24px" }}>Here&apos;s what we&apos;ve turned on for you</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {[
                  { feature: "Auto follow-ups on quotes", desc: "Text reminders at 24hrs, 3 days, and 7 days", icon: "💬" },
                  { feature: "Chemical tracking", desc: "Log usage per job, track inventory and costs", icon: "🧪" },
                  { feature: "Before & after photos", desc: "Attached to invoices automatically", icon: "📸" },
                  { feature: "Google review requests", desc: "Sent 24 hours after job completion", icon: "⭐" },
                  { feature: "Weather-aware calendar", desc: "Rain alerts on your schedule", icon: "🌧️" },
                ].map((f) => (
                  <div key={f.feature} style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px 14px", background: c.greenSoft, borderRadius: 8, border: `1px solid ${c.greenBorder}` }}>
                    <span style={{ fontSize: 20 }}>{f.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{f.feature}</div>
                      <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 1 }}>{f.desc}</div>
                    </div>
                    <span style={{ marginLeft: "auto", fontSize: 12, color: c.green, fontWeight: 600 }}>ON</span>
                  </div>
                ))}
              </div>

              {obBiz && (
                <div style={{ padding: "14px 16px", background: c.surfaceAlt, borderRadius: 8, border: `1px solid ${c.borderLight}`, marginBottom: 24 }}>
                  <div style={{ fontSize: 11, color: c.textTertiary, marginBottom: 6 }}>Your business</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: c.text }}>{obBiz}</div>
                  <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 2 }}>{obCity} · {obPhone}</div>
                  {obServices.length > 0 && <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 6 }}>{obServices.join(" · ")}</div>}
                </div>
              )}

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setOnboardStep(1)} style={{ flex: 1, padding: "12px", background: c.white, color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 14, cursor: "pointer" }}>Back</button>
                <button onClick={() => setShowOnboarding(false)} style={{ flex: 2, padding: "12px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Launch Dashboard →</button>
              </div>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span onClick={() => setShowOnboarding(false)} style={{ fontSize: 12, color: c.textTertiary, cursor: "pointer" }}>Skip setup →</span>
          </div>
        </div>
      </div>
    )}

    {/* ════════ APP ════════ */}
    {!showLanding && !showOnboarding && (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: c.bg, color: c.text, fontFamily: font, overflow: "hidden", ...(draggingSb ? { userSelect: "none" as const } : {}) }}>

      {/* ── MOBILE HEADER ── */}
      {isMobile && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: c.white, borderBottom: `1px solid ${c.border}`, flexShrink: 0 }}>
          <div onClick={() => { setPage("dashboard"); resetJob(); setSelectedCust(null); setMobileMenu(false); }} style={{ cursor: "pointer" }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: c.text, letterSpacing: "-0.5px" }}><span style={{ color: c.accent }}>Wash</span>CRM</span>
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, fontSize: 22, color: c.text, lineHeight: 1 }}>
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>
      )}

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

      {/* ── MOBILE OVERLAY ── */}
      {isMobile && mobileMenu && (
        <div onClick={() => setMobileMenu(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 90 }} />
      )}

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: isMobile ? 232 : sidebarW, background: c.white, borderRight: "none",
        padding: isMobile ? "24px 14px 20px" : sidebarOpen ? "16px 12px 16px" : "16px 8px 16px",
        display: "flex", flexDirection: "column", flexShrink: 0,
        height: "100%", overflowY: "auto", overflowX: "hidden",
        transition: "width 0.2s ease, padding 0.2s ease",
        ...(isMobile ? { position: "fixed", top: 52, left: 0, bottom: 0, zIndex: 100, transform: mobileMenu ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.2s ease", boxShadow: mobileMenu ? "4px 0 20px rgba(0,0,0,0.1)" : "none" } : {}),
      }}>
        {/* Brand */}
        <div onClick={() => { setPage("dashboard"); resetJob(); setSelectedCust(null); setCustSearch(""); }} style={{ padding: sidebarOpen || isMobile ? "4px 8px" : "4px 0", marginBottom: sidebarOpen || isMobile ? 24 : 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: sidebarOpen || isMobile ? "flex-start" : "center", gap: 8, minHeight: 32 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: c.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>W</div>
          {(sidebarOpen || isMobile) && <div style={{ whiteSpace: "nowrap" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.text, letterSpacing: "-0.5px" }}><span style={{ color: c.accent }}>Wash</span>CRM</div>
          </div>}
        </div>

        {/* Expand toggle — desktop only */}
        {!isMobile && (
          <button onClick={() => { const next = sidebarOpen ? 56 : 220; setSidebarW(next); setSidebarOpen(!sidebarOpen); }} style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: sidebarOpen ? "100%" : 36, height: 28, borderRadius: 6,
            border: `1px solid ${c.borderLight}`, background: c.surfaceAlt,
            cursor: "pointer", fontSize: 12, color: c.textTertiary, marginBottom: 16,
            padding: 0, fontFamily: font, transition: "width 0.2s", margin: sidebarOpen ? "0 0 16px" : "0 auto 16px",
          }}>
            {sidebarOpen ? "◁ Collapse" : "▷"}
          </button>
        )}

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 20 }}>
          {navItems.map((n) => (
            <button key={n.id} onClick={() => { setPage(n.id); if (n.id === "quotes") { resetQ(); setQuotesView("list"); setExpandedQuote(null); } setSelectedCust(null); setCustSearch(""); resetJob(); setMobileMenu(false); }} title={!sidebarOpen && !isMobile ? n.label : undefined} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: sidebarOpen || isMobile ? "8px 10px" : "8px 0",
              justifyContent: sidebarOpen || isMobile ? "flex-start" : "center",
              borderRadius: 8, border: "none", cursor: "pointer", fontFamily: font,
              fontSize: 13.5, fontWeight: page === n.id ? 600 : 400,
              background: page === n.id ? c.accentSoft : "transparent",
              color: page === n.id ? c.accent : c.textSecondary,
              transition: "all 0.12s", whiteSpace: "nowrap", overflow: "hidden",
            }}>
              <span style={{ fontSize: 15, width: 20, textAlign: "center", flexShrink: 0, lineHeight: 1 }}>{n.icon}</span>
              {(sidebarOpen || isMobile) && <span>{n.label}</span>}
            </button>
          ))}
        </nav>

        {/* Quick actions — expanded */}
        {(sidebarOpen || isMobile) && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: c.textTertiary, letterSpacing: "1px", padding: "0 10px", marginBottom: 6 }}>ACTIONS</div>
            {["New Quote", "New Job", "Add Customer"].map((l) => (
              <button key={l} onClick={() => { if (l === "New Quote") { setPage("quotes"); resetQ(); setQuotesView("builder"); } if (l === "New Job") { setPage("jobs"); } if (l === "Add Customer") { setPage("customers"); setSelectedCust(null); } setMobileMenu(false); }} style={{
                display: "block", width: "100%", textAlign: "left", padding: "6px 10px",
                borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12.5,
                color: c.textTertiary, background: "transparent", fontFamily: font,
              }}>+ {l}</button>
            ))}
          </div>
        )}
        {/* Quick add — collapsed */}
        {!sidebarOpen && !isMobile && (
          <button onClick={() => { setPage("quotes"); resetQ(); setQuotesView("builder"); }} title="New Quote" style={{
            width: 36, height: 36, borderRadius: 8, border: `1px solid ${c.accentBorder}`,
            background: c.accentSoft, color: c.accent, fontSize: 18, fontWeight: 500,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 20, fontFamily: font, padding: 0, margin: "0 auto 20px",
          }}>+</button>
        )}

        {/* Weather */}
        <div style={{ marginTop: "auto" }}>
          {(sidebarOpen || isMobile) ? (
            <div style={{ background: c.surfaceAlt, borderRadius: 10, padding: "14px 12px", border: `1px solid ${c.borderLight}` }}>
              <div onClick={() => setWeatherExpanded(!weatherExpanded)} style={{ fontSize: 10, fontWeight: 600, color: c.textTertiary, letterSpacing: "1px", marginBottom: 10, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>FORECAST</span>
                <span style={{ fontSize: 12, transform: weatherExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>▾</span>
              </div>
              {weather.map((w) => (
                <div key={w.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
                  <span style={{ fontSize: 12, color: c.textSecondary, minWidth: 36 }}>{w.day}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: c.text }}>{w.temp}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, color: parseInt(w.rain) > 40 ? c.red : c.textTertiary, minWidth: 28, textAlign: "right" }}>{w.rain}</span>
                </div>
              ))}
              {parseInt(weather[2].rain) > 40 && (
                <div style={{ fontSize: 11, color: c.red, marginTop: 10, padding: "7px 10px", background: c.redSoft, borderRadius: 6, border: `1px solid ${c.redBorder}` }}>Fri: Rain likely — review schedule</div>
              )}
              {weatherExpanded && (
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${c.borderLight}` }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: c.textTertiary, letterSpacing: "0.5px", marginBottom: 8 }}>AFFECTED JOBS</div>
                  {jobs.filter(j => j.dayIdx === 4).length > 0 ? jobs.filter(j => j.dayIdx === 4).map(j => (
                    <div key={j.client} onClick={() => { setPage("jobs"); setActiveJob(j.client); setJobPhase("preview"); setMobileMenu(false); }} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", cursor: "pointer" }}>
                      <span style={{ fontSize: 11, color: c.red, fontWeight: 500 }}>{j.client}</span>
                      <span style={{ fontSize: 11, color: c.textTertiary }}>{j.amount}</span>
                    </div>
                  )) : <div style={{ fontSize: 11, color: c.textTertiary }}>No jobs on rain days</div>}
                  <button onClick={() => { setPage("jobs"); setMobileMenu(false); }} style={{ marginTop: 8, width: "100%", padding: "6px", background: c.redSoft, color: c.red, border: `1px solid ${c.redBorder}`, borderRadius: 6, fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: font }}>Review schedule</button>
                </div>
              )}
            </div>
          ) : (
            <div onClick={() => setSidebarOpen(true)} title="Expand for weather" style={{ width: 36, padding: "10px 0", background: c.surfaceAlt, borderRadius: 8, border: `1px solid ${c.borderLight}`, textAlign: "center", cursor: "pointer", margin: "0 auto" }}>
              <div style={{ fontSize: 12, color: c.text, fontWeight: 500 }}>{weather[0].temp.split("°")[0]}°</div>
              <div style={{ fontSize: 10, color: parseInt(weather[2].rain) > 40 ? c.red : c.textTertiary, fontWeight: 500, marginTop: 2 }}>{parseInt(weather[2].rain) > 40 ? "!" : "~"}</div>
            </div>
          )}
        </div>
      </aside>
      {/* Drag handle */}
      {!isMobile && (
        <div onMouseDown={() => setDraggingSb(true)} style={{
          width: 5, cursor: "col-resize", background: draggingSb ? c.accent : "transparent",
          borderRight: `1px solid ${c.border}`, flexShrink: 0,
          transition: draggingSb ? "none" : "background 0.15s",
        }}
        onMouseEnter={(e) => { if (!draggingSb) (e.currentTarget as HTMLDivElement).style.background = c.borderLight; }}
        onMouseLeave={(e) => { if (!draggingSb) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
        />
      )}

      {/* ── MAIN ── */}
      <main style={{ flex: 1, padding: isMobile ? "20px 16px" : "28px 40px", overflowY: "auto", height: "100%" }}>

        {/* ====== DASHBOARD ====== */}
        {page === "dashboard" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0, letterSpacing: "-0.4px" }}>Dashboard</h1>
                <p style={{ fontSize: 13, color: c.textTertiary, margin: "5px 0 0" }}>Wednesday, March 18 — 3 jobs today</p>
              </div>
              <button onClick={() => { setPage("quotes"); resetQ(); setQuotesView("builder"); }} style={{
                padding: "8px 18px", background: c.accent, color: "#fff", border: "none", borderRadius: 8,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>New Quote</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: g("1.4fr 1fr", "1fr"), gap: 16 }}>
              {/* ── LEFT COLUMN ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Stats row — compact */}
                <div style={{ display: "grid", gridTemplateColumns: g("repeat(4, 1fr)", "repeat(2, 1fr)"), gap: 10 }}>
                  {stats.map((s) => (
                    <div key={s.label} style={card({ padding: "14px 16px" })}>
                      <div style={{ fontSize: 11, color: c.textTertiary, marginBottom: 6 }}>{s.label}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: c.text, letterSpacing: "-1px", lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: s.up ? c.green : c.red, marginTop: 6, fontWeight: 500 }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Today's Route */}
                <div style={{ ...card({ padding: 0, overflow: "hidden" }) }}>
                  <div style={{ padding: "16px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Today&apos;s route</span>
                      <span style={{ fontSize: 12, color: c.textTertiary, marginLeft: 10 }}>{weather[0].temp} · {weather[0].rain} rain</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: c.green }}>
                      ${jobs.filter(j => j.dayIdx === 2).reduce((s, j) => s + parseInt(j.amount.replace(/[$,]/g, "")), 0).toLocaleString()} today
                    </div>
                  </div>
                  <div style={{ padding: "12px 20px 16px" }}>
                    {jobs.filter(j => j.dayIdx === 2).sort((a, b) => a.hour - b.hour).map((j, i, arr) => (
                      <div key={j.client} onClick={() => { setPage("jobs"); setActiveJob(j.client); setJobPhase("preview"); }} style={{ display: "flex", gap: 14, cursor: "pointer", padding: "10px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, paddingTop: 4 }}>
                          <div style={{ width: 10, height: 10, borderRadius: "50%", background: j.status === "In Progress" ? c.amber : j.status === "Completed" ? c.green : c.accent, flexShrink: 0 }} />
                          {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: c.border, marginTop: 4 }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                              <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{j.client}</span>
                              <span style={{ fontSize: 12, color: c.textTertiary, marginLeft: 8 }}>{j.service}</span>
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{j.amount}</span>
                          </div>
                          <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 3 }}>{j.addr}</div>
                          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                            <span style={{ fontSize: 12, color: c.textSecondary }}>{j.hour > 12 ? `${j.hour - 12}:00 PM` : j.hour === 12 ? "12:00 PM" : `${j.hour}:00 AM`} · {j.duration}hrs</span>
                            <span style={{ fontSize: 11, fontWeight: 500, padding: "1px 7px", borderRadius: 4, background: statusMap[j.status]?.bg, color: statusMap[j.status]?.text }}>{j.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {jobs.filter(j => j.dayIdx === 2).length === 0 && (
                      <div style={{ fontSize: 13, color: c.textTertiary, padding: "20px 0", textAlign: "center" }}>No jobs scheduled today</div>
                    )}
                  </div>
                </div>

                {/* Rest of week */}
                <div style={card()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Rest of this week</span>
                    <span onClick={() => setPage("jobs")} style={{ fontSize: 12, color: c.accent, cursor: "pointer", fontWeight: 500 }}>View calendar</span>
                  </div>
                  {jobs.filter(j => j.dayIdx > 2 && j.status !== "Completed").slice(0, 4).map((j, i) => (
                    <div key={j.client} onClick={() => { setPage("jobs"); setActiveJob(j.client); setJobPhase("preview"); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none", cursor: "pointer" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{j.client} <span style={{ color: c.textTertiary, fontWeight: 400 }}>· {j.service}</span></div>
                        <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 2 }}>{j.date} · {j.hour > 12 ? `${j.hour - 12}PM` : `${j.hour}AM`}</div>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{j.amount}</span>
                    </div>
                  ))}
                </div>

                {/* Quote pipeline */}
                <div style={card()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Quote pipeline</span>
                    <span onClick={() => { setPage("quotes"); setQuotesView("list"); }} style={{ fontSize: 12, color: c.accent, cursor: "pointer", fontWeight: 500 }}>View all</span>
                  </div>
                  {[
                    { stage: "Active quotes", count: quotesPipeline.filter(q => q.status !== "won" && q.status !== "lost").length, value: quotesPipeline.filter(q => q.status !== "won" && q.status !== "lost").reduce((s, q) => s + q.amount, 0), color: c.accent },
                    { stage: "Won this month", count: quotesPipeline.filter(q => q.status === "won").length, value: quotesPipeline.filter(q => q.status === "won").reduce((s, q) => s + q.amount, 0), color: c.green },
                    { stage: "Lost", count: quotesPipeline.filter(q => q.status === "lost").length, value: quotesPipeline.filter(q => q.status === "lost").reduce((s, q) => s + q.amount, 0), color: c.red },
                  ].map((p, i) => (
                    <div key={p.stage} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
                        <span style={{ fontSize: 13, color: c.textSecondary }}>{p.stage}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>${p.value.toLocaleString()}</span>
                        <span style={{ fontSize: 12, color: c.textTertiary, marginLeft: 6 }}>({p.count})</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, padding: "8px 12px", background: c.accentSoft, borderRadius: 6, border: `1px solid ${c.accentBorder}` }}>
                    <span style={{ fontSize: 11, color: c.accent, fontWeight: 500 }}>Auto follow-up active</span>
                    <span style={{ fontSize: 11, color: c.textTertiary, marginLeft: 6 }}>· 3 quotes queued for tomorrow</span>
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Revenue pulse */}
                <div onClick={() => setPage("reports")} style={{ ...card({ cursor: "pointer" }) }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>This month</span>
                    <span style={{ fontSize: 12, color: c.accent, fontWeight: 500 }}>View reports →</span>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: c.text, letterSpacing: "-1.5px" }}>$12.7k</div>
                  <div style={{ fontSize: 11, color: c.green, fontWeight: 500, marginTop: 4, marginBottom: 12 }}>+18% vs last month</div>
                  {[
                    { svc: "House Wash", pct: 34, color: "#3b82f6" },
                    { svc: "Commercial", pct: 27, color: "#7c3aed" },
                    { svc: "Driveway", pct: 17, color: "#16a34a" },
                  ].map(s => (
                    <div key={s.svc} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: c.textSecondary, padding: "3px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />
                        <span>{s.svc}</span>
                      </div>
                      <span style={{ fontWeight: 500, color: c.text }}>{s.pct}%</span>
                    </div>
                  ))}
                </div>

                {/* Needs attention */}
                <div style={card()}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 12 }}>Needs attention</div>
                  {[
                    { label: "Stale quote", detail: "Mike Bradley — $780 roof wash, 6 days", bg: c.redSoft, border: c.redBorder, color: c.red, go: () => { setPage("quotes"); setQuotesView("list"); } },
                    { label: "Unpaid invoices", detail: "$740 outstanding from 2 jobs", bg: c.amberSoft, border: c.amberBorder, color: c.amber, go: () => {} },
                    { label: "New lead", detail: "Sunrise Condo — $3,200 building wash", bg: c.accentSoft, border: c.accentBorder, color: c.accent, go: () => { setPage("quotes"); setQuotesView("list"); } },
                  ].map((item) => (
                    <div key={item.label} onClick={item.go} style={{ padding: "10px 12px", background: item.bg, borderRadius: 8, border: `1px solid ${item.border}`, cursor: "pointer", marginBottom: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: item.color }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 2 }}>{item.detail}</div>
                    </div>
                  ))}
                </div>

                {/* Activity feed */}
                <div style={card()}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 12 }}>Recent activity</div>
                  {[
                    { action: "Invoice paid", detail: "Sarah Mitchell — $520", time: "2h ago", color: c.green },
                    { action: "5-star review", detail: "Sarah Mitchell on Google", time: "Yesterday", color: c.amber },
                    { action: "Follow-up sent", detail: "Daniel Park — Deck quote", time: "2 days", color: c.purple },
                    { action: "Quote viewed", detail: "Rachel Torres opened quote", time: "2 days", color: c.accent },
                    { action: "Payment overdue", detail: "Jennifer Collins — $220", time: "3 days", color: c.red },
                  ].map((ev, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: ev.color, marginTop: 5, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 12, color: c.text }}><span style={{ fontWeight: 500 }}>{ev.action}</span> · <span style={{ color: c.textSecondary }}>{ev.detail}</span></span>
                        <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 1 }}>{ev.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chemical inventory */}
                <div style={card()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Chemicals</span>
                    <span onClick={() => setPage("chemicals")} style={{ fontSize: 12, color: c.accent, cursor: "pointer", fontWeight: 500 }}>Manage</span>
                  </div>
                  {chemicals.map((ch, i) => (
                    <div key={ch.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: c.text }}>{ch.name}</span>
                        {ch.low && <span style={{ fontSize: 9, fontWeight: 600, color: c.red, padding: "1px 5px", background: c.redSoft, borderRadius: 3 }}>LOW</span>}
                      </div>
                      <span style={{ fontSize: 12, color: ch.low ? c.red : c.textSecondary, fontWeight: 500 }}>{ch.stock}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ====== QUOTES — LIST VIEW ====== */}
        {page === "quotes" && quotesView === "list" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>Quotes</h1>
                <p style={{ fontSize: 13, color: c.textTertiary, margin: "5px 0 0" }}>{quotesPipeline.length} quotes · ${quotesPipeline.filter(q => q.status !== "lost").reduce((s, q) => s + q.amount, 0).toLocaleString()} pipeline value</p>
              </div>
              <button onClick={() => { resetQ(); setQuotesView("builder"); }} style={{ padding: "8px 18px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>New Quote</button>
            </div>

            {/* Auto follow-up banner */}
            <div style={{ ...card({ padding: "14px 20px", marginBottom: 16 }), display: "flex", justifyContent: "space-between", alignItems: "center", background: c.accentSoft, border: `1px solid ${c.accentBorder}` }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.accent }}>Auto follow-up is active</div>
                <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 2 }}>Quotes automatically receive follow-up texts at 24 hours, 3 days, and 7 days if no response</div>
              </div>
              <div style={{ padding: "5px 12px", background: c.white, borderRadius: 6, border: `1px solid ${c.border}`, fontSize: 12, fontWeight: 500, color: c.green, cursor: "pointer" }}>Enabled</div>
            </div>

            {/* Pipeline summary */}
            <div style={{ display: "grid", gridTemplateColumns: g("repeat(5, 1fr)", "repeat(2, 1fr)"), gap: 10, marginBottom: 20 }}>
              {[
                { label: "New", count: quotesPipeline.filter(q => q.status === "new").length, value: quotesPipeline.filter(q => q.status === "new").reduce((s, q) => s + q.amount, 0), color: c.accent },
                { label: "Awaiting", count: quotesPipeline.filter(q => q.status === "awaiting").length, value: quotesPipeline.filter(q => q.status === "awaiting").reduce((s, q) => s + q.amount, 0), color: c.amber },
                { label: "Needs attention", count: quotesPipeline.filter(q => q.status === "stale").length, value: quotesPipeline.filter(q => q.status === "stale").reduce((s, q) => s + q.amount, 0), color: c.red },
                { label: "Won", count: quotesPipeline.filter(q => q.status === "won").length, value: quotesPipeline.filter(q => q.status === "won").reduce((s, q) => s + q.amount, 0), color: c.green },
                { label: "Lost", count: quotesPipeline.filter(q => q.status === "lost").length, value: quotesPipeline.filter(q => q.status === "lost").reduce((s, q) => s + q.amount, 0), color: "#71717a" },
              ].map((p) => (
                <div key={p.label} style={card({ padding: "14px 16px", textAlign: "center" as const })}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, margin: "0 auto 8px" }} />
                  <div style={{ fontSize: 11, color: c.textTertiary }}>{p.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: c.text, marginTop: 2 }}>{p.count}</div>
                  <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 2 }}>${p.value.toLocaleString()}</div>
                </div>
              ))}
            </div>

            {/* Quote cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {quotesPipeline.map((q) => {
                const st = quoteStatusLabels[q.status];
                const isExpanded = expandedQuote === q.id;
                return (
                  <div key={q.id} style={card({ padding: 0, overflow: "hidden" })}>
                    {/* Main row */}
                    <div onClick={() => setExpandedQuote(isExpanded ? null : q.id)} style={isMobile ? { display: "flex", flexDirection: "column", gap: 8, cursor: "pointer", padding: "14px 16px" } : { display: "grid", gridTemplateColumns: "1.4fr 1fr 0.7fr 0.8fr auto", gap: 16, alignItems: "center", cursor: "pointer", padding: "16px 24px" }}>
                      <div style={isMobile ? { display: "flex", justifyContent: "space-between", alignItems: "center" } : {}}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{q.client}</div>
                          <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 3 }}>{q.service} · {q.sqft}</div>
                        </div>
                        {isMobile && <div style={{ fontSize: 16, fontWeight: 700, color: c.text }}>${q.amount.toLocaleString()}</div>}
                      </div>
                      {!isMobile && <div><div style={{ fontSize: 12, color: c.textTertiary }}>{q.addr}</div></div>}
                      {!isMobile && <div style={{ fontSize: 16, fontWeight: 700, color: c.text }}>${q.amount.toLocaleString()}</div>}
                      <div style={isMobile ? { display: "flex", justifyContent: "space-between", alignItems: "center" } : {}}>
                        <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 6, background: st.bg, border: `1px solid ${st.border}`, color: st.text }}>{st.label}</span>
                        {isMobile && <span style={{ fontSize: 12, color: c.textTertiary }}>Sent {q.sentDate} ▾</span>}
                      </div>
                      {!isMobile && <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ fontSize: 12, color: c.textTertiary }}>Sent {q.sentDate}</div>
                        <span style={{ fontSize: 14, color: c.textTertiary, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s", display: "inline-block" }}>▾</span>
                      </div>}
                    </div>

                    {/* Expanded: Follow-up timeline */}
                    {isExpanded && (
                      <div style={{ padding: "0 24px 20px", borderTop: `1px solid ${c.borderLight}` }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: c.text, marginTop: 16, marginBottom: 12 }}>Follow-up timeline</div>

                        {/* Quote sent event */}
                        <div style={{ display: "flex", gap: 12, marginBottom: 4 }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20 }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.accent, flexShrink: 0 }} />
                            {q.followUps.length > 0 && <div style={{ width: 1, flex: 1, background: c.border }} />}
                          </div>
                          <div style={{ paddingBottom: 14 }}>
                            <div style={{ fontSize: 12, fontWeight: 500, color: c.text }}>Quote sent — ${q.amount.toLocaleString()}</div>
                            <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 2 }}>{q.sentDate} · {q.viewed ? "Viewed by customer" : "Not yet viewed"}</div>
                          </div>
                        </div>

                        {/* Follow-up messages */}
                        {q.followUps.map((fu, fi) => (
                          <div key={fi} style={{ display: "flex", gap: 12, marginBottom: 4 }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20 }}>
                              <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.green, flexShrink: 0 }} />
                              {fi < q.followUps.length - 1 && <div style={{ width: 1, flex: 1, background: c.border }} />}
                            </div>
                            <div style={{ paddingBottom: 14, flex: 1 }}>
                              <div style={{ fontSize: 12, fontWeight: 500, color: c.text }}>Auto follow-up #{fi + 1}</div>
                              <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 4, padding: "8px 10px", background: c.surfaceAlt, borderRadius: 6, lineHeight: 1.5 }}>"{fu.message}"</div>
                              <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 4 }}>{fu.sentAt} · {fu.status === "delivered" ? "Delivered" : "Sent"}</div>
                            </div>
                          </div>
                        ))}

                        {/* Next follow-up scheduled */}
                        {q.status === "awaiting" && q.followUps.length < 3 && (
                          <div style={{ display: "flex", gap: 12 }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20 }}>
                              <div style={{ width: 8, height: 8, borderRadius: "50%", border: `2px solid ${c.border}`, background: c.white, flexShrink: 0 }} />
                            </div>
                            <div>
                              <div style={{ fontSize: 12, color: c.textTertiary }}>Next auto follow-up scheduled</div>
                              <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 2 }}>
                                {q.followUps.length === 0 ? "Tomorrow, 10:00 AM (24hr)" :
                                 q.followUps.length === 1 ? "In 2 days (3-day follow-up)" :
                                 "In 4 days (7-day final follow-up)"}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                          <button onClick={() => showToast("Text message opened for " + q.client)} style={{ padding: "7px 14px", background: c.accent, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Send manual text</button>
                          <button onClick={() => showToast("Calling " + q.phone + "...")} style={{ padding: "7px 14px", background: c.white, color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Call {q.phone}</button>
                          {q.status !== "won" && q.status !== "lost" && (
                            <button onClick={() => { setSchedulingQuote(q.id); setSchedConfirmed(false); setSchedDate("2026-03-24"); }} style={{ padding: "7px 14px", background: c.greenSoft, color: c.green, border: `1px solid ${c.greenBorder}`, borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Mark won + Schedule</button>
                          )}
                        </div>

                        {/* Scheduling form */}
                        {schedulingQuote === q.id && !schedConfirmed && (
                          <div style={{ marginTop: 14, padding: 18, background: c.surfaceAlt, borderRadius: 10, border: `1px solid ${c.greenBorder}` }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14 }}>Schedule job for {q.client}</div>
                            
                            <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr 1fr", "1fr"), gap: 12, marginBottom: 14 }}>
                              <div>
                                <label style={lbl}>Date</label>
                                <input type="date" value={schedDate} onChange={(e) => setSchedDate(e.target.value)} style={inputBase} />
                              </div>
                              <div>
                                <label style={lbl}>Start time</label>
                                <select value={schedTime} onChange={(e) => setSchedTime(e.target.value)} style={{ ...inputBase, cursor: "pointer" }}>
                                  {["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"].map(t => (
                                    <option key={t} value={t}>{parseInt(t) > 12 ? `${parseInt(t)-12}:00 PM` : parseInt(t) === 12 ? "12:00 PM" : `${parseInt(t)}:00 AM`}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label style={lbl}>Duration (hours)</label>
                                <select value={schedDuration} onChange={(e) => setSchedDuration(e.target.value)} style={{ ...inputBase, cursor: "pointer" }}>
                                  {["1","1.5","2","2.5","3","4","5","6"].map(d => (
                                    <option key={d} value={d}>{d} hrs</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Pre-filled job details from quote */}
                            <div style={{ padding: "12px 14px", background: c.white, borderRadius: 8, border: `1px solid ${c.borderLight}`, marginBottom: 14 }}>
                              <div style={{ fontSize: 11, color: c.textTertiary, marginBottom: 8 }}>Job details (from quote)</div>
                              <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 8 }}>
                                <div>
                                  <div style={{ fontSize: 11, color: c.textTertiary }}>Service</div>
                                  <div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 2 }}>{q.service}</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: 11, color: c.textTertiary }}>Surface / Area</div>
                                  <div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 2 }}>{q.surface} · {q.sqft}</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: 11, color: c.textTertiary }}>Address</div>
                                  <div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 2 }}>{q.addr}</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: 11, color: c.textTertiary }}>Amount</div>
                                  <div style={{ fontSize: 13, fontWeight: 600, color: c.accent, marginTop: 2 }}>${q.amount.toLocaleString()}</div>
                                </div>
                              </div>
                            </div>

                            <div style={{ display: "flex", gap: 8 }}>
                              <button onClick={() => setSchedConfirmed(true)} style={{ padding: "9px 18px", background: c.green, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                                Schedule Job
                              </button>
                              <button onClick={() => setSchedulingQuote(null)} style={{ padding: "9px 18px", background: c.white, color: c.textTertiary, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 13, cursor: "pointer" }}>Cancel</button>
                            </div>
                          </div>
                        )}

                        {/* Schedule confirmed */}
                        {schedulingQuote === q.id && schedConfirmed && (
                          <div style={{ marginTop: 14, padding: 18, background: c.greenSoft, borderRadius: 10, border: `1px solid ${c.greenBorder}` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                              <div style={{ width: 28, height: 28, borderRadius: "50%", background: c.green, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700 }}>✓</div>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Job scheduled</div>
                                <div style={{ fontSize: 12, color: c.textSecondary }}>{q.client} — {schedDate} at {parseInt(schedTime) > 12 ? `${parseInt(schedTime)-12}:00 PM` : `${parseInt(schedTime)}:00 AM`} ({schedDuration} hrs)</div>
                              </div>
                            </div>
                            <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 12 }}>
                              Customer will receive a confirmation text automatically. A reminder will be sent 48 hours before the job.
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button onClick={() => { setSchedulingQuote(null); setPage("jobs"); }} style={{ padding: "7px 14px", background: c.accent, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>View on calendar</button>
                              <button onClick={() => setSchedulingQuote(null)} style={{ padding: "7px 14px", background: c.white, color: c.textTertiary, border: `1px solid ${c.border}`, borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Done</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ====== QUOTES — BUILDER ====== */}
        {page === "quotes" && quotesView === "builder" && !qDone && (
          <>
            <div style={{ marginBottom: 32 }}>
              <button onClick={() => setQuotesView("list")} style={{ background: "none", border: "none", color: c.accent, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 12, fontWeight: 500, fontFamily: font }}>← Back to quotes</button>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>New quote</h1>
              <p style={{ fontSize: 13, color: c.textTertiary, margin: "5px 0 0" }}>Build and send in under 60 seconds</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: g("1fr 320px", "1fr"), gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={card()}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14 }}>Service type</div>
                  <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 8 }}>
                    {serviceTypes.map((s) => (
                      <button key={s.id} onClick={() => setQService(s.id)} style={{
                        padding: "12px 14px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                        border: qService === s.id ? `2px solid ${c.accent}` : `1px solid ${c.border}`,
                        background: qService === s.id ? c.accentSoft : c.white, transition: "all 0.12s",
                      }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: qService === s.id ? c.accent : c.text }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 3 }}>{s.desc}</div>
                        <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 5, fontWeight: 600 }}>${s.baseRate}/sqft</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div style={card()}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14 }}>Surface and area</div>
                  <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14 }}>
                    <div>
                      <label style={lbl}>Surface type</label>
                      <select value={qSurface} onChange={(e) => setQSurface(e.target.value)} style={{ ...inputBase, cursor: "pointer" }}>
                        <option value="">Select...</option>
                        {surfaceTypes.map((s) => (<option key={s.id} value={s.id}>{s.name}{s.mod !== 1 ? ` (${s.mod}x)` : ""}</option>))}
                      </select>
                    </div>
                    <div>
                      <label style={lbl}>Square footage</label>
                      <input type="number" placeholder="e.g. 2400" value={qSqft} onChange={(e) => setQSqft(e.target.value)} style={inputBase} />
                    </div>
                  </div>
                  {surf && surf.mod !== 1 && (
                    <div style={{ fontSize: 11, color: c.amber, marginTop: 12, padding: "7px 10px", background: c.amberSoft, borderRadius: 6, border: `1px solid ${c.amberBorder}`, fontWeight: 500 }}>
                      {surf.name} applies a {surf.mod}x modifier for material difficulty
                    </div>
                  )}
                </div>
                <div style={card()}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14 }}>Customer</div>
                  <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14, marginBottom: 14 }}>
                    <div><label style={lbl}>Name</label><input placeholder="Full name" value={qName} onChange={(e) => setQName(e.target.value)} style={inputBase} /></div>
                    <div><label style={lbl}>Phone</label><input placeholder="(555) 123-4567" value={qPhone} onChange={(e) => setQPhone(e.target.value)} style={inputBase} /></div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14, marginBottom: 14 }}>
                    <div><label style={lbl}>Email</label><input placeholder="email@example.com" value={qEmail} onChange={(e) => setQEmail(e.target.value)} style={inputBase} /></div>
                    <div><label style={lbl}>Property address</label><input placeholder="123 Main St, Tampa FL" value={qAddr} onChange={(e) => setQAddr(e.target.value)} style={inputBase} /></div>
                  </div>
                  <div>
                    <label style={lbl}>Notes</label>
                    <textarea placeholder="Gate codes, problem areas, special instructions..." value={qNotes} onChange={(e) => setQNotes(e.target.value)} rows={3} style={{ ...inputBase, resize: "vertical", fontFamily: font }} />
                  </div>
                </div>
              </div>
              <div>
                <div style={{ ...card({ position: "sticky" as const, top: 28 }) }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 18 }}>Quote summary</div>
                  {qService ? (
                    <>
                      <div style={{ padding: "11px 12px", background: c.surfaceAlt, borderRadius: 8, marginBottom: 8 }}>
                        <div style={{ fontSize: 11, color: c.textTertiary }}>Service</div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 2 }}>{svc?.name}</div>
                      </div>
                      {qSurface && (<div style={{ padding: "11px 12px", background: c.surfaceAlt, borderRadius: 8, marginBottom: 8 }}><div style={{ fontSize: 11, color: c.textTertiary }}>Surface</div><div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 2 }}>{surf?.name}</div></div>)}
                      {sqftN > 0 && (<div style={{ padding: "11px 12px", background: c.surfaceAlt, borderRadius: 8, marginBottom: 8 }}><div style={{ fontSize: 11, color: c.textTertiary }}>Area</div><div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 2 }}>{sqftN.toLocaleString()} sqft</div></div>)}
                      {sqftN > 0 && qSurface && (
                        <div style={{ padding: "18px 14px", background: c.accentSoft, borderRadius: 10, border: `1px solid ${c.accentBorder}`, marginBottom: 12 }}>
                          <div style={{ fontSize: 11, color: c.accent, fontWeight: 600, marginBottom: 6, letterSpacing: "0.02em" }}>CALCULATED PRICE</div>
                          <div style={{ fontSize: 36, fontWeight: 700, color: c.text, letterSpacing: "-2px", lineHeight: 1 }}>${price.toLocaleString()}</div>
                          <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 8 }}>Range: ${Math.round(price * 0.9).toLocaleString()} – ${Math.round(price * 1.15).toLocaleString()}</div>
                          <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 4 }}>{svc?.baseRate}/sqft × {sqftN.toLocaleString()} × {surf?.mod}x</div>
                        </div>
                      )}
                      {qName && (<div style={{ padding: "11px 12px", background: c.surfaceAlt, borderRadius: 8, marginBottom: 12 }}><div style={{ fontSize: 11, color: c.textTertiary }}>Customer</div><div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 2 }}>{qName}</div>{qAddr && <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 2 }}>{qAddr}</div>}</div>)}
                      <button onClick={() => setQDone(true)} disabled={!qService || !qSurface || sqftN === 0 || !qName} style={{
                        width: "100%", padding: "10px", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                        background: qService && qSurface && sqftN > 0 && qName ? c.accent : c.border,
                        color: qService && qSurface && sqftN > 0 && qName ? "#fff" : c.textTertiary, transition: "all 0.15s",
                      }}>Generate Quote</button>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", padding: "48px 16px", color: c.textTertiary, fontSize: 13 }}>Select a service to begin</div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ====== QUOTE DONE ====== */}
        {page === "quotes" && quotesView === "builder" && qDone && (
          <div style={{ maxWidth: 520, margin: "0 auto", paddingTop: 60, textAlign: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: c.greenSoft, border: `1px solid ${c.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 18, color: c.green, fontWeight: 700 }}>✓</div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: "0 0 6px" }}>Quote ready</h1>
            <p style={{ fontSize: 13, color: c.textTertiary, marginBottom: 28 }}>For {qName} · ${price.toLocaleString()}</p>
            <div style={{ ...card({ textAlign: "left" as const }), marginBottom: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 20 }}>
                {[["Service", svc?.name], ["Surface", surf?.name], ["Area", `${sqftN.toLocaleString()} sqft`], ["Total", `$${price.toLocaleString()}`]].map(([l, v]) => (
                  <div key={l as string}>
                    <div style={{ fontSize: 11, color: c.textTertiary }}>{l}</div>
                    <div style={{ fontSize: 14, fontWeight: l === "Total" ? 700 : 500, color: l === "Total" ? c.accent : c.text, marginTop: 3 }}>{v}</div>
                  </div>
                ))}
              </div>
              {(qAddr || qPhone) && (
                <div style={{ borderTop: `1px solid ${c.border}`, marginTop: 20, paddingTop: 16 }}>
                  <div style={{ fontSize: 11, color: c.textTertiary }}>Customer</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 3 }}>{qName}</div>
                  {qAddr && <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 2 }}>{qAddr}</div>}
                  {qPhone && <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 2 }}>{qPhone}</div>}
                </div>
              )}
            </div>
            <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 20, padding: "10px 14px", background: c.accentSoft, borderRadius: 8, border: `1px solid ${c.accentBorder}` }}>Auto follow-up will send at 24hrs, 3 days, and 7 days if no response</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => showToast("Quote sent via text to " + qName)} style={{ padding: "8px 20px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Send via text</button>
              <button onClick={() => showToast("Quote sent via email to " + qEmail)} style={{ padding: "8px 20px", background: c.white, color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Send via email</button>
              <button onClick={() => { resetQ(); setQuotesView("list"); }} style={{ padding: "8px 20px", background: c.white, color: c.textTertiary, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>View all quotes</button>
            </div>
          </div>
        )}

        {/* ====== JOBS ====== */}
        {page === "jobs" && !activeJob && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>Jobs</h1>
                <p style={{ fontSize: 13, color: c.textTertiary, margin: "5px 0 0" }}>Week of March 17 — 8 jobs scheduled</p>
              </div>
              <div style={{ display: "flex", gap: 1, background: c.surfaceAlt, borderRadius: 8, padding: 2, border: `1px solid ${c.border}`, ...(isMobile ? { display: "none" } : {}) }}>
                {(["calendar", "list"] as const).map((v) => (
                  <button key={v} onClick={() => setJobView(v)} style={{
                    padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer",
                    border: "none", background: jobView === v ? c.white : "transparent",
                    color: jobView === v ? c.text : c.textTertiary,
                    boxShadow: jobView === v ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                    transition: "all 0.12s",
                  }}>{v === "calendar" ? "Calendar" : "List"}</button>
                ))}
              </div>
            </div>

            {/* ── CALENDAR VIEW ── */}
            {jobView === "calendar" && !isMobile && (
              <div style={card({ padding: 0, overflow: "hidden" })}>
                {/* Day headers with weather + revenue */}
                <div style={{ display: "grid", gridTemplateColumns: "56px repeat(6, 1fr)", borderBottom: `1px solid ${c.border}` }}>
                  <div style={{ padding: "12px 8px" }} />
                  {calendarDays.map((day, i) => {
                    const dw = dayWeather[i];
                    const dayRevenue = jobs.filter(j => j.dayIdx === i).reduce((sum, j) => sum + parseInt(j.amount.replace(/[$,]/g, "")), 0);
                    const isRainDay = parseInt(dw.rain) > 40;
                    const isToday = i === 2;
                    return (
                      <div key={day} style={{
                        padding: "10px 10px 8px", textAlign: "center",
                        borderLeft: `1px solid ${c.borderLight}`,
                        background: isRainDay ? c.redSoft : isToday ? c.accentSoft : "transparent",
                      }}>
                        <div style={{ fontSize: 11, color: isToday ? c.accent : c.textTertiary, fontWeight: 500 }}>{day}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: isToday ? c.accent : c.text, marginTop: 1 }}>{calendarDates[i].split(" ")[1]}</div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 4 }}>
                          {isRainDay && <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.red }} />}
                          <span style={{ fontSize: 10, color: isRainDay ? c.red : c.textTertiary, fontWeight: 500 }}>{dw.rain}</span>
                        </div>
                        {dayRevenue > 0 && (
                          <div style={{ fontSize: 11, fontWeight: 600, color: c.green, marginTop: 3 }}>${dayRevenue.toLocaleString()}</div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Time grid */}
                <div style={{ display: "grid", gridTemplateColumns: "56px repeat(6, 1fr)", position: "relative" }}>
                  {calendarHours.map((hour) => (
                    <div key={hour} style={{ display: "contents" }}>
                      <div style={{
                        padding: "0 8px", height: 60, display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
                        borderTop: `1px solid ${c.borderLight}`, paddingTop: 4,
                      }}>
                        <span style={{ fontSize: 11, color: c.textTertiary }}>{hour > 12 ? `${hour - 12}p` : hour === 12 ? "12p" : `${hour}a`}</span>
                      </div>
                      {calendarDays.map((_, dayIdx) => {
                        const isRainDay = parseInt(dayWeather[dayIdx].rain) > 40;
                        const isToday = dayIdx === 2;
                        return (
                          <div key={dayIdx} style={{
                            height: 60, borderTop: `1px solid ${c.borderLight}`, borderLeft: `1px solid ${c.borderLight}`,
                            position: "relative",
                            background: isRainDay ? "rgba(220,38,38,0.02)" : isToday ? c.accentSoft : "transparent",
                          }}>
                            {jobs.filter((j) => j.dayIdx === dayIdx && j.hour === hour).map((j) => {
                              const colors: Record<string, { bg: string; border: string; text: string }> = {
                                "House Wash": { bg: "#dbeafe", border: "#93c5fd", text: "#1e40af" },
                                "Driveway + Sidewalk": { bg: "#d1fae5", border: "#6ee7b7", text: "#065f46" },
                                "Commercial Wash": { bg: "#ede9fe", border: "#c4b5fd", text: "#5b21b6" },
                                "Deck Restoration": { bg: "#fef3c7", border: "#fcd34d", text: "#92400e" },
                                "Roof Soft Wash": { bg: "#fce7f3", border: "#f9a8d4", text: "#9d174d" },
                                "Fence Cleaning": { bg: "#e0f2fe", border: "#7dd3fc", text: "#075985" },
                              };
                              const clr = colors[j.service] || { bg: "#f3f4f6", border: "#d1d5db", text: "#374151" };
                              return (
                                <div key={j.client} onClick={() => { setActiveJob(j.client); setJobPhase("preview"); }} style={{
                                  position: "absolute", top: 2, left: 3, right: 3,
                                  height: j.duration * 60 - 6,
                                  background: clr.bg, border: `1px solid ${clr.border}`, borderRadius: 6,
                                  padding: "5px 7px", overflow: "hidden", cursor: "pointer", zIndex: 2,
                                  borderLeft: `3px solid ${clr.border}`,
                                }}>
                                  <div style={{ fontSize: 11, fontWeight: 600, color: clr.text, lineHeight: 1.2 }}>{j.client}</div>
                                  <div style={{ fontSize: 10, color: clr.text, opacity: 0.75, marginTop: 2 }}>{j.service} · {j.amount}</div>
                                  {j.duration >= 2 && <div style={{ fontSize: 9.5, color: clr.text, opacity: 0.5, marginTop: 2 }}>{j.addr}</div>}
                                  {isRainDay && <div style={{ fontSize: 9, color: "#dc2626", marginTop: 3, fontWeight: 600 }}>Rain risk</div>}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Weekly summary footer */}
                <div style={{ padding: "12px 18px", borderTop: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, color: c.textSecondary }}>{jobs.filter(j => j.status !== "Completed" && j.status !== "Quote Sent").length} jobs this week</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: c.green }}>${jobs.filter(j => j.status !== "Completed" && j.status !== "Quote Sent").reduce((s, j) => s + parseInt(j.amount.replace(/[$,]/g, "")), 0).toLocaleString()} scheduled revenue</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.red }} />
                    <span style={{ fontSize: 12, color: c.red, fontWeight: 500 }}>Fri: 65% rain</span>
                    <span style={{ fontSize: 12, color: c.textTertiary }}>· 1 job at risk</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── LIST VIEW ── */}
            {(jobView === "list" || isMobile) && (
              <>
                <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                  {["All", "Scheduled", "In Progress", "Completed"].map((t) => (
                    <button key={t} style={{
                      padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer",
                      border: `1px solid ${t === "All" ? c.accentBorder : c.border}`,
                      background: t === "All" ? c.accentSoft : c.white,
                      color: t === "All" ? c.accent : c.textTertiary,
                    }}>{t}</button>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {jobs.map((j) => (
                    <div key={j.client} onClick={() => { setActiveJob(j.client); setJobPhase("preview"); }} style={isMobile ? { ...card(), display: "flex", flexDirection: "column", gap: 8, cursor: "pointer", padding: "14px 16px" } : { ...card(), display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr auto", gap: 20, alignItems: "center", cursor: "pointer", padding: "18px 24px" }}>
                      <div style={isMobile ? { display: "flex", justifyContent: "space-between", alignItems: "center" } : {}}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{j.client}</div>
                          <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 3 }}>{j.service}</div>
                        </div>
                        {isMobile && <div style={{ fontSize: 16, fontWeight: 700, color: c.text }}>{j.amount}</div>}
                      </div>
                      {!isMobile && <div>
                        <div style={{ fontSize: 11, color: c.textTertiary }}>Surface / Area</div>
                        <div style={{ fontSize: 13, color: c.textSecondary, marginTop: 3 }}>{j.surface} — {j.sqft} sqft</div>
                      </div>}
                      <div style={isMobile ? { display: "flex", justifyContent: "space-between", alignItems: "center" } : {}}>
                        <div style={{ fontSize: 12, color: c.textTertiary }}>{j.date} · {j.surface}</div>
                        <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 6, background: statusMap[j.status]?.bg, border: `1px solid ${statusMap[j.status]?.border}`, color: statusMap[j.status]?.text }}>{j.status}</span>
                      </div>
                      {!isMobile && <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: c.text, marginBottom: 6 }}>{j.amount}</div>
                        <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 6, background: statusMap[j.status]?.bg, border: `1px solid ${statusMap[j.status]?.border}`, color: statusMap[j.status]?.text }}>{j.status}</span>
                      </div>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* ====== JOB DETAIL + COMPLETION FLOW ====== */}
        {page === "jobs" && activeJob && activeJobData && (
          <>
            <button onClick={resetJob} style={{ background: "none", border: "none", color: c.accent, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 16, fontWeight: 500, fontFamily: font }}>← Back to jobs</button>

            {/* ── JOB PREVIEW ── */}
            {jobPhase === "preview" && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                  <div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>{activeJobData.client}</h1>
                    <p style={{ fontSize: 13, color: c.textTertiary, margin: "4px 0 0" }}>{activeJobData.addr}</p>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: "4px 12px", borderRadius: 6, background: statusMap[activeJobData.status]?.bg, border: `1px solid ${statusMap[activeJobData.status]?.border}`, color: statusMap[activeJobData.status]?.text }}>{activeJobData.status}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: g("repeat(4, 1fr)", "repeat(2, 1fr)"), gap: 12, marginBottom: 20 }}>
                  {[
                    { label: "Service", value: activeJobData.service },
                    { label: "Surface", value: activeJobData.surface },
                    { label: "Area", value: `${activeJobData.sqft} sqft` },
                    { label: "Amount", value: activeJobData.amount },
                  ].map((s) => (
                    <div key={s.label} style={card({ padding: "16px 18px" })}>
                      <div style={{ fontSize: 11, color: c.textTertiary, marginBottom: 6 }}>{s.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: s.label === "Amount" ? c.accent : c.text }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14, marginBottom: 20 }}>
                  <div style={card()}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 10 }}>Schedule</div>
                    <div style={{ fontSize: 14, color: c.text, marginBottom: 4 }}>{activeJobData.date}</div>
                    <div style={{ fontSize: 12, color: c.textTertiary }}>Estimated: {activeJobData.duration} hours</div>
                  </div>
                  <div style={card()}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 10 }}>Location</div>
                    <div style={{ fontSize: 13, color: c.text }}>{activeJobData.client}</div>
                    <div style={{ fontSize: 12, color: c.accent, marginTop: 4, cursor: "pointer" }}>{activeJobData.addr}</div>
                  </div>
                </div>

                {(activeJobData.status === "Scheduled" || activeJobData.status === "In Progress") && (
                  <button onClick={() => { setJobPhase("active"); setJobChemLogs([]); }} style={{
                    padding: "14px 32px", background: c.green, color: "#fff", border: "none", borderRadius: 10,
                    fontSize: 15, fontWeight: 600, cursor: "pointer", width: "100%",
                  }}>Start Job — Capture Before Photos</button>
                )}
              </>
            )}

            {/* ── JOB ACTIVE ── */}
            {jobPhase === "active" && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                  <div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>Job in progress</h1>
                    <p style={{ fontSize: 13, color: c.textTertiary, margin: "4px 0 0" }}>{activeJobData.client} · {activeJobData.service}</p>
                  </div>
                  <div style={{ padding: "6px 14px", background: c.amberSoft, border: `1px solid ${c.amberBorder}`, borderRadius: 8, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.amber }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: c.amber }}>In Progress</span>
                  </div>
                </div>

                <div style={{ ...card({ marginBottom: 16 }) }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 12 }}>Before photos</div>
                  <div style={{ display: "grid", gridTemplateColumns: g("repeat(4, 1fr)", "repeat(2, 1fr)"), gap: 8 }}>
                    {[1, 2, 3].map((n) => (
                      <div key={n} style={{ height: 100, background: "#4a5d4a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Photo {n}</span>
                      </div>
                    ))}
                    <div style={{ height: 100, background: c.surfaceAlt, borderRadius: 8, border: `2px dashed ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <span style={{ fontSize: 22, color: c.textTertiary }}>+</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: c.green, marginTop: 8, fontWeight: 500 }}>3 photos captured · Timestamped and geotagged</div>
                </div>

                <div style={{ ...card({ marginBottom: 16 }) }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Chemical usage</div>
                    {!addingChem && <button onClick={() => setAddingChem(true)} style={{ padding: "5px 12px", background: c.accentSoft, color: c.accent, border: `1px solid ${c.accentBorder}`, borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>+ Log chemical</button>}
                  </div>
                  {addingChem && (
                    <div style={{ padding: 14, background: c.surfaceAlt, borderRadius: 8, marginBottom: 12 }}>
                      <div style={{ display: "grid", gridTemplateColumns: g("1fr 0.6fr 1fr", "1fr"), gap: 10, marginBottom: 10 }}>
                        <div>
                          <label style={lbl}>Chemical</label>
                          <select value={newChemName} onChange={(e) => setNewChemName(e.target.value)} style={{ ...inputBase, cursor: "pointer" }}>
                            {chemicals.map(ch => <option key={ch.name} value={ch.name}>{ch.name}</option>)}
                          </select>
                        </div>
                        <div><label style={lbl}>Amount</label><input placeholder="e.g. 5 gal" value={newChemAmt} onChange={(e) => setNewChemAmt(e.target.value)} style={inputBase} /></div>
                        <div><label style={lbl}>Mix / notes</label><input placeholder="e.g. 3% downstream" value={newChemMix} onChange={(e) => setNewChemMix(e.target.value)} style={inputBase} /></div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => { if (newChemAmt) { setJobChemLogs([...jobChemLogs, { name: newChemName, amount: newChemAmt, mix: newChemMix }]); setNewChemAmt(""); setNewChemMix(""); setAddingChem(false); } }} style={{ padding: "6px 14px", background: c.accent, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Save</button>
                        <button onClick={() => setAddingChem(false)} style={{ padding: "6px 14px", background: c.white, color: c.textTertiary, border: `1px solid ${c.border}`, borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Cancel</button>
                      </div>
                    </div>
                  )}
                  {jobChemLogs.length === 0 && !addingChem && <div style={{ fontSize: 13, color: c.textTertiary, padding: "12px 0" }}>No chemicals logged yet</div>}
                  {jobChemLogs.map((cl, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{cl.name}</div>
                        {cl.mix && <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 2 }}>{cl.mix}</div>}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{cl.amount}</span>
                    </div>
                  ))}
                </div>

                <div style={{ ...card({ marginBottom: 20 }) }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 8 }}>Field notes</div>
                  <textarea placeholder="Observations, issues, things to note..." rows={3} style={{ ...inputBase, resize: "vertical", fontFamily: font }} />
                </div>

                <button onClick={() => setJobPhase("completing")} style={{
                  padding: "14px 32px", background: c.accent, color: "#fff", border: "none", borderRadius: 10,
                  fontSize: 15, fontWeight: 600, cursor: "pointer", width: "100%",
                }}>Complete Job — Capture After Photos</button>
              </>
            )}

            {/* ── COMPLETING ── */}
            {jobPhase === "completing" && (
              <>
                <div style={{ marginBottom: 24 }}>
                  <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>Completing job</h1>
                  <p style={{ fontSize: 13, color: c.textTertiary, margin: "4px 0 0" }}>{activeJobData.client} · {activeJobData.service}</p>
                </div>

                <div style={{ ...card({ marginBottom: 16 }) }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 12 }}>After photos</div>
                  <div style={{ display: "grid", gridTemplateColumns: g("repeat(4, 1fr)", "repeat(2, 1fr)"), gap: 8 }}>
                    {[1, 2, 3].map((n) => (
                      <div key={n} style={{ height: 100, background: "#8fa88f", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Photo {n}</span>
                      </div>
                    ))}
                    <div style={{ height: 100, background: c.surfaceAlt, borderRadius: 8, border: `2px dashed ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <span style={{ fontSize: 22, color: c.textTertiary }}>+</span>
                    </div>
                  </div>
                </div>

                <div style={{ ...card({ marginBottom: 16 }) }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 12 }}>Before / after comparison</div>
                  <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 10 }}>
                    <div style={{ height: 140, background: "#4a5d4a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>BEFORE</span>
                    </div>
                    <div style={{ height: 140, background: "#8fa88f", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>AFTER</span>
                    </div>
                  </div>
                </div>

                <div style={{ ...card({ marginBottom: 20 }) }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 12 }}>Job summary</div>
                  <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr 1fr 1fr", "1fr 1fr"), gap: 16 }}>
                    {[
                      { l: "Service", v: activeJobData.service },
                      { l: "Surface", v: `${activeJobData.surface} · ${activeJobData.sqft} sqft` },
                      { l: "Chemicals", v: `${jobChemLogs.length} logged` },
                      { l: "Photos", v: "3 before · 3 after" },
                    ].map((s) => (
                      <div key={s.l}><div style={{ fontSize: 11, color: c.textTertiary }}>{s.l}</div><div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 3 }}>{s.v}</div></div>
                    ))}
                  </div>
                </div>

                <button onClick={() => setJobPhase("done")} style={{
                  padding: "14px 32px", background: c.green, color: "#fff", border: "none", borderRadius: 10,
                  fontSize: 15, fontWeight: 600, cursor: "pointer", width: "100%",
                }}>Finalize and Send Invoice</button>
              </>
            )}

            {/* ── JOB DONE ── */}
            {jobPhase === "done" && !showInvoice && (
              <div style={{ maxWidth: 560, margin: "0 auto", paddingTop: 40, textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: c.greenSoft, border: `1px solid ${c.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 20, color: c.green, fontWeight: 700 }}>✓</div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: "0 0 6px" }}>Job completed</h1>
                <p style={{ fontSize: 13, color: c.textTertiary, marginBottom: 28 }}>{activeJobData.client} · {activeJobData.service} · {activeJobData.amount}</p>

                <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr 1fr", "1fr"), gap: 12, marginBottom: 24 }}>
                  <div style={card({ padding: "16px", textAlign: "center" as const })}>
                    <div style={{ fontSize: 11, color: c.textTertiary, marginBottom: 4 }}>Photos</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: c.text }}>6</div>
                    <div style={{ fontSize: 11, color: c.textTertiary }}>3 before · 3 after</div>
                  </div>
                  <div style={card({ padding: "16px", textAlign: "center" as const })}>
                    <div style={{ fontSize: 11, color: c.textTertiary, marginBottom: 4 }}>Chemicals</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: c.text }}>{jobChemLogs.length}</div>
                    <div style={{ fontSize: 11, color: c.textTertiary }}>logged</div>
                  </div>
                  <div style={card({ padding: "16px", textAlign: "center" as const })}>
                    <div style={{ fontSize: 11, color: c.textTertiary, marginBottom: 4 }}>Invoice</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: c.accent }}>{activeJobData.amount}</div>
                    <div style={{ fontSize: 11, color: c.green }}>Sent to customer</div>
                  </div>
                </div>

                <div style={{ ...card({ textAlign: "left" as const }), marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14 }}>What happens next</div>
                  {[
                    { action: "Invoice sent via text", time: "Just now", done: true },
                    { action: "Payment reminder if unpaid", time: "In 3 days", done: false },
                    { action: "Google review request", time: "In 24 hours", done: false },
                    { action: "Rebook reminder", time: "Based on service frequency", done: false },
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: step.done ? c.green : c.border, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: c.text, fontWeight: step.done ? 500 : 400, flex: 1 }}>{step.action}</span>
                      <span style={{ fontSize: 12, color: step.done ? c.green : c.textTertiary }}>{step.time}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  <button onClick={resetJob} style={{ padding: "9px 22px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Back to jobs</button>
                  <button onClick={() => setShowInvoice(true)} style={{ padding: "9px 22px", background: c.white, color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>View invoice</button>
                </div>
              </div>
            )}

            {/* ── INVOICE VIEW ── */}
            {jobPhase === "done" && showInvoice && (
              <div style={{ maxWidth: 640, margin: "0 auto", paddingTop: 20 }}>
                <button onClick={() => setShowInvoice(false)} style={{ background: "none", border: "none", color: c.accent, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 16, fontWeight: 500, fontFamily: font }}>← Back to summary</button>

                <div style={{ ...card({ padding: 0, overflow: "hidden" }) }}>
                  {/* Invoice header - company brand */}
                  <div style={{ padding: "28px 32px", borderBottom: `1px solid ${c.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: c.text, letterSpacing: "-0.3px" }}>Hall Power Washing</div>
                        <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 4 }}>Tampa, FL 33602</div>
                        <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 1 }}>(813) 555-0100 · zack@hallpowerwash.com</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 24, fontWeight: 700, color: c.text, letterSpacing: "-1px" }}>INVOICE</div>
                        <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 4 }}>#INV-2026-0047</div>
                        <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 1 }}>March 18, 2026</div>
                      </div>
                    </div>
                  </div>

                  {/* Bill to */}
                  <div style={{ padding: "20px 32px", borderBottom: `1px solid ${c.border}`, background: c.surfaceAlt }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: c.textTertiary, letterSpacing: "1px", marginBottom: 6 }}>BILL TO</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{activeJobData.client}</div>
                    <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 2 }}>{activeJobData.addr}</div>
                  </div>

                  {/* Service details */}
                  <div style={{ padding: "20px 32px" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          {["Description", "Details", "Amount"].map((h) => (
                            <th key={h} style={{ textAlign: h === "Amount" ? "right" : "left", fontSize: 10, fontWeight: 600, color: c.textTertiary, padding: "0 0 12px", borderBottom: `1px solid ${c.border}`, letterSpacing: "0.5px" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: "14px 0", fontSize: 13, fontWeight: 500, color: c.text, borderBottom: `1px solid ${c.borderLight}` }}>{activeJobData.service}</td>
                          <td style={{ padding: "14px 0", fontSize: 12, color: c.textSecondary, borderBottom: `1px solid ${c.borderLight}` }}>{activeJobData.surface} · {activeJobData.sqft} sqft</td>
                          <td style={{ padding: "14px 0", fontSize: 13, fontWeight: 600, color: c.text, textAlign: "right", borderBottom: `1px solid ${c.borderLight}` }}>{activeJobData.amount}</td>
                        </tr>
                        {jobChemLogs.length > 0 && (
                          <tr>
                            <td style={{ padding: "14px 0", fontSize: 13, color: c.textSecondary, borderBottom: `1px solid ${c.borderLight}` }}>Chemical materials</td>
                            <td style={{ padding: "14px 0", fontSize: 12, color: c.textTertiary, borderBottom: `1px solid ${c.borderLight}` }}>{jobChemLogs.map(cl => `${cl.name} (${cl.amount})`).join(", ")}</td>
                            <td style={{ padding: "14px 0", fontSize: 12, color: c.textTertiary, textAlign: "right", borderBottom: `1px solid ${c.borderLight}` }}>Included</td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {/* Totals */}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                      <div style={{ width: 240 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${c.borderLight}` }}>
                          <span style={{ fontSize: 12, color: c.textSecondary }}>Subtotal</span>
                          <span style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{activeJobData.amount}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${c.borderLight}` }}>
                          <span style={{ fontSize: 12, color: c.textSecondary }}>Tax</span>
                          <span style={{ fontSize: 13, color: c.textTertiary }}>$0.00</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: c.text }}>Total due</span>
                          <span style={{ fontSize: 16, fontWeight: 700, color: c.accent }}>{activeJobData.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment status */}
                  <div style={{ padding: "16px 32px", borderTop: `1px solid ${c.border}`, background: invoicePaid ? c.greenSoft : c.amberSoft, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: invoicePaid ? c.green : c.amber }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: invoicePaid ? c.green : c.amber }}>{invoicePaid ? "Paid" : "Awaiting payment"}</span>
                    </div>
                    <span style={{ fontSize: 12, color: c.textTertiary }}>{invoicePaid ? "Paid just now" : "Sent just now · Payment reminder in 3 days"}</span>
                  </div>

                  {/* Before/after photos attached */}
                  <div style={{ padding: "20px 32px", borderTop: `1px solid ${c.border}` }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: c.text, marginBottom: 10 }}>Attached photos</div>
                    <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 8 }}>
                      <div style={{ height: 80, background: "#4a5d4a", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>BEFORE</span>
                      </div>
                      <div style={{ height: 80, background: "#8fa88f", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>AFTER</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ padding: "16px 32px", borderTop: `1px solid ${c.border}`, background: c.surfaceAlt }}>
                    <div style={{ fontSize: 11, color: c.textTertiary, textAlign: "center" }}>Thank you for your business. Pay online at hallpowerwash.com/pay or reply to this text.</div>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
                  <button onClick={() => showToast("Invoice resent to " + activeJobData.client)} style={{ padding: "9px 22px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Resend to customer</button>
                  <button onClick={() => showToast("PDF downloaded")} style={{ padding: "9px 22px", background: c.white, color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Download PDF</button>
                  <button onClick={() => { setInvoicePaid(true); showToast("Marked as paid"); }} style={{ padding: "9px 22px", background: c.greenSoft, color: c.green, border: `1px solid ${c.greenBorder}`, borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>{invoicePaid ? "Paid ✓" : "Mark as paid"}</button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ====== CHEMICALS ====== */}
        {page === "chemicals" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>Chemicals</h1>
                <p style={{ fontSize: 13, color: c.textTertiary, margin: "5px 0 0" }}>Inventory, mix ratios, and usage tracking</p>
              </div>
              <button onClick={() => showToast("Log purchase form — coming in full release")} style={{ padding: "8px 18px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Log Purchase</button>
            </div>

            {/* Summary stats */}
            <div style={{ display: "grid", gridTemplateColumns: g("repeat(4, 1fr)", "repeat(2, 1fr)"), gap: 10, marginBottom: 20 }}>
              {[
                { label: "Inventory value", value: "$289", sub: "4 chemicals in stock", color: c.text },
                { label: "Used this month", value: "37.5 gal", sub: "Across 14 jobs", color: c.text },
                { label: "Avg cost per job", value: "$8.42", sub: "Down from $9.10 last month", color: c.green },
                { label: "Low stock alerts", value: "1", sub: "Sodium Hydroxide — reorder", color: c.red },
              ].map((s) => (
                <div key={s.label} style={card({ padding: "14px 16px" })}>
                  <div style={{ fontSize: 11, color: c.textTertiary, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: s.color, letterSpacing: "-0.5px" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: s.color === c.red ? c.red : c.textTertiary, marginTop: 4, fontWeight: s.color === c.red ? 500 : 400 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Chemical cards */}
            <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14, marginBottom: 20 }}>
              {chemicals.map((ch) => (
                <div key={ch.name} style={card({ padding: 0, overflow: "hidden" })}>
                  {/* Header */}
                  <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{ch.name}</div>
                      <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 3 }}>{ch.supplier}</div>
                    </div>
                    {ch.low ? (
                      <span style={{ fontSize: 10, fontWeight: 600, color: c.red, padding: "3px 8px", background: c.redSoft, borderRadius: 4, border: `1px solid ${c.redBorder}` }}>LOW STOCK</span>
                    ) : (
                      <span style={{ fontSize: 10, fontWeight: 600, color: c.green, padding: "3px 8px", background: c.greenSoft, borderRadius: 4, border: `1px solid ${c.greenBorder}` }}>IN STOCK</span>
                    )}
                  </div>

                  {/* Stock + usage stats */}
                  <div style={{ padding: "0 20px 16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    <div style={{ padding: "10px 12px", background: c.surfaceAlt, borderRadius: 6 }}>
                      <div style={{ fontSize: 10, color: c.textTertiary }}>On hand</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: ch.low ? c.red : c.text, marginTop: 2 }}>{ch.stock}</div>
                    </div>
                    <div style={{ padding: "10px 12px", background: c.surfaceAlt, borderRadius: 6 }}>
                      <div style={{ fontSize: 10, color: c.textTertiary }}>Used this month</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: c.text, marginTop: 2 }}>{ch.usedMonth} gal</div>
                    </div>
                    <div style={{ padding: "10px 12px", background: c.surfaceAlt, borderRadius: 6 }}>
                      <div style={{ fontSize: 10, color: c.textTertiary }}>Cost / gallon</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: c.text, marginTop: 2 }}>${ch.costGal.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Mix ratio — the PW selling point */}
                  <div style={{ padding: "12px 20px", borderTop: `1px solid ${c.borderLight}`, background: c.accentSoft }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: c.accent, letterSpacing: "0.5px", marginBottom: 4 }}>MIX RATIO</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{ch.mix}</div>
                  </div>

                  {/* Details */}
                  <div style={{ padding: "12px 20px", borderTop: `1px solid ${c.borderLight}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: c.textSecondary, marginBottom: 6 }}>
                      <span>Used on {ch.jobs} jobs this month</span>
                      <span>Last ordered {ch.lastOrder}</span>
                    </div>
                    <div style={{ fontSize: 11, color: c.textTertiary, padding: "6px 10px", background: c.surfaceAlt, borderRadius: 4, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontWeight: 600 }}>⚠</span> {ch.safetyNote}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ padding: "12px 20px", borderTop: `1px solid ${c.borderLight}`, display: "flex", gap: 8 }}>
                    <button onClick={() => showToast(ch.low ? "Reorder placed for " + ch.name : "Usage logged for " + ch.name)} style={{ flex: 1, padding: "7px", background: ch.low ? c.red : c.accent, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>{ch.low ? "Reorder Now" : "Log Usage"}</button>
                    <button onClick={() => showToast("Edit " + ch.name)} style={{ flex: 1, padding: "7px", background: c.white, color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Edit Details</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent usage log */}
            <div style={card()}>
              <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 14 }}>Recent usage log</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Date", "Job", "Chemical", "Amount", "Mix used"].map((h) => (
                      <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 500, color: c.textTertiary, padding: "0 8px 10px 0", borderBottom: `1px solid ${c.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: "Mar 18", job: "Sarah Mitchell — House Wash", chem: "Sodium Hypochlorite", amount: "3 gal", mix: "3% downstream" },
                    { date: "Mar 18", job: "Sarah Mitchell — House Wash", chem: "Surfactant", amount: "3 oz", mix: "1 oz/gal SH" },
                    { date: "Mar 17", job: "Marcus Rivera — House Wash", chem: "Sodium Hypochlorite", amount: "2.5 gal", mix: "3% downstream" },
                    { date: "Mar 17", job: "Marcus Rivera — House Wash", chem: "Surfactant", amount: "2.5 oz", mix: "1 oz/gal SH" },
                    { date: "Mar 16", job: "Lakewood HOA — Building Wash", chem: "Sodium Hypochlorite", amount: "8 gal", mix: "4% X-Jet" },
                    { date: "Mar 16", job: "Lakewood HOA — Building Wash", chem: "Sodium Hydroxide", amount: "2 gal", mix: "6 oz/gal degreaser" },
                    { date: "Mar 15", job: "Palm Bay Dental — Storefront", chem: "Sodium Hypochlorite", amount: "1.5 gal", mix: "2% soft wash" },
                    { date: "Mar 14", job: "Tony Reeves — Driveway", chem: "Sodium Hypochlorite", amount: "4 gal", mix: "3% surface clean" },
                  ].map((r, i) => (
                    <tr key={i}>
                      <td style={{ padding: "10px 8px 10px 0", fontSize: 12, color: c.textTertiary, borderBottom: `1px solid ${c.borderLight}` }}>{r.date}</td>
                      <td style={{ padding: "10px 8px 10px 0", fontSize: 12, fontWeight: 500, color: c.text, borderBottom: `1px solid ${c.borderLight}` }}>{r.job}</td>
                      <td style={{ padding: "10px 8px 10px 0", fontSize: 12, color: c.textSecondary, borderBottom: `1px solid ${c.borderLight}` }}>{r.chem}</td>
                      <td style={{ padding: "10px 8px 10px 0", fontSize: 12, fontWeight: 500, color: c.text, borderBottom: `1px solid ${c.borderLight}` }}>{r.amount}</td>
                      <td style={{ padding: "10px 0", fontSize: 11, color: c.textTertiary, borderBottom: `1px solid ${c.borderLight}` }}>{r.mix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ====== CUSTOMERS ====== */}
        {page === "customers" && !selectedCust && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>Customers</h1>
                <p style={{ fontSize: 13, color: c.textTertiary, margin: "5px 0 0" }}>{customers.length} total customers</p>
              </div>
              <button onClick={() => showToast("Add customer form — coming in full release")} style={{ padding: "8px 18px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Add Customer</button>
            </div>

            {/* Search */}
            <div style={{ marginBottom: 16 }}>
              <input placeholder="Search by name, address, or phone..." value={custSearch} onChange={(e) => setCustSearch(e.target.value)} style={{ ...inputBase, maxWidth: 400, background: c.white }} />
            </div>

            {/* Customer cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {customers.filter(cu => cu.name.toLowerCase().includes(custSearch.toLowerCase()) || cu.address.toLowerCase().includes(custSearch.toLowerCase()) || cu.phone.includes(custSearch)).map((cu) => (
                <div key={cu.id} onClick={() => setSelectedCust(cu.id)} style={isMobile ? { ...card(), display: "flex", flexDirection: "column", gap: 6, cursor: "pointer", padding: "14px 16px" } : { ...card(), display: "grid", gridTemplateColumns: "1.6fr 1fr 0.8fr 0.6fr auto", gap: 16, alignItems: "center", cursor: "pointer", padding: "16px 24px" }}>
                  <div style={isMobile ? { display: "flex", justifyContent: "space-between", alignItems: "center" } : {}}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{cu.name}</div>
                      <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 3 }}>{cu.address}</div>
                    </div>
                    {isMobile && <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 6, background: cu.type === "Commercial" ? c.purpleSoft : c.accentSoft, border: `1px solid ${cu.type === "Commercial" ? c.purpleBorder : c.accentBorder}`, color: cu.type === "Commercial" ? c.purple : c.accent }}>{cu.type}</span>}
                  </div>
                  {isMobile && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: c.textTertiary }}>
                    <span>{cu.phone}</span>
                    <span style={{ fontWeight: 600, color: c.text }}>{cu.jobCount} jobs · {cu.totalSpent}</span>
                  </div>}
                  {!isMobile && <div>
                    <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 2 }}>{cu.phone}</div>
                    <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 2 }}>{cu.email}</div>
                  </div>}
                  {!isMobile && <div>
                    <div style={{ fontSize: 11, color: c.textTertiary }}>Jobs / Spent</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginTop: 3 }}>{cu.jobCount} jobs · {cu.totalSpent}</div>
                  </div>}
                  {!isMobile && <div>
                    <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 6, background: cu.type === "Commercial" ? c.purpleSoft : c.accentSoft, border: `1px solid ${cu.type === "Commercial" ? c.purpleBorder : c.accentBorder}`, color: cu.type === "Commercial" ? c.purple : c.accent }}>{cu.type}</span>
                  </div>}
                  <div style={{ fontSize: 12, color: c.textTertiary }}>Last: {cu.lastService}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ====== CUSTOMER DETAIL ====== */}
        {page === "customers" && selectedCust && (() => {
          const cu = customers.find(c => c.id === selectedCust);
          if (!cu) return null;
          const custJobs = jobs.filter(j => j.client === cu.name);
          const custPhotos = photoSets.filter(p => p.client === cu.name);
          return (
            <>
              <div style={{ marginBottom: 24 }}>
                <button onClick={() => setSelectedCust(null)} style={{ background: "none", border: "none", color: c.accent, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 12, fontWeight: 500, fontFamily: font }}>← Back to customers</button>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>{cu.name}</h1>
                    <p style={{ fontSize: 13, color: c.textTertiary, margin: "4px 0 0" }}>{cu.address}</p>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: "4px 12px", borderRadius: 6, background: cu.type === "Commercial" ? c.purpleSoft : c.accentSoft, border: `1px solid ${cu.type === "Commercial" ? c.purpleBorder : c.accentBorder}`, color: cu.type === "Commercial" ? c.purple : c.accent }}>{cu.type}</span>
                </div>
              </div>

              {/* Contact info */}
              <div style={{ ...card({ marginBottom: 20 }), display: "grid", gridTemplateColumns: g("1fr 1fr 1fr 1fr", "1fr 1fr"), gap: 14 }}>
                <div><div style={{ fontSize: 11, color: c.textTertiary }}>Phone</div><div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 3 }}>{cu.phone}</div></div>
                <div><div style={{ fontSize: 11, color: c.textTertiary }}>Email</div><div style={{ fontSize: 13, fontWeight: 500, color: c.accent, marginTop: 3 }}>{cu.email}</div></div>
                <div><div style={{ fontSize: 11, color: c.textTertiary }}>Customer since</div><div style={{ fontSize: 13, fontWeight: 500, color: c.text, marginTop: 3 }}>Dec 2024</div></div>
                <div><div style={{ fontSize: 11, color: c.textTertiary }}>Next service due</div><div style={{ fontSize: 13, fontWeight: 500, color: cu.jobCount >= 3 ? c.amber : c.textSecondary, marginTop: 3 }}>{cu.jobCount >= 3 ? "Apr 2026 (seasonal)" : "—"}</div></div>
              </div>

              {/* Summary cards */}
              <div style={{ display: "grid", gridTemplateColumns: g("repeat(4, 1fr)", "repeat(2, 1fr)"), gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Total spent", value: cu.totalSpent },
                  { label: "Total jobs", value: String(cu.jobCount) },
                  { label: "Avg ticket", value: "$" + (parseFloat(cu.totalSpent.replace(/[$,]/g, "")) / cu.jobCount).toFixed(0) },
                  { label: "Last service", value: cu.lastService },
                ].map((s) => (
                  <div key={s.label} style={card({ padding: "14px 16px" })}>
                    <div style={{ fontSize: 11, color: c.textTertiary, marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: c.text }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Rebook reminder — only for repeat customers */}
              {cu.jobCount >= 3 && (
                <div style={{ ...card({ marginBottom: 20, padding: "16px 20px" }), background: c.amberSoft, border: `1px solid ${c.amberBorder}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: c.amber }}>Seasonal rebook due</div>
                      <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 3 }}>Last house wash was {cu.lastService}. Based on service frequency, {cu.name.split(" ")[0]} is due for a rebook in April.</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => showToast("Rebook text sent to " + cu.name)} style={{ padding: "7px 14px", background: c.amber, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Send rebook text</button>
                      <button onClick={() => showToast("Dismissed")} style={{ padding: "7px 14px", background: c.white, color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Dismiss</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div style={{ ...card({ marginBottom: 20 }) }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 8 }}>Notes</div>
                <div style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.6 }}>{cu.note}</div>
              </div>

              {/* Job history + Photos side by side */}
              <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14 }}>
                <div style={card()}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14 }}>Job history</div>
                  {custJobs.length === 0 && <div style={{ fontSize: 13, color: c.textTertiary }}>No jobs yet</div>}
                  {custJobs.map((j, i) => (
                    <div key={j.date} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{j.service}</div>
                        <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 2 }}>{j.surface} · {j.sqft} sqft</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{j.amount}</div>
                        <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 2 }}>{j.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={card()}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14 }}>Before / after photos</div>
                  {custPhotos.length === 0 && <div style={{ fontSize: 13, color: c.textTertiary }}>No photos yet</div>}
                  {custPhotos.map((p) => (
                    <div key={p.id} style={{ marginBottom: 14 }}>
                      <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 6, marginBottom: 6 }}>
                        <div style={{ height: 72, background: p.beforeColor, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>BEFORE</span>
                        </div>
                        <div style={{ height: 72, background: p.afterColor, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>AFTER</span>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: c.textSecondary }}>{p.service} · {p.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoice history */}
              <div style={{ ...card({ marginTop: 14 }) }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14 }}>Invoices</div>
                {custJobs.length === 0 && <div style={{ fontSize: 13, color: c.textTertiary }}>No invoices yet</div>}
                {custJobs.map((j, i) => {
                  const paid = j.status === "Completed";
                  return (
                    <div key={j.date + j.service} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: paid ? c.green : c.amber }} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{j.service} — {j.amount}</div>
                          <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 2 }}>{j.date}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 4, background: paid ? c.greenSoft : c.amberSoft, border: `1px solid ${paid ? c.greenBorder : c.amberBorder}`, color: paid ? c.green : c.amber }}>{paid ? "Paid" : "Pending"}</span>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}

        {/* ====== PHOTOS ====== */}
        {page === "photos" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>Photos</h1>
                <p style={{ fontSize: 13, color: c.textTertiary, margin: "5px 0 0" }}>Before / after documentation — {photoSets.length} jobs photographed</p>
              </div>
              <button onClick={() => showToast("Photo upload — coming in full release")} style={{ padding: "8px 18px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Upload Photos</button>
            </div>

            {/* Photo grid */}
            <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14 }}>
              {photoSets.map((p) => (
                <div key={p.id} style={card({ padding: 0, overflow: "hidden" })}>
                  {/* Before/After images */}
                  <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr") }}>
                    <div style={{ height: 120, background: p.beforeColor, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.8)", position: "absolute", top: 8, left: 10, background: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: 4 }}>BEFORE</span>
                    </div>
                    <div style={{ height: 120, background: p.afterColor, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.8)", position: "absolute", top: 8, left: 10, background: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: 4 }}>AFTER</span>
                    </div>
                  </div>
                  {/* Details */}
                  <div style={{ padding: "14px 18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{p.client}</span>
                      <span style={{ fontSize: 11, color: c.textTertiary }}>{p.date}</span>
                    </div>
                    <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 8 }}>{p.service} · {p.surface}</div>
                    <div style={{ fontSize: 12, color: c.textTertiary, lineHeight: 1.5, padding: "8px 10px", background: c.surfaceAlt, borderRadius: 6 }}>{p.notes}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ====== REPORTS ====== */}
        {page === "reports" && (
          <>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>Reports</h1>
              <p style={{ fontSize: 13, color: c.textTertiary, margin: "5px 0 0" }}>Business performance and insights — March 2026</p>
            </div>

            {/* Top stats */}
            <div style={{ display: "grid", gridTemplateColumns: g("repeat(5, 1fr)", "repeat(2, 1fr)"), gap: 10, marginBottom: 24 }}>
              {[
                { label: "Revenue MTD", value: "$12,680", sub: "+18% vs Feb", color: c.green },
                { label: "Jobs completed", value: "28", sub: "+6 vs Feb", color: c.green },
                { label: "Avg ticket", value: "$423", sub: "+$31 vs Feb", color: c.green },
                { label: "Close rate", value: "72%", sub: "+4%", color: c.green },
                { label: "Outstanding", value: "$960", sub: "3 invoices", color: c.red },
              ].map((s) => (
                <div key={s.label} style={card({ padding: "16px", textAlign: "center" as const })}>
                  <div style={{ fontSize: 11, color: c.textTertiary, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: c.text, letterSpacing: "-1px" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: s.color, fontWeight: 500, marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Revenue chart + service mix */}
            <div style={{ display: "grid", gridTemplateColumns: g("1.3fr 0.7fr", "1fr"), gap: 14, marginBottom: 20 }}>
              <div style={card()}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Weekly revenue</span>
                  <span style={{ fontSize: 12, color: c.green, fontWeight: 600 }}>$5,530 this week</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
                  {[
                    { day: "Mon", val: 520, label: "$520" },
                    { day: "Tue", val: 0, label: "$0" },
                    { day: "Wed", val: 600, label: "$600" },
                    { day: "Thu", val: 2160, label: "$2.2k" },
                    { day: "Fri", val: 190, label: "$190" },
                    { day: "Sat", val: 1120, label: "$1.1k" },
                  ].map((d) => {
                    const max = 2200;
                    const pct = Math.max((d.val / max) * 100, 3);
                    const isToday = d.day === "Wed";
                    const isRain = d.day === "Fri";
                    return (
                      <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                        <div style={{ fontSize: 11, color: isToday ? c.accent : c.textTertiary, fontWeight: 500, marginBottom: 4 }}>{d.label}</div>
                        <div style={{
                          width: "100%", height: `${pct}%`, minHeight: 3, borderRadius: "4px 4px 0 0",
                          background: isRain ? c.redSoft : isToday ? c.accent : d.val === 0 ? c.border : c.accentSoft,
                          border: `1px solid ${isRain ? c.redBorder : isToday ? c.accent : c.accentBorder}`,
                        }} />
                        <div style={{ fontSize: 11, color: isToday ? c.accent : isRain ? c.red : c.textTertiary, marginTop: 6, fontWeight: isToday ? 600 : 400 }}>{d.day}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, padding: "10px 0 0", borderTop: `1px solid ${c.borderLight}` }}>
                  <span style={{ fontSize: 12, color: c.textTertiary }}>Last week: $4,890</span>
                  <span style={{ fontSize: 12, color: c.green, fontWeight: 500 }}>+13% week over week</span>
                </div>
              </div>

              <div style={card()}>
                <span style={{ fontSize: 14, fontWeight: 600, color: c.text, display: "block", marginBottom: 16 }}>Revenue by service</span>
                {[
                  { service: "House Wash", revenue: 4280, pct: 34, color: "#3b82f6" },
                  { service: "Commercial", revenue: 3450, pct: 27, color: "#7c3aed" },
                  { service: "Driveway", revenue: 2190, pct: 17, color: "#16a34a" },
                  { service: "Roof Wash", revenue: 1560, pct: 12, color: "#ec4899" },
                  { service: "Deck", revenue: 880, pct: 7, color: "#ca8a04" },
                  { service: "Other", revenue: 320, pct: 3, color: "#a1a1aa" },
                ].map((s, i) => (
                  <div key={s.service} style={{ marginBottom: i < 5 ? 10 : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: c.textSecondary }}>{s.service}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>${s.revenue.toLocaleString()}</span>
                    </div>
                    <div style={{ height: 6, background: c.surfaceAlt, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 14, padding: "10px 0 0", borderTop: `1px solid ${c.borderLight}` }}>
                  <div style={{ fontSize: 12, color: c.textTertiary }}>Avg ticket: <span style={{ fontWeight: 600, color: c.text }}>$423</span></div>
                </div>
              </div>
            </div>

            {/* Top customers + monthly comparison */}
            <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14, marginBottom: 20 }}>
              <div style={card()}>
                <span style={{ fontSize: 14, fontWeight: 600, color: c.text, display: "block", marginBottom: 14 }}>Top customers</span>
                {[
                  { name: "Lakewood HOA", spent: "$3,700", jobs: 2, type: "Commercial" },
                  { name: "Sarah Mitchell", spent: "$1,040", jobs: 2, type: "Residential" },
                  { name: "Palm Bay Dental", spent: "$680", jobs: 1, type: "Commercial" },
                  { name: "Marcus Rivera", spent: "$600", jobs: 2, type: "Residential" },
                  { name: "Tony Reeves", spent: "$310", jobs: 1, type: "Residential" },
                ].map((cu, i) => (
                  <div key={cu.name} onClick={() => { const found = customers.find(cx => cx.name === cu.name); if (found) { setPage("customers"); setSelectedCust(found.id); } }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: cu.type === "Commercial" ? c.purpleSoft : c.accentSoft, border: `1px solid ${cu.type === "Commercial" ? c.purpleBorder : c.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: cu.type === "Commercial" ? c.purple : c.accent }}>{cu.name[0]}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{cu.name}</div>
                        <div style={{ fontSize: 11, color: c.textTertiary }}>{cu.jobs} job{cu.jobs > 1 ? "s" : ""}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{cu.spent}</span>
                  </div>
                ))}
              </div>

              <div style={card()}>
                <span style={{ fontSize: 14, fontWeight: 600, color: c.text, display: "block", marginBottom: 14 }}>Monthly comparison</span>
                {[
                  { month: "March (current)", revenue: 12680, jobs: 28, trend: "up" },
                  { month: "February", revenue: 10740, jobs: 22, trend: "up" },
                  { month: "January", revenue: 8920, jobs: 19, trend: "up" },
                  { month: "December", revenue: 6400, jobs: 14, trend: "down" },
                ].map((m, i) => (
                  <div key={m.month} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? c.text : c.textSecondary }}>{m.month}</div>
                      <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 2 }}>{m.jobs} jobs</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>${m.revenue.toLocaleString()}</div>
                      {i < 3 && (
                        <div style={{ fontSize: 11, color: c.green, marginTop: 2 }}>
                          +{Math.round((([ 12680, 10740, 8920, 6400 ][i] / [ 12680, 10740, 8920, 6400 ][i + 1] - 1) * 100))}% vs prior
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote conversion + activity */}
            <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14 }}>
              <div style={card()}>
                <span style={{ fontSize: 14, fontWeight: 600, color: c.text, display: "block", marginBottom: 14 }}>Quote conversion funnel</span>
                {[
                  { stage: "Quotes sent", count: 39, pct: 100, color: c.accent },
                  { stage: "Viewed by customer", count: 31, pct: 79, color: c.accent },
                  { stage: "Responded", count: 22, pct: 56, color: c.amber },
                  { stage: "Won", count: 16, pct: 41, color: c.green },
                  { stage: "Lost", count: 6, pct: 15, color: c.red },
                ].map((s, i) => (
                  <div key={s.stage} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: c.textSecondary }}>{s.stage}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{s.count} <span style={{ fontWeight: 400, color: c.textTertiary }}>({s.pct}%)</span></span>
                    </div>
                    <div style={{ height: 6, background: c.surfaceAlt, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: 3, opacity: 0.7 }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 8, padding: "10px 12px", background: c.greenSoft, borderRadius: 6, border: `1px solid ${c.greenBorder}`, fontSize: 12 }}>
                  <span style={{ fontWeight: 600, color: c.green }}>72% close rate</span>
                  <span style={{ color: c.textTertiary }}> — auto follow-ups recovered an est. 4 jobs ($1,840)</span>
                </div>
              </div>

              <div style={card()}>
                <span style={{ fontSize: 14, fontWeight: 600, color: c.text, display: "block", marginBottom: 14 }}>Activity log</span>
                {[
                  { action: "Invoice paid", detail: "Sarah Mitchell — $520", time: "2 hours ago", color: c.green },
                  { action: "Quote sent", detail: "Sunrise Condo — $3,200", time: "Yesterday", color: c.accent },
                  { action: "New 5-star review", detail: "Sarah Mitchell on Google", time: "Yesterday", color: c.amber },
                  { action: "Job completed", detail: "Marcus Rivera — House Wash", time: "Yesterday", color: c.green },
                  { action: "Follow-up sent", detail: "Daniel Park — Deck quote", time: "2 days ago", color: c.purple },
                  { action: "Quote viewed", detail: "Rachel Torres opened quote", time: "2 days ago", color: c.accent },
                  { action: "Payment overdue", detail: "Jennifer Collins — $220", time: "3 days ago", color: c.red },
                  { action: "Job completed", detail: "Tony Reeves — House Wash", time: "4 days ago", color: c.green },
                  { action: "Quote accepted", detail: "Lisa Hernandez — Fence", time: "4 days ago", color: c.green },
                  { action: "Review request sent", detail: "Tony Reeves", time: "4 days ago", color: c.amber },
                ].map((ev, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: ev.color, marginTop: 5, flexShrink: 0 }} />
                    <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: c.text }}><span style={{ fontWeight: 500 }}>{ev.action}</span> <span style={{ color: c.textTertiary }}>·</span> <span style={{ color: c.textSecondary }}>{ev.detail}</span></span>
                      <span style={{ fontSize: 11, color: c.textTertiary, flexShrink: 0, marginLeft: 10 }}>{ev.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ====== SETTINGS ====== */}
        {page === "settings" && (
          <>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0 }}>Settings</h1>
              <p style={{ fontSize: 13, color: c.textTertiary, margin: "5px 0 0" }}>Configure your business and preferences</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 800 }}>

              {/* Business Profile */}
              <div style={card()}>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 4 }}>Business profile</div>
                <div style={{ fontSize: 12, color: c.textTertiary, marginBottom: 18 }}>This info appears on quotes and invoices sent to customers</div>
                <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14, marginBottom: 14 }}>
                  <div><label style={lbl}>Company name</label><input defaultValue="Hall Power Washing" style={inputBase} /></div>
                  <div><label style={lbl}>Owner name</label><input defaultValue="Zack Hall" style={inputBase} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14, marginBottom: 14 }}>
                  <div><label style={lbl}>Phone</label><input defaultValue="(813) 555-0100" style={inputBase} /></div>
                  <div><label style={lbl}>Email</label><input defaultValue="zack@hallpowerwash.com" style={inputBase} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14, marginBottom: 14 }}>
                  <div><label style={lbl}>Business address</label><input defaultValue="Tampa, FL 33602" style={inputBase} /></div>
                  <div><label style={lbl}>Website</label><input defaultValue="hallpowerwash.com" style={inputBase} /></div>
                </div>
                <div><label style={lbl}>License / Insurance #</label><input defaultValue="" placeholder="Optional — displays on quotes" style={{ ...inputBase, maxWidth: 400 }} /></div>
                <div style={{ marginTop: 16 }}>
                  <button onClick={() => showToast("Business profile saved")} style={{ padding: "8px 18px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save changes</button>
                </div>
              </div>

              {/* Service Pricing */}
              <div style={card()}>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 4 }}>Service pricing</div>
                <div style={{ fontSize: 12, color: c.textTertiary, marginBottom: 18 }}>Set your base rates per square foot. These are used in the quote builder.</div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Service", "Description", "Base rate (per sqft)", ""].map((h) => (
                        <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 500, color: c.textTertiary, padding: "0 6px 10px 0", borderBottom: `1px solid ${c.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {serviceTypes.map((s) => (
                      <tr key={s.id}>
                        <td style={{ padding: "10px 6px 10px 0", fontSize: 13, fontWeight: 500, color: c.text, borderBottom: `1px solid ${c.borderLight}` }}>{s.name}</td>
                        <td style={{ padding: "10px 6px 10px 0", fontSize: 12, color: c.textTertiary, borderBottom: `1px solid ${c.borderLight}` }}>{s.desc}</td>
                        <td style={{ padding: "10px 6px 10px 0", borderBottom: `1px solid ${c.borderLight}` }}>
                          <input defaultValue={s.baseRate.toFixed(2)} style={{ ...inputBase, width: 90, textAlign: "right" }} />
                        </td>
                        <td style={{ padding: "10px 0", borderBottom: `1px solid ${c.borderLight}`, textAlign: "right" }}>
                          <span style={{ fontSize: 12, color: c.accent, cursor: "pointer" }}>Edit</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 10 }}>Surface modifiers</div>
                  <div style={{ display: "grid", gridTemplateColumns: g("repeat(3, 1fr)", "1fr"), gap: 8 }}>
                    {surfaceTypes.map((s) => (
                      <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: c.surfaceAlt, borderRadius: 6 }}>
                        <span style={{ fontSize: 12, color: c.textSecondary }}>{s.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: s.mod > 1.2 ? c.amber : s.mod > 1 ? c.textSecondary : c.textTertiary }}>{s.mod}x</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <button onClick={() => showToast("Pricing saved")} style={{ padding: "8px 18px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save pricing</button>
                </div>
              </div>

              {/* Auto Follow-Up Settings */}
              <div style={card()}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Auto follow-up</div>
                  <div style={{ padding: "4px 12px", background: c.greenSoft, borderRadius: 6, border: `1px solid ${c.greenBorder}`, fontSize: 12, fontWeight: 500, color: c.green }}>Enabled</div>
                </div>
                <div style={{ fontSize: 12, color: c.textTertiary, marginBottom: 18 }}>Automatically text customers who haven&apos;t responded to quotes</div>

                {[
                  { step: "Follow-up 1", timing: "24 hours", message: "Hi {name}, just following up on your {service} quote. Any questions I can answer?" },
                  { step: "Follow-up 2", timing: "3 days", message: "Hey {name} — wanted to check in on your {service} quote (${amount}). We have availability this week if you'd like to get it scheduled." },
                  { step: "Follow-up 3", timing: "7 days", message: "Last follow-up on your {service} quote — let me know if you're still interested or if anything changed. Happy to adjust the scope if needed." },
                ].map((fu, i) => (
                  <div key={i} style={{ padding: "14px", background: c.surfaceAlt, borderRadius: 8, marginBottom: i < 2 ? 10 : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{fu.step}</span>
                      <span style={{ fontSize: 12, color: c.textTertiary }}>After {fu.timing}</span>
                    </div>
                    <textarea defaultValue={fu.message} rows={2} style={{ ...inputBase, resize: "vertical", fontSize: 12, fontFamily: font, background: c.white }} />
                    <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 6 }}>Variables: {"{name}"} {"{service}"} {"{amount}"} {"{company}"}</div>
                  </div>
                ))}
                <div style={{ marginTop: 16 }}>
                  <button onClick={() => showToast("Follow-up templates saved")} style={{ padding: "8px 18px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save templates</button>
                </div>
              </div>

              {/* Auto Review Request */}
              <div style={card()}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Auto review requests</div>
                  <div style={{ padding: "4px 12px", background: c.greenSoft, borderRadius: 6, border: `1px solid ${c.greenBorder}`, fontSize: 12, fontWeight: 500, color: c.green }}>Enabled</div>
                </div>
                <div style={{ fontSize: 12, color: c.textTertiary, marginBottom: 18 }}>Automatically ask for a Google review after job completion</div>

                <div style={{ padding: "14px", background: c.surfaceAlt, borderRadius: 8, marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Review request</span>
                    <span style={{ fontSize: 12, color: c.textTertiary }}>24 hours after job completion</span>
                  </div>
                  <textarea defaultValue={"Thanks for choosing {company}, {name}! If you're happy with your {service}, we'd really appreciate a quick Google review. It helps us grow! {review_link}"} rows={2} style={{ ...inputBase, resize: "vertical", fontSize: 12, fontFamily: font, background: c.white }} />
                </div>

                <div>
                  <label style={lbl}>Google review link</label>
                  <input defaultValue="https://g.page/hallpowerwash/review" placeholder="Paste your Google review link" style={{ ...inputBase, maxWidth: 500 }} />
                </div>
                <div style={{ marginTop: 16 }}>
                  <button onClick={() => showToast("Review settings saved")} style={{ padding: "8px 18px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save review settings</button>
                </div>
              </div>

              {/* Notifications */}
              <div style={card()}>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 4 }}>Notifications</div>
                <div style={{ fontSize: 12, color: c.textTertiary, marginBottom: 18 }}>Choose what alerts you receive</div>
                {[
                  { label: "New lead comes in", sub: "Push notification + text alert", on: true },
                  { label: "Quote viewed by customer", sub: "Push notification", on: true },
                  { label: "Quote accepted", sub: "Push notification + text alert", on: true },
                  { label: "Payment received", sub: "Push notification", on: true },
                  { label: "New Google review", sub: "Push notification", on: false },
                  { label: "Weather alert for scheduled jobs", sub: "Push notification, morning of", on: true },
                ].map((n, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderTop: i > 0 ? `1px solid ${c.borderLight}` : "none" }}>
                    <div>
                      <div style={{ fontSize: 13, color: c.text }}>{n.label}</div>
                      <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 2 }}>{n.sub}</div>
                    </div>
                    <div style={{
                      width: 38, height: 22, borderRadius: 11, cursor: "pointer",
                      background: n.on ? c.accent : c.border,
                      position: "relative", transition: "background 0.2s",
                    }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: "50%", background: "#fff",
                        position: "absolute", top: 3,
                        left: n.on ? 19 : 3,
                        transition: "left 0.2s",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Integrations preview */}
              <div style={card()}>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 4 }}>Integrations</div>
                <div style={{ fontSize: 12, color: c.textTertiary, marginBottom: 18 }}>Connect your existing tools</div>
                <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr 1fr", "1fr"), gap: 10 }}>
                  {[
                    { name: "QuickBooks", desc: "Sync invoices and payments", status: "Connect" },
                    { name: "Google Calendar", desc: "Two-way calendar sync", status: "Connect" },
                    { name: "Stripe", desc: "Accept credit card payments", status: "Connect" },
                  ].map((int) => (
                    <div key={int.name} style={{ padding: "14px", background: c.surfaceAlt, borderRadius: 8, border: `1px solid ${c.borderLight}` }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{int.name}</div>
                      <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 3 }}>{int.desc}</div>
                      <button onClick={() => showToast(int.name + " integration — coming soon")} style={{ marginTop: 10, padding: "5px 12px", background: c.white, color: c.accent, border: `1px solid ${c.accentBorder}`, borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>{int.status}</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax settings */}
              <div style={card()}>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 4 }}>Tax & invoicing</div>
                <div style={{ fontSize: 12, color: c.textTertiary, marginBottom: 18 }}>Configure tax rates and invoice settings</div>
                <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr 1fr", "1fr"), gap: 14, marginBottom: 14 }}>
                  <div><label style={lbl}>Sales tax rate (%)</label><input defaultValue="7.5" style={{ ...inputBase, width: 90 }} /></div>
                  <div><label style={lbl}>Invoice prefix</label><input defaultValue="INV-2026-" style={{ ...inputBase, width: 140 }} /></div>
                  <div><label style={lbl}>Payment terms</label>
                    <select defaultValue="due_on_receipt" style={{ ...inputBase, cursor: "pointer" }}>
                      <option value="due_on_receipt">Due on receipt</option>
                      <option value="net_15">Net 15</option>
                      <option value="net_30">Net 30</option>
                    </select>
                  </div>
                </div>
                <div style={{ padding: "10px 14px", background: c.surfaceAlt, borderRadius: 6, marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: c.textSecondary }}>Payment methods accepted</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    {["Credit card", "ACH / Bank", "Cash", "Check", "Venmo"].map(m => (
                      <span key={m} style={{ padding: "4px 10px", background: c.white, border: `1px solid ${c.border}`, borderRadius: 6, fontSize: 11, color: c.text, fontWeight: 500 }}>{m}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => showToast("Tax & invoice settings saved")} style={{ padding: "8px 18px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save invoice settings</button>
              </div>

              {/* Seasonal rebook settings */}
              <div style={card()}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Seasonal rebook reminders</div>
                  <div style={{ padding: "4px 12px", background: c.greenSoft, borderRadius: 6, border: `1px solid ${c.greenBorder}`, fontSize: 12, fontWeight: 500, color: c.green }}>Enabled</div>
                </div>
                <div style={{ fontSize: 12, color: c.textTertiary, marginBottom: 18 }}>Automatically remind customers when their next service is due based on service frequency</div>
                <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={lbl}>House wash frequency</label>
                    <select defaultValue="12" style={{ ...inputBase, cursor: "pointer" }}>
                      <option value="6">Every 6 months</option>
                      <option value="12">Every 12 months</option>
                      <option value="18">Every 18 months</option>
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Driveway frequency</label>
                    <select defaultValue="12" style={{ ...inputBase, cursor: "pointer" }}>
                      <option value="6">Every 6 months</option>
                      <option value="12">Every 12 months</option>
                      <option value="24">Every 24 months</option>
                    </select>
                  </div>
                </div>
                <div style={{ padding: "14px", background: c.surfaceAlt, borderRadius: 8, marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Rebook message</span>
                    <span style={{ fontSize: 12, color: c.textTertiary }}>Sent when service is due</span>
                  </div>
                  <textarea defaultValue={"Hi {name}, it's been {months} months since your last {service}. Ready to get it looking fresh again? Reply to schedule or visit {booking_link}"} rows={2} style={{ ...inputBase, resize: "vertical", fontSize: 12, fontFamily: font, background: c.white }} />
                </div>
                <button onClick={() => showToast("Rebook settings saved")} style={{ padding: "8px 18px", background: c.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save rebook settings</button>
              </div>

              {/* Danger zone */}
              <div style={{ ...card(), border: `1px solid ${c.redBorder}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.red, marginBottom: 4 }}>Danger zone</div>
                <div style={{ fontSize: 12, color: c.textTertiary, marginBottom: 14 }}>Irreversible actions</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: `1px solid ${c.borderLight}` }}>
                  <div>
                    <div style={{ fontSize: 13, color: c.text }}>Export all data</div>
                    <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 2 }}>Download all customers, jobs, quotes, and invoices as CSV</div>
                  </div>
                  <button onClick={() => showToast("Data export started — check your email")} style={{ padding: "6px 14px", background: c.white, color: c.text, border: `1px solid ${c.border}`, borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Export</button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: `1px solid ${c.borderLight}` }}>
                  <div>
                    <div style={{ fontSize: 13, color: c.red }}>Delete account</div>
                    <div style={{ fontSize: 11, color: c.textTertiary, marginTop: 2 }}>Permanently delete your account and all data</div>
                  </div>
                  <button onClick={() => showToast("Contact support to delete your account")} style={{ padding: "6px 14px", background: c.redSoft, color: c.red, border: `1px solid ${c.redBorder}`, borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Delete</button>
                </div>
              </div>

            </div>
          </>
        )}
      </main>
      </div>
    </div>
    )}
    </>
  );
}