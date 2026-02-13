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
  title: 'Applied Strength and Conditioning Program Design',
  instructor: 'Instructor Name',
  outcomes: [
    'Conduct valid fitness assessments and convert findings into exercise prescriptions.',
    'Design progressive strength and conditioning programs using NSCA-aligned principles.',
    'Monitor adaptation and adjust plans using autoregulation and coaching best practices.'
  ],
  resources: [
    {
      title: 'NSCA Essentials of Strength Training and Conditioning',
      citation: 'NSCA',
      notes: 'Primary framework for testing, prescription, progression, and periodization.'
    },
    {
      title: 'Exercise Testing and Prescription',
      citation: 'Course text',
      notes: 'Assessment protocols, contraindications, and fitness classification methods.'
    },
    {
      title: 'UC Gym Assessment and Programming Protocol Packet',
      citation: 'Program packet',
      notes: 'Local implementation procedures, equipment constraints, and coaching standards.'
    }
  ],
  completionWebhookUrl: '',
  gradePassbackUrl: '',
  gradePassbackToken: '',
  modules: [
    {
      id: 'm1',
      title: 'Module 1: Cardiorespiratory Assessment and Aerobic Programming Foundations',
      competency: 'Students must demonstrate the ability to conduct submaximal aerobic assessments, calculate VO2max estimates, interpret recovery kinetics, and prescribe an evidence-based aerobic training plan aligned to NSCA principles.',
      instruction: 'Students will: (1) study aerobic energy system physiology including central and peripheral adaptations; (2) review NSCA testing principles including validity, reliability, and contraindications; (3) analyze Bruce Protocol, Cooper Test, and YMCA Step Test procedures; (4) calculate VO2max estimates from raw data; (5) classify aerobic fitness level; (6) construct an intensity prescription using RPE, %HRmax, and/or talk test models; (7) justify duration and frequency using NSCA volume guidelines.',
      contentConnection: 'Establishes physiological and mathematical foundations for conditioning prescription. Links oxygen uptake, recovery kinetics, and cardiovascular strain to programming variables.',
      learningTask: 'Students rotate through all three cardio assessments. For each test, they calculate VO2max, classify aerobic capacity, and compare discrepancies across methods. Students must identify which metric most directly informs intensity prescription.',
      applicationTask: 'Submit a 2-week aerobic program including: mode selection rationale, intensity zone (RPE and %HRmax), duration, frequency, and week 2 progression. Justification must reference assessment metrics and NSCA conditioning guidelines.',
      gradebook: {
        assignmentName: 'M1 Aerobic Assessment to Prescription',
        pointsPossible: 30
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Explain how recovery heart rate and VO2 estimation together determine initial aerobic training intensity and progression rate.',
        keywords: ['VO2max', 'recovery', 'intensity', 'progression', 'aerobic adaptation']
      }
    },
    {
      id: 'm2',
      title: 'Module 2: Strength Assessment and Load Prescription',
      competency: 'Students must demonstrate the ability to conduct submaximal strength testing, estimate 1RM using validated equations, and prescribe appropriate intensity ranges based on training goals.',
      instruction: 'Students will: (1) study neuromuscular physiology including motor unit recruitment and rate coding; (2) review NSCA strength testing guidelines; (3) compare direct 1RM testing vs submaximal prediction models; (4) practice Epley and Brzycki equations; (5) examine intensity ranges for strength, hypertrophy, and endurance; (6) analyze safety considerations for general populations.',
      contentConnection: 'Transitions from aerobic systems to neuromuscular adaptation. Introduces load manipulation as the primary stimulus for muscular strength adaptation.',
      learningTask: 'Students conduct 5-8RM submaximal tests for lower body, push, and pull movements. They calculate estimated 1RM using two equations and compare variance.',
      applicationTask: 'Submit a Week 1-2 strength prescription including calculated %1RM loads, sets, reps, rest intervals, and technical rationale referencing neuromuscular adaptation principles.',
      gradebook: {
        assignmentName: 'M2 Strength Assessment and Load Prescription',
        pointsPossible: 30
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Explain why 70-85% 1RM is typically prescribed for general strength development in novice trainees.',
        keywords: ['motor unit recruitment', 'intensity', 'adaptation', 'novice']
      }
    },
    {
      id: 'm3',
      title: 'Module 3: Exercise Selection and Movement Pattern Integration',
      competency: 'Students must demonstrate the ability to select exercises based on movement patterns, structural balance principles, equipment constraints, and assessment findings.',
      instruction: 'Students will: (1) study movement pattern categorization (squat, hinge, push, pull, carry, rotation); (2) analyze structural balance and agonist/antagonist ratios; (3) review NSCA recommendations for exercise order and stabilization demands; (4) evaluate machine vs free-weight considerations; (5) examine common compensation patterns identified in pre-assessment.',
      contentConnection: 'Integrates strength assessment findings with equipment availability in the UC gym. Connects structural balance to injury prevention and long-term progression.',
      learningTask: 'Students design a full-body session including at least one movement per primary pattern, ensuring push/pull balance and lower/upper symmetry.',
      applicationTask: 'Submit a Week 1 full-body session including exercise selection rationale tied directly to assessment data and structural balance considerations.',
      gradebook: {
        assignmentName: 'M3 Movement-Based Session Design',
        pointsPossible: 25
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Explain why structural balance between push and pull movements reduces injury risk.',
        keywords: ['agonist', 'antagonist', 'imbalance', 'injury prevention']
      }
    },
    {
      id: 'm4',
      title: 'Module 4: Manipulating Volume, Intensity, and Progression',
      competency: 'Students must demonstrate the ability to manipulate training variables (sets, reps, intensity, rest, tempo, frequency) to produce specific neuromuscular adaptations using structured overload models.',
      instruction: 'Students will: (1) review NSCA resistance training guidelines for strength, hypertrophy, and endurance; (2) study progressive overload models including linear progression, double progression, and undulating periodization; (3) analyze volume-load calculations (sets x reps x load); (4) examine fatigue management principles; (5) practice constructing 4-week microcycles using structured overload.',
      contentConnection: 'Builds directly from strength assessment and exercise selection. Moves students from session design to multi-week adaptation planning.',
      learningTask: 'Students take their Week 1 program and construct a 4-week progression using at least one overload strategy. They must calculate weekly volume load and identify progression logic.',
      applicationTask: 'Submit a 4-week microcycle including volume-load calculations, progression strategy justification, rest interval rationale, and anticipated adaptation timeline.',
      gradebook: {
        assignmentName: 'M4 4-Week Progressive Microcycle',
        pointsPossible: 30
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Explain how manipulating volume versus intensity influences neuromuscular adaptation differently in novice clients.',
        keywords: ['volume', 'intensity', 'overload', 'adaptation']
      }
    },
    {
      id: 'm5',
      title: 'Module 5: Energy System Development and Conditioning Integration',
      competency: 'Students must demonstrate the ability to integrate aerobic and anaerobic conditioning into a resistance training program without compromising recovery or adaptation.',
      instruction: 'Students will: (1) review oxidative, glycolytic, and phosphagen energy systems; (2) examine interference effect literature; (3) study NSCA conditioning recommendations; (4) compare steady-state versus interval models; (5) design weekly training splits that integrate conditioning and strength without excessive fatigue accumulation.',
      contentConnection: 'Connects aerobic assessment from Module 1 with resistance progression from Modules 2-4.',
      learningTask: 'Students modify their 4-week strength program to include conditioning sessions. They must justify placement (same day vs alternate day) and intensity based on recovery principles.',
      applicationTask: 'Submit a 4-week integrated training plan including strength and conditioning placement, intensity zones, and fatigue management strategy.',
      gradebook: {
        assignmentName: 'M5 Integrated Strength & Conditioning Plan',
        pointsPossible: 30
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Explain the interference effect and how programming structure can minimize it.',
        keywords: ['interference', 'recovery', 'energy systems', 'adaptation']
      }
    },
    {
      id: 'm6',
      title: 'Module 6: Monitoring Adaptation and Autoregulation',
      competency: 'Students must demonstrate the ability to monitor fatigue, performance trends, and client response, and adjust programming using autoregulatory principles.',
      instruction: 'Students will: (1) study fatigue types (central vs peripheral); (2) review RPE-based autoregulation; (3) analyze signs of overreaching versus normal fatigue; (4) examine performance trend tracking; (5) develop decision rules for modifying load, volume, or frequency.',
      contentConnection: 'Moves from static planning to dynamic programming adjustment.',
      learningTask: 'Students evaluate three client case studies demonstrating plateau, excessive fatigue, and under-stimulation. They must adjust programming variables accordingly.',
      applicationTask: 'Submit a monitoring template including weekly check-in metrics, RPE tracking table, and defined decision rules for increasing or decreasing load.',
      gradebook: {
        assignmentName: 'M6 Monitoring & Autoregulation Plan',
        pointsPossible: 25
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Differentiate between functional overreaching and non-functional overreaching.',
        keywords: ['fatigue', 'overreaching', 'adaptation', 'recovery']
      }
    },
    {
      id: 'm7',
      title: 'Module 7: Professional Coaching and Motivational Integration',
      competency: 'Students must demonstrate the ability to deliver structured sessions while integrating motivational principles and professional communication.',
      instruction: 'Students will: (1) review autonomy-supportive coaching strategies; (2) examine confidence-building progression; (3) practice delivering corrective feedback; (4) analyze motivational barriers from intake; (5) simulate full training sessions incorporating structured communication.',
      contentConnection: 'Integrates technical programming competence with client psychology and professional presence.',
      learningTask: 'Students conduct a supervised mock session including warm-up, strength block, conditioning, and feedback delivery.',
      applicationTask: 'Submit a session reflection analyzing communication effectiveness, cueing quality, motivational strategy, and professional demeanor.',
      gradebook: {
        assignmentName: 'M7 Professional Coaching Practicum',
        pointsPossible: 20
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Explain how autonomy-supportive coaching influences adherence and performance.',
        keywords: ['autonomy', 'competence', 'adherence', 'motivation']
      }
    },
    {
      id: 'm8',
      title: 'Module 8: 8-Week Periodized Client Training Plan',
      competency: 'Students must demonstrate the ability to design, justify, and defend a complete 8-week training macrocycle grounded in assessment data and evidence-based programming principles.',
      instruction: 'Students will: (1) review macrocycle planning models; (2) structure two 4-week mesocycles; (3) integrate strength, conditioning, recovery, and progression; (4) justify deload timing; (5) prepare professional program presentation.',
      contentConnection: 'Synthesizes all prior modules into a comprehensive client plan.',
      learningTask: 'Peer-review draft macrocycles using structured rubric evaluating load progression, fatigue management, and logical coherence.',
      applicationTask: 'Submit final 8-week macrocycle including assessment summary, weekly progression tables, conditioning integration, monitoring strategy, and written defense of programming logic.',
      gradebook: {
        assignmentName: 'M8 8-Week Periodized Client Plan',
        pointsPossible: 50
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Explain how assessment data informed your macrocycle design and progression model.',
        keywords: ['assessment', 'periodization', 'progression', 'adaptation']
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
