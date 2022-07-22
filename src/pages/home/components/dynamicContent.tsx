/*
 * @Author: zjr
 * @Date: 2022-04-21 09:24:10
 * @LastEditTime: 2022-07-22 15:53:46
 * @Description:
 * @LastEditors: lyj
 */

import { Empty } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { productionSingleApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import styles from '../index.module.less'
const { proSingleDynamic, proTaskDynamic } = productionSingleApis
const DynamicContent = (props: Record<string, any>) => {
  const { title, type } = props
  const [dataList, setDataList] = useState<any>(null)
  const currentUser = localStorage.getItem('currentUser')

  useEffect(() => {
    if (currentUser != null) {
      ;(async () => {
        const params = { pageSize: 7, pageNum: 1 }
        try {
          const res: any =
            type === 'manufactureOrder'
              ? await proSingleDynamic(params)
              : await proTaskDynamic(params)
          setDataList(res.records || [])
        } catch (err) {
          setDataList([])
        }
      })()
    }
  }, [currentUser])
  return (
    <div className={styles.dynamicContent}>
      <header>{title}</header>

      <section>
        {type === 'manufactureOrder' &&
          dataList !== null &&
          (dataList.length ? (
            dataList.map((item, index) => {
              return (
                <div key={index} className={styles.listItemContainer}>
                  <div
                    className={
                      item.status === 1 ? styles.complete : styles.delay
                    }
                  ></div>
                  <div>
                    <span>
                      {item.factoryName}:{item.externalProduceOrderNum}
                    </span>
                    生产单{item.status === 1 ? '已完成' : '已延期'}
                    {item.time && moment(item.time).format('YYYY-MM-DD')}
                  </div>
                </div>
              )
            })
          ) : (
            <Empty />
          ))}
        {type === 'manufactureTask' &&
          dataList !== null &&
          (dataList.length ? (
            dataList.map((item, index) => {
              return (
                <div key={index} className={styles.listItemContainer}>
                  <div className={styles.complete}></div>
                  <div>
                    <span>
                      {item.factoryName}:{item.externalProduceOrderNum}
                    </span>
                    生产单完成{item.section}任务
                    {item.finishTime &&
                      moment(item.finishTime).format('YYYY-MM-DD HH:mm')}
                  </div>
                </div>
              )
            })
          ) : (
            <Empty />
          ))}
      </section>
    </div>
  )
}

export default DynamicContent
