const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors = require("cors");
require("dotenv").config();
const {Serverinfo,validate}=require('./models/serverinfo')
const auth=require('./middlewares/validservername')
app.listen(3000,()=>{
    console.log("App is listening");
})
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
main()
.then(()=>{
    console.log("connection successful");
})
async function main(){
    await  mongoose.connect(`${process.env.MONGO_URL}`);
 }
 app.get("/api/server-info/:serverName", auth, async (req, res) => {
    try {
      const { serverName } = req.params;
      const serverInfo = await Serverinfo.findOne({ servername:serverName });
      if (!serverInfo) {
        return res.status(404).json({ message: `Server info not found for serverName: ${serverName}` });
      }
      res.json(serverInfo);
    } catch (error) {
      console.error("Error fetching server info:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
app.post("/api/server-info", async (req, res) => {
    try {
        const serverinfo = new Serverinfo(req.body);
        await serverinfo.save();
    
        res.status(201).send({ message: "Server info created successfully!", serverinfo });
      } catch (err) {
        if (err.code === 11000) {
          return res.status(400).send({ message: "Server name must be unique!" });
        }
        res.status(500).send({ message: "An error occurred while creating server info.", error: err.message });
    }
  });