import React from 'react';

interface ViewModeToggleProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export function ViewModeToggle({ viewMode, setViewMode }: ViewModeToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        className={`text-[#003366] p-2 ${viewMode === "list" ? "opacity-100" : "opacity-50"}`}
        onClick={() => setViewMode("list")}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M3 5H21M3 12H21M3 19H21" stroke="#003366" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </button>

      <button
        className={`text-[#003366] p-2 ${viewMode === "grid" ? "opacity-100" : "opacity-50"}`}
        onClick={() => setViewMode("grid")}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" stroke="#003366" strokeWidth={2} />
          <rect x="14" y="3" width="7" height="7" stroke="#003366" strokeWidth={2} />
          <rect x="3" y="14" width="7" height="7" stroke="#003366" strokeWidth={2} />
          <rect x="14" y="14" width="7" height="7" stroke="#003366" strokeWidth={2} />
        </svg>
      </button>
    </div>
  );
}