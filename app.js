require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const initializeFirebase = require("./constants/firebase-config");
const { instrument } = require("@socket.io/admin-ui");
const { Server } = require("socket.io");
const initializeFirebaseAuth = require("./constants/firebaseAuth");

initializeFirebase();

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/", require("./routes"));

app.get("/", (req,res)=>{
    res.send(`Loan Agents BE Server, your ip - ${req.headers['x-forwarded-for'] || req.socket.remoteAddress }`)
});

const server = app.listen(process.env.PORT, () => {
    console.log("Server is running on", process.env.PORT || 8080);
});

//websocket integration
const io = new Server(server,{
    pingTimeout:60000,
    cors:{
        origin:'*'
    }
})

app.set('socket_io', io);

instrument(io, {
    auth: false,
});

io.on('connection',(socket)=>{
    socket.on('setup',(uid)=>{
        socket.join(uid)
    })

    socket.on('new message',(newMessage)=>{
        socket.in(newMessage.receiverId).emit("new message", newMessage)
    })

})
