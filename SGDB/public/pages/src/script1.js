(function () {
  const modalTemplates = {
    login: `
  <section class="modal" id="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title" hidden>
    <div class="modal-content">
      <header class="modal-header">
        <h2 id="login-title">Login</h2>
        <button type="button" class="modal-close" data-close-modal aria-label="Fechar">×</button>
      </header>

      <form class="modal-body" id="login-form">
        <label>E-mail
          <input type="email" name="email" placeholder="Digite o seu email." autocomplete="email" required>
        </label>

        <label>Senha
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
        <button type="button" class="modal-close" data-close-modal aria-label="Fechar">×</button>
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
        <button type="button" class="modal-close" data-close-modal aria-label="Fechar">×</button>
      </header>

      <div class="modal-body">
        <p>
          O <strong>Book Connect</strong> é um espaço para leitores compartilharem experiências, descobrirem livros e se conectarem por gêneros.
        </p>
        <p>
          Em breve: curtidas, comentários, perfil e integração com banco para login e registro.
        </p>
      </div>
    </div>
  </section>
`,

    support: `
<section class="modal" id="support-modal" role="dialog" aria-modal="true" aria-labelledby="support-title" hidden>
    <div class="modal-content">
      <header class="modal-header">
        <button type="button" class="modal-close close-btn" data-close-modal aria-label="Fechar">X</button>
        <h2 id="support-title">Suporte</h2>
      </header>

      <div class="modal-body">
        <form id="formSuporte">
            <label class="suporteLabel">Selecione o problema:</label>
            <div class="select-wrapper">
                <select required>
                    <option value="" disabled selected>Selecione</option>
                    <option>PLACEHOLDER.</option>
                    <option>PLACEHOLDER.</option>
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

  wireOpeners();
  wireClosers();

  const carouselColumn = doc.getElementById('genre-carousel-column');
  const filterButtons = Array.from(doc.querySelectorAll('.genre-filter-btn'));
  const coverBasePath = 'assets/bookcover/';
  const imageMap = {
    romance: ['hipotese_do_amor.jpg', 'orgulho_e_preconceito.jpg', 'adeline.jpg'],
    fantasy: ['harry_potter.jpg', 'incipit.jpg', 'corrupt.jpg'],
    drama: ['bad_prince.jpg', 'corrupt.jpg', 'orgulho_e_preconceito.jpg']
  };

  let activeGenre = 'romance';
  let rollTimer = null;
  let index = 0;
  let stepPx = 254;

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
    carouselColumn.innerHTML = imageMap[genre]
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
      const cards = carouselColumn.querySelectorAll('.genre-book-card');
      if (!cards.length) return;
      index = (index + 1) % cards.length;
      carouselColumn.style.transform = `translateY(${-index * stepPx}px)`;
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
      carouselColumn.style.transform = `translateY(${-index * stepPx}px)`;
    });
  }

  initCarousel();
})();