"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const validator_1 = __importDefault(require("validator"));
const usuarioModel_1 = __importDefault(require("../models/usuarioModel"));
const utils_1 = require("../utils/utils");
class UsuarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lstUsuarios = yield usuarioModel_1.default.list();
                return res.json({ message: "Listado de Usuario", data: lstUsuarios, code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, role } = req.body;
                if (validator_1.default.isEmpty(email.trim()) ||
                    validator_1.default.isEmpty(password.trim()) ||
                    validator_1.default.isEmpty(role.trim())) {
                    return res
                        .status(400)
                        .json({ message: "Los campos son requeridos", code: 1 });
                }
                const usuario = {
                    "email": email,
                    "password": password,
                    "role": role
                };
                // encriptar la contraseña
                var encryptedText = yield utils_1.utils.hashPassword(usuario.password);
                usuario.password = encryptedText;
                console.log("Contraseña encriptada " + typeof usuario.password);
                yield usuarioModel_1.default.add(usuario);
                return res.json({ message: "Agregar Usuario", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = {
                    "email": req.body.email,
                    "password": req.body.password,
                };
                // encriptar la contraseña
                var encryptedText = yield utils_1.utils.hashPassword(usuario.password);
                usuario.password = encryptedText;
                console.log("Usuario " + usuario.email);
                yield usuarioModel_1.default.update(usuario);
                return res.json({ message: "Modificación de Usuario", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                yield usuarioModel_1.default.delete(email);
                return res.json({ message: "Eliminación de Usuario", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
//# sourceMappingURL=usuarioController.js.map