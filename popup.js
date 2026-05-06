const categoryNav = document.getElementById('category-nav');
const hackList = document.getElementById('hack-list');
const searchInput = document.getElementById('search');
const toastEl = document.getElementById('toast');
const modalOverlay = document.getElementById('input-modal');
const modalTitle = document.getElementById('modal-title');
const modalInput = document.getElementById('modal-input');
const modalCancel = document.getElementById('modal-cancel');
const modalRun = document.getElementById('modal-run');

let activeCategory = null;
let pendingHack = null;

function buildNav() {
  var allBtn = document.createElement('button');
  allBtn.className = 'nav-item active';
  allBtn.dataset.category = '';
  var totalHacks = 0;
  HACKS.forEach(function(c) { totalHacks += c.hacks.length; });
  allBtn.innerHTML =
    '<span class="material-icons-round">apps</span>' +
    '<span>All</span>' +
    '<span class="nav-count">' + totalHacks + '</span>';
  allBtn.addEventListener('click', function() { setCategory(null); });
  categoryNav.appendChild(allBtn);

  HACKS.forEach(function(cat) {
    var btn = document.createElement('button');
    btn.className = 'nav-item';
    btn.dataset.category = cat.category;
    btn.innerHTML =
      '<span class="nav-dot" style="background:' + cat.color + '"></span>' +
      '<span>' + cat.category + '</span>' +
      '<span class="nav-count">' + cat.hacks.length + '</span>';
    btn.addEventListener('click', function() { setCategory(cat.category); });
    categoryNav.appendChild(btn);
  });
}

function setCategory(cat) {
  activeCategory = cat;
  categoryNav.querySelectorAll('.nav-item').forEach(function(btn) {
    var isCurrent = cat === null ? btn.dataset.category === '' : btn.dataset.category === cat;
    btn.classList.toggle('active', isCurrent);
  });
  render();
}

function render() {
  var query = searchInput.value.toLowerCase().trim();
  hackList.innerHTML = '';
  var totalShown = 0;

  HACKS.forEach(function(cat) {
    if (activeCategory && cat.category !== activeCategory) return;

    var filtered = cat.hacks.filter(function(h) {
      return !query ||
        h.name.toLowerCase().includes(query) ||
        h.description.toLowerCase().includes(query) ||
        cat.category.toLowerCase().includes(query);
    });

    if (filtered.length === 0) return;

    var section = document.createElement('div');
    section.className = 'category-section';

    var header = document.createElement('div');
    header.className = 'category-header';
    header.innerHTML =
      '<div class="category-dot" style="background:' + cat.color + '"></div>' +
      '<h2>' + cat.category + '</h2>' +
      '<span class="hack-count">' + filtered.length + '</span>';
    section.appendChild(header);

    filtered.forEach(function(hack, i) {
      var card = document.createElement('div');
      card.className = 'hack-card' + (hack.isLink ? ' link-card' : '');
      card.style.animationDelay = (i * 0.03) + 's';
      card.innerHTML =
        '<div class="hack-icon-wrap" style="background:' + cat.color + '">' +
          '<span class="material-icons-round">' + cat.icon + '</span>' +
        '</div>' +
        '<div class="hack-info">' +
          '<div class="hack-name">' + hack.name + '</div>' +
          '<div class="hack-desc">' + hack.description + '</div>' +
        '</div>' +
        '<div class="hack-action">' +
          '<span class="material-icons-round">' + (hack.isLink ? 'open_in_new' : 'play_arrow') + '</span>' +
        '</div>';
      card.addEventListener('click', function() { runHack(hack); });
      section.appendChild(card);
      totalShown++;
    });

    hackList.appendChild(section);
  });

  if (totalShown === 0) {
    hackList.innerHTML =
      '<div class="no-results">' +
        '<span class="material-icons-round">search_off</span>' +
        '<p>No hacks found</p>' +
      '</div>';
  }
}

function runHack(hack) {
  if (hack.isLink) {
    chrome.tabs.create({ url: hack.url });
    return;
  }

  if (hack.needsInput) {
    pendingHack = hack;
    modalTitle.textContent = hack.inputLabel;
    modalInput.value = hack.inputDefault || '';
    modalOverlay.classList.remove('hidden');
    modalInput.focus();
    modalInput.select();
    return;
  }

  executeHack(hack, null);
}

function executeHack(hack, input) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (!tabs[0]) {
      showToast('No active tab found', 'error');
      return;
    }

    var tab = tabs[0];
    var tabId = tab.id;

    if (hack.remoteUrl) {
      if (hack.hostMatch && !tab.url.includes(hack.hostMatch)) {
        showToast('Please navigate to ' + hack.hostMatch + ' first', 'error');
        return;
      }
      showToast('Loading ' + hack.name + '...', 'success');
      fetch(hack.remoteUrl)
        .then(function(r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.text();
        })
        .then(function(code) {
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: function(c) { eval(c); },
            args: [code],
            world: 'MAIN'
          }, function() {
            if (chrome.runtime.lastError) {
              showToast('Failed: ' + chrome.runtime.lastError.message, 'error');
            } else {
              showToast(hack.name + ' executed!', 'success');
            }
          });
        })
        .catch(function(err) {
          showToast('Download failed: ' + err.message, 'error');
        });
      return;
    }

    var scriptArgs = hack.needsInput ? [input] : [];

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: hack.func,
      args: scriptArgs,
      world: 'MAIN'
    }, function() {
      if (chrome.runtime.lastError) {
        showToast('Failed: ' + chrome.runtime.lastError.message, 'error');
      } else {
        showToast(hack.name + ' executed!', 'success');
      }
    });
  });
}

function showToast(msg, type) {
  toastEl.textContent = msg;
  toastEl.className = 'toast ' + type + ' show';
  setTimeout(function() { toastEl.classList.remove('show'); }, 2000);
}

modalCancel.addEventListener('click', function() {
  modalOverlay.classList.add('hidden');
  pendingHack = null;
});

modalRun.addEventListener('click', function() {
  if (pendingHack) {
    var val = modalInput.value;
    modalOverlay.classList.add('hidden');
    executeHack(pendingHack, val);
    pendingHack = null;
  }
});

modalInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') modalRun.click();
  if (e.key === 'Escape') modalCancel.click();
});

searchInput.addEventListener('input', render);

buildNav();
render();
