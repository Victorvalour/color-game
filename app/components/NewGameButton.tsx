import styles from "./NewGameButton.module.css"

interface NewGameButtonProps {
  onClick: () => void
}

export default function NewGameButton({ onClick }: NewGameButtonProps) {
  return (
    <button data-testid="newGameButton" className={styles.newGameButton} onClick={onClick}>
      New Game
    </button>
  )
}

