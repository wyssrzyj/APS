/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-04-18 09:48:41
 * @LastEditors: lyj
 * @LastEditTime: 2022-06-09 16:31:28
 * @FilePath: \jack-aps\src\pages\practice\administration\components\scheduling\toPlan\theEfficiency\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message, Modal, Select } from 'antd'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'

import { schedulingApis } from '@/recoil/apis'

import styles from './index.module.less'
const BreakUp = (props: any) => {
  const {
    setEfficiencyData,
    efficiencyData,
    dataUpdate,
    efficiencyID,
    templateId
  } = props
  const { saveDetails, capacityListID } = schedulingApis

  const { Option } = Select
  const [data, setData] = useState<any>([])
  const [capacityData, setCapacityData] = useState<any>()
  useEffect(() => {
    if (templateId !== undefined) {
      setData(templateId)
      efficiency(templateId.teamId)
    }
  }, [templateId])

  const efficiency = async (id) => {
    const teamData = await capacityListID({ teamId: id })
    if (!isEmpty(teamData)) {
      teamData.map((item: any) => {
        item.name = item.templateName
        item.key = item.teamId
      })
      setCapacityData(teamData)
    }
  }
  // 保存事件
  const handleOk = async () => {
    const arr = await saveDetails(data)
    message.success('保存成功')
    dataUpdate && dataUpdate()
    setEfficiencyData(false)
  }
  const handleCancel = () => {
    setEfficiencyData(false)
  }
  const handleChange = (e: string) => {
    setData(e)
  }

  return (
    <div className={styles.popup}>
      {efficiencyData ? (
        <Modal
          destroyOnClose={true}
          width={300}
          visible={efficiencyData}
          centered={true}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className={styles.selectLeft}>
            <div>效率模板:　</div>
            <div>
              <Select
                placeholder={'请选择效率模板'}
                defaultValue={templateId.templateId}
                onChange={(e) => handleChange(e)}
              >
                {!isEmpty(capacityData) ? (
                  <>
                    {capacityData.map((item: any) => (
                      // eslint-disable-next-line react/jsx-key
                      // eslint-disable-next-line react/jsx-key
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </>
                ) : null}
              </Select>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default BreakUp
