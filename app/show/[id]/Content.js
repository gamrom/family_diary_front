"use client";
import Image from "next/image";
import { BottomFix } from "../../_components/BottomFix";
import { ClosePageNav } from "@/app/_components/ClosePageNav";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";

import {
  MediaController,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaMuteButton,
  MediaVolumeRange,
} from "media-chrome/react";

export const Content = () => {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex flex-col items-center">
      <div className="mt-[20px]">
        <Image
          src="/image_sample.png"
          width={354}
          height={354}
          className="object-fit w-full rounded-[30px]"
          alt="상세이미지"
        />
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

      <MediaController audio className="bg-transparent mt-[100px]">
        <audio slot="media" src="/sample_voice.wav"></audio>
        <MediaPlayButton className="play_btn"></MediaPlayButton>
      </MediaController>

      <div className="show-bg"></div>
    </div>
  );
};
