import type { ProjectGroup } from "./data/projects";

interface Palette {
  from: string;
  to: string;
  accent: string;
  accentSoft: string;
}

/** Data work leans violet/indigo, full stack leans cyan/blue, matching the Skills section accents. */
const palettes: Record<ProjectGroup, Palette[]> = {
  data: [
    { from: "#2e1065", to: "#0a0d1a", accent: "#c4b5fd", accentSoft: "#8b5cf6" },
    { from: "#3b0764", to: "#0a0d1a", accent: "#f0abfc", accentSoft: "#c026d3" },
    { from: "#1e1b4b", to: "#0a0d1a", accent: "#a5b4fc", accentSoft: "#6366f1" },
  ],
  fullstack: [
    { from: "#083344", to: "#0a0d1a", accent: "#67e8f9", accentSoft: "#06b6d4" },
    { from: "#172554", to: "#0a0d1a", accent: "#93c5fd", accentSoft: "#3b82f6" },
    { from: "#042f2e", to: "#0a0d1a", accent: "#5eead4", accentSoft: "#14b8a6" },
  ],
};

/**
 * Decorative cover art for a project card.
 *
 * Drawn as inline SVG rather than shipped as an image so every card stays sharp at
 * any size and picks up its own palette without another network request.
 */
export function ProjectCover({
  group,
  variant = 0,
  uid,
  className = "",
}: {
  group: ProjectGroup;
  /** Index of the card, used to rotate through the palettes. */
  variant?: number;
  /** Unique suffix for the SVG gradient ids on the page. */
  uid: string;
  className?: string;
}) {
  const options = palettes[group];
  const palette = options[variant % options.length];

  const baseId = `cover-base-${uid}`;
  const fillId = `cover-fill-${uid}`;
  const glowId = `cover-glow-${uid}`;

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={baseId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.accent} stopOpacity="0.45" />
          <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor={palette.accentSoft} stopOpacity="0.55" />
          <stop offset="100%" stopColor={palette.accentSoft} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#${baseId})`} />
      <circle cx="330" cy="90" r="150" fill={`url(#${glowId})`} />

      <g stroke={palette.accent} strokeOpacity="0.1" strokeWidth="1">
        {[60, 120, 180, 240, 300, 360, 420].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />
        ))}
        {[50, 130, 210, 290, 370].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" />
        ))}
      </g>

      {group === "data" ? (
        <DataMotif palette={palette} fillId={fillId} />
      ) : (
        <FullStackMotif palette={palette} />
      )}
    </svg>
  );
}

/** Trend line, confidence area, scatter and bars: the shape of an analytics chart. */
function DataMotif({ palette, fillId }: { palette: Palette; fillId: string }) {
  // The line runs off the right edge so the artwork reads as a crop of a larger chart.
  const linePoints = "0,325 40,300 90,255 140,275 190,205 240,225 290,155 350,120 400,92";
  const scatter = [
    [70, 350],
    [110, 330],
    [150, 355],
    [195, 315],
    [235, 335],
    [280, 300],
    [320, 285],
  ];

  return (
    <g>
      <path
        d="M0,325 L40,300 L90,255 L140,275 L190,205 L240,225 L290,155 L350,120 L400,92 L400,430 L0,430 Z"
        fill={`url(#${fillId})`}
      />
      <polyline
        points={linePoints}
        fill="none"
        stroke={palette.accent}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [40, 300],
        [140, 275],
        [240, 225],
        [350, 120],
      ].map(([cx, cy]) => (
        <circle
          key={`node${cx}`}
          cx={cx}
          cy={cy}
          r="7"
          fill={palette.from}
          stroke={palette.accent}
          strokeWidth="4"
        />
      ))}

      {scatter.map(([cx, cy]) => (
        <circle
          key={`dot${cx}`}
          cx={cx}
          cy={cy}
          r="4"
          fill={palette.accent}
          fillOpacity="0.5"
        />
      ))}

      <g fill={palette.accent} fillOpacity="0.28">
        <rect x="40" y="420" width="34" height="45" rx="6" />
        <rect x="90" y="400" width="34" height="65" rx="6" />
        <rect x="140" y="435" width="34" height="30" rx="6" />
        <rect x="190" y="385" width="34" height="80" rx="6" />
        <rect x="240" y="415" width="34" height="50" rx="6" />
        <rect x="290" y="370" width="34" height="95" rx="6" />
      </g>
      <line
        x1="30"
        y1="465"
        x2="370"
        y2="465"
        stroke={palette.accent}
        strokeOpacity="0.35"
        strokeWidth="2"
      />
    </g>
  );
}

/** Editor window over a stack of service layers: the shape of a full stack system. */
function FullStackMotif({ palette }: { palette: Palette }) {
  const codeLines = [
    { y: 152, width: 150 },
    { y: 176, width: 200 },
    { y: 200, width: 120 },
    { y: 224, width: 175 },
  ];

  return (
    <g>
      <rect
        x="45"
        y="95"
        width="310"
        height="170"
        rx="16"
        fill={palette.to}
        fillOpacity="0.55"
        stroke={palette.accent}
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <line
        x1="45"
        y1="130"
        x2="355"
        y2="130"
        stroke={palette.accent}
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      {[68, 88, 108].map((cx) => (
        <circle key={`chrome${cx}`} cx={cx} cy="112" r="5" fill={palette.accent} fillOpacity="0.6" />
      ))}

      {codeLines.map((line, index) => (
        <g key={line.y}>
          <rect x="70" y={line.y} width="16" height="8" rx="4" fill={palette.accent} fillOpacity="0.7" />
          <rect
            x="96"
            y={line.y}
            width={line.width}
            height="8"
            rx="4"
            fill={palette.accent}
            fillOpacity={index % 2 === 0 ? "0.32" : "0.2"}
          />
        </g>
      ))}

      <g>
        {[
          { y: 320, width: 260, x: 70 },
          { y: 370, width: 230, x: 85 },
          { y: 420, width: 200, x: 100 },
        ].map((layer, index) => (
          <rect
            key={layer.y}
            x={layer.x}
            y={layer.y}
            width={layer.width}
            height="34"
            rx="10"
            fill={palette.accent}
            fillOpacity={0.3 - index * 0.07}
            stroke={palette.accent}
            strokeOpacity="0.4"
            strokeWidth="2"
          />
        ))}
        <g stroke={palette.accent} strokeOpacity="0.45" strokeWidth="2" strokeDasharray="5 6">
          <line x1="200" y1="354" x2="200" y2="370" />
          <line x1="200" y1="404" x2="200" y2="420" />
        </g>
        {[354, 404].map((cy) => (
          <circle key={`link${cy}`} cx="200" cy={cy} r="4" fill={palette.accent} fillOpacity="0.8" />
        ))}
      </g>
    </g>
  );
}
