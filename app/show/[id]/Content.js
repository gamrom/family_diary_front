"use client";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import { useState } from "react";

import "react-calendar/dist/Calendar.css";
import "./style.css";
import { Loading } from "../../_components/Loading";

import {
  MediaController,
  MediaPlayButton,
  MediaTimeRange,
  MediaTimeDisplay,
} from "media-chrome/react";

export const Content = () => {
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
        <audio slot="media" src="/sample_voice.wav"></audio>
        <div className="flex gap-4">
          <MediaTimeRange className="w-full bg-transparent"></MediaTimeRange>
          <MediaTimeDisplay className="bg-transparent"></MediaTimeDisplay>
        </div>
        <div className="flex gap-8 mt-[30px] items-center justify-center">
          <Image
            src="/arrow_down.svg"
            width={26}
            height={25}
            alt="재생"
          ></Image>
          <MediaPlayButton className="rounded-full flex items-center justify-center">
            <Image src="/play.svg" width={36} height={36} alt="재생"></Image>
          </MediaPlayButton>
          <Image src="/print.svg" width={32} height={28} alt="재생"></Image>
        </div>
      </MediaController>

      <div className="show-bg"></div>
      <Loading />
    </div>
  );
};
