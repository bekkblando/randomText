
exports.handler = (event, context, callback) => {
    var config = {
      apiKey: "AIzaSyDluXgXkG3OLGQoBfEmsBgAxDQzGzxbIFw",
      authDomain: "randominsights-8d910.firebaseapp.com",
      databaseURL: "https://randominsights-8d910.firebaseio.com",
      projectId: "randominsights-8d910",
      storageBucket: "randominsights-8d910.appspot.com",
      messagingSenderId: "142816139217"
    };

    let firebase = require('firebase').initializeApp(config);
    const accountSid = '';
    const authToken = '';
    const client = require('twilio')(accountSid, authToken);
    console.log("started")

    let options = []
    firebase.database().ref().once('value', (snapshot, index) => {
        let val = snapshot.val()
        Object.keys(val).map((quote) => {options.push({name: quote, value: val[quote]})})
        randomInsight = options[Math.floor(Math.random() * options.length)]

        client.messages
          .create({
             body: `${randomInsight['name']} : ${randomInsight['value']}`,
             from: '+18644796636',
             to: '+18642525185'
           })
          .then(message => console.log("Message: ", message))
          .catch(error => console.log(error))
          .done(m => {console.log("Done"); context.done(null, "Done")});

    });

};
