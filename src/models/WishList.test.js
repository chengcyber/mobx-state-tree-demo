import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';
import { WishListItem, WishList } from "./WishList";

it('can create a instance of a model', () => {
    const item = WishListItem.create({
        name: 'Chronsiles of Noslk',
        price: 28.73,
    })

    expect(item.price).toBe(28.73)
    expect(item.image).toBe('')
    item.setName('Niv')
    expect(item.name).toBe('Niv')
})

it('can create a wishlist', () => {
    const list = WishList.create({
        items: [
            {
                name: 'Chronsiles of Noslk',
                price: 28.73,
            }
        ],
    })

    expect(list.items.length).toBe(1)
    expect(list.items[0].price).toBe(28.73)
})

it('can add an item to wishlist', () => {
    const list = WishList.create()
    const states = []
    onSnapshot(list, snapshot => {
        states.push(snapshot)
    })

    list.add(WishListItem.create({
        name: 'Hola',
        price: 203.1,
    }))

    expect(list.items.length).toBe(1)
    expect(list.items[0].name).toBe('Hola')
    expect(list.items[0].price).toBe(203.1)

    expect(getSnapshot(list)).toEqual({
        items: [
            {
                name: 'Hola',
                price: 203.1,
                image: '',
            }
        ]
    })

    // expect(getSnapshot(list)).toMatchSnapshot()

    expect(states).toMatchSnapshot()
})

it('can add an item to wishlist - 2', () => {
    const list = WishList.create()
    const patchs = []
    onPatch(list, patch => {
        patchs.push(patch)
    })

    list.add(WishListItem.create({
        name: 'Hola',
        price: 203.1,
    }))

    list.items[0].setName('kkk')

    expect(patchs).toMatchSnapshot()
})

it('can calculate total price', () => {
    const list = WishList.create({
        items: [
            {
                name: 'a',
                price: 7.35,
            },
            {
                name: 'b',
                price: 123.2,
            },
        ]
    })

    expect(list.totalPrice).toBe(7.35 + 123.2)
})