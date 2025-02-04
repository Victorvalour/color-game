import styles from "./ColorOptions.module.css"

interface ColorOptionsProps {
  options: string[]
  onGuess: (color: string) => void
}

export default function ColorOptions({ options, onGuess }: ColorOptionsProps) {
  return (
    <div className={styles.optionsContainer}>
      {options.map((color, index) => (
        <button
          key={index}
          data-testid="colorOption"
          className={styles.colorOption}
          style={{
            backgroundColor: color,
            transform: `rotate(${index * (360 / options.length)}deg) translate(140px) rotate(-${index * (360 / options.length)}deg)`,
          }}
          onClick={() => onGuess(color)}
        ></button>
      ))}
    </div>
  )
}

