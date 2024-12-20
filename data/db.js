const mysql = require('mysql2');

// Configurazione
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'XXXXXX',
    database: 'blog_db',
    port: 3306
});

// Test della connessione
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Errore di connessione', err.message);
    } else {
        console.log('Connesso');
        connection.release();
    }
});

module.exports = pool;
