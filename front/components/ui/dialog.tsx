import React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-background border border-border text-foreground rounded-xl shadow-xl p-6 min-w-[320px] max-w-lg w-full relative">
        {children}
        <button
          className="absolute top-2 right-2 text-muted-foreground hover:text-primary"
          onClick={() => onOpenChange(false)}
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  );
}

Dialog.Content = function DialogContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
};

export { Dialog };
