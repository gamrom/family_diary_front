"use client";

// components/Recorder.js
import React, { useState, useRef } from "react";

import axios from "axios";

export const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioBlob = useRef(null); // Add a ref to store the audio blob

  const [transcript, setTranscript] = useState("");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.onstop = () => {
        audioBlob.current = new Blob(audioChunks.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob.current);
        setAudioURL(audioUrl);
        audioChunks.current = [];
      };
      mediaRecorder.current.start();
      setIsRecording(true);
      setErrorMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/transcripts", {
        audio_url: audioURL,
      });
      setTranscript(response.data.text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioURL && (
        <div>
          <audio controls src={audioURL}></audio>
          <a href={audioURL} download="recording.wav">
            Download Recording
          </a>

          <form onSubmit={handleSubmit}>
            <button type="submit">Transcribe</button>

            {transcript && <div>{JSON.stringify(transcript)}</div>}
          </form>
          {JSON.stringify(audioURL)}
        </div>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};
