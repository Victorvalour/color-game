import { useState, useEffect } from "react"
import styles from "./BackgroundAnimation.module.css"

type AnimationType = "lasers" | "rain" | "shapes"

interface BackgroundAnimationProps {
  type: AnimationType
}

export default function BackgroundAnimation({ type }: BackgroundAnimationProps) {
  const [elements, setElements] = useState<JSX.Element[]>([])

  useEffect(() => {
    let newElements: JSX.Element[] = []

    switch (type) {
      case "lasers":
        newElements = Array.from({ length: 10 }, (_, i) => (
          <div key={`laser-${i}`} className={`${styles.laser} ${styles[`laser${i % 5}`]}`} />
        ))
        break
      case "rain":
        newElements = Array.from({ length: 50 }, (_, i) => (
          <div key={`raindrop-${i}`} className={`${styles.raindrop} ${styles[`raindrop${i % 3}`]}`} />
        ))
        break
      case "shapes":
        newElements = Array.from({ length: 20 }, (_, i) => (
          <div key={`shape-${i}`} className={`${styles.shape} ${styles[`shape${i % 4}`]}`} />
        ))
        break
    }

    setElements(newElements)
  }, [type])

  return <div className={styles.backgroundAnimation}>{elements}</div>
}

