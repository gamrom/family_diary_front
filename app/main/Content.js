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
import { BottomFix } from "../_components/BottomFix";

export const Content = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectDay, setSelectDay] = useState(dayjs());
  return (
    <div className="h-screen flex flex-col justify-between">
      <ClosePageNav>
        <button
          onClick={onOpen}
          type="button"
          className="flex items-center justify-center"
        >
          <div className="text-xl font-[600]">
            {dayjs(selectDay).format("M월 DD일 ddd요일")}
          </div>
        </button>
      </ClosePageNav>
      <div className="mt-[30px]"></div>
      <Calendar
        calendarType="gregory"
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        onChange={(date) => {
          setSelectDay(dayjs(date));
        }}
      />
      <div
        className="w-full rounded-[12px] bg-white  flex flex-col items-center justify-center py-[9px] px-[19px] mt-[27px]"
        style={{
          boxShadow: "0px 4px 20px 1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Image src="./short_square.svg" alt="위에버튼" width={35} height={3} />
        <div className="flex justify-between w-full mt-[17px]">
          <div className="text-[15px]">
            <span>17</span>
            <span className="font-[Kodchasan]">일 월요일</span>
          </div>
          <button type="button">
            <Image src="./trash.svg" width={13} height={13} alt="삭제하기" />
          </button>
        </div>

        <div className="flex items-start mt-[17px]">
          <Image
            src="/image_sample.png"
            className="object-contain rounded-lg"
            width={111}
            height={111}
            alt="상세이미지"
          />
          <div className="ml-[18px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            reiciendis a accusamus, nihil harum ullam optio neque voluptatum
            placeat cum nesciunt. Doloremque unde fuga quo sunt porro error
            saepe. Harum. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Dolor reiciendis a accusamus, nihil harum ullam optio neque
            voluptatum placeat cum nesciunt. Doloremque unde fuga quo sunt porro
            error saepe. Harum.
          </div>
        </div>
      </div>
      <BottomFix>
        <button type="button">
          <Image
            src="/circle_char.svg"
            className="circle-btn-shadow"
            alt="녹음하러가기"
            width={81}
            height={81}
          />
        </button>
      </BottomFix>
    </div>
  );
};
