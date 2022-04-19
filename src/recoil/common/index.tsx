import { atom, selector } from 'recoil'

// 官网链接 https://www.recoiljs.cn/docs/basic-tutorial/atoms
// 通过atom包裹的内容, 通过key获取对用的数据 key值与设置的属性值一致 default为默认数据
// 通过 useRecoilValue 获取数据
// const factoryName = useRecoilValue(factoryName)
// 通过 useSetRecoilState 设置数据
// const setFactoryName = useSetRecoilState(factoryName)
// 通过hook的方式
// const [factoryName, setFactoryName] = useRecoilState(factoryName);

// 使用selector监听某个状态 输出其他的内容

const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    // get监听对应的状态 例如获取列表数据 返回对应的页码 总数 列表内容等
    const getFactoryName = get(factoryName)

    return getFactoryName ? getFactoryName + '_______selector' : 'initialName'
  }
})

const factoryName = atom({
  key: 'factoryName',
  default: 'amin-factory-zf'
})

const dictionary = atom({
  key: 'dictionary',
  default: {}
})

const allArea = atom({
  key: 'allArea',
  default: []
})
//存全局的数据
const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '1008611' // default value (aka initial value)
})

const lyj = atom({
  key: 'lyj', // unique ID (with respect to other atoms/selectors)
  default: '123456789' // default value (aka initial value)
})
// 同步设置数据
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(lyj)
    return text
  }
})

//修改数据

export default {
  factoryName,
  dictionary,
  allArea,
  filteredTodoListState,
  textState,
  charCountState,
  lyj
}
