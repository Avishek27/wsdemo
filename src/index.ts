import {WebSocket, WebSocketServer } from "ws";

const express = require("express");
const app = express();

const httpServer = app.listen(8000);

const wss = new WebSocketServer({ server: httpServer});

wss.on("connection",function connection(ws){
 ws.on("error",console.error);

 ws.on("message",function message(data,isBinary){
    wss.clients.forEach(function each(client){
        if(client.readyState === WebSocket.OPEN){
            client.send(data,{ binary: isBinary});
        }
    })
 })

 ws.send("Hello from message server!");
});