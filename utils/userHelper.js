import loginData from '../data/LoginData.json';

export function getRandomValidUser() {

    const validUsers = loginData.filter(user => user.type === "valid");

    const randomIndex = Math.floor(Math.random() * validUsers.length);

    return validUsers[randomIndex];
}