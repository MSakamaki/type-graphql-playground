{
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/graphql');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onload = function() {
    console.log('data returned:', xhr.response);
  };
  xhr.send(JSON.stringify({ query: '{ hello }' }));
}

{
  const query = `query RollDice($dice: Int!, $sides: Int) {
    rollDice(numDice: $dice, numSides: $sides)
  }`;
  fetch('/graphql', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      query: query,
      variables: { dice: 100, sides: 5 },
    }),
  })
    .then(d => d.json())
    .then(d => console.log(d))
    .catch(e => console.error(e));
}
