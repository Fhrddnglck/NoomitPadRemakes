var SQLite = require('react-native-sqlite-storage')

class Database {
    constructor(){
        const db = SQLite.openDatabase({name:'Records.db',location:'default'},successdb,errordb)        
    }
    get BookList(){
        return 0
    }
    get movieList(){
        
    }
}

Database.shared = new Database()
export default Database