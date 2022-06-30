import { atom } from 'recoil'

const currentDepartmentId = atom({
  key: 'currentDepartmentId',
  default: ''
})

export default { currentDepartmentId }
