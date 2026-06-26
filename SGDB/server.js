const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const authRoutes = require('./routes/auth');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_URL || ['http://localhost:3000', 'https://bookconnectspace.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        error: 'Muitas tentativas de login vindas deste IP. Por favor, tente novamente após 15 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    }
});

app.get('/csrf-token', csrfProtection, (req, res) => {
    return res.json({ csrfToken: req.csrfToken() });
});

app.use('/api/auth', loginLimiter, csrfProtection, authRoutes);

app.get('/dashboard', (req, res) => {
    res.json({ message: "Dados do Dashboard" });
});

app.get('/introduction', (req, res) => {
    res.json({ message: "Página de Introdução" });
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Perfil do usuário com ID: ${id}` });
});


app.listen(PORT, () => {
    console.log(`[Server] Servidor rodando com sucesso na porta ${PORT}`);
});