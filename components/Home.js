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
            source={require('../src/images/BACK.png')}
            resizeMode='cover'
            style={{flex:1}}
            >
            <View style={{ flex: 1 }}>
                <Text>HOME</Text>
            </View>
            </ImageBackground>

        )
    }
}
export default Home