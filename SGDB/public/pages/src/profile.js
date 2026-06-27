document.addEventListener('DOMContentLoaded', () => {
  const btnEditProfile = document.getElementById('btn-edit-profile');
  const profileName = document.getElementById('profile-name');
  const profileNickname = document.getElementById('profile-nickname');
  const sobreContent = document.getElementById('sobreContent');
  const wrapperCardSobre = document.querySelector('.about-card');

  const btnReadMore = document.createElement('button');
  btnReadMore.type = 'button';
  btnReadMore.className = 'read-more-button';
  btnReadMore.setAttribute('aria-expanded', 'false');
  btnReadMore.textContent = 'Ler mais';

  const modalHtml = `
    <div id="edit-profile-modal-overlay" class="settings-modal-overlay">
      <div class="settings-modal">
        <div class="settings-modal-header">
          <h2>Editar Perfil</h2>
          <button type="button" id="edit-profile-btn-close" class="settings-modal-close" aria-label="Fechar edição de perfil">×</button>
        </div>

        <div class="settings-modal-body">
          <div class="settings-group">
            <label for="edit-profile-name">Nome</label>
            <input type="text" id="edit-profile-name" class="settings-input" placeholder="Digite seu nome">
          </div>

          <div class="settings-group">
            <label for="edit-profile-nickname">Apelido</label>
            <input type="text" id="edit-profile-nickname" class="settings-input" placeholder="Digite seu apelido">
          </div>

          <div class="settings-group">
            <label for="edit-profile-about">Sobre mim</label>
            <textarea
              id="edit-profile-about"
              class="settings-input"
              rows="4"
              maxlength="500"
              placeholder="Digite sobre você..."></textarea>
          </div>

          <div class="settings-modal-footer">
            <button type="button" id="edit-profile-btn-save" class="settings-btn settings-btn-save">Salvar</button>
            <button type="button" id="edit-profile-btn-cancel" class="settings-btn settings-btn-cancel" >Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `.trim();

  let overlay = document.getElementById('edit-profile-modal-overlay');
  if (!overlay) {
    const container = document.createElement('div');
    container.innerHTML = modalHtml;
    document.body.appendChild(container.firstElementChild);
    overlay = document.getElementById('edit-profile-modal-overlay');
  }

  const inputName = document.getElementById('edit-profile-name');
  const inputNickname = document.getElementById('edit-profile-nickname');
  const textareaAbout = document.getElementById('edit-profile-about');
  const errorMsg = document.getElementById('edit-profile-error');

  const btnClose = document.getElementById('edit-profile-btn-close');
  const btnSave = document.getElementById('edit-profile-btn-save');
  const btnCancel = document.getElementById('edit-profile-btn-cancel');

  function handleReadMoreVisibility() {
    if (!sobreContent || !wrapperCardSobre) return;

    sobreContent.classList.remove('collapsed');
    const scrollHeight = sobreContent.scrollHeight;
    sobreContent.classList.add('collapsed');

    if (scrollHeight > 128) {
      if (!wrapperCardSobre.contains(btnReadMore)) wrapperCardSobre.appendChild(btnReadMore);
    } else {
      if (wrapperCardSobre.contains(btnReadMore)) wrapperCardSobre.removeChild(btnReadMore);
    }
  }

  function openEditProfile() {
    if (errorMsg) errorMsg.hidden = true;

    const nameText = profileName?.textContent || '';
    const nicknameText = profileNickname?.textContent || '';

    inputName.value = nameText === 'PLACEHOLDER' ? '' : nameText.trim();
    inputNickname.value = nicknameText === 'Crie um apelido.' ? '' : nicknameText.trim();
    textareaAbout.value = (sobreContent?.textContent || '').trim();

    overlay.classList.add('active');
  }

  function closeEditProfile() {
    overlay.classList.remove('active');
  }

  function saveProfileData() {
    const nameValue = inputName.value.trim();
    const nicknameValue = inputNickname.value.trim();
    const aboutValue = textareaAbout.value.trim();

    if (!nameValue || !nicknameValue) {
      if (errorMsg) errorMsg.hidden = false;
      return;
    }

    profileName.textContent = nameValue;
    profileNickname.textContent = nicknameValue;

    sobreContent.textContent = '';
    if (aboutValue) {
      const p = document.createElement('p');
      p.textContent = aboutValue;
      sobreContent.appendChild(p);
    }

    overlay.classList.remove('active');
    handleReadMoreVisibility();

    const globalToast = document.getElementById('success-toast');
    if (globalToast) {
      globalToast.textContent = 'Perfil atualizado com sucesso!';
      globalToast.hidden = false;
      setTimeout(() => globalToast.classList.add('visible'), 50);
      setTimeout(() => {
        globalToast.classList.remove('visible');
        setTimeout(() => (globalToast.hidden = true), 280);
      }, 3000);
    }
  }

  btnReadMore.addEventListener('click', () => {
    const isCollapsed = sobreContent.classList.toggle('collapsed');
    btnReadMore.setAttribute('aria-expanded', !isCollapsed);
    btnReadMore.textContent = isCollapsed ? 'Ler mais' : 'Ler menos';
  });

  if (btnEditProfile) btnEditProfile.addEventListener('click', openEditProfile);
  if (btnClose) btnClose.addEventListener('click', closeEditProfile);
  if (btnCancel) btnCancel.addEventListener('click', closeEditProfile);
  if (btnSave) btnSave.addEventListener('click', saveProfileData);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeEditProfile();
  });

  handleReadMoreVisibility();
});
