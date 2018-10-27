import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree'

import WishListItemEdit from './WishListItemEdit'

class WishListItemView extends React.Component {

    state = {
        isEditing: false,
        clone: null,
    }

    toggleEditing = () => {
        this.setState(prevState => ({
            isEditing: !prevState.isEditing,
            clone: clone(this.props.item),
        }))
    }

    save = () => {
        applySnapshot(this.props.item, getSnapshot(this.state.clone))
        this.toggleEditing()
    }

    render() {
        const {
            item,
        } = this.props
        const {
            isEditing,
            clone,
        } = this.state
        const {
            toggleEditing,
            save,
        } = this

        if (isEditing) {
            return (
                <li className="item">
                    <WishListItemEdit item={clone} />
                    <button onClick={save}>Save</button>
                    <button onClick={toggleEditing}>Close</button>
                </li>
            )
        }

        return (
            <li className="item">
                { item.image && <img src={item.image} /> }
                <h3>{item.name}</h3>
                <span>{item.price}</span>
                <span>
                    <button onClick={toggleEditing}>Edit</button>
                    <button onClick={item.remove}>Remove</button>
                </span>
            </li>
        )
    }
}

export default observer(WishListItemView)
// export default WishListItemView
