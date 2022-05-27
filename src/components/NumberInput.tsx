import React from "react";

export default function NumberInput({
  label,
  min,
  max,
  step,
  value,
  onChange,
  slider,
}: {
  label: string;
  min: number;
  max: number;
  step?: number | string;
  value: number;
  onChange: (value: number) => void;
  slider?: boolean;
}) {
  return (
    <div className="df-input df-input-number">
      <label>{label}</label>
      <input
        type={slider ? "range" : "number"}
        min={min}
        max={max}
        step={step}
        value={value}
        title={slider ? String(value) : undefined}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}
