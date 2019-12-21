import React, {Component} from 'react';
import styles from "./src/Style"
import { View, Button, Modal, Text} from 'react-native';
import Link from "./src/Link"


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View>
        <Link />
      </View>
    );
  };
};
