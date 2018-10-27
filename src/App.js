import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WishListView from './components/WishListView'
import { values } from 'mobx'

class App extends Component {
  state = {
    selectedUser: null
  }

  onChangeSelect = (e) => {
    this.setState({
      selectedUser: e.target.value,
    })
  }
  render() {
    const {
      group,
    } = this.props
    const selectedUser = group.users.get(this.state.selectedUser)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <section>
          <select onChange={this.onChangeSelect}>
            <option>- select user -</option>
              {values(group.users).map((user, i) =>
                <option key={i} value={user.id}>{user.name}</option>)
              }
          </select>
          {selectedUser &&
            <WishListView wishList={selectedUser.wishList} />
          }
          {
            selectedUser &&
              <button onClick={selectedUser.getSuggestions}>Suggestions</button>
          }
        </section>
      </div>
    );
  }
}

export default App;
