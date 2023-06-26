import "dotenv/config";
import App from "./app";
import validateEnv from "./utils/validateEnv";
import ExchangeController from "./controllers/exchange.controller";
// Validate environment variables
validateEnv();
// Create an instance of the App with the ExchangeController
const app = new App([new ExchangeController()]);
// Start listening for incoming requests
app.listen();
//# sourceMappingURL=server.js.map