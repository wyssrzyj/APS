import React from 'react'

import Forms from './forms'
import FormTable from './formTable/index'

function TabPanes(props: any) {
  const {
    materialList,
    index,
    dataReset,
    analogData,
    sizeList,
    switchSave,
    select
  } = props
  const dataProcessing = (e: any) => {
    dataReset && dataReset(e)
  }
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
        dataProcessing={dataProcessing}
      />
    </div>
  )
}

export default TabPanes
