import React, {Component} from 'react';
import styles from "./Style"
import { View, Button, Modal, Text} from 'react-native';
import Calculate from "./Calculate";
import Camera from "./Camera";


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalCalculate: false,
      modalCamera: false,
    }
  }

  CalculateOn(){
    this.setState({ modalCalculate: true})
  }

  CalculateOff(){
    this.setState({ modalCalculate: false })
  }
  
  CameraOn(){
    this.setState({ modalCamera: true })
  }

  CameraOff(){
    this.setState({ modalCamera: false })
  }

  render() {
    return (
      <View>
        <View style={styles.countArea}>
        </View>
        
        <Button
          onPress={() => this.CalculateOn()}
          title="買ったものを入力する"
        />
        <Button
        onPress={() => this.CameraOn()}
        title="レシートを撮影する"
        />

{/* 計算機用モーダル */}
        <Modal
        visible={this.state.modalCalculate}
        animationType={"fade"}
        onRequestClose={() => this.CalculateOff()}
        >
          <Calculate />
          
          <Button
              onPress={() => this.CalculateOff()}
              title="閉じる"
          />

        </Modal>


  {/* カメラ用モーダル */}
        <Modal
          visible={this.state.modalCamera}
          animationType={"fade"}
          onRequestClose={() => this.CameraOff()}>

          <Camera/>

          <Button 
            onPress={() => this.CameraOff()}
            title="閉じる"
            />
        </Modal>
      </View>
    );
  };
};

