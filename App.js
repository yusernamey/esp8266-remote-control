import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  TouchableHighlightBase
} from 'react-native';


export default class App extends Component {
  state = {
    allOn: false,
    firstOn: false,
    secondOn: false,
    messageReceived: ''
  }
  
  socket = new WebSocket('ws://192.168.8.105:81/');

  allOn = () => {
    if (this.state.allOn === false) {
      this.socket.send("5")
      setTimeout(() => {
        if (this.state.messageReceived === '5') {
          this.setState({
            firstOn: true,
            secondOn: true,
            allOn: true
          })
        }
      }, 500);
    }
    if (this.state.allOn === true) {
      this.socket.send("4")
      setTimeout(() => {
        if (this.state.messageReceived === '4') {
          this.setState({
            firstOn: false,
            secondOn: false,
            allOn: false
          })
        }
      }, 500);
    }
  }

  firstOn = () => {
    if (this.state.firstOn === false) {
      this.socket.send("1")
      setTimeout(() => {
        if (this.state.messageReceived === '1') {
          this.setState({firstOn: true})
        }
      }, 500);
    }
    if (this.state.firstOn === true) {
      this.socket.send("0")
      setTimeout(() => {
        if (this.state.messageReceived === '0') {
          this.setState({firstOn: false})
        }
      }, 500);
    }
  }

  secondOn = () => {
    if (this.state.secondOn === false) {
      this.socket.send("3")
      setTimeout(() => {
        if (this.state.messageReceived === '3') {
          this.setState({secondOn: true})
        }
      }, 500);
    }
    if (this.state.secondOn === true) {
      this.socket.send("2")
      setTimeout(() => {
        if (this.state.messageReceived === '2') {
          this.setState({secondOn: false})
        }
      }, 500);
    }
  }

  componentDidMount () {
    this.setState({
      allOn: false,
      firstOn: false,
      secondOn: false
    })
    this.socket.onmessage = ({data}) => {
      let message = '';
      switch (data) {
        case "balkono_lubos=OFF":
          message = '0';
          break;
        case "balkono_lubos=ON":
          message = '1';
          break;
        case "balkono_spintele=OFF":
          message = '2';
          break;
        case "balkono_spintele=ON":
          message = '3';
          break;
        case "balkonas=OFF":
          message = '4';
          break;
        case "balkonas=ON":
          message = '5';
          break; 
      } 
      this.setState({messageReceived: message})
  }
}

  render() {
    const {
      allOn,
      firstOn,
      secondOn
    } = this.state
    let color1 = 'green'
    let color2 = 'green'
    let color3 = 'green'
    let text1 = 'ON'
    let text2 = 'ON'
    let text3 = 'ON'
    if (allOn === true) {
      color3 = 'red'
      text3 = 'OFF'
    }
    if (firstOn === true) {
      color1 = 'red'
      text1 = 'OFF'
    }
    if (secondOn === true) {
      color2 = 'red'
      text2 = 'OFF'
    }
    return (
      <View style={styles.container}>
      <Text style={{fontSize: 30}}>Visi</Text>
      <StatusBar style="auto" />
      <View style={{width: 100}}>
      <Button
          title={text3}
          onPress={this.allOn}
          color={color3}
        />
      </View>
      <Text style={{fontSize: 30}}>Siena</Text>
      <StatusBar style="auto" />
      <View style={{width: 100}}>
      <Button
          title={text1}
          onPress={this.firstOn}
          color={color1}
        />
      </View>
        <Text style={{fontSize: 30}}>Spintele</Text>
      <StatusBar style="auto" />
      <View style={{width: 100}}>
      <Button
          title={text2}
          onPress={this.secondOn}
          color={color2}
        />
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
