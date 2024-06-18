"use client";

import { BottomFix } from "@/app/_components/BottomFix";
import { ClosePageNav } from "@/app/_components/ClosePageNav";
import { ScreenCenterLayout } from "@/app/_components/ScreenCenterLayout";
import Image from "next/image";
import styles from "./RecordingPage.module.scss";

import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export const Content = () => {
  const [recording, setRecording] = useState("ready"); // ready, recording, finished

  // State variables to manage recording status, completion, and transcript
  const [transcript, setTranscript] = useState("");

  // Reference to store the SpeechRecognition instance
  const recognitionRef = useRef<any>(null);

  // Function to start recording
  const startRecording = () => {
    setRecording("recording");
    // Create a new SpeechRecognition instance and configure it
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];

      // Log the recognition results and update the transcript state
      console.log(event.results);
      setTranscript(transcript);
    };

    // Start the speech recognition
    recognitionRef.current.start();
  };

  // Cleanup effect when the component unmounts
  useEffect(() => {
    return () => {
      // Stop the speech recognition if it's active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Function to stop recording
  const stopRecording = () => {
    setRecording("finished");
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
    }
  };

  const [audio, setAudio] = useState<any>(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("audio", audio);

    console.log(formData);
    console.log(transcript);
  };

  return (
    <div className="h-screen">
      <input
        className="hidden"
        type="file"
        accept="audio/*"
        id="audio"
        onChange={(e: any) => {
          const file = e.target.files[0];
          setAudio(file);
        }}
      />
      <ClosePageNav></ClosePageNav>

      <ScreenCenterLayout>
        <div className="flex flex-col items-center justify-center">
          <div className="font-[600] text-[30px] text-center">
            수지가 오늘 가장 좋아한 <br /> 음식은 무엇인가요?
          </div>
          <div className="flex space-x-[3px] mt-[130px] items-center h-[132px]">
            <div
              className={`${styles.circle_default} ${recording === "recording" || recording === "finished" ? styles.circle_recording : "bg-[#D4D4D4]"} ${recording === "recording" ? styles.circle_animation1 : "h-[90px]"}`}
            ></div>
            <div
              className={`${styles.circle_default} ${recording === "recording" || recording === "finished" ? styles.circle_recording : "bg-[#D4D4D4]"} ${recording === "recording" ? styles.circle_animation2 : "h-[100px]"}`}
            ></div>
            <div
              className={`${styles.circle_default} ${recording === "recording" || recording === "finished" ? styles.circle_recording : "bg-[#D4D4D4]"} ${recording === "recording" ? styles.circle_animation3 : "h-[132px]"}`}
            ></div>
            <div
              className={`${styles.circle_default} ${recording === "recording" ? styles.circle_recording : "bg-[#D4D4D4]"} ${recording === "recording" ? styles.circle_animation4 : "h-[92px]"}`}
            ></div>
          </div>

          <div className="text-[#89898B] font-[500] font-[Kodchasan] mt-[30px]">
            {}
          </div>
        </div>
      </ScreenCenterLayout>

      <BottomFix>
        {recording === "ready" && (
          <button type="button" onClick={startRecording}>
            <Image src="/circle.svg" alt="준비" width={81} height={81} />
          </button>
        )}
        {recording === "recording" && (
          <button type="button" onClick={stopRecording}>
            <Image src="/stop.svg" alt="일시정지" width={81} height={81} />
          </button>
        )}
        {recording === "finished" && (
          <>
            <button type="button">
              <Image src="/repeat.svg" alt="다시녹음" width={81} height={81} />
            </button>
            <button type="button" onClick={() => {}}>
              <Image
                src="/reRecord.svg"
                alt="다시듣기"
                width={81}
                height={81}
              />
            </button>
            <button type="button" onClick={handleSubmit}>
              <Image src="/upload.svg" alt="업로드" width={81} height={81} />
            </button>
          </>
        )}
      </BottomFix>
    </div>
  );
};
