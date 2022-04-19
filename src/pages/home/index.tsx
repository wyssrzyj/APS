// import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
// import 'dhtmlx-gantt/codebase/locale/locale_cn' // 本地化

import { Button } from 'antd'
//----------------
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { commonState, dockingData } from '@/recoil'
import { dockingDataApis } from '@/recoil/apis'

import styles from './index.module.less'

const Home = () => {
  //设置可读可写
  const [value, setValue] = useRecoilState(commonState.textState)
  const [name, setName] = useRecoilState(commonState.lyj)

  //Mes数据
  const [FactoryData, setFactoryData] = useRecoilState(
    dockingData.globalFactoryData
  ) //工厂列表

  const executionMethod = () => {
    setName('练习传递显示')
  }
  const { factoryList, workshopList, teamList, shiftTree } = dockingDataApis
  useEffect(() => {
    dataDictionary()
  }, [])
  const dataDictionary = async () => {
    // setName('初始值')
    const factoryData = await factoryList() //工厂列表
    setFactoryData(factoryData)
    console.log('工厂列表', factoryData)
  }
  return (
    // 多个样式处理方法classNames 可使用三元.
    <div>
      <input
        value={'练习传递显示'}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={executionMethod}>存全局的数据</button>
      {/* 获取全局数据 */}
      <div>lyj8848：{name}</div>
      <br />
      {/* <div>全局 【字典数据测试】{text}</div> */}
    </div>
  )
}

export default Home
