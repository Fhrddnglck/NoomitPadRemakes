import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions,
} from 'react-native'
import { Rating } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const { height } = Dimensions.get('window')
class Book extends React.Component {
    state = {
        coverHeight: new Animated.Value(0),
        opacitySlide: new Animated.Value(0),
        isOpen: false,
    }

    animate = () => {
        if (!this.state.isOpen) {
            Animated.timing(this.state.coverHeight, {
                toValue: height / 5,
                duration: 750,
                easing: Easing.bounce,

            }).start()
            Animated.timing(this.state.opacitySlide, {
                toValue: 1,
                duration: 750,
            }).start()
            this.setState({ isOpen: true, marginValue: height / 3 })
        }
        else {
            Animated.timing(this.state.coverHeight, {
                toValue: 0,
                duration: 750,
                easing: Easing.bounce,

            }).start()
            Animated.timing(this.state.opacitySlide, {
                toValue: 0,
                duration: 300,
            }).start()
            this.setState({ isOpen: false })
        }
    }


    updateItem = (item) => {
        this.props.updateBook(item)
    }

    deleteItem = (book_id, index) => {
        this.animate()
        this.props.deleteItem(book_id, index)
    }

    detailScreen = (item,index) => {
        this.props.openModal(item,index)
    }

    render() {
        const { item, index } = this.props
        const { coverHeight, opacitySlide } = this.state
        return (
            <View style={[styles.listItem,{marginTop:index==0?0:36}]} key={index}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ marginRight: 'auto', padding: 5 }}>
                        <Image
                            source={{ uri: item.book_uri }}
                            style={{ width: 100, height: 100, borderRadius: 180 }}
                        />
                    </View>
                    <View style={{ marginTop: 16, flex: 1, alignItems: 'flex-start', justifyContent: 'space-around' }}>
                        <Text style={{ color: '#707070', fontWeight: 'bold', fontSize: 20 }}>{item.book_name}</Text>
                        <Text style={{ color: '#707070', fontWeight: '100', fontSize: 10 }}>{item.book_author}</Text>
                        <Rating
                            startingValue={item.book_star}
                            type='custom'
                            ratingColor='#CE2400'
                            imageSize={20}
                            readonly
                        />
                    </View>
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 8, color: '#707070', marginRight: 4 }}>{item.book_date}</Text>
                        <TouchableOpacity
                            style={{}}
                            onPress={() => this.animate()}
                        >
                            <MaterialCommunityIcons
                                name='dots-vertical'
                                color='grey'
                                size={36}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Animated.View style={{ height: coverHeight, backgroundColor: '#FFEFEF', justifyContent: 'flex-end' }}>
                    <Animated.View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', width: '100%', opacity: opacitySlide }}>
                        <TouchableOpacity
                            style={{ alignItems: 'center' }}
                            onPress={() => this.deleteItem(item.book_id, index)}
                        >
                            <Ionicons
                                name='ios-trash'
                                size={49}
                                color='grey'

                            />
                            <Text style={{fontWeight:'bold'}}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.detailScreen(item,index)}
                            style={{ borderRadius: 8, backgroundColor: 'white', width: '40%', height: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 16,shadowColor:'black',shadowOffset:{width:3,height:3},shadowOpacity:0.4,shadowRadius:15,elevation:4 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24}}>Detail</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'center' }}
                            onPress={() => { this.updateItem(item) }}
                        >
                            <MaterialCommunityIcons
                                name='update'
                                size={49}
                                color='grey'
                            />
                            <Text style={{fontWeight:'bold'}}>Update</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    listItem: {
        backgroundColor: 'white',
        width: '100%',
        shadowColor: '#000',
        marginTop: 36,
        shadowRadius: 2.5,
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 1
        },
        elevation: 2,
    }
})


export default Book