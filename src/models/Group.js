import { types, flow, applySnapshot, getSnapshot, onSnapshot } from 'mobx-state-tree'
import { WishList } from "./WishList";
import { createStorable } from './Storable'
const Storable = createStorable(
  'users',
  'id',
)

const delay = (t) => new Promise(
  (resolve, reject) =>
    setTimeout(
      resolve,
      t
    )
)

const suggestions = [
  {
    name: 'LEGO v3',
    price: 345.9,
  },
  {
    name: 'Harry potter',
    price: 19.9,
  },
]

const requestSuggestions = () => {
  return delay(2000).then(() => suggestions)
}

export const User = types.compose(
  types.model({
      id: types.string,
      name: types.string,
      // gender: types.union(types.literal('m'), types.literal('f')),
      gender: types.enumeration('gender', ['m', 'f']),
      wishList: types.optional(WishList, {}),
  }).actions(self => {

    return {
      getSuggestions: flow( function*() {

        const data = yield requestSuggestions()
        // self.wishList.batchAdd(data)
        // no need use a specified action with generator
        self.wishList.items.push(...data)
      }),
    }
  }),
  Storable,
)

export const Group = types.model({
    users: types.map(User)
}).actions(self => {
  /* closure to save individual controller */
  let controller

  return {
    afterCreate() {
      self.load()
    },
    load: flow(function *load() {
      controller = window.AbortController && new window.AbortController()
      try {
        const response = yield window.fetch(
          `http://localhost:3000/users`,
          {
            signal: controller && controller.signal,
          },
        )
        applySnapshot(self.users, yield response.json())

        console.log('success')
      } catch(e) {
        console.log('abort', e.name)
      }
    }),

    reload() {
      if (controller) controller.abort()
      self.load()
    },

    beforeDestroy() {
      if (controller) controller.abort()
    },

    getSuggestions: flow( function*() {

      const data = yield requestSuggestions()
      // self.wishList.batchAdd(data)
          self.wishList.items.push(...data)
    }),
  }
})
