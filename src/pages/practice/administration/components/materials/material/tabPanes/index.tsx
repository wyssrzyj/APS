/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-04-13 15:47:01
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @LastEditTime: 2022-05-13 16:01:47
 * @FilePath: \jack-aps\src\pages\practice\administration\components\materials\material\tabPanes\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'

import Forms from './forms'
import FormTable from './formTable/index'

function TabPanes(props: any) {
  const { materialList, index, analogData, sizeList, switchSave, select } =
    props

  const saveData = (e: any) => {
    switchSave && switchSave(e)
  }

  return (
    <div>
      <Forms list={materialList[index]} />
      <FormTable
        select={select}
        saveData={saveData}
        tableData={analogData}
        materialList={materialList}
        index={index}
        sizeList={sizeList}
      />
    </div>
  )
}

export default TabPanes
