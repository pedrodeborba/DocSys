import AsyncStorage from '@react-native-async-storage/async-storage';

//-----Home Screen-----

export const fetchUserProfileData = async () => {
  try {
    const savedProfileImage = await AsyncStorage.getItem('profileImage');
    const name = await AsyncStorage.getItem('patientName');
    const day = await AsyncStorage.getItem('scheduleDay');
    const month = await AsyncStorage.getItem('scheduleMonth');
    const time = await AsyncStorage.getItem('scheduleTime');

    return {
      savedProfileImage,
      name,
      day,
      month,
      time,
    };
  } catch (error) {
    console.error('Erro ao recuperar dados do usuário:', error);
    throw error;
  }
};

export const toggleDarkMode = async () => {
  try {
    const storedDarkMode = await AsyncStorage.getItem('darkMode');
    const darkMode = storedDarkMode === 'true';
    await AsyncStorage.setItem('darkMode', (!darkMode).toString());
    return !darkMode;
  } catch (error) {
    console.error('Erro ao alternar o modo escuro:', error);
    throw error;
  }
};

export const loadDarkMode = async () => {
  try {
    const storedDarkMode = await AsyncStorage.getItem('darkMode');
    return storedDarkMode === 'true';
  } catch (error) {
    console.error('Erro ao carregar o modo escuro:', error);
    throw error;
  }
};

//-----Weather Forecast -----

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('Error retrieving value: ', error);
  }
};