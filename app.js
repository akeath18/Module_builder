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
  title: 'Fitness-Based PE Instruction',
  instructor: 'Instructor Name',
  outcomes: [
    'Design fitness lessons aligned to standards and learner needs.',
    'Use performance evidence to determine mastery and advancement.',
    'Apply safe strength and conditioning guidelines for adolescents.'
  ],
  resources: [
    {
      title: 'Promoting Active Lifestyles in Schools',
      citation: 'Human Kinetics (2018)',
      notes: 'Use for school-wide physical activity models and curriculum framing.'
    },
    {
      title: 'Exercise Testing and Prescription',
      citation: 'Course text',
      notes: 'Use to design valid assessment tasks and interpretation checkpoints.'
    },
    {
      title: 'NSCA Guide to High School Strength and Conditioning',
      citation: 'NSCA (2021)',
      notes: 'Use for safe strength programming and progression principles.'
    }
  ],
  completionWebhookUrl: '',
  gradePassbackUrl: '',
  gradePassbackToken: '',
  modules: [
    {
      id: 'm1',
      title: 'Module 1: Competency-Based Foundations',
      competency: 'Explain competency-based mastery learning for PE in practice.',
      instruction: 'Read the assigned section from Promoting Active Lifestyles in Schools and take notes on mastery progression language.',
      contentConnection: 'Connect course outcomes to how evidence is collected before advancement.',
      learningTask: 'Create a concept map showing competency targets, evidence types, and advancement rules.',
      applicationTask: 'Submit a one-page concept map and a 150-word rationale describing how your progression decisions protect instructional quality.',
      gradebook: {
        assignmentName: 'M1 Competency Foundations',
        pointsPossible: 10
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'In 4-6 sentences, explain competency targets, mastery evidence, and how students advance.',
        keywords: ['evidence', 'criteria', 'advance']
      }
    },
    {
      id: 'm2',
      title: 'Module 2: Standards and Outcome Mapping',
      competency: 'Align PE standards and course outcomes to measurable module competencies.',
      instruction: 'Review your standards matrix and identify verbs that can be observed and scored.',
      contentConnection: 'Use the text examples to translate broad goals into measurable statements.',
      learningTask: 'Map at least 3 PE standards to outcomes and write one measurable competency for each.',
      applicationTask: 'Build a standards-to-competency table with measurable performance indicators.',
      gradebook: {
        assignmentName: 'M2 Standards Mapping',
        pointsPossible: 10
      },
      masteryCheck: {
        type: 'mcq',
        prompt: 'Which outcome statement is most measurable for competency-based progression?',
        options: [
          'Students will understand fitness concepts.',
          'Students can complete a 3-station circuit safely with correct form on at least 4 of 5 criteria.',
          'Students should try their best in class.'
        ],
        correctIndex: 1
      }
    },
    {
      id: 'm3',
      title: 'Module 3: Baseline Fitness Assessment',
      competency: 'Design and administer a baseline assessment protocol with valid data collection.',
      instruction: 'Read Exercise Testing and Prescription guidance on validity, safety, and sequence of testing.',
      contentConnection: 'Identify which measures will be used later for growth comparisons.',
      learningTask: 'Build a baseline protocol including safety screen, test sequence, and scoring sheet.',
      applicationTask: 'Submit your baseline protocol with a data table template and safety notes.',
      gradebook: {
        assignmentName: 'M3 Baseline Assessment Plan',
        pointsPossible: 15
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Describe your baseline protocol and explain how it supports valid before/after comparisons.',
        keywords: ['baseline', 'protocol', 'valid']
      }
    },
    {
      id: 'm4',
      title: 'Module 4: Performance Rubrics and Mastery Levels',
      competency: 'Create a rubric with clear novice, developing, proficient, and advanced descriptors.',
      instruction: 'Review rubric examples and isolate criteria that are observable in a PE setting.',
      contentConnection: 'Ensure each level can be scored consistently by different instructors.',
      learningTask: 'Draft a 4-level rubric for one movement competency and include observable criteria.',
      applicationTask: 'Submit a completed 4-level rubric and a short scoring guide.',
      gradebook: {
        assignmentName: 'M4 Rubric Design',
        pointsPossible: 10
      },
      masteryCheck: {
        type: 'mcq',
        prompt: 'Which rubric descriptor is strongest for reliable scoring?',
        options: [
          'Student shows good effort most days.',
          'Student demonstrates proper squat mechanics on 8 of 10 reps with neutral spine and knee tracking.',
          'Student participation is acceptable.'
        ],
        correctIndex: 1
      }
    },
    {
      id: 'm5',
      title: 'Module 5: Safe Strength and Conditioning Design',
      competency: 'Plan age-appropriate strength and conditioning sessions using safe progression principles.',
      instruction: 'Read the NSCA high school progression guidance and identify risk controls.',
      contentConnection: 'Tie your session design to adolescent safety and progression over time.',
      learningTask: 'Draft a 2-week microcycle with warm-up, primary lifts, accessories, and recovery.',
      applicationTask: 'Submit your microcycle with rationale for load progression and supervision points.',
      gradebook: {
        assignmentName: 'M5 Safe S&C Plan',
        pointsPossible: 15
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Explain your progression choices and the safety safeguards used for adolescent learners.',
        keywords: ['progression', 'safety', 'adolescent']
      }
    },
    {
      id: 'm6',
      title: 'Module 6: Differentiation and Intervention',
      competency: 'Differentiate instruction and interventions based on student performance evidence.',
      instruction: 'Review baseline and rubric data examples and classify students by support need.',
      contentConnection: 'Intervention decisions must be tied to evidence, not participation alone.',
      learningTask: 'Create a tiered intervention plan for students below, at, and above target mastery.',
      applicationTask: 'Submit a tiered intervention matrix with coaching cues and reassessment trigger.',
      gradebook: {
        assignmentName: 'M6 Differentiation Plan',
        pointsPossible: 10
      },
      masteryCheck: {
        type: 'mcq',
        prompt: 'Which intervention best reflects evidence-based differentiation?',
        options: [
          'Give every student the same task regardless of assessment results.',
          'Use baseline and rubric data to assign targeted technique stations and coaching cues.',
          'Advance all students to the next module after one class period.'
        ],
        correctIndex: 1
      }
    },
    {
      id: 'm7',
      title: 'Module 7: Feedback, Reassessment, and Advancement',
      competency: 'Use actionable feedback cycles and reassessment criteria to support mastery growth.',
      instruction: 'Review feedback loop examples and draft a reassessment policy with timelines.',
      contentConnection: 'Students should know exactly what to improve before reassessment.',
      learningTask: 'Design a feedback protocol with clear reassessment windows and advancement cutoffs.',
      applicationTask: 'Submit a feedback/reassessment workflow including communication templates.',
      gradebook: {
        assignmentName: 'M7 Feedback and Reassessment',
        pointsPossible: 10
      },
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Describe how students receive feedback, when they reassess, and what counts as mastery.',
        keywords: ['feedback', 'reassess', 'mastery']
      }
    },
    {
      id: 'm8',
      title: 'Module 8: Capstone Implementation Plan',
      competency: 'Integrate outcomes, assessment, safety, and progression into a complete PE unit plan.',
      instruction: 'Review all prior module deliverables and combine them into one coherent unit implementation plan.',
      contentConnection: 'Your capstone must show direct alignment between competencies, evidence, and grade reporting.',
      learningTask: 'Produce a capstone unit plan that includes timeline, assessments, differentiation, and reporting.',
      applicationTask: 'Submit the full unit packet with assessment tools, progression rules, and gradebook mapping.',
      gradebook: {
        assignmentName: 'M8 Capstone Unit Plan',
        pointsPossible: 20
      },
      masteryCheck: {
        type: 'mcq',
        prompt: 'Which capstone plan is most aligned to competency-based instruction?',
        options: [
          'A weekly plan that grades attendance and gives one final test at the end.',
          'A sequenced unit with baseline data, rubric checkpoints, reassessment opportunities, and advancement by demonstrated mastery.',
          'A plan with engaging activities but no explicit criteria for progression.'
        ],
        correctIndex: 1
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
