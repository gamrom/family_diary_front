import { Content } from "./Content";

export default function Page({ searchParams }) {
  const { date } = searchParams;
  return (
    <div className="main-container">
      <Content date={date} />
    </div>
  );
}
