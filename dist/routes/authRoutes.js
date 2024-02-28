"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.post('/', authControllers_1.authController.iniciarSesion);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
//# sourceMappingURL=authRoutes.js.map