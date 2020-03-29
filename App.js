import React from 'react';
import Tabbar from './components/Tabbar'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {reducer,initReduxToDb} from './reducer'

const store = createStore(reducer) //STORE CONNECTION

class App extends React.Component {

  constructor(props) {
    super(props)
    initReduxToDb() //db items inf. transp. redux
  }

  render() {
    return (
      <Provider store={store}>
        <Tabbar />
      </Provider>
    )
  }
};

export default App;
