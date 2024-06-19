const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    let usedCharacters = []

    while (result.length < 8) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        const randomCharacter = characters[randomIndex]

        if (!usedCharacters.includes(randomCharacter)) {
            result += randomCharacter
            usedCharacters.push(randomCharacter)
        }
    }

    return result
}

module.exports = {
    generateRandomString
}
