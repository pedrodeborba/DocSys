import React from 'react';

import {useState, useEffect,} from 'react';

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

export default function Profissional({navigation}) {

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    function handleSignIn(){
        const data = {email,code}
        console.log(data)
    }

    const entrar = () => {
        handleSignIn();
        if(code == "12345678" && email ==  "apodef@gmail.com"){
            navigation.reset({
                index: 0,
                routes: [{name: "Home"}],
            })
        }else alert("Email e/ou senha incorretos!");
    }

    const [offset] = useState(new Animated.ValueXY({x:0,y:95}));
    const[opacity] =  useState(new Animated.Value(0));
    const[logoAnimated] = useState(new Animated.ValueXY({x:250, y:250}));;

    useEffect(()=>{

        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        Animated.parallel([
        Animated.spring(offset.y,{
            toValue:0,
            speed:4,
            bounciness:20,
        }),
        Animated.timing(opacity,{
            toValue:1,
            duration:200,
        })
        ]).start();
    },[]);

    function keyboardDidShow(){
        Animated.parallel([
        Animated.timing(logoAnimated.x, {
            toValue: 130,
            duration:100,
        }),
        Animated.timing(logoAnimated.y, {
            toValue: 145,
            duration:100,
        })
        ]).start();
    }

    function keyboardDidHide(){
        Animated.parallel([
        Animated.timing(logoAnimated.x, {
            toValue: 250,
            duration:100,
        }),
        Animated.timing(logoAnimated.y, {
            toValue: 250,
            duration:100,
        })
        ]).start();
    }

    return (
    <KeyboardAvoidingView style={styles.backgound}>
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
            opacity:opacity,
            transform: [
            {translateY: offset.y}
            ]
            }
            ]}
        >

            <TextInput 
            style={styles.input}
            placeholder="Email"
            autoCorrect = {false}
            onChangeText={setEmail}
            value={email}
            />

            <TextInput style={styles.input}
            placeholder="Senha"
            autoCorrect = {false}
            onChangeText={setCode}
            value={code}
            secureTextEntry={true}
            />

            <TouchableOpacity style={styles.btn} onPress={()=> entrar()}>
            <Text style={styles.btnText}>
                Entrar
            </Text>
            </TouchableOpacity>
        </Animated.View>
    </KeyboardAvoidingView>
    );
    }


    const styles = StyleSheet.create({
    backgound: {
        backgroundColor: '#D8DDFC',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        flex:1,
        backgroundColor: "#6F7BF7",
        borderRadius: 20,
        justifyContent: 'center',
    },

    container: {
        flex:1,
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
    btn:{
        backgroundColor: '#6F7BF7',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    btnText:{
        color: '#fff',
        fontSize: 18,
    },
});