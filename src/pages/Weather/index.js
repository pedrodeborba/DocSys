import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { fetchWeatherForecast } from '../../api/weather';
import { weatherImages } from '../../constants/weather';
import { getData, loadDarkMode } from '../../utils/asyncStorage';

export default function Weather({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

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

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Parobe';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
    })
  }

  const { location, current } = weather;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        blurRadius={darkMode ? 30 : 60}
        source={darkMode ? require('../../../assets/images/weather/bg-darkmode.png') : require('../../../assets/images/weather/bg.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.return}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <FontAwesome
            name="arrow-left"
            size={30}
            color="#fff"
            style={{ marginLeft: 20, marginTop: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cityName}>
        <Text style={styles.cityNameText}>
          {location?.name},
          <Text style={{ fontSize: 18 }}> {location?.country}</Text>
        </Text>
      </View>
      <View style={styles.centerImage}>
        {weather?.current?.condition?.text ? (
          <Image
            style={{ width: 150, height: 150 }}
            source={weatherImages[weather.current.condition.text] || weatherImages['other']}
          />
        ) : (
          <Image
            style={{ width: 150, height: 150 }}
            source={weatherImages['other']}
          />
        )}
      </View>
      <View style={styles.temp}>
        <Text style={styles.tempText}>{current?.temp_c}&#176;</Text>
      </View>
      <View style={styles.weather}>
        <Text style={styles.weatherText}>{current?.condition?.text}</Text>
      </View>
      <View style={styles.informations}>
        <View style={styles.information}>
          <Image style={{ width: 25, height: 25 }}
            source={require('../../../assets/icons/wind.png')}
          />
          <Text style={styles.informationText}>{current?.wind_kph}km/h</Text>
        </View>
        <View style={styles.information}>
          <Image style={{ width: 25, height: 25 }}
            source={require('../../../assets/icons/drop.png')}
          />
          <Text style={styles.informationText}>{current?.humidity}%</Text>
        </View>
        <View style={styles.information}>
          <Image style={{ width: 25, height: 25 }}
            source={require('../../../assets/icons/sun.png')}
          />
          <Text style={styles.informationText}>
            {weather?.forecast?.forecastday[0]?.astro?.sunrise}
          </Text>
        </View>
      </View>
      <View style={styles.dailyForecast}>
        <View style={styles.writing}>
          <FontAwesome
            name="calendar"
            size={23}
            color="#fff"
            style={{ marginLeft: 40 }}
          />
          <Text style={styles.informationText}>Previsão semanal</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {
          weather?.forecast?.forecastday?.map((item, index) => {
            const date = new Date(item.date);
            const options = { weekday: 'short' };
            let dayName = date.toLocaleDateString('pt-br', options);
            dayName = dayName.split(',')[0];

            return (
              <View
                key={index}
                style={styles.boxDay}
              >
                <View>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={weatherImages[item.day.condition.text || 'other']}
                  />
                </View>
                <View>
                  <Text style={styles.boxDayText}>{dayName}</Text>
                </View>
                <View>
                  <Text style={styles.boxDayText}>{item.day.maxtemp_c}&#176;</Text>
                </View>
              </View>
            )
          })
        }
        <View style={styles.scrollIndicator}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  return: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: 50,
    marginTop: 20,
  },
  centerImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
  },
  cityNameText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  temp: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
  },
  tempText: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
  },
  weather: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 30,
  },
  weatherText: {
    color: "#fff",
    fontSize: 18,
  },
  informations: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 100,
  },
  information: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  informationText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 10,
  },
  dailyForecast: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  writing: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 30,
  },
  boxDay: {
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 110,
    borderWidth: 2,
    borderColor: "#fff",
    opacity: 0.8,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  boxDayText: {
    color: "#fff",
    fontSize: 17
  },
  scrollIndicator: {
    position: 'absolute',
    right: 3,
    bottom: 180,
  },
});
