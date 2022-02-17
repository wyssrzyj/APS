import axios from '@/utils/axios'

import { ResponseProps } from '../types'

export const roleListTree = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(`/api/basic/role/list`, params)
    return res
  } catch (e) {
    return e
  }
}

export const editRole = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(`/manage/role/edit`, params)

    return res.data
  } catch (e) {
    console.log(e, '~~~~')
    return e
  }
}

export const addRole = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(`/manage/role/add`, params)

    return res.data
  } catch (e) {
    console.log(e, '~~~~')
    return e
  }
}

export const allPermissions = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/api/basic/permission/list`,
      params
    )
    return res
  } catch (e) {
    return e
  }
}

export const rolePermissions = async (roleId: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/api/basic/role/query-perm-by-role-id`,
      {
        roleId
      }
    )
    return res
  } catch (e) {
    return e
  }
}

export const allotPermissions = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/api/basic/role/assignPrem`,
      params
    )
    return res
  } catch (e) {
    return e
  }
}

export const operateRole = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(`/api/basic/role/save`, params)
    return res
  } catch (e) {
    return e
  }
}

export const deleteRole = async (id: any) => {
  try {
    const res: ResponseProps = await axios.delete(`/api/basic/role/delete`, {
      id
    })
    return res
  } catch (e) {
    return e
  }
}
