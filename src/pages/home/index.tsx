/*
 * @Author: zjr
 * @Date: 2022-04-21 09:24:10
 * @LastEditTime: 2022-05-13 17:39:52
 * @Description:
 * @LastEditors: zjr
 */
import { Col, Divider, Row, Space } from 'antd'

import { Title } from '@/components'

import DynamicContent from './components/dynamicContent'
import DynamicTable from './components/dynamicTable'
import styles from './index.module.less'
const Home = () => {
  return (
    <div className={styles.outContainer}>
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
        <div>
          <DynamicTable
            title="生产延期查询"
            isDelay={true}
            key="productDelayTable"
          />
        </div>
        <div className={styles.deliverLine}></div>
        <div>
          <DynamicTable
            title="齐套生产单库存变动查询"
            key="productChangeTable"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
