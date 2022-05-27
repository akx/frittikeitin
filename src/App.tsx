import React from "react";
import { DeepFrier } from "./components/DeepFrier";
import mikkoURL from "./samples/mikko_alafriteeraaminuakiitosenpidakorkeistalampotiloist178e5bc895f81de0c92caeb87009cc0d.mp3";

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

  async function loadExampleSound(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const res = await fetch(mikkoURL);
    const arr = await res.arrayBuffer();
    const audio = await audioContext.decodeAudioData(arr);
    setAudioData(audio);
  }

  return (
    <div className="App">
      <h1>frittikeitin</h1>
      <div className="df-input df-file">
        <label>Select audio file</label>
        <input type="file" onChange={handleFile} />
      </div>
      {!audioData ? (
        <div>
          (or{" "}
          <a href="#" onClick={loadExampleSound}>
            load an example sound
          </a>
          )
        </div>
      ) : null}
      {error ? <div className="df-error">{error}</div> : null}
      {audioData ? (
        <DeepFrier audioContext={audioContext} audioData={audioData} />
      ) : null}
    </div>
  );
}

export default App;
