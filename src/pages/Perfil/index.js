import React from 'react';

import { 
   StyleSheet,
   Text, 
   View, 
   } from 'react-native';

export default function Perfil(){
    return(
        <View style = {styles.container}>
            <Text>
                Perfil
            </Text>
        </View>
    )
}

    

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D8DDFC',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});