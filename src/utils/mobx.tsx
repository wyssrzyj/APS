import {
  inject as _inject,
  MobXProviderContext,
  observer as _observer
} from 'mobx-react'
import React from 'react'

export function inject(...args) {
  return (componentClass) => _inject(...args)(_observer(componentClass))
}

export function observer(target) {
  return _observer(target)
}

export const useStores: any = () => {
  return React.useContext(MobXProviderContext)
}
