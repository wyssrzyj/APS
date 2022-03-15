import { Button, Checkbox, Form, Input, InputNumber, Table } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import React, { useEffect, useState } from 'react'

// import Excl from '@/components/excel/Import/index'
import styles from './index.module.less'
import Popup from './Popup/index'
const Outgoing = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  interface Item {
    key: string
    name: string
    age: number
    address: string
  }

  const originData = []
  for (let i = 0; i < 20; i++) {
    originData.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      need: false, //判断当前是否选中，
      //   needDisabled: false, //判断当前是否失效，
      outgoing: '88480',
      address: `London Park no. ${i}`
    })
  }
  const [form] = Form.useForm()
  const [data, setData] = useState(originData)
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record: Item) => record.key === editingKey

  useEffect(() => {
    console.log('测试', data)
  }, [data])
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as any

      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns: any = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'name',
      render: (
        _value: any,
        _row: any,
        index:
          | boolean
          | React.ReactChild
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined
      ) => {
        return <div className={styles.flex}>{index}</div>
      }
    },
    {
      title: '工序名称',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '所属工段',
      align: 'center',
      dataIndex: 'age'
    },
    {
      title: '工序耗时',
      align: 'center',
      dataIndex: 'section '
    },
    {
      title: '需要外发',
      align: 'center',
      dataIndex: 'need',
      render: (type: boolean | undefined, record: any, index: any) => {
        return (
          <div className={styles.flex}>
            <Checkbox
              //   disabled={record.needDisabled}
              checked={type}
              onChange={(e) => btn(e, record, index)}
            />
          </div>
        )
      }
    },
    {
      title: '外发时间',
      align: 'center',
      dataIndex: 'outgoing',
      editable: true,
      width: 200,
      render: (type: any | null | undefined, record: { need: any }) => {
        return (
          <div className={styles.flex}>
            {!record.need ? (
              type
            ) : (
              <Input defaultValue={type} style={{ width: '50%' }} />
            )}
          </div>
        )
      }
    }
  ]
  //核心
  const btn = (e: CheckboxChangeEvent, record: any, index: any) => {
    //展示状态
    const sum = data
    sum[index].need = e.target.checked
    setData([...sum])
    if (e.target.checked) {
      edit(record)
    } else {
      save(record.key)
    }
  }
  //自动输入
  const mergedColumns = columns.map(
    (col: { editable: any; dataIndex: string; title: any }) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record: Item) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record)
        })
      }
    }
  )

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: any
    inputType: 'number' | 'text'
    record: Item
    index: number
    children: React.ReactNode
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === 'number' ? (
        <InputNumber />
      ) : (
        <Input style={{ width: '50%' }} />
      )

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: '请输入!' }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }
  const showModal = () => {
    console.log('打印')

    setIsModalVisible(true)
  }
  return (
    <div>
      <div className={styles.top}>生产单外发管理</div>
      <Form form={form} component={false}>
        <Table
          scroll={{ y: 'calc(100vh - 430px)' }}
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel
          }}
        />
      </Form>
      {/* <Excl /> */}
      <div>
        <Button onClick={showModal} type="primary">
          整单外发
        </Button>
      </div>
      {/* 弹窗 */}
      <Popup
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  )
}

export default Outgoing
