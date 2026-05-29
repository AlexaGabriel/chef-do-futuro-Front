import { useState } from "react";

/**
 * FileUpload
 * Área de upload com drag-and-drop visual.
 */
export default function FileUpload({ label, accept = "*", onChange }) {
  const [fileName, setFileName] = useState("");

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange?.(file);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-xs font-bold text-ink uppercase tracking-wide">{label}</span>
      )}
      <label
        htmlFor="file-upload"
        className="
          flex flex-col items-center justify-center gap-2
          border-2 border-dashed border-border rounded-card
          bg-surface-input cursor-pointer
          px-4 py-6 text-center
          hover:border-brand hover:bg-brand-pale
          transition-colors duration-200
        "
      >
        <span className="text-2xl">📎 ☁️</span>
        <span className="text-xs text-ink-faint">
          {fileName || "Anexe seu currículo ou certificados"}
        </span>
        <input
          id="file-upload"
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
