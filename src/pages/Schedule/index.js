import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FontAwesome5 } from "react-native-vector-icons";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import Calendar from "react-native-calendars/src/calendar";
import { loadDarkMode } from '../../utils/asyncStorage';
import { BACKEND_URL, LOCAL_URL } from "@env";

const times = ["08:00", "09:00", "10:00", "16:00", "17:00", "18:00"];

export default function Schedule({ navigation }) {
  //calendar
  const [showModal, setShowModal] = useState(false);
  const [chosenTime, setChosenTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [completeValidation, setCompleteValidation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setShowModal(false);
  };

  const handleTimeSelection = (time) => {
    setChosenTime(time);
  };

  const handleSchedule = async () => {
    if (selectedDate && chosenTime) {
      try {
        const patientId = await AsyncStorage.getItem("patientId");
        const patientName = await AsyncStorage.getItem("patientName");
        const response = await axios.post("https://backend-tcc-teal.vercel.app/schedule/${patientId}", {
          patientName: patientName,
          day: selectedDate.day,
          month: selectedDate.month,
          year: selectedDate.year,
          time: chosenTime,
          patientId: patientId,
        });

        await AsyncStorage.setItem("scheduleDay", selectedDate.day.toString());
        await AsyncStorage.setItem("scheduleMonth", selectedDate.month.toString());
        await AsyncStorage.setItem("scheduleTime", chosenTime);

        console.log(selectedDate.day, selectedDate.month, chosenTime);

        if (response.status === 201) {
          handleTimeSelection(null);
          setCompleteValidation(true);
          setTimeout(() => {
            setCompleteValidation(false);
          }, 5000);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setValidationMessage(error.response.data.error);
        } else {
          setValidationMessage("Erro ao agendar consulta. Selecione todas as opções para agendar!");
        }
        setShowValidationMessage(true);
        setTimeout(() => {
          setShowValidationMessage(false);
        }, 3000);
      }
    } else {
      setValidationMessage("Selecione todas as opções para agendar!");
      setShowValidationMessage(true);
      setTimeout(() => {
        setShowValidationMessage(false);
      }, 5000);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.textTopView}>Agendamento</Text>
      </View>

      <View style={[styles.section, { backgroundColor: darkMode ? '#1E1E1E' : '#fff' }]}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            backgroundColor: darkMode ? '#363636' : '#6F7BF7',
            borderRadius: 10,
            margin: 40,
            padding: 10,
            width: 300,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 22, paddingBottom: 10 }}>
            Aperte para escolher data
          </Text>
          <FontAwesome5 name="hand-point-up" size={22} color={"#fff"} />
        </TouchableOpacity>
        <Modal visible={showModal} animationType="fade">
          <Calendar
            style={{ borderRadius: 10, elevation: 4, margin: 40 }}
            onDayPress={(date) => {
              console.log(date);
              setShowModal(false);
              handleDateSelection(date);
            }}
            onMonthChange={() => { }}
            minDate={"2023-11-13"}
            maxDate={"2023-12-31"}
          />
        </Modal>

        <View>
          <View style={styles.calendar}>
            <View style={styles.times}>
              <View style={styles.lineDatas}>
                {times.slice(0, 3).map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.data,
                      chosenTime === time && styles.selectedDate,
                    ]}
                    onPress={() => handleTimeSelection(time)}
                  >
                    <Text
                      style={[
                        styles.number,
                        chosenTime === time && {
                          color: darkMode ? '#708090' : '#6F7BF7',
                          fontSize: 30, 
                        },
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.lineDatas}>
                {times.slice(3).map((time, index) => (
                  <TouchableOpacity
                    key={index + 3}
                    style={[
                      styles.data,
                      chosenTime === time && styles.selectedDate,
                    ]}
                    onPress={() => handleTimeSelection(time)}
                  >
                    <Text
                      style={[
                        styles.number,
                        chosenTime === time && {
                          color: darkMode ? '#708090' : '#6F7BF7',
                          fontSize: 30, 
                        },
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.divSchedule}>
          <TouchableOpacity
            style={[styles.buttonSchedule, { backgroundColor: darkMode ? '#363636' : '#6F7BF7' }]}
            onPress={handleSchedule}
          >
            <FontAwesome5
              name="check"
              size={23}
              color="#fff"
              style={{ marginLeft: 45 }}
            />
            <Text style={styles.textSchedule}>Agendar</Text>
          </TouchableOpacity>


          {showValidationMessage && (
            <View style={styles.alertDanger}>
              <Text style={styles.errorValidationText}>{validationMessage}</Text>
            </View>
          )}

          {completeValidation && (
            <View style={styles.alertSeccess}>
              <Text style={styles.completeValidationText}>Consulta marcada!</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    backgroundColor: "#6F7BF7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  textTopView: {
    fontSize: 25,
    color: "#fff",
  },
  section: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonData: {
    backgroundColor: "#EDEFFF",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  textData: {
    color: "#203F6B",
    marginVertical: 20,
    fontSize: 15,
  },
  calendar: {
    justifyContent: "center",
    alignItems: "center",
  },
  datas: {
    width: "80%",
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  times: {
    width: "80%",
    height: 160,
    backgroundColor: "#fff",
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 20,
    borderRadius: 10,
  },
  lineDatas: {
    height: 80,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  data: {
    width: 90,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginLeft: 5,
  },
  number: {
    fontSize: 20,
    color: "#203F6B",
  },
  day: {
    fontSize: 15,
    color: "#203F6B",
  },
  divSchedule: {
    width: "100%",
    height: 50,
    alignItems: "center",
  },
  buttonSchedule: {
    width: "60%",
    height: 50,
    alignItems: "center",
    paddingLeft: 20,
    gap: 10,
    backgroundColor: "#6F7BF7",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSchedule: {
    color: "#fff",
    fontSize: 20,
  },
  alertDanger: {
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f00",
    borderRadius: 20,
    marginTop: 20,
  },
  errorValidationText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  alertSeccess: {
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3CB371",
    borderRadius: 20,
    marginTop: 20,
  },
  completeValidationText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  }
});
