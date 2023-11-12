import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, Modal, TouchableOpacity, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { loadDarkMode } from '../../utils/asyncStorage';

export default function Profile({ navigation }) {
  const [data, setdata] = useState([]);
  const [isRender, setisRender] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [inputText, setinputText] = useState();
  const [editItem, seteditItem] = useState();
  const [nameProfile, setnameProfile] = useState("");
  const [schedulesProfile, setschedulesProfile] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const name = await AsyncStorage.getItem("patientName");
        const schedulesString = await AsyncStorage.getItem("patientSchedule");
        const savedProfileImage = await AsyncStorage.getItem("profileImage");

        if (name) {
          setnameProfile(name);
        }

        if (schedulesString) {
          const schedules = parseInt(schedulesString, 10);
          setschedulesProfile(schedules);
        }

        if (savedProfileImage) {
          setProfileImage(savedProfileImage);
        }

        const newData = [
          { id: 1, text: nameProfile || "" },
          { id: 2, text: schedulesProfile.toString() },
        ];

        setdata(newData);
        setisRender(!isRender);
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
      }
    };

    retrieveUserData();
  }, [nameProfile, schedulesProfile, darkMode]); 
  
  useEffect(() => {
    const updateDarkModeState = async () => {
      try {
        const darkModeValue = await loadDarkMode();
        setDarkMode(darkModeValue);
      } catch (error) {
        console.error('Erro ao carregar o modo escuro:', error);
      }
    };

    const onFocus = navigation.addListener('focus', updateDarkModeState);

    return () => {
      onFocus();
    };
  }, [navigation]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
        await AsyncStorage.setItem("profileImage", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao escolher a imagem da galeria:", error);
    }
  };

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
        prefix = "Consultas realizadas: ";
        break;
      default:
        break;
    }

    return (
      <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
        <Text style={[styles.label,{color: darkMode ? '#fff' : "#52575D"}]}>{prefix}</Text>
        <Text style={[styles.text, {color: darkMode ? '#fff' : "#52575D"}]}>{item.text}</Text>
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
      setnameProfile(inputText);
    }
  };

  const onPressSaveEdit = async () => {
    handleEditItem(editItem);
    setisModalVisible(false);

    try {
      if (editItem === 1) {
        await AsyncStorage.setItem("patientName", inputText);
        setnameProfile(inputText);
      }
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={[styles.container,{backgroundColor: darkMode ? '#1E1E1E' : '#fff'}]}>
      <View style={styles.titleBar}>
        <TouchableOpacity onPress={logout}>
          <MaterialIcons 
          name="logout" 
          size={30} 
          color={darkMode ? '#fff' : '#52575D'} 
          />
        </TouchableOpacity>
      </View>

      <View style={{ alignSelf: "center" }}>
        <View style={styles.profileImage}>
          <Image
            source={profileImage ? { uri: profileImage } : require("../../../assets/images/profile/profile.png")}
            style={{ width: 200, height: 200, marginLeft: 0, borderRadius: 50 }}
          />
        </View>
        <TouchableOpacity onPress={pickImage} style={styles.add}>
          <Ionicons
            name="ios-add"
            size={48}
            color="#fff"
            style={{ marginTop: 6, marginLeft: 2 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.profileText, { color: darkMode ? '#fff' : '#52575D', fontWeight: "200", fontSize: 30, paddingBottom: 50, paddingTop: 50 }]}>
          {nameProfile}
        </Text>
        <Text style={[styles.profileText, { color: darkMode ? '#fff' : '#52575D', fontSize: 14 }]}>
          Paciente
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
    backgroundColor: "#fff",
  },
  profileText: {
    color: "#52575D",
  },
  titleBar: {
    marginTop: 30,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 500,
    overflow: "hidden",
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
    width: "80%",
    alignSelf: "center",
    paddingBottom: 70,
    marginTop: 10,
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
  textSave: {
    color: "#fff",
    marginVertical: 20,
    fontSize: 16,
  },
});
