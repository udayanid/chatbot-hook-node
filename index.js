const express = require('express')
const bodyParser = require('body-parser')
const app = express()



// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('WebHook is running')
})



// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "mycustomtoken23"

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {

  let body = req.body;

  console.log(body);
  // Returns a '200 OK' response to all requests
  res.status(200).send('EVENT_RECEIVED');


});

app.listen(process.env.PORT || 5000, () => console.log('Webhook listening on port ' + process.env.PORT || 5000))