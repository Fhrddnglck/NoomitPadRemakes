import React from 'react'
import {
    View,
    Text,
    ImageBackground
} from 'react-native'

class Home extends React.Component {
    render() {
        return (
            <ImageBackground
            source={require('../src/images/MainMenuback.png')}
            resizeMode='cover'
            style={{flex:1}}
            >
            </ImageBackground>

        )
    }
}
export default Home