const jwt = require('jsonwebtoken');

function getJwtSecret() {
  return process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
}

function signToken(user) {
  return jwt.sign(
    {
      sub: user.ID_user,
      codId: user.Cod_ID,
      email: user.email
    },
    getJwtSecret(),
    { expiresIn: '7d' }
  );
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    return res.status(401).json({ ok: false, error: 'Token ausente.' });
  }

  const match = String(authHeader).match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return res.status(401).json({ ok: false, error: 'Formato de Authorization inválido. Use Bearer <token>.' });
  }

  const token = match[1];

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'Token inválido ou expirado.' });
  }
}

module.exports = {
  signToken,
  requireAuth
};
