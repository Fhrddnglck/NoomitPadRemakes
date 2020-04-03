import { Alert } from 'react-native'
var SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase({ name: 'Records.db', location: 'default' })


var lastId = -1

class Database {
    constructor() {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Books(book_id INTEGER PRIMARY KEY NOT NULL,book_name VARCHAR(30),book_author VARCHAR(30),book_uri VARCHAR(50),book_descr VARCHAR(350),book_page INTEGER,book_subject VARCHAR(350),book_star INTEGER,book_date VARCHAR(25),book_citations VARCHAR(500))', [])
        })
    }
    insertBook = (bookObject) =>{
        return new Promise(resolve=>{
            db.transaction(tx => {
                tx.executeSql('INSERT INTO Books (book_name,book_author,book_uri,book_descr,book_page,book_subject,book_star,book_date,book_citations) VALUES (:book_name,:book_author,:book_uri,:book_descr,:book_page,:book_subject,:book_star,:book_date,:book_citations)', [bookObject.book_name, bookObject.book_author, bookObject.book_uri, bookObject.book_descr, bookObject.book_page, bookObject.book_subject, bookObject.book_star, bookObject.book_date, bookObject.book_citations]
                ,function(tx,result){
                    lastId = result.insertId
                    resolve(lastId)
                });
            })
        })
    }
    saveBook = async (bookObject) => {
        const id = await this.insertBook(bookObject)
        return id
    }
    deleteBook = (index) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM Books where book_id=?', [index], (tx, results) => {
                //console.log('results',results.rowAffected);
            })
        })
        Alert.alert('Deleted with success')
    }

    updateBook = (item,id)=>{
        db.transaction(tx=>{
            tx.executeSql('UPDATE Books SET book_name = ? , book_author = ? , book_uri = ? , book_descr = ? , book_page = ? , book_subject = ? , book_star = ? , book_date = ? , book_citations = ? WHERE book_id=?',[item.book_name,item.book_author,item.book_uri,item.book_descr,item.book_page,item.book_subject,item.book_star,item.book_date,item.book_citations,id])
        })
    }


    updateCitation = (id,newText) => {
        newText = newText.concat('appendstringfromsqlite')
        //console.log(newText+'_o_o'+id)
        db.transaction(tx=>{
            tx.executeSql('UPDATE Books SET book_citations=book_citations || ? WHERE book_id=?',[newText,id]
            ,function(tx,result){
                //console.log(result)
            })
        })
    }

}

Database.shared = new Database()
export default Database