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
  const [playing, setPlaying] = React.useState(false);

  const play = React.useCallback(() => {
    if (lastSourceRef.current) {
      lastSourceRef.current.stop();
    }
    const source = audioContext.createBufferSource();
    source.buffer = audioData;
    source.connect(audioContext.destination);
    source.start();
    setPlaying(true);
    source.addEventListener("ended", () => {
      if (lastSourceRef.current === source) {
        setPlaying(false);
        lastSourceRef.current = null;
      }
    });
    lastSourceRef.current = source;
  }, [audioContext, audioData]);

  const stop = React.useCallback(() => {
    if (lastSourceRef.current) {
      lastSourceRef.current.stop();
      lastSourceRef.current = null;
      setPlaying(false);
    }
  }, []);

  const download = React.useCallback(() => {
    const blob = encodeToWavBlob(audioData);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "friteerattu.wav";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [audioData]);

  return (
    <>
      <button onClick={play}>Play ({audioData.duration.toFixed(2)}s)</button>
      &nbsp;
      <button onClick={stop} disabled={!playing}>
        Stop
      </button>
      &nbsp;
      <button onClick={download}>Download WAV</button>
    </>
  );
}
