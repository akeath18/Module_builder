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
      "contentLesson": [
        {
          "heading": "How Oxygen Delivery Limits Performance",
          "body": "Aerobic performance depends on how effectively your body delivers and uses oxygen. Cardiac output (heart rate x stroke volume) determines oxygen delivery from the heart, while local muscle factors such as capillary density and mitochondrial enzymes determine oxygen use. VO2max represents the highest rate at which your system can take in and use oxygen during intense exercise."
        },
        {
          "heading": "What Recovery Heart Rate Tells You",
          "body": "Recovery heart rate is a marker of how quickly the autonomic nervous system shifts from stress response back toward resting balance. Faster recovery generally reflects stronger cardiorespiratory efficiency and better readiness for repeated work. Slower recovery suggests that training intensity or density may need to be reduced temporarily."
        },
        {
          "heading": "How to Translate Concepts into Training Decisions",
          "body": "Use VO2-related indicators to estimate aerobic capacity and use recovery trends to adjust early progression speed. If capacity markers are low and recovery is slow, begin with conservative intensity and smaller weekly progression steps. If capacity is higher and recovery is stable, progression can increase gradually while monitoring tolerance."
        }
      ],
      "learningTask": "Use the lesson content above to build a quick concept outline in your notes, then answer the mastery check below on this page.",
      "applicationTask": "Complete the mastery response below by explaining oxygen delivery, recovery kinetics, and progression logic in one integrated answer.",
      "gradebook": {
        "assignmentName": "M1 Aerobic Concept Brief",
        "pointsPossible": 30
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "Using this module's lesson content, explain how oxygen delivery, VO2 indicators, and recovery trends should guide initial aerobic intensity and progression decisions.",
        "keywords": [
          "cardiac output",
          "VO2max",
          "recovery",
          "intensity",
          "progression"
        ]
      },
      "assessedConcepts": [
        "cardiac output and oxygen delivery",
        "VO2max interpretation",
        "recovery heart rate trends",
        "intensity starting point",
        "progression rate decisions"
      ]
    },
    {
      "id": "m2",
      "title": "Module 2: Strength Assessment Logic and Load Prescription Theory",
      "competency": "You will explain the conceptual basis for submaximal testing, 1RM estimation, and intensity-zone selection.",
      "contentLesson": [
        {
          "heading": "Why Strength Intensity Matters",
          "body": "Strength adaptation is strongly influenced by relative load because load affects motor unit recruitment. As intensity increases, higher-threshold motor units are recruited and mechanical tension rises. This is why training percentage zones are used as a conceptual proxy for expected neuromuscular demand."
        },
        {
          "heading": "Why We Use Submaximal Prediction",
          "body": "Direct 1RM testing can be useful but may be inappropriate in some contexts due to skill level, fatigue state, or safety constraints. Submaximal tests combined with prediction equations estimate maximal strength while reducing risk. These models are not perfect; they are estimates that require interpretation rather than blind acceptance."
        },
        {
          "heading": "How to Interpret Intensity Zones",
          "body": "Different intensity bands shift adaptation emphasis. Moderate-to-high relative intensity often supports foundational strength development in novices because it provides sufficient mechanical stimulus while still allowing technical consistency. The concept is dose-response: enough load for adaptation, not so much that quality collapses."
        }
      ],
      "learningTask": "Review the lesson sections above, then complete the mastery check below using the module terms and logic.",
      "applicationTask": "Demonstrate mastery in the response box below by connecting motor unit recruitment, estimation logic, and intensity-zone reasoning.",
      "gradebook": {
        "assignmentName": "M2 Load Prescription Rationale",
        "pointsPossible": 30
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "Based on this module's lesson content, explain why submaximal estimation and moderate-to-high relative intensity are used for novice strength development.",
        "keywords": [
          "motor unit recruitment",
          "submaximal",
          "1RM",
          "intensity",
          "novice"
        ]
      },
      "assessedConcepts": [
        "motor unit recruitment",
        "submaximal prediction logic",
        "1RM estimation limits",
        "relative intensity zones",
        "novice adaptation rationale"
      ]
    },
    {
      "id": "m3",
      "title": "Module 3: Movement Pattern Theory and Structural Balance",
      "competency": "You will explain how movement classification and structural balance principles support safe, effective long-term development.",
      "contentLesson": [
        {
          "heading": "Movement Patterns as a Programming Language",
          "body": "Movement categories such as squat, hinge, push, pull, carry, and rotation help organize training by function rather than by isolated muscles alone. This pattern-based model improves transfer to complex tasks and prevents random exercise selection."
        },
        {
          "heading": "Structural Balance and Force Distribution",
          "body": "Structural balance means opposing muscle groups and movement functions develop in compatible proportions. Persistent imbalance can alter joint mechanics and increase tissue stress over time. Balanced programming distributes load across the system rather than overloading a single pattern repeatedly."
        },
        {
          "heading": "Why Push-Pull Symmetry Matters",
          "body": "When push capacity greatly exceeds pull capacity, scapular and shoulder mechanics may become less efficient under repeated load. Maintaining push-pull symmetry supports posture control, movement quality, and lower cumulative stress risk. The key concept is not exact equality, but appropriate functional balance."
        }
      ],
      "learningTask": "Read each lesson block and then answer the mastery prompt below with pattern-based and structural-balance reasoning.",
      "applicationTask": "In the response box below, explain why movement pattern balance is a core injury-prevention and performance principle.",
      "gradebook": {
        "assignmentName": "M3 Structural Balance Analysis",
        "pointsPossible": 25
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "Using module concepts, explain how movement-pattern organization and structural balance reduce compensation and long-term injury risk.",
        "keywords": [
          "movement pattern",
          "agonist",
          "antagonist",
          "push-pull",
          "injury prevention"
        ]
      },
      "assessedConcepts": [
        "movement pattern classification",
        "agonist-antagonist balance",
        "compensation risk",
        "push-pull symmetry",
        "injury prevention mechanism"
      ]
    },
    {
      "id": "m4",
      "title": "Module 4: Volume, Intensity, and Overload Concepts",
      "competency": "You will explain how volume, intensity, rest, and frequency interact to drive distinct neuromuscular adaptations.",
      "contentLesson": [
        {
          "heading": "Training Variables Are Interdependent",
          "body": "Volume, intensity, rest intervals, and frequency are not independent settings. Changing one variable changes total stress and recovery demand across the week. Effective design requires considering the total adaptive load, not single variables in isolation."
        },
        {
          "heading": "Overload as a Progressive Signal",
          "body": "Overload means the training stress is sufficient to force adaptation beyond current capacity. Progression models (linear, double, undulating) are different ways to distribute overload over time. The goal is sustained adaptation with manageable fatigue, not constant maximal effort."
        },
        {
          "heading": "Volume vs Intensity in Novice Adaptation",
          "body": "In novices, moderate progression in both volume and intensity often works better than extreme emphasis on one variable. Higher volume can improve practice exposure and work capacity, while sufficient intensity provides tension needed for strength gains. Good programming balances these signals across time."
        }
      ],
      "learningTask": "Work through the lesson blocks and complete the mastery response below by comparing how variables change adaptation signals.",
      "applicationTask": "Submit your in-module mastery response below showing how volume, intensity, and overload model choice interact over time.",
      "gradebook": {
        "assignmentName": "M4 Overload Concepts Essay",
        "pointsPossible": 30
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "From this module's lesson content, explain how volume and intensity create different adaptation signals and how overload should be progressed responsibly.",
        "keywords": [
          "volume",
          "intensity",
          "overload",
          "progression",
          "fatigue"
        ]
      },
      "assessedConcepts": [
        "variable interdependence",
        "overload progression models",
        "volume as stress dose",
        "intensity as tension signal",
        "fatigue-management balance"
      ]
    },
    {
      "id": "m5",
      "title": "Module 5: Energy Systems and Concurrent Training Concepts",
      "competency": "You will explain oxidative, glycolytic, and phosphagen system demands and the conceptual basis of the interference effect.",
      "contentLesson": [
        {
          "heading": "Energy System Emphasis by Demand",
          "body": "All three energy systems contribute to exercise, but contribution shifts with intensity and duration. Short, high-power efforts emphasize phosphagen pathways; hard repeated efforts increase glycolytic contribution; sustained work relies heavily on oxidative processes."
        },
        {
          "heading": "The Interference Effect Concept",
          "body": "Concurrent endurance and strength work can sometimes reduce the expected strength or hypertrophy response when stress timing and total load are poorly managed. This is not a reason to remove conditioning, but a reason to structure training logically."
        },
        {
          "heading": "Programming Principles That Reduce Interference",
          "body": "Interference risk decreases when you manage session order, spacing, and cumulative fatigue. Conceptually, you are protecting key adaptation signals by reducing direct competition between high-fatigue endurance stress and high-tension resistance stress in the same recovery window."
        }
      ],
      "learningTask": "Use the lesson content to identify energy-system demands and then answer the mastery check below on interference reduction.",
      "applicationTask": "Complete the in-module mastery response by explaining concurrent-training interference and two principles that minimize it.",
      "gradebook": {
        "assignmentName": "M5 Interference Effect Explanation",
        "pointsPossible": 30
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "Using the module lesson content, explain the interference effect and how timing, spacing, and recovery logic reduce it in concurrent training.",
        "keywords": [
          "interference",
          "energy systems",
          "timing",
          "recovery",
          "concurrent"
        ]
      },
      "assessedConcepts": [
        "oxidative-glycolytic-phosphagen demands",
        "interference effect mechanism",
        "stress timing and spacing",
        "recovery-window protection",
        "concurrent-training logic"
      ]
    },
    {
      "id": "m6",
      "title": "Module 6: Fatigue Monitoring and Autoregulation Theory",
      "competency": "You will explain fatigue typology, performance trend interpretation, and autoregulatory decision logic.",
      "contentLesson": [
        {
          "heading": "Different Types of Fatigue",
          "body": "Fatigue can arise centrally (reduced neural drive) or peripherally (local contractile limitations). In practice, you usually observe performance outcomes rather than isolated mechanisms, so interpretation requires trend analysis over time."
        },
        {
          "heading": "Functional vs Non-Functional Overreaching",
          "body": "Functional overreaching is a planned short-term performance dip followed by positive rebound after recovery. Non-functional overreaching is a prolonged decline without timely rebound and may indicate excessive stress or insufficient recovery support."
        },
        {
          "heading": "Autoregulation as Decision Quality",
          "body": "Autoregulation uses live readiness signals (for example RPE trends, movement quality, and repeat-performance changes) to adjust training dose. The concept is adaptive precision: preserve enough stimulus for progress while preventing unresolved fatigue accumulation."
        }
      ],
      "learningTask": "Read the lesson content carefully and complete the mastery check below using trend-based fatigue interpretation.",
      "applicationTask": "Demonstrate mastery in the in-module response by distinguishing fatigue states and justifying autoregulation adjustments.",
      "gradebook": {
        "assignmentName": "M6 Autoregulation Decision Framework",
        "pointsPossible": 25
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "Using this module's concepts, differentiate functional and non-functional overreaching and explain how trend data guides autoregulation decisions.",
        "keywords": [
          "fatigue",
          "functional overreaching",
          "non-functional",
          "trend",
          "autoregulation"
        ]
      },
      "assessedConcepts": [
        "central vs peripheral fatigue",
        "functional overreaching",
        "non-functional overreaching",
        "trend interpretation",
        "autoregulation decision rules"
      ]
    },
    {
      "id": "m7",
      "title": "Module 7: Coaching Communication and Motivation Concepts",
      "competency": "You will explain how autonomy support, feedback quality, and communication structure influence adherence and performance.",
      "contentLesson": [
        {
          "heading": "Why Motivation Is a Performance Variable",
          "body": "Adherence is not only a personality issue; it is strongly influenced by the coaching environment. Communication that supports autonomy and competence increases engagement, while controlling language can reduce ownership and consistency."
        },
        {
          "heading": "Feedback Quality and Learning",
          "body": "Effective feedback is specific, actionable, and timed to support adjustment. Vague praise or constant criticism both reduce learning quality. High-value feedback links observed behavior to a clear correction pathway."
        },
        {
          "heading": "Autonomy-Supportive Communication",
          "body": "Autonomy support means giving meaningful rationale, offering bounded choices, and reinforcing progress signals. This approach improves perceived competence and self-regulation, which are key predictors of long-term training adherence."
        }
      ],
      "learningTask": "Use the lesson blocks above to compare coaching language types, then complete the mastery response below.",
      "applicationTask": "In the response box, explain how autonomy-supportive communication changes motivation, adherence, and perceived competence.",
      "gradebook": {
        "assignmentName": "M7 Coaching Psychology Reflection",
        "pointsPossible": 20
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "From this module's lesson content, explain why autonomy-supportive communication improves adherence and competence more than controlling language.",
        "keywords": [
          "autonomy",
          "feedback",
          "competence",
          "adherence",
          "motivation"
        ]
      },
      "assessedConcepts": [
        "autonomy support",
        "feedback specificity",
        "competence perception",
        "engagement and adherence",
        "behavior-change mechanism"
      ]
    },
    {
      "id": "m8",
      "title": "Module 8: Periodization and Macrocycle Knowledge Synthesis",
      "competency": "You will synthesize assessment, adaptation, progression, and recovery concepts into a coherent periodization rationale.",
      "contentLesson": [
        {
          "heading": "Periodization as Organized Adaptation",
          "body": "Periodization organizes training stress across phases so adaptation can accumulate without chronic breakdown. Macrocycles set long-term direction, while mesocycles structure shorter adaptation blocks with specific priorities."
        },
        {
          "heading": "Why Deload and Phase Transitions Matter",
          "body": "Deloads are not interruptions; they are planned reductions in stress that restore readiness and preserve progression quality. Phase transitions shift the dominant adaptation target while maintaining enough continuity to avoid detraining effects."
        },
        {
          "heading": "Using Assessment Data Across Phases",
          "body": "Assessment evidence should shape starting points, progression speed, and emphasis by phase. High-quality macrocycle reasoning links initial profile, training-response trends, and phase objectives into one coherent adaptation narrative."
        }
      ],
      "learningTask": "Review all lesson blocks and then complete the mastery check below by synthesizing periodization reasoning across phases.",
      "applicationTask": "Provide your full in-module mastery explanation below showing how assessment evidence shapes phase structure and progression.",
      "gradebook": {
        "assignmentName": "M8 Periodization Concept Defense",
        "pointsPossible": 50
      },
      "masteryCheck": {
        "type": "short-answer",
        "prompt": "Using this module's lesson content, explain how assessment evidence should shape macrocycle structure, deload timing, and progression across phases.",
        "keywords": [
          "assessment",
          "macrocycle",
          "mesocycle",
          "deload",
          "progression"
        ]
      },
      "assessedConcepts": [
        "macrocycle-mesocycle structure",
        "phase objective logic",
        "deload rationale",
        "assessment-driven progression",
        "coherent adaptation narrative"
      ]
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

function renderLessonContent(module) {
  if (Array.isArray(module.contentLesson) && module.contentLesson.length > 0) {
    return `
      <div class="lesson-content">
        <p><strong>Module Lesson Content</strong></p>
        ${module.contentLesson
          .map(
            (block) => `
            <section class="lesson-item">
              <h5>${block.heading || 'Key Concept'}</h5>
              <p>${block.body || ''}</p>
            </section>
          `
          )
          .join('')}
      </div>
    `;
  }

  return `
    <div class="lesson-content">
      <p><strong>Module Lesson Content</strong></p>
      <section class="lesson-item">
        <h5>Instruction</h5>
        <p>${module.instruction || 'Review assigned lesson content before attempting the tasks.'}</p>
      </section>
      <section class="lesson-item">
        <h5>Why This Content Matters</h5>
        <p>${module.contentConnection || 'Connect these concepts to the module competency and mastery prompt.'}</p>
      </section>
    </div>
  `;
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
        <p><strong>Mastery target:</strong> ${m.competency}</p>
        ${renderLessonContent(m)}
        <p><strong>Knowledge practice:</strong> ${m.learningTask || 'Complete the guided knowledge practice for this module.'}</p>
        <p><strong>Knowledge demonstration:</strong> ${m.applicationTask || 'Complete and submit the knowledge demonstration response for this module.'}</p>
        ${renderGradebook(m)}
        ${renderAssessedConcepts(m)}
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

function renderAssessedConcepts(module) {
  const concepts = Array.isArray(module.assessedConcepts) ? module.assessedConcepts : [];
  if (!concepts.length) return '';
  return `
    <div class="assessed-concepts">
      <p><strong>Directly Assessed In This Module</strong></p>
      <ul>
        ${concepts.map((c) => `<li>${c}</li>`).join('')}
      </ul>
    </div>
  `;
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
      <p class="small"><strong>Assessment rule:</strong> Your response should directly address the assessed concepts listed above.</p>
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
        setMessage(el.studentMessage, 'Not yet mastered. Revisit the module lesson content above, then resubmit.', 'warn');
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
