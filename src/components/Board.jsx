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
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function Board({ theme, players, gridSize }) {
  const [cards, setCards] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const faceUpCards = (id) => {
    if (isBusy) return;

    const currentCard = cards[id];
    if (currentCard.faceUp || currentCard.matched) return;

    const newCards = [...cards];
    newCards[id].faceUp = true;
    setCards(newCards);

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

  useEffect(() => {
    let grid;
    if (theme === "Numbers") {
      grid = gridSize === "4x4" ? [...grid4] : [...grid6];
    } else {
      grid = gridSize === "4x4" ? [...iconsGrid4] : [...iconsGrid6];
    }

    shuffleArray(grid);
    const cardsArray = grid.map((item, index) => ({
      id: index,
      value: item,
      faceUp: false,
      matched: false,
      player: null,
    }));
    setCards(cardsArray);
    setIsBusy(false);
  }, [gridSize, theme]);

  return (
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
  );
}
