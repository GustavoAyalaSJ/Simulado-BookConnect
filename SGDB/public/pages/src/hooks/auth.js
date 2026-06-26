const AuthHooksManager = {
  onUserCreated: async (user) => {
    console.log(`[Hook - Cadastro] Usuário detectado: ${user?.email || '(sem email)'}`);
  },

  onUserSignIn: async (user) => {
    console.log(
      `[Hook - Login] Usuário ${user?.email || '(sem email)'} acabou de logar.`
    );
  },

  checkSecurityStatus: async (_userId) => {
    // Sem coluna/status no schema informado, assume acesso permitido.
    return true;
  }
};

module.exports = AuthHooksManager;
