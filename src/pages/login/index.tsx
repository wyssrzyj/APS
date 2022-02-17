import { Outlet, useNavigate } from 'react-router-dom'

import styles from './index.module.less'

const LoginAndRegister = () => {
  const navigate = useNavigate()

  const toHome = () => {
    navigate('/')
  }

  return (
    <div className={styles.content}>
      <div className={styles.editionCenter}>
        <div className={styles.banner}>
          <div onClick={toHome} className={styles.bannerLeft}></div>
          <div className={styles.location}>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginAndRegister
