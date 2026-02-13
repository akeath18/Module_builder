const CONFIG_KEY = 'module-studio-config-v2';
const PROGRESS_KEY = 'module-studio-progress-v2';

const el = {
  configInput: document.getElementById('configInput'),
  btnSample: document.getElementById('btnSample'),
  btnSave: document.getElementById('btnSave'),
  btnResetProgress: document.getElementById('btnResetProgress'),
  setupMessage: document.getElementById('setupMessage'),
  studentMessage: document.getElementById('studentMessage'),
  courseHeader: document.getElementById('courseHeader'),
  progress: document.getElementById('progress'),
  modules: document.getElementById('modules')
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
      learningTask: 'Using Promoting Active Lifestyles in Schools, create a concept map showing competency targets, evidence, and advancement rules.',
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
      learningTask: 'Map at least 3 PE standards to outcomes and write one measurable competency for each.',
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
      learningTask: 'Use Exercise Testing and Prescription to build a baseline protocol including safety screen, test sequence, and scoring sheet.',
      masteryCheck: {
        type: 'short-answer',
        prompt: 'Describe your baseline protocol and explain how it supports valid before/after comparisons.',
        keywords: ['baseline', 'protocol', 'valid']
      }
    },
    {
      id: 'm4',
      title: 'Module 4: Performance Rubrics and Mastery Levels',
      competency: 'Create a rubric with clear novice, developing, proficient, and advanced performance descriptors.',
      learningTask: 'Draft a 4-level rubric for one movement competency and include observable criteria.',
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
      learningTask: 'Use NSCA Guide to High School Strength and Conditioning to draft a 2-week microcycle with warm-up, main lifts, and recovery.',
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
      learningTask: 'Create a tiered plan for students below, at, and above target mastery.',
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
      learningTask: 'Design a feedback protocol with clear reassessment windows and advancement cutoffs.',
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
      learningTask: 'Produce a capstone plan that includes timeline, assessments, differentiation, and reporting.',
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

function loadState() {
  const savedConfig = localStorage.getItem(CONFIG_KEY);
  const savedProgress = localStorage.getItem(PROGRESS_KEY);
  state.config = savedConfig ? parseJSON(savedConfig, sampleConfig) : sampleConfig;
  state.progress = savedProgress ? parseJSON(savedProgress, {}) : {};
  el.configInput.value = JSON.stringify(state.config, null, 2);
  setMessage(
    el.setupMessage,
    'Start with "Load Sample", edit JSON, then click "Save Config" to apply changes to the student view.',
    'warn'
  );
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

function render() {
  const config = state.config;
  const modules = config.modules || [];

  el.courseHeader.innerHTML = `
    <h3>${config.title || 'Untitled Course'}</h3>
    <p class="small"><strong>Instructor:</strong> ${config.instructor || 'N/A'}</p>
    <p><strong>Course outcomes</strong></p>
    <ul>${(config.outcomes || []).map((o) => `<li>${o}</li>`).join('')}</ul>
    <p><strong>Resources provided by instructor</strong></p>
    <ul>
      ${(config.resources || [])
        .map((r) => `<li><strong>${r.title}</strong> — ${r.citation || 'n/a'}<br><span class="small">${r.notes || ''}</span></li>`)
        .join('')}
    </ul>
  `;

  const done = modules.filter((m) => state.progress[m.id]?.done).length;
  el.progress.innerHTML = `<p><strong>Progress:</strong> ${done}/${modules.length} modules mastered</p>`;

  el.modules.innerHTML = modules
    .map((m, idx) => {
      const unlocked = idx === 0 || Boolean(state.progress[modules[idx - 1].id]?.done);
      const doneState = Boolean(state.progress[m.id]?.done);
      return `
      <article class="module ${unlocked ? '' : 'locked'}">
        <h4>${m.title}<span class="status ${doneState ? 'done' : ''}">${doneState ? 'Mastered' : unlocked ? 'Open' : 'Locked'}</span></h4>
        <p><strong>Competency:</strong> ${m.competency}</p>
        <p><strong>Learning task:</strong> ${m.learningTask || 'Review module resources and complete guided task.'}</p>
        ${renderCheck(m, unlocked, doneState)}
      </article>
      `;
    })
    .join('');

  bindChecks();
  maybeSignalCompletion();
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
      const pass = evaluate(module);

      if (pass) {
        state.progress[moduleId] = {
          done: true,
          completedAt: new Date().toISOString()
        };
        saveProgress();
        setMessage(el.studentMessage, `Mastery demonstrated for ${module.title}.`, 'ok');
        render();
      } else {
        setMessage(el.studentMessage, 'Not yet mastered. Revisit resources and competency criteria, then resubmit.', 'warn');
      }
    });
  });
}

function evaluate(module) {
  const check = module.masteryCheck || {};
  const checkType = String(check.type || '').toLowerCase();

  if (checkType === 'mcq') {
    const selected = document.querySelector(`input[name="${module.id}"]:checked`);
    if (!selected) return false;
    return Number(selected.value) === Number(check.correctIndex);
  }

  const answerEl = document.querySelector(`[data-answer="${module.id}"]`);
  const answer = answerEl?.value?.trim() || '';
  if (!answer) return false;

  const keywords = check.keywords || [];
  if (!keywords.length) return answer.length >= 40;
  const normalized = answer.toLowerCase();
  const hits = keywords.filter((k) => normalized.includes(String(k).toLowerCase())).length;
  return hits >= Math.ceil(keywords.length * 0.67);
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

  if (state.config.gradePassbackUrl && state.config.gradePassbackToken) {
    try {
      await fetch(state.config.gradePassbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.config.gradePassbackToken}`
        },
        body: JSON.stringify({ ...payload, score: 1 })
      });
    } catch {
      setMessage(el.studentMessage, 'Completed locally, but grade passback failed.', 'warn');
    }
  }

  setMessage(el.studentMessage, 'All modules mastered. Completion signal sent.', 'ok');
}

el.btnSample.addEventListener('click', () => {
  state.config = JSON.parse(JSON.stringify(sampleConfig));
  el.configInput.value = JSON.stringify(state.config, null, 2);
  localStorage.setItem(CONFIG_KEY, JSON.stringify(state.config));
  setMessage(
    el.setupMessage,
    'Sample loaded and applied. Next: edit JSON, then click "Save Config" to apply your custom version.',
    'ok'
  );
  render();
});

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
  setMessage(el.setupMessage, 'Configuration saved and applied to the student view.', 'ok');
  render();
});

el.btnResetProgress.addEventListener('click', () => {
  state.progress = {};
  saveProgress();
  setMessage(el.setupMessage, 'Student progress reset to zero for all modules.', 'ok');
  render();
});

el.configInput.addEventListener('input', () => {
  setMessage(
    el.setupMessage,
    'Unsaved edits detected. Click "Save Config" to apply changes to the student view.',
    'warn'
  );
});

loadState();
