export const BottomFix = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      className="absolute bottom-0 flex items-center h-full max-h-[182px] justify-center mt-[34px] bg-white w-full max-w-[400px] w-full left-[50%]"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%)",
        transform: "translate(-50%, 0)",
      }}
    >
      {children}
    </div>
  );
};
