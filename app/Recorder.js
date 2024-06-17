"use client";

// components/Recorder.js
import React, { useState, useRef } from "react";
import axios from "axios";

export const Recorder = ({ sttJwt }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunks.current = [];
      };
      mediaRecorder.current.start();
      setIsRecording(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setErrorMessage("Error accessing media devices: " + error.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);

      axios("https://openapi.vito.ai/v1/transcribe", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sttJwt}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        data: {
          file: audioChunks.current,
        },
      }).then((res) => {
        console.log(res);
      });
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
        </div>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};
