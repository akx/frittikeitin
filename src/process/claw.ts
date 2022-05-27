import { applyFunctionToAllChannels } from "./utils";

function clawMono(
  chanData: Float32Array,
  clawInterval: number,
  clawCount: number,
) {
  const newData = new Float32Array(chanData.length);
  let p = 0;
  for (let i = 0; i < chanData.length; i++) {
    if (i % clawInterval > clawInterval - clawCount) {
      continue;
    }
    newData[p++] = chanData[i];
  }
  return newData.subarray(0, p);
}

export default function clawAudio(
  audioData: AudioBuffer,
  clawCount: number,
  clawInterval: number,
): AudioBuffer {
  if (clawCount === 0 || clawInterval === 0) {
    return audioData;
  }
  if (clawCount >= clawInterval) {
    return audioData;
  }
  return applyFunctionToAllChannels(audioData, (chanData) =>
    clawMono(chanData, clawInterval, clawCount),
  );
}
