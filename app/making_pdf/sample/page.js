// app/page.js
"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/make-pdf?url=${encodeURIComponent(url)}`);

      if (response.ok) {
        const pdfBlob = await response.blob();
        setPdfUrl(URL.createObjectURL(pdfBlob));
      } else {
        const error = await response.json();
        console.error(error.error);
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  return (
    <div>
      <h1>PDF Generation</h1>
      <form onSubmit={handleSubmit}>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button type="submit">Generate PDF</button>
      </form>
      {pdfUrl && (
        <iframe src={pdfUrl} width="100%" height="600" title="PDF Preview" />
      )}
    </div>
  );
}
