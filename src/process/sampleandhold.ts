import { applyFunctionToAllChannels } from "./utils";

export function sampleAndHoldAudio(buf: AudioBuffer, sampleAndHold: number) {
  if (sampleAndHold <= 0) {
    return buf;
  }
  return applyFunctionToAllChannels(buf, (channel) => {
    channel = new Float32Array(channel);
    let samp = 0;
    for (let i = 0; i < buf.length; i++) {
      if (i % sampleAndHold === 0) {
        samp = channel[i];
      }
      channel[i] = samp;
    }
    return channel;
  });
}
