import './style.less'

import { Title } from '@/components'

import { InfoTree, PersonnelTable } from './components'

const UserManage = () => {
  return (
    <div className="department-manage">
      <div className="left department-container">
        <Title title={'部门列表'} />
        <InfoTree />
      </div>
      <div className="right department-container">
        <PersonnelTable />
      </div>
    </div>
  )
}

export default UserManage
