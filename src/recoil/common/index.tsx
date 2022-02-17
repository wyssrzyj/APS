import { atom } from 'recoil'

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

export default { factoryName, dictionary, allArea }
