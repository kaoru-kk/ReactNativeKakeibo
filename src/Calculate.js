    import React, {Component} from 'react';
    import styles from "./Style"
    import {TouchableOpacity, Text, View} from 'react-native';

    export default class Calculate extends Component {
        constructor(props){
        super(props);
        this.state = {
        leftNum: 0,
        mark: "?",
        rightNum: 0,
        result: 0
        }
    }
    onNum(input){
        if (this.state.mark == "?"){
            let num = Number(String(this.state.leftNum) + String(input["i"]))
            this.setState({ leftNum: num })
        } else {
            let num = Number(String(this.state.rightNum) + String(input["i"]))
            this.setState({ rightNum: num })
        } 
    }
    onMark(input){
        if (input == "plus"){
        this.setState({  mark: "+"  })
        } else if (input == "minus") {
        this.setState({ mark: "-" })
        } else if (input == "times") {
        this.setState( { mark: "x"} )
        } else if (input == "divide") {
        this.setState({ mark: "➗"})
        } 
    }

    onEqual(){
        if (this.state.mark == "+") {
        this.setState( {result: this.state.leftNum+ this.state.rightNum })
        } else if (this.state.mark == "-") {
        this.setState( { result: this.state.leftNum- this.state.rightNum})
        } else if (this.state.mark == "x") {
        this.setState( { result: this.state.leftNum* this.state.rightNum})
        } else if (this.state.mark == "➗") {
        this.setState( { result: this.state.leftNum/ this.state.rightNum})
        }
    }

    onReset(){
        this.setState({ leftNum: 0, mark: "?", rightNum:0, result:0 })
    }

    render() {
        return (
        <View>
            <View style={styles.countArea}>
                <Text style={styles.value}>{this.state.leftNum}  {this.state.mark}  {this.state.rightNum}  =  {this.state.result}</Text>
            </View>

            <View style={styles.buttonArea}>

                <View style={{flexDirection: 'row'}}>
                    {array1.map(i => (
                        <TouchableOpacity style={styles.topbutton,styles.buttonNum} key={i} onPress={() => this.onNum({i})}>
                        <Text style={styles.buttonText}> {i} </Text>
                        </TouchableOpacity>
                    ))}
                </View> 

                <View style={{ flexDirection: 'row'}}>
                    {array2.map(i => (
                        <TouchableOpacity style={styles.topbutton, styles.buttonNum} key={i} onPress={() => this.onNum({i})} >
                        <Text style={styles.buttonText}> {i} </Text>
                        </TouchableOpacity>
                    ))}
                </View>

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
            </View>

        </View>
        );
    };
};


    const array1 = [];
    for (let i = 0; i< 5; i++) {
    array1[i] = i
    }

    const array2 = [];
    for (let i = 5; i< 10; i++) {
    array2[i] = i
    }