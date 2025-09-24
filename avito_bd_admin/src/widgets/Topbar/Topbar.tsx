import styles from './Topbar.module.css'
import logo from '../../shared/assets/icons/logo.svg'

const Topbar = () => {
  return (
    <div className={styles.topbar}>
        <img src={logo} className={styles.logo}/>
    </div>
  )
}

export default Topbar