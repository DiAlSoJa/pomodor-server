const express = require("express");
const cors = require("cors")
const app = express();
require("dotenv").config();

const {dbConnect} = require("./config/dbConnect");
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/user",require("./routes/usuarios"));
app.use("/folder",require("./routes/folders"));
app.use("/carta",require("./routes/carta"));

dbConnect();

console.clear()
app.listen(PORT,()=>{
    console.log("servidor corriendo en el puerto "+PORT)
})

