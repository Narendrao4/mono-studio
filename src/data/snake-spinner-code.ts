import source from "@/data/component-sources.json";

export const SNAKE_SPINNER_SOURCE = source["snake-spinner.tsx"];

export const SNAKE_SPINNER_USAGE = `"use client";

import { useState, type ChangeEvent } from "react";
import { SnakeSpinner } from "@/components/ui/snake-spinner";

// Connect uploadDocument to your application's real upload request.
export function DocumentUploader({
  uploadDocument,
}: {
  uploadDocument: (file: File) => Promise<void>;
}) {
  const [uploading, setUploading] = useState(false);
  const [filename, setFilename] = useState("");
  const [result, setResult] = useState("");

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file || uploading) return;

    setUploading(true);
    setFilename(file.name);
    setResult("");
    try {
      await uploadDocument(file);
      setResult("Document uploaded.");
    } catch {
      setResult("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      input.value = "";
    }
  }

  return (
    <>
      <input type="file" aria-label="Upload document" disabled={uploading} onChange={handleFile} />
      <SnakeSpinner
        mode="overlay"
        loading={uploading}
        variant="coil"
        color="green"
        label="Uploading document"
        description={filename}
      />
      <p role="status">{result}</p>
    </>
  );
}

export function SaveButton({ onSave }: { onSave: () => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState("");

  return (
    <>
      <SnakeSpinner
        mode="button"
        variant="chase"
        loading={saving}
        label="Saving..."
        onClick={async () => {
          setSaving(true);
          try {
            await onSave();
            setResult("Saved.");
          } catch {
            setResult("Save failed. Please try again.");
          } finally {
            setSaving(false);
          }
        }}
      >
        Save changes
      </SnakeSpinner>
      <p role="status">{result}</p>
    </>
  );
}

export function InlineLoading() {
  return <SnakeSpinner variant="orbit" color="blue" label="Loading results" showLabel />;
}
`;
