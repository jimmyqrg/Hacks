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
  var iframes = document.querySelectorAll('iframe');
  if (iframes.length === 0) {
    alert('No iframes found on this page.');
    return;
  }

  document.querySelectorAll('.pollora-iframe-url-box').forEach(function(el) {
    el.remove();
  });

  iframes.forEach(function(iframe) {
    var url = iframe.src || iframe.getAttribute('src') || '(no src)';

    var box = document.createElement('div');
    box.className = 'pollora-iframe-url-box';
    box.style.cssText =
      'display:flex;align-items:center;gap:8px;padding:6px 12px;' +
      'background:#1a1a24;border:1px solid #7c5cfc;border-bottom:none;' +
      'border-radius:8px 8px 0 0;font-family:monospace;font-size:12px;' +
      'color:#e8e8f0;cursor:pointer;max-width:100%;box-sizing:border-box;' +
      'z-index:999999;position:relative;';

    var label = document.createElement('span');
    label.textContent = 'iframe url: ';
    label.style.cssText = 'color:#7c5cfc;font-weight:bold;white-space:nowrap;';

    var urlText = document.createElement('span');
    urlText.textContent = url;
    urlText.style.cssText =
      'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;';
    urlText.title = url;

    var copyHint = document.createElement('span');
    copyHint.textContent = 'click to copy';
    copyHint.style.cssText =
      'color:#8888a0;font-size:10px;white-space:nowrap;font-style:italic;';

    box.appendChild(label);
    box.appendChild(urlText);
    box.appendChild(copyHint);

    box.addEventListener('click', function() {
      navigator.clipboard.writeText(url).then(function() {
        copyHint.textContent = 'copied!';
        copyHint.style.color = '#51cf66';
        setTimeout(function() {
          copyHint.textContent = 'click to copy';
          copyHint.style.color = '#8888a0';
        }, 1500);
      });
    });

    iframe.parentNode.insertBefore(box, iframe);
  });
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
  if (style) {
    style.remove();
    return;
  }
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
  if (style) {
    style.remove();
    return;
  }
  style = document.createElement('style');
  style.id = 'pollora-dark-mode';
  style.textContent =
    'html { filter: invert(0.9) hue-rotate(180deg) !important; } ' +
    'img, video, canvas, picture, svg, [style*="background-image"] ' +
    '{ filter: invert(1) hue-rotate(180deg) !important; }';
  document.head.appendChild(style);
}

function hack_fun_screenshot() {
  var script = document.getElementById('pollora-h2c');
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
    s.id = 'pollora-h2c';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s.onload = capture;
    document.head.appendChild(s);
  }
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
        name: "Show Iframe URLs",
        description: "Display the source URL above each iframe with click to copy",
        func: hack_fun_showIframeUrls
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
