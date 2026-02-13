const CONFIG_KEY = 'module-studio-config-v2';
const PROGRESS_KEY = 'module-studio-progress-v2';

const urlParams = new URLSearchParams(window.location.search);
const modulePageId = urlParams.get('module');
const isModuleOnlyPage = Boolean(modulePageId);
const isEmbeddedFrame = window.self !== window.top;

const el = {
  configInput: document.getElementById('configInput'),
  btnSample: document.getElementById('btnSample'),
  btnSave: document.getElementById('btnSave'),
  btnResetProgress: document.getElementById('btnResetProgress'),
  setupMessage: document.getElementById('setupMessage'),
  studentMessage: document.getElementById('studentMessage'),
  courseHeader: document.getElementById('courseHeader'),
  progress: document.getElementById('progress'),
  modules: document.getElementById('modules'),
  moduleLinks: document.getElementById('moduleLinks'),
  instructorCard: document.getElementById('instructorCard'),
  embedCard: document.getElementById('embedCard'),
  studentCard: document.getElementById('studentCard')
};

const sampleConfig = {
  "title": "Applied Strength and Conditioning: Content Knowledge Sequence",
  "instructor": "Instructor Name",
  "outcomes": [
    "Explain core physiological and programming concepts used in strength and conditioning.",
    "Interpret assessment and training variables using evidence-based reasoning.",
    "Defend programming decisions with clear conceptual logic and professional terminology."
  ],
  "resources": [
    {
      "title": "NSCA Essentials of Strength Training and Conditioning",
      "citation": "NSCA",
      "notes": "Primary conceptual framework for physiology, programming variables, and periodization."
    },
    {
      "title": "Exercise Testing and Prescription",
      "citation": "Course text",
      "notes": "Assessment interpretation, validity, and training-response principles."
    },
    {
      "title": "Course Lecture Notes and Research Briefs",
      "citation": "Instructor packet",
      "notes": "Module-specific concept explanations and applied examples."
    }
  ],
  "completionWebhookUrl": "",
  "gradePassbackUrl": "",
  "gradePassbackToken": "",
  "modules": [
    {
      "id": "m1",
      "title": "Module 1: Cardiorespiratory Foundations and Aerobic Adaptation Concepts",
      "competency": "You will explain how aerobic physiology, VO2 concepts, and recovery kinetics inform evidence-based conditioning decisions.",
      "instruction": "Read the assigned sections on oxygen transport, central/peripheral adaptation, and VO2 terminology. Focus on conceptual meaning before formulas.",
      "contentConnection": "Builds the physiological vocabulary needed for all later conditioning and progression modules.",
      "learningTask": "Create a concept map showing relationships among VO2max, recovery heart rate, stroke volume, and aerobic adaptation.",
      "applicationTask": "Write a 500-700 word explanatory brief that interprets aerobic assessment outputs and explains how they guide initial intensity and progression decisions.",
      "gradebook": {
        "assignmentName": "M1 Aerobic Concept Brief",
        "pointsPossible": 30
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "How do VO2-related indicators and recovery trends together improve the quality of aerobic programming decisions?",
        "keywords": [
          "VO2max",
          "recovery",
          "intensity",
          "progression",
          "adaptation"
        ]
      }
    },
    {
      "id": "m2",
      "title": "Module 2: Strength Assessment Logic and Load Prescription Theory",
      "competency": "You will explain the conceptual basis for submaximal testing, 1RM estimation, and intensity-zone selection.",
      "instruction": "Study motor unit recruitment, rate coding, and the logic of submaximal prediction equations. Emphasize why these models are used.",
      "contentConnection": "Extends Module 1 measurement logic into neuromuscular assessment and load prescription.",
      "learningTask": "Compare two prediction equations and produce a short analysis of what each model assumes about fatigue and repetition performance.",
      "applicationTask": "Write a 500-700 word rationale explaining why specific %1RM ranges align with different adaptation goals in novice populations.",
      "gradebook": {
        "assignmentName": "M2 Load Prescription Rationale",
        "pointsPossible": 30
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "Why is moderate-to-high relative intensity commonly recommended for foundational strength adaptation in novices?",
        "keywords": [
          "motor unit recruitment",
          "intensity",
          "adaptation",
          "novice"
        ]
      }
    },
    {
      "id": "m3",
      "title": "Module 3: Movement Pattern Theory and Structural Balance",
      "competency": "You will explain how movement classification and structural balance principles support safe, effective long-term development.",
      "instruction": "Review movement pattern categories and agonist/antagonist relationships. Focus on conceptual signs of imbalance and compensation.",
      "contentConnection": "Connects neuromuscular concepts to movement-system thinking and injury-risk reduction principles.",
      "learningTask": "Develop an annotated framework that defines each major movement pattern and explains its role in balanced programming.",
      "applicationTask": "Write a 450-650 word analysis defending structural balance priorities using biomechanical and adaptation-focused reasoning.",
      "gradebook": {
        "assignmentName": "M3 Structural Balance Analysis",
        "pointsPossible": 25
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "How does structural imbalance increase injury risk over time, and why does push-pull balance matter conceptually?",
        "keywords": [
          "agonist",
          "antagonist",
          "imbalance",
          "injury prevention"
        ]
      }
    },
    {
      "id": "m4",
      "title": "Module 4: Volume, Intensity, and Overload Concepts",
      "competency": "You will explain how volume, intensity, rest, and frequency interact to drive distinct neuromuscular adaptations.",
      "instruction": "Read NSCA guidance on training variables and overload models. Pay attention to the conceptual difference between stress dose and adaptation outcome.",
      "contentConnection": "Builds from Module 2 by shifting from single-variable decisions to multivariable adaptation planning.",
      "learningTask": "Create a comparison chart of linear, double, and undulating progression models with strengths, limits, and best-use contexts.",
      "applicationTask": "Write a 600-800 word explanatory essay describing how variable manipulation changes adaptation direction in novice clients.",
      "gradebook": {
        "assignmentName": "M4 Overload Concepts Essay",
        "pointsPossible": 30
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "How do volume and intensity create different adaptation signals, and why must they be balanced over time?",
        "keywords": [
          "volume",
          "intensity",
          "overload",
          "adaptation"
        ]
      }
    },
    {
      "id": "m5",
      "title": "Module 5: Energy Systems and Concurrent Training Concepts",
      "competency": "You will explain oxidative, glycolytic, and phosphagen system demands and the conceptual basis of the interference effect.",
      "instruction": "Study energy system characteristics and concurrent training literature. Focus on mechanism-level explanations rather than session planning.",
      "contentConnection": "Integrates cardiorespiratory and resistance concepts into a unified adaptation framework.",
      "learningTask": "Construct a concept matrix linking training stimulus type to dominant energy system demand and expected adaptation outcomes.",
      "applicationTask": "Write a 550-750 word explanation of the interference effect and defend two evidence-based strategies that reduce its impact.",
      "gradebook": {
        "assignmentName": "M5 Interference Effect Explanation",
        "pointsPossible": 30
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "What is the interference effect, and which programming principles reduce it without removing conditioning work?",
        "keywords": [
          "interference",
          "recovery",
          "energy systems",
          "adaptation"
        ]
      }
    },
    {
      "id": "m6",
      "title": "Module 6: Fatigue Monitoring and Autoregulation Theory",
      "competency": "You will explain fatigue typology, performance trend interpretation, and autoregulatory decision logic.",
      "instruction": "Review central/peripheral fatigue concepts, overreaching definitions, and RPE-based autoregulation frameworks.",
      "contentConnection": "Moves from fixed planning logic to responsive decision-making based on adaptation signals.",
      "learningTask": "Analyze three written case scenarios and identify which fatigue pattern is present and what conceptual adjustment rule applies.",
      "applicationTask": "Write a 500-700 word decision framework that explains when and why load, volume, or frequency should be adjusted.",
      "gradebook": {
        "assignmentName": "M6 Autoregulation Decision Framework",
        "pointsPossible": 25
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "How do you distinguish functional overreaching from non-functional overreaching using trend-based evidence?",
        "keywords": [
          "fatigue",
          "overreaching",
          "adaptation",
          "recovery"
        ]
      }
    },
    {
      "id": "m7",
      "title": "Module 7: Coaching Communication and Motivation Concepts",
      "competency": "You will explain how autonomy support, feedback quality, and communication structure influence adherence and performance.",
      "instruction": "Read assigned material on motivation theory, coaching language, and feedback timing. Focus on psychological mechanisms and behavior change principles.",
      "contentConnection": "Adds behavior and communication science to technical programming knowledge.",
      "learningTask": "Develop a concept brief that contrasts autonomy-supportive versus controlling coaching language and predicted client responses.",
      "applicationTask": "Write a 450-650 word reflection analyzing how communication choices alter competence perception, engagement, and long-term adherence.",
      "gradebook": {
        "assignmentName": "M7 Coaching Psychology Reflection",
        "pointsPossible": 20
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "Why does autonomy-supportive coaching typically improve adherence and perceived competence?",
        "keywords": [
          "autonomy",
          "competence",
          "adherence",
          "motivation"
        ]
      }
    },
    {
      "id": "m8",
      "title": "Module 8: Periodization and Macrocycle Knowledge Synthesis",
      "competency": "You will synthesize assessment, adaptation, progression, and recovery concepts into a coherent periodization rationale.",
      "instruction": "Review macrocycle and mesocycle theory, deload logic, and progression architecture. Emphasize conceptual coherence and evidence alignment.",
      "contentConnection": "Synthesizes all previous modules into an integrated knowledge framework for long-term program reasoning.",
      "learningTask": "Create an annotated concept outline showing how assessment data, overload progression, conditioning integration, and monitoring connect across an 8-week plan.",
      "applicationTask": "Write a 700-900 word capstone defense explaining the logic of an 8-week periodized model and how each phase supports targeted adaptation.",
      "gradebook": {
        "assignmentName": "M8 Periodization Concept Defense",
        "pointsPossible": 50
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "How should assessment evidence shape macrocycle structure and progression decisions across phases?",
        "keywords": [
          "assessment",
          "periodization",
          "progression",
          "adaptation"
        ]
      }
    }
  ]
};
let state = {
  config: sampleConfig,
  progress: {}
};

function setMessage(target, text, tone = '') {
  target.textContent = text;
  target.className = `message ${tone}`.trim();
}

function parseJSON(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function maybeApplyPageMode() {
  if (!isModuleOnlyPage && !isEmbeddedFrame) return;
  document.body.classList.add('module-only');
  if (el.studentCard) {
    const title = el.studentCard.querySelector('h2');
    if (title) title.textContent = 'Student Module Page';
  }
}

function loadState() {
  const savedConfig = localStorage.getItem(CONFIG_KEY);
  const savedProgress = localStorage.getItem(PROGRESS_KEY);
  state.config = savedConfig ? parseJSON(savedConfig, sampleConfig) : sampleConfig;
  state.progress = savedProgress ? parseJSON(savedProgress, {}) : {};

  if (el.configInput) {
    el.configInput.value = JSON.stringify(state.config, null, 2);
  }

  if (el.setupMessage && !isModuleOnlyPage) {
    setMessage(
      el.setupMessage,
      'Start with "Load Sample", edit JSON, then click "Save Config". For Canvas, use per-module links below.',
      'warn'
    );
  }

  maybeApplyPageMode();
  render();
}

function saveProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.progress));
}

function validateConfig(config) {
  if (!config.title) return 'Missing title';
  if (!Array.isArray(config.modules) || config.modules.length === 0) return 'At least one module is required';
  for (const mod of config.modules) {
    if (!mod.id || !mod.title || !mod.competency || !mod.masteryCheck) {
      return `Module missing required fields: ${mod.title || mod.id || 'unknown'}`;
    }
  }
  return '';
}

function getCourseBaseUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function renderModuleLinks() {
  if (!el.moduleLinks || isModuleOnlyPage) return;

  const modules = state.config.modules || [];
  const base = getCourseBaseUrl();
  if (!modules.length) {
    el.moduleLinks.innerHTML = '';
    return;
  }

  el.moduleLinks.innerHTML = `
    <div class="guide">
      <h3>Canvas Module-By-Module URLs</h3>
      <p class="small">Use these URLs in individual Canvas pages/assignments so students open one module at a time (not the editor).</p>
      <ul class="module-link-list">
        ${modules
          .map(
            (m) => `<li><strong>${m.title}</strong><br><code>${base}?module=${encodeURIComponent(m.id)}</code></li>`
          )
          .join('')}
      </ul>
    </div>
  `;
}

function renderCourseHeader(config, shownModules) {
  const moduleModeText = isModuleOnlyPage
    ? `<p class="small"><strong>Mode:</strong> Canvas module page (${modulePageId})</p>`
    : '';

  el.courseHeader.innerHTML = `
    <h3>${config.title || 'Untitled Course'}</h3>
    <p class="small"><strong>Instructor:</strong> ${config.instructor || 'N/A'}</p>
    ${moduleModeText}
    <p><strong>Course outcomes</strong></p>
    <ul>${(config.outcomes || []).map((o) => `<li>${o}</li>`).join('')}</ul>
    <p><strong>Resources provided by instructor</strong></p>
    <ul>
      ${(config.resources || [])
        .map((r) => `<li><strong>${r.title}</strong> - ${r.citation || 'n/a'}<br><span class="small">${r.notes || ''}</span></li>`)
        .join('')}
    </ul>
    ${shownModules.length === 1 ? `<p class="small"><strong>Current module:</strong> ${shownModules[0].title}</p>` : ''}
  `;
}

function render() {
  const config = state.config;
  const allModules = config.modules || [];
  const shownModules = isModuleOnlyPage
    ? allModules.filter((m) => m.id === modulePageId)
    : allModules;

  if (isModuleOnlyPage && shownModules.length === 0) {
    el.courseHeader.innerHTML = `<h3>${config.title || 'Untitled Course'}</h3>`;
    el.progress.innerHTML = '<p><strong>Error:</strong> Module not found. Check the module id in the URL.</p>';
    el.modules.innerHTML = '';
    return;
  }

  renderCourseHeader(config, shownModules);

  const done = allModules.filter((m) => state.progress[m.id]?.done).length;
  el.progress.innerHTML = isModuleOnlyPage
    ? `<p><strong>Progress:</strong> ${done}/${allModules.length} modules mastered</p>`
    : `<p><strong>Progress:</strong> ${done}/${allModules.length} modules mastered</p>`;

  el.modules.innerHTML = shownModules
    .map((m) => {
      let unlocked = true;
      if (!isModuleOnlyPage) {
        const idx = allModules.findIndex((mod) => mod.id === m.id);
        unlocked = idx <= 0 || Boolean(state.progress[allModules[idx - 1].id]?.done);
      }

      const doneState = Boolean(state.progress[m.id]?.done);
      return `
      <article class="module ${unlocked ? '' : 'locked'}">
        <h4>${m.title}<span class="status ${doneState ? 'done' : ''}">${doneState ? 'Mastered' : unlocked ? 'Open' : 'Locked'}</span></h4>
        <p><strong>Competency:</strong> ${m.competency}</p>
        <p><strong>Instruction (complete before task):</strong> ${m.instruction || 'Review assigned readings and notes before attempting the task.'}</p>
        <p><strong>Content connection:</strong> ${m.contentConnection || 'Connect the module task to course outcomes and assigned content.'}</p>
        <p><strong>Learning task:</strong> ${m.learningTask || 'Review module resources and complete guided task.'}</p>
        <p><strong>Application task:</strong> ${m.applicationTask || 'Complete and submit the application product for this module.'}</p>
        ${renderGradebook(m)}
        ${renderCheck(m, unlocked, doneState)}
      </article>
      `;
    })
    .join('');

  renderModuleLinks();
  bindChecks();
  maybeSignalCompletion();
}

function renderGradebook(module) {
  const gb = module.gradebook || {};
  if (!gb.assignmentName && !gb.pointsPossible) return '';
  return `<p><strong>Gradebook opportunity:</strong> ${gb.assignmentName || module.title} (${Number(gb.pointsPossible) || 0} points)</p>`;
}

function renderCheck(module, unlocked, done) {
  const check = module.masteryCheck || {};
  const checkType = String(check.type || '').toLowerCase();
  const disabled = !unlocked || done ? 'disabled' : '';
  if (checkType === 'mcq') {
    return `
      <div class="check">
        <p><strong>Mastery check:</strong> ${check.prompt || ''}</p>
        ${(check.options || [])
          .map((option, i) => `<label><input type="radio" name="${module.id}" value="${i}" ${disabled} /> ${option}</label><br>`)
          .join('')}
        <div class="row"><button data-submit="${module.id}" ${disabled}>Submit</button></div>
      </div>
    `;
  }

  return `
    <div class="check">
      <p><strong>Mastery check:</strong> ${check.prompt || ''}</p>
      <textarea data-answer="${module.id}" rows="3" ${disabled}></textarea>
      <div class="row"><button data-submit="${module.id}" ${disabled}>Submit</button></div>
    </div>
  `;
}

function bindChecks() {
  document.querySelectorAll('[data-submit]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const moduleId = btn.dataset.submit;
      const module = state.config.modules.find((m) => m.id === moduleId);
      if (!module) return;

      const result = evaluate(module);
      if (result.pass) {
        state.progress[moduleId] = {
          done: true,
          completedAt: new Date().toISOString(),
          scorePercent: result.scorePercent
        };
        saveProgress();
        maybeSignalModuleMastery(module, result.scorePercent);
        setMessage(el.studentMessage, `Mastery demonstrated for ${module.title}.`, 'ok');
        render();
      } else {
        setMessage(el.studentMessage, 'Not yet mastered. Revisit instructions/content, then resubmit.', 'warn');
      }
    });
  });
}

function evaluate(module) {
  const check = module.masteryCheck || {};
  const checkType = String(check.type || '').toLowerCase();

  if (checkType === 'mcq') {
    const selected = document.querySelector(`input[name="${module.id}"]:checked`);
    if (!selected) return { pass: false, scorePercent: 0 };
    const pass = Number(selected.value) === Number(check.correctIndex);
    return { pass, scorePercent: pass ? 100 : 0 };
  }

  const answerEl = document.querySelector(`[data-answer="${module.id}"]`);
  const answer = answerEl?.value?.trim() || '';
  if (!answer) return { pass: false, scorePercent: 0 };

  const keywords = check.keywords || [];
  if (!keywords.length) {
    const pass = answer.length >= 40;
    return { pass, scorePercent: pass ? 100 : 0 };
  }

  const normalized = answer.toLowerCase();
  const hits = keywords.filter((k) => normalized.includes(String(k).toLowerCase())).length;
  const ratio = hits / keywords.length;
  const pass = ratio >= 0.67;
  return { pass, scorePercent: Math.round(ratio * 100) };
}

async function postToOptionalGradePassback(payload) {
  if (!state.config.gradePassbackUrl || !state.config.gradePassbackToken) return;
  try {
    await fetch(state.config.gradePassbackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.config.gradePassbackToken}`
      },
      body: JSON.stringify(payload)
    });
  } catch {
    setMessage(el.studentMessage, 'Module mastered, but grade passback failed.', 'warn');
  }
}

async function maybeSignalModuleMastery(module, scorePercent) {
  const gb = module.gradebook || {};
  const pointsPossible = Number(gb.pointsPossible) || 0;
  const pointsEarned = Math.round(pointsPossible * (scorePercent / 100));

  const payload = {
    event: 'moduleMastery',
    moduleId: module.id,
    moduleTitle: module.title,
    assignmentName: gb.assignmentName || module.title,
    scorePercent,
    pointsEarned,
    pointsPossible,
    completedAt: new Date().toISOString()
  };

  window.parent?.postMessage(payload, '*');
  await postToOptionalGradePassback(payload);
}

async function maybeSignalCompletion() {
  const modules = state.config.modules || [];
  if (!modules.length) return;

  const allDone = modules.every((m) => state.progress[m.id]?.done);
  if (!allDone) return;

  const payload = {
    event: 'moduleCompletion',
    title: state.config.title,
    completedAt: new Date().toISOString(),
    moduleCount: modules.length,
    progress: state.progress
  };

  window.parent?.postMessage(payload, '*');

  if (state.config.completionWebhookUrl) {
    try {
      await fetch(state.config.completionWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch {
      setMessage(el.studentMessage, 'Completed locally, but webhook delivery failed.', 'warn');
    }
  }

  setMessage(el.studentMessage, 'All modules mastered. Completion signal sent.', 'ok');
}

if (el.btnSample) {
  el.btnSample.addEventListener('click', () => {
    state.config = JSON.parse(JSON.stringify(sampleConfig));
    if (el.configInput) {
      el.configInput.value = JSON.stringify(state.config, null, 2);
    }
    localStorage.setItem(CONFIG_KEY, JSON.stringify(state.config));
    setMessage(
      el.setupMessage,
      'Sample loaded and applied. Use the module-specific URLs below for Canvas pages.',
      'ok'
    );
    render();
  });
}

if (el.btnSave) {
  el.btnSave.addEventListener('click', () => {
    const parsed = parseJSON(el.configInput.value, null);
    if (!parsed) {
      setMessage(el.setupMessage, 'Invalid JSON. Please fix syntax and try again.', 'error');
      return;
    }

    const validationError = validateConfig(parsed);
    if (validationError) {
      setMessage(el.setupMessage, `Config validation failed: ${validationError}`, 'error');
      return;
    }

    state.config = parsed;
    localStorage.setItem(CONFIG_KEY, JSON.stringify(parsed));
    setMessage(el.setupMessage, 'Configuration saved. Module-specific Canvas links updated below.', 'ok');
    render();
  });
}

if (el.btnResetProgress) {
  el.btnResetProgress.addEventListener('click', () => {
    state.progress = {};
    saveProgress();
    setMessage(el.setupMessage, 'Student progress reset to zero for all modules.', 'ok');
    render();
  });
}

if (el.configInput) {
  el.configInput.addEventListener('input', () => {
    setMessage(
      el.setupMessage,
      'Unsaved edits detected. Click "Save Config" to apply changes and refresh module Canvas links.',
      'warn'
    );
  });
}

loadState();
