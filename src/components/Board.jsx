import React, { useEffect, useState } from 'react'

const grid4 = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
const grid6 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
];

const iconsGrid4 = [
  './icons/apple.svg',
  './icons/behance.svg',
  './icons/discord.svg',
  './icons/facebook-messenger.svg',
  './icons/github.svg',
  './icons/google.svg',
  './icons/facebook.svg',
  './icons/instagram.svg',
  './icons/apple.svg',
  './icons/behance.svg',
  './icons/discord.svg',
  './icons/facebook-messenger.svg',
  './icons/github.svg',
  './icons/google.svg',
  './icons/facebook.svg',
  './icons/instagram.svg',
];

const iconsGrid6 = [
  './icons/apple.svg',
  './icons/behance.svg',
  './icons/discord.svg',
  './icons/facebook-messenger.svg',
  './icons/github.svg',
  './icons/google.svg',
  './icons/facebook.svg',
  './icons/instagram.svg',
  './icons/linkedin.svg',
  './icons/photoshop.svg',
  './icons/pinterest.svg',
  './icons/telegram.svg',
  './icons/twitter.svg',
  './icons/tik-tok.svg',
  './icons/vk.svg',
  './icons/whatsapp.svg',
  './icons/bitcoin.svg',
  './icons/spotify.svg',
  './icons/apple.svg',
  './icons/behance.svg',
  './icons/discord.svg',
  './icons/facebook-messenger.svg',
  './icons/github.svg',
  './icons/google.svg',
  './icons/facebook.svg',
  './icons/instagram.svg',
  './icons/linkedin.svg',
  './icons/photoshop.svg',
  './icons/pinterest.svg',
  './icons/telegram.svg',
  './icons/twitter.svg',
  './icons/tik-tok.svg',
  './icons/vk.svg',
  './icons/whatsapp.svg',
  './icons/bitcoin.svg',
  './icons/spotify.svg',
];

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Board({ theme, players, gridSize, resetKey }) {
  const [cards, setCards] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resetKey]);

  // Reset game when gridSize, theme, or resetKey changes
  useEffect(() => {
    let grid;
    if (theme === "Numbers") {
      grid = gridSize === "4x4" ? [...grid4] : [...grid6];
    } else {
      grid = gridSize === "4x4" ? [...iconsGrid4] : [...iconsGrid6];
    }

    const shuffledGrid = shuffleArray(grid);
    const cardsArray = shuffledGrid.map((item, index) => ({
      id: index,
      value: item,
      faceUp: false,
      matched: false,
      player: null,
    }));
    
    setCards(cardsArray);
    setIsBusy(false);
    setMoves(0);
    setSeconds(0);
  }, [gridSize, theme, resetKey]);

  const formatTime = () => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const faceUpCards = (id) => {
    if (isBusy) return;

    const currentCard = cards[id];
    if (currentCard.faceUp || currentCard.matched) return;

    const newCards = [...cards];
    newCards[id].faceUp = true;
    setCards(newCards);
    setMoves(moves + 1);

    const faceUpUnmatchedCards = newCards.filter(c => c.faceUp && !c.matched);

    if (faceUpUnmatchedCards.length === 2) {
      setIsBusy(true);

      const [first, second] = faceUpUnmatchedCards;

      if (first.value === second.value) {
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[first.id].matched = true;
          updatedCards[second.id].matched = true;

          const randomPlayer = players[Math.floor(Math.random() * players.length)];
          updatedCards[first.id].player = randomPlayer;
          updatedCards[second.id].player = randomPlayer;

          setCards(updatedCards);
          setIsBusy(false);
        }, 500);
      } else {
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[first.id].faceUp = false;
          updatedCards[second.id].faceUp = false;
          setCards(updatedCards);
          setIsBusy(false);
        }, 500);
      }
    }
  };

  return (
    <div className='flex w-full h-[100dvh] flex-col items-center justify-center'>
      <div
        className={`${
          gridSize === "4x4" ? "grid-cols-4" : "grid-cols-6"
        } grid bg-gray-100 gap-8.5 w-auto h-auto p-12 rounded-3xl place-items-center`}
      >
        {cards.map((card) => (
          <div key={card.id}>
            {card.faceUp ? (
              <div
                className={`w-[85px] h-[85px] text-[#FCFCFC] font-bold text-2xl p-2 flex flex-col items-center justify-center cursor-pointer rounded-full ${
                  card.matched ? 'bg-[#FDA214]' : 'bg-[#BCCED9]'
                }`}
              >
                {theme === "Numbers" ? (
                  card.value
                ) : (
                  <img
                    src={card.value}
                    alt="icon"
                    className="w-10 h-10 object-contain"
                  />
                )}
                {card.matched && card.player && (
                  <span className="text-xs mt-1">{card.player}</span>
                )}
              </div>
            ) : (
              <div
                onClick={() => faceUpCards(card.id)}
                className="w-[85px] h-[85px] bg-[#304859] flex items-center justify-center cursor-pointer p-2 rounded-full hover:scale-105 transition-all duration-300"
              >
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='flex w-full h-auto gap-10 items-center justify-center mt-10'>
        <div className='w-[250px] h-[70px] bg-[#DFE7EC] rounded-xl flex items-center justify-between p-10 font-mono font-bold'>
          <span className='text-[#7191A5] text-xl'>Time </span>
          <span className='text-[#304859] text-2xl'>{formatTime()}</span>
        </div>
        <div className='w-[250px] h-[70px] bg-[#DFE7EC] rounded-xl flex items-center justify-between p-10 font-mono font-bold'>
          <span className='text-[#7191A5] text-xl'>Moves </span>
          <span className='text-[#304859] text-2xl'>{moves}</span>
        </div>
      </div>
    </div>
  );
}