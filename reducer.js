var SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase({ name: 'Records.db', location: 'default' })
let bookItems = []; //todo will be change

const initialState = { //GLOBAL STATE
    bookListRedux: [],
}

export const initReduxToDb = async() => {
    await db.transaction((tx) => { //WILL BE CHANGE
        tx.executeSql('SELECT * FROM Books', [], (tx, results) => {
            for (var i = 0; i < results.rows.length; i++) {
                bookItems.push(results.rows.item(i));
            }
            initialState.bookListRedux = [...bookItems]                                   //state initialize for book list
        })
    })
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'new_book':
            return {
                ...state,
                bookListRedux: [...state.bookListRedux, action.NewBook]
            }
        case 'delete_book':
            return {
                ...state,
                bookListRedux: [...state.bookListRedux.filter(item => item != state.bookListRedux[action.DeleteBookIndex])]
            }
    }
    return state
}
