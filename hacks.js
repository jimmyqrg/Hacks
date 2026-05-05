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
