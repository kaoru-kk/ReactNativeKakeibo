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
    }
  }

  modalOn(){
    this.setState({ cameraModal: true })
  }

  modalOff(){
    this.setState({ cameraModal: false })
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
      this.setState({imageText: returnText})

      //改行ごとに配列に入れる、
      textToArray = returnText.split("\n")
      finData = textToArray.filter(function(value){
        //文字列の１番目が¥のものだけ取得
        return value.charAt(0) === "¥"
      })
      console.log(finData);

      this.modalOn();

    }
  render(){
  return (
    <Root>
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
            style={{marginTop:100, marginLeft:30}}
            >
              {this.state.imageText}
          </Text>


        </Modal>
    </Root>
  )}
}

