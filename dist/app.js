"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)(); //Inicializa aplicación Express
        this.config();
        this.routes();
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor sobre Puerto ", this.app.get('port'));
        });
    }
    config() {
        // configuración del puerto para el servidor
        this.app.set("port", 3000);
        // muestra las peticiones en consola
        this.app.use((0, morgan_1.default)("dev"));
        // puertos de conexión de la API
        this.app.use((0, cors_1.default)());
        // solo se permiten peticiones en formato JSON
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false, }));
    }
    routes() {
        this.app.use('/', authRoutes_1.default);
        this.app.use('/usuario', usuarioRoutes_1.default);
    }
}
const servidor = new Servidor();
//# sourceMappingURL=app.js.map