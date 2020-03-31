import { Alert } from 'react-native'

var SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase({ name: 'Records.db', location: 'default' })

class Database {
    constructor() {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Books(book_id INTEGER PRIMARY KEY NOT NULL,book_name VARCHAR(30),book_author VARCHAR(30),book_uri VARCHAR(50),book_descr VARCHAR(350),book_page INTEGER,book_subject VARCHAR(350),book_star INTEGER,book_date VARCHAR(25))', [])
        })
    }
    get BookList() {
        return 0
    }
    get movieList() {

    }
    saveBook = (bookObject) => {
        //console.log(bookObject.book_star)
        db.transaction(tx => {
            tx.executeSql('INSERT INTO Books (book_name,book_author,book_uri,book_descr,book_page,book_subject,book_star,book_date) VALUES (:book_name,:book_author,:book_uri,:book_descr,:book_page,:book_subject,:book_star,:book_date)', [bookObject.book_name, bookObject.book_author, bookObject.book_uri, bookObject.book_descr, bookObject.book_page, bookObject.book_subject, bookObject.book_star,bookObject.book_date]);
        })
        Alert.alert('Saved with success')
    }
    deleteBook = (index) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM Books where book_id=?', [index], (tx, results) => {
                //console.log('results',results.rowAffected);
            })
        })
        Alert.alert('Deleted with success')
    }

}

Database.shared = new Database()
export default Database