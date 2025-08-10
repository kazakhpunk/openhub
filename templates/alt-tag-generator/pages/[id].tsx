import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState, useCallback, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { decodeData } from "../utils/encoding";
import { useRouter } from "next/router";

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const modelId = decodeData(router.query.id as string)?.modelName || "openai/gpt-4o-mini";
  const heading = decodeData(router.query.id as string)?.headingText || "";
  const description = decodeData(router.query.id as string)?.descriptionText || "";

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => setIsDark(Boolean(mq && mq.matches));
    apply();
    mq && mq.addEventListener ? mq.addEventListener('change', apply) : mq && mq.addListener && mq.addListener(apply);
    return () => {
      mq && (mq.removeEventListener ? mq.removeEventListener('change', apply) : mq.removeListener && mq.removeListener(apply));
    };
  }, []);


  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFiles = useCallback(async (files?: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const base64 = await readFileAsDataUrl(file);
    setPreviewSrc(base64);
    setImageBase64(base64);
    await generateAlt({ imageBase64: base64 });
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFiles(e.target.files);
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const generateAlt = async (body: { imageBase64: string }) => {
    try {
      setLoading(true);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, modelId }),
      });
      const json = await res.json();
      setAltText(json.alt || "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{heading}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.h1}>{heading}</h1>
      <p className={styles.description}>{description}</p>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        style={{
          marginTop: 24,
          width: "100%",
          maxWidth: 720,
          height: 300,
          border: `2px dashed ${isDark ? '#475569' : '#cbd5e1'}`,
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 16,
          cursor: 'pointer',
          background: isDark ? '#0f172a' : '#f8fafc',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {previewSrc ? (
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <img
              src={previewSrc}
              alt="Preview"
              style={{
                width: '100%',
                maxWidth: 420,
                maxHeight: 260,
                objectFit: 'contain',
                borderRadius: 12,
                border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                background: isDark ? '#0b1220' : '#ffffff',
              }}
            />
            <button
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                padding: '6px 10px',
                borderRadius: 8,
                border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                background: isDark ? '#111827cc' : '#ffffffcc',
                color: isDark ? '#e5e7eb' : '#111827',
                backdropFilter: 'blur(6px)'
              }}
            >
              Replace
            </button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: isDark ? '#e2e8f0' : '#0f172a' }}>
              Drag & drop an image here
            </div>
            <div style={{ marginTop: 6, color: isDark ? '#94a3b8' : '#64748b' }}>
              or click to select a file
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: isDark ? '#94a3b8' : '#64748b' }}>
              Using model: <span style={{ fontWeight: 600 }}>{modelId}</span>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
            {loading ? (
              <div style={{ fontSize: 14, color: isDark ? '#94a3b8' : '#64748b' }}>
                Generating…
              </div>
            ) : (
              <>
                <button
                  onClick={() => imageBase64 && generateAlt({ imageBase64 })}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                    background: isDark ? '#111827' : '#f8fafc',
                    color: isDark ? '#e5e7eb' : '#111827',
                  }}
                  disabled={!previewSrc}
                >
                  Generate again
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                    background: isDark ? '#111827' : '#f8fafc',
                    color: isDark ? '#e5e7eb' : '#111827',
                  }}
                >
                  Choose another image
                </button>
              </>
            )}
      </div>

      {altText && (
        <div
          style={{
            marginTop: 16,
            padding: 16,
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            borderRadius: 12,
            maxWidth: 720,
            width: "100%",
            background: isDark ? '#0b1220' : '#ffffff',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 6, color: isDark ? '#e2e8f0' : '#0f172a' }}>Generated Alt Text</div>
          <div style={{ color: isDark ? '#cbd5e1' : "#0f172a" }}>{altText}</div>
          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <button
              onClick={() => navigator.clipboard.writeText(altText)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                background: isDark ? '#111827' : '#f8fafc',
                color: isDark ? '#e5e7eb' : '#111827',
              }}
            >
              Copy
            </button>
            <button
              onClick={() => setAltText("")}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                background: isDark ? '#111827' : '#f8fafc',
                color: isDark ? '#e5e7eb' : '#111827',
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};