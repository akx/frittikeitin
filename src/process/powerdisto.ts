import { applyFunctionToAllChannels } from "./utils";

function distortMono(channelData: Float32Array, power: number) {
  const newData = new Float32Array(channelData);
  if (power < 0) power = 1 / -power;
  for (let i = 0; i < newData.length; i++) {
    newData[i] = Math.pow(newData[i], power);
  }
  return newData;
}

export default function powerDistortAudio(
  audio: AudioBuffer,
  powerDistortion: number,
) {
  if (powerDistortion === 0) {
    return audio;
  }
  return applyFunctionToAllChannels(audio, (channelData) =>
    distortMono(channelData, powerDistortion),
  );
}
