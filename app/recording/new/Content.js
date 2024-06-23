"use client";

import { BottomFix } from "@/app/_components/BottomFix";
import { ClosePageNav } from "@/app/_components/ClosePageNav";
import { ScreenCenterLayout } from "@/app/_components/ScreenCenterLayout";
import Image from "next/image";
import styles from "./RecordingPage.module.scss";
import axios from "axios";
import { ProgressComp } from "./ProgressComp";

import { useState, useEffect, useRef } from "react";
import { useMicrophonePermission } from "@/app/_hooks/useMicrophoneAccess";
import { Loading } from "@/app/_components/Loading";
import { recommendSentences } from "@/app/constants";
import { RecordingComp } from "./RecordingComp";
import { formatTime } from "@/app/utils";

export const Content = () => {
  const audioRef = useRef(null);
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState("ready");
  const [recordingTime, setRecordingTime] = useState("00:00");
  const [audioUrl, setAudioUrl] = useState(null); // New state to store the recorded audio URL
  const [audioBlobState, setAudioBlobState] = useState(null);
  const [recommendText, setRecommendText] = useState("");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setRecommendText(
      recommendSentences[Math.floor(Math.random() * recommendSentences.length)],
    );
  }, []);

  const { permissionState, requestMicrophone } = useMicrophonePermission();

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const mediaStreamRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const startRecording = async () => {
    setProgress(0);
    setRecording("00:00");
    if (permissionState === "prompt") {
      requestMicrophone();
      return;
    }

    if (permissionState === "granted") {
      setRecording("recording");

      // Start audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream; // Save the media stream
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.start();
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const stopRecording = () => {
    setRecording("finished");

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlobState(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
        }
      };
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null; // Clear the media stream
    }
  };

  const [isReplay, setIsReplay] = useState(false);

  useEffect(() => {
    if (isReplay) {
      if (audioRef.current && audioUrl) {
        //reset
        setProgress(0);
        setRecordingTime("00:00");

        audioRef.current.currentTime = 0; // Reset playback to the start
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });

        audioRef.current?.addEventListener("timeupdate", () => {
          setProgress(
            (audioRef.current.currentTime / audioRef.current.duration) * 100,
          );

          setRecordingTime(formatTime(audioRef.current.currentTime));
        });

        audioRef.current.onended = () => {
          setIsReplay(false);
        };
      }
    }
  }, [isReplay]);

  //노종원의 원래 코드
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlobState, "recorded-audio.wav");
      await axios.post("/api/upload-to-s3", formData);
      setLoading(false);
      // window.location.href = "/new";
    } catch (error) {
      alert("오디오 업로드에 실패했습니다. 새로고침 후 다시 시도해주세요.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recording === "recording") {
      let time = 0;
      const interval = setInterval(() => {
        time += 1;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        setRecordingTime(
          `${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`,
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [recording]);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <ClosePageNav></ClosePageNav>

      <ScreenCenterLayout>
        <div className="flex flex-col items-center justify-center">
          <div
            className="font-[600] text-[30px] text-center"
            dangerouslySetInnerHTML={{
              __html: recommendText,
            }}
          ></div>

          {recording === "recording" ? (
            <RecordingComp />
          ) : (
            <div className="flex space-x-[3px] mt-[130px] items-center h-[132px]">
              <ProgressComp percent={progress} />
            </div>
          )}

          <div className="text-[#89898B] font-[500] font-[Kodchasan] mt-[30px]">
            {recordingTime}
          </div>
        </div>
      </ScreenCenterLayout>

      <BottomFix>
        {recording === "ready" && (
          <button
            type="button"
            className="circle-btn-shadow rounded-full"
            onClick={startRecording}
          >
            <Image src="/circle.svg" alt="준비" width={81} height={81} />
          </button>
        )}
        {recording === "recording" && (
          <button
            type="button"
            className="w-[81px] h-[81px] circle-btn-shadow rounded-full bg-white flex items-center justify-center"
            onClick={() => stopRecording()}
          >
            <Image src="/square.svg" alt="일시정지" width={25} height={25} />
          </button>
        )}
        {recording === "finished" && (
          <div className="flex gap-[28px]">
            <button
              type="button"
              className="w-[81px] h-[81px] circle-btn-shadow rounded-full bg-white flex items-center justify-center"
              onClick={startRecording}
            >
              <Image src="/refresh.svg" alt="다시녹음" width={23} height={23} />
            </button>
            <button
              type="button"
              className="w-[81px] h-[81px] circle-btn-shadow rounded-full bg-white flex items-center justify-center pl-2"
              onClick={() => setIsReplay(true)}
            >
              <Image src="/play.svg" alt="다시듣기" width={25} height={28} />
            </button>
            <button
              type="button"
              className="w-[81px] h-[81px] circle-btn-shadow rounded-full bg-white flex items-center justify-center"
              onClick={handleSubmit}
            >
              <Image src="/arrow_top.svg" alt="업로드" width={26} height={24} />
            </button>
          </div>
        )}
      </BottomFix>
      {audioUrl && <audio ref={audioRef} src={audioUrl} hidden />}
      {isLoading && <Loading isLoading={isLoading} />}
    </div>
  );
};
