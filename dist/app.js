import * as express from "express";
import * as swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";
import * as path from "path";
class App {
    constructor(controllers) {
        this.app = express();
        this.initializeControllers(controllers);
        this.initializeSwagger();
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router); // Mount each controller's router at the root path
        });
    }
    initializeSwagger() {
        const swaggerFilePath = path.resolve(__dirname, "swagger.yaml");
        const swaggerDocument = YAML.load(swaggerFilePath);
        this.app.use("/api-docs", swaggerUi.serve);
        this.app.get("/api-docs", swaggerUi.setup(swaggerDocument));
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on port ${process.env.PORT}`);
        });
    }
    getServer() {
        return this.app;
    }
}
export default App;
//# sourceMappingURL=app.js.map