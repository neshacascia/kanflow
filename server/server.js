const express = require('express');
const path = require('path');
const app = express();

require('dotenv').config({ path: './config/.env' });

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}.`);
});
