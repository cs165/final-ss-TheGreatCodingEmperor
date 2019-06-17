const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');

// TODO(you): Update the contents of privateSettings accordingly, as you did
// in HW5, then uncomment this line.
const key = require('./privateSettings.json');

// TODO(you): Change the value of this string to the spreadsheet id for your
// GSA spreadsheet, as you did in HW5, then uncomment these lines.
const SPREADSHEET_ID = '1kfr9gBAS2doaDA0rTmtspqgSlX7aagrevK0gnastX6g';
const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

// TODO(you): Add at least 1 GET route and 1 POST route.
async function onGet(req, res) {
  const id = req.params.id;
  const result = await sheet.getRows();
  const rows = result.rows;
  console.log(rows);
  let data = [];
  let exist = false;
  for (i = 1; i < rows.length; i++) {
    if (id === rows[i][0]) {
      exist = true;
      let tmp = {};
      const n = rows[0].length;
      let key_name = [];
      for (let j = 0; j < n; j++) {
        key_name[j] = rows[0][j];
        tmp[key_name[j]] = rows[i][j];
      }
      data.push(tmp);
    }
  }
  let add =[];
  add.push(id);
  add.push(null);

  // TODO(you): Finish onGet.
  if(exist!==true){
    console.log("success");
    await sheet.appendRow(add);
  }
  res.json(data);
}
app.get('/api/:id', onGet);

async function onPost(req, res) {
  const result = await sheet.getRows();
  const rows = result.rows;

  const messageBody = req.body;
  // TODO(you): Implement onPost.

  const n = rows[0].length;

  const keys = Object.keys(messageBody);
  let new_messageBody = {};

  for (let i = 0; i < n; i++) {
    new_messageBody[keys[i].toLowerCase()] = messageBody[keys[i]];
  }

  let add = [];
  for (let i = 0; i < n; i++) {
    add[i] = new_messageBody[rows[0][i]];
  }
  await sheet.appendRow(add);

  res.json({ status: 'successed' });
}
app.post('/api', jsonParser, onPost);

async function onPatch(req, res) {
  const result = await sheet.getRows();
  const rows = result.rows;

  const column = req.params.column;
  const value = req.params.value;
  const messageBody = req.body;

  const n = rows[0].length;

  const keys = Object.keys(messageBody);
  let new_messageBody = {};

  new_messageBody[keys[0].toLowerCase()] = messageBody[keys[0]];

  let change_row = -1;
  for (let i = 1; i < rows.length; i++) {
    for (let j = 0; j < n; j++) {
      if (column.toLowerCase() === rows[0][j]
        && value.toLowerCase() === rows[i][j].toLowerCase()) {
        change_row = i;
        break;
      }
    }
    if (change_row !== -1) break;
  }
  let change_valueIndex = -1;
  if (change_row !== -1) {
    let newRow = [];
    for (let j = 0; j < n; j++) {
      newRow[j] = rows[change_row][j];
      if (new_messageBody.hasOwnProperty(rows[0][j])) {
        newRow[j] = new_messageBody[rows[0][j]];
      }
    }
    await sheet.setRow(change_row, newRow);
  }



  // TODO(you): Implement onPatch.

  res.json({ status: 'successed' });
}
app.patch('/api/:column/:value', jsonParser, onPatch);

async function onDelete(req, res) {
  const result = await sheet.getRows();
  const rows = result.rows;
  const column = req.params.column;
  const value = req.params.value;
  let delete_row = -1;
  for (let i = 0; i < rows.length; i++) {
    const n = rows[0].length;
    for (let j = 0; j < n; j++) {
      if (column.toLowerCase() === rows[0][j]
        && value.toLowerCase() === rows[i][j].toLowerCase()) {
        delete_row = i;
        break;
      }
    }
  }
  if (delete_row !== -1) {
    await sheet.deleteRow(delete_row);
  }



  // TODO(you): Implement onDelete.

  res.json({ status: 'successed' });
}
app.delete('/api/:column/:value', onDelete);


// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
