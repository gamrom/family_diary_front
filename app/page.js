import { Recorder } from "./Recorder";
import { SpeakToText } from "./SpeakToText";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Recorder />
      <SpeakToText />
    </main>
  );
}
