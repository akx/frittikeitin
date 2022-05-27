import React from "react";
import { DeepFrier } from "./components/DeepFrier";

function App() {
  const [audioContext] = React.useState(() => new AudioContext());
  const [audioData, setAudioData] = React.useState<AudioBuffer | null>(null);
  const [error, setError] = React.useState("");

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target?.files?.[0];
    if (!file) return;
    try {
      const data = await audioContext.decodeAudioData(await file.arrayBuffer());
      setAudioData(data);
    } catch (err) {
      setError(String(err));
    }
  }

  return (
    <div className="App">
      <h1>frittikeitin</h1>
      <div className="df-input df-file">
        <label>Select audio file</label>
        <input type="file" onChange={handleFile} />
      </div>
      {error ? <div className="df-error">{error}</div> : null}
      {audioData ? (
        <DeepFrier audioContext={audioContext} audioData={audioData} />
      ) : null}
    </div>
  );
}

export default App;
