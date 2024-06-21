"use client";

import { ClosePageNav } from "../_components/ClosePageNav";
import Image from "next/image";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import { useRef, useEffect, useState, Suspense } from "react";
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
import { useRouter } from "next/navigation";
import { BackBtn } from "../_components/BackBtn";
import { ProfileBtn } from "../_components/ProfileBtn";
import Link from "next/link";
import { LoadingFallback } from "../_components/LoadingFallback";

export const Content = ({ diaries, initialDiary }) => {
  const router = useRouter();

  //calendar
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //modal
  const {
    isOpen: createConfirmModalIsOpen,
    onOpen: createConfirmModalOnOpen,
    onOpenChange: createConfirmModalOnOpenChange,
  } = useDisclosure();

  const [selectDay, setSelectDay] = useState(dayjs());

  const [currentDiary, setCurrentDiary] = useState(initialDiary || null);

  const checkDiary = (date) => {
    return diaries.find((diary) => dayjs(diary.date).isSame(date, "day"));
  };

  useEffect(() => {
    setCurrentDiary(checkDiary(selectDay));
  }, [selectDay]);

  console.log("diaries", diaries);
  console.log("selectday", selectDay);

  const [pickDiaries, setPickDiaries] = useState([]);
  useEffect(() => {
    setPickDiaries(
      diaries.filter((diary) => dayjs(diary.date).isSame(selectDay, "day")),
    );
  }, [currentDiary]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ClosePageNav>
        <div className="invisible">
          <ProfileBtn />
        </div>
        <button
          onClick={onOpen}
          type="button"
          className="flex items-center justify-center"
        >
          <div className="text-xl font-[600]">
            {dayjs(selectDay).format("M월 DD일 ddd요일")}
          </div>
          <Image
            src="/drowdownarrow.svg"
            alt="dropdown"
            width={10}
            height={10}
            className="ml-[10px]"
          />
        </button>
        <ProfileBtn />
      </ClosePageNav>

      <div className="mt-[28px]"></div>
      <Calendar
        calendarType="gregory"
        className="home-main-calendar"
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        value={selectDay.toDate()}
        onChange={(date) => {
          setSelectDay(dayjs(date));
        }}
        onActiveStartDateChange={({ activeStartDate }) => {
          setSelectDay(dayjs(activeStartDate));
        }}
        tileContent={({ date, view }) => {
          const diary = diaries.find((diary) =>
            dayjs(diary.date).isSame(date, "day"),
          );
          if (diary) {
            return <div className="text-[10px] font-[400]">✅</div>;
          }
          return null;
        }}
      />

      {currentDiary && (
        <button
          onClick={() => {
            router.push(`/show/${currentDiary.id}`);
          }}
        >
          추억 재생하기
        </button>
      )}

      {pickDiaries.length > 0 ? (
        pickDiaries?.map((pickDiaries) => {
          <div
            className="w-full rounded-[12px] bg-white  flex flex-col items-center justify-center py-[9px] px-[19px] mt-[27px]"
            style={{
              boxShadow: "0px 4px 20px 1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Image
              src="./short_square.svg"
              alt="위에버튼"
              width={35}
              height={3}
            />
            <div className="flex justify-between w-full mt-[17px]">
              <div className="text-[15px]">
                <span>17</span>
                <span className="font-[Kodchasan]">일 월요일</span>
              </div>
              <button type="button">
                <Image
                  src="./trash.svg"
                  width={13}
                  height={13}
                  alt="삭제하기"
                />
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
                elit. Dolor reiciendis a accusamus, nihil harum ullam optio
                neque voluptatum placeat cum nesciunt. Doloremque unde fuga quo
                sunt porro error saepe. Harum.
              </div>
            </div>
          </div>;
        })
      ) : (
        <div className="w-full flex h-[50vh] flex-col bottom_main-content mt-[44px] py-[17px] px-[19px] rounded-[12px]">
          <div
            className="text-[15px] text-[#89898B]
]"
          >
            {dayjs(selectDay).format("D일 ddd요일")}
          </div>

          <div
            className="text-sm font-[500] mt-[14px] text-center font-[Kodchasan] text-[#C6C6C8]"
            style={{
              //height calc 100vh minus other components
              height:
                "calc(100vh - 44px - 17px - 19px - 50vh - 44px - 17px - 19px - 81px - 20px)",
            }}
          >
            아래의 귀요미를 눌러 추억을 기록해 볼까요?
          </div>
        </div>
      )}

      <BottomFix>
        <button type="button" onClick={createConfirmModalOnOpenChange}>
          <Image
            src="/circle_char.svg"
            className="circle-btn-shadow"
            alt="녹음하러가기"
            width={81}
            height={81}
          />
        </button>
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
                  value={selectDay.toDate()}
                  onChange={(date) => {
                    setSelectDay(dayjs(date));
                    onClose();
                  }}
                  onActiveStartDateChange={({ activeStartDate }) => {
                    setSelectDay(dayjs(activeStartDate));
                  }}
                  tileContent={({ date, view }) => {
                    const diary = diaries.find((diary) =>
                      dayjs(diary.date).isSame(date, "day"),
                    );
                    if (diary) {
                      return <div className="text-[10px] font-[400]">✅</div>;
                    }
                    return null;
                  }}
                />

                <div className="flex space-x-[19px]">
                  <button
                    onClick={onClose}
                    type="button"
                    className="bg-[#F5F5F5] text-[17px] font-[600] text-[#89898B] w-full rounded-[25px] py-[15px]"
                  >
                    취소
                  </button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={createConfirmModalIsOpen}
        onOpenChange={createConfirmModalOnOpen}
      >
        <ModalContent className="max-w-[328px] py-4">
          {(onClose) => (
            <div>
              <ModalBody className="flex flex-col items-center">
                <Image
                  src="/book_face.svg"
                  alt="책얼굴"
                  width={105}
                  height={105}
                  className="mt-[126px]"
                />
                <div className="font-[600] font-[Kodchasan] text-lg text-center mt-[18px]">
                  오늘의 일기를 <br /> 작성해 보시겠어요?
                </div>
                <div className="flex space-x-[19px] w-full mt-[116px]">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-[#F5F5F5] text-[17px] font-[600] w-full rounded-[25px] pt-[16px] pb-[15px] flex items-center justify-center text-[#89898B]"
                  >
                    취소
                  </button>
                  <Link
                    href="/recording/new"
                    className="bg-[#FF4D49] text-[17px] font-[600] text-white
                    w-full rounded-[25px] pt-[16px] pb-[15px] flex items-center
                    justify-center"
                  >
                    확인
                  </Link>
                </div>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </Suspense>
  );
};
