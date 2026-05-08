// 1. Importar la biblioteca express
const express = require('express');
const cookieParser = require('cookie-parser'); // Nueva herramienta
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Activa el lector de cookies

// 2. Configurar la carpeta "public" para que sea accesible
// Aquí es donde los alumnos deben poner su index.html y style.css
app.use(express.static('public'));

// 3. Definir el puerto de escucha
const PORT = 3000;

// 4. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    console.log("Presiona Ctrl+C para detener el servidor.");
});

// Este código es un middleware esencial en Express.js que permite a tu servidor analizar (parsear) automáticamente los datos enviados a través de formularios HTML.
app.use(express.urlencoded({ extended: true }));

app.post('/enviar', (req, res) => {
    const { nombre, apellido, email, comentario } = req.body;
    console.log(`Datos recibidos: ${nombre} ${apellido} - ${email}`);
    res.send(`<h1>¡Gracias ${nombre}!</h1><p>Tu comentario ha sido recibido en el servidor.</p>`);
});

app.post('/login', (req, res) => {
    const { usuario, clave } = req.body;

    // Simulación de validación (Capa de Negocio)
    if (usuario === 'admin' && clave === '1234') {
        // Si es correcto, creamos una cookie llamada 'sesion' que dura 5 minutos
        res.cookie('usuarioLogueado', 'admin', { maxAge: 300000, httpOnly: true });
        res.send('<h1>¡Login Exitoso!</h1><p>Se ha guardado una cookie de seguridad.</p><a href="/perfil">Ir a mi perfil</a>');
    } else {
        res.status(401).send('<h1>Error</h1><p>Usuario o contraseña incorrectos.</p>');
    }
});
app.get('/perfil', (req, res) => {
    const usuario = req.cookies.usuarioLogueado; // Intentamos leer la cookie

    if (usuario) {
        res.send(`<h1>Bienvenido a tu panel de control, ${usuario}</h1>`);
    } else {
        res.status(403).send('<h1>Acceso Denegado</h1><p>Debes iniciar sesión primero.</p>');
    }
});