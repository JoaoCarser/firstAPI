// IMPORTANDO MÓDULOS
const http = require("http");
const routes = require("./routes");

// CRIANDO SERVIDOR
const server = http.createServer((request, response) => {
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  // VERIFICA SE HÁ ROTA
  const route = routes.find(
    (routeObj) => 
    routeObj.endpoint === request.url && routeObj.method === request.method
  );

  // SE HOUVER ROTA EXECUTE O HANDLER QUE EQUIVALE AO REQUEST, RESPONSE
  if (route) {
    route.handler(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end(`Cannot ${request.method}  ${request.url}`);
  }
});

// INDICA A PORTA QUE O SERVIDOR SERÁ INICIALIZADO
server.listen(3000, () => {
  console.log("🔥 Server started at http://localhost:3000");
});
