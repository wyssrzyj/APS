/*
 * @Author: lyj
 * @Date: 2022-06-01 17:37:07
 * @LastEditTime: 2022-07-19 09:13:46
 * @Description:
 * @LastEditors: lyj
 */

import { useState } from 'react'

import Forms from './forms'
import styles from './index.module.less'
const SchedulingResults = () => {
  const [formData, setFormData] = useState() //form数据.

  const FormData = (e: any) => {
    setFormData(e)
  }
  return (
    <div className={styles.qualification}>
      <Forms FormData={FormData}></Forms>
      <div className={styles.ganttContent}>
        <iframe
          frameBorder="0"
          title={'resourcedMap'}
          className={styles.dome}
          src={`/iframeDate?id=${formData}&type=resourcedMap`}
        ></iframe>
      </div>
    </div>
  )
}

export default SchedulingResults
