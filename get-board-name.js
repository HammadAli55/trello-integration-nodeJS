const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(express.json());

app.post('/fetch-section-id', async (req, res) => {
  const { apiKey, apiToken } = req.body;
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/boards`,
      {
        params: {
          key: apiKey,
          token: apiToken,
        },
      }
    );
    const boards = response.data;
    const boardId = boards.map((board) => board.id);
    res.json({ message: "Success", boardId: boardId});
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res.json({ message: "Error retrieving projects", error: error});
  }
});

app.listen(5000, () => {
  console.log("App is listening on Port 5000");
});