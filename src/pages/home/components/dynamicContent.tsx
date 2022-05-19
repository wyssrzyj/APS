/*
 * @Author: zjr
 * @Date: 2022-04-21 09:24:10
 * @LastEditTime: 2022-05-12 13:16:06
 * @Description:
 * @LastEditors: zjr
 */

import { divide } from 'lodash'

import styles from '../index.module.less'

const DynamicContent = (props: Record<string, any>) => {
  const { title, type } = props
  const scdList = [
    { id: 'PD202203050122', time: '2022-05-11', type: 1 },
    { id: 'PD202203050122', time: '2022-05-10', type: 2 },
    { id: 'PD202203050122', time: '2022-05-10', type: 1 }
  ]
  const scrwList = [
    { id: 'PD202203050122', time: '2022-05-11 09:52' },
    { id: 'PD202203050122', time: '2022-05-10 09:52' },
    { id: 'PD202203050122', time: '2022-05-10 09:52' }
  ]
  return (
    <div className={styles.dynamicContent}>
      <header>{title}</header>
      <section>
        {type === 'manufactureOrder' &&
          scdList.map((item, index) => {
            return (
              <div key={index} className={styles.listItemContainer}>
                <div
                  className={item.type === 2 ? styles.delay : styles.complete}
                ></div>
                <div>
                  <span>{item.id}</span>
                  生产单{item.type === 2 ? '已延期' : '已完成'} {item.time}
                </div>
              </div>
            )
          })}
        {type === 'manufactureTask' &&
          scrwList.map((item, index) => {
            return (
              <div key={index} className={styles.listItemContainer}>
                <div className={styles.complete}></div>
                <div>
                  <span>{item.id}</span>生产单完成裁减任务
                  {item.time}
                </div>
              </div>
            )
          })}
      </section>
    </div>
  )
}

export default DynamicContent
