const bcrypt = require('bcrypt');
const { supabase } = require('../config/supabase');

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

function hasRepeatedSequence(aDigits, bDigits) {
  const a = onlyDigits(aDigits);
  const b = onlyDigits(bDigits);
  if (a.length < 6 || b.length < 6) return false;

  const minLen = 6;
  const maxLen = Math.min(a.length, b.length);

  for (let len = maxLen; len >= minLen; len--) {
    for (let i = 0; i <= a.length - len; i++) {
      const sub = a.slice(i, i + len);
      if (sub && b.includes(sub)) {
        return true;
      }
    }
  }
  return false;
}

function generateCodId() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const nums = '0123456789';

  const pick = (set) => set[Math.floor(Math.random() * set.length)];
  const letterCount = 4;
  const numCount = 6;

  let out = '';
  for (let i = 0; i < letterCount; i++) out += pick(letters);
  for (let i = 0; i < numCount; i++) out += pick(nums);

  return out;
}

function pickUserPayload(userRow) {
  return {
    ID_user: userRow.ID_user,
    Cod_ID: userRow.Cod_ID,
    Nome_usuario: userRow.Nome_usuario,
    cpf: userRow.cpf,
    email: userRow.email,
    telefone: userRow.telefone
  };
}

exports.cadastro = async (req, res) => {
  try {
    const {
      nome_usuario,
      cpf,
      email,
      telefone,
      senha,
      confirmar_senha
    } = req.body || {};

    if (!nome_usuario || !cpf || !email || !telefone || !senha || !confirmar_senha) {
      return res.status(400).json({ ok: false, error: 'Todos os campos são obrigatórios.' });
    }

    if (String(senha) !== String(confirmar_senha)) {
      return res.status(400).json({ ok: false, error: 'As senhas não conferem.' });
    }

    const cpfDigits = onlyDigits(cpf);
    const telDigits = onlyDigits(telefone);

    if (cpfDigits.length < 11) {
      return res.status(400).json({ ok: false, error: 'CPF inválido.' });
    }
    if (telDigits.length < 10) {
      return res.status(400).json({ ok: false, error: 'Telefone inválido.' });
    }

    if (hasRepeatedSequence(cpfDigits, telDigits)) {
      return res.status(400).json({ ok: false, error: 'CPF e Telefone não podem conter sequências repetidas.' });
    }

    const COD_ID = generateCodId();
    const senha_hash = await bcrypt.hash(String(senha), 10);

    const { data: existing, error: existingErr } = await supabase
      .from('Usuario')
      .select('ID_user')
      .eq('email', String(email).toLowerCase())
      .maybeSingle();

    if (existingErr) {
      return res.status(500).json({ ok: false, error: 'Erro ao consultar banco.' });
    }

    if (existing) {
      return res.status(409).json({ ok: false, error: 'E-mail já cadastrado.' });
    }

    const { data: inserted, error: insertErr } = await supabase
      .from('Usuario')
      .insert({
        Cod_ID: COD_ID,
        Nome_usuario: String(nome_usuario),
        cpf: cpfDigits,
        email: String(email).toLowerCase(),
        telefone: telDigits,
        senha_hash
      })
      .select('*')
      .single();

    if (insertErr) {
      return res.status(500).json({ ok: false, error: 'Erro ao cadastrar usuário.' });
    }

    return res.status(201).json({
      ok: true,
      user: pickUserPayload(inserted)
    });
  } catch (err) {
    console.error('[cadastro] Unexpected error:', err);
    return res.status(500).json({ ok: false, error: 'Erro interno no servidor.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'E-mail e senha são obrigatórios.' });
    }

    const { data: userRow, error: fetchErr } = await supabase
      .from('Usuario')
      .select('*')
      .eq('email', String(email).toLowerCase())
      .maybeSingle();

    if (fetchErr) {
      return res.status(500).json({ ok: false, error: 'Erro ao consultar banco.' });
    }

    if (!userRow) {
      return res.status(401).json({ ok: false, error: 'Credenciais inválidas.' });
    }

    const ok = await bcrypt.compare(String(password), userRow.senha_hash);
    if (!ok) {
      return res.status(401).json({ ok: false, error: 'Credenciais inválidas.' });
    }

    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

    const token = jwt.sign(
      {
        sub: userRow.ID_user,
        codId: userRow.Cod_ID,
        email: userRow.email
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      ok: true,
      token,
      user: pickUserPayload(userRow)
    });
  } catch (err) {
    console.error('[login] Unexpected error:', err);
    return res.status(500).json({ ok: false, error: 'Erro interno no servidor.' });
  }
};
