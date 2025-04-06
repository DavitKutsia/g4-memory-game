import { useState } from 'react'
import './index.css'
import Start from './components/Start';
import Board from './components/Board';
import Header from './components/Header';

function App() {
  const [stage, setStage] = useState("start");
  const [theme, setTheme] = useState("Numbers");
  const [players, setPlayers] = useState(1);
  const [gridSize, setGridSize] = useState("4x4");
  const [resetKey, setResetKey] = useState(0);

  const handleRestart = () => {
    setResetKey(prev => prev + 1); 
  };

  return (
    <div>
      <Header stage={stage} setStage={setStage} onRestart={handleRestart} />
      <main className={`${stage === "start" ? "bg-[#1c2b38] min-h-[100dvh]" : "bg-white min-h-[80dvh]"} w-full flex items-center justify-center`}>
        {stage === "start" && <Start theme={theme} setTheme={setTheme} players={players} setPlayers={setPlayers} gridSize={gridSize} setGridSize={setGridSize} setStage={setStage} />}
        {stage === "game" && <Board theme={theme} players={players} gridSize={gridSize} resetKey={resetKey}/>}
      </main>
    </div>
  );
}

export default App;