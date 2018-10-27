import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Group }  from './models/Group'
import { onSnapshot, getSnapshot } from 'mobx-state-tree'

let initialState = {
  users: {
    'a': {
      id: 'a',
      name: 'a',
      gender: 'm',
      wishList: {
        items: [
            {
                name: 'LEGO Mindstone V3',
                price: 349.99,
            },
            {
                name: 'Miracles - C.S. Lewis',
                price: 12.91,
            },
        ],
      },
    },
    'b': {
      id: 'b',
      name: 'b',
      gender: 'm',
    },
    'c': {
      id: 'c',
      name: 'c',
      gender: 'f',
    },
  },

}

const group = Group.create(initialState)

// if (localStorage.getItem('wishList')) {
//     const json = JSON.parse(localStorage.getItem('wishList'))
//
//     // validation model type
//     if (WishList.is(json)) {
//         initialState = json
//     }
// }
//
// let wishList = WishList.create(
//     initialState
// )
//
// // automatically do state persistence
// onSnapshot(wishList, snapshot => {
//     localStorage.setItem('wishList', JSON.stringify(snapshot))
// })
//
// setInterval(
//     () => wishList.items[0].setPrice(wishList.items[0].price + 1),
//     1000
// )

function renderApp() {
    ReactDOM.render(<App group={group} />, document.getElementById('root'));
}

renderApp()

if (module.hot) {
    module.hot.accept(['./App'], () => {
        renderApp()
    })

    module.hot.accept(['./models/WishList'], () => {
        // const snapshot = getSnapshot(wishList)
        // wishList = WishList.create(wishList)
        renderApp()
    })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
