import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    SafeAreaView,
    Dimensions,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import Database from '../Database'
import { Rating, AirbnbRating } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

var object

class UpdateBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: null,
            bookid : -1,
            bookName: '',
            bookAuthor: '',
            bookPage: 0,
            bookSubject: '',
            bookUri: '',
            bookDescription: '',
            bookDate: '',
            bookStar: 3
        }
    }
    handleChoosePhoto = () => {
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ bookUri: response.uri, photo: response });
            }
        })
    }
    updateBookHandle = () => {
        var day = new Date()
        var currentDate = (day.getDate() + '.' + (parseInt(day.getMonth()) + 1) + '.' + day.getFullYear()).toString()
        object = `{ "book_name":"${this.state.bookName}","book_author":"${this.state.bookAuthor}","book_uri":"${this.state.bookUri}","book_descr":"${this.state.bookDescription}","book_page":${this.state.bookPage},"book_subject":"${this.state.bookSubject}","book_star":${this.state.bookStar},"book_date":"${currentDate}","book_citations":"${this.props.item.book_citations}"}`
        object = JSON.parse(object)
        console.log(object)
    }
    render() {
        const { photo } = this.state
        if (!this.props.modalVisible) { //IF MODALVISIBLE FALSE RETURN NULL
            return null;
        }
        return (
            <Modal
            animationType='fade'
            transparent={true}
        >
            <View style={{ flex: 1, backgroundColor: '#F3EBEB', width: '90%',alignSelf:'center' }}>
                <View style={{ flex: 0.4, backgroundColor: '#AC667C', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                onPress = {this.props.onCloseUpdate}
                >
                    <Ionicons
                    name = 'ios-close'
                    color='white'
                    size = {72}
                    />
                </TouchableOpacity>
                    <ImageBackground
                    source={{uri:this.props.item.book_uri}}
                    resizeMode='cover'
                    style={{ width: width / 3.5, height: width / 3.5,shadowColor: 'black', shadowOffset: { width: 3, height: 4 }, shadowOpacity: 0.4, shadowRadius: 15, elevation: 15 }}>
                        {photo && (
                            <Image
                                source={{ uri: photo.uri }}
                                style={{ width: width / 3.5, height: width / 3.5}}
                            />)}
                    </ImageBackground>
                    <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                            <Ionicons
                                name='ios-add'
                                size={width / 7}
                                color='#AC667C'
                            />
                        </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 49 }} showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white', width: '90%', marginTop: -32, alignSelf: 'center', height: height / 2, maxHeight: height / 1.5 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 36, color: '#B79993', fontWeight: '100' }}>Update Book</Text>
                        <View style={styles.inputItem}>
                            <MaterialCommunityIcons
                                name='book-open-page-variant'
                                color='#AC667C'
                                size={25}
                                style={{ width: 25, marginLeft: 16 }}
                            />
                            <TextInput
                                defaultValue = {this.props.item.book_name}
                                onChangeText={(value) => this.setState({ bookName: value })}
                                placeholder='Book Name'
                                style={{ width: '80%', marginRight: 'auto', marginLeft: 8, color: '#B79993' }}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <Ionicons
                                name='ios-person'
                                color='#AC667C'
                                size={25}
                                style={{ width: 25, marginLeft: 16 }}
                            />
                            <TextInput
                                defaultValue = {this.props.item.book_author}
                                onChangeText={(value) => this.setState({ bookAuthor: value })}
                                placeholder='Book Author'
                                style={{ width: '80%', marginRight: 'auto', marginLeft: 8, color: '#B79993' }}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <Foundation
                                name='page-multiple'
                                color='#AC667C'
                                size={25}
                                style={{ width: 25, marginLeft: 16 }}
                            />
                            <TextInput
                                defaultValue = {this.props.item.book_page.toString()}
                                keyboardType='number-pad'
                                onChangeText={(value) => this.setState({ bookPage: value })}
                                placeholder='Book Page'
                                style={{ width: '80%', marginRight: 'auto', marginLeft: 8, color: '#B79993' }}
                            />
                        </View>
                        <View style={[styles.inputItem, { height: height / 8, borderRadius: 15 }]}>
                            <MaterialCommunityIcons
                                name='text-subject'
                                color='#AC667C'
                                size={25}
                                style={{ width: 25, marginLeft: 16 }}
                            />
                            <TextInput
                            defaultValue = {this.props.item.book_subject}
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={(value) => this.setState({ bookSubject: value })}
                                placeholder='Book Subject'
                                style={{ width: '80%', marginRight: 'auto', marginLeft: 8, color: '#B79993' }}
                            />
                        </View>
                        <View style={[styles.inputItem, { height: height / 8, borderRadius: 15 }]}>
                            <FontAwesome
                                name='pagelines'
                                color='#AC667C'
                                size={25}
                                style={{ width: 25, marginLeft: 16 }}
                            />
                            <TextInput
                            defaultValue = {this.props.item.book_descr}
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={(value) => this.setState({ bookDescription: value })}
                                placeholder='Book Description'
                                style={{ width: '80%', marginRight: 'auto', marginLeft: 8, color: '#B79993' }}
                            />
                        </View>
                        <AirbnbRating
                            count={5}
                            reviews={["Terrible", "Bad", "Good", "Nice", "Perfect"]}
                            defaultRating={this.props.item.book_star}
                            size={36}
                            onFinishRating = {(value)=>this.setState({bookStar:parseInt(value)})}
                        />
                        <TouchableOpacity 
                        onPress = {()=>this.updateBookHandle()}
                        style={{ borderRadius: 180, width: '60%', justifyContent: 'center', alignItems: 'center', marginTop: 32, height: height / 8, shadowColor: 'black', shadowOffset: { width: 3, height: 4 }, shadowRadius: 16, shadowOpacity: 0.4, backgroundColor: 'white', elevation: 3 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#FEBF90' }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        newBook: () => dispatch({ type: 'new_book', NewBook: objectRedux })
    }
}


const styles = StyleSheet.create({
    inputItem: {
        borderRadius: 180,
        width: '80%',
        height: height / 15,
        shadowColor: 'black',
        shadowOpacity: 0.30,
        shadowRadius: 16,
        shadowOffset: { height: 4, width: 3 },
        elevation: 3,
        backgroundColor: 'white',
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBook)