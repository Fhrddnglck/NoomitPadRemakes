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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import Database from '../Database'
import { Rating } from 'react-native-elements'

var object

class NewRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: null,
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
        var day = new Date()
        var currentDate = (day.getDate() + '.' + (parseInt(day.getMonth()) + 1) + '.' + day.getFullYear()).toString()
        console.log(currentDate)
        // this.setState({bookDate:currentDate})
        object = `{ "book_name":"${this.state.bookName}","book_author":"${this.state.bookAuthor}","book_uri":"${this.state.bookUri}","book_descr":"${this.state.bookDescription}","book_page":${this.state.bookPage},"book_subject":"${this.state.bookSubject}","book_star":${this.state.bookStar},"book_date":"${currentDate}" }`
        object = JSON.parse(object)
        Database.shared.saveBook(object)
        this.props.newBook();
    }
    // ratingCompleated=(rating)=>{
    //     console.log('rating is:'+rating)
    // }

    render() {
        const { photo } = this.state
        return (
            <ImageBackground style={{ flex: 1 }} source={require('../src/images/NewRecordBack.png')} resizeMode='cover'>
                <View style={{}}>
                    <View style={{backgroundColor:'red',width:180,height:180}}>
                        <View style={{ width: 169, height: 169, backgroundColor: 'white', borderRadius: 180 }}>
                            {photo && (
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={{ width: 169, height: 169, borderRadius: 180 }}
                                />)}
                        </View>
                        <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                            <View>
                                <MaterialCommunityIcons
                                    name='google-photos'
                                    color='grey'
                                    size={64}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Rating
                        ratingCount={5}
                        type='custom'
                        ratingColor='red'
                        defaultRating={3}
                        size={20}
                        onFinishRating={(val) => this.setState({ bookStar: val })}
                        tintColor='white'
                        showRating
                        fractions={0}
                        ratingBackgroundColor='grey'
                    />
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
                        keyboardType='number-pad'
                        placeholder='Book page'
                        style={{ width: '81%', color: '#383687', fontWeight: 'bold' }}
                        onChangeText={(value) => this.setState({ bookPage: value })}
                    />
                    <TextInput
                        placeholder='Book Description'
                        multiline={true}
                        numberOfLines={2}
                        style={{
                            backgroundColor: '#C8CEFF', width: 250, color: '#383687', fontWeight: 'bold', borderRadius: 25,
                            shadowColor: '#3100FF', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 10
                        }}
                        onChangeText={(value) => this.setState({ bookDescription: value })}
                    />
                    <TextInput
                        placeholder='Book Subject'
                        multiline={true}
                        numberOfLines={2}
                        style={{
                            backgroundColor: '#C8CEFF', width: 250, color: '#383687', fontWeight: 'bold', borderRadius: 25,
                            shadowColor: '#3100FF', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 10
                        }}
                        onChangeText={(value) => this.setState({ bookSubject: value })}
                    />
                    <TouchableOpacity style={{ marginTop: 36 }} onPress={() => this.saveBook()}>
                        <View style={{ backgroundColor: 'white', width: 169, height: 81, justifyContent: 'center', alignItems: 'center', marginTop: 2, borderRadius: 180 }}>
                            <Text style={{ fontSize: 45, fontWeight: 'bold', color: '#715BFF' }}>SAVE</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
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