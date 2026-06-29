(function () {
  const postTemplates = {
    post: `
      <div class="post-container">
        <section class="post-header">
          <div class="photo-container">
            <!-- A foto de perfil do usuário -->
          </div>
          <aside class="post-information">
            <a class="user-link">
              <!-- O nome do usuário ao clicar enviará para perfil-->
            </a>
            <div class="post-date">
              <!-- Data da postagem em HH - DD/MM/YY -->
            </div>
          </aside>
          <div class="extra-post-content">
            <i class="bi bi-three-dots"></i>
          </div>
        </section>

        <article class="post-body">
          <p>
            <!-- O que o usuário escreveu irá aparecer aqui -->
          </p>
          <div class="img-container-optional">
            <!-- Caso o usuário tenha colocado imagem no post -->
          </div>
        </article>

        <section class="post-footer">
          <div class="summarize-count">
            <p>Curtidas:
            <div id="count-likes">PLACEHOLDER</div> • Comentários: <div id="count-comments">PLACEHOLDER</div>
            </p>
          </div>

          <div class="actions-user-line">
            <i class="bi bi-heart">Curte</i>
            <i class="bi bi-chat-left-text">Comente</i>
            <i class="bi bi-share">Compartilhe</i>
          </div>

          <div class="comment-section">
            <!-- Seção escondida, caso o usuário clique para comentar-->
            <label class="commentLabel">Escreva um comentário para este post:</label>
            <textarea rows="2" maxlength="500"></textarea>
            <button class="send-post"><i class="bi bi-send"></i>Enviar</button>
          </div>
        </section>
      </div>
    `.trim()
  };

  window.postTemplates = postTemplates;

  function dashboardGatingIfLoggedOutSafe() {
    const path = (window.location && window.location.pathname) || '';
    const isDashboardPage = /Dashboard\.html$/i.test(path);
    if (!isDashboardPage) return;

    const introducedUrl = 'Introduced.html';

    const hasTokenInLocalStorage = (() => {
      try {
        return !!localStorage.getItem('token');
      } catch {
        return false;
      }
    })();

    const hasTokenInCookie = (() => {
      try {
        return document.cookie.split(';').some((c) => c.trim().startsWith('token='));
      } catch {
        return false;
      }
    })();

    const isLoggedIn = hasTokenInLocalStorage || hasTokenInCookie;
    if (isLoggedIn) return;

    const header = document.querySelector('header.cabeçalho');
    const userIconLink = header?.querySelector('a.icon-button.user-link');
    if (userIconLink) {
      const loginBtn = document.createElement('button');
      loginBtn.type = 'button';
      loginBtn.className = 'icon-button user-link';
      loginBtn.textContent = 'Login';

      loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = introducedUrl;
      });

      userIconLink.replaceWith(loginBtn);
    }

    let redirected = false;
    function redirect() {
      if (redirected) return;
      redirected = true;
      window.location.href = introducedUrl;
    }

    function isLoginButton(el) {
      if (!el) return false;
      const btn = el.closest ? el.closest('button') : null;
      if (!btn) return false;
      return (btn.textContent || '').trim().toLowerCase() === 'login';
    }

    document.addEventListener(
      'click',
      (e) => {
        if (isLoginButton(e.target)) return;
        redirect();
      },
      { capture: true }
    );

    const events = ['change', 'submit', 'input', 'keydown', 'touchstart'];
    events.forEach((ev) => {
      document.addEventListener(ev, () => redirect(), { capture: true, passive: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', dashboardGatingIfLoggedOutSafe);
  } else {
    dashboardGatingIfLoggedOutSafe();
  }
})();
