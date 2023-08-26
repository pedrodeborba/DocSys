import React, { useState, useEffect } from 'react';
import {Ionicons} from 'react-native-vector-icons'
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
  LogBox,
} from 'react-native';

export default function Paciente({ navigation }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  function handleSignIn () {
    const resp = axios.post('http://192.168.1.22:3001/paciente', {name, code}).then(result => console.log(result)).catch(err => console.log(err));
  }
//OPEN and EXIT {
  const open = ()=>{
    handleSignIn();
    if (name !== '' && code !== '') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      alert('Informe o código correto!');
    }
  };

  const exit = ()=>{
    navigation.reset({
      index: 0,
      routes: [{name: "FirstScreen"}]
    });
  }

// }

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logoAnimated] = useState(new Animated.ValueXY({ x: 200, y: 200 }));
  const [logoSizeAnimated] = useState(new Animated.Value(200));

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
      }),
    ]).start();

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logoAnimated.x, {
        toValue: 145,
        duration: 100,
      }),
      Animated.timing(logoAnimated.y, {
        toValue: 145,
        duration: 100,
      }),
      Animated.timing(logoSizeAnimated, {
        toValue: 150,
        duration: 100,
      })
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logoAnimated.x, {
        toValue: 250,
        duration: 100,
      }),
      Animated.timing(logoAnimated.y, {
        toValue: 200,
        duration: 100,
      }),
    ]).start();
  }

  // Esconder topView
  const [shouldShow, setshouldShow] = useState(true);

  //--------------------------------------------------------------------------------------------------
  return (
    <KeyboardAvoidingView style={styles.background}>
      
      <View style={styles.topView}>
        <TouchableOpacity onPress={exit}>
          <Ionicons name="ios-arrow-back" size={24} color="#6F7BF7" />
        </TouchableOpacity>
      </View>
       
      <View style={styles.logo}>
        <Animated.Image
          style={{
            width: logoAnimated.x,
            height: logoAnimated.y,
          }}
          source={require('../../../assets/logo.png')}
        />
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{ translateY: offset.y}],
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          autoCorrect={false}
          onChangeText={setName}
          value={name}
        />

        <TextInput
          style={styles.input}
          placeholder="Código"
          autoCorrect={false}
          onChangeText={setCode}
          value={code}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.btn} onPress={open}>
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#D8DDFC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topView: {
    height: "10%",
    width: '100%',
    alignItems: "center",
    flexDirection: 'row',
    rowGap: 20,
    paddingTop: 20,
    paddingLeft: 10,
  },
  textTopView: {
    fontSize: 25,
    color: "#fff",
  },
  logo: {
    flex: 1,
    backgroundColor: '#6F7BF7',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 5,
    padding: 10,
  },
  btn: {
    backgroundColor: '#6F7BF7',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
});
