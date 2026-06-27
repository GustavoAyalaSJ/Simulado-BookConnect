document.addEventListener('DOMContentLoaded', () => {
    const btnNotification = document.getElementById('notification-button');
    const dropdownNotification = document.getElementById('notification-dropdown');

    if (btnNotification && dropdownNotification) {
        btnNotification.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = btnNotification.getAttribute('aria-expanded') === 'true';
            btnNotification.setAttribute('aria-expanded', !isExpanded);
            dropdownNotification.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!dropdownNotification.contains(e.target) && e.target !== btnNotification) {
                btnNotification.setAttribute('aria-expanded', 'false');
                dropdownNotification.classList.remove('active');
            }
        });
    }

    const btnConfig = document.getElementById('modal-config');

    let toast = document.getElementById('success-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'success-toast';
        toast.className = 'settings-success-toast';
        toast.hidden = true;
        document.body.appendChild(toast);
    }

    const pageTemplate = `
        <div id="settings-modal-overlay" class="settings-modal-overlay">
            <div class="settings-modal">
                <div class="settings-modal-header">
                    <h2>Configurações:</h2>
                    <button type="button" id="settings-btn-close" class="settings-modal-close">×</button>
                </div>
                <div class="settings-modal-body">
                    <div class="settings-group">
                        <label>Tema</label>
                        <button type="button" id="settings-theme-toggle" class="settings-theme-toggle">
                            <i class="bi bi-brightness-high-fill"></i><span class="theme-text">Claro</span>
                        </button>
                    </div>
                    <div class="settings-group">
                        <label for="settings-font-size">Tamanho da fonte:</label>
                        <div class="settings-slider-wrapper">
                            <input type="range" id="settings-font-size" class="settings-slider" min="12" max="24" value="16">
                            <span class="settings-slider-value" id="settings-font-value">16px</span>
                        </div>
                    </div>
                    <div class="settings-modal-footer">
                        <button type="button" id="settings-btn-save" class="settings-btn settings-btn-save">Salvar</button>
                        <button type="button" id="settings-btn-cancel" class="settings-btn settings-btn-cancel">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    `.trim();

    let overlay = document.getElementById('settings-modal-overlay');
    if (!overlay) {
        const container = document.createElement('div');
        container.innerHTML = pageTemplate;
        document.body.appendChild(container.firstElementChild);
        overlay = document.getElementById('settings-modal-overlay');
    }

    const btnClose = document.getElementById('settings-btn-close');
    const btnSave = document.getElementById('settings-btn-save');
    const btnCancel = document.getElementById('settings-btn-cancel');
    const btnThemeToggle = document.getElementById('settings-theme-toggle');
    const inputFont = document.getElementById('settings-font-size');
    const spanFontValue = document.getElementById('settings-font-value');
    const themeTextSpan = btnThemeToggle ? btnThemeToggle.querySelector('.theme-text') : null;

    let tempDarkTheme = document.body.classList.contains('dark-theme');
    let tempFontSize = localStorage.getItem('bookconnect-fontsize') || '16';

    if (localStorage.getItem('bookconnect-theme') === 'dark') {
        document.body.classList.add('dark-theme');
        tempDarkTheme = true;
        updateThemeUI(true);
    }

    document.documentElement.style.setProperty('--font-size', tempFontSize + 'px');

    if (inputFont) inputFont.value = tempFontSize;
    if (spanFontValue) spanFontValue.textContent = tempFontSize + 'px';

    function updateThemeUI(isDark) {
        if (!btnThemeToggle || !themeTextSpan) return;
        const iconEl = btnThemeToggle.querySelector('i');

        if (iconEl) {
            if (isDark) {
                iconEl.classList.remove('bi-brightness-high-fill');
                iconEl.classList.add('bi-moon-stars-fill');
            } else {
                iconEl.classList.remove('bi-moon-stars-fill');
                iconEl.classList.add('bi-brightness-high-fill');
            }
        }

        themeTextSpan.textContent = isDark ? 'Escuro' : 'Claro';
    }

    function openSettings() {
        tempDarkTheme = document.body.classList.contains('dark-theme');
        tempFontSize = inputFont ? inputFont.value : '16';
        if (overlay) overlay.classList.add('active');
    }

    function closeSettings() {
        if (document.body.classList.contains('dark-theme') !== tempDarkTheme) {
            document.body.classList.toggle('dark-theme');
        }
        document.documentElement.style.setProperty('--font-size', tempFontSize + 'px');
        updateThemeUI(tempDarkTheme);

        if (inputFont && spanFontValue) {
            inputFont.value = tempFontSize;
            spanFontValue.textContent = tempFontSize + 'px';
        }
        if (overlay) overlay.classList.remove('active');
    }

    function showToast(message) {
        toast.textContent = message;
        toast.hidden = false;
        setTimeout(() => toast.classList.add('visible'), 50);
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => (toast.hidden = true), 280);
        }, 3000);
    }

    function saveSettings() {
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('bookconnect-theme', isDark ? 'dark' : 'light');
        if (inputFont) localStorage.setItem('bookconnect-fontsize', inputFont.value);
        if (overlay) overlay.classList.remove('active');
        showToast('Configurações salvas com sucesso!');
    }

    if (btnConfig) btnConfig.addEventListener('click', openSettings);
    if (btnClose) btnClose.addEventListener('click', closeSettings);
    if (btnCancel) btnCancel.addEventListener('click', closeSettings);
    if (btnSave) btnSave.addEventListener('click', saveSettings);

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeSettings();
        });
    }

    if (btnThemeToggle) {
        btnThemeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            updateThemeUI(isDark);
        });
    }

    if (inputFont) {
        inputFont.addEventListener('input', (e) => {
            const value = e.target.value;
            if (spanFontValue) spanFontValue.textContent = value + 'px';
            document.documentElement.style.setProperty('--font-size', value + 'px');
        });
    }
});