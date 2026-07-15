import loginData from '../data/LoginData.json';

export function getRandomValidUser() {
    const validUsers = loginData.filter(
        user => user.type === 'valid'
    );

    return validUsers[
        Math.floor(Math.random() * validUsers.length)
    ];
}