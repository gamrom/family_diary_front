"use client";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import { useState, useRef } from "react";

import "react-calendar/dist/Calendar.css";
import "./style.css";
import { Loading } from "../../_components/Loading";
import { ProgressComp } from "./ProgressComp";

import {
  MediaController,
  MediaPlayButton,
  MediaTimeRange,
  MediaTimeDisplay,
} from "media-chrome/react";

export const Content = () => {
  const [progress, setProgress] = useState(0);
  console.log(progress);
  // when play, calculate progress -> current time / total duration * 100
  const audioRef = useRef();
  audioRef.current?.addEventListener("timeupdate", () => {
    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100,
    );
  });

  //audio play, progress set 0
  audioRef.current?.addEventListener("play", () => {
    setProgress(0);
  });

  return (
    <div className="flex flex-col items-center">
      <div className="mt-[20px] relative">
        <Image
          src="/image_sample.png"
          width={354}
          height={354}
          className="object-fit w-full rounded-[30px]"
          alt="상세이미지"
        />

        <div className="absolute flex flex-col text-white top-[15px] left-[20px] font-[600]">
          <div className="text-[11px]">{dayjs().format("YYYY년")}</div>
          <div className="text-[25px]">{dayjs().format("M월")}</div>
          <div className="text-[25px]">{dayjs().format("DD일")}</div>
        </div>
      </div>

      <div className="text-white px-4 text-center h-[140px] overflow-auto show-text mt-[44px] relative">
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem ut
          illo corporis. Quam iusto sint ipsa a consequatur minima nulla officia
          adipisci! Quidem, cumque? Iste in placeat libero blanditiis obcaecati!
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem ut
          illo
        </div>
      </div>

      <MediaController
        audio
        className="bg-transparent mt-[31px] w-full flex-col items-center justify-center"
      >
        <audio ref={audioRef} slot="media" src="/sample_voice.wav"></audio>
        <div className="flex items-center justify-center gap-4">
          <ProgressComp percent={progress} />
          <MediaTimeDisplay className="bg-transparent"></MediaTimeDisplay>
        </div>
        <div className="flex gap-8 mt-[30px] items-center justify-center">
          <button
            type="button"
            className="!bg-transparent  w-[81px] h-[81px] circle-btn-shadow-show rounded-full bg-white flex items-center justify-center"
          >
            <Image
              src="/arrow_down.svg"
              width={26}
              height={25}
              alt="재생"
            ></Image>
          </button>
          <MediaPlayButton className="!bg-transparent  w-[81px] h-[81px] circle-btn-shadow-show rounded-full bg-white flex items-center justify-center">
            <Image src="/play.svg" width={36} height={36} alt="재생"></Image>
          </MediaPlayButton>
          <button
            type="button"
            className="!bg-transparent  w-[81px] h-[81px] circle-btn-shadow-show rounded-full bg-white flex items-center justify-center"
          >
            <Image src="/print.svg" width={32} height={28} alt="재생"></Image>
          </button>
        </div>
      </MediaController>

      <div className="show-bg"></div>
    </div>
  );
};
