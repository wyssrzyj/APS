import React from 'react'

import Forms from './forms'
// import Tables from './tables'
import FormTable from './formTable/index'

function TabPanes(props: any) {
  const { materialList, index, dataReset } = props
  const dataProcessing = (e: any) => {
    dataReset && dataReset(e)
  }

  return (
    <div>
      <Forms list={materialList[index].form} />
      {/* <Tables materialList={materialList} index={index} list={data.titls} /> */}
      <FormTable
        tableData={materialList[index].tableData}
        materialList={materialList}
        index={index}
        dataProcessing={dataProcessing}
      />
    </div>
  )
}

export default TabPanes
