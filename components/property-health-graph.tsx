"use client";

import React, { useState } from "react";
import { TrendingUp, ShieldCheck } from "lucide-react";

interface DataPoint {
  month: string;
  count: number;
  label: string;
}

const HEALTH_DATA: DataPoint[] = [
  { month: "Apr", count: 2, label: "2 properties up to date" },
  { month: "May", count: 2, label: "2 properties up to date" },
  { month: "Jun", count: 3, label: "3 properties up to date" },
  { month: "Jul", count: 3, label: "3 properties up to date" },
  { month: "Aug", count: 3, label: "3 properties up to date" },
  { month: "Sep", count: 3, label: "3 properties up to date" },
];

export function PropertyHealthGraph() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 180;
  const paddingLeft = 35;
  const paddingRight = 25;
  const paddingTop = 20;
  const paddingBottom = 35;

  const width = svgWidth - paddingLeft - paddingRight;
  const height = svgHeight - paddingTop - paddingBottom;

  const maxVal = 4;
  const minVal = 0;

  // Calculate coordinates for points
  const points = HEALTH_DATA.map((d, i) => {
    const x = paddingLeft + (i / (HEALTH_DATA.length - 1)) * width;
    const y = paddingTop + height - ((d.count - minVal) / (maxVal - minVal)) * height;
    return { x, y, data: d, index: i };
  });

  // Build smooth cubic bezier SVG path string
  const pathD = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, "");

  // Area path for gradient fill underneath
  const firstPt = points[0];
  const lastPt = points[points.length - 1];
  const areaD = `${pathD} L ${lastPt.x} ${paddingTop + height} L ${firstPt.x} ${paddingTop + height} Z`;

  return (
    <section className="rounded-2xl bg-white border border-zinc-200 p-6 sm:p-7 space-y-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] font-sans">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h2 className="text-xl font-extrabold text-[#18181B] tracking-tight">
            Property health
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium pt-0.5">
            How your properties have looked across recent checks
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-bold text-zinc-800 self-start sm:self-auto shrink-0 shadow-2xs">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Currently: 3 up to date</span>
        </div>
      </div>

      {/* CHART CONTAINER */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="purpleAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#581C87" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#581C87" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines & Y Axis Labels */}
          {[0, 1, 2, 3, 4].map((gridVal) => {
            const y = paddingTop + height - ((gridVal - minVal) / (maxVal - minVal)) * height;
            return (
              <g key={gridVal}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke="#E4E4E7"
                  strokeDasharray={gridVal === 0 ? "none" : "3 3"}
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[11px] font-semibold fill-zinc-400"
                >
                  {gridVal}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#purpleAreaGradient)" />

          {/* Smooth Line Path */}
          <path
            d={pathD}
            fill="none"
            stroke="#581C87"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points & Interactivity */}
          {points.map((pt) => {
            const isHovered = hoveredIdx === pt.index;

            return (
              <g key={pt.index}>
                {/* X Axis Month Label */}
                <text
                  x={pt.x}
                  y={svgHeight - 8}
                  textAnchor="middle"
                  className={`text-[12px] font-bold ${
                    isHovered ? "fill-purple-950" : "fill-zinc-500"
                  }`}
                >
                  {pt.data.month}
                </text>

                {/* Outer halo on hover */}
                {isHovered && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="8"
                    className="fill-purple-200/80 stroke-purple-900"
                    strokeWidth="2"
                  />
                )}

                {/* Data point circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="4.5"
                  className="fill-white stroke-purple-900 cursor-pointer transition-transform"
                  strokeWidth="2.5"
                  onMouseEnter={() => setHoveredIdx(pt.index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && (
          <div
            className="absolute z-10 px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-xs font-bold shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all"
            style={{
              left: `${(points[hoveredIdx].x / svgWidth) * 100}%`,
              top: `${(points[hoveredIdx].y / svgHeight) * 100 - 8}%`,
            }}
          >
            {HEALTH_DATA[hoveredIdx].month}: {HEALTH_DATA[hoveredIdx].count} up to date
          </div>
        )}
      </div>

      {/* FOOTER REASSURANCE */}
      <div className="flex items-center justify-between text-xs text-zinc-500 pt-1 border-t border-zinc-100 font-medium">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-purple-900" />
          <span>Tracking continuous public record stability</span>
        </span>
        <span className="text-zinc-400">Apr 2026 – Sep 2026</span>
      </div>

    </section>
  );
}
