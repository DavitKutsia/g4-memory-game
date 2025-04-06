import React from 'react'

export default function Header({ stage, setStage, onRestart }) {
  return (
    <header className={`${stage === "start" ? "hidden" : ""} w-full h[20dvh] flex items-center justify-between pt-20 px-65`}>
      <h1 className='text-[#152938] text-5xl font-bold'>memory</h1>
      <div className='flex gap-4'>
        <button onClick={onRestart} className='w-[140px] h-[52px] bg-[#FDA214] text-[#FCFCFC] font-bold text-lg cursor-pointer rounded-3xl hover:bg-[#FFB84A] transition-all duration-300'>
          Restart
        </button>
        <button onClick={() => setStage('start')} className='w-[140px] h-[52px] bg-[#DFE7EC] text-[#304859] font-bold text-lg cursor-pointer rounded-3xl hover:bg-[#6395B8] hover:text-[#FCFCFC] transition-all duration-300'>
          New Game
        </button>
      </div>
    </header>
  )
}