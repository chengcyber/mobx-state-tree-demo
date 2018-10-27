import { types, onSnapshot, flow, getSnapshot } from 'mobx-state-tree'

export function createStorable(collection, attribute) {
   const Storable = types.model({}).actions(self => {

     return {
       afterCreate() {
         onSnapshot(self, self.save)
       },

       save: flow(function* save() {
         try {
           yield window.fetch(
             `http://localhost:3000/${collection}/${self[attribute]}`, {
             method: 'PUT',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify(getSnapshot(self)),
           })
         } catch(e) {
           console.error('save failed:', e.name)
         }
       }),
     }
  })
  return Storable
}
