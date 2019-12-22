    import React, {Component} from 'react';
    import styles from "./Style"
    import {TouchableOpacity, Text, View, TextInput} from 'react-native';

    export default class Calculate extends Component {
        constructor(props){
        super(props);
        this.state = {
        leftNum: 0,
        mark: "?",
        rightNum: 0,
        result: 0,
        category: 0,
        calculateButton: false,
        inputText: "",
        }
        this.onChangeText = this.onChangeText.bind(this);
    }
    outputEvent(result){
        if (result == true){
            this.setState({ calculateButton: true })
        }else if (result == false ){
            this.setState({ calculateButton: false })
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

    selectCategory(val){
        this.setState( { category: val } )
    }

    onSubmit(){
        today = new Date;

        //電卓を使っているかどうかで条件分岐している
        if (this.state.calculateButton == true){
            resultNum = this.state.result;
        }else if(this.state.calculateButton == false){
            resultNum = this.state.leftNum;
        }

        fetch("http://localhost:3001/moneys", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'      
            },
            body: JSON.stringify({ productName: this.state.inputText, category: this.state.category , price: resultNum, date: (today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate())})
        })
    }

    onChangeText(text){
        this.setState({ inputText: text["nativeEvent"]["text"] });
    }



    render() {
        return (
        <View>
            <View style={styles.countArea}>
                {this.state.calculateButton ?  <Text style={styles.value}>{this.state.leftNum} {this.state.mark}  {this.state.rightNum}  =  {this.state.result}</Text> :　<Text style={styles.value}>{this.state.leftNum}</Text> }
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

                {this.state.calculateButton ? (
                
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
                ) : null}

                {this.state.calculateButton ? 
                (
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => this.outputEvent(false)}>
                        <Text>電卓を閉じる{this.state.calculateButton} </Text>
                    </TouchableOpacity>
                </View>
                )
                :
                (
                    <View style={{ flexDirection: 'row'}}>               
                        <TouchableOpacity onPress={() => this.outputEvent(true)}>
                            <Text>電卓を使う{this.state.calculateButton}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory("食費")}>
                        <Text style={styles.buttonText}> 食費 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory("遊び")}>
                        <Text style={styles.buttonText}> 遊び </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory("交通費")}>
                        <Text style={styles.buttonText}> 交通 </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory("光熱費")} >
                        <Text style={styles.buttonText}> 光熱 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory("固定費")}>
                        <Text style={styles.buttonText}> 固定 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonCategory, styles.textCategory]} onPress={() => this.selectCategory("雑費")}>
                        <Text style={styles.buttonText}> 雑費 </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TextInput
                    style={{
                        width: 200, height: 20, borderColor: "gray",borderWidth: 1, marginTop:30
                    }}
                    value={this.state.inputText}
                    onChange={this.onChangeText}
                    placeholder={"買ったものを入力してね"}
                    ></TextInput>
                </View>

                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={[styles.submitButton]} onPress={() => this.onSubmit()}>
                        <Text style={styles.buttonText}> 送信 </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
        );
    };
};

//０−９のボタンを作るための配列
    const array1 = [];
    for (let i = 0; i< 5; i++) {
    array1[i] = i
    }

    const array2 = [];
    for (let i = 5; i< 10; i++) {
    array2[i] = i
    }