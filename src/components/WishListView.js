import React from 'react'
import { observer } from 'mobx-react'
import WishListItemView from './WishListItemView'
import WishListItemEntry from './WishListItemEntry'

const WishListView = ({ wishList }) => {

    return (
        <div className="list">
            <ul>
                {wishList.items.map((item, i) => <WishListItemView key={i} item={item}/>)}
            </ul>
            Total Price: {wishList.totalPrice} $
            <WishListItemEntry wishList={wishList}/>
        </div>
    )
}

export default observer(WishListView)
