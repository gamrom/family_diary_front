"use client";

import { ClosePageNav } from "../_components/ClosePageNav";
import Image from "next/image";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import { useRef, useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "dayjs/locale/ko";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
dayjs.locale("ko");
import "./style.css";

export const Content = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectDay, setSelectDay] = useState(dayjs());
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

      <Calendar
        calendarType="gregory"
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        onChange={(date) => {
          setSelectDay(dayjs(date));
        }}
        className={"main_calendar"}
      />

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
                    setSelectDay(dayjs(date));
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
