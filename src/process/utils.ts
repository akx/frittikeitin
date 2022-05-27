export function applyFunctionToAllChannels(
  audioData: AudioBuffer,
  func: (data: Float32Array) => Float32Array,
) {
  let newAudioData: AudioBuffer | undefined;
  for (let i = 0; i < audioData.numberOfChannels; i++) {
    const chanData = audioData.getChannelData(i);
    const newChanData = func(chanData);
    if (!newAudioData) {
      newAudioData = new AudioBuffer({
        length: newChanData.length,
        numberOfChannels: audioData.numberOfChannels,
        sampleRate: audioData.sampleRate,
      });
    }
    newAudioData.copyToChannel(newChanData, i);
  }
  if (!newAudioData) {
    throw new Error("No new audio data");
  }
  return newAudioData;
}
