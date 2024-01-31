// IMPORTA O MODÚLO COM OS OBJETOS 'USERS'
const users = require("../mocks/users");

// EXPORTA O MÉTODO DE LISTAGEM DE USUÁRIOS
module.exports = {
  listUsers(request, response) {
    response.writeHead(200, { "Content-Type": "application.json" });
    response.end(JSON.stringify(users));
  },
};
