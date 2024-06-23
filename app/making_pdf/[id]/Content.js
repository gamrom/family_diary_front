"use client";
import QR from "qrcode.react";
import Image from "next/image";
import "../style.css";
import dayjs from "dayjs";

export const Content = ({ diary }) => {
  return (
    <div>
      <div className="pdf_wrapper">
        <Image
          src="/pdf_bg.svg"
          alt="PDF Background"
          width={1000}
          height={1414}
          className="absolute top-0 left-0 z-[-1]"
        />
        <div className="flex">
          <div className="flex flex-col justify-between pt-[32px] pb-[28px]">
            <div className="pdf_date flex item-center justify-center text-center">
              {dayjs(diary.released_date?.replace(/-/g, "/")).format(
                "YY.MM.DD"
              )}
            </div>

            <QR
              value={process.env.NEXT_PUBLIC_ORIGIN + `/show/${diary.id}`}
              size={156}
              id="qr-gen"
              level={"H"}
              includeMargin={false}
            />
          </div>

          <div className="relative p-[33px_29px_28px_48px]">
            <Image
              width={527}
              height={527}
              alt="이미지"
              src={diary?.image_url}
              className="rounded-[30px]"
            />

            <Image
              className="absolute top-0 left-0"
              src="/after_image.svg"
              width={605}
              height={588}
              alt="이미지요소"
            />
          </div>
        </div>

        <div className="mt-[74px]">
          <div className="text-[40px] font-bold">
            {diary.content}
          </div>
        </div>
      </div>
    </div>
  );
};
