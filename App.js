import { View, TextInput, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import colorStyle from './src/styles/colorStyle';
import { database, createTable } from './src/config/database';
import Lottie from 'lottie-react-native';

const App = () => {
  let styles = StyleSheet.create(colorStyle);

  const [task, setTask] = useState("");
  const [status] = useState(0);
  const [tugas, setTugas] = useState([]);

  const addTask = () => {
    if (!task) {
      alert('Masukan tugas!');
      return false
    };
    database.transaction(txn => {
      txn.executeSql(`INSERT INTO tugas (nama, status) VALUES (?,?)`, [task, status],
        (sqlTxn, res) => {getTasks()}
      );
    });
  }

  const getTasks = () => {
    database.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM tugas ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          let len = res.rows.length;
          if (len > 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              result.push({ id: item.id, nama: item.nama, status: item.status });
            };
            setTugas(result);
            setTask('');
          } else if (len == 0) {
            setTugas([]);
          };
        }
      );
    });
  }

  const handleUpdate = (e) => {
    database.transaction(txn => {
      txn.executeSql(`UPDATE tugas SET status = 1 WHERE id = ${e.id};`,[],() => {getTasks()});
    });
  }

  const handleDelete = (e) => {
    database.transaction(txn => {
      txn.executeSql(
        `DELETE FROM tugas WHERE id = ${e.id}`, []
        , () => {
          getTasks();
        },
      );
    });
  }

  useEffect(() => {
    createTable();
    getTasks();
  }, []);

  const listTugas = tugas.map((result, index) => {
    return (
      <View key={result.id}>
        <TouchableOpacity
        onPress={
          () => Alert.alert(
            'Tugas ini gimana?',
            'Ubah statusnya boleh hapus atau sudah.',
        [
          {
            text: 'Batal'
          },
          {
            text: 'Hapus',
            onPress: () => handleDelete(result)
          },
          {
            text: 'Sudah',
            onPress: () => handleUpdate(result)
          }
        ]
        )} style={styles.resultBar}>
          <Text style={{ textAlign: 'center', textDecorationLine: result.status === 0 ? '' : 'line-through' }}>{result.nama}</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.animaCont}>
        <Lottie source={require('./src/animation/typing-animation.json')} autoPlay loop />
      </View>
      <View>
        <Text style={styles.title}>To Do List</Text>
        <Text style={styles.subTitle}>Tulis apa saja kegiatanmu hari ini. Supaya tidak lupa!</Text>
      </View>
      <View style={{ paddingTop: 20, alignItems: 'center' }}>
        <TextInput onChangeText={setTask} value={task} placeholder='Masukan tugas kamu...' style={styles.inputBar} />
        <TouchableOpacity onPress={addTask} style={{ backgroundColor: '#4299E1', marginTop: 20, paddingHorizontal: 25, paddingVertical: 10, borderRadius: 10 }}>
          <Text style={{ color: '#FFFFFF' }}>Tambah</Text>
        </TouchableOpacity>
        <View style={styles.listContainer}>
          {listTugas}
        </View>
      </View>
    </ScrollView>
  )
}



export default App