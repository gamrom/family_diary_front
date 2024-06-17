"use client";
import React, { useState } from "react";
import axios from "axios";

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
      const res = await axios.post(
        "https://openapi.vito.ai/v1/transcribe",
        formData,
        {
          headers: {
            Authorization: `bearer ${sttJwt}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setResponse(res.data);
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
