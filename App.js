import React, { Component } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'; // useNavigation for navigating from component
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
          style={styles.greenPress}
          onPress={() => {navigation.navigate('Emojigotchi',
          {name: name, color: 'green'}
          );}}>
          <Text style={styles.colorText}>Green</Text>
        </Pressable>
        <Pressable
          style={styles.bluePress}
          onPress={() => {navigation.navigate('Emojigotchi',
          {name: name, color: 'blue'}
          );}}>
          <Text style={styles.colorText}>Blue</Text>
        </Pressable>
        <Pressable
          style={styles.redPress}
          onPress={() => {navigation.navigate('Emojigotchi',
          {name: name, color: 'red'}
          );}}>
          <Text style={styles.colorText}>Red</Text>
        </Pressable>
        <Pressable
          style={styles.purplePress}
          onPress={() => {navigation.navigate('Emojigotchi',
          {name: name, color: 'purple'}
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
      <Emoticon color={route.params.color} name={route.params.name} navigation={navigation}/>
    </View>
  )
}

// Funeral page
const Funeral = ({navigation, route}) => {

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
        <StatusBar color={'dodgerblue'} dispText={'Happiness'} btnText={'Pet'} callback={this.setPercA} />
        <StatusBar color={'limegreen'} dispText={'Hunger'} btnText={'Feed'} callback={this.setPercB} />
        <StatusBar color={'plum'} dispText={'Fun'} btnText={'Play'} callback={this.setPercC} />
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
      timeRemaining: 50,
      percentage: (50/50)*100,
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
        percentage: (newTime/50)*100,
      })
    } 
    this.state.passTime(this.state.percentage);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    this.setState({timerID: null})
  }
  
  increaseTime = () => {
    let extra = this.state.timeRemaining + 10;
    if(this.state.timeRemaining <= 40) {
      this.setState({
        timeRemaining: extra,
      })
    } else {
      this.setState({ // only increase to 100%
        timeRemaining: 51, // a little more than 50 to account for 1 second tick
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
    height: 250,
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
