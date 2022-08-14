import { openDatabase } from 'react-native-sqlite-storage';

const database = openDatabase({
  name: 'namiraTaskDB'
});

const createTable = () => {
  database.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS tugas (id INTEGER PRIMARY KEY AUTOINCREMENT, nama VARCHAR(255), status INTEGER(11))`,
      [],
      (sqlTxn, res) => {
        // console.log('table created successfully.');
      },
      (error) => {
        // console.log('error on creating table ' + error.message);
      }
    );
  });
}

export {database, createTable};