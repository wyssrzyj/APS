/*
 * @Author: your name
 * @Date: 2022-03-10 15:20:21
 * @LastEditTime: 2022-04-29 16:27:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jack-aps\src\pages\practice\progressTracking\schedulingResults\index.tsx
 */
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { Title } from '@/components'
import { practice } from '@/recoil/apis'

import Custom from './custom/index'
import Dhx from './dhx/index'
import Dome from './dome/index'
import Forms from './forms'
import GattChart from './ganttChart/index'
import styles from './index.module.less'
import Load from './load/index'
import Slide from './slide/index'
import Tbale from './tbale'
import VirtuaIList from './VirtuaIList'
import VirtuaIListX from './VirtuaIListX'
const SchedulingResults = () => {
  const [sum, setSum] = useState(1)
  const [params, setParams] = useState<any>({})
  const [list, setList] = useState<any>([])

  const { teamLoadDiagram } = practice

  //头部form的数据
  const FormData = (e: any) => {
    console.log(e)
    setParams(e)
  }
  useEffect(() => {
    if (!isEmpty(params)) {
      executionMethod(params)
    }
  }, [params])
  const executionMethod = async (e) => {
    console.log(e)
    const res = await teamLoadDiagram({ factoryId: e })
    if (res.code === 200) {
      setList(res.data)
    }
  }

  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'班组负荷图'} />
      </div>
      <Forms FormData={FormData}></Forms>
      <div id="c1"></div>
      <Tbale load={list} />
    </div>
  )
}

export default SchedulingResults
