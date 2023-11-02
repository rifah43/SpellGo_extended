const mongoose= require("mongoose");
const express= require("express");
const cors= require("cors");
// const path = require('path');
const userRoutes= require("./user/userRoutes.js");
const discordRoutes= require("./middleware/discord.js");
const quizRoutes= require("./quiz/quizRoutes.js");
const themeRoutes= require("./customTheme/themeRoute.js");
const gameRoutes= require("./game/gameRoutes.js");
const chatRoutes= require("./middleware/chat.js");
const url= "mongodb://127.0.0.1:27017/spellGo";
const port= 5000;
const app= express();

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    app.listen(port, function check(err) {
      if (err)
        console.log("error");
      else
        console.log("Server connected");
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
app.use(cors());
app.use(express.json());
// app.use(express.static('public'));

// app.get('/game', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.use(userRoutes);
app.use(discordRoutes);
app.use(quizRoutes);
app.use(chatRoutes);
app.use(themeRoutes);
app.use(gameRoutes);