import { Request, Response } from "express";
import validator from "validator";
import model from "../models/usuarioModel";
import { utils } from '../utils/utils';

class UsuarioController {

  public async list(req: Request, res: Response) {
    try {
      const lstUsuarios = await model.list()

      return res.json({ message: "Listado de Usuario", data: lstUsuarios, code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const {email, password, role} = req.body

      if (validator.isEmpty(email.trim()) ||
            validator.isEmpty(password.trim()) ||
            validator.isEmpty(role.trim())) {

        return res
            .status(400)
            .json({ message: "Los campos son requeridos", code: 1 });
        }
        
        const usuario = {
          "email": email,
          "password": password,
          "role": role
        }

      // encriptar la contraseña
      var encryptedText = await utils.hashPassword(usuario.password);
      usuario.password = encryptedText;
      console.log("Contraseña encriptada " + typeof usuario.password);


      await model.add(usuario)
          

      return res.json({ message: "Agregar Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async update(req: Request, res: Response) {
    try {

      const usuario = {
        "email": req.body.email,
        "password": req.body.password,
      };
      
      // encriptar la contraseña
      var encryptedText = await utils.hashPassword(usuario.password);
      usuario.password = encryptedText;

      console.log("Usuario " + usuario.email)
      
      await model.update(usuario);

      return res.json({ message: "Modificación de Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const email = req.body.email;

      await model.delete(email)
      return res.json({ message: "Eliminación de Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
}
export const usuarioController = new UsuarioController();
