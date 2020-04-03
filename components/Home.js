import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    StatusBar
} from 'react-native'
import { AdMobBanner } from 'react-native-admob'
class Home extends React.Component {
    render() {
        return (
            <ImageBackground
                source={require('../src/images/MainMenuback.png')}
                resizeMode='cover'
                style={{ flex: 1 }}
            >
                <StatusBar
                    backgroundColor='transparent'
                    translucent={true}
                />
                <View style={{ marginTop: 32, flex: 1, justifyContent: 'center' }}>
                    <AdMobBanner
                        adSize="fullBanner"
                        adUnitID="ca-app-pub-1457835335539533/4892838374"
                        testDevices={[AdMobBanner.simulatorId]}
                        onAdFailedToLoad={error => console.error(error)}
                    />
                </View>
            </ImageBackground>

        )
    }
}
export default Home