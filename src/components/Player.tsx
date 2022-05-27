import React from "react";
import { encodeToWavBlob } from "../utils/output";

export function Player({
  audioData,
  audioContext,
}: {
  audioData: AudioBuffer;
  audioContext: AudioContext;
}) {
  const lastSourceRef = React.useRef<AudioBufferSourceNode | null>(null);

  function play() {
    if (lastSourceRef.current) {
      lastSourceRef.current.stop();
    }
    const source = audioContext.createBufferSource();
    source.buffer = audioData;
    source.connect(audioContext.destination);
    source.start();
    lastSourceRef.current = source;
  }

  function download() {
    const blob = encodeToWavBlob(audioData);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "friteerattu.wav";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <>
      <button onClick={play}>Play ({audioData.duration.toFixed(2)}s)</button>
      &nbsp;
      <button onClick={download}>Download WAV</button>
    </>
  );
}
