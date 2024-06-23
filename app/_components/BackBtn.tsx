"use client";
import { useRouter } from "next/navigation";

export const BackBtn = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: string;
}) => {
  const router = useRouter();
  return (
    <button type="button" className={style} onClick={() => router.back()}>
      {children}
    </button>
  );
};
