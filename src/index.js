// IMPORTANDO MÓDULOS
const http = require("http");
const url = require('url');
const routes = require("./routes");

// CRIANDO SERVIDOR
const server = http.createServer((request, response) => {
  // DESESTRUTURA A URL PARA PODER PEGAR O PATHNAME E PASSAR PARAMETROS DE CONSULTAS
  const parsedUrl = url.parse(request.url);
  console.log(parsedUrl);
  
  console.log("--------------------------------------------------");
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);
  console.log("--------------------------------------------------");
  
  // VERIFICA SE HÁ ROTA
  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  );

  // SE HOUVER ROTA EXECUTE O HANDLER QUE EQUIVALE AO REQUEST, RESPONSE
  if (route) {
    route.handler(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end(`Cannot ${request.method}  ${parsedUrl.pathname}`);
  }
});

// INDICA A PORTA QUE O SERVIDOR SERÁ INICIALIZADO
server.listen(3000, () => {
  console.log("🔥 Server started at http://localhost:3000");
});
