"use client";

import { ClosePageNav } from "../_components/ClosePageNav";
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

import "react-calendar/dist/Calendar.css";

import Image from "next/image";
import { BottomFix } from "../_components/BottomFix";
dayjs.locale("ko");

export const Content = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [sendParams, setSendParams] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    content: "",
    image: "",
  });
  const imgRef = useRef<HTMLInputElement>(null);
  const addImage = () => {
    imgRef.current?.click();
  };

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

  const onSubmit = () => {
    console.log(sendParams);
  };

  return (
    <div>
      <ClosePageNav>
        <button
          onClick={onOpen}
          type="button"
          className="flex items-center justify-center"
        >
          <div className="text-xl font-[600]">
            {dayjs().format("M월 DD일 ddd요일")}
          </div>
          <Image
            src="/drowdownarrow.svg"
            alt="dropdown"
            width={10}
            height={10}
            className="ml-[10px]"
          />
        </button>
      </ClosePageNav>
      <div className="flex flex-col mt-4">
        <div
          className="w-full px-[19px] pt-[26px] pb-[12px] flex flex-col rounded-[12px]"
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

        <BottomFix>
          <div className="flex space-x-[19px] w-full">
            <button
              type="button"
              className="bg-[#F5F5F5] text-[17px] font-[600] text-black w-full rounded-[25px] pt-[16px] pb-[15px] flex items-center justify-center"
            >
              녹음하기
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="bg-[#FF4D49] text-[17px] font-[600] text-white w-full rounded-[25px] pt-[16px] pb-[15px] flex items-center justify-center"
            >
              완료하기
            </button>
          </div>
        </BottomFix>

        <input ref={imgRef} type="file" accept="image/*" hidden />
      </div>

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
    </div>
  );
};
