function hack_quizizz_setPoints(input) {
  const pts = parseInt(input) - 5000;
  const originalFetch = window.fetch;
  window.fetch = function(url, opts) {
    if (opts && opts.body &&
        (url === "https://game.quizizz.com/play-api/v4/soloProceed" ||
         url === "https://game.quizizz.com/play-api/v4/proceedGame")) {
      try {
        var body = JSON.parse(opts.body);
        body.response.provisional.scores = { correct: pts + 5000, incorrect: pts + 5000 };
        body.response.provisional.scoreBreakups = {
          correct: { base: 5000, timer: 5000, streak: 5000, powerups: [], total: pts + 5000 },
          incorrect: { base: 5000, timer: 5000, streak: 5000, powerups: [], total: pts + 5000 }
        };
        opts.body = JSON.stringify(body);
      } catch(e) {}
    }
    return originalFetch(url, opts);
  };
}

function hack_quizizz_flood() {
  fetch("https://raw.githubusercontent.com/seanv999/quizizz-flooder/main/flood.js")
    .then(function(res) { return res.text(); })
    .then(function(t) { eval(t); });
}

function hack_quizlet_unblur() {
  document.querySelectorAll('.paywalled-section .b1xkd811')
    .forEach(function(c) { c.style.filter = 'none'; });
  document.querySelectorAll('.paywalled-section .pfdaoy0')
    .forEach(function(c) { c.parentElement.removeChild(c); });
  var lw = document.querySelector('.LoginWall');
  if (lw) lw.style.display = 'none';
  document.querySelectorAll('.paywalled-section .hnqbbas')
    .forEach(function(c) { c.style.overflow = 'visible'; c.style.maxHeight = 'unset'; });
}

function hack_edpuzzle_autoAnswer() {
  var host = window.location.hostname;
  if (host === "edpuzzle.com") {
    var r = new XMLHttpRequest();
    r.open("GET", "https://cdn.jsdelivr.net/gh/ading2210/edpuzzle-answers@latest/script.js", true);
    r.addEventListener("load", function() { eval(this.responseText); });
    r.send();
  } else {
    alert("Please run this on an Edpuzzle assignment (edpuzzle.com).");
  }
}

function hack_doodle_baseball(input) {
  localStorage.setItem("doodle-july4th19-score", input);
  alert("High score set! Page will reload.");
  location.reload();
}

function hack_doodle_gnomes(input) {
  localStorage.setItem("doodle-gnomes-high-score", input);
  alert("High score set! Page will reload.");
  location.reload();
}

function hack_fun_blur() {
  document.body.style.filter = 'blur(5px)';
}

function hack_fun_unblur() {
  document.body.style.filter = 'none';
}

function hack_fun_edit() {
  document.body.contentEditable = 'true';
  document.designMode = 'on';
}

function hack_fun_stopEdit() {
  document.body.contentEditable = 'false';
  document.designMode = 'off';
}

function hack_fun_renameTab(input) {
  document.title = input;
}

function hack_fun_showPasswords() {
  var fields = document.querySelectorAll('input[type="password"]');
  fields.forEach(function(el) { el.type = 'text'; });
}

function hack_school_disguise() {
  function gcloak() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_5.ico';
    document.title = 'My Drive - Google Drive';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  gcloak();
  setInterval(gcloak, 1000);
}

function hack_school_historyFlood(input) {
  var num = parseInt(input);
  var url = window.location.href;
  for (var i = 1; i <= num; i++) {
    history.pushState(0, 0, i === num ? url : i.toString());
  }
  alert("History flooding successful! " + url + " now appears " + num + " time" + (num === 1 ? "" : "s") + " in your history.");
}

function hack_fun_showIframeUrls() {
  if (window._polloraIframeObserver) {
    window._polloraIframeObserver.disconnect();
    window._polloraIframeObserver = null;
    document.querySelectorAll('.pollora-iframe-url-box').forEach(function(el) {
      if (el._polloraCleanup) el._polloraCleanup();
      el.remove();
    });
    var animSheet = document.getElementById('pollora-iframe-animations');
    if (animSheet) animSheet.remove();
    document.querySelectorAll('iframe[data-pollora-tagged]').forEach(function(f) {
      delete f.dataset.polloraTagged;
    });
    alert('Iframe URL watcher stopped.');
    return;
  }

  if (!document.getElementById('pollora-iframe-animations')) {
    var animStyle = document.createElement('style');
    animStyle.id = 'pollora-iframe-animations';
    animStyle.textContent =
      '@keyframes pollora-flash{' +
        '0%{background:#1a1a24;border-color:#7c5cfc}' +
        '30%{background:#1a3a2a;border-color:#51cf66}' +
        '100%{background:#1a1a24;border-color:#7c5cfc}' +
      '}' +
      '@keyframes pollora-badge-pop{' +
        '0%{opacity:0;transform:translateY(0) scale(0.5)}' +
        '20%{opacity:1;transform:translateY(-8px) scale(1.1)}' +
        '40%{transform:translateY(-12px) scale(1)}' +
        '100%{opacity:0;transform:translateY(-28px) scale(0.8)}' +
      '}' +
      '.pollora-iframe-url-box{transition:background 0.3s,border-color 0.3s,box-shadow 0.3s}' +
      '.pollora-copy-badge{' +
        'position:absolute;top:-4px;right:12px;' +
        'background:#51cf66;color:#0f0f14;' +
        'font-size:11px;font-weight:700;font-family:sans-serif;font-style:normal;' +
        'padding:3px 10px;border-radius:12px;' +
        'pointer-events:none;white-space:nowrap;' +
        'animation:pollora-badge-pop 0.9s ease forwards;' +
        'box-shadow:0 2px 10px rgba(81,207,102,0.5);' +
      '}';
    document.head.appendChild(animStyle);
  }

  function positionBox(box, iframe) {
    var rect = iframe.getBoundingClientRect();
    box.style.top = (window.scrollY + rect.top) + 'px';
    box.style.left = (window.scrollX + rect.left) + 'px';
    box.style.width = Math.max(rect.width, 200) + 'px';
  }

  function attachUrlBox(iframe) {
    if (iframe.dataset.polloraTagged) return;
    iframe.dataset.polloraTagged = '1';

    var url = iframe.src || iframe.getAttribute('src') || '(no src)';

    var box = document.createElement('div');
    box.className = 'pollora-iframe-url-box';
    box.style.cssText =
      'display:flex;align-items:center;gap:8px;padding:4px 10px;' +
      'background:rgba(26,26,36,0.92);border:1px solid #7c5cfc;' +
      'border-radius:6px;font-family:monospace;font-size:11px;' +
      'color:#e8e8f0;cursor:pointer;box-sizing:border-box;' +
      'z-index:999999;position:absolute;overflow:visible;' +
      'pointer-events:auto;backdrop-filter:blur(6px);' +
      'max-height:28px;line-height:18px;';

    var label = document.createElement('span');
    label.textContent = 'src: ';
    label.style.cssText = 'color:#7c5cfc;font-weight:bold;white-space:nowrap;flex-shrink:0;';

    var urlText = document.createElement('span');
    urlText.textContent = url;
    urlText.style.cssText =
      'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;';
    urlText.title = url;

    var copyHint = document.createElement('span');
    copyHint.textContent = 'copy';
    copyHint.style.cssText =
      'color:#8888a0;font-size:10px;white-space:nowrap;font-style:italic;' +
      'transition:color 0.2s;flex-shrink:0;';

    box.appendChild(label);
    box.appendChild(urlText);
    box.appendChild(copyHint);

    box.addEventListener('click', function(e) {
      e.stopPropagation();
      navigator.clipboard.writeText(url).then(function() {
        copyHint.textContent = 'copied!';
        copyHint.style.color = '#51cf66';
        box.style.animation = 'none';
        void box.offsetWidth;
        box.style.animation = 'pollora-flash 0.6s ease';
        box.style.boxShadow = '0 0 12px rgba(81,207,102,0.4)';
        var badge = document.createElement('span');
        badge.className = 'pollora-copy-badge';
        badge.textContent = 'Copied!';
        box.appendChild(badge);
        setTimeout(function() {
          copyHint.textContent = 'copy';
          copyHint.style.color = '#8888a0';
          box.style.boxShadow = 'none';
          box.style.animation = '';
          if (badge.parentNode) badge.remove();
        }, 1200);
      });
    });

    document.body.appendChild(box);
    positionBox(box, iframe);

    var reposition = function() { positionBox(box, iframe); };
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    box._polloraCleanup = function() {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };

    new MutationObserver(function() {
      var newUrl = iframe.src || iframe.getAttribute('src') || '(no src)';
      if (newUrl !== url) {
        url = newUrl;
        urlText.textContent = url;
        urlText.title = url;
      }
    }).observe(iframe, { attributes: true, attributeFilter: ['src'] });
  }

  document.querySelectorAll('iframe').forEach(attachUrlBox);

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(node) {
        if (node.nodeName === 'IFRAME') {
          attachUrlBox(node);
        }
        if (node.querySelectorAll) {
          node.querySelectorAll('iframe').forEach(attachUrlBox);
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window._polloraIframeObserver = observer;

  var count = document.querySelectorAll('iframe').length;
  alert('Iframe URL watcher active! Tracking ' + count + ' iframe' +
    (count === 1 ? '' : 's') + '. New iframes will be tagged automatically.\nRun again to stop.');
}

function hack_fun_wordCount() {
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  var total = 0;
  while (walker.nextNode()) {
    var el = walker.currentNode.parentElement;
    if (el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length)) {
      var text = walker.currentNode.textContent.trim();
      if (text.length > 0) {
        total += text.split(/\s+/).length;
      }
    }
  }
  alert('Visible word count: ' + total.toLocaleString());
}

function hack_fun_highlightLinks() {
  var style = document.getElementById('pollora-highlight-links');
  if (style) { style.remove(); return; }
  style = document.createElement('style');
  style.id = 'pollora-highlight-links';
  style.textContent =
    'a { outline: 2px solid #7c5cfc !important; outline-offset: 2px !important; ' +
    'border-radius: 3px !important; ' +
    'box-shadow: 0 0 8px rgba(124, 92, 252, 0.5) !important; ' +
    'transition: outline-color 0.2s, box-shadow 0.2s !important; } ' +
    'a:hover { outline-color: #51cf66 !important; ' +
    'box-shadow: 0 0 12px rgba(81, 207, 102, 0.6) !important; }';
  document.head.appendChild(style);
}

function hack_fun_darkMode() {
  var style = document.getElementById('pollora-dark-mode');
  if (style) { style.remove(); return; }
  style = document.createElement('style');
  style.id = 'pollora-dark-mode';
  style.textContent =
    'html { filter: invert(0.9) hue-rotate(180deg) !important; } ' +
    'img, video, canvas, picture, svg, [style*="background-image"] ' +
    '{ filter: invert(1) hue-rotate(180deg) !important; }';
  document.head.appendChild(style);
}

function hack_fun_screenshot() {
  function capture() {
    html2canvas(document.body, { useCORS: true, scale: window.devicePixelRatio || 1 })
      .then(function(canvas) {
        canvas.toBlob(function(blob) {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]).then(function() {
            alert('Screenshot copied to clipboard!');
          }).catch(function() {
            var a = document.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = 'screenshot.png';
            a.click();
            alert('Clipboard not available — screenshot downloaded instead.');
          });
        });
      });
  }
  if (typeof html2canvas === 'function') {
    capture();
  } else {
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s.onload = capture;
    document.head.appendChild(s);
  }
}

/* ── Website / Proxy Tools ── */

function hack_web_enableRightClick() {
  document.oncontextmenu = null;
  document.onselectstart = null;
  document.ondragstart = null;
  document.onmousedown = null;
  document.body.oncontextmenu = null;
  document.body.onselectstart = null;
  var all = document.querySelectorAll('*');
  all.forEach(function(el) {
    el.oncontextmenu = null;
    el.onselectstart = null;
    el.style.userSelect = 'auto';
    el.style.webkitUserSelect = 'auto';
  });
  var s = document.createElement('style');
  s.textContent = '* { user-select: auto !important; -webkit-user-select: auto !important; }';
  document.head.appendChild(s);
  document.addEventListener('contextmenu', function(e) { e.stopPropagation(); }, true);
  alert('Right-click and text selection re-enabled!');
}

function hack_web_removeOverlays() {
  var removed = 0;
  document.querySelectorAll('*').forEach(function(el) {
    var style = window.getComputedStyle(el);
    if ((style.position === 'fixed' || style.position === 'sticky') &&
        parseFloat(style.zIndex) > 100 &&
        el.tagName !== 'HEADER' && el.tagName !== 'NAV') {
      el.remove();
      removed++;
    }
  });
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
  document.querySelectorAll('.modal, .overlay, .popup, [class*="paywall"], [class*="cookie"], [class*="consent"], [class*="adblock"]').forEach(function(el) {
    el.remove();
    removed++;
  });
  alert('Removed ' + removed + ' overlay(s). Scroll restored.');
}

function hack_web_bypassPaywall() {
  document.querySelectorAll('[class*="paywall"], [class*="subscribe"], [class*="premium-wall"], [id*="paywall"], [class*="gate"]').forEach(function(el) {
    el.remove();
  });
  document.querySelectorAll('*').forEach(function(el) {
    var s = window.getComputedStyle(el);
    if (s.overflow === 'hidden' && el !== document.body && el !== document.documentElement) {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }
  });
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
  document.querySelectorAll('[style*="blur"]').forEach(function(el) {
    el.style.filter = 'none';
  });
  alert('Paywall elements removed. Content should be visible now.');
}

/* ── Iframe / Embed Tools ── */

function hack_iframe_extractAll() {
  var iframes = document.querySelectorAll('iframe');
  if (iframes.length === 0) { alert('No iframes found on this page.'); return; }
  var urls = [];
  iframes.forEach(function(f, i) {
    urls.push((i + 1) + '. ' + (f.src || f.getAttribute('src') || '(no src)'));
  });
  var text = urls.join('\n');
  navigator.clipboard.writeText(text).then(function() {
    alert('Found ' + iframes.length + ' iframe(s). URLs copied to clipboard!\n\n' + text);
  }).catch(function() {
    alert('Found ' + iframes.length + ' iframe(s):\n\n' + text);
  });
}

function hack_iframe_fullscreen() {
  var iframes = document.querySelectorAll('iframe');
  if (iframes.length === 0) { alert('No iframes found.'); return; }
  if (iframes.length === 1) {
    iframes[0].requestFullscreen();
    return;
  }
  var style = document.createElement('style');
  style.id = 'pollora-fs-picker';
  style.textContent = 'iframe { outline: 4px solid #7c5cfc !important; cursor: crosshair !important; }';
  document.head.appendChild(style);
  alert('Click any iframe to make it fullscreen.');
  iframes.forEach(function(f) {
    f.addEventListener('click', function handler() {
      f.requestFullscreen();
      var s = document.getElementById('pollora-fs-picker');
      if (s) s.remove();
      iframes.forEach(function(ff) { ff.removeEventListener('click', handler); });
    }, { once: true });
  });
}

function hack_iframe_openInTab() {
  var iframes = document.querySelectorAll('iframe');
  if (iframes.length === 0) { alert('No iframes found.'); return; }
  var opened = 0;
  iframes.forEach(function(f) {
    var src = f.src || f.getAttribute('src');
    if (src && src !== 'about:blank') {
      window.open(src, '_blank');
      opened++;
    }
  });
  if (opened === 0) alert('No iframes with valid URLs found.');
}

function hack_iframe_inject(input) {
  var iframes = document.querySelectorAll('iframe');
  if (iframes.length === 0) {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;background:#0f0f14;';
    var newIframe = document.createElement('iframe');
    newIframe.src = input;
    newIframe.style.cssText = 'width:100%;height:100%;border:none;';
    newIframe.setAttribute('allowfullscreen', '');
    newIframe.setAttribute('allow', 'autoplay; fullscreen');
    overlay.appendChild(newIframe);
    document.body.appendChild(overlay);
    return;
  }

  var pickerStyle = document.createElement('style');
  pickerStyle.id = 'pollora-inject-picker';
  pickerStyle.textContent =
    '.pollora-inject-highlight { outline: 4px solid #7c5cfc !important; ' +
    'outline-offset: -2px !important; cursor: crosshair !important; ' +
    'box-shadow: inset 0 0 0 9999px rgba(124,92,252,0.1) !important; }' +
    '#pollora-inject-banner { position: fixed; top: 12px; left: 50%; transform: translateX(-50%); ' +
    'z-index: 999999; background: #1a1a24; border: 1px solid #7c5cfc; border-radius: 10px; ' +
    'padding: 10px 20px; font-family: sans-serif; font-size: 13px; color: #e8e8f0; ' +
    'box-shadow: 0 4px 20px rgba(0,0,0,0.5); text-align: center; }' +
    '#pollora-inject-banner span { color: #7c5cfc; font-weight: bold; }' +
    '#pollora-inject-banner small { display: block; color: #8888a0; margin-top: 4px; font-size: 11px; }';
  document.head.appendChild(pickerStyle);

  var banner = document.createElement('div');
  banner.id = 'pollora-inject-banner';
  banner.innerHTML = '<span>Click an iframe</span> to replace its content<small>Press Escape to cancel</small>';
  document.body.appendChild(banner);

  function cleanup() {
    iframes.forEach(function(f) {
      f.classList.remove('pollora-inject-highlight');
      f.removeEventListener('mouseenter', onEnter);
      f.removeEventListener('mouseleave', onLeave);
      f.removeEventListener('click', onClick);
    });
    document.removeEventListener('keydown', onKey);
    var s = document.getElementById('pollora-inject-picker');
    if (s) s.remove();
    if (banner.parentNode) banner.remove();
  }

  function onEnter() { this.classList.add('pollora-inject-highlight'); }
  function onLeave() { this.classList.remove('pollora-inject-highlight'); }
  function onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.src = input;
    cleanup();
  }
  function onKey(e) {
    if (e.key === 'Escape') cleanup();
  }

  iframes.forEach(function(f) {
    f.addEventListener('mouseenter', onEnter);
    f.addEventListener('mouseleave', onLeave);
    f.addEventListener('click', onClick);
  });
  document.addEventListener('keydown', onKey);
}

/* ── Unblocked Games Tools ── */

function hack_games_extractGameUrl() {
  var iframes = document.querySelectorAll('iframe');
  var gameUrls = [];
  iframes.forEach(function(f) {
    var src = f.src || '';
    if (src && src !== 'about:blank' && !src.includes('ads') && !src.includes('analytics')) {
      gameUrls.push(src);
    }
  });
  var canvasGames = document.querySelectorAll('canvas');
  var embedGames = document.querySelectorAll('embed, object');
  var result = 'Game Detection Results:\n\n';
  if (gameUrls.length) result += 'Iframe games:\n' + gameUrls.join('\n') + '\n\n';
  if (canvasGames.length) result += 'Canvas games found: ' + canvasGames.length + '\n';
  if (embedGames.length) result += 'Embed/Object games found: ' + embedGames.length + '\n';
  if (!gameUrls.length && !canvasGames.length && !embedGames.length) {
    result += 'No game elements detected.';
  } else if (gameUrls.length) {
    navigator.clipboard.writeText(gameUrls[0]);
    result += '\nFirst game URL copied to clipboard!';
  }
  alert(result);
}

function hack_games_removeAds() {
  var removed = 0;
  var adSelectors = [
    'iframe[src*="ads"]', 'iframe[src*="doubleclick"]', 'iframe[src*="googlesyndication"]',
    'iframe[src*="adserver"]', 'iframe[src*="banner"]',
    '[class*="ad-"]', '[class*="ad_"]', '[class*="ads-"]', '[class*="ads_"]',
    '[class*="adsbygoogle"]', '[id*="ad-"]', '[id*="ad_"]',
    '[class*="sponsor"]', '[class*="banner"]',
    'ins.adsbygoogle', '.ad-container', '.ad-wrapper', '#ad-container',
    '[data-ad]', '[data-ads]'
  ];
  adSelectors.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(el) {
      el.remove();
      removed++;
    });
  });
  alert('Removed ' + removed + ' ad element(s).');
}

function hack_games_forceFullscreen() {
  var targets = document.querySelectorAll('canvas, iframe, embed, object, [class*="game"]');
  var el = targets[0];
  if (!el) { alert('No game element found.'); return; }
  var style = document.createElement('style');
  style.id = 'pollora-force-fs';
  style.textContent =
    'body > *:not(#pollora-fs-container) { display: none !important; }' +
    '#pollora-fs-container { position: fixed !important; inset: 0 !important; z-index: 999999 !important; background: #000 !important; }' +
    '#pollora-fs-container > * { width: 100% !important; height: 100% !important; display: block !important; }';
  document.head.appendChild(style);
  var container = document.createElement('div');
  container.id = 'pollora-fs-container';
  container.appendChild(el.cloneNode(true));
  document.body.appendChild(container);
}

function hack_games_freezeTimers() {
  if (window._polloraTimersFrozen) {
    window.setInterval = window._polloraOrigSetInterval;
    window.setTimeout = window._polloraOrigSetTimeout;
    window._polloraTimersFrozen = false;
    alert('Timers unfrozen.');
    return;
  }
  window._polloraOrigSetInterval = window.setInterval;
  window._polloraOrigSetTimeout = window.setTimeout;
  var blocked = 0;
  window.setInterval = function(fn, delay) {
    if (delay && delay < 5000) {
      blocked++;
      return 0;
    }
    return window._polloraOrigSetInterval(fn, delay);
  };
  window.setTimeout = function(fn, delay) {
    if (delay && delay < 5000) {
      blocked++;
      return 0;
    }
    return window._polloraOrigSetTimeout(fn, delay);
  };
  window._polloraTimersFrozen = true;
  alert('Short timers frozen (<5s). Run again to unfreeze.');
}

function hack_games_autoClicker(input) {
  if (window._polloraAutoClicker) {
    clearInterval(window._polloraAutoClicker);
    window._polloraAutoClicker = null;
    alert('Auto clicker stopped.');
    return;
  }
  var interval = parseInt(input) || 100;
  alert('Click on the element you want to auto-click. You have 3 seconds...');
  setTimeout(function() {
    var target = document.activeElement || document.elementFromPoint(
      window.innerWidth / 2, window.innerHeight / 2
    );
    window._polloraAutoClicker = setInterval(function() {
      target.click();
      target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      target.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    }, interval);
    alert('Auto clicking every ' + interval + 'ms. Run again to stop.');
  }, 3000);
}

function hack_games_speedHack(input) {
  var speed = parseFloat(input) || 2;
  if (window._polloraSpeedHack) {
    window.requestAnimationFrame = window._polloraOrigRAF;
    window._polloraSpeedHack = false;
    alert('Speed hack removed. Normal speed restored.');
    return;
  }
  window._polloraOrigRAF = window.requestAnimationFrame;
  var lastTime = 0;
  window.requestAnimationFrame = function(callback) {
    return window._polloraOrigRAF(function(timestamp) {
      if (!lastTime) lastTime = timestamp;
      var elapsed = timestamp - lastTime;
      var fakeTime = lastTime + elapsed * speed;
      lastTime = timestamp;
      callback(fakeTime);
    });
  };
  window._polloraSpeedHack = true;
  alert('Speed set to ' + speed + 'x. Run again to restore normal speed.');
}

/* ── Utility Tools ── */

function hack_util_qrCode() {
  var url = window.location.href;
  var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(url);
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,0.8);' +
    'display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;';
  var img = document.createElement('img');
  img.src = qrUrl;
  img.style.cssText = 'border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.5);';
  var label = document.createElement('p');
  label.textContent = 'QR code for this page — click anywhere to close';
  label.style.cssText = 'color:#fff;font-family:sans-serif;font-size:14px;margin-top:16px;';
  overlay.appendChild(img);
  overlay.appendChild(label);
  overlay.addEventListener('click', function() { overlay.remove(); });
  document.body.appendChild(overlay);
}

function hack_util_copySource() {
  var html = document.documentElement.outerHTML;
  navigator.clipboard.writeText(html).then(function() {
    alert('Full page source copied to clipboard! (' + html.length.toLocaleString() + ' characters)');
  }).catch(function() {
    alert('Failed to copy. Source length: ' + html.length.toLocaleString() + ' chars.');
  });
}

function hack_util_listResources() {
  var resources = performance.getEntriesByType('resource');
  var byType = {};
  resources.forEach(function(r) {
    var ext = r.name.split('?')[0].split('.').pop().toLowerCase();
    var type = 'other';
    if (['js'].includes(ext)) type = 'JavaScript';
    else if (['css'].includes(ext)) type = 'CSS';
    else if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico'].includes(ext)) type = 'Images';
    else if (['woff', 'woff2', 'ttf', 'otf', 'eot'].includes(ext)) type = 'Fonts';
    else if (['mp4', 'webm', 'ogg', 'mp3', 'wav'].includes(ext)) type = 'Media';
    if (!byType[type]) byType[type] = [];
    byType[type].push(r.name);
  });
  var text = 'Page Resources (' + resources.length + ' total):\n\n';
  Object.keys(byType).sort().forEach(function(type) {
    text += '── ' + type + ' (' + byType[type].length + ') ──\n';
    byType[type].forEach(function(url) { text += '  ' + url + '\n'; });
    text += '\n';
  });
  navigator.clipboard.writeText(text).then(function() {
    alert('Resource list copied to clipboard!\n\n' + resources.length + ' resources found.');
  });
}

function hack_util_cookieViewer() {
  var cookies = document.cookie;
  if (!cookies) { alert('No cookies found for this site.'); return; }
  var parsed = cookies.split(';').map(function(c) { return c.trim(); });
  var text = 'Cookies for ' + window.location.hostname + ':\n\n';
  parsed.forEach(function(c, i) {
    text += (i + 1) + '. ' + c + '\n';
  });
  navigator.clipboard.writeText(text).then(function() {
    alert(text + '\nCopied to clipboard!');
  }).catch(function() {
    alert(text);
  });
}

const HACKS = [
  {
    category: "Quizizz",
    icon: "quiz",
    color: "#8854d0",
    hacks: [
      {
        name: "Set Points",
        description: "Set custom points per question (max 7000)",
        needsInput: true,
        inputLabel: "Points per question (max 7000):",
        inputDefault: "7000",
        func: hack_quizizz_setPoints
      },
      {
        name: "Flood Game",
        description: "Flood the Quizizz game lobby with bots",
        func: hack_quizizz_flood
      }
    ]
  },
  {
    category: "Quizlet",
    icon: "school",
    color: "#3867d6",
    hacks: [
      {
        name: "Unblur Solutions",
        description: "Remove paywall blur on Quizlet solutions",
        func: hack_quizlet_unblur
      }
    ]
  },
  {
    category: "Edpuzzle",
    icon: "movie",
    color: "#e84393",
    hacks: [
      {
        name: "Auto Answer",
        description: "Automatically answer Edpuzzle questions (must be on edpuzzle.com)",
        func: hack_edpuzzle_autoAnswer
      }
    ]
  },
  {
    category: "Google Doodles",
    icon: "sports_baseball",
    color: "#f7b731",
    hacks: [
      {
        name: "Baseball - Set High Score",
        description: "Set your Doodle Baseball high score to any value",
        needsInput: true,
        inputLabel: "Enter high score:",
        inputDefault: "999999",
        func: hack_doodle_baseball
      },
      {
        name: "Garden Gnomes - Set High Score",
        description: "Set your Garden Gnomes high score to any value",
        needsInput: true,
        inputLabel: "Enter high score:",
        inputDefault: "999999",
        func: hack_doodle_gnomes
      }
    ]
  },
  {
    category: "Blooket",
    icon: "extension",
    color: "#20bf6b",
    hacks: [
      {
        name: "Anti-Ban Script",
        description: "Load the Blooket anti-ban script from GitHub",
        isLink: true,
        url: "https://github.com/hackthegamezjj/Blooket-Hacks/blob/main/Default%20Scripts/Anti%20Ban"
      },
      {
        name: "School Cheats",
        description: "Open the School Cheats Blooket page",
        isLink: true,
        url: "https://schoolcheats.net/blooket"
      },
      {
        name: "Blooket Wiki",
        description: "Open the Blooket Wiki for game info and strategies",
        isLink: true,
        url: "https://blooket.fandom.com/wiki/Blooket_Wiki"
      }
    ]
  },
  {
    category: "Gimkit",
    icon: "videogame_asset",
    color: "#4ecdc4",
    hacks: [
      {
        name: "Free Premium",
        description: "Unlock Gimkit premium features for free",
        remoteUrl: "https://raw.githubusercontent.com/rxzyx/GimKit-Hacks/main/Default%20Scripts/Free%20Premium.js",
        hostMatch: "gimkit.com"
      },
      {
        name: "Show Correct Answers",
        description: "Hide wrong answers and reveal the correct ones",
        remoteUrl: "https://raw.githubusercontent.com/rxzyx/GimKit-Hacks/main/Default%20Scripts/Show%20Correct%20Answers.js",
        hostMatch: "gimkit.com"
      },
      {
        name: "Answer Bot",
        description: "Automatically answer questions for you",
        remoteUrl: "https://raw.githubusercontent.com/rxzyx/GimKit-Hacks/main/Default%20Scripts/Answer%20Bot.js",
        hostMatch: "gimkit.com"
      },
      {
        name: "Show Imposters (Trust No One)",
        description: "Reveal who the imposters are in Trust No One mode",
        remoteUrl: "https://raw.githubusercontent.com/rxzyx/GimKit-Hacks/main/Trust%20No-One/Show%20Imposters.js",
        hostMatch: "gimkit.com"
      },
      {
        name: "Get Cash (Classic)",
        description: "Set your cash to any amount in Classic mode",
        remoteUrl: "https://raw.githubusercontent.com/rxzyx/GimKit-Hacks/main/Classic/Get%20Cash.js",
        hostMatch: "gimkit.com"
      },
      {
        name: "GimKit Hacks Repo",
        description: "Open the full GimKit Hacks GitHub repository",
        isLink: true,
        url: "https://github.com/rxzyx/GimKit-Hacks"
      }
    ]
  },
  {
    category: "Web Tools",
    icon: "public",
    color: "#e17055",
    hacks: [
      {
        name: "Enable Right-Click",
        description: "Re-enable right-click and text selection on pages that block it",
        func: hack_web_enableRightClick
      },
      {
        name: "Remove Overlays",
        description: "Remove popups, cookie banners, login walls, and fixed overlays",
        func: hack_web_removeOverlays
      },
      {
        name: "Bypass Paywall",
        description: "Strip paywall elements and restore scrolling",
        func: hack_web_bypassPaywall
      }
    ]
  },
  {
    category: "Iframe Tools",
    icon: "web",
    color: "#00b894",
    hacks: [
      {
        name: "Show Iframe URLs",
        description: "Display the source URL above each iframe with click to copy",
        func: hack_fun_showIframeUrls
      },
      {
        name: "Extract All Iframe URLs",
        description: "List every iframe URL on the page and copy to clipboard",
        func: hack_iframe_extractAll
      },
      {
        name: "Fullscreen Iframe",
        description: "Click any iframe to make it go true fullscreen",
        func: hack_iframe_fullscreen
      },
      {
        name: "Open Iframes in New Tabs",
        description: "Open each iframe source URL in its own new tab",
        func: hack_iframe_openInTab
      },
      {
        name: "Inject Iframe",
        description: "Enter a URL, then pick an iframe on the page to replace",
        needsInput: true,
        inputLabel: "URL to load in iframe:",
        inputDefault: "https://example.com",
        func: hack_iframe_inject
      }
    ]
  },
  {
    category: "Game Tools",
    icon: "stadia_controller",
    color: "#fd79a8",
    hacks: [
      {
        name: "Extract Game URL",
        description: "Detect embedded games and extract their direct URLs",
        func: hack_games_extractGameUrl
      },
      {
        name: "Remove Ads",
        description: "Remove ad iframes, banners, and common ad containers",
        func: hack_games_removeAds
      },
      {
        name: "Force Fullscreen",
        description: "Make the game element fill the entire viewport",
        func: hack_games_forceFullscreen
      },
      {
        name: "Freeze Timers",
        description: "Block short timers to stop countdowns and idle kicks (toggle)",
        func: hack_games_freezeTimers
      },
      {
        name: "Auto Clicker",
        description: "Auto-click at a set interval in milliseconds (toggle)",
        needsInput: true,
        inputLabel: "Click interval in ms:",
        inputDefault: "100",
        func: hack_games_autoClicker
      },
      {
        name: "Speed Hack",
        description: "Speed up or slow down HTML5 game animations (toggle)",
        needsInput: true,
        inputLabel: "Speed multiplier (e.g. 2 = 2x fast, 0.5 = half speed):",
        inputDefault: "2",
        func: hack_games_speedHack
      }
    ]
  },
  {
    category: "Fun Hacks",
    icon: "mood",
    color: "#fa8231",
    hacks: [
      {
        name: "Blur Page",
        description: "Apply a blur effect to the entire page",
        func: hack_fun_blur
      },
      {
        name: "Unblur Page",
        description: "Remove the blur effect from the page",
        func: hack_fun_unblur
      },
      {
        name: "Edit Page",
        description: "Make the page content editable",
        func: hack_fun_edit
      },
      {
        name: "Stop Editing Page",
        description: "Disable page editing mode",
        func: hack_fun_stopEdit
      },
      {
        name: "Rename Tab",
        description: "Change the tab title to anything you want",
        needsInput: true,
        inputLabel: "New tab title:",
        inputDefault: "Google",
        func: hack_fun_renameTab
      },
      {
        name: "Show Passwords",
        description: "Reveal all password fields on the page",
        func: hack_fun_showPasswords
      },
      {
        name: "Word Count",
        description: "Count all visible words on the page",
        func: hack_fun_wordCount
      },
      {
        name: "Highlight All Links",
        description: "Toggle a glowing outline on every link (run again to remove)",
        func: hack_fun_highlightLinks
      },
      {
        name: "Dark Mode Toggle",
        description: "Force dark mode on any site via color inversion (run again to undo)",
        func: hack_fun_darkMode
      },
      {
        name: "Screenshot to Clipboard",
        description: "Capture the visible page and copy it to your clipboard",
        func: hack_fun_screenshot
      }
    ]
  },
  {
    category: "School Utils",
    icon: "laptop_chromebook",
    color: "#0fb9b1",
    hacks: [
      {
        name: "Disguise Tab as Google Drive",
        description: "Make the tab look like Google Drive (icon + title)",
        func: hack_school_disguise
      },
      {
        name: "History Flooder",
        description: "Flood browser history with the current site",
        needsInput: true,
        inputLabel: "Number of history entries to add:",
        inputDefault: "100",
        func: hack_school_historyFlood
      }
    ]
  },
  {
    category: "Utility",
    icon: "build",
    color: "#636e72",
    hacks: [
      {
        name: "QR Code for Page",
        description: "Generate a QR code for the current page URL",
        func: hack_util_qrCode
      },
      {
        name: "Copy Page Source",
        description: "Copy the full HTML source of the page to clipboard",
        func: hack_util_copySource
      },
      {
        name: "List All Resources",
        description: "Dump all loaded JS, CSS, image, font, and media URLs",
        func: hack_util_listResources
      },
      {
        name: "Cookie Viewer",
        description: "Display and copy all cookies for the current site",
        func: hack_util_cookieViewer
      }
    ]
  },
  {
    category: "Wikis & Resources",
    icon: "menu_book",
    color: "#a55eea",
    hacks: [
      {
        name: "Prodigy Wiki",
        description: "Open the Prodigy Game Wiki",
        isLink: true,
        url: "https://prodigy-game.fandom.com/wiki/Prodigy_Game_Wiki"
      },
      {
        name: "Gimkit Wiki",
        description: "Open the Gimkit Wiki",
        isLink: true,
        url: "https://gimkit.fandom.com/wiki/Gimkit_Wiki"
      },
      {
        name: "I-Ready Wiki",
        description: "Open the I-Ready Wiki",
        isLink: true,
        url: "https://i-ready.fandom.com/wiki/I-Ready_Wiki"
      }
    ]
  }
];
