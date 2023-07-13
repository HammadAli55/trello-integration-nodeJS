const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(express.json());

app.post('/send-bug', async (req, res) => {
  const { apiKey, apiToken, boardId, listId, name, desc} = req.body;
  try {
    const response = await axios.post(
      `https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}`,
      {
        name: name,
        desc: JSON.stringify(desc),
        idList: listId,
        idBoard: boardId
      }
    );
    res.json({ message: "Success", response: response.data });
  } catch (error) {
    res.status(500).json({ message: "Failed to send bug to Asana", error:error });
  }
});

app.listen(5000, () => {
  console.log("App is listening on Port 5000");
});