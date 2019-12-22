import React, { useState, useEffect, Component } from 'react';
import {View, Text, Modal} from "react-native";
import { Camera } from 'expo-camera'; 
import { Button, Container, Icon,  Root } from "native-base";
import * as Permissions from "expo-permissions";
import styles from "./Style";
import Api from "./Api_key"

export default class Picture extends Component {
  constructor(props){
    super(props);
    this.state = {
      cameraModal: false,
      imageText: "",
      moneys: "",
      hasCameraPermission: null, 
      type: Camera.Constants.Type.back,
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  takePicture = async () => {

      let photo = await this.camera.takePictureAsync({
        base64: true
      });
      this.sendApi(photo.base64);
    };

  
    sendApi= async(image) =>{
      const body = JSON.stringify({
        requests: [
          {
            features: [{ type: "TEXT_DETECTION", maxResults: 1 }],
            image: {
              content: image
            }
          }
        ]
      });
      const response = await fetch("https://vision.googleapis.com/v1/images:annotate?key=" + Api["key"],
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: body
      });   
      const resJson = await response.json();
      const returnText = resJson.responses[0].fullTextAnnotation.text;
      this.setState({ imageText: returnText })

      //改行ごとに配列に入れる、
      textToArray = returnText.split("\n")

      //文字列の１番目が¥のものだけ取得
      finData = textToArray.filter(function(value){
        return value.charAt(0) === "¥"
      })

      buyMoney = new Array ;
      for(var i in finData){
        //数値に変換、￥を削除
        //まだ１，０００を変換は不可
        // buyMoney = (Number(finData[i].slice(1)));
        buyMoney[i] = (finData[i].slice(1));
      }
      console.log(buyMoney)
      //１、レシートの記載で最大のお金が支払ったお金になる
      //２、２番目に大きいお金が商品の合計税込価格
      //３、合計金額は２パターン
      //　　支払いと小計が同じ値段（ユーザーが丁度のお金で払う）
      //　　支払い＞小計のとき（ユーザーが小計より多く払う）

      this.modalOn();
    }

    modalOn(){
      this.setState({ cameraModal: true })
    }
  
    modalOff(){
      this.setState({ cameraModal: false })
    }





  render(){
  return (
    <Root>

    {
      this.state.hasCameraPermission ? (
        <Container style={styles.flexOne}>
        <Camera style={styles.flexOne}
        ref={ref => {
            this.camera = ref;
          }} >
          <View style={styles.flexOne}>
            <Button
              rounded
              icon
              onPress={() => this.takePicture()}
              style={styles.buttonCamera}
            >
              <Icon name="camera" style={styles.icon} />
            </Button>
          </View>
        </Camera>
      </Container>
        ) : <Text>カメラの使用が許可されていません！</Text>

    }



      <Modal
          visible={this.state.cameraModal}
          animationType={"fade"}
          onRequestClose={() => this.CameraOff()}>
          <Camera/>

          <Text 
            style={{marginTop:100, marginLeft:10}}
            onPress={() => this.modalOff()}
            >
            撮り直す
          </Text>

          <Text 
            style={{marginTop:100, marginLeft:20}}
            onPress={() => this.saveJson()}
            >
            保存する
          </Text>

          <Text 
            style={{marginTop:100, marginLeft:30}}
            >
              {this.state.imageText}
          </Text>


        </Modal>
    </Root>
  )}
}

