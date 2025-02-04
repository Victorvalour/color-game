import { useEffect, useState } from "react"
import styles from "./GameStatus.module.css"

interface GameStatusProps {
  status: string
  score: number
}

export default function GameStatus({ status, score }: GameStatusProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (status) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 500)
      return () => clearTimeout(timer)
    }
  }, [status])

  return (
    <div className={styles.statusContainer}>
      <p
        data-testid="gameStatus"
        className={`${styles.status} ${status.includes("Correct") ? styles.correct : styles.wrong} ${animate ? styles.animate : ""}`}
      >
        {status}
      </p>
      <p className={styles.score}>
        Score: <span data-testid="score">{score}</span>
      </p>
    </div>
  )
}

