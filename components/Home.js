import React from 'react'
import {
    View,
    Text,
    Dimensions,
    Animated,
    Easing,
    TouchableOpacity,
    FlatList
} from 'react-native'

const { height } = Dimensions.get('window')

class Item extends React.Component {
    constructor() {
        super();
        this.state = {
            coverHeight: new Animated.Value(0),
            isOpen: false,
            marginValue: 5,
        }
    }
    anim = () => {
        if (!this.state.isOpen) {
            Animated.timing(this.state.coverHeight, {
                toValue: height / 2,
                duration: 750,
                easing: Easing.bounce,

            }).start()
            this.setState({ isOpen: true, marginValue: height / 3 })
        }
        else {
            Animated.timing(this.state.coverHeight, {
                toValue: 0,
                duration: 750,
                easing: Easing.bounce,

            }).start()
            this.setState({ isOpen: false, marginValue: 0 })
        }
    }

    render() {
        const { values, key } = this.props;
        const { coverHeight } = this.state
        return (
            <View style={{backgroundColor:'blue',marginTop:3}}>
            <View style={{ width: '100%', backgroundColor: 'yellow', height: 100 }}>
                <TouchableOpacity onPress={() => this.anim()}>
                    <Text>OPEN</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={{height: coverHeight, backgroundColor: 'red' }}>
                <Text>s..a</Text>
            </Animated.View>
            </View>

        );
    }

}


class Home extends React.Component {
    state = {
        items: [
            { id: 1, name: 'name 1' },
            { id: 2, name: 'name 2' },
            { id: 3, name: 'name 3' },
            { id: 4, name: 'name 4' },
        ]
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.items}
                    renderItem={({ item, index }) => <Item key={index} values={item} />}
                />
            </View>
        )
    }
}
export default Home