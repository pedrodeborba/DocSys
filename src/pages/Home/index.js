import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialCommunityIcons, Ionicons, FontAwesome } from "react-native-vector-icons";
import { fetchUserProfileData, toggleDarkMode, loadDarkMode } from "../../utils/asyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {

  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [useDay, setUseDay] = useState("");
  const [useMonth, setUseMonth] = useState("");
  const [useTime, setUseTime] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const openGoogleMaps = () => {
    // Localização específica (latitude e longitude)
    const latitude = '-29.634684668298988';
    const longitude = '-50.8127040008485';

    // Abre o Google Maps com a localização específica
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  }

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchUserProfileData();

      if (data.savedProfileImage) {
        setProfileImage(data.savedProfileImage);
      }

      if (data.name) {
        setUserName(data.name);
      }

      if (data.day) {
        setUseDay(data.day);
      }

      if (data.month) {
        setUseMonth(data.month);
      }

      if (data.time) {
        setUseTime(data.time);
      }
    } catch (error) {
      console.error('Erro ao recuperar dados do usuário:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [fetchData, navigation]);

  useEffect(() => {
    const loadDarkModeState = async () => {
      try {
        const storedDarkMode = await loadDarkMode();
        setDarkMode(storedDarkMode);
      } catch (error) {
        console.error('Erro ao carregar o modo escuro:', error);
      }
    };

    loadDarkModeState();
  }, []);

  const BtnToggleDarkMode = async () => {
    const newDarkMode = await toggleDarkMode();
    setDarkMode(newDarkMode);
  };

  return (
    <SafeAreaView style={[styles.body, { backgroundColor: darkMode ? '#1E1E1E' : '#fff' }]}>
    <View style={[styles.header, { backgroundColor: darkMode ? '#1E1E1E' : '#EDEFFF' }]}>
      <Image
        source={profileImage ? { uri: profileImage } : require("../../../assets/images/profile/profile.png")}
        style={{ width: 60, height: 60, marginLeft: 0, borderRadius: 50 }}
      />
      <Text style={styles.headerText}>
        Olá, {userName}
        {"\n"}
        <Text style={[styles.headerbText, { color: darkMode ? '#fff' : '#1E1E1E' }]}>Do que você precisa?</Text>
      </Text>
      <TouchableOpacity
        onPress={BtnToggleDarkMode}
        style={styles.darkModeButton}
      >
        <Ionicons
          name={darkMode ? 'moon' : 'sunny'}
          size={30}
          color={darkMode ? '#ffff00' : '#FFD700'}
          style={{ marginLeft: 40 }}
        />
      </TouchableOpacity>
    </View>

      <View style={styles.conteudo}>
        <View style={[styles.sectionOne, { backgroundColor: darkMode ? '#1E1E1E' : '#fff' }]}>
          {/*section*/}
          <View style={[styles.consultaMarcada, {backgroundColor: darkMode ? '#363636' : '#D8DDFC' }]}>
            <View style={styles.halfA}>
              {/*Metade da div: Icon and Title*/}
              <View style={styles.iconRadius}>
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={23}
                  color="#fff"
                />
              </View>
              <Text style={styles.schedulingText}>Consulta marcada</Text>
            </View>
            <View style={styles.halfB}>
              <View style={[styles.options,{backgroundColor: darkMode ? '#808080' : '#fff'}]}>
                <FontAwesome
                  name="calendar-o"
                  size={20}
                  color={darkMode ? '#fff' : '#6F7BF7'}
                  style={{ marginRight: 10 }}
                />
                <Text style={[styles.optionsText,{color: darkMode ? '#fff' : '#6F7BF7'}]}>
                  {useDay.length === 1 ? `0${useDay}` : useDay}/{useMonth}
                </Text>
              </View>
              <View style={[styles.options,{backgroundColor: darkMode ? '#808080' : '#fff'}]}>
                <FontAwesome
                  name="clock-o"
                  size={25}
                  color={darkMode ? '#fff' : '#6F7BF7'}
                  style={{ marginRight: 10 }}
                />
                <Text style={[styles.optionsText,{color: darkMode ? '#fff' : '#6F7BF7'}]}>{useTime}</Text>
              </View>
              <TouchableOpacity onPress={openGoogleMaps} style={[styles.options,{width: 120, backgroundColor: '#6F7BF7'}]}>
                <MaterialCommunityIcons
                  name="map-marker-radius-outline"
                  size={20}
                  color='#fff'
                  style={{ marginRight: 5 }}
                />
                <Text style={[styles.optionsText,{color: '#fff'}]}>Ver no mapa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: darkMode ? '#1E1E1E' : '#fff' }]}>
          <View style={[styles.box,{backgroundColor: darkMode ? '#363636' : '#D8DDFC' }]}>
            <TouchableOpacity onPress={() => navigation.navigate("Agendamento")} >
              <View style={styles.stylingArea}>
                <View style={styles.iconRadius}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={23}
                    color="#fff"
                  />
                </View>
                <Text style={styles.schedulingText}>Agende sua consulta</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: darkMode ? '#1E1E1E' : '#fff' }]}>
          <View style={[styles.box,{backgroundColor: darkMode ? '#363636' : '#D8DDFC' }]}>
            <TouchableOpacity onPress={() => navigation.navigate("Weather")}>
              <View style={styles.stylingArea}>
                <View style={styles.iconRadius}>
                  <MaterialCommunityIcons
                    name="weather-pouring"
                    size={30}
                    color="#fff"
                  />
                </View>
                <Text style={styles.schedulingText}>Previsão do Tempo</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    backgroundColor: '#EDEFFF',
    height: "15%",
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  conteudo: {
    marginBottom: 100,
  },
  headerText: {
    color: "#6F7BF7",
    marginLeft: 25,
    fontSize: 15,
  },
  headerbText: {
    color: "#1E1E1E",
    marginLeft: 25,
    fontSize: 15,
  },
  sectionOne: {
    height: 220,
    marginTop: 20,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  schedulingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6F7BF7",
    marginLeft: 20,
  },
  iconRadius: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "#6F7BF7",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  consultaMarcada: {
    backgroundColor: "#D8DDFC",
    width: "80%",
    height: 200,
    borderRadius: 10,
  },
  halfA: {
    height: 100,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  halfB: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  options: {
    width: 85,
    height: 60,
    marginRight: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsText: {
    color: "#6F7BF7",
  },
  section: {
    marginTop: 20,
    height: 120,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  stylingArea: {
    height: 90,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  box: {
    width: "80%",
    height: 90,
    backgroundColor: "#EDEFFF",
    borderWidth: 1,
    borderColor: "#6F7BF7",
    borderRadius: 20,
  },
  imgFisio: {
    height: 80,
    width: 80,
    marginLeft: 10,
  },
  textFisio: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6F7BF7",
    marginLeft: 40,
  },
});
