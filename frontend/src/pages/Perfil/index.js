import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput
} from "react-native";

const nome = "";
const idade = "";
const email = '@gmail.com';

// Configurando FlatList
const DATA = [
  { id: 1, text: `${nome}` },
  { id: 2, text: `${idade}` },
  { id: 3, text: `${email}` },
]

export default function Perfil({ navigation }) {
    const [data, setdata] = useState(DATA);
    const [isRender, setisRender] = useState(false);
    const [isModalVisible, setisModalVisible] = useState(false);
    const [inputText, setinputText] = useState();
    const [editItem, seteditItem] = useState();
    const [nomePerfil, setNomePerfil] = useState(); // Estado para armazenar o nome exibido abaixo da imagem de perfil
  
    // Recuperar dados do AsyncStorage
    useEffect(() => {
      const retrieveUserName = async () => {
        try {
          const storedUserName = await AsyncStorage.getItem('userName');
          if (storedUserName) {
            setNomePerfil(storedUserName);
    
            // Atualizar o nome na lista de dados
            const newData = data.map((item) => {
              if (item.id === 1) {
                item.text = storedUserName;
              }
              return item;
            });
            setdata(newData);
            setisRender(!isRender);
          }
        } catch (error) {
          console.error('Erro ao recuperar o nome do usuário:', error);
        }
      };
    
      retrieveUserName();
    }, []);
    

    const onPressItem = (item) => {
      setisModalVisible(true);
      setinputText(item.text);
      seteditItem(item.id);
    };
  
    const renderItem = ({ item, index }) => {
      let prefix = "";
      switch (index) {
        case 0:
          prefix = "Nome: ";
          break;
        case 1:
          prefix = "Idade: ";
          break;
        case 2:
          prefix = "Email: ";
          break;
        default:
          break;
      }
  
      return (
        <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
          <Text style={styles.label}>{prefix}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </TouchableOpacity>
      );
    };
  
    const handleEditItem = (editItem) => {
      const newData = data.map((item) => {
        if (item.id === editItem) {
          item.text = inputText;
          return item;
        }
        return item;
      });
      setdata(newData);
      setisRender(!isRender);
  
      if (editItem === 1) {
        setNomePerfil(inputText);
      }
    };
  
    const onPressSaveEdit = async () => {
      handleEditItem(editItem);
      setisModalVisible(false);
    
      // Salvar os dados editados no AsyncStorage
      try {
        if (editItem === 1) {
          await AsyncStorage.setItem('userName', inputText);
          setNomePerfil(inputText);
        }
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
      }
    };
    

//LOGOUT {
    const logout = ()=>{
      navigation.reset({
        index: 0,
        routes: [{name: "FirstScreen"}]
      });
    }
// }
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} color="#52575D" />

          <TouchableOpacity onPress={logout}>
            <MaterialIcons name="logout" size={24} color="#52575D" />
          </TouchableOpacity>
        </View>
  
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../../../assets/perfil.png")}
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <View style={styles.dm}>
            <MaterialIcons name="edit" size={18} color="#fff" />
          </View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#fff"
              style={{ marginTop: 6, marginLeft: 2 }}
            />
          </View>
        </View>
  
        <View style={styles.infoContainer}>
          <Text style={[styles.perfilText, { fontWeight: "200", fontSize: 36 }]}>
            {nomePerfil}
          </Text>
          <Text style={[styles.perfilText, { color: "#AEB5BC", fontSize: 14 }]}>
            Admin
          </Text>
        </View>
  
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          extraData={isRender}
          contentContainerStyle={styles.flatListContent}
        />
  
        <Modal
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => setisModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.text}>Editando... </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setinputText(text)}
              defaultValue={inputText}
              editable={true}
              multiline={false}
              maxLength={200}
            />
            <TouchableOpacity
              onPress={onPressSaveEdit}
              style={styles.touchableSave}
            >
              <Text style={styles.textSave}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
    },
    perfilText: {
      color: "#52575D",
    },
    image: {
      flex: 1,
      height: undefined,
      width: undefined,
    },
    titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16,
    },
    profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden",
    },
    dm: {
      backgroundColor: "#6F7BF7",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    add: {
      backgroundColor: "#6F7BF7",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16,
    },

    //FlatList
    flatListContent: {
      width: '80%',
      alignSelf: 'center',
      paddingBottom: 70,
      marginTop: 10
    },
    item: {
      height: 80,
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: "#6F7BF7",
      paddingHorizontal: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    label: {
      fontWeight: "bold",
      marginRight: 5,
      fontSize: 16,
      color: "#52575D",
    },
    text: {
      fontSize: 16,
      color: "#52575D",
    },
    textInput: {
      width: "90%",
      height: 50,
      borderColor: "#52575D",
      borderWidth: 1,
      fontSize: 20,
      paddingLeft: 10,
      borderRadius: 20,
    },
    modalView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    touchableSave: {
      backgroundColor: "#6F7BF7",
      paddingHorizontal: 100,
      alignItems: "center",
      marginTop: 20,
      borderRadius: 20,
    },
    textSave:{
        color: "#fff",
        marginVertical: 20,
        fontSize: 16,
    },
  });