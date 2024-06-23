import Image from "next/image";

import KakaoButton from "@/app/_components/KakaoButton";
import { ScreenCenterLayout } from "../_components/ScreenCenterLayout";

export default function Home() {
  return (
    <ScreenCenterLayout>
      <div className="flex flex-col items-center">
        <Image
          src="/circle_char.svg"
          width={89}
          height={89}
          alt="메인캐릭터"
          className="circle-btn-shadow"
        />
        <div className="font-[600] text-[30px] mt-[43px] text-center">
          Family Diary와 함께 <br /> 추억을 만들어 볼까요?
        </div>
        <KakaoButton />
      </div>
    </ScreenCenterLayout>
  );
}
