const fs = require('fs');
const path = require('path');

//json data
const accountData = fs.readFileSync('src/json/accounts.json', 'utf8');
const accounts = JSON.parse(accountData);

//users
const userData = fs.readFileSync('src/json/users.json', 'utf8');
const users = JSON.parse(userData)

writeJSON () => {
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'),accountsJSON, 'utf-8')

}

module.exports = {
    accounts,
    users,
    writeJSON
}