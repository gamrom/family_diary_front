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

export const Content = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
      <div
        className="mt-[25px] w-full px-[19px] pt-[26px] pb-[12px] flex flex-col rounded-[12px]"
        style={{
          boxShadow: "0px 4px 20px 1px #0000001A",
        }}
      >
        <div className="font-[600] text-xs">오늘의 사진</div>

        <div
          className="mt-[15px] rounded-[12px] w-[287px] flex items-center justify-center bg-[#F5F5F5]"
          type="button"
          // onClick={addImage}
        >
          <Image src="/image_sample.png" width={286} height={404} />
        </div>
      </div>

      <BottomFix>
        <div className="flex space-x-[19px] w-full">
          <button
            type="button"
            // onClick={onSubmit}
            className="bg-[#FF4D49] text-[15px] font-[600] text-white w-full rounded-[25px] pt-[16px] pb-[15px] flex items-center justify-center"
          >
            인쇄하기
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
    </div>
  );
};
