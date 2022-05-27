import { applyFunctionToAllChannels } from "./utils";

export function getSpeedMultiplier(speed: number) {
  if (speed >= 0) {
    return 1 / (speed + 1);
  }
  return Math.sqrt(-speed) + 1;
}

function adjustChannelSpeed(channelData: Float32Array, multiplier: number) {
  const newData = new Float32Array(Math.round(channelData.length * multiplier));
  for (let i = 0; i < newData.length; i++) {
    newData[i] = channelData[Math.round(i / multiplier)];
  }
  return newData;
}

export function adjustAudioSpeed(audioData: AudioBuffer, speed: number) {
  if (speed === 0) {
    return audioData;
  }
  const multiplier = getSpeedMultiplier(speed);
  if (multiplier === 1) {
    return audioData;
  }
  return applyFunctionToAllChannels(audioData, (channelData) =>
    adjustChannelSpeed(channelData, multiplier),
  );
}
