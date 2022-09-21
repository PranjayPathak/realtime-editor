
const ACTIONS = require('./src/Actions');
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer);
const PORT = process.env.PORT || 4000;

const userSocketMap = {};

function getAllConnectedClients(sessionId) {
    return Array.from(io.sockets.adapter.rooms.get(sessionId) || []).map(
        (socketId) => {
            return {
                socketId,
                userName: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    // console.log("connected");
    // console.log("socket: ", socket.id);

    // console.log("socket room: ", socket.rooms);

    socket.on(ACTIONS.JOIN, ({ sessionId, userName }) => {
        console.log("Action join");
        userSocketMap[socket.id] = userName;
        // console.log("userSocketMap: ", userSocketMap);

        socket.join(sessionId);
        const clients = getAllConnectedClients(sessionId);
        // console.log("clients: ", clients);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                userName,
                socketId: socket.id
            })

        })
    })

    socket.on(ACTIONS.CODE_CHANGE, ({ sessionId, code }) => {
        // socket.in(sessionId).emit(ACTIONS.CODE_CHANGE, { code })
        console.log("changing code : ", code);
        socket.in(sessionId).emit(ACTIONS.CODE_CHANGE, { code });
    })

    socket.on(ACTIONS.SYNC_CODE, ({ sessionId, code }) => {
        socket.in(sessionId).emit(ACTIONS.CODE_CHANGE, { code })

        // io.to(sessionId).emit(ACTIONS.CODE_CHANGE, { code });
        console.log("syncing code",sessionId, code);
        console.log("---------");
    })

    socket.on('disconnecting', () => {
        console.log("disconnected");
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, { // emit from server to client
                socketId: socket.id,
                userName: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
})

httpServer.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
})
