"use client"

import { useState, useEffect, useCallback } from "react"
import ColorBox from "./components/ColorBox"
import ColorOptions from "./components/ColorOptions"
import GameStatus from "./components/GameStatus"
import NewGameButton from "./components/NewGameButton"
import styles from "./page.module.css"
import ConfettiCanvas from "./components/ConfettiCanvas"
import BackgroundAnimation from "./components/BackgroundAnimation"

function generateRandomColor(): string {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  )
}

export default function Home() {
  const [targetColor, setTargetColor] = useState("")
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState("")
  const [showConfetti, setShowConfetti] = useState(false);

  const generateNewGame = useCallback(() => {
    const newTargetColor = generateRandomColor()
    setShowConfetti(false);
    
    const newOptions = [newTargetColor]
    while (newOptions.length < 6) {
      const color = generateRandomColor()
      if (!newOptions.includes(color)) {
        newOptions.push(color)
      }
    }
    newOptions.sort(() => Math.random() - 0.5)
    setTargetColor(newTargetColor)
    setOptions(newOptions)
    setGameStatus("")
  }, [])

  useEffect(() => {
    generateNewGame()
  }, [generateNewGame])

  const handleGuess = (color: string) => {
    if (color === targetColor) {
      setScore(score + 1)
      setGameStatus("Correct! Great job!")
      setShowConfetti(true);
      setTimeout(generateNewGame, 1500)
    } else {
      setGameStatus("Wrong! Try again.")
    }
  }

  const handleNewGame = () => {
    generateNewGame()
    setScore(0)
  }

  return (
    <main className={styles.main}>
      <BackgroundAnimation type="rain" />
        {showConfetti && <ConfettiCanvas isActive={showConfetti} />}
      <div className={styles.gameContainer}>
        <h1 className={styles.title}>Color Guessing Game</h1>
        <p data-testid="gameInstructions" className={styles.instructions}>
          Guess the correct color!
        </p>
        <div className={styles.gameArea}>
          <ColorBox color={targetColor} />
          <ColorOptions options={options} onGuess={handleGuess} />
        </div>
       
        <GameStatus status={gameStatus} score={score} /> 
        <NewGameButton onClick={handleNewGame} />
      </div>
      
       
      
    </main>
  )
}

