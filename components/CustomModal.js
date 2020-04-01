import React, { Component } from 'react'
import { Modal, View, Image, TouchableOpacity, Text, Dimensions, ImageBackground } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ButtonGroup } from 'react-native-elements'
const { height } = Dimensions.get('window')

export default class CustomModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
    }


    onClose = () => {
        this.props.onClose() //ONCLOSE FUNCTION IN PROPS ONCLOSE
    };

    updateIndex = (selectedIndex) => {
        this.setState({ selectedIndex })
    }
    component1 = () => <Text>Subject</Text>
    component2 = () => <Text>My citations</Text>

    render() {
        const { selectedIndex } = this.state
        const buttons = [{ element: this.component1 }, { element: this.component2 }]
        if (!this.props.modalVisible) { //IF MODALVISIBLE FALSE RETURN NULL
            return null;
        }
        return (
            <Modal
                animationType='fade'
                transparent={true}
            >
                <View style={{ width: '90%', backgroundColor: '#F3EEEE', alignSelf: 'center', overflow: 'hidden', borderRadius: 30, height: height / 1.1 }}>
                    <View>
                        <ImageBackground
                        resizeMode = 'cover'
                            source={{ uri: this.props.item.book_uri }}
                            style={{ width: '100%', height: 250, marginBottom: 'auto' }}
                        >
                            <TouchableOpacity

                                style={{ width: 50, height: 50, marginTop: 16, marginLeft: 16, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => {
                                    this.onClose(); //ONCLOSE FUNCTION
                                }}>
                                <Ionicons
                                    name='ios-arrow-back'
                                    size={49}
                                    color='grey'
                                />
                            </TouchableOpacity>
                        </ImageBackground>
                        <View style={{ marginTop: 8 }}>
                            <View style={{ width: '100%', alignItems: 'center', alignSelf: 'center' }}>
                                <Text style={{ fontSize: 36, color: 'grey', borderBottomWidth: 0.5, paddingBottom: 10, paddingLeft: 30, paddingRight: 30 }}>{this.props.item.book_name}</Text>
                                <Text style={{ color: 'grey', fontSize: 16, marginTop: 16 }}>{this.props.item.book_page} Pages</Text>
                                <Text style={{ color: 'grey', fontSize: 16 }}>Book Author is {this.props.item.book_author}</Text>
                                <Text style={{ color: 'grey', fontSize: 16 }}>20.02.2020-{this.props.item.book_date} between</Text>
                            </View>
                        </View>
                        <ButtonGroup
                            onPress={(index) => this.updateIndex(index)}
                            selectedIndex={selectedIndex}
                            buttons={buttons}
                            buttonStyle={{ backgroundColor: '#E9DDDD' }}
                            selectedButtonStyle={{ backgroundColor: this.state.selectedIndex == 0 ? '#FFA778' : '#BFEBFF' }}
                            innerBorderStyle={{ color: 'grey', width: 2 }}
                            selectedTextStyle={{ color: 'white' }}
                            containerStyle={{ height: 40 }} />
                        <View style={{ width: '95%', backgroundColor: '#F3E8E8',alignSelf:'center' }}>
                            {this.state.selectedIndex == 0
                                ?
                                <Text>{this.props.item.book_subject}</Text>
                                :
                                <Text>a.s</Text>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

}
