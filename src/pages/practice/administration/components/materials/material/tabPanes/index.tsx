import React from 'react'

import Forms from './forms'
// import Tables from './tables'
import FormTable from './formTable/index'

function TabPanes(props: any) {
  const { materialList, index, dataReset, analogData, sizeList } = props
  const dataProcessing = (e: any) => {
    dataReset && dataReset(e)
  }

  return (
    <div>
      <Forms list={materialList[index]} />
      {analogData && analogData.length > 0 ? (
        <FormTable
          tableData={analogData}
          materialList={materialList}
          index={index}
          sizeList={sizeList}
          dataProcessing={dataProcessing}
        />
      ) : null}
    </div>
  )
}

export default TabPanes
