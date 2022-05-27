import { applyFunctionToAllChannels } from "./utils";

export default function biasAudio(buffer: AudioBuffer, bias: number) {
  return applyFunctionToAllChannels(buffer, (d) => {
    d = new Float32Array(d);
    for (let i = 0; i < d.length; i++) {
      d[i] = d[i] + bias;
    }
    return d;
  });
}
