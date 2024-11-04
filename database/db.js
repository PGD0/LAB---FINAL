import mysql from 'mysql';

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    database: 'laboratorio_final',
    user: 'root',
    password: process.env.DB_PASSWORD
});

export default conexion;