"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ResizedFile = {
  id: number;
  name: string;
  format: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  originalSize: number;
  fileSize: number;
  blob: Blob;
};

function FormatTypeIcon({ type }: { type: "jpg" | "png" | "webp" }) {
  return (
    <span className={`format-type-icon format-type-icon--${type}`} aria-hidden>
      <svg viewBox="0 0 24 24" focusable="false">
        <rect x="3.5" y="3.5" width="17" height="17" rx="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" />
        <path d="M6.5 17l4.2-4.2 2.5 2.5 2.8-3 1.9 1.8V17z" fill="currentColor" />
      </svg>
    </span>
  );
}

export function ImageResizer() {
  const CSS_PPI = 96;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [firstImageSize, setFirstImageSize] = useState<{ width: number; height: number } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [keepRatio, setKeepRatio] = useState(true);
  const [noEnlarge, setNoEnlarge] = useState(false);
  const [unit, setUnit] = useState<"px" | "in" | "cm">("px");
  const [mode, setMode] = useState<"pixels" | "percent">("pixels");
  const [scalePercent, setScalePercent] = useState(100);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [quality, setQuality] = useState(100);
  const [clarityMode, setClarityMode] = useState<"standard" | "hd" | "clear">("standard");
  const [stripMeta, setStripMeta] = useState(true);
  const [optimizeWeb, setOptimizeWeb] = useState(false);
  const [targetSizeEnabled, setTargetSizeEnabled] = useState(false);
  const [targetSizeKb, setTargetSizeKb] = useState(250);
  const [bg, setBg] = useState<"transparent" | "white" | "black">("transparent");
  const [baseName, setBaseName] = useState("");
  const [nameDims, setNameDims] = useState(false);
  const [nameOriginal, setNameOriginal] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResizedFile[]>([]);
  const [error, setError] = useState("");
  const [estimatedOutputBytes, setEstimatedOutputBytes] = useState<number | null>(null);
  const [isEstimatingSize, setIsEstimatingSize] = useState(false);

  const countLabel = useMemo(() => `${files.length} file${files.length === 1 ? "" : "s"}`, [files.length]);
  const filePreviews = useMemo(
    () => files.map((file, index) => ({ id: `${file.name}-${file.size}-${index}`, file, url: URL.createObjectURL(file) })),
    [files],
  );
  const outputFormatLabel = useMemo(() => {
    if (format === "image/png") return "PNG";
    if (format === "image/webp") return "WebP";
    return "JPEG";
  }, [format]);
  const isLossyFormat = format === "image/jpeg" || format === "image/webp";
  const qualityTone = useMemo(() => {
    if (quality <= 35) return "Low";
    if (quality <= 65) return "Balanced";
    if (quality <= 89) return "High";
    return "Maximum";
  }, [quality]);
  const clarityLabel = useMemo(() => {
    if (clarityMode === "hd") return "HD";
    if (clarityMode === "clear") return "Clear";
    return "Standard";
  }, [clarityMode]);
  const previewFileName = useMemo(() => {
    const extension = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const sourceName = files[0]?.name ?? "original-name.jpg";
    return buildName(sourceName, width, height, extension);
  }, [files, format, width, height, baseName, nameDims, nameOriginal]);

  useEffect(() => {
    return () => {
      filePreviews.forEach((entry) => URL.revokeObjectURL(entry.url));
    };
  }, [filePreviews]);

  useEffect(() => {
    async function loadFirstImageSize() {
      if (!files.length) {
        setFirstImageSize(null);
        return;
      }
      try {
        const image = await readImage(files[0]);
        setFirstImageSize({ width: image.naturalWidth, height: image.naturalHeight });
      } catch {
        setFirstImageSize(null);
      }
    }
    void loadFirstImageSize();
  }, [files]);

  useEffect(() => {
    if (!firstImageSize || !keepRatio || mode !== "pixels") return;
    setWidth(Number(fromPixels(firstImageSize.width, unit).toFixed(unit === "px" ? 0 : 2)));
    setHeight(Number(fromPixels(firstImageSize.height, unit).toFixed(unit === "px" ? 0 : 2)));
  }, [firstImageSize, keepRatio, mode, unit]);

  useEffect(() => {
    if (isLossyFormat) return;
    setTargetSizeEnabled(false);
  }, [isLossyFormat]);

  async function readImage(file: File) {
    const src = URL.createObjectURL(file);
    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Cannot read ${file.name}`));
        img.src = src;
      });
      return image;
    } finally {
      URL.revokeObjectURL(src);
    }
  }

  function computeTargetSize(inputWidth: number, inputHeight: number) {
    const toPixels = (value: number) => {
      if (unit === "in") return value * CSS_PPI;
      if (unit === "cm") return (value / 2.54) * CSS_PPI;
      return value;
    };

    if (mode === "percent") {
      const ratio = Math.max(1, Math.min(500, scalePercent)) / 100;
      let targetW = Math.max(1, Math.round(inputWidth * ratio));
      let targetH = Math.max(1, Math.round(inputHeight * ratio));
      if (noEnlarge) {
        targetW = Math.min(targetW, inputWidth);
        targetH = Math.min(targetH, inputHeight);
      }
      return { targetW, targetH };
    }

    const boxW = Math.max(1, Math.round(toPixels(width)));
    const boxH = Math.max(1, Math.round(toPixels(height)));
    if (!keepRatio) {
      let targetW = boxW;
      let targetH = boxH;
      if (noEnlarge) {
        targetW = Math.min(targetW, inputWidth);
        targetH = Math.min(targetH, inputHeight);
      }
      return { targetW, targetH };
    }

    const fit = Math.min(boxW / inputWidth, boxH / inputHeight);
    const ratio = noEnlarge ? Math.min(1, fit) : fit;
    return {
      targetW: Math.max(1, Math.round(inputWidth * ratio)),
      targetH: Math.max(1, Math.round(inputHeight * ratio)),
    };
  }

  function buildName(fileName: string, resizedW: number, resizedH: number, extension: string) {
    const cleanBase = baseName.trim().replace(/[/\\?%*:|"<>]/g, "-");
    const sourceStem = fileName.replace(/\.[^/.]+$/, "");
    const normalizedSource = sourceStem.replace(/\s+/g, "-");

    const parts: string[] = [];
    if (cleanBase) parts.push(cleanBase);
    if (nameOriginal) parts.push(normalizedSource);
    if (nameDims) parts.push(`${resizedW}x${resizedH}`);
    const stem = parts.length ? parts.join("-") : "image";
    return `${stem}.${extension}`;
  }

  function toPixels(value: number, sourceUnit: "px" | "in" | "cm") {
    if (sourceUnit === "in") return value * CSS_PPI;
    if (sourceUnit === "cm") return (value / 2.54) * CSS_PPI;
    return value;
  }

  function fromPixels(value: number, nextUnit: "px" | "in" | "cm") {
    if (nextUnit === "in") return value / CSS_PPI;
    if (nextUnit === "cm") return (value * 2.54) / CSS_PPI;
    return value;
  }

  function computeExportQuality() {
    const baseQuality = Math.max(0.1, Math.min(1, quality / 100));
    let exportQuality = baseQuality;

    if (isLossyFormat) {
      if (clarityMode === "hd") exportQuality = Math.max(exportQuality, 0.92);
      if (clarityMode === "clear") exportQuality = Math.max(exportQuality, 0.97);
    }

    if (optimizeWeb && format !== "image/png") {
      exportQuality = Math.min(exportQuality, 0.82);
    }

    return exportQuality;
  }

  function applyRenderStyle(ctx: CanvasRenderingContext2D) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = clarityMode === "standard" ? (optimizeWeb ? "high" : "medium") : "high";
    if (clarityMode === "clear") {
      ctx.filter = "contrast(1.05) saturate(1.03)";
      return;
    }
    ctx.filter = "none";
  }

  function formatBytes(bytes: number) {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${Math.round(bytes / 1024)} KB`;
  }

  useEffect(() => {
    let isActive = true;

    async function estimateOutputSize() {
      if (!files.length) {
        setEstimatedOutputBytes(null);
        setIsEstimatingSize(false);
        return;
      }

      setIsEstimatingSize(true);
      try {
        const sourceImage = await readImage(files[0]);
        if (!isActive) return;

        const { targetW, targetH } = computeTargetSize(sourceImage.naturalWidth, sourceImage.naturalHeight);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          if (isActive) setEstimatedOutputBytes(null);
          return;
        }

        canvas.width = targetW;
        canvas.height = targetH;
        if (bg === "transparent") {
          ctx.clearRect(0, 0, targetW, targetH);
        } else {
          ctx.fillStyle = bg === "black" ? "#000000" : "#ffffff";
          ctx.fillRect(0, 0, targetW, targetH);
        }

        applyRenderStyle(ctx);
        ctx.drawImage(sourceImage, 0, 0, targetW, targetH);
        ctx.filter = "none";

        const exportQuality = computeExportQuality();
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (value) => (value ? resolve(value) : reject(new Error("Estimate export failed"))),
            format,
            exportQuality,
          );
        });
        if (!isActive) return;
        setEstimatedOutputBytes(blob.size);
      } catch {
        if (isActive) setEstimatedOutputBytes(null);
      } finally {
        if (isActive) setIsEstimatingSize(false);
      }
    }

    void estimateOutputSize();
    return () => {
      isActive = false;
    };
  }, [files, width, height, keepRatio, noEnlarge, unit, mode, scalePercent, format, quality, clarityMode, optimizeWeb, bg]);

  async function resize() {
    if (!files.length) return;
    setLoading(true);
    setError("");

    const nextResults: ResizedFile[] = [];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Canvas is not supported in this browser.");
      setLoading(false);
      return;
    }

    const canvasToBlob = (mimeType: "image/jpeg" | "image/png" | "image/webp", encoderQuality: number) =>
      new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (value) => (value ? resolve(value) : reject(new Error("Export failed"))),
          mimeType,
          encoderQuality,
        );
      });

    try {
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const image = await readImage(file);
        const { targetW, targetH } = computeTargetSize(image.naturalWidth, image.naturalHeight);

        canvas.width = targetW;
        canvas.height = targetH;
        if (bg === "transparent") {
          ctx.clearRect(0, 0, targetW, targetH);
        } else {
          ctx.fillStyle = bg === "black" ? "#000000" : "#ffffff";
          ctx.fillRect(0, 0, targetW, targetH);
        }
        // HD/Clear profiles prioritize better resampling quality.
        applyRenderStyle(ctx);
        ctx.drawImage(image, 0, 0, targetW, targetH);
        ctx.filter = "none";

        let exportQuality = computeExportQuality();

        let blob = await canvasToBlob(format, exportQuality);
        if (targetSizeEnabled && targetSizeKb > 0 && isLossyFormat) {
          const targetBytes = targetSizeKb * 1024;
          let tunedQuality = exportQuality;

          while (blob.size > targetBytes && tunedQuality > 0.35) {
            tunedQuality = Math.max(0.35, tunedQuality - 0.07);
            blob = await canvasToBlob(format, tunedQuality);
          }
        }

        const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
        const filename = buildName(file.name, targetW, targetH, ext);
        nextResults.push({
          id: index + 1,
          name: filename,
          format: ext.toUpperCase(),
          width: targetW,
          height: targetH,
          originalWidth: image.naturalWidth,
          originalHeight: image.naturalHeight,
          originalSize: file.size,
          fileSize: blob.size,
          blob,
        });
      }
      setResults(nextResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Resize failed.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function download(file: ResizedFile) {
    const url = URL.createObjectURL(file.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function removeFile(targetId: string) {
    setFiles((prev) => {
      const next = prev.filter((file, index) => `${file.name}-${file.size}-${index}` !== targetId);
      return next;
    });
  }

  function syncHeightFromWidth(nextWidth: number) {
    if (!keepRatio || mode !== "pixels" || !firstImageSize || !Number.isFinite(nextWidth) || nextWidth <= 0) return;
    const widthInPx = Math.max(1, Math.round(toPixels(nextWidth, unit)));
    const ratioHeight = Math.max(1, Math.round((widthInPx * firstImageSize.height) / firstImageSize.width));
    setHeight(Number(fromPixels(ratioHeight, unit).toFixed(unit === "px" ? 0 : 2)));
  }

  function syncWidthFromHeight(nextHeight: number) {
    if (!keepRatio || mode !== "pixels" || !firstImageSize || !Number.isFinite(nextHeight) || nextHeight <= 0) return;
    const heightInPx = Math.max(1, Math.round(toPixels(nextHeight, unit)));
    const ratioWidth = Math.max(1, Math.round((heightInPx * firstImageSize.width) / firstImageSize.height));
    setWidth(Number(fromPixels(ratioWidth, unit).toFixed(unit === "px" ? 0 : 2)));
  }

  function handleFilesAdd(nextFiles: File[]) {
    const imageFiles = nextFiles.filter((file) => file.type.startsWith("image/"));
    if (!imageFiles.length) return;
    setFiles(imageFiles);
    setResults([]);
    setError("");
  }

  return (
    <section className="stack">
      <div className="upload-section" id="upload-section">
        <div
          className={`drop-zone ${isDragOver ? "dragover" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Upload images"
          onClick={openFilePicker}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragOver(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDragOver(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragOver(false);
            handleFilesAdd(Array.from(event.dataTransfer.files ?? []));
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openFilePicker();
            }
          }}
        >
          <span className="drop-zone-icon">↑</span>
          <p className="drop-zone-hint">
            Drag and drop your images here, or <span className="drop-zone-accent">click to select</span> files from your
            computer.
          </p>
          <input
            ref={fileInputRef}
            id="file-input"
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => handleFilesAdd(Array.from(event.target.files ?? []))}
          />
        </div>
        {files.length > 0 && (
          <div className="file-preview-grid">
            {filePreviews.map((entry) => (
              <div className="file-preview-card" key={entry.id}>
                <button type="button" className="file-preview-remove" onClick={() => removeFile(entry.id)} aria-label="Remove image">
                  ×
                </button>
                <div className="file-preview-thumb-wrap">
                  <img src={entry.url} alt={entry.file.name} className="file-preview-thumb" />
                </div>
                <div className="file-preview-meta">
                  <div className="file-preview-name">{entry.file.name}</div>
                  <div className="file-preview-size">
                    {entry.file.size >= 1024 * 1024
                      ? `${(entry.file.size / (1024 * 1024)).toFixed(2)} MB`
                      : `${(entry.file.size / 1024).toFixed(1)} KB`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="image-resizer-section-title">Workspace</p>

      <div className="resizer-card">
      <div className="resize-settings-top">
        <div className="resize-settings-title-wrap">
          <div className="resize-settings-icon">⤢</div>
          <div>
            <h2 className="resize-settings-heading">Resize settings</h2>
            <p className="resize-settings-sub">Set target size, configure export options, then process all files at once.</p>
          </div>
        </div>
        <div className="resize-tabs-wrap" role="tablist" aria-label="Resize mode">
          <button type="button" className={`tab-pill ${mode === "pixels" ? "active" : ""}`} onClick={() => setMode("pixels")}>
            By pixels
          </button>
          <button type="button" className={`tab-pill ${mode === "percent" ? "active" : ""}`} onClick={() => setMode("percent")}>
            By %
          </button>
        </div>
      </div>

      <div className="workspace-grid">
        <div className="resize-workspace-inner panel">
          <p className="resize-section-title">Target dimensions</p>
          {mode === "pixels" ? (
            <>
              <label className="stack">
                <span className="resize-field-label">Unit</span>
                <select
                  value={unit}
                  onChange={(event) => {
                    const nextUnit = event.target.value as "px" | "in" | "cm";
                    const widthPx = toPixels(width, unit);
                    const heightPx = toPixels(height, unit);
                    setUnit(nextUnit);
                    setWidth(Number(fromPixels(widthPx, nextUnit).toFixed(nextUnit === "px" ? 0 : 2)));
                    setHeight(Number(fromPixels(heightPx, nextUnit).toFixed(nextUnit === "px" ? 0 : 2)));
                  }}
                  className="unit-select"
                >
                  <option value="px">Pixels (px)</option>
                  <option value="in">Inches (in)</option>
                  <option value="cm">Centimeters (cm)</option>
                </select>
                <span className="field-hint">Inches and cm convert using 96 pixels per inch (CSS reference). Exported images use whole pixels.</span>
              </label>
              <div className="row dim-grid">
                <label className="stack grow">
                  <span className="resize-field-label">Width</span>
                  <div className="dim-input-wrap">
                    <input
                      type="number"
                      min={1}
                      value={width}
                      onChange={(event) => {
                        const nextWidth = Number(event.target.value);
                        setWidth(nextWidth);
                        syncHeightFromWidth(nextWidth);
                      }}
                    />
                    <span className="dim-unit">{unit}</span>
                  </div>
                </label>
                <label className="stack grow">
                  <span className="resize-field-label">Height</span>
                  <div className="dim-input-wrap">
                    <input
                      type="number"
                      min={1}
                      value={height}
                      onChange={(event) => {
                        const nextHeight = Number(event.target.value);
                        setHeight(nextHeight);
                        syncWidthFromHeight(nextHeight);
                      }}
                    />
                    <span className="dim-unit">{unit}</span>
                  </div>
                </label>
              </div>
            </>
          ) : (
            <label className="stack grow">
              <span className="resize-field-label">Uniform scale (%)</span>
              <input type="number" min={1} max={500} value={scalePercent} onChange={(event) => setScalePercent(Number(event.target.value))} />
            </label>
          )}

          <div className="resize-options-shell">
            <p className="resize-section-title">Output constraints</p>
            <label className="resize-option-card">
              <input
                type="checkbox"
                checked={keepRatio}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setKeepRatio(checked);
                  if (checked) syncHeightFromWidth(width);
                }}
              />
              <span className="resize-option-body">
                <span className="resize-option-title">Maintain aspect ratio</span>
                <span className="resize-option-desc">Keep the image proportion while resizing.</span>
              </span>
            </label>
            <label className="resize-option-card">
              <input type="checkbox" checked={noEnlarge} onChange={(event) => setNoEnlarge(event.target.checked)} />
              <span className="resize-option-body">
                <span className="resize-option-title">Do not enlarge if smaller</span>
                <span className="resize-option-desc">Only reduce big images.</span>
              </span>
            </label>
          </div>
        </div>

        <aside className="summary-panel panel">
          <div className="summary-panel-header">
            <span className="summary-panel-header-title">Live summary</span>
            <span className="summary-panel-badge">Live</span>
          </div>
          <div className="summary-rows">
            <div className="summary-row">
              <span className="summary-k">Method</span>
              <span className="summary-v" id="sum-method">{mode === "pixels" ? (unit === "px" ? "Pixels" : `Pixels (${unit})`) : "Percentage"}</span>
            </div>
            <div className="summary-row">
              <span className="summary-k">Dimensions</span>
              <span className="summary-v" id="sum-dims">{mode === "pixels" ? `${width} x ${height} ${unit}` : `${scalePercent}%`}</span>
            </div>
            <div className="summary-row">
              <span className="summary-k">Output format</span>
              <span className="summary-v" id="sum-format">{outputFormatLabel}</span>
            </div>
            <div className="summary-row">
              <span className="summary-k">Clarity mode</span>
              <span className="summary-v" id="sum-clarity">{clarityLabel}</span>
            </div>
            <div className="summary-row">
              <span className="summary-k">Background</span>
              <span className="summary-v" id="sum-bg">
                {bg === "transparent" ? (format === "image/jpeg" ? "Transparent -> white fill for JPEG" : "Transparent") : bg}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-k">Metadata</span>
              <span className="summary-v" id="sum-meta">{stripMeta ? "Stripped (recommended)" : "Keep"}</span>
            </div>
            <div className="summary-row">
              <span className="summary-k">Target file size</span>
              <span className="summary-v" id="sum-target-size">
                {targetSizeEnabled ? (isLossyFormat ? `<= ${targetSizeKb} KB` : "N/A for PNG") : "Off"}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-k">Estimated output size</span>
              <span className="summary-v" id="sum-estimated-size">
                {!files.length ? "Add an image" : isEstimatingSize ? "Estimating..." : estimatedOutputBytes === null ? "Unavailable" : `~ ${formatBytes(estimatedOutputBytes)}`}
              </span>
            </div>
          </div>
        </aside>
      </div>

      <hr className="divider" />
      <button type="button" className="advanced-toggle" aria-expanded={advancedOpen} onClick={() => setAdvancedOpen((v) => !v)}>
        <span>Advanced Options</span>
        <span aria-hidden>{advancedOpen ? "⌃" : "⌄"}</span>
      </button>

      <div className="advanced-panel-shell panel" hidden={!advancedOpen}>
        <div className="workspace-grid advanced-grid">
          <div className="stack advanced-col advanced-col-tight">
            <div className="advanced-block bg-color-block">
              <h3 className="advanced-title">Quality Settings</h3>
              <label className="stack">
                <span className="advanced-label">Image Clarity Profile</span>
                <select value={clarityMode} onChange={(event) => setClarityMode(event.target.value as "standard" | "hd" | "clear")} className="unit-select">
                  <option value="standard">Standard</option>
                  <option value="hd">HD</option>
                  <option value="clear">Clear</option>
                </select>
                <span className="field-hint">HD and Clear keep more detail by using stronger resampling and higher export quality.</span>
              </label>
              <label className="stack">
                <span className="advanced-label">Image Quality</span>
                <div className="quality-row">
                  <input
                    type="range"
                    className="advanced-range"
                    min={0}
                    max={100}
                    step={5}
                    value={quality}
                    disabled={!isLossyFormat}
                    onChange={(event) => setQuality(Number(event.target.value))}
                    style={{
                      background:
                        quality >= 100
                          ? "linear-gradient(90deg, #7c3aed 0%, #c026d3 100%)"
                          : `linear-gradient(90deg, #7c3aed 0%, #c026d3 ${quality}%, rgba(71, 85, 105, 0.55) ${quality}%, rgba(71, 85, 105, 0.55) 100%)`,
                    }}
                  />
                  <span className="quality-badge">{isLossyFormat ? `${quality}%` : "N/A"}</span>
                </div>
                <div className="quality-meta">
                  <span className="quality-chip">{isLossyFormat ? qualityTone : "Lossless"}</span>
                  <span className="quality-note">
                    {isLossyFormat ? (optimizeWeb ? "Web optimized cap active" : "Manual quality control") : "PNG uses lossless export"}
                  </span>
                </div>
                <div className="quality-scale">
                  <span>Low</span>
                  <span>Balanced</span>
                  <span>High</span>
                  <span>Max</span>
                </div>
              </label>
            </div>

            <div className="advanced-block">
              <h3 className="advanced-title">Metadata Options</h3>
              <p className="advanced-help">
                Resized output is drawn on canvas so EXIF/GPS data is not copied. Keep this on for privacy-first exports.
              </p>
              <label className="advanced-check-row">
                <input type="checkbox" checked={stripMeta} onChange={(event) => setStripMeta(event.target.checked)} />
                Strip metadata from export (recommended)
              </label>
              <label className="advanced-check-row">
                <input
                  type="checkbox"
                  checked={optimizeWeb}
                  onChange={(event) => {
                    const checked = event.target.checked;
                    setOptimizeWeb(checked);
                    if (checked && isLossyFormat) {
                      setQuality((prev) => Math.min(prev, 82));
                    }
                  }}
                />
                Optimize images for web (JPEG/WebP)
              </label>
            </div>

            <div className="advanced-block">
              <h3 className="advanced-title">Target File Size</h3>
              <p className="advanced-help">For JPEG/WebP only. PNG output stays lossless.</p>
              <label className="advanced-check-row">
                <input
                  type="checkbox"
                  checked={targetSizeEnabled}
                  disabled={!isLossyFormat}
                  onChange={(event) => setTargetSizeEnabled(event.target.checked)}
                />
                Limit file size
              </label>
              <label className="stack">
                <span className="advanced-label">Max size (KB)</span>
                <div className="target-size-row">
                  <input
                    type="number"
                    min={5}
                    max={51200}
                    value={targetSizeKb}
                    onChange={(event) => setTargetSizeKb(Number(event.target.value))}
                    disabled={!targetSizeEnabled || !isLossyFormat}
                  />
                  <span className="unit-badge">KB</span>
                </div>
              </label>
            </div>

            <div className="advanced-block">
              <h3 className="advanced-title">Output Format</h3>
              <div className="advanced-format-grid">
                <button type="button" className={`advanced-format-card ${format === "image/jpeg" ? "selected" : ""}`} onClick={() => setFormat("image/jpeg")}>
                  <span className="advanced-format-icon">
                    <FormatTypeIcon type="jpg" />
                  </span>
                  <span className="advanced-format-name">JPG</span>
                  <span className="advanced-format-note">Best for Photos</span>
                </button>
                <button type="button" className={`advanced-format-card ${format === "image/png" ? "selected" : ""}`} onClick={() => setFormat("image/png")}>
                  <span className="advanced-format-icon">
                    <FormatTypeIcon type="png" />
                  </span>
                  <span className="advanced-format-name">PNG</span>
                  <span className="advanced-format-note">Supports Transparency</span>
                </button>
                <button type="button" className={`advanced-format-card ${format === "image/webp" ? "selected" : ""}`} onClick={() => setFormat("image/webp")}>
                  <span className="advanced-format-icon">
                    <FormatTypeIcon type="webp" />
                  </span>
                  <span className="advanced-format-name">WebP</span>
                  <span className="advanced-format-note">Modern Format</span>
                </button>
              </div>
            </div>
          </div>

          <div className="stack advanced-col">
            <div className="advanced-block">
              <h3 className="advanced-title">Background Color</h3>
              <p className="advanced-help">Used when flattening transparency (for JPG).</p>
              <div className="bg-palette">
                <button type="button" className={`bg-circle ${bg === "transparent" ? "active" : ""}`} onClick={() => setBg("transparent")}>
                  <span className="bg-circle-inner bg-transparent">NONE</span>
                </button>
                <button type="button" className={`bg-circle ${bg === "white" ? "active" : ""}`} onClick={() => setBg("white")}>
                  <span className="bg-circle-inner bg-white" />
                </button>
                <button type="button" className={`bg-circle ${bg === "black" ? "active" : ""}`} onClick={() => setBg("black")}>
                  <span className="bg-circle-inner bg-black" />
                </button>
              </div>
              <div className="bg-labels">
                <span>None</span>
                <span>White</span>
                <span>Black</span>
              </div>
            </div>

            <div className="advanced-block">
              <h3 className="advanced-title">Bulk Rename Options</h3>
              <label className="stack">
                <span className="advanced-label">Base Name (optional)</span>
                <input
                  type="text"
                  className="base-name-input"
                  value={baseName}
                  onChange={(event) => setBaseName(event.target.value)}
                  placeholder="e.g., vacation-"
                />
              </label>
              <label className="advanced-check-row">
                <input type="checkbox" checked={nameDims} onChange={(event) => setNameDims(event.target.checked)} />
                Include dimensions in filename
              </label>
              <label className="advanced-check-row">
                <input type="checkbox" checked={nameOriginal} onChange={(event) => setNameOriginal(event.target.checked)} />
                Include original filename
              </label>
              <div className="name-preview">
                <span className="advanced-label">Output filename preview:</span>
                <div className="name-preview-value">{previewFileName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row center">
        <button className="btn-resize" type="button" onClick={() => void resize()} disabled={!files.length || loading}>
          {loading ? "Resizing..." : `Resize ${files.length} Images`}
        </button>
      </div>
      </div>

      {error && <p className="error">{error}</p>}

      {results.length > 0 && (
        <div className="results-section">
          <p className="image-resizer-section-title">Export queue</p>
          <div className="results-table-card">
            <table className="results-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Original</th>
                  <th>New Size</th>
                  <th>Format</th>
                  <th>File Size</th>
                  <th>Status</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.name}>
                    <td>{result.id}</td>
                    <td>{result.name}</td>
                    <td>
                      {result.originalWidth}x{result.originalHeight}
                    </td>
                    <td>
                      <span className="result-new-size">
                        {result.width}x{result.height}
                      </span>
                    </td>
                    <td>{result.format}</td>
                    <td>
                      {Math.round(result.originalSize / 1024)} KB - {Math.round(result.fileSize / 1024)} KB
                    </td>
                    <td>
                      <span className="result-status-ready">Ready</span>
                    </td>
                    <td>
                      <button className="btn-row-download" type="button" onClick={() => download(result)}>
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="results-actions">
            <button type="button" className="btn-download-all" disabled>
              ZIP Download
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
