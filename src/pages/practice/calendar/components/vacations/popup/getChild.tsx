import { isEmpty } from 'lodash'
export const getChild = (rawData: any, InterfaceData: any[]) => {
  // antd的原数据 rawData
  // 接口的数据 InterfaceData

  //获取不需要的数据
  const dirtyData = InterfaceData.map((item) => {
    if (!isEmpty(item.children)) {
      return item.value
    }
  })
  // 不需要的数据 UnwantedData
  const UnwantedData = dirtyData.filter((item) => item != undefined)

  // 获取子项数据----------------------
  const getSubData = (v: any[], data: any[]) => {
    // v  原始数据
    // data 字典数据
    const sum: any[][] = []
    v.forEach((item) => {
      sum.push(list(item, data))
    })
    return sum.flat(Infinity) //数组扁平化
  }
  const list = (item: any, data: any[]) => {
    //item 原始数据
    // data 字典数据
    const sum: any[] = []
    const res = data.filter((v) => v.value === item)[0]
    if (res !== undefined && !isEmpty(res.children)) {
      res.children.forEach((item: { value: any }) => {
        sum.push(item.value)
      })
    }
    return sum
  }
  // 获取没有子项的数据----------------------
  const custom = (data: any[], unwanted: any[]) => {
    unwanted.forEach((v) => {
      // v 判断数据
      // data 原数组
      const susa = data.indexOf(v) //是字符串方法  也可以用 findIndex 是数组的方法
      if (susa !== -1) {
        data.splice(susa, 1) //替换掉
      }
    })
    return data
  }
  const arr = getSubData(rawData, InterfaceData)
  return arr.concat(custom(rawData, UnwantedData)) //合并返回出去
}
