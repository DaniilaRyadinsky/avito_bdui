import styles from './ComponentsWidget.module.css'

const ComponentsWidget = () => {
  return (
    <div className={styles.container}>
        <details>
          <summary>Базовые компоненты</summary>
        </details>
        <details>
          <summary>Шаблоны</summary>
        </details>
    </div>
  )
}

export default ComponentsWidget