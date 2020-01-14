import React, {Component} from 'react';
import styles from "./src/Style"
import { View, Button, Modal, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Link from "./src/Link"
import config, {db} from "./src/Api_key";
import firebase from "firebase";


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
// データ保存用
    // const data = {
    //   productName: 'がてん',
    //   price: 222,
    //   category: '食費',
    //   date: "2019-09-01"
    // };
    
    // // Add a new document in collection "cities" with ID 'kkkk'
    // let setDoc = db.collection('kakeibos').doc('u9u99').set(data);

    const kakeiboTable = db.collection("kakeibos")
    var index = 0
    var arr1 = [];

    //kakeibosから複数券取得
    let kaoru = kakeiboTable.get()
      .then(snap => {
        if (snap.empty){
          console.log(no);
          return;
        }
        snap.forEach(function(doc) {
          let aa = doc.data();
          var arr2 = [];          
          arr2[0] = aa["productName"]
          
          arr2[1] = aa["price"]
          
          arr2[2] = aa["category"]
          
          arr2[3] = aa["date"]
          arr1[index] = arr2
          index++
        });
        //配列に入れれた！
        console.log(arr1);
      });

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

    const kakeiboTable = db.collection("kakeibos")


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
      
    <View>

      </View>
      </View>
    );
  };
};

