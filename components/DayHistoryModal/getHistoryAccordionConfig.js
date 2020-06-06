const mapToString = array => array && array.map(({year, text}) => year + ': ' + text);

function parseWikipediaHistory(history) {
  const data = history?.data;
  return {
    events: mapToString(data?.Events),
    births: mapToString(data?.Births),
    deaths: mapToString(data?.Deaths)
  }
}

export function getHistoryAccordionConfig(history) {
  const parsedHistory = parseWikipediaHistory(history);
  return [{
    title: 'Events',
    items: parsedHistory.events
  }, {
    title: 'Births',
    items: parsedHistory.births
  }, {
    title: 'Deaths',
    items: parsedHistory.deaths
  }];
}
