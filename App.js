import React, {Component} from 'react';
import styles from "./src/Style"
import { View, Button, Modal, Text} from 'react-native';
import Calculate from "./src/Calculate";
import Camera from "./src/Camera";
import Category from "./src/Category";


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalCaluclate: false,
      modalCamera: false,
      moneys: []
    }
  }

  componentWillMount(){
    this.fetchMoney()
  }

  fetchMoney(){
    fetch("http://localhost:3001/moneys")
    .then( response => response.json() )
    .then( json => {
      this.setState( { moneys: json } )
    })
  }
  CalculateOn(){
    this.setState({ modalCaluclate: true})
  }

  CalculateOff(){
    this.setState({ modalCaluclate: false })
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
        visible={this.state.modalCaluclate}
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

