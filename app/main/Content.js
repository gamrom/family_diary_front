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
import { select } from "@nextui-org/react";

export const Content = ({ diaries, user }) => {
  const router = useRouter();

  //calendar
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  //modal
  const {
    isOpen: createConfirmModalIsOpen,
    onOpen: createConfirmModalOnOpen,
    onOpenChange: createConfirmModalOnOpenChange,
    onClose: createConfirmModalOnClose,
  } = useDisclosure();

  const [selectDay, setSelectDay] = useState(dayjs());

  console.log("diaries", diaries);
  console.log("selectday", selectDay);

  const [pickDiary, setPickDiary] = useState({});
  useEffect(() => {
    if (selectDay) {
      setPickDiary(
        diaries.filter(
          (diary) =>
            diary.released_date === dayjs(selectDay).format("YYYY-MM-DD"),
        )[0],
      );
      setIsLoading(false);
    }
  }, [selectDay]);

  console.log(selectDay);

  return (
    <>
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
        <ProfileBtn profile_url={user.profile_url} />
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
        tileClassName={"relative"}
        tileContent={({ date, view }) => {
          // diaries released_date list include tile date, return point image
          const ds = diaries.find(
            (diary) => diary.released_date === dayjs(date).format("YYYY-MM-DD"),
          );

          if (ds) {
            return (
              <Image
                src="/date_point.svg"
                width={6}
                height={6}
                alt="포인트"
                className="absolute top-[75%] left-[42%]"
              />
            );
          }
        }}
      />
      {!isLoading && pickDiary ? (
        <Link
          href={`/show/${pickDiary.id}`}
          className="w-full flex flex-col bottom_main-content mt-[44px] py-[17px] px-[19px] rounded-[12px]"
        >
          <div className="text-[15px] text-[#89898B] font-[600]">
            {dayjs(selectDay).format("D일 ddd요일")}
          </div>

          <div className="mt-[14px] gap-[11px] flex">
            <Image
              width={148}
              height={148}
              className="rounded-[15px] object-cover aspect-square"
              alt="show사진"
              src={pickDiary.image_url}
            />

            <div className="flex flex-col justify-between w-full">
              <div className="text-[#C6C6C8] text-sm font-[500] text-[Kodchasan] line-clamp-4 break-all">
                {pickDiary.content}
              </div>

              <div className="bg-[#FF4D49] text-[17px] font-[600] text-white w-full rounded-[25px] py-[15px] flex gap-[2px] items-center justify-center">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 6.76795C15.3333 7.53775 15.3333 9.46225 14 10.2321L7.25 14.1292C5.91666 14.899 4.25 13.9367 4.25 12.3971L4.25 4.60288C4.25 3.06328 5.91667 2.10103 7.25 2.87083L14 6.76795Z"
                    fill="white"
                  />
                </svg>
                추억 보기
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="w-full flex h-[50vh] flex-col bottom_main-content mt-[44px] py-[17px] px-[19px] rounded-[12px]">
          <div className="text-[15px] text-[#89898B] font-[600]">
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

      <div className="mb-auto"></div>
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
                  tileClassName={"relative"}
                  tileContent={({ date, view }) => {
                    // diaries released_date list include tile date, return point image
                    const ds = diaries.find(
                      (diary) =>
                        diary.released_date ===
                        dayjs(date).format("YYYY-MM-DD"),
                    );

                    if (ds) {
                      return (
                        <Image
                          src="/date_point.svg"
                          width={6}
                          height={6}
                          alt="포인트"
                          className="absolute top-[75%] left-[42%]"
                        />
                      );
                    }
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={createConfirmModalIsOpen}
        onOpenChange={createConfirmModalOnOpen}
        hideCloseButton={true}
      >
        <ModalContent className="max-w-[328px] py-4">
          <div>
            {diaries.filter(
              (diary) =>
                dayjs(diary.released_date).format("YYYY-MM-DD") ===
                dayjs().format("YYYY-MM-DD"),
            )?.length > 0 ? (
              <ModalBody className="flex flex-col items-center">
                <Image
                  src="/sun.svg"
                  alt="책얼굴"
                  width={105}
                  height={105}
                  className="mt-[126px]"
                />
                <div className="font-[600] font-[Kodchasan] text-lg text-center mt-[18px]">
                  이미 작성한 <br /> 오늘의 일기가 있어요!
                </div>
                <div className="flex space-x-[19px] w-full mt-[116px]">
                  <button
                    type="button"
                    onClick={createConfirmModalOnClose}
                    className="bg-[#FF4D49] text-[17px] font-[600] text-white
                    w-full rounded-[25px] pt-[16px] pb-[15px] flex items-center
                    justify-center"
                  >
                    확인
                  </button>
                </div>
              </ModalBody>
            ) : (
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
                <div className="font-[600] font-[Kodchasan] text-xs text-center mt-[12px]">
                  *IOS 환경에서는 작동하지 않을 수 있습니다. 크롬 사용을
                  권장드립니다.
                </div>
                <div className="flex space-x-[19px] w-full mt-[116px]">
                  <button
                    type="button"
                    onClick={createConfirmModalOnClose}
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
            )}
          </div>
        </ModalContent>
      </Modal>
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
    </>
  );
};
