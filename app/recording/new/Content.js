"use client";

import { BottomFix } from "@/app/_components/BottomFix";
import { ClosePageNav } from "@/app/_components/ClosePageNav";
import { ScreenCenterLayout } from "@/app/_components/ScreenCenterLayout";
import Image from "next/image";
import styles from "./RecordingPage.module.scss";
import axios from "axios";

import { useState, useEffect, useRef } from "react";

export const Content = () => {
  const [recording, setRecording] = useState("ready"); // ready, recording, finished
  const [audio, setAudio] = useState(null);
  const audioRef = useRef(null);
  const [recordingTime, setRecordingTime] = useState("00:00");
  const intervalRef = useRef(null);
  const audioChunks = useRef([]);
  const mediaRecorder = useRef(null);
  const streamRef = useRef(null);
  const [transcript, setTranscript] = useState("");
  const [audioUrl, setAudioUrl] = useState(
    "https://podcast.44bits.net/142.mp3",
  );

  const handleSubmit = async () => {
    const formData = new FormData();
    if (audio) {
      formData.append("audio", audio);
    }

    // console.log(formData);
    // console.log(transcript);

    try {
      const response = await axios.post("/api/transcripts", { audioUrl });
      setTranscript(response.data.text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const stopRecording = () => {
    setRecording("finished");
  };

  const reRecording = () => {
    setRecording("ready");
    setRecordingTime("00:00");
    setAudio(null);
  };

  const startRecording = () => {
    setRecording("recording");
  };

  const replayRecording = () => {
    const audioElement = new Audio(URL.createObjectURL(audio));
    audioElement.play();
  };

  useEffect(() => {
    const handleRecording = async () => {
      if (recording === "recording") {
        let seconds = 0;
        intervalRef.current = setInterval(() => {
          seconds += 1;
          setRecordingTime(
            new Date(seconds * 1000).toISOString().substr(14, 5),
          );
        }, 1000);

        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          streamRef.current = stream;
          mediaRecorder.current = new MediaRecorder(stream);
          audioChunks.current = [];

          mediaRecorder.current.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
          };

          mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, {
              type: "audio/*",
            });

            setAudioUrl(URL.createObjectURL(audioBlob));
          };

          mediaRecorder.current.start();
        } catch (error) {
          console.error("Error accessing media devices:", error);
        }
      } else if (recording === "finished" || recording === "ready") {
        if (
          mediaRecorder.current &&
          mediaRecorder.current.state !== "inactive"
        ) {
          mediaRecorder.current.stop();
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        clearInterval(intervalRef.current);
      }
    };

    handleRecording();

    return () => {
      if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
        mediaRecorder.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      clearInterval(intervalRef.current);
    };
  }, [recording]);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <ClosePageNav></ClosePageNav>
      <input
        ref={audioRef}
        className="hidden"
        type="file"
        accept="audio/*"
        id="audio"
      />

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
            {recordingTime}
          </div>
        </div>
      </ScreenCenterLayout>

      <BottomFix>
        {recording === "ready" && (
          <button type="button" onClick={() => startRecording()}>
            <Image src="/circle.svg" alt="준비" width={81} height={81} />
          </button>
        )}
        {recording === "recording" && (
          <button type="button" onClick={() => stopRecording()}>
            <Image src="/stop.svg" alt="일시정지" width={81} height={81} />
          </button>
        )}
        {recording === "finished" && (
          <>
            <button type="button" onClick={() => reRecording()}>
              <Image src="/repeat.svg" alt="다시녹음" width={81} height={81} />
            </button>
            <button type="button" onClick={() => replayRecording()}>
              <Image
                src="/reRecord.svg"
                alt="다시듣기"
                width={81}
                height={81}
              />
            </button>
            <button type="button" onClick={() => handleSubmit()}>
              <Image src="/upload.svg" alt="업로드" width={81} height={81} />
            </button>
          </>
        )}
      </BottomFix>

      {/* {transcript && <div>{JSON.stringify(transcript)}</div>} */}
    </div>
  );
};
