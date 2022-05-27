import { applyFunctionToAllChannels } from "./utils";

function distortMono(channelData: Float32Array, power: number) {
  const newData = new Float32Array(channelData);
  if (power < 0) power = 1 / -power;
  else power = 1 / power;
  for (let i = 0; i < newData.length; i++) {
    const sign = newData[i] < 0 ? -1 : 1;
    const val = Math.pow(newData[i] * sign, power) * sign;
    newData[i] = isNaN(val) ? 0 : val;
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
