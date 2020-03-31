import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'
import MovieList from './MovieList'
import BookList from './BookList'
import NewRecord from './NewRecord'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Tab = createBottomTabNavigator();


class Tabbar extends React.Component{
    render(){
        return(
            <NavigationContainer>
            <Tab.Navigator
            screenOptions = {({route})=>({
              tabBarIcon : ({focused,color,size})=>{
                let iconName
                if(route.name === 'Home'){
                  iconName = focused
                  ? 'home'
                  : 'home-outline'
                } else if(route.name === 'Movie List'){
                  iconName = focused
                  ? 'movie'
                  : 'movie-outline'
                } else if(route.name === 'Book List'){
                  iconName = focused
                  ? 'book-open'
                  : 'book-open-outline'
                }
                else if(route.name === 'New Record'){
                  iconName = focused
                  ? 'pencil-plus'
                  : 'pencil-plus-outline'
                }
                size = focused ? 30 : 25
                return <Icon name={iconName} size={size} color={color}/>
              }
            })}
            tabBarOptions={{
              activeTintColor:'#E44400',
              inactiveTintColor:'gray',
            }}
            >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Movie List" component={MovieList} />
              <Tab.Screen name="Book List" component={BookList} />
              <Tab.Screen name="New Record" component={NewRecord} />
            </Tab.Navigator>
          </NavigationContainer>
        )
    }
}
export default Tabbar