// auth.js
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password:', hashedPassword);
    return hashedPassword;
}

async function comparePasswords(password, hashedPassword) {
    console.log(await bcrypt.compare(password, hashedPassword))
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePasswords };