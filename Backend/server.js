require("dotenv").config()

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routers/user.router");
const adminRouter = require("./routers/admin.router")
const path = require("path")


const app = express();
const static_path = path.join(__dirname, "public")

app.set('view engine','hbs');
app.use(express.static(static_path));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors("*"));

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.get('/', (req,res) => {
    return res.render('index')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on port : http://localhost:${PORT}`);
})

mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log("DB connected successfully.")
}).catch(err => {
    console.error("DB connection failed.")
    console.error(err)
    process.exit(1) // we use this to kill the server
});