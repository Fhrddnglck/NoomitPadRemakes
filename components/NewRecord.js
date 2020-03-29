import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native'
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux'
import Database from '../Database'

var object

class NewRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: null,
            bookName: '',
            bookAuthor: '',
            bookUri: '',
            bookDescription: ''
        }
    }
    handleChoosePhoto = () => {
        console.log('girdim')
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ bookUri: response.uri, photo: response });
            }
        })
    }
    saveBook = async() => {
        object = `{ "book_name":"${this.state.bookName}","book_author":"${this.state.bookAuthor}","book_uri":"${this.state.bookUri}","book_descr":"${this.state.bookDescription}" }`
        object = JSON.parse(object)
        Database.shared.saveBook(object)
        this.props.newBook();
    }

    render() {
        const { photo } = this.state
        return (
            <View>
                {photo && (
                    <Image
                        source={{ uri: photo.uri }}
                        style={{ width: 150, height: 150, marginTop: 16 }}
                    />)}
                <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                    <View style={{ marginTop: 25, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 180, borderColor: '#715BFF', borderWidth: 3 }}>
                        <Text style={{ fontSize: 64, fontWeight: 'bold', color: '#715BFF', marginBottom: 4 }}>+</Text>
                    </View>
                </TouchableOpacity>
                <TextInput
                    placeholder='Book Name'
                    style={{ width: '81%', color: '#383687', fontWeight: 'bold' }}
                    onChangeText={(value) => this.setState({ bookName: value })}
                />
                <TextInput
                    placeholder='Book Author'
                    style={{ width: '81%', color: '#383687', fontWeight: 'bold' }}
                    onChangeText={(value) => this.setState({ bookAuthor: value })}
                />
                <TextInput
                    placeholder='Book Description'
                    multiline={true}
                    numberOfLines={5}
                    style={{
                        backgroundColor: '#C8CEFF', width: 250, color: '#383687', fontWeight: 'bold', borderRadius: 25,
                        shadowColor: '#3100FF', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 10
                    }}
                    onChangeText={(value) => this.setState({ bookDescription: value })}
                />
                <TouchableOpacity style={{ marginTop: 36 }} onPress={() => this.saveBook()}>
                    <View style={{ backgroundColor: 'white', width: 169, height: 81, justifyContent: 'center', alignItems: 'center', marginTop: 2, borderRadius: 180 }}>
                        <Text style={{ fontSize: 45, fontWeight: 'bold', color: '#715BFF' }}>SAVE</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
        newBook: () => dispatch({ type: 'new_book', NewBook: object })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewRecord)