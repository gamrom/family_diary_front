import { Recorder } from "./Recorder";
import { SpeakToText } from "./SpeakToText";
import { Stt } from "./Stt";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Recorder />
      {/* <SpeakToText /> */}
      {/* <Stt /> */}
    </main>
  );
}
