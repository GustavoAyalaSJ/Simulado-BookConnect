(function () {
  const modalTemplates = {
    login: `
  <section class="modal" id="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title" hidden>
    <div class="modal-content">
      <header class="modal-header">
        <h2 id="login-title">Login</h2>
        <button type="button" class="modal-close" data-close-modal>×</button>
      </header>

      <form class="modal-body" id="login-form">
        <label>E-mail:
          <input type="email" name="email" placeholder="Digite o seu email." autocomplete="email" required>
        </label>

        <label>Senha:
          <input type="password" name="password" placeholder="Digite a sua senha." autocomplete="current-password" required>
        </label>

        <div class="checkbox">
          <label class="termosLabel" for="checkbox">
          <input type="checkbox" id="checkbox" name="checar" required />
             Ao conectar-se com o site, você estará concordando com nossos termos de <span class="destacarTermos">Políticas de Privacidade</span>.
          </label>
        </div>

        <button type="submit" class="modal-btn">Entrar</button>
        <button type="button" id="open-register-modal" class="modal-btn">Cadastrar</button>

      </form>
    </div>
  </section>
`,

    register: `
  <section class="modal" id="register-modal" role="dialog" aria-modal="true" aria-labelledby="register-title" hidden>
    <div class="modal-content">
      <header class="modal-header">
        <h2 id="register-title">Cadastro</h2>
        <button type="button" class="modal-close" data-close-modal>×</button>
      </header>

      <form class="modal-body" id="register-form">
        <label class="cadastrarLabel">Nome Completo:</label>
        <input type="text" name="nome_usuario" placeholder="Coloque seu nome completo." maxlength="100" autocomplete="off" required>
        
        <label class="cadastrarLabel">CPF:</label>
        <input type="text" name="cpf" id="inputCPF" placeholder="000.000.000-00" maxlength="14" autocomplete="off" required>
        
        <label class="cadastrarLabel">Telefone:</label>
        <input type="text" name="telefone" id="inputTelefone" placeholder="(xx) xxxxx-xxxx" maxlength="15" autocomplete="off" required>
        
        <label class="cadastrarLabel">E-mail:</label>
        <input type="email" name="email" placeholder="@email.com.br" maxlength="100" autocomplete="off" required>

        <label class="cadastrarLabel">Senha:</label>
        <div class="input-wrapper">
          <input type="password" name="senha" id="reg-senha" placeholder="Digite uma senha aqui." autocomplete="off" required>
        </div>

        <label class="cadastrarLabel">Confirmar Senha:</label>
        <div class="input-wrapper">
           <input type="password" name="confirmar_senha" id="reg-confirma" placeholder="Confirme a senha." autocomplete="off" required>
        </div>
            
        <div class="checkbox">
          <label class="termosLabel" for="checkbox-reg">
            <input type="checkbox" id="checkbox-reg" name="checar" required />
            Ao conectar-se com o site, você estará concordando com nossos termos de <span class="destacarTermos">Políticas de Privacidade</span>.
          </label>
        </div>

        <button class="modal-btn" type="submit">Finalizar Cadastro</button>
        <button type="button" id="btnBackToLogin" class="modal-btn">Voltar ao Login</button>
      </form>
    </div>
  </section>
`,

    about: `
  <section class="modal" id="about-modal" role="dialog" aria-modal="true" aria-labelledby="about-title" hidden>
    <div class="modal-content">
      <header class="modal-header">
        <h2 id="about-title">Sobre nós</h2>
        <button type="button" class="modal-close" data-close-modal>×</button>
      </header>

      <div class="modal-body">
        <p><strong>Book Connect</strong> é uma plataforma para leitores compartilharem experiências, descobrirem novos tipos gênero e discutir sobre os assuntos em alta da comunidade literária.</p>
      </div>
    </div>
  </section>
`,

    support: `
<section class="modal" id="support-modal" role="dialog" aria-modal="true" aria-labelledby="support-title" hidden>
    <div class="modal-content">
      <header class="modal-header">
        <button type="button" class="modal-close" data-close-modal>×</button>
        <h2 id="support-title">Suporte</h2>
      </header>

      <div class="modal-body">
        <form id="formSuporte">
            <label class="selectLabel">Selecione o problema:</label>
            <div class="select-wrapper">
                <select required>
                    <option value="" disabled selected>Selecione</option>
                    <option>Não estou conseguindo criar uma conta na Plataforma.</option>
                    <option>Não estou conseguindo realizar nenhuma postagem na minha conta.</option>
                    <option>PLACEHOLDER.</option>
                    <option>PLACEHOLDER.</option>
                    <option>PLACEHOLDER.</option>
                </select>
                <i class="bi bi-chevron-down select-icon"></i>
            </div>
            
            <label class="suporteLabel">Email Cadastrado:</label>
            <input type="email" placeholder="@email.com.br" required />
            
            <label class="suporteLabel">Telefone Cadastrado:</label>
            <input type="text" id="inputTelefoneSuporte" placeholder="(xx) xxxxx-xxxx" maxlength="15" required />
            
            <label class="suporteLabel">Detalhes:</label>
            <textarea rows="4" maxlength="500"></textarea>
            
            <button type="submit" class="modal-btn">Enviar</button>
        </form>
      </div>
    </div>
  </section>
`
  };

  function mountModals() {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    modalRoot.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop" hidden aria-hidden="true"></div>
      ${Object.values(modalTemplates).join('')}
    `;
    document.body.appendChild(modalRoot);
  }
  mountModals();

  const doc = document;
  const backdrop = doc.getElementById('modal-backdrop');
  const modalIds = {
    login: 'login-modal',
    register: 'register-modal',
    about: 'about-modal',
    support: 'support-modal'
  };

  function openModal(modalEl) {
    if (!modalEl) return;
    closeAllModals();
    modalEl.hidden = false;
    if (backdrop) {
      backdrop.hidden = false;
    }
    const focusTarget = modalEl.querySelector('button,input,textarea,select,a');
    if (focusTarget) {
      focusTarget.focus();
    }
  }

  function closeAllModals() {
    Object.values(modalIds).forEach((id) => {
      const modal = doc.getElementById(id);
      if (modal) {
        modal.hidden = true;
      }
    });
    if (backdrop) {
      backdrop.hidden = true;
    }
  }

  function wireOpeners() {
    doc.getElementById('open-login-modal')?.addEventListener('click', () => openModal(doc.getElementById(modalIds.login)));
    doc.getElementById('btnOpenSobreHeader')?.addEventListener('click', () => openModal(doc.getElementById(modalIds.about)));
    doc.getElementById('btnOpenSuporteHeader')?.addEventListener('click', () => openModal(doc.getElementById(modalIds.support)));
  }

  function wireClosers() {
    doc.addEventListener('click', (e) => {
      const target = e.target;
      if (target.matches && target.matches('[data-close-modal]')) {
        closeAllModals();
        return;
      }
      if (target.id === 'open-register-modal') {
        openModal(doc.getElementById(modalIds.register));
        return;
      }
      if (target.id === 'open-login-modal-2' || target.id === 'btnBackToLogin') {
        openModal(doc.getElementById(modalIds.login));
        return;
      }
      if (target === backdrop) {
        closeAllModals();
      }
    });

    doc.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });
  }

  function setupAuthNavigationAndValidation() {
    const dashboardUrl = 'Dashboard.html';

    const registerForm = doc.getElementById('register-form');
    const loginForm = doc.getElementById('login-form');

    function formatCPF(value) {
      const digits = (value || '').replace(/\D/g, '').slice(0, 11);
      const parts = [
        digits.slice(0, 3),
        digits.slice(3, 6),
        digits.slice(6, 9),
        digits.slice(9, 11)
      ];
      let out = parts[0];
      if (parts[1]) out += '.' + parts[1];
      if (parts[2]) out += '.' + parts[2];
      if (parts[3]) out += '-' + parts[3];
      return out;
    }

    function formatTelefone(value) {
      const digits = (value || '').replace(/\D/g, '').slice(0, 11);
      const ddd = digits.slice(0, 2);
      const first = digits.slice(2, 7);
      const last = digits.slice(7, 11);

      if (!digits) return '';
      let out = '(' + ddd;
      if (ddd.length === 2) out += ')';
      if (first) out += ' ' + first;
      if (last) out += '-' + last;
      return out;
    }

    function hasRepeatedSequence(cpfDigits, telDigits) {
      const a = (cpfDigits || '').replace(/\D/g, '');
      const b = (telDigits || '').replace(/\D/g, '');
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

    const cpfInput = doc.getElementById('inputCPF');
    const telefoneInput = doc.getElementById('inputTelefone');
    const telefoneSuporteInput = doc.getElementById('inputTelefoneSuporte');

    cpfInput?.addEventListener('input', (e) => {
      const input = e.target;
      const before = input.value;
      const formatted = formatCPF(before);
      if (formatted !== before) input.value = formatted;
    });

    function wireTelefoneMask(inputEl) {
      if (!inputEl) return;
      inputEl.addEventListener('input', (e) => {
        const input = e.target;
        const before = input.value;
        const formatted = formatTelefone(before);
        if (formatted !== before) input.value = formatted;
      });
    }

    wireTelefoneMask(telefoneInput);
    wireTelefoneMask(telefoneSuporteInput);

    const API_BASE = (window.location.origin || '').replace(/\/$/, '') + '/api';

    function getCsrfTokenFromStorage() {
      try {
        return localStorage.getItem('csrfToken');
      } catch {
        return null;
      }
    }

    async function postJson(url, payload) {
      const headers = { 'Content-Type': 'application/json' };
      const csrfToken = getCsrfTokenFromStorage();
      if (csrfToken) headers['X-CSRF-Token'] = csrfToken;

      const resp = await fetch(url, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        throw new Error(data?.error || data?.message || 'Erro ao realizar requisição.');
      }
      return data;
    }

    registerForm?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const cpfDigits = (cpfInput?.value || '').replace(/\D/g, '');
      const telDigits = (telefoneInput?.value || '').replace(/\D/g, '');

      if (hasRepeatedSequence(cpfDigits, telDigits)) {
        alert('CPF e Telefone não podem conter sequências repetidas em sequência.');
        return;
      }

      const formData = new FormData(registerForm);
      const nome_usuario = formData.get('nome_usuario');
      const cpf = formData.get('cpf');
      const email = formData.get('email');
      const telefone = formData.get('telefone');
      const senha = formData.get('senha');
      const confirmar_senha = formData.get('confirmar_senha');

      try {
        const result = await postJson(`${API_BASE}/auth/register`, {
          nome_usuario,
          cpf,
          email,
          telefone,
          senha,
          confirmar_senha
        });

        if (result?.ok) {
          const token = result?.token || '';
          localStorage.setItem('token', token);
          document.cookie = `token=${encodeURIComponent(token)}; path=/; SameSite=Lax`;
          window.location.href = dashboardUrl;
          return;
        }

        alert(result?.error || 'Falha no cadastro.');
      } catch (err) {
        alert(err?.message || 'Falha no cadastro.');
      }
    });

    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(loginForm);
      const email = formData.get('email');
      const password = formData.get('password');

      try {
        const result = await postJson(`${API_BASE}/auth/login`, {
          email,
          password
        });

        if (result?.ok && result?.token) {
          const token = result.token;
          localStorage.setItem('token', token);
          document.cookie = `token=${encodeURIComponent(token)}; path=/; SameSite=Lax`;
          window.location.href = dashboardUrl;
          return;
        }

        alert(result?.error || 'Falha no login.');
      } catch (err) {
        alert(err?.message || 'Falha no login.');
      }
    });
  }

  wireOpeners();
  wireClosers();
  setupAuthNavigationAndValidation();

  const carouselColumn = doc.getElementById('genre-carousel-column');
  const filterButtons = Array.from(doc.querySelectorAll('.genre-filter-btn'));
  const coverBasePath = 'assets/bookcover/';
  const imageMap = {
    romance: ['hipotese_do_amor.jpg', 'orgulho_e_preconceito.jpg', 'adeline.jpg'],
    fantasy: ['harry_potter.jpg', 'incipit.jpg', 'corrupt.jpg'],
    ficcaocientifica: ['centro-terra.jpg', 'a-guerra-dos-mundos-hg-wells.jpg', 'codigo-da-vinci.jpg']
  };

  let activeGenre = 'romance';
  let rollTimer = null;
  let index = 0;
  let stepPx = 254;
  const LIMIT = 3;

  function setAriaPressed(btn) {
    filterButtons.forEach((b) => {
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
    });
  }

  function measureStep() {
    const firstCard = carouselColumn?.querySelector('.genre-book-card');
    if (!firstCard) return;
    const rect = firstCard.getBoundingClientRect();
    stepPx = rect.height > 0 ? rect.height + 14 : 254;
  }

  function renderGenre(genre) {
    if (!carouselColumn) return;
    activeGenre = genre;
    index = 0;
    const originalBooks = imageMap[genre].slice(0, LIMIT);
    const extendedBooks = [...originalBooks, ...originalBooks];
    carouselColumn.style.transition = 'transform 0.5s ease-in-out';

    carouselColumn.innerHTML = extendedBooks
      .map((file) => {
        const alt = file.replace('.jpg', '').replaceAll('_', ' ');
        return `
        <div class="genre-book-card">
          <img src="${coverBasePath}${file}" alt="${alt}">
        </div>
      `;
      })
      .join('');

    const currentImages = carouselColumn.querySelectorAll('img');
    currentImages.forEach(img => {
      img.addEventListener('load', measureStep);
    });

    measureStep();
    carouselColumn.style.transform = 'translateY(0)';
  }

  function stopRoll() {
    if (!rollTimer) return;
    clearInterval(rollTimer);
    rollTimer = null;
  }

  function startRoll() {
    stopRoll();
    rollTimer = setInterval(() => {
      if (!carouselColumn) return;

      index++;
      carouselColumn.style.transition = 'transform 0.5s ease-in-out';
      carouselColumn.style.transform = `translateY(${-index * stepPx}px)`;
      if (index >= LIMIT) {
        setTimeout(() => {
          index = 0;
          if (carouselColumn) {
            carouselColumn.style.transition = 'none';
            carouselColumn.style.transform = 'translateY(0)';
          }
        }, 500);
      }
    }, 1600);
  }

  function initCarousel() {
    if (!carouselColumn) return;
    renderGenre(activeGenre);
    startRoll();

    const genres = ['romance', 'fantasy', 'drama'];

    document.getElementById('carousel-next-genre')?.addEventListener('click', () => {
      const pressedBtn = filterButtons.find((b) => b.getAttribute('aria-pressed') === 'true');
      const currentGenre = pressedBtn && pressedBtn.dataset && pressedBtn.dataset.genre ? pressedBtn.dataset.genre : activeGenre;
      const current = genres.indexOf(currentGenre);
      const next = genres[(current + 1) % genres.length];
      const btn = filterButtons.find(b => b.dataset.genre === next);

      if (btn) {
        setAriaPressed(btn);
      }
      renderGenre(next);
      startRoll();
    });

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        setAriaPressed(btn);
        renderGenre(btn.dataset.genre);
        startRoll();
      });
    });

    window.addEventListener('resize', () => {
      measureStep();
      carouselColumn.style.transition = 'none';
      carouselColumn.style.transform = `translateY(${-index * stepPx}px)`;
    });
  }

  initCarousel();
})();