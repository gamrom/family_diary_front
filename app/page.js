import Image from "next/image";

export default async function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <Image src="/circle_char.svg" width={89} height={89} alt="메인캐릭터" />
      <div className="font-[600] text-[30px] mt-[43px]">
        Family Diary와 함께 <br /> 추억을 만들어 볼까요?
      </div>
      <button
        type="button"
        className="mt-[69px] w-full bg-[#FDE500] flex items-center justify-center py-[18px] rounded-[26px]"
      >
        <Image src="/kakao.svg" width={16} height={15} alt="카카오로그인" />
        <div className="text-sm font-[600] ml-[15px]">카카오로 시작하기</div>
      </button>
    </main>
  );
}
