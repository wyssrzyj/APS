
import { Col, Divider, Row, Space } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import { useHistory } from 'react-router'
import { useLocation, useNavigate } from 'react-router-dom'

import { Title } from '@/components'
import { loginApis } from '@/recoil/apis'
import { clearLocalStorage } from '@/utils/tool'

import DynamicContent from './components/dynamicContent'
import DynamicTable from './components/dynamicTable'
import HomePage from './homePage/homePage'
import styles from './index.module.less'
const Home = () => {
  const navigate = useNavigate()
  const [type, setType] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { signID } = loginApis
  const { search } = location

  const [homePage, setHomePage] = useState<any>({})
  //获取
  useEffect(() => {
    if (localStorage.getItem('homePage')) {
      setHomePage(JSON.parse(localStorage.getItem('homePage')))
    }
  }, [])
  const newestHomePage = (e) => {
    const cloneHomePage = cloneDeep(e)
    setHomePage(cloneHomePage)
  }

  useEffect(() => {
    const searchURL = new URLSearchParams(search)
    const id = searchURL.get('id')
    if (id) {
      api(id)
    } else {
      //跳转至登录.
      const token = JSON.parse(localStorage.getItem('currentUser'))
      if (token) {
        setType(true)
      } else {
        navigate('/login', { replace: true })
      }
    }
  }, [])

  //mes跳转到aps页面

  const api = async (id) => {
    clearLocalStorage() //清空数据..
    await signID({ id: id }) //存登录数据..
    navigate('/home', { replace: true })
    setType(true)
  }
  return (
    <div>
      {type ? (
        <div>
          <div>
            <HomePage newestHomePage={newestHomePage} />
          </div>

          <div className={styles.outContainer} ref={containerRef}>
            <div className={styles.dynamicTableContainer}>
              <div className={styles.containerRefTop}>
                {homePage.upper[0].type === true ? (
                  <div className={styles.content}>
                    <DynamicContent
                      key="manufactureOrder"
                      title="生产单动态"
                      type="manufactureOrder"
                    />
                  </div>
                ) : null}
              </div>
              <div className={styles.containerRefTop}>
                {homePage.upper[1].type === true ? (
                  <div className={styles.content}>
                    <DynamicContent
                      key="manufactureTask"
                      title="生产任务动态"
                      type="manufactureTask"
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className={styles.dynamicTableContainer}>
              {homePage.lower[0].type === true ? (
                <div className={styles.dynamicTableContent}>
                  <DynamicTable
                    title="生产单剩余工期查询"
                    isDelay={true}
                    key="durationQuery"
                    type="durationQuery"
                  />
                </div>
              ) : null}

              {homePage.lower[1].type === true ? (
                <div className={styles.dynamicTableContent}>
                  <DynamicTable
                    title="生产延期查询"
                    isDelay={true}
                    key="productDelayTable"
                    type="productDelayTable"
                  />
                </div>
              ) : null}
              {homePage.lower[2].type === true ? (
                <>
                  <div className={styles.dynamicTableContent}>
                    <DynamicTable
                      title="齐套生产单库存变动查询"
                      isDelay={false}
                      key="productChangeTable"
                      type="productChangeTable"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Home
