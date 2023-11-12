import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { fetchUserProfileData } from "../../utils/asyncStorage";

export default function Home({ navigation }) {
  const [userName, setUserName] = useState("");
  const [useDay, setUseDay] = useState("");
  const [useMonth, setUseMonth] = useState("");
  const [useTime, setUseTime] = useState("");
  const [profileImage, setProfileImage] = useState(null);

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
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <Image
          source={profileImage ? { uri: profileImage } : require("../../../assets/images/profile/profile.png")}
          style={{ width: 60, height: 60, marginLeft: 0, borderRadius: 50 }}
        />
        <Text style={styles.headerText}>
          Olá, {userName}
          {"\n"}
          <Text style={styles.headerbText}>Do que você precisa?</Text>
        </Text>
        <FontAwesome
          name="bell-o"
          size={23}
          color="#6F7BF7"
          style={{ marginLeft: 45 }}
        />
      </View>

      <View style={styles.conteudo}>
        <View style={styles.sectionOne}>
          {/*section*/}
          <View style={styles.consultaMarcada}>
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
              <View style={styles.options}>
                <FontAwesome
                  name="calendar-o"
                  size={20}
                  color="#6F7BF7"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.optionsText}>{useDay}/{useMonth}</Text>
              </View>
              <View style={styles.options}>
                <FontAwesome
                  name="clock-o"
                  size={25}
                  color="#6F7BF7"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.optionsText}>{useTime}</Text>
              </View>
              <View style={styles.options}>
                <MaterialCommunityIcons
                  name="map-marker-radius-outline"
                  size={20}
                  color="#6F7BF7"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.optionsText}>Parobé</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.box}>
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

        <View style={styles.section}>
          <View style={styles.box}>
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
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#EDEFFF",
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
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  options: {
    width: 90,
    height: 60,
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
