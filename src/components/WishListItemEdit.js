import React from 'react'
import { observer } from 'mobx-react'

const WishListItemEdit = ({ item }) => {
    const setName = e => item.setName(e.target.value)
    const setPrice = e => item.setPrice(parseFloat(e.target.value))
    const setImage = e => item.setImage(e.target.value)

    return (
        <div className="item-edit">
            Thing: <input value={item.name} onChange={setName} />
            <br />
            Price: <input value={item.price} onChange={setPrice} />
            <br />
            Image: <input value={item.image} onChange={setImage} />
            <br />
        </div>
    )
}

export default observer(WishListItemEdit)