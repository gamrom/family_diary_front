import "use client";
import React, { useState, useRef } from "react";

export const Content = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [recordingTime, setRecordingTime] = useState("00:00");
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const intervalRef = useRef(null);

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
      startTimer();
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      stopTimer();
    }
  };

  const startTimer = () => {
    let seconds = 0;
    intervalRef.current = setInterval(() => {
      seconds += 1;
      setRecordingTime(new Date(seconds * 1000).toISOString().substr(14, 5));
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setRecordingTime("00:00");
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-64 relative">
      <div className="bg-gray-300 rounded-md p-2 mb-2">
        <span className="text-gray-700">{recordingTime}</span>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-12 h-12 rounded-full ${isRecording ? "bg-red-600" : "bg-gray-400"}`}
        ></button>
      </div>
      <div className="flex justify-between items-center mt-2">
        <button onClick={stopRecording} className="text-gray-700">
          취소
        </button>
        {audioURL && (
          <a href={audioURL} download="recording.wav" className="text-gray-700">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 20h14v-2H5v2zm7-18L5.33 10h3.34v4h4v-4h3.34L12 2z" />
            </svg>
          </a>
        )}
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
    </div>
  );
};
