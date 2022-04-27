const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/ussd', (req, res) => {
  // Read the variables sent via POST from our API
  const {
    sessionId,
    serviceCode,
    phoneNumber,
    text,
  } = req.body;
  console.log('body ->', req.body);

  let response = '';

  if (text == '') {
    // This is the first request. Note how we start the response with CON
    response = `CON What would you like to check
        1. My account
        2. My phone number
        3. People problems`;
  } else if ( text == '1') {
    // Business logic for first level response
    response = `CON Choose account information you want to view
        1. Account number`;
  } else if ( text == '2') {
    // Business logic for first level response
    // This is a terminal request. Note how we start the response with END
    response = `END Your phone number is ${phoneNumber}`;
  } else if (text == '3') {
    response = 'END People have several problems'
  } else if ( text == '1*1') {
    // This is a second level response where the user selected 1 in the first instance
    const accountNumber = 'ACC100101';
    // This is a terminal request. Note how we start the response with END
    response = `END Your account number is ${accountNumber}`;
  }

  // Send the response back to the API
  res.set('Content-Type: text/plain');
  res.send(response);
});

app.get('/test', (req, res) => {
  res.send('This route is live')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
