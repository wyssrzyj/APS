/*
 * @Author: zjr
 * @Date: 2022-04-21 09:24:10
 * @LastEditTime: 2022-05-23 16:55:27
 * @Description:
 * @LastEditors: zjr
 */
import { Col, Divider, Row, Space } from 'antd'
import { useEffect, useLayoutEffect, useRef } from 'react'

import { Title } from '@/components'

import DynamicContent from './components/dynamicContent'
import DynamicTable from './components/dynamicTable'
import styles from './index.module.less'
const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(containerRef.current.clientWidth)
  }, [containerRef.current])

  return (
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
        <DynamicTable title="齐套生产单库存变动查询" key="productChangeTable" />
      </div>
    </div>
  )
}

export default Home
