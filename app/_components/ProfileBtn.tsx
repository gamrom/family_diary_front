import Image from "next/image";
import Link from "next/link";

export const ProfileBtn = ({ profile_url }: { profile_url: string }) => {
  return profile_url ? (
    <Link href="/mypage" className="w-[33px] h-[33px] profile">
      <Image
        src="/profile_default.png"
        width={33}
        height={33}
        alt="프로필"
        className="object-none object-cover rounded-full profile-shadow-inset profile-shadow"
      />
    </Link>
  ) : (
    <Link href="mypage">
      <Image
        src="/profile_default.png"
        width={33}
        height={33}
        alt="프로필"
        className="object-none object-cover rounded-full profile-shadow-inset profile-shadow"
      />
    </Link>
  );
};
