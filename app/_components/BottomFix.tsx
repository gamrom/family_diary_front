export const BottomFix = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      className="sticky !bottom-0 flex items-center h-[182px] justify-center bg-white w-full pb-[57px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      {children}
    </div>
  );
};
