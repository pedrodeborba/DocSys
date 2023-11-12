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
      throw error; // Lança o erro novamente para que o componente possa lidar com ele
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