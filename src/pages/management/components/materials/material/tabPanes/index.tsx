/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-04-13 15:47:01
 * @LastEditors: lyj
 * @LastEditTime: 2022-06-29 15:13:56
 * @FilePath: \jack-aps\src\pages\practice\administration\components\materials\material\tabPanes\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { cloneDeep, isEmpty } from 'lodash'
import React from 'react'

import Forms from './forms'
import FormTable from './formTable/index'
import styles from './index.module.less'
function TabPanes(props: any) {
  const {
    materialList,
    index,
    analogData,
    sizeList,
    switchSave,
    select,
    setRecheckData,
    sectionPreservation
  } = props

  const saveData = (e: any, time: any) => {
    const cloneData = cloneDeep(e)
    if (!isEmpty(cloneData)) {
      cloneData[0].bottomTime = time
    }
    switchSave && switchSave(cloneData)
  }
  const recheckData = (e: any) => {
    setRecheckData && setRecheckData(e)
  }
  const workshopSection = (e) => {
    const data = cloneDeep(e)
    if (!isEmpty(data)) {
      data.map((item) => {
        item.id = null
      })
      sectionPreservation && sectionPreservation(data)
    } else {
      sectionPreservation && sectionPreservation(data)
    }
  }

  return (
    <div>
      <Forms list={materialList[index]} />
      <div className={styles.container}>
        <FormTable
          recheckData={recheckData}
          select={select}
          saveData={saveData}
          workshopSection={workshopSection}
          tableData={analogData}
          materialList={materialList}
          index={index}
          sizeList={sizeList}
        />
      </div>
    </div>
  )
}

export default TabPanes
