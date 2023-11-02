import React, { useState } from "react";
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
import { BACKEND_URL, LOCAL_URL } from "@env";

const times = ["08:00", "09:00", "10:00", "16:00", "17:00", "18:00"];

export default function Schedule() {
  //calendar
  const [showModal, setShowModal] = useState(false);
  const [chosenTime, setChosenTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [completeValidation, setCompleteValidation] = useState(false);

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
        const response = await axios.post("http://192.168.1.27:3002/schedule/${patientId}", {
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
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.textTopView}>Agendamento</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            backgroundColor: "#6F7BF7",
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
            onMonthChange={() => {}}
            minDate={"2023-09-01"}
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
                      chosenTime === time && styles.selectedData,
                    ]}
                    onPress={() => handleTimeSelection(time)}
                  >
                    <Text
                      style={[
                        styles.number,
                        chosenTime === time && styles.selectedNumber,
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
                      chosenTime === time && styles.selectedData,
                    ]}
                    onPress={() => handleTimeSelection(time)}
                  >
                    <Text
                      style={[
                        styles.number,
                        chosenTime === time && styles.selectedNumber,
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
            style={styles.buttonSchedule}
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
            <Text style={styles.errorValidationText}>{validationMessage}</Text>
          )}

          {completeValidation && (
            <Text style={styles.completeValidationText}>Consulta marcada!</Text>
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
  selectedData: {
    backgroundColor: "#6F7BF7",
  },
  selectedNumber: {
    color: "#fff",
  },
  selectedDay: {
    color: "#fff",
  },
  errorValidationText: {
    color: "#f00",
    fontSize: 16,
    marginTop: 10,
  },
  completeValidationText:{
    color: "#6F7BF7",
    fontSize: 25,
    marginTop: 20,
  }
});
