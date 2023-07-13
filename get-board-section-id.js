const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(express.json());

app.post("/fetch-board-id", async (req, res) => {
  const { apiKey, apiToken, boardId } = req.body;
  try {
    const response = await axios.get(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`
    );

    const sections = response.data;
    res.json({ message: "Success", sectionsList: sections });
  } catch (error) {
    res.json({
      message: "Error retrieving board sections",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("App is listening on Port 5000");
});
