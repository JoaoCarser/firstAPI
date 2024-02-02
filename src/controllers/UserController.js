// IMPORTA O MODÚLO COM OS OBJETOS 'USERS'
const users = require("../mocks/users");

// EXPORTA O MÉTODO DE LISTAGEM DE USUÁRIOS
module.exports = {
  listUsers(request, response) {
    console.log(request.query);

    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === "desc") {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    // SE NAO ENCONTRAR USUARIO RETORNE E PARE A OPERAÇÃO
    if (!user) {
      return response.send(400, { error: "User not found" });
    }

    // SE ENCONTRAR USUARIO EXECUTE ESSA OPERAÇÃO 
    response.send(200, user);
  },
};
