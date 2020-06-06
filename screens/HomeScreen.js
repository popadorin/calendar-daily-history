import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {AuthContext} from '../navigation/AppNavigator';
import {DayHistoryModal} from "../components/DayHistoryModal";
import {CustomCalendar} from "../components/CustomCalendar";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dayQuery, setDayQuery] = useState(undefined);
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <DayHistoryModal modalVisible={modalVisible} setModalVisible={setModalVisible} dayQuery={dayQuery} />
      <CustomCalendar setModalVisible={setModalVisible} setDayQuery={setDayQuery} />
      <Button title={'Logout'} onPress={() => signOut()}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

