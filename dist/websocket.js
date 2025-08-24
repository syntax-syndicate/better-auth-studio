"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocket = setupWebSocket;
exports.broadcastUpdate = broadcastUpdate;
const ws_1 = require("ws");
function setupWebSocket(wss) {
    wss.on('connection', (ws) => {
        console.log('Client connected to WebSocket');
        // Send initial data
        ws.send(JSON.stringify({
            type: 'connected',
            timestamp: new Date().toISOString()
        }));
        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                handleWebSocketMessage(ws, data);
            }
            catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        });
        ws.on('close', () => {
            console.log('Client disconnected from WebSocket');
        });
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
    // Broadcast updates to all connected clients
    setInterval(() => {
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'heartbeat',
                    timestamp: new Date().toISOString()
                }));
            }
        });
    }, 30000); // Send heartbeat every 30 seconds
}
function handleWebSocketMessage(ws, data) {
    switch (data.type) {
        case 'ping':
            ws.send(JSON.stringify({
                type: 'pong',
                timestamp: new Date().toISOString()
            }));
            break;
        case 'subscribe':
            // Handle subscription to specific data types
            ws.send(JSON.stringify({
                type: 'subscribed',
                dataType: data.dataType,
                timestamp: new Date().toISOString()
            }));
            break;
        default:
            console.log('Unknown WebSocket message type:', data.type);
    }
}
function broadcastUpdate(wss, type, data) {
    const message = JSON.stringify({
        type,
        data,
        timestamp: new Date().toISOString()
    });
    wss.clients.forEach((client) => {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(message);
        }
    });
}
//# sourceMappingURL=websocket.js.map