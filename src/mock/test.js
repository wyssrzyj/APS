// 使用 Mock
// let Mock = require("mockjs")
import * as Mock from 'mockjs'

let testMock = Mock.mock({
  status: 200,
  msg: 'success',
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-30': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      'name|3-5': /[a-z][A-Z]/, // 随机字符
      'age|5-20': 15,
      'gender|1': true,
      'money|2-50.2': 1
    }
  ]
})
testMock.list.forEach((element) => {
  element.name = Mock.Random.ctitle(3, 5)
})

const flag = Math.random() > 0.3

testMock.status = flag ? 200 : 500
testMock.msg = flag ? 'success' : 'error'
testMock.list = flag ? testMock.list : []

export default testMock
