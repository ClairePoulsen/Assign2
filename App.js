import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const Stack = createNativeStackNavigator();

// Function to dismiss keyboard
const dismissKeyboard = () => {
  Keyboard.dismiss();
}

// Stack of screens
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing"
          component={Landing}
          options={{ 
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            }
           }}
          />
        <Stack.Screen name="Emojigotchi"
          component={Emojigotchi}
          options={
            ({route}) => ({
              title: route.params.name, 
              headerTitleAlign: 'center',
            })}
          />
          <Stack.Screen name="Funeral"
            component={Funeral}
            options={
              ({route}) => ({
                title: "I'm Sorry for Your Loss",
                headerTitleAlign: 'center',
            })}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// Landing page
const Landing = ({navigation}) => {

  const [name, onChangeName] = React.useState('');
  const [diffMod, changeDiff] = React.useState(10); // Let the default difficulty be Easy
  const [color1, changeColor1] = React.useState('lightgrey');
  const [color2, changeColor2] = React.useState('lightgrey');
  const [color3, changeColor3] = React.useState('lightgrey');

  return (
    <Pressable style={styles.container} onPress={dismissKeyboard}>
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Welcome to Emojigotchi!</Text>
      </View>
      <View style={styles.instructions}>
        <Text style={styles.instText}>To start playing, simply give your Emojigotchi a name, and then select what color you would like it to be!</Text>
      </View>
      <View style={styles.nameContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder='Emojigotchi Name'
        />
      </View>
      <View style={styles.buttonRow}>
      <Pressable 
          style={[{borderColor: color1}, styles.difficulty]}
          onPress={() => {changeDiff(10),
          changeColor1('black'),
          changeColor2('lightgrey'),
          changeColor3('lightgrey')}}>
          <Text style={styles.colorText}>Easy</Text>
        </Pressable>
        <Pressable 
          style={[{borderColor: color2}, styles.difficulty]}
          onPress={() => {changeDiff(5),
            changeColor1('lightgrey'),
            changeColor2('black'),
            changeColor3('lightgrey')}}>
          <Text style={styles.colorText}>Medium</Text>
        </Pressable>
        <Pressable 
          style={[{borderColor: color3}, styles.difficulty]}
          onPress={() => {changeDiff(1),
            changeColor1('lightgrey'),
            changeColor2('lightgrey'),
            changeColor3('black')}}>
          <Text style={styles.colorText}>Hard</Text>
        </Pressable>
      </View>
      <View style={styles.buttonRow}>
        <Pressable 
          style={styles.greenPress}
          onPress={() => {navigation.navigate('Emojigotchi',
          {name: name, color: 'green', diffMod: diffMod}
          );}}>
          <Text style={styles.colorText}>Green</Text>
        </Pressable>
        <Pressable
          style={styles.bluePress}
          onPress={() => {navigation.navigate('Emojigotchi',
          {name: name, color: 'blue', diffMod: diffMod}
          );}}>
          <Text style={styles.colorText}>Blue</Text>
        </Pressable>
        <Pressable
          style={styles.redPress}
          onPress={() => {navigation.navigate('Emojigotchi',
          {name: name, color: 'red', diffMod: diffMod}
          );}}>
          <Text style={styles.colorText}>Red</Text>
        </Pressable>
        <Pressable
          style={styles.purplePress}
          onPress={() => {navigation.navigate('Emojigotchi',
          {name: name, color: 'purple', diffMod: diffMod}
          );}}>
          <Text style={styles.colorText}>Purple</Text>
        </Pressable>
      </View>
    </Pressable>
  )
}

// Emojigotchi interaction page
const Emojigotchi = ({navigation, route}) => {

  return (
    <View style={styles.container}>
      {/* navigation passed as a prop so that the component can render a navigate function */}
      <Emoticon color={route.params.color} name={route.params.name} diffMod={route.params.diffMod} navigation={navigation}/>
    </View>
  )
}

// Funeral page
const Funeral = ({route}) => {

  let grave = {uri: 'https://media.istockphoto.com/id/998217018/vector/stone-tombstone-rip-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=tJsLN4L86RTV8_Tsqe9fYiThH4PK01dZlTM2At0cXDg='};

  return (
    <View style={styles.container}>
      <View style={styles.instructions}>
        <Text style={styles.instText}>Rest In Peace, {route.params.name}, you will be missed.</Text>
      </View>
      <Image source={grave} style={styles.graveImg}/>
    </View>
  )
}

// Emoticon class for the emojigotchi interaction
class Emoticon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diffMod: props.diffMod,
      emotiName: props.name,
      color: props.color,
      emote: '=D',
      rotate: '90deg',
      percA: 100,
      percB: 100,
      percC: 100,
      death: false,
    };
  }

  setPercA = (percent) => {
    this.setState({
      percA: percent,
    });
  }

  setPercB = (percent) => {
    this.setState({
      percB: percent,
    });
  }

  setPercC = (percent) => {
    this.setState({
      percC: percent,
    });
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  tick() {
    let avgTime = ((this.state.percA + this.state.percB + this.state.percC) / 3);
    if(avgTime == 0) {
      this.setState({
        emote: 'DX',
        rotate: '-90deg',
        death: true,
      })
      clearInterval(this.timerID);
    } else if(avgTime > 0 && avgTime <= 20) {
      this.setState({
        emote: 'D=',
        rotate: '-90deg',
      })
    } else if(avgTime > 20 && avgTime <= 40) {
      this.setState({
        emote: '=(',
        rotate: '90deg',
      })
    } else if(avgTime > 40 && avgTime <= 60) {
      this.setState({
        emote: '=|',
        rotate: '90deg',
      })
    } else if(avgTime > 60 && avgTime <= 80) {
      this.setState({
        emote: '=)',
        rotate: '90deg',
      })
    } else if(avgTime > 80 && avgTime <= 100) {
      this.setState({
        emote: '=D',
        rotate: '90deg',
      })
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.timerID);
    this.setState({timerID: null})
  }

  render() {
    const {navigation} = this.props;
    return(
      <>
      <View style={styles.emojiArea}>
        <Text style={[
          {color: this.state.color, transform: [{ rotate: this.state.rotate}]},
          styles.emoji]}>
            {this.state.emote}
        </Text>
      </View>
      <View style={styles.statusArea}>
        {(!this.state.death) ? // If the emoji is still alive, show the status bars
        <>
        <StatusBar color={'dodgerblue'} dispText={'Happiness'} btnText={'Pet'} diffMod={this.state.diffMod} callback={this.setPercA} />
        <StatusBar color={'limegreen'} dispText={'Hunger'} btnText={'Feed'} diffMod={this.state.diffMod} callback={this.setPercB} />
        <StatusBar color={'plum'} dispText={'Fun'} btnText={'Play'} diffMod={this.state.diffMod} callback={this.setPercC} />
        </> : // if the emoji has died, proceed to the funeral
        <Pressable style={styles.funeralBtn}
          onPress={() => {navigation.navigate('Funeral',
          {name: this.state.emotiName,}
          );}}
        >
          <Text style={styles.fBtnText}>Have a Funeral</Text>
        </Pressable>
        }
      </View>
      </>
    );
  }
}

// StatusBar class for the timers
class StatusBar extends Component {
  constructor(props) {
    super(props);
    let bgcolor = props.color;
    let dispText = props.dispText;
    let btnText = props.btnText;
    this.state = {
      difficulty: (props.diffMod * 5),
      timeRemaining: (props.diffMod * 5),
      percentage: 100,
      alarmTime: (0),
      bgcolor: bgcolor,
      dispText: dispText,
      btnText: btnText,
      passTime: props.callback,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  tick() {
    let newTime = this.state.timeRemaining - 1;
    if (newTime <= this.state.alarmTime) {
      // Stop changes if the new time is <= 0
      this.setState({
        timeRemaining: 0,
        percentage: 0,
      })
    } else {
      // Keep changes if the new time is > 0
      this.setState({
        timeRemaining: newTime,
        percentage: ((newTime/this.state.difficulty)*100),
      })
    } 
    this.state.passTime(this.state.percentage);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    this.setState({timerID: null})
  }
  
  increaseTime = () => {
    let extra = this.state.timeRemaining + (this.state.difficulty/5);
    if(this.state.timeRemaining <= ((this.state.difficulty/5)*4)) {
      this.setState({
        timeRemaining: extra,
      })
    } else {
      this.setState({ // only increase to 100%
        timeRemaining: (this.state.difficulty + 1), // a little more than 50 to account for 1 second tick
      })
    }
  }

  render() {
    return(
      <>
        <View style={styles.statusBar}>
          <View style={[{backgroundColor: this.state.bgcolor, width: this.state.percentage+'%'}, styles.statusFill]}></View>
          <Text style={styles.statusText}>{this.state.dispText}</Text>
        </View>
        <Pressable
          style={[{backgroundColor: this.state.bgcolor,}, styles.interact]}
          onPress={() => this.increaseTime()}>
          <Text>{this.state.btnText}</Text>
        </Pressable>
      </>
    );
  }
}

// The Stylesheet, duh
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcome: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  instructions: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  instText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 40,
  },
  nameContainer: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    height: 65,
    width: '75%',
    fontSize: 20,
    borderRadius: 5,
    padding: 15,
  },
  difficulty: {
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    width: '25%',
    height: 65,
    borderRadius: 15,
    margin: 5,
    borderWidth: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  greenPress: {
    backgroundColor: 'limegreen',
    width: '20%',
    height: 65,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  bluePress: {
    backgroundColor: 'dodgerblue',
    width: '20%',
    height: 65,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  redPress: {
    backgroundColor: 'crimson',
    width: '20%',
    height: 65,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  purplePress: {
    backgroundColor: 'mediumpurple',
    width: '20%',
    height: 65,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  colorText: {
    fontSize: 20,
  },
  statusArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    borderColor: 'black',
    borderWidth: 2,
    width: '75%',
    height: 30,
    margin: 10,
  },
  statusText: {
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 20,
  },
  statusFill: {
    height: '100%',
  },
  emojiArea: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 200,
    textAlign: 'center',
  },
  interact: {
    width: '20%',
    height: 65,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  funeralBtn: {
    backgroundColor: 'black',
    width: '75%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  fBtnText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  graveImg: {
    aspectRatio: 1,
    width: '90%',
    height: undefined,
  },
});
