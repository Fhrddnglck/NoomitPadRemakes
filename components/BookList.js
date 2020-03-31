import React from 'react'
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    StatusBar,
    SafeAreaView
} from 'react-native';
import CustomModal from './CustomModal'
import { connect } from 'react-redux'

import Database from '../Database'
import { Rating } from 'react-native-elements'
import Book from './Book'
var reduxIndex

class BookList extends React.Component {
    state = {
        modalVisible: false,
        currentUri: '',
        currentDetail: '',
    }

    deleteBook = (index, listIndex) => {
        reduxIndex = listIndex
        Database.shared.deleteBook(index)
        this.props.deleteBook()
    }
    showModal = (uri, desc) => {
        this.setState({
            modalVisible: !this.state.modalVisible,
            currentUri: uri,
            currentDetail: desc
        });
    };

    render() {
        return (
            <ImageBackground style={{ flex: 1 }} source={require('../src/images/BACK.png')} resizeMode='cover'>
                <StatusBar
                    backgroundColor='transparent'
                    translucent={true}
                />
                <SafeAreaView style={{alignItems:'center'}}>
                    <CustomModal modalVisible={this.state.modalVisible} onClose={this.showModal}>
                        <ImageBackground
                            source={{ uri: this.state.currentUri }}
                            style={{ width: '100%', height: 500 }}
                        >
                            <Text>{this.state.currentDetail}</Text>
                        </ImageBackground>
                    </CustomModal>
                    <Text style={{fontSize:25,marginTop:30}}>Showing {this.props.bookListRedux.length} books</Text>
                    <FlatList
                        style={{ marginTop: 36, width: '95%' }}
                        data={this.props.bookListRedux}
                        keyExtractor={(index) => index}
                        renderItem={({ item, index }) =>
                            <Book item={item} index={index} deleteItem = {this.deleteBook} />
                        }
                    />
                </SafeAreaView>
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
        deleteBook: () => dispatch({ type: 'delete_book', DeleteBookIndex: reduxIndex })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)
