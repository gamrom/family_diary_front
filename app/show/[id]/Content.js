"use client";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import { useState, useRef, useEffect } from "react";
import { ProgressComp } from "./ProgressComp";
import "react-calendar/dist/Calendar.css";
import "./style.css";

import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import Link from "next/link";

import { LoadingTransform } from "./LoadingTransform";

export const Content = ({ diary }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [progress, setProgress] = useState(0);
  const pdfBtnRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // when play, calculate progress -> current time / total duration * 100
  const audioRef = useRef();

  const onSubmit = () => {
    setIsLoading(true);
    pdfBtnRef.current.click();
  };

  // calculate progress when audio is playing after click MediaPlayButton
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const onTimeUpdate = () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        setProgress(progress);
      };
      audio.addEventListener("timeupdate", onTimeUpdate);

      audio.onended = () => {
        setIsPlaying(false);
      };
      return () => {
        audio.removeEventListener("timeupdate", onTimeUpdate);
      };
    }
  }, [audioRef.current]);

  const [audioLoading, setAudioLoading] = useState(true);
  useEffect(() => {
    setAudioLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-[20px] relative">
        <Image
          src={diary?.image_url || "/image_sample.jpeg"}
          width={354}
          height={354}
          className="object-cover w-full rounded-[30px] aspect-square"
          alt="상세이미지"
        />

        <div className="absolute flex flex-col text-white top-[15px] left-[20px] font-[600]">
          <div className="text-[11px]">
            {dayjs(diary?.released_date?.replace(/-/g, "/")).format("YYYY년")}
          </div>
          <div className="text-[25px]">
            {dayjs(diary?.released_date?.replace(/-/g, "/")).format("M월")}
          </div>
          <div className="text-[25px]">
            {dayjs(diary?.released_date?.replace(/-/g, "/")).format("DD일")}
          </div>
        </div>

        <Link
          href="/"
          className="absolute flex flex-col text-white top-[15px] right-[20px] font-[600]"
        >
          <Image src="/x_white.svg" width={13} height={13} alt="닫기" />
        </Link>
      </div>

      {diary?.content ? (
        <div className="text-white px-4 text-center h-[140px] overflow-auto show-text mt-[44px] relative">
          <div dangerouslySetInnerHTML={{ __html: diary.content }}></div>
        </div>
      ) : (
        <div className="text-white px-4 text-center h-[140px] overflow-auto show-text mt-[44px] relative">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum sed
          saepe aliquid sapiente ut consequuntur, maxime impedit aperiam esse
          culpa corrupti ipsam vitae nulla voluptates quia laboriosam. Minus,
          quibusdam quis?
        </div>
      )}

      <div className="show-bg"></div>

      <div className="fixed bottom-0 pb-[57px]">
        <div className="bg-transparent mt-[31px] w-full flex-col items-center justify-center w-full">
          <audio className="hidden" ref={audioRef} src={diary.audio_url} />

          <div className="flex items-center justify-center gap-4">
            <ProgressComp percent={progress} />
            {/* <MediaTimeDisplay className="bg-transparent"></MediaTimeDisplay> */}
          </div>
          <div className="flex mt-[30px] items-center justify-between gap-[25px]">
            <button
              type="button"
              className="!bg-transparent w-[81px] h-[81px] circle-btn-shadow-show rounded-full bg-white flex items-center justify-center"
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) {
                  deleteDiary(diary.id).then(() => {
                    alert("삭제되었습니다.");
                    window.location.href = "/";
                  });
                }
              }}
            >
              <Image src="/trash.svg" width={27} height={27} alt="삭제"></Image>
            </button>
            <button
              type="button"
              onClick={() => {
                audioRef.current.play();
                setIsPlaying(true);
              }}
              className="bg-transparent w-[81px] h-[81px] circle-btn-shadow-show rounded-full  flex items-center justify-center"
            >
              {isPlaying ? (
                <Image
                  src="/pause_white.svg"
                  width={25}
                  height={28}
                  alt="재생"
                ></Image>
              ) : (
                <Image
                  src="/play_white.svg"
                  width={36}
                  height={36}
                  alt="재생"
                ></Image>
              )}
            </button>

            <button
              type="button"
              onClick={onOpen}
              className="!bg-transparent  w-[81px] h-[81px] circle-btn-shadow-show rounded-full bg-white flex items-center justify-center"
            >
              <Image src="/print.svg" width={32} height={28} alt="재생"></Image>
            </button>
          </div>
        </div>

        {/* {!audioLoading && (
          <MediaController
            audio
            className="bg-transparent mt-[31px] w-full flex-col items-center justify-center"
          >
            <audio
              ref={audioRef}
              slot="media"
              src={
                // "https://family-diary-real-bucket.s3.ap-northeast-2.amazonaws.com/recorded-audio-1719140363349.wav"
                "https://stream.mux.com/O4h5z00885HEucNNa1rV02wZapcGp01FXXoJd35AHmGX7g/audio.m4a"
              }
            ></audio>

            <div className="flex items-center justify-center gap-4">
              <ProgressComp percent={progress} />
              <MediaTimeDisplay className="bg-transparent"></MediaTimeDisplay>
            </div>
            <div className="flex mt-[30px] items-center justify-between">
              <button
                type="button"
                className="!bg-transparent w-[81px] h-[81px] circle-btn-shadow-show rounded-full bg-white flex items-center justify-center"
                onClick={() => {
                  if (confirm("정말 삭제하시겠습니까?")) {
                    deleteDiary(diary.id).then(() => {
                      alert("삭제되었습니다.");
                      window.location.href = "/";
                    });
                  }
                }}
              >
                <Image
                  src="/trash.svg"
                  width={27}
                  height={27}
                  alt="삭제"
                ></Image>
              </button>
              <MediaPlayButton className="!bg-transparent  w-[81px] h-[81px] circle-btn-shadow-show rounded-full bg-white flex items-center justify-center">
                <Image
                  src="/play.svg"
                  width={36}
                  height={36}
                  alt="재생"
                ></Image>
              </MediaPlayButton>

              <button
                type="button"
                onClick={onOpen}
                className="!bg-transparent  w-[81px] h-[81px] circle-btn-shadow-show rounded-full bg-white flex items-center justify-center"
              >
                <Image
                  src="/print.svg"
                  width={32}
                  height={28}
                  alt="재생"
                ></Image>
              </button>
            </div>
          </MediaController> */}
      </div>

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
                      className="bg-[#F5F5F5] text-[17px] font-[600] text-black w-full rounded-[30px] pt-[16px] pb-[15px] flex items-center justify-center"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={onSubmit}
                      className="bg-[#FF4D49] text-[17px] font-[600] text-white w-full rounded-[30px] pt-[16px] pb-[15px] flex items-center justify-center"
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
