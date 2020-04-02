import React from 'react'
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    SafeAreaView
} from 'react-native';
import CustomModal from './CustomModal'
import { connect } from 'react-redux'
import { AdMobBanner } from 'react-native-admob'
import Database from '../Database'
import { Rating } from 'react-native-elements'
import Book from './Book'
var reduxIndex

class BookList extends React.Component {
    state = {
        modalVisible: false,
        item: []
    }

    deleteBook = (index, listIndex) => {
        reduxIndex = listIndex
        Database.shared.deleteBook(index)
        this.props.deleteBook()
    }
    showModal = (item) => {
        this.setState({
            item: item,
            modalVisible: !this.state.modalVisible,
        });
    };
    closeModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    render() {
        return (
            <ImageBackground style={{ flex: 1 }} source={require('../src/images/BACK.png')} resizeMode='cover'>
                <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <CustomModal modalVisible={this.state.modalVisible} onClose={this.closeModal} item={this.state.item} />

                    <Text style={{ fontSize: 25, marginTop: 30 }}>Showing {this.props.bookListRedux.length} books</Text>
                    {/* <AdMobBanner
                        adSize="fullBanner"
                        adUnitID="ca-app-pub-1457835335539533/4892838374"
                        testDevices={[AdMobBanner.simulatorId]}
                        onAdFailedToLoad={error => console.error(error)}
                    /> */}
                    <FlatList
                    showsVerticalScrollIndicator = {false} //new added
                        style={{ marginTop: 25, width: '95%' }}
                        contentContainerStyle={{ paddingBottom: 49 }}
                        data={this.props.bookListRedux}
                        keyExtractor={(index) => index}
                        renderItem={({ item, index }) =>
                            <Book item={item} index={index} deleteItem={this.deleteBook} openModal={this.showModal} />
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
