/*
 * @Author: zjr
 * @Date: 2022-04-21 09:24:10
 * @LastEditTime: 2022-05-24 11:15:44
 * @Description:
 * @LastEditors: zjr
 */

import styles from '../index.module.less'

const DynamicContent = (props: Record<string, any>) => {
  const { title, type } = props
  const scdList = [
    { id: 'PD202203050121', time: '2022-05-08', type: 1 },
    { id: 'PD202203050212', time: '2022-05-11', type: 2 },
    { id: 'PD202203050513', time: '2022-05-21', type: 1 }
  ]
  const scrwList = [
    { id: 'PD202203050222', time: '2022-05-01 09:34' },
    { id: 'PD202203050672', time: '2022-05-11 09:40' },
    { id: 'PD202203050672', time: '2022-05-17 09:51' },
    { id: 'PD202203050222', time: '2022-05-01 09:34' },
    { id: 'PD202203050672', time: '2022-05-11 09:40' },
    { id: 'PD202203050672', time: '2022-05-17 09:51' },
    { id: 'PD202203050271', time: '2022-05-20 10:56' }
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
