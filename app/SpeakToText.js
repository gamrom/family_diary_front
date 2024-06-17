"use client";
import React, { useState } from "react";

export const SpeakToText = ({ sttJwt }) => {
  const [audioData, setAudioData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audioData) {
      setError("Please select an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioData);
    formData.append("config", JSON.stringify({}));

    try {
      const res = await fetch("https://openapi.vito.ai/v1/transcribe", {
        method: "POST",
        headers: {
          Authorization: `bearer ${sttJwt}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setResponse(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(error);
      setError("An error occurred while uploading the file.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="audio">Audio File:</label>
        <input
          onChange={(e) => {
            setAudioData(e.target.files[0]);
          }}
          type="file"
          id="audio"
          name="audio"
          accept="audio/*"
        />
        <button type="submit">Submit</button>
      </form>
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

export default SpeakToText;
