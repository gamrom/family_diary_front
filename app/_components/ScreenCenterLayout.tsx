export const ScreenCenterLayout = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {children}
    </div>
  );
};
