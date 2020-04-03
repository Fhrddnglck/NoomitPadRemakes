import React, { Component } from 'react'
import { Modal, View, Image, TouchableOpacity, Text, Dimensions, ImageBackground } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ButtonGroup } from 'react-native-elements'
import { TextInput, FlatList } from 'react-native-gesture-handler'
import Database from '../Database'

import { connect } from 'react-redux'

const { height } = Dimensions.get('window')
var newCitationText
class CustomModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            newCitations: '',
        }
    }
    //SON KALINAN YER -> YENİ KAYIT YAPILDIĞINDA BOOK_İD CUSTOM MODELE GELMİYOR, İD Yİ DATABASEYE GÖNDERİP ORDA UPDATE
    //EDİP BURDA STATE İLE FLATLİSTE YAZDIRIP RENDER EDİLDİĞİNDE item verilerini stateye atmak gerekiyor.

    onClose = () => {
        this.props.onClose() //ONCLOSE FUNCTION IN PROPS ONCLOSE
    };
    newCitation = (id) => {
        Database.shared.updateCitation(id, this.state.newCitations)
        this.props.append_citation(id)
    }
    updateIndex = (selectedIndex) => {
        this.setState({ selectedIndex })
    }

    newCitationText = (value) => {
        this.setState({ newCitations: value })
        newCitationText = ''
        newCitationText = value
    }

    component1 = () => <Text>Subject</Text>
    component2 = () => <Text>My citations</Text>

    render() {
        console.log(height)
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
                <View style={{ width: '90%', backgroundColor: '#F3EEEE', alignSelf: 'center', overflow: 'hidden', borderRadius: 30, height: height / 1.1, marginTop: 2 }}>
                    <View>
                        <ImageBackground
                            resizeMode='cover'
                            source={{ uri: this.props.item.book_uri }}
                            style={{ width: '100%', height: height / 3, marginBottom: 'auto' }}
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
                                {/* <Text style={{ color: 'grey', fontSize: 16 }}>20.02.2020-{this.props.item.book_date} between</Text> */}
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
                        <View style={{ width: '95%', backgroundColor: '#F3E8E8', alignSelf: 'center' }}>
                            {this.state.selectedIndex == 0
                                ?
                                <View>
                                    <Text>{this.props.item.book_subject}</Text>
                                </View>
                                :
                                <View style={{maxHeight:height>600?height/3:height/4}}>
                                    <FlatList
                                        data={this.props.bookListRedux[this.props.index].book_citations.split('appendstringfromsqlite')}
                                        keyExtractor={(index) => index}
                                        renderItem={({ item, index }) =>
                                            <View style={{ width: '100%', height: 25 }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item}</Text>
                                            </View>
                                        }
                                    />
                                    <View
                                        style={{ backgroundColor: 'white', width: '100%', height: height / 16, flexDirection: 'row' }}
                                    >
                                        <TextInput
                                            placeholder='Add new citations'
                                            style={{ width: '90%' }}
                                            multiline={true}
                                            numberOfLines={3}
                                            onChangeText={(value) => this.newCitationText(value)}
                                        />
                                        <TouchableOpacity
                                            onPress={() => this.newCitation(this.props.item.book_id)}
                                        >
                                            <Ionicons
                                                name='md-send'
                                                color='#CB2000'
                                                size={height / 25}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

}
function mapStateToProps(state) { //MAPLEME YAPARAK COMPONENTTE KULLANDIĞIMIZ COUNTERI APP TEKİ COUNTERE MATCHLEDİK
    return {
        bookListRedux: state.bookListRedux
    }
}
function mapDispatchToProps(dispatch) { //EĞER SADECE LİSTELEME YAPACAKSAK BUNA GEREK YOK AMA STATE'İ DEĞİŞTİRCEKSEK BU LAZIM
    return {
        append_citation: (id) => dispatch({ type: 'append_citation', appendText: newCitationText, bookId: id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal)
