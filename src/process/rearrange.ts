import { applyFunctionToAllChannels } from "./utils";

function rearrangeMono(
  chanData: Float32Array,
  indices: readonly number[],
  blockSize: number,
) {
  const newData = new Float32Array(chanData.length);
  let p = 0;
  for (let bufPos = 0; bufPos < chanData.length; ) {
    const index = indices[p % indices.length];
    const startPos = bufPos + index * blockSize;
    const endPos = startPos + blockSize;
    newData.set(chanData.subarray(startPos, endPos), bufPos);
    bufPos += blockSize;
    p++;
  }
  return newData;
}

function convertArrangePattern(rearrange: string): number[] {
  const rawArrangeIndices = Array.from(rearrange).map((c) => c.charCodeAt(0));
  const minIndex = Math.min(...rawArrangeIndices);
  return rawArrangeIndices.map((c) => c - minIndex);
}

export default function rearrangeAudio(
  audioData: AudioBuffer,
  patternString: string,
  blockSize: number,
) {
  if (patternString === "" || blockSize <= 0) {
    return audioData;
  }
  const arrangeIndices = convertArrangePattern(patternString);
  return applyFunctionToAllChannels(audioData, (chanData) =>
    rearrangeMono(chanData, arrangeIndices, blockSize),
  );
}
