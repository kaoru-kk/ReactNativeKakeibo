import React, {Component} from 'react';
import styles from "./Style"
import {TouchableOpacity, Text, View} from 'react-native';


export default class Category extends Component{
    constructor(props){
        super(props)
        this.state = {
            //
        }
    }
    
    render(){
        return(
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.button, styles.buttonUpText]} onPress={() => this.onMark("plus")}>
                    <Text style={styles.buttonText}> + </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonMinus]} onPress={() => this.onMark("minus")}>
                    <Text style={styles.buttonText}> - </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonTimes]} onPress={() => this.onMark("times")}>
                    <Text style={styles.buttonText}> x </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonDivide]} onPress={() => this.onMark("divide")}>
                    <Text style={styles.buttonText}> ÷ </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.button, styles.buttonEqual]} onPress={() => this.onEqual()} >
                    <Text style={styles.buttonText}> = </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonReset]} onPress={() => this.onReset()}>
                    <Text style={[styles.buttonResetText]}>リセット</Text>
                </TouchableOpacity>
            </View>
        )
    }
}