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
} from "react-native";
import Calendar from "react-native-calendars/src/calendar";
import { loadDarkMode } from '../../utils/asyncStorage';
import {BACKEND_URL} from '@env'

const times = ["08:00", "09:00", "10:00", "16:00", "17:00", "18:00"];

export default function Schedule({ navigation }) {

  //calendar
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
  };

  const handleTimeSelection = (time) => {
    setChosenTime(time);
  };

  const handleSchedule = async () => {
    if (selectedDate && chosenTime) {
      try {
        const patientId = await AsyncStorage.getItem("patientId");
        const patientName = await AsyncStorage.getItem("patientName");
        const response = await axios.post(`${BACKEND_URL}/schedule/${patientId}`, {
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
          setValidationMessage("Erro ao agendar consulta, tente novamente mais tarde", error.response.data.error);
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
    
      <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#1E1E1E' : '#fff' }]}>
          <View style={styles.viewCalendar}>
            <Calendar
              style={{borderRadius: 10, borderWidth: 1, elevation: 5, borderColor: darkMode ? '#000' : '#6F7BF7'}}
              theme={{
                textMonthFontSize: 20,
                textMonthFontWeight: 'bold',
                todayTextColor: '#6F7BF7',
                arrowColor: '#6F7BF7',
                selectedDayBackgroundColor: '#6F7BF7',
                selectedDayTextColor: '#fff',
                textDayFontSize: 16,
              }}
              markedDates={{
                [selectedDate ? `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}` : '']: {
                  selected: true,
                  selectedColor: '#6F7BF7',
                },
              }}
              onDayPress={(date) => {
                handleDateSelection(date);
              }}
              onMonthChange={() => { }}
              minDate={"2023-11-23"}
              maxDate={"2023-12-31"}
            />
          </View>

          <View style={styles.viewDates}>
            <View style={[styles.searchTime, {backgroundColor: darkMode ? '#1E1E1E' : '#6F7BF7' }]}>
              <View style={[styles.times, {backgroundColor: darkMode ? '#363636' : '#fff' }]}>
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
                          {color: darkMode ? '#fff' : '#1E1E1E'},
                          chosenTime === time && {fontSize: 30, color: '#6F7BF7'},
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
                          {color: darkMode ? '#fff' : '#1E1E1E'},
                          chosenTime === time && {fontSize: 30, color: '#6F7BF7'},
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
                <Text style={styles.completeValidationText}>Consulta marcada com sucesso!</Text>
              </View>
            )}
          </View>
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  viewCalendar: {
    width: "80%",
    justifyContent: "center",
  },
  viewDates: {
    width: "80%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchTime: {
    backgroundColor: '#6F7BF7',
    width: "100%",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  times: {
    width: "100%",
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
    marginTop: 10,
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
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
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
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3CB371",
    borderRadius: 20,
    marginTop: 15,
  },
  completeValidationText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  }
});
