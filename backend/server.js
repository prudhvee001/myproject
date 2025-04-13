const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
  }
});

app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Simulating order status updates every 5 seconds
const statuses = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

let statusIndex = 0;

setInterval(() => {
  if (statusIndex < statuses.length) {
    io.emit("orderStatusUpdate", { status: statuses[statusIndex] });
    console.log("Status Updated:", statuses[statusIndex]);
    statusIndex++;
  }
}, 5000);

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});
