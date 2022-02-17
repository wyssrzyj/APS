import { atom } from 'recoil'

const currentDepartmentId = atom({
  key: 'currentDepartmentId',
  default: ''
})

const currentRoleId = atom({
  key: 'currentRoleId',
  default: ''
})

export default { currentDepartmentId, currentRoleId }
