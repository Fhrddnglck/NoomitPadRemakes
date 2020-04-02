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
            //console.log(bookItems)
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
        case 'append_citation':
            return {
                 ...state,
                 bookListRedux: state.bookListRedux.map(value=> value.book_id===action.bookId
                    ?
                     {...value,book_citations:value.book_citations.concat(action.appendText+'appendstringfromsqlite')}
                    :
                     value
                     )
             }
        //  var indexer
        //   state.bookListRedux.forEach((val,index)=>{
        //     console.log(val.book_id)
        //      if(val.book_id === action.bookId){
        //          indexer = index
        //        }
        //    })
        //   console.log(state.bookListRedux[indexer].book_citations.concat(action.appendText+'appendstringfromsqlite'))
        // //   state.bookListRedux[indexer].book_citations = state.bookListRedux[indexer].book_citations.concat('anasının gozu') 
        //state.bookListRedux.find(element=>element.book_id === action.bookId).book_citations.concat('appendstringfromsqlite')   
    }
    return state
}
