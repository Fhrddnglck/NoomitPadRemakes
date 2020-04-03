import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
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
var objectRedux

class NewRecord extends React.Component {
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
    saveBook = async () => {
        console.log('giriyom')
        var day = new Date()
        var currentDate = (day.getDate() + '.' + (parseInt(day.getMonth()) + 1) + '.' + day.getFullYear()).toString()
        object = `{ "book_name":"${this.state.bookName}","book_author":"${this.state.bookAuthor}","book_uri":"${this.state.bookUri}","book_descr":"${this.state.bookDescription}","book_page":${this.state.bookPage},"book_subject":"${this.state.bookSubject}","book_star":${this.state.bookStar},"book_date":"${currentDate}","book_citations":"${''}"}`
        object = JSON.parse(object)
       var a =  await Database.shared.saveBook(object)
       objectRedux = `{ "book_id":${a},"book_name":"${this.state.bookName}","book_author":"${this.state.bookAuthor}","book_uri":"${this.state.bookUri}","book_descr":"${this.state.bookDescription}","book_page":${this.state.bookPage},"book_subject":"${this.state.bookSubject}","book_star":${this.state.bookStar},"book_date":"${currentDate}","book_citations":"${''}"}`
       objectRedux = JSON.parse(objectRedux)
        this.props.newBook();
        Alert.alert('Saved with success')
    }
    render() {
        const { photo } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F3EBEB', width: '100%' }}>
                <View style={{ flex: 0.4, backgroundColor: '#FC813C', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ width: width / 3.7, height: width / 3.8, backgroundColor: 'white', borderRadius: 180, shadowColor: 'black', shadowOffset: { width: 3, height: 4 }, shadowOpacity: 0.4, shadowRadius: 15, elevation: 15 }}>
                        {photo && (
                            <Image
                                source={{ uri: photo.uri }}
                                style={{ width: width / 3.5, height: width / 3.5, borderRadius: 180 }}
                            />)}
                    </View>
                    <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                            <Ionicons
                                name='ios-add'
                                size={width / 7}
                                color='white'
                            />
                        </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 49 }} showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white', width: '90%', marginTop: -16, alignSelf: 'center', height: height / 2, maxHeight: height / 1.5 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 36, color: '#B79993', fontWeight: '100' }}>New Book</Text>
                        <View style={styles.inputItem}>
                            <MaterialCommunityIcons
                                name='book-open-page-variant'
                                color='#E30000'
                                size={25}
                                style={{ width: 25, marginLeft: 16 }}
                            />
                            <TextInput
                                onChangeText={(value) => this.setState({ bookName: value })}
                                placeholder='Book Name'
                                style={{ width: '80%', marginRight: 'auto', marginLeft: 8, color: '#B79993' }}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <Ionicons
                                name='ios-person'
                                color='#E30000'
                                size={25}
                                style={{ width: 25, marginLeft: 16 }}
                            />
                            <TextInput
                                onChangeText={(value) => this.setState({ bookAuthor: value })}
                                placeholder='Book Author'
                                style={{ width: '80%', marginRight: 'auto', marginLeft: 8, color: '#B79993' }}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <Foundation
                                name='page-multiple'
                                color='#E30000'
                                size={25}
                                style={{ width: 25, marginLeft: 16 }}
                            />
                            <TextInput
                                keyboardType='number-pad'
                                onChangeText={(value) => this.setState({ bookPage: value })}
                                placeholder='Book Page'
                                style={{ width: '80%', marginRight: 'auto', marginLeft: 8, color: '#B79993' }}
                            />
                        </View>
                        <View style={[styles.inputItem, { height: height / 8, borderRadius: 15 }]}>
                            <MaterialCommunityIcons
                                name='text-subject'
                                color='#E30000'
                                size={25}
                                style={{ width: 25, marginLeft: 16 }}
                            />
                            <TextInput
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
                                color='#E30000'
                                size={25}
                                style={{ width: 25, marginLeft: 16 }}
                            />
                            <TextInput
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
                            defaultRating={3}
                            size={36}
                            onFinishRating = {(value)=>this.setState({bookStar:parseInt(value)})}
                        />
                        <TouchableOpacity 
                        onPress={() => this.saveBook()}
                        style={{ borderRadius: 180, width: '60%', justifyContent: 'center', alignItems: 'center', marginTop: 32, height: height / 8, shadowColor: 'black', shadowOffset: { width: 3, height: 4 }, shadowRadius: 16, shadowOpacity: 0.4, backgroundColor: 'white', elevation: 3 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#FEBF90' }}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewRecord)