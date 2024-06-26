"use client";

import { ClosePageNav } from "@/app/_components/ClosePageNav";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Calendar from "react-calendar";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "@/app/_components/Loading";
import { ProgressComp } from "./ProgressComp";

import "react-calendar/dist/Calendar.css";

import Image from "next/image";
import { BottomFix } from "@/app/_components/BottomFix";
dayjs.locale("ko");

import { updateDiary } from "@/app/_hooks/api";
import { BackBtn } from "@/app/_components/BackBtn";

export const Content = ({
  diary,
}: {
  diary: {
    id: number;
    released_date: string;
    content: string;
    image_url: string;
    audio_url: string;
  };
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [sendParams, setSendParams] = useState({
    date: dayjs(diary?.released_date?.replace(/-/g, "/")).format("YYYY-MM-DD"),
    content: diary?.content || "",
    image: "",
  });
  const imgRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);
  const addImage = () => {
    imgRef.current?.click();
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioTime, setAudioTime] = useState<any>("00:00");

  useEffect(() => {
    const handleFile = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;

      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result !== "string") return;

        setSendParams((prev) => ({
          ...prev,
          image: result,
        }));
      };
      reader.readAsDataURL(file);
    };

    imgRef.current?.addEventListener("change", handleFile);

    return () => {
      imgRef.current?.removeEventListener("change", handleFile);
    };
  }, [imgRef]);

  const [audioLength, setAudioLength] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (diary) {
        audioRef.current.src = diary.audio_url;
        setAudioLength(audioRef.current.duration);
      }
      setAudioLength(audioRef.current.duration);
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
  }, [audioRef.current, diary]);

  console.log(audioRef.current);

  console.log(sendParams.content.length);

  const [loadingText, setLoadingText] = useState("Loading..");

  const onSubmit = () => {
    setLoading(true);
    setLoadingText("일기 생성 요청 중..");
    const formData = new FormData();

    if (sendParams.content.length === 0) {
      alert("내용을 입력해주세요.");
      setLoading(false);
      return;
    }

    if (sendParams.content.length > 300) {
      alert("글자 수가 너무 많습니다. 300자 이내로 작성해주세요.");
      setLoading(false);
      return;
    }

    if (!imgRef.current?.files?.[0]) {
      alert("사진을 등록해주세요.");
      setLoading(false);
      return;
    }

    formData.append("content", sendParams.content);
    if (imgRef.current?.files?.[0]) {
      formData.append("image", imgRef.current.files[0]);
    }

    // updateDiary(diary?.id, formData).then(async (res: any) => {
    //   const { id } = res.data;

    //   router.push(`/show/${id}`);
    // });

    updateDiary(diary?.id, formData).then(async (res: any) => {
      const { id } = res.data;

      setLoadingText("책이 될 페이지 생성 중..");

      const response = await fetch(
        `/api/send-make-pdf?url=${process.env.NEXT_PUBLIC_ORIGIN}/making_pdf/${id}`
      );

      if (!response.ok) {
        alert("데이터 생성에 실패했습니다. 다시 시도해주세요.");
        return;
      } else {
        const data = await response.json();

        const formData2 = new FormData();
        formData2.append("pdf_url", data.Location);

        setLoadingText("일기 생성 중..");

        updateDiary(id, formData2)
          .then((res: any) => {
            router.push(`/show/${id}`);
          })
          .catch(() => {
            alert("데이터 생성에 실패했습니다. 다시 시도해주세요.");
          })
          .finally(() => {
            setLoading(false);
          });
      }

      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <ClosePageNav>
        <div className="flex items-center justify-between w-full">
          <Image
            src="/x.svg"
            width={13}
            height={13}
            alt="뒤로가기"
            className="invisible"
          />
          <div className="text-xl font-[600]">
            {dayjs(diary.released_date).format("M월 DD일 ddd요일")}
          </div>
          <BackBtn>
            <Image src="/x.svg" width={13} height={13} alt="뒤로가기" />
          </BackBtn>
        </div>
      </ClosePageNav>
      <div className="flex flex-col w-full mt-4 mb-auto">
        <div
          className="w-full px-[19px] pt-[26px] pb-[29px] flex flex-col rounded-[12px]"
          style={{
            boxShadow: "0px 4px 20px 1px #0000001A",
          }}
        >
          <div className="font-[600] text-xs">일기 듣기</div>
          {isPlaying ? (
            <div className="flex items-center justify-between w-full px-[17px] mt-[16px]">
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                }}
                type="button"
              >
                <Image
                  src="/pause_gray.svg"
                  width={16}
                  height={16}
                  alt="재생"
                />
              </button>

              <ProgressComp percent={progress} />
              <div className="text-[#89898B]">
                {`${
                  Math.floor(audioTime / 60)
                    .toString()
                    .padStart(2, "0") +
                  ":" +
                  Math.floor(audioTime % 60)
                    .toString()
                    .padStart(2, "0")
                }`}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full px-[17px] mt-[16px]">
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.play();
                    setIsPlaying(true);
                  }
                }}
                type="button"
              >
                <Image src="/play_gray.svg" width={16} height={16} alt="재생" />
              </button>
              <Image
                src="/progress_gray_0.svg"
                width={133}
                height={36}
                alt="진행0"
              />
              <div className="text-[#89898B]">
                {/* {audioRef.current && audioTime} */}
                {/* audioTime to 00:00 format */}
                {/* {`${Math.floor(audioTime / 60)
                  .toString()
                  .padStart(2, "0")}:${Math.floor(audioTime % 60)
                  .toString()
                  .padStart(2, "0")}`}
                {" / "}
                {audioRef.current && audioRef.current.duration} */}

                {`00:00`}
              </div>
            </div>
          )}
        </div>

        <div
          className="w-full px-[19px] pt-[26px] pb-[12px] flex flex-col rounded-[12px] mt-[25px]"
          style={{
            boxShadow: "0px 4px 20px 1px #0000001A",
          }}
        >
          <div className="font-[600] text-xs">오늘 일기</div>
          <textarea
            className="
            w-full
            h-[114px]
            mt-[13px]
            font-[400]
            text-[#89898B]
            rounded-[10px]
            resize-none
            focus:outline-none
          "
            placeholder="오늘의 일기를 작성해주세요."
            value={sendParams.content}
            onChange={(e) => {
              setSendParams((prev) => ({
                ...prev,
                content: e.target.value,
              }));
            }}
          ></textarea>
        </div>

        <div
          className="mt-[25px] w-full px-[19px] pt-[26px] pb-[12px] flex flex-col rounded-[12px]"
          style={{
            boxShadow: "0px 4px 20px 1px #0000001A",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="font-[600] text-xs">오늘의 사진</div>
            {!!sendParams.image ? (
              <button type="button" onClick={addImage}>
                <Image
                  src="/reload.svg"
                  width={14}
                  height={14}
                  alt="사진다시"
                />
              </button>
            ) : (
              <div className="invisible w-[14px] h-[14px]"></div>
            )}
          </div>

          {!!sendParams.image ? (
            <div>
              <Image
                src={URL.createObjectURL(imgRef.current?.files?.[0] as Blob)}
                width={287}
                height={287}
                alt="임시이미지"
                className="mt-[15px] rounded-[12px] w-full"
              />
            </div>
          ) : (
            <button
              className="mt-[15px] rounded-[12px] w-full h-[287px] flex items-center justify-center bg-[#F5F5F5]"
              type="button"
              onClick={addImage}
            >
              <Image src="/plus.svg" alt="plus" width={20} height={20} />
            </button>
          )}
        </div>

        <input ref={imgRef} type="file" accept="image/*" hidden />
      </div>

      <audio ref={audioRef} className="hidden" src={diary.audio_url} />

      <BottomFix>
        <div className="flex space-x-[19px] w-full">
          <button
            type="button"
            onClick={onSubmit}
            className="bg-[#FF4D49] text-[17px] font-[600] text-white w-full rounded-[30px] pt-[16px] pb-[15px] flex items-center justify-center"
          >
            완료하기
          </button>
        </div>
      </BottomFix>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="max-w-[328px] py-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center items center">
                어떤 날의 기록인가요?
              </ModalHeader>
              <ModalBody>
                <Calendar
                  calendarType="gregory"
                  formatDay={(locale, date) =>
                    date.toLocaleString("en", { day: "numeric" })
                  }
                  onChange={(date) => {
                    if (date instanceof Date) {
                      setSendParams((prev) => ({
                        ...prev,
                        date: dayjs(date).format("YYYY-MM-DD"),
                      }));
                      onClose();
                    }
                  }}
                />

                <div className="flex space-x-[19px]">
                  <button
                    type="button"
                    className="bg-[#F5F5F5] text-[17px] font-[600] text-[#89898B] w-full rounded-[25px] py-[15px]"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="bg-[#FF4D49] text-[17px] font-[600] text-white w-full rounded-[25px] py-[15px]"
                  >
                    확인
                  </button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {isLoading && <Loading isLoading={isLoading} text={loadingText} />}
    </div>
  );
};
