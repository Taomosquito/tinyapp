const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
app.use(express.urlencoded({ extended: true }));

const generateRandomString = function() {
  const stAz = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*";
  let newStr = '';
  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * stAz.length);
    newStr += stAz[random];
  }
  return newStr;
};

app.set("view engine", "ejs");

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

app.get("/", (req, res) => {
  console.log("failure");
  res.send("Hello!");
});
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
// Starting of 2nd task set.
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
app.get("/urls/:id", (req, res) => {
  const urlDatabaseKey = req.params.id;
  const templateVars = { id: urlDatabaseKey, longURL: urlDatabase[urlDatabaseKey] };
  res.render("urls_show", templateVars);
});
app.get("/u/:id", (req, res) => {
  console.log(urlDatabase[req.params.id]);
  const longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
});
app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  const newID = generateRandomString();
  urlDatabase[newID] = req.body.longURL;
  res.redirect(`/urls/${newID}`);
  // res.send('OK'); // Respond with 'Ok' (we will replace this)
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

