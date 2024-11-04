import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import conexion from './database/db.js';

dotenv.config({});

const port = process.env.PORT;
const app = express();

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.post('/validar', (req, res) => {
    const { username, password } = req.body;

    if(username && password){
        conexion.query('SELECT * FROM usuarios WHERE nombre = ? AND contraseña = ?', [username, password], async (err, results) =>{
            if (err) {
                console.error('Error al consultar la base de datos:', err);
                return res.json({ err: true, message: 'Error en el servidor' });
            }
            
            if(results.length == 0){
                res.json({ err: true, message: 'USUARIO Y/O CONTRASEÑA INCORRECTOS' });
            } else {
                res.json({ err: false, message: 'LOGIN CORRECTO' });
            }
        });
    }
});

app.listen(port, function(){
    console.log(`Servidor creado en http://localhost:${port}`);
});
