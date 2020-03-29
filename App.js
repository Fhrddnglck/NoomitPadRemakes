import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home'
import MovieList from './components/MovieList'
import BookList from './components/BookList'
import NewRecord from './components/NewRecord'
const Tab = createBottomTabNavigator();
class App extends React.Component {
  render(){
    return(
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="MovieList" component={MovieList} />
        <Tab.Screen name="BookList" component={BookList} />
        <Tab.Screen name="NewRecord" component={NewRecord} />
      </Tab.Navigator>
    </NavigationContainer>
    )
  }
};

export default App;
