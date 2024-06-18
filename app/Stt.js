"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export const Stt = () => {
  const [audioUrl, setAudioUrl] = useState(
    "https://podcast.44bits.net/142.mp3"
  );
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    console.log("Transcript:", transcript)
  }, [transcript]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/transcripts", { audioUrl });
      setTranscript(response.data.text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>AssemblyAI Transcript</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Audio URL:
          <input
            type="text"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
          />
        </label>
        <button type="submit">Get Transcript</button>
      </form>
      {transcript && <div>{JSON.stringify(transcript)}</div>}
    </div>
  );
}
