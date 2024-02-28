import morgan from 'morgan'
import express, {Application} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import authRoutes   from './routes/authRoutes';
import usuarioRoutes from './routes/usuarioRoutes';

class Servidor {
    private app: Application;

    
    constructor() {
        this.app = express(); //Inicializa aplicación Express
        this.config();
        this.routes();

        this.app.listen(
            this.app.get('port'),
            () => {
                console.log("Servidor sobre Puerto ", 
                    this.app.get('port'))
            }
        )
    }

    config(): void {
        // configuración del puerto para el servidor
        this.app.set("port", 3000);
        
       
        // muestra las peticiones en consola
        this.app.use(morgan("dev"));
   
        // puertos de conexión de la API
        this.app.use(cors());
   
        // solo se permiten peticiones en formato JSON
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false,}));
    }
  

    routes() {
        this.app.use('/', authRoutes)
        this.app.use('/usuario', usuarioRoutes)
    }
}

const servidor = new Servidor()