"use client";
import React, { useState } from "react";

export const SpeakToText = () => {
  const [audioData, setAudioData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioData(file);
  };

  const handleSubmit = async (event) => {
    if (!audioData) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioData);
    formData.append("config", JSON.stringify({}));

    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      if (response) {
        const data = await response.json();
        console.log("Transcription result:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="audio">Audio File:</label>
        <input
          onChange={handleFileChange}
          type="file"
          id="audio"
          name="audio"
          accept="audio/*"
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {response && (
        <div>
          <h3>Transcription Result:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
