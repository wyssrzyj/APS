/*
 * @Author: lyj
 * @Date: 2022-07-15 13:43:31
 * @LastEditTime: 2022-07-15 13:54:50
 * @Description:
 * @LastEditors: lyj
 */
import { Button, Modal } from 'antd'
import React, { useState } from 'react'
function index(props) {
  const { content } = props
  const { customType, setCustomType } = content

  const list = [
    // {
    //   title: (
    //     <div>
    //       <Button onClick={increase} type="primary" icon={<PlusOutlined />} />
    //     </div>
    //   ),
    //   align: 'center',
    //   dataIndex: 'address',
    //   key: 'address',
    //   width: 80,
    //   fixed: 'right',
    //   render: (_value: any, _row: any, index: number) => {
    //     return (
    //       <div className={styles.flex}>
    //         {data.length > 1 ? (
    //           <Button
    //             onClick={() => reduce(_row.ids)}
    //             type="primary"
    //             icon={<MinusOutlined />}
    //           />
    //         ) : null}
    //       </div>
    //     )
    //   }
    // }
  ]

  const showModal = () => {
    setCustomType(true)
  }

  const handleOk = () => {
    setCustomType(false)
  }
  const handleCancel = () => {
    setCustomType(false)
  }

  return (
    <div>
      <Modal
        centered={true}
        title="自定义"
        visible={customType}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default index
