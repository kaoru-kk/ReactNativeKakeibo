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

    selectCategory(){
        console.log("select")
    }
    
    render(){
        return(
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory("plus")}>
                    <Text style={styles.buttonText}> 食費 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory("minus")}>
                    <Text style={styles.buttonText}> 遊費 </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory("times")}>
                    <Text style={styles.buttonText}> 交通 </Text>
                </TouchableOpacity>

                
                <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory()} >
                    <Text style={styles.buttonText}> 光熱 </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory("divide")}>
                    <Text style={styles.buttonText}> 固定 </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory("divide")}>
                    <Text style={styles.buttonText}> 雑費 </Text>
                </TouchableOpacity>
            </View>
        )
    }
}