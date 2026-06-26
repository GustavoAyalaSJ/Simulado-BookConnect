const { supabase } = require('../config/supabase.js');

const AuthHooksManager = {

    onUserCreated: async (user) => {
        try {
            console.log(`[Hook - Cadastro] Novo usuário detectado: ${user.email}`);

            const { error } = await supabase
                .from('profiles')
                .insert([
                    { 
                        id: user.id,
                        email: user.email,
                        role: 'user',
                        created_at: new Date()
                    }
                ]);

            if (error) throw error;
            console.log(`[Hook - Cadastro] Perfil criado com sucesso para o ID: ${user.id}`);
        } catch (error) {
            console.error(`[Hook Erro - Cadastro]:`, error.message);
        }
    },

    onUserSignIn: async (user) => {
        try {
            console.log(`[Hook - Login] Usuário ${user.email} acabou de logar.`);

            await supabase
                .from('profiles')
                .update({ last_login: new Date() })
                .eq('id', user.id);

        } catch (error) {
            console.error(`[Hook Erro - Login]:`, error.message);
        }
    },
    checkSecurityStatus: async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('status')
                .eq('id', userId)
                .single();

            if (error || !data) return false;

            return data.status !== 'banned';
        } catch {
            return false;
        }
    }
};

module.exports = AuthHooksManager;