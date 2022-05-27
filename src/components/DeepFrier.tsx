import React from "react";
import rearrangeAudio from "../process/rearrange";
import clawAudio from "../process/claw";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
import { Viewer } from "./Viewer";
import { Player } from "./Player";
import powerDistortAudio from "../process/powerdisto";
import clipAudio from "../process/clip";
import biasAudio from "../process/bias";
import { sampleAndHoldAudio } from "../process/sampleandhold";
import { adjustAudioSpeed, getSpeedMultiplier } from "../process/speed";

export function DeepFrier({
  audioData,
  audioContext,
}: {
  audioData: AudioBuffer;
  audioContext: AudioContext;
}) {
  const [speed, setSpeed] = React.useState(0);
  const [clawCount, setClawCount] = React.useState(0);
  const [clawInterval, setClawInterval] = React.useState(0);
  const [rearrangePattern, setRearrangePattern] = React.useState("");
  const [rearrangeBlockSize, setRearrangeBlockSize] = React.useState(1);
  const [sampleAndHold, setSampleAndHold] = React.useState(0);
  const [powerDistortion, setPowerDistortion] = React.useState(0);
  const [bias, setBias] = React.useState(0);
  const [clipMin, setClipMin] = React.useState(-1);
  const [clipMax, setClipMax] = React.useState(+1);

  const friedAudio = React.useMemo(() => {
    const sped = adjustAudioSpeed(audioData, speed);
    const clawed = clawAudio(sped, clawCount, clawInterval);
    const rearranged = rearrangeAudio(
      clawed,
      rearrangePattern,
      rearrangeBlockSize,
    );
    const sandhed = sampleAndHoldAudio(rearranged, sampleAndHold);
    const biased = biasAudio(sandhed, bias);
    const powered = powerDistortAudio(biased, powerDistortion);
    const clipped = clipAudio(powered, clipMin, clipMax);
    return clipped;
  }, [
    audioData,
    bias,
    clawCount,
    clawInterval,
    clipMax,
    clipMin,
    powerDistortion,
    rearrangePattern,
    rearrangeBlockSize,
    sampleAndHold,
    speed,
  ]);

  return (
    <div>
      <div className="controls">
        <NumberInput
          label={`Speed (${getSpeedMultiplier(speed).toFixed(2)}x)`}
          min={-10}
          max={15.0}
          step="0.01"
          value={speed}
          slider
          onChange={setSpeed}
        />
        <NumberInput
          label="Claw Count"
          min={0}
          max={10}
          value={clawCount}
          onChange={setClawCount}
        />
        <NumberInput
          label="Claw Interval"
          min={0}
          max={10000}
          value={clawInterval}
          onChange={setClawInterval}
        />
        <TextInput
          label="Rearrange pattern"
          value={rearrangePattern}
          onChange={setRearrangePattern}
        />
        <NumberInput
          label="Rearrange block size"
          min={1}
          max={10000}
          value={rearrangeBlockSize}
          onChange={setRearrangeBlockSize}
        />
        <NumberInput
          label="Sample and hold"
          min={0}
          max={10000}
          value={sampleAndHold}
          onChange={setSampleAndHold}
        />
        <NumberInput
          label="Bias"
          min={-2.0}
          max={2.0}
          step="0.01"
          value={bias}
          slider
          onChange={setBias}
        />
        <NumberInput
          label="Power Distortion"
          min={-20}
          max={20}
          step="any"
          value={powerDistortion}
          slider
          onChange={setPowerDistortion}
        />

        <NumberInput
          label="Clip Min"
          min={-1}
          max={1}
          step="any"
          value={clipMin}
          slider
          onChange={setClipMin}
        />
        <NumberInput
          label="Clip Max"
          min={-1}
          max={1}
          step="any"
          value={clipMax}
          slider
          onChange={setClipMax}
        />
      </div>

      <Viewer audioData={friedAudio} />
      <br />
      <Player audioData={friedAudio} audioContext={audioContext} />
    </div>
  );
}
