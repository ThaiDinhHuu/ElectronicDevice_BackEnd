const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())

routes(app);

app.get('/', (req, res) => {
      res.send('hello')
});

mongoose.connect(`mongodb+srv://huunl2002:${process.env.MONGO_DB}@cluster0.5jphadm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`)
      .then(() => {
            console.log('Ket noi thanh cong')
      })
      .catch(() => {
            console.log('That bai', process.env.CLIENT_ID)
      })

console.log("Example",)
app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})