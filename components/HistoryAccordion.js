import React from 'react';
import {List} from "react-native-paper";

export const HistoryAccordion = ({config}) => {
  return (
    <List.Section style={{backgroundColor: 'transparent'}}>
      {
        config && config.map((element, index) => (
          <List.Accordion
            key={index}
            title={element.title}
          >
            {
              element.items && element.items.map((item, innerIndex) => (
                <List.Item key={innerIndex} titleNumberOfLines={5} title={item} />
              ))
            }
          </List.Accordion>
        ))
      }
    </List.Section>
  )
}
