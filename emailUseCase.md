# Email notification Use Case

## The gist of the use case email notification

- Email notification will provide enchanced experience for the user's interface to reponse back to there emails through the Point Parker checkers UI.
- Once the email is stored in the database, the student r faculty will get notification from the Point Park's Checkers news and covid- outbreaks notified to each
individual once sign up.
### Code example:

```JavaScript
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

  app.post('/email', (req, res) => {
    // TODO:
    console.log('Data: ', req.body);
    res.json({ message: 'Message received'});
  });

app.use(express.static(path.join(__dirname + '/views')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
```

- There will be changes and improves from here on out. Those changes will reflect how the UI will function later on for sending email to students and staffs around
campus.

![USE](VIEWS/img/case.jpg)
