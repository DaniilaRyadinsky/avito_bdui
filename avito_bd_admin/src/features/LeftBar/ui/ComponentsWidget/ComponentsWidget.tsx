import Component from '../../../../shared/ui/Component/Component'
import styles from './ComponentsWidget.module.css'

import arrow from '../../../../shared/assets/icons/arrow.svg'

const ComponentsWidget = () => {
  return (
    <div className={styles.container}>
      <details className={styles.details} open>
        <summary><div className={styles.details_title_container}>Базовые компоненты<img className={styles.arrow} src={arrow} /></div></summary>
        <div>
          <Component />
        </div>
      </details>
      <details className={styles.details} open>
        <summary><div className={styles.details_title_container}>Шаблоны<img className={styles.arrow} src={arrow} /></div></summary>
        <div>
          <Component />
        </div>
      </details>
    </div>
  )
}

export default ComponentsWidget