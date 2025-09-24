import styles from './Component.module.css'

interface IComponent {
    icon: string;
    title: string
}

const Component = () => {
  return (
    <div className={styles.component}>
        <div className={styles.component_icon}>

        </div>
        <p className={styles.component_title}>Контейнер</p>
    </div>
  )
}

export default Component