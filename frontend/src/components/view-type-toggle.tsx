import React from 'react';

interface ViewTypeToggleProps {
  activeView: "professores" | "turmas";
  onViewChange: (view: "professores" | "turmas") => void;
}

export const ViewTypeToggle: React.FC<ViewTypeToggleProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="flex rounded-md bg-muted p-1 gap-1">
      <button
        onClick={() => onViewChange("professores")}
        className={`
          px-4 py-2 rounded-md text-sm font-medium
          ${activeView === "professores"
            ? "bg-secondary text-secondary-foreground shadow-sm"
            : "hover:bg-secondary/50 text-muted-foreground"
          }
        `}
      >
        Professores
      </button>
      <button
        onClick={() => onViewChange("turmas")}
        className={`
          px-4 py-2 rounded-md text-sm font-medium
          ${activeView === "turmas"
            ? "bg-secondary text-secondary-foreground shadow-sm"
            : "hover:bg-secondary/50 text-muted-foreground"
          }
        `}
      >
        Turmas
      </button>
    </div>
  );
};