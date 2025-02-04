import styles from "./ColorBox.module.css"

interface ColorBoxProps {
  color: string
}

export default function ColorBox({ color }: ColorBoxProps) {
  return (
    <div className={styles.colorBoxContainer}>
      <div data-testid="colorBox" className={styles.colorBox} style={{ backgroundColor: color }}></div>
    </div>
  )
}

