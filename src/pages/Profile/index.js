import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, Modal, TouchableOpacity, TextInput, LogBox } from "react-native";
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
  const [consultasMarcadas, setConsultasMarcadas] = useState(0);
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
          setConsultasMarcadas(schedules);
        }

        if (savedProfileImage) {
          setProfileImage(savedProfileImage);
        }

        const newData = [
          { id: 1, text: nameProfile || "" },
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
        LogBox.ignoreAllLogs();
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
    switch (index) {
      case 0:
        return (
          <TouchableOpacity
            style={[styles.item, { flexDirection: "row", alignItems: "center" }]}
            onPress={() => onPressItem(item)}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { color: darkMode ? '#fff' : "#52575D" }]}>
                {item.text}
              </Text>
            </View>
            {index === 0 && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => onPressItem(item)}
              >
                <MaterialIcons name="edit" size={20} color="#6F7BF7" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
      default:
        return null;
    }
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
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#1E1E1E' : '#fff' }]}>
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
        <Text style={[styles.profileText, { color: darkMode ? '#fff' : '#52575D', fontWeight: "600", fontSize: 30, paddingBottom: 50, paddingTop: 50 }]}>
          {nameProfile}
        </Text>
        <Text style={[styles.profileText, { color: darkMode ? '#fff' : '#52575D', fontSize: 14 }]}>
          Paciente
        </Text>
      </View>

      <View style={styles.profileEdits}>
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
          <View style={styles.containerModal}>
            <View style={styles.imageModal}>
              <Image
                source={require("../../../assets/images/profile/edit-profile.png")}
                style={{ width: '100%', height: 200, borderRadius: 50}}
              />
            </View>
            <View style={[styles.modalView, { backgroundColor: darkMode ? '#1E1E1E' : '#fff' }]}>
              <Text style={styles.text}>Qual seu nome?</Text>
              <TextInput
                style={[styles.textInput, { color: darkMode ? '#fff' : '#6F7BF7', borderColor: darkMode ? '#52575D' : '#D8DDFC' }]}
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
          </View>
        </Modal>

        <View style={styles.consultasView}>
          <Text style={[styles.textConsultasView, { color: darkMode ? '#fff' : '#52575D' }]}>
            Consultas marcadas: {consultasMarcadas}
          </Text>
        </View>
      </View>

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
  profileEdits: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageModal: {
    flex: 1,
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  flatListContent: {
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
  },
  item: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#6F7BF7",
    fontWeight: "bold",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#52575D",
    fontWeight: "bold",
  },
  textInput: {
    width: "90%",
    height: 50,
    borderColor: "#52575D",
    borderWidth: 2,
    fontSize: 20,
    paddingLeft: 10,
    borderRadius: 20,
  },
  modalView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  consultasView: {
    width: "80%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  textConsultasView: {
    fontSize: 16,
    paddingVertical: 10,
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
  editButton: {
    marginLeft: 'auto',
    padding: 10,
  },
});
