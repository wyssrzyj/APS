import { isArray, isEmpty, isNil, isNumber } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const getUId = () => {
  return uuidv4().split('-')[0]
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const getRefresh = () => {
  return localStorage.getItem('refresh')
}

export const getLastUrl = () => {
  return localStorage.getItem('lastUrl')
}

export const getCurrentUser = () => {
  const user = JSON.parse(JSON.stringify(localStorage.getItem('currentUser')))
  if (user) {
    return JSON.parse(user)
  }
  return {}
}

export const getUserInfo = () => {
  const user = JSON.parse(JSON.stringify(localStorage.getItem('userInfo')))
  if (user) {
    return JSON.parse(user)
  }
  return {}
}

export const useDebounceValue = (value: any, interval = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
      clearTimeout(timer)
    }, interval)

    return () => {
      clearTimeout(timer)
    }
  }, [value, interval])

  return debouncedValue
}

export const useThrottleValue = (value: any, interval = 300) => {
  const [throttleValue, setThrottleValue] = useState(value)
  const startTimeRef = useRef(new Date())

  useEffect(() => {
    const endTime: any = new Date()
    const startTime: any = startTimeRef.current
    let timer: NodeJS.Timeout
    const diffTime: any = endTime - startTime
    const nextTime = interval - (endTime - startTime)
    if (diffTime >= interval) {
      setThrottleValue(value)
      startTimeRef.current = new Date()
    } else {
      timer = setTimeout(() => {
        setThrottleValue(value)
        startTimeRef.current = new Date()
      }, nextTime)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [value, interval])

  return throttleValue
}

export function useDebounce(fn: any, delay: number | undefined, dep = []) {
  const current: any = useRef({ fn, timer: null }).current
  useEffect(
    function () {
      current.fn = fn
    },
    [fn]
  )

  return useCallback(function f(this: any, ...args) {
    if (current.timer) {
      clearTimeout(current.timer)
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args)
    }, delay)
  }, dep)
}

export function useThrottle(fn: any, delay: number | undefined, dep = []) {
  const current: any = useRef({ fn, timer: null }).current
  useEffect(
    function () {
      current.fn = fn
    },
    [fn]
  )

  return useCallback(function f(this: any, ...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer
      }, delay)
      current.fn.call(this, ...args)
    }
  }, dep)
}

/**
 * 判断一个数是否为奇数
 * @param num: number
 * @returns boolean
 */
export const isOdd = (num: number) => {
  return (num & 1) === 1
}
/**
 * 判断一个数是否为偶数
 * @param num: number
 * @returns boolean
 */
export const isEven = (num: number) => {
  return (num & 1) === 0
}

/**
 * 判断一个数是否为NaN  原生自带isNaN方法
 * @param num: number
 * @returns boolean
 */
export const isNaN = (num: number) => {
  return !(num > 0) && !(num <= 0)
}

export const transformProduceNumber = (value: string) => {
  if (value) {
    const newValue = value.split(',')
    if (newValue[0] === '0') {
      return '20人以内'
    } else if (newValue[0] === '10000') {
      return '10000以上'
    } else {
      return `${newValue[0]}人~${newValue[1]}人`
    }
  }
}

/**
 * 将数组类型的数据转成 树数据类型
 * @param data 打平的树数据
 * @returns
 */
export const getTreeData = (data: any[]) => {
  const target = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentId === 0) {
      target.push(data[i])
      data.splice(i, 1)
      i--
    }
  }

  const toTree = (list: any[], tree: any[]) => {
    list.forEach((item) => {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].parentId === item.menuId) {
          item.children.push(tree[i])
          tree.splice(i, 1)
          i--
        }
      }
      if (item.children && item.children.length) {
        toTree(item.children, tree)
      } else {
        item.children = undefined
      }
    })
  }
  toTree(target, data)
  return target
}

/**
 * 判断是否有值
 */
export const checkValue = (value: any) => {
  if (value || isNumber(value)) {
    return value
  } else if (isArray(value) && isEmpty(value)) {
    return '--'
  } else {
    return '--'
  }
}

export const getTypeOptions = () => {
  return [
    { label: '清加工单', value: 'QJG' },
    { label: 'OEM', value: 'OEM' },
    { label: 'ODM', value: 'ODM' },
    { label: '经销单', value: 'JXD' },
    { label: '自营进出口单', value: 'ZCK' }
  ]
}

export const getProductClass = () => {
  return [
    { label: '高', value: '0' },
    { label: '中', value: '1' },
    { label: '低', value: '2' }
  ]
}

export const getProductMode = () => {
  return [
    { label: '流水', value: '0' },
    { label: '整件', value: '1' },
    { label: '流水和整件', value: '2' }
  ]
}

export const setTitle = (title: string) => {
  document.title = title
}

export const getProductClassMap = () => {
  return [
    { value: 1, label: '低' },
    { value: 2, label: '中' },
    { value: 3, label: '中低' },
    { value: 4, label: '高' },
    { value: 5, label: '高低' },
    { value: 6, label: '高中' },
    { value: 7, label: '高中低' }
  ]
}

/**
 * 判断from表单是新增还是编辑
 */
export const isAdd = (value: any) => {
  return isEmpty(value) || isNil(value) ? true : false
}

/**
 * 判断账号状态
 */
export const getStatusMap = () => {
  const statusMap = [
    {
      value: 1,
      label: '正常'
    },
    {
      value: 0,
      label: '停用'
    }
    // {
    //   value: 2,
    //   label: '禁止登录'
    // }
  ]
  return statusMap
}
export const transformStatus = (value: number) => {
  const statusMap: any[] = getStatusMap()
  return statusMap.find((item) => item.value == value).label
}
