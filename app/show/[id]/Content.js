"use client";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import { useState, useRef, useEffect } from "react";
import { ProgressComp } from "./ProgressComp";
import "react-calendar/dist/Calendar.css";

import {
  deleteDiary,
  getCurrentUser,
  postPrinterEmail,
  sendPrint,
} from "@/app/_hooks/api";
import { Input } from "@nextui-org/input";

import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import Link from "next/link";

import { LoadingTransform } from "./LoadingTransform";

export const Content = ({ diary }) => {
  const {
    isOpen,
    onOpen,
    onOpenChange,
    onClose: onCloseFunction,
  } = useDisclosure();
  const [easter_eggs, setEasterEggs] = useState(0);
  const [progress, setProgress] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const [stage, setStage] = useState("initial"); // "initial", "printer_email_empty", "printer_email_exist", "send_print"
  const [printerEmail, setPrinterEmail] = useState("");

  // when play, calculate progress -> current time / total duration * 100
  const audioRef = useRef();

  const onSubmit = () => {
    getCurrentUser()
      .then((res) => {
        const { id, name, email, profile_url, printer_email } = res.data;

        if (printer_email === null) {
          setStage("printer_email_empty");
        } else {
          setPrinterEmail(printer_email);
          setStage("printer_email_exist");
        }
      })
      .catch((err) => {
        alert("해당 기능은 로그인이 필요합니다.");
        onCloseFunction();
        return;
      });
  };

  const onSubmitSendPrint = () => {
    setStage("send_print");
    sendPrint().then(() => {
      alert("추억이 책으로 출력되는 중입니다~!");
      onCloseFunction();
    });
  };

  const onSetPrinterEmail = () => {
    postPrinterEmail({ printer_email: printerEmail })
      .then((res) => {
        onSubmitSendPrint();
      })
      .catch((err) => {
        console.log(err);
        const message = err.response.data.message;
        alert("프린터 이메일 등록에 실패했습니다. \n" + message);
      });
  };

  // calculate progress when audio is playing after click MediaPlayButton
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const onTimeUpdate = () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        setProgress(progress);
        setAudioTime(audio.currentTime);
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

  useEffect(() => {
    if (easter_eggs === 5) {
      console.log(diary?.pdf_url);
      setEasterEggs(0);
    }
  }, [easter_eggs, diary.pdf_url]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mt-[20px] relative">
          <Image
            src={diary?.image_url || "/image_sample.jpeg"}
            width={354}
            height={354}
            className="object-cover rounded-[30px] aspect-square"
            alt="상세이미지"
            onClick={() => {
              setEasterEggs(easter_eggs + 1);
            }}
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

        <div className="text-white px-4 text-center h-[140px] overflow-auto show-text mt-[44px] relative">
          <div
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: diary.content }}
          ></div>
        </div>

        <div
          className="bg-image-move max-w-[400px] blur-[15px] fixed w-full h-full top-0 translate-x-[-50%] left-[50%] z-[-1] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:z-[1]"
          style={{
            background: `url(${diary?.image_url})`,
          }}
        ></div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="max-w-[328px] h-[60vh] p-[30px]">
            {(onClose) => (
              <>
                {stage === "initial" ? (
                  <ModalBody className="flex items-center p-0">
                    <Image
                      src="/circle_char.svg"
                      className="mt-auto rounded-full circle-btn-shadow"
                      width={89}
                      height={89}
                      alt="메인캐릭터"
                    />

                    <div className="text-center font-[600] text-lg font-[Kodchasan] px-[34px] mt-[37px]">
                      우리 아이와의 추억이 가득 찼네요.
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
                ) : stage === "printer_email_empty" ? (
                  <ModalBody className="flex items-center p-0">
                    <Image
                      src="/circle_char.svg"
                      className="mt-auto rounded-full circle-btn-shadow"
                      width={89}
                      height={89}
                      alt="메인캐릭터"
                    />
                    <div className="text-center font-[600] text-lg font-[Kodchasan] mt-4">
                      프린터 이메일 등록
                    </div>

                    <div className="text-center font-[600] text-lg font-[Kodchasan] mt-2">
                      프린터 이메일을 등록하시면 육아일기를 책으로
                      만들어드립니다.
                    </div>

                    <div className="w-full">
                      <Input
                        type="text"
                        value={printerEmail}
                        onChange={(e) => setPrinterEmail(e.target.value)}
                        placeholder="프린터 이메일을 입력해주세요"
                      />
                    </div>

                    <div className="flex space-x-[19px] w-full mt-auto">
                      <button
                        type="button"
                        onClick={onSetPrinterEmail}
                        className="bg-[#FF4D49] text-[17px] font-[600] text-white w-full rounded-[30px] pt-[16px] pb-[15px] flex items-center justify-center"
                      >
                        등록 후 인쇄
                      </button>
                    </div>
                  </ModalBody>
                ) : stage === "printer_email_exist" ? (
                  <ModalBody className="flex items-center p-0">
                    <Image
                      src="/circle_char.svg"
                      className="mt-auto rounded-full circle-btn-shadow"
                      width={89}
                      height={89}
                      alt="메인캐릭터"
                    />
                    <div className="text-center font-[600] text-lg font-[Kodchasan] mt-4">
                      기존 프린터로 인쇄
                    </div>

                    <div className="text-center font-[600] text-lg font-[Kodchasan] mt-2">
                      기존의 프린터 이메일 주소로 육아일기를 책으로
                      만들어드립니다.
                    </div>

                    <div className="w-full">
                      <Input type="text" value={printerEmail} readOnly />
                    </div>

                    <div className="flex space-x-[19px] w-full mt-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setStage("printer_email_empty");
                        }}
                        className="bg-[#F5F5F5] text-[17px] font-[600] text-black w-full rounded-[30px] pt-[16px] pb-[15px] flex items-center justify-center"
                      >
                        변경(새로 등록)
                      </button>
                      <button
                        type="button"
                        onClick={onSubmitSendPrint}
                        className="bg-[#FF4D49] text-[17px] font-[600] text-white w-full rounded-[30px] pt-[16px] pb-[15px] flex items-center justify-center"
                      >
                        인쇄
                      </button>
                    </div>
                  </ModalBody>
                ) : (
                  stage === "send_print" && (
                    <ModalBody className="flex items-center p-0">
                      <LoadingTransform onClose={onClose} />
                    </ModalBody>
                  )
                )}
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      <div className="sticky bottom-0 pb-[57px]">
        <div className="bg-transparent mt-[31px] flex-col items-center justify-center w-full">
          <audio className="hidden" ref={audioRef} src={diary.audio_url} />

          <div className="flex items-center justify-center gap-4">
            <ProgressComp percent={progress} />

            <div className="bg-transparent text-white text-[14px] font-[500] opacity-30">
              {dayjs().startOf("day").second(audioTime).format("mm:ss")}
            </div>
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
            {isPlaying ? (
              <button
                type="button"
                onClick={() => {
                  audioRef.current.pause();
                  setIsPlaying(false);
                }}
                className="bg-transparent w-[81px] h-[81px] circle-btn-shadow-show rounded-full  flex items-center justify-center"
              >
                <Image
                  src="/pause_white.svg"
                  width={25}
                  height={28}
                  alt="일시정지"
                ></Image>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  // audioRef.current.load();
                  // const handlePlay = () => {
                  if (audioRef.current) {
                    const audio = audioRef.current;
                    audio
                      .play()
                      .then(() => {
                        setIsPlaying(true);
                      })
                      .catch((error) => {
                        console.error("Error playing audio:", error);
                      });
                  }
                  // };
                }}
                className="bg-transparent w-[81px] h-[81px] circle-btn-shadow-show rounded-full  flex items-center justify-center"
              >
                <Image
                  src="/play_white.svg"
                  width={36}
                  height={36}
                  alt="재생"
                ></Image>
              </button>
            )}

            <button
              type="button"
              onClick={onOpen}
              className="!bg-transparent  w-[81px] h-[81px] circle-btn-shadow-show rounded-full bg-white flex items-center justify-center"
            >
              <Image src="/print.svg" width={32} height={28} alt="재생"></Image>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
