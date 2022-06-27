/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-04-13 15:47:01
 * @LastEditors: lyj
 * @LastEditTime: 2022-06-27 09:51:07
 * @FilePath: \jack-aps\src\pages\practice\administration\components\materials\material\tabPanes\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    setRecheckData
  } = props

  const saveData = (e: any) => {
    switchSave && switchSave(e)
  }
  const recheckData = (e: any) => {
    setRecheckData && setRecheckData(e)
  }

  return (
    <div>
      <Forms list={materialList[index]} />
      <div className={styles.container}>
        <FormTable
          recheckData={recheckData}
          select={select}
          saveData={saveData}
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
