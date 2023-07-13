const axios = require('axios');
require('dotenv').config();
const BOARD_ID = '64ace866a90da1cf2af761c6'; // Replace with your actual board ID
const LIST_NAME = 'To Do'; // Replace with the name of the list to which you want to add the bug
const API_KEY = process.env.apiKey;
const API_TOKEN = process.env.accessToken;

async function sendBugToTrello() {
  try {
    const listId = await getListId(LIST_NAME);
    if (!listId) {
      throw new Error(`List '${LIST_NAME}' not found on the Trello board.`);
    }

    const response = await axios.post(
      `https://api.trello.com/1/cards?key=${API_KEY}&token=${API_TOKEN}`,
      {
        name: 'Bug Title',
        desc: 'Bug Description',
        idList: listId,
        idBoard: BOARD_ID
      }
    );

    console.log('Bug successfully sent to Trello:', response.data);

  } catch (error) {
    console.error('Error sending bug to Trello:', error.message);
  }
}

async function getListId(listName) {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/boards/${BOARD_ID}/lists?key=${API_KEY}&token=${API_TOKEN}`
    );

    const lists = response.data;
    const list = lists.find((list) => list.name === listName);

    return list ? list.id : null;
  } catch (error) {
    throw new Error('Error retrieving lists from Trello:', error.message);
  }
}

sendBugToTrello();
