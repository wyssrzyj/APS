import {
  inject as _inject,
  MobXProviderContext,
  observer as _observer
} from 'mobx-react'
import React from 'react'

export function inject(...args: any) {
  return (componentClass: any) => _inject(...args)(_observer(componentClass))
}

export function observer(target: any) {
  return _observer(target)
}

export const useStores: any = () => {
  return React.useContext(MobXProviderContext)
}
