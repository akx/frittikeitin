import { applyFunctionToAllChannels } from "./utils";

function rearrangeMono(chanData: Float32Array, indices: readonly number[]) {
  const newData = new Float32Array(chanData.length);
  for (let i = 0; i < chanData.length; i++) {
    const srcIndex = (i + indices[i % indices.length]) % chanData.length;
    newData[i] = chanData[srcIndex];
  }
  return newData;
}

function processArrange(rearrange: string): number[] {
  const rawArrangeIndices = Array.from(rearrange).map((c) => c.charCodeAt(0));
  const minIndex = Math.min(...rawArrangeIndices);
  return rawArrangeIndices.map((c) => c - minIndex);
}

export default function rearrangeAudio(
  audioData: AudioBuffer,
  rearrange: string,
) {
  if (rearrange === "") {
    return audioData;
  }
  const arrangeIndices = processArrange(rearrange);
  return applyFunctionToAllChannels(audioData, (chanData) =>
    rearrangeMono(chanData, arrangeIndices),
  );
}
