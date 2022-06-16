/*
 * @Author: zjr
 * @Date: 2022-04-21 09:24:10
<<<<<<< HEAD
 * @LastEditTime: 2022-06-16 15:53:04
=======
 * @LastEditTime: 2022-06-16 15:50:32
>>>>>>> dev_lyj
 * @Description:
 * @LastEditors: lyj
 */
import { Col, Divider, Row, Space } from 'antd'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import { useHistory } from 'react-router'
import { useLocation, useNavigate } from 'react-router-dom'

import { Title } from '@/components'
import { loginApis } from '@/recoil/apis'
import { clearLocalStorage } from '@/utils/tool'

import DynamicContent from './components/dynamicContent'
import DynamicTable from './components/dynamicTable'
import styles from './index.module.less'
const Home = () => {
  const navigate = useNavigate()
  const [type, setType] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { signID } = loginApis
  const { search } = location

  useEffect(() => {
    const searchURL = new URLSearchParams(search)
    const id = searchURL.get('id')
    if (id) {
      api(id)
    } else {
      //跳转至登录
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
    await signID({ id: id }) //存登录数据
    navigate('/home', { replace: true })
    setType(true)
  }
  return (
    <div>
      {type ? (
        <div className={styles.outContainer} ref={containerRef}>
          {/* <Title title={'首页'}></Title> */}
          <Row gutter={24}>
            <Col span={12}>
              <DynamicContent
                key="manufactureOrder"
                title="生产单动态"
                type="manufactureOrder"
              />
            </Col>
            <Col span={12}>
              <DynamicContent
                key="manufactureTask"
                title="生产任务动态"
                type="manufactureTask"
              />
            </Col>
          </Row>
          <div className={styles.dynamicTableContainer}>
            <DynamicTable
              title="生产延期查询"
              isDelay={true}
              key="productDelayTable"
            />
            <div className={styles.deliverLine}>&nbsp;</div>
            <DynamicTable
              title="齐套生产单库存变动查询"
              key="productChangeTable"
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Home
