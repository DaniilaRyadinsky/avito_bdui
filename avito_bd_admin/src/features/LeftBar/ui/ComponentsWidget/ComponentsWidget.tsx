// import Component from '../../../../../shared/ui/Component/Component'
import styles from './ComponentsWidget.module.css'

import arrow from '../../../../shared/assets/icons/arrow.svg'
import Summary from '../../../../shared/ui/Summary/Summary'

const ComponentsWidget = () => {
  return (
    <div className={styles.container}>
      <Summary title="Базовые компоненты" children={undefined}>
        {/* <Component /> */}
      </Summary>

      <Summary title='Шаблоны' children={undefined}>
        {/* <Component /> */}
      </Summary>

    </div>
  )
}

export default ComponentsWidget