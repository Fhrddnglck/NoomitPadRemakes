import React from 'react'
import {
    View,
    Text,
    ImageBackground
} from 'react-native'
import Database from '../Database'

var SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase({name:'Records.db',location:'default'},successdb,errordb)
class BookList extends React.Component{
    render(){
        return(
            <View>
                <Text>BookList</Text>
            </View>
        )
    }
}
export default BookList