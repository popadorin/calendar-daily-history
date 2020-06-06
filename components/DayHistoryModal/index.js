import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {HistoryAccordion} from "../HistoryAccordion";
import {getHistoryAccordionConfig} from "./getHistoryAccordionConfig";

export const DayHistoryModal = ({modalVisible, setModalVisible, dayQuery}) => {
  const [history, setHistory] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      let result;

      if (dayQuery) {
        result = await axios(`http://history.muffinlabs.com/date/${dayQuery.month}/${dayQuery.day}`);
      }

      if (result) {
        setHistory(result.data);
      }
    }

    fetchData();
  }, [dayQuery]);

  const accordionConfig = getHistoryAccordionConfig(history);

  return (
    <Modal
      onRequestClose={() => setModalVisible(false)}
      animationType="slide"
      transparent={false}
      visible={modalVisible}
    >
      <SafeAreaView>
        <Button
          title={'Hide Modal'}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.date}>{`Date: ${history?.date}`}</Text>
            <View style={styles.sourceContainer}>
              <Text>{'Source: '}</Text>
              <Text style={styles.sourceUrl}>{history?.url}</Text>
            </View>
            {accordionConfig && <HistoryAccordion config={accordionConfig} />}
          </View>
        </ScrollView>
      </SafeAreaView>

    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20
  },
  date: {
    textAlign: 'center'
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sourceUrl: {
    textAlign: 'center',
    color: 'blue'
  }
});

