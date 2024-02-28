import pool from '../utils/connection';


class AuthModelo {
 
    /*
    *Método para buscar un usuario por email
    */
    public async getuserByEmail(email: string) {
        
        let query = "SELECT * FROM tbl_usuario WHERE email =  '" + email +"'";
        console.log("Query " + query);

        const result = await pool.then(async (connection) => {
            return await connection.query(query);
        });
        return result;
    }
}
const model = new AuthModelo();
export default model;
