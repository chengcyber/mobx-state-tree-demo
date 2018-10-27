import { types, getParent, destroy } from 'mobx-state-tree'

const data = {
    name: 'Chronsiles of Noslk',
    price: 28.73,
    image: 'http://lorempixel.com/640/480/?15509',
}

export const WishListItem = types.model({
    name: types.string,
    price: types.number,
    image: types.optional(types.string, ''),
}).actions(self => ({
    setName(n) { self.name = n },
    setPrice(p) { self.price = p },
    setImage(i) { self.image = i},
    remove() {
        // delegate to list.remove
        // list.items.xxx so the depth is 2
        getParent(self, 2).remove(self)
    }
}))

export const WishList = types.model({
    items: types.optional(types.array(WishListItem), []),
}).actions(self => ({
    add(item) { self.items.push(item) },
    remove(item) {
        // self.items.splice(self.items.indexOf(item), 1)
        destroy(item)
    },
})).views(self => ({
    get totalPrice() {
        return self.items.reduce((sum, entry) => sum + entry.price, 0) * 1
    }
}))

export default WishList
