"use client";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import { useState, useRef, useEffect } from "react";

import "react-calendar/dist/Calendar.css";
import "./style.css";
import { Loading } from "../../_components/Loading";
import { ProgressComp } from "./ProgressComp";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import {
  MediaController,
  MediaPlayButton,
  MediaTimeRange,
  MediaTimeDisplay,
} from "media-chrome/react";
import { LoadingTransform } from "./LoadingTransform";
import { BackBtn } from "@/app/_components/BackBtn";

export const Content = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [progress, setProgress] = useState(0);

  // when play, calculate progress -> current time / total duration * 100
  const audioRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    setIsLoading(true);
  };

  //calculate progress when audio is playing after click MediaPlayButton
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const onTimeUpdate = () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        setProgress(progress);
      };
      audio.addEventListener("timeupdate", onTimeUpdate);
      return () => {
        audio.removeEventListener("timeupdate", onTimeUpdate);
      };
    }
  }, [audioRef.current]);

  console.log(progress);

  const [audioLoading, setAudioLoading] = useState(true);
  useEffect(() => {
    setAudioLoading(false);
  }, []);

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

        <BackBtn style="absolute flex flex-col text-white top-[15px] right-[20px] font-[600]">
          <Image src="/x_white.svg" width={13} height={13} alt="닫기" />
        </BackBtn>
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

      {!audioLoading && (
        <MediaController
          audio
          className="bg-transparent mt-[31px] w-full flex-col items-center justify-center"
        >
          <audio ref={audioRef} slot="media" src="/sample_voice.wav"></audio>
          <div className="flex items-center justify-center gap-4">
            <ProgressComp percent={progress} />
            <MediaTimeDisplay className="bg-transparent"></MediaTimeDisplay>
          </div>
          <div className="flex mt-[30px] items-center justify-between">
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
              onClick={onOpen}
              className="!bg-transparent  w-[81px] h-[81px] circle-btn-shadow-show rounded-full bg-white flex items-center justify-center"
            >
              <Image src="/print.svg" width={32} height={28} alt="재생"></Image>
            </button>
          </div>
        </MediaController>
      )}

      <div className="show-bg"></div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="max-w-[328px] h-[60vh] p-[30px]">
          {(onClose) => (
            <>
              {isLoading ? (
                <ModalBody className="flex items-center p-0">
                  <LoadingTransform onClose={onClose} />
                </ModalBody>
              ) : (
                <ModalBody className="flex items-center p-0">
                  <Image
                    src="/circle_char.svg"
                    className="mt-auto circle-btn-shadow rounded-full"
                    width={89}
                    height={89}
                    alt="메인캐릭터"
                  />

                  <div className="text-center font-[600] text-lg font-[Kodchasan] px-[34px] mt-[37px]">
                    수현님 180일간 아이와의 추억이 가득 찼네요.
                    <br /> <br />
                    지금 바로 추억을 육아일기 책으로 만나보시겠어요?
                  </div>

                  <div className="flex space-x-[19px] w-full mt-auto">
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-[#F5F5F5] text-[17px] font-[600] text-black w-full rounded-[25px] pt-[16px] pb-[15px] flex items-center justify-center"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={onSubmit}
                      className="bg-[#FF4D49] text-[17px] font-[600] text-white w-full rounded-[25px] pt-[16px] pb-[15px] flex items-center justify-center"
                    >
                      확인
                    </button>
                  </div>
                </ModalBody>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
