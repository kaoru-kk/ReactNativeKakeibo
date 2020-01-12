import React, {Component} from 'react';
import styles from "./src/Style"
import firebase from "firebase";
import { View, Button, Modal, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Link from "./src/Link"
import 'firebase/firestore';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      moneys: [],
      tableHead: ['名前', '値段', 'カテゴリ', '日付', "更新" , "削除"],
    }
    this.getMoneys = this.getMoneys.bind(this)
  }

  //アプリを開くとdb.jsonのデータを取りに行く
  componentWillMount(){
    const config = {
      apiKey: "AIzaSyCZzW8ErWsgysg7sorvmLlO8EwyW3T8DUk",
      authDomain: "kakeibo-a0ef8.firebaseapp.com",
      databaseURL: "https://kakeibo-a0ef8.firebaseio.com",
      projectId: "kakeibo-a0ef8",
      storageBucket: "kakeibo-a0ef8.appspot.com",
      messagingSenderId: "661128524394",
      appId: "1:661128524394:web:858835325c97ec340d5013",
      measurementId: "G-VK7QLYLT6N"
    };

    let firebaseApp =  firebase.initializeApp(config);
    let db = firebaseApp.firestore();
    const data = {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    };
    
    // Add a new document in collection "cities" with ID 'LA'
    let setDoc = db.collection('kakeibos').doc('kkkkk').set(data);

    const aa = db.collection("kakeibos")
    //kakeibosから複数券取得
    let kaoru = aa.get()
      .then(snap => {
        if (snap.empty){
          console.log(no);
          return;
        }
        snap.forEach( doc => {
          console.log(doc.id, "=>" , doc.data());
        });
      })


    firebase.auth().onAuthStateChanged(user => {
      if (user){
        console.log("login");
      } else {
        console.log("logout1");
      }
    });
  }


  getMoneys(){

    fetch("https://kakeibo-a0ef8.firebaseio.com")  
    .then( response => response.json() )
    .then( json => { 
      this.setState({ moneys: json })
    })
  }

  updateMoney(moneyId){
    //更新は未完成
    fetch("http://localhost:3001/moneys/"+moneyId,{
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      body: JSON.stringify({ productName: "" })
  }

  deleteMoney(moneyId){
    fetch("http://localhost:3001/moneys/"+moneyId, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then (this.getMoneys)
  }




  render() {
    return (
      <View>
        <Link />

        <View style={styles.container}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          </Table>
        </View>
        <ScrollView style={{ marginTop: 24, marginLeft: 16}}>
          {this.state.moneys.map(i => (

            <View key={i.id} style={{  width: 382,flexDirection: 'row',borderWidth: 2, borderColor: '#c8e1ff'}}>
              <TextInput key={i.productName} style={{width: 62,borderWidth: 2, borderColor: '#c8e1ff'}}>{i.productName}</TextInput>
              <TextInput key={i.price} style={{width: 62,borderWidth: 2, borderColor: '#c8e1ff'}}>{i.price}</TextInput>
              <TextInput key={i.category} style={{width: 62,borderWidth: 2, borderColor: '#c8e1ff'}}>{i.category}</TextInput>
              <TextInput key={i.date} style={{width: 62,borderWidth: 2, borderColor: '#c8e1ff'}}>{i.date}</TextInput>
              <TouchableOpacity onPress={() => this.updateMoney(i.id)} >
                <Text style={{width: 62,borderWidth: 2, borderColor: '#c8e1ff'}}>update</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => this.deleteMoney(i.id)} style={ {marginBottom: 30}}>
                <Text style={{width: 62,borderWidth: 2, borderColor: '#c8e1ff'}}>delete</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>

      </View>
    );
  };
};

