import React, {Component} from 'react';
import styles from "./Style"
import { View, Button, Modal, Text} from 'react-native';
import Calculate from "./Calculate";
import Camera from "./Camera";
import Category from "./Category";


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalCalculate: false,
      modalCamera: false,
      moneys: []
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
          title="計算機"
        />

        <Text>
          {
        this.state.moneys.map( money => {
              return (
              <Text className="task" key={ money.id }>
                { money.price } 
              </Text>
              )
          })
          }
        </Text>

        <Button
        onPress={() => this.CameraOn()}
        title="Camera"
        />

        <Modal
        visible={this.state.modalCalculate}
        animationType={"fade"}
        onRequestClose={() => this.CalculateOff()}
        >
          <Calculate />

          <Category />
          
          <Button
              onPress={() => this.CalculateOff()}
              title="計算機を閉じる"
          />

        </Modal>

        <Modal
          visible={this.state.modalCamera}
          animationType={"fade"}
          onRequestClose={() => this.CameraOff()}>
          <Camera/>
          <Button 
            onPress={() => this.CameraOff()}
            title="カメラを閉じる"
            />
        </Modal>
      </View>
    );
  };
};
today = new Date;
console.log(today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate());

