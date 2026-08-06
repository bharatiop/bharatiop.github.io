/**
 * Client-side password gate for course PDF downloads (GitHub Pages).
 * Real file URLs stay off the page until unlock. Note: this is not true
 * server auth — anyone who knows the path can still request files directly.
 *
 * To change the password:
 *   echo -n 'YOUR_PASSWORD' | sha256sum
 * then set COURSE_PROTECT_HASH below to that hex digest.
 */
(function () {
  'use strict';

  // SHA-256 of "PH5202" (course code — change via hash above)
  var COURSE_PROTECT_HASH =
    'd7f86c576f40200fc9bbeec822f9e571224b4a871cb37768331832e18c2da3b8';
  var STORAGE_KEY = 'nap_course_dl_unlocked_v1';

  function sha256Hex(str) {
    var enc = new TextEncoder().encode(str);
    return crypto.subtle.digest('SHA-256', enc).then(function (buf) {
      return Array.from(new Uint8Array(buf))
        .map(function (b) {
          return b.toString(16).padStart(2, '0');
        })
        .join('');
    });
  }

  function isUnlocked() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function setUnlocked() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (e) { /* private mode */ }
  }

  function enableProtectedLinks() {
    document.querySelectorAll('[data-protected-href]').forEach(function (el) {
      var url = el.getAttribute('data-protected-href');
      if (!url) return;
      el.setAttribute('href', url);
      el.removeAttribute('aria-disabled');
      el.classList.remove('course-dl-locked');
      el.classList.add('course-dl-unlocked');
      if (el.classList.contains('course-dl')) {
        el.textContent = 'PDF →';
      }
      var action = el.querySelector('.note-card-action');
      if (action) action.textContent = 'Download →';
    });
    document.querySelectorAll('.course-lock-banner').forEach(function (b) {
      b.hidden = true;
    });
    document.querySelectorAll('.course-lock-unlocked').forEach(function (b) {
      b.hidden = false;
    });
  }

  function lockProtectedLinks() {
    document.querySelectorAll('[data-protected-href]').forEach(function (el) {
      el.removeAttribute('href');
      el.setAttribute('aria-disabled', 'true');
      el.classList.add('course-dl-locked');
      el.classList.remove('course-dl-unlocked');
      if (el.classList.contains('course-dl')) {
        el.textContent = 'Unlock →';
      }
      var action = el.querySelector('.note-card-action');
      if (action) action.textContent = 'Password required →';
    });
  }

  function getModal() {
    return document.getElementById('course-password-modal');
  }

  function openModal(pendingEl) {
    var modal = getModal();
    if (!modal) return;
    modal.hidden = false;
    modal.dataset.pendingId = pendingEl && pendingEl.id ? pendingEl.id : '';
    document.body.classList.add('course-modal-open');
    var input = modal.querySelector('#course-password-input');
    var err = modal.querySelector('#course-password-error');
    if (err) {
      err.hidden = true;
      err.textContent = '';
    }
    if (input) {
      input.value = '';
      setTimeout(function () {
        input.focus();
      }, 50);
    }
  }

  function closeModal() {
    var modal = getModal();
    if (!modal) return;
    modal.hidden = true;
    modal.dataset.pendingId = '';
    document.body.classList.remove('course-modal-open');
  }

  function afterUnlock(pendingId) {
    enableProtectedLinks();
    closeModal();
    if (pendingId) {
      var el = document.getElementById(pendingId);
      if (el && el.getAttribute('href')) {
        window.open(el.getAttribute('href'), '_blank', 'noopener');
      }
    }
  }

  function submitPassword() {
    var modal = getModal();
    var input = modal && modal.querySelector('#course-password-input');
    var err = modal && modal.querySelector('#course-password-error');
    var pwd = input ? input.value : '';
    if (!pwd) {
      if (err) {
        err.textContent = 'Please enter the password.';
        err.hidden = false;
      }
      return;
    }
    sha256Hex(pwd).then(function (hash) {
      if (hash === COURSE_PROTECT_HASH) {
        setUnlocked();
        afterUnlock(modal.dataset.pendingId);
      } else {
        if (err) {
          err.textContent = 'Incorrect password. Ask your instructor for access.';
          err.hidden = false;
        }
        if (input) {
          input.select();
          input.focus();
        }
      }
    });
  }

  function onProtectedClick(e) {
    var el = e.currentTarget;
    if (isUnlocked() && el.getAttribute('href')) {
      return; // allow normal navigation
    }
    e.preventDefault();
    e.stopPropagation();
    openModal(el);
  }

  function init() {
    if (!document.querySelector('[data-protected-href]')) return;

    if (isUnlocked()) {
      enableProtectedLinks();
    } else {
      lockProtectedLinks();
    }

    document.querySelectorAll('[data-protected-href]').forEach(function (el, i) {
      if (!el.id) el.id = 'course-protected-' + i;
      el.addEventListener('click', onProtectedClick);
    });

    document.querySelectorAll('[data-course-unlock]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (isUnlocked()) {
          enableProtectedLinks();
          return;
        }
        openModal(null);
      });
    });

    var modal = getModal();
    if (!modal) return;

    var form = modal.querySelector('#course-password-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        submitPassword();
      });
    }

    modal.querySelectorAll('[data-course-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        closeModal();
      });
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
