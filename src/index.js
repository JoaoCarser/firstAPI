// IMPORTANDO MÓDULOS
const http = require("http");
const { URL } = require("url");

const routes = require("./routes");

// CRIANDO SERVIDOR
const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  console.log("--------------------------------------------------");
  console.log(
    `Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`
  );
  console.log("--------------------------------------------------");

  let { pathname } = parsedUrl;
  let id = null;

  // .split DIVIDE A STRING E TRANSFORMA EM UM ARRAY
  // .filter O QUE FOR FALSE (vazio) IGNORA E NAO MOSTRA NO ARRAY
  const splitEndpoint = pathname.split("/").filter(Boolean);
  console.log(splitEndpoint);

  // SE ARRAY splitEndpoint FOR MAIOR QUE 1 pathname RECEBE A POSIÇÃO 0 E ID RECEBE A POSIÇÃO 1 DO splitEndpoint
  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  // VERIFICA SE HÁ ROTA
  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === request.method
  );

  // SE HOUVER ROTA EXECUTE O HANDLER QUE EQUIVALE AO REQUEST, RESPONSE
  if (route) {
    
    // ESSE REQUEST ESTÁ VINDO DE USERCONTROLLER
    // Object.fromEntries CONVERTE O ITERABLE EM OBJETO VÁLIDO JAVASCRIPT
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    response.send = (statusCode, body)=>{
      response.writeHead(statusCode, { 'Content-Type': 'application.json' });
      response.end(JSON.stringify(body));
    };


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
