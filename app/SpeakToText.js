"use client";
import React, { useState } from "react";

import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_API_KEY,
});

const audioUrl =
  "https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3";

const config = {
  audio_url: audioUrl,
  language_code: "es",
};

export const SpeakToText = () => {
  const [audioData, setAudioData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioData(file);
  };

  const handleSubmit = async (event) => {
    setAudioData(
      new Blob([audioData], {
        type: "audio/wav",
      }),
    );
    const transcript = await client.transcripts.transcribe(config);
    console.log(transcript);
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
