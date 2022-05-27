import { applyFunctionToAllChannels } from "./utils";

function clipMono(data: Float32Array, min: number, max: number): Float32Array {
  data = new Float32Array(data);
  for (let i = 0; i < data.length; i++) {
    if (data[i] > max) {
      data[i] = max;
    } else if (data[i] < min) {
      data[i] = min;
    }
  }
  return data;
}

export default function clipAudio(buf: AudioBuffer, min: number, max: number) {
  return applyFunctionToAllChannels(buf, (b) => clipMono(b, min, max));
}
