/*
 * @Author: zjr
 * @Date: 2022-05-30 13:27:13
 * @LastEditTime: 2022-05-31 10:49:19
 * @Description:
 * @LastEditors: zjr
 */
import 'moment/locale/zh-cn'

import { Calendar, Form, Select, Tag } from 'antd'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { efficiencyTemplateApis } from '@/recoil/apis'
import { practice } from '@/recoil/apis'

import styles from './index.module.less'
const Option = Select.Option
const { factoryList, teamList } = efficiencyTemplateApis
const { getWorkCalendar } = practice
const WorkCalendar = (props) => {
  const [form] = Form.useForm()
  const { setFieldsValue } = form
  const [params, setParams] = useState<Record<string, any>>({
    date: `${moment(new Date()).format('YYYY-MM')}-01`
  })
  const [facList, setFacList] = useState<Record<string, any>>()
  const [teamLists, setTeamLists] = useState<Record<string, any>>()
  const [facSelectOptions, setFacSelectOptions] = useState([])
  const [teamSelectOptions, setTeamSelectOptions] = useState([])
  const [caleandarList, setCaleandarList] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        const res: any = await factoryList()
        const { data = [] } = res || []
        setFacList(data)
      } catch (err) {}
    })()
  }, [])

  useEffect(() => {
    if (facList && facList.length) {
      const options = facList.map((d) => (
        <Option key={d.id}>{d.deptName}</Option>
      ))
      setFacSelectOptions(options)

      const nParams = cloneDeep(params)
      nParams.factoryId = facList[0].id
      paramsChange({ factoryId: facList[0].id || undefined }, nParams)
    }
  }, [facList])

  useEffect(() => {
    const options =
      teamLists && teamLists.length
        ? teamLists.map((d) => <Option key={d.id}>{d.teamName}</Option>)
        : null
    setTeamSelectOptions(options)

    const nParams = cloneDeep(params)
    const teamId = teamLists && teamLists.length ? teamLists[0].id : undefined
    nParams.teamId = teamId
    paramsChange({ teamId: teamId }, nParams)
  }, [teamLists])

  const changeTeamConfig = async (factoryId?: string) => {
    const list: any = factoryId ? await teamList({ factoryId }) : []
    setTeamLists(list)
  }

  const paramsChange = (values: Record<string, any>, allValues) => {
    setFieldsValue(values)
    const oldParams = cloneDeep(params)

    if (
      Object.keys(values)[0] === 'factoryId' &&
      oldParams.factoryId !== values.factoryId
    ) {
      values.teamId = undefined
      changeTeamConfig(values.factoryId)
    }

    setParams({ ...oldParams, ...values })
  }

  useEffect(() => {
    getCaleandarList()
  }, [params])

  const getCaleandarList = async () => {
    if (!params.teamId) {
      setCaleandarList([])
    } else {
      const res = await getWorkCalendar(params)
      if (res.success) setCaleandarList(res.data || [])
    }
  }

  const onDatechange = (date) => {
    if (!date) return
    const nParams = cloneDeep(params)
    nParams.date = `${date.format('YYYY-MM')}-01`
    setParams(nParams)
  }

  const getOwnList = (dateValue) => {
    return (
      caleandarList &&
      caleandarList.find((item) => {
        return item.date === dateValue
      })
    )
  }
  const dateCellRender = (values) => {
    const info = getOwnList(values.format('YYYY-MM-DD')) || {}
    const { workTime, extraTime } = info

    return (
      <div className={styles.tagsContainer}>
        {workTime &&
          workTime.map((el, index) => {
            const { endTime, startTime } = el
            return (
              <Tag color="green" key={index}>
                {startTime}-{endTime}
              </Tag>
            )
          })}
        {extraTime &&
          extraTime.map((el, index) => {
            const { endTime, startTime } = el
            return (
              <Tag color="red" key={index}>
                {startTime}-{endTime}
              </Tag>
            )
          })}
      </div>
    )
  }

  return (
    <div className={styles.calendarOutContainer}>
      <Form
        form={form}
        onValuesChange={paramsChange}
        initialValues={params}
        layout="inline"
      >
        <Form.Item name="factoryId" label="工厂名称">
          <Select placeholder="请选择" style={{ width: '200px' }}>
            {facSelectOptions}
          </Select>
        </Form.Item>
        <Form.Item name="teamId" label="工厂名称">
          <Select placeholder="请选择" style={{ width: '200px' }}>
            {teamSelectOptions}
          </Select>
        </Form.Item>
      </Form>
      <div className={styles.calendarContainer}>
        <Calendar
          onPanelChange={onDatechange}
          dateCellRender={dateCellRender}
        />
      </div>
    </div>
  )
}

export default WorkCalendar
