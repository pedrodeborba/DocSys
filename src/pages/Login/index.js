import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL, LOCAL_URL } from "@env";
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
} from "react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${LOCAL_URL}/login`, {
        email,
        password,
      });

      console.log(response)
  
      if (response.status === 200 && response.data.message === "Login bem-sucedido") {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
        // Salva o id do paciente no AsyncStorage
        await AsyncStorage.setItem("patientId", response.data.patientId);
      } 
      if (response.status === 401) {
        alert("Algo deu errado, tente novamente mais tarde.");
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Credenciais inválidas. Verifique seu email e senha.");
      } else {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logoAnimated] = useState(new Animated.ValueXY({ x: 200, y: 200 }));
  const [logoSizeAnimated] = useState(new Animated.Value(200));

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
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
        toValue: 150,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logoAnimated.y, {
        toValue: 150,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logoSizeAnimated, {
        toValue: 150,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logoAnimated.x, {
        toValue: 250,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logoAnimated.y, {
        toValue: 250,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.logo}>
        <Animated.Image
          style={{
            width: logoAnimated.x,
            height: logoAnimated.y,
          }}
          source={require("../../../assets/logo.png")}
        />
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{ translateY: offset.y }],
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#D8DDFC",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
    backgroundColor: "#6F7BF7",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 5,
    padding: 10,
  },
  btn: {
    backgroundColor: "#6F7BF7",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
});
