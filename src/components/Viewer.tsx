import React from "react";

export function Viewer({ audioData }: { audioData: AudioBuffer }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const width = 500;
  const height = 200;
  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const halfHeight = height / 2;
    ctx.clearRect(0, 0, width, height);
    const data = audioData.getChannelData(0);
    const step = Math.ceil(data.length / width);
    for (let i = 0, x = 0; i < data.length; i += step, x++) {
      const block = Array.from(data.subarray(i, i + step));
      const min = Math.min(...block);
      const max = Math.max(...block);
      const top = halfHeight - max * halfHeight - 0.2;
      const bottom = halfHeight - min * halfHeight + 0.2;
      ctx.fillRect(x, top + 0.5, 1, bottom - top);
    }
  }, [width, height, audioData]);
  return <canvas ref={canvasRef} width={width} height={height} />;
}
