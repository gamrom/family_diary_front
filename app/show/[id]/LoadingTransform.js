import Image from "next/image";

export const LoadingTransform = ({ onClose }) => {
  return (
    <div className="max-w-[328px] flex-col h-[60vh] flex items-center justify-center">
      <Image
        src="/circle_char.svg"
        className="circle-btn-shadow rounded-full loading-spinner loading-spinner-size_not_change"
        width={89}
        height={89}
        alt="메인캐릭터"
      />

      <div className="font-[600] text-lg mt-[57px]">
        추억이 책으로 변신하는 중..
      </div>
    </div>
  );
};
