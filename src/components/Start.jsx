import React from 'react'

export default function Start({ theme, setTheme, players, setPlayers, gridSize, setGridSize, setStage }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-white text-lg font-semibold mb-6 tracking-wider">memory</h1>
    <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center">
      <div className="mb-4">
        <p className="text-gray-500 text-sm mb-2">Select Theme</p>
        <div className="flex gap-3 bg-gray-200 p-1 rounded-full">
          {["Numbers", "Icons"].map((option) => (
            <button
              key={option}
              className={`w-1/2 px-4 py-2 rounded-full font-medium transition ${
                theme === option
                  ? "bg-gray-700 text-white"
                  : "text-gray-500 hover:bg-gray-300"
              }`}
              onClick={() => setTheme(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Players Selection */}
      <div className="mb-4">
        <p className="text-gray-500 text-sm mb-2">Number of Players</p>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`w-12 h-12 flex items-center justify-center rounded-full font-medium transition ${
                players === num
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              onClick={() => setPlayers(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Size Selection */}
      <div className="mb-4">
        <p className="text-gray-500 text-sm mb-2">Grid Size</p>
        <div className="flex gap-3 bg-gray-200 p-1 rounded-full">
          {["4x4", "6x6"].map((size) => (
            <button
              key={size}
              className={`w-1/2 px-4 py-2 rounded-full font-medium transition ${
                gridSize === size
                  ? "bg-gray-700 text-white"
                  : "text-gray-500 hover:bg-gray-300"
              }`}
              onClick={() => setGridSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Start Game Button */}
      <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-full mt-3 transition hover:bg-orange-600 hover:scale-105 cursor-pointer" onClick={() => setStage("game")}>
        Start Game
      </button>
    </div>
  </div>
  )
}
