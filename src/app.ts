import * as express from "express";
import Controller from "./interfaces/controller.interface";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerJsdoc from "swagger-jsdoc";
import * as YAML from "yamljs";
import * as fs from "fs";
import * as path from "path";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeControllers(controllers);
    this.initializeSwagger();
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router); // Mount each controller's router at the root path
    });
  }

  private initializeSwagger() {
    const swaggerFilePath = path.resolve(__dirname, "swagger.yaml");
    const swaggerDocument = YAML.load(swaggerFilePath);

    this.app.use("/api-docs", swaggerUi.serve);
    this.app.get("/api-docs", swaggerUi.setup(swaggerDocument));
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }
}

export default App;
