/**
 * ============================================================================
 * TRAFFIC VIOLATION SEQUENCE DETECTOR - DFA AUTOMATON ENGINE & SIMULATOR
 * ============================================================================
 */

// --- 1. PATTERN CONFIGURATIONS ---
// --- 1. UNIFIED DFA & SCENARIO CONFIGURATIONS ---
const UNIFIED_DFA = {
    states: [
        { id: 'q0', label: 'Start / Clear', isStart: true, isAccept: false, x: 10, y: 50 },
        { id: 'q1', label: 'Red Light', isStart: false, isAccept: false, x: 38, y: 15 },
        { id: 'q2', label: 'Red+Speed', isStart: false, isAccept: false, x: 65, y: 15 },
        { id: 'q3', label: 'ACCEPT: R→S→H', isStart: false, isAccept: true, x: 92, y: 15 },
        { id: 'q4', label: 'Stop Sign', isStart: false, isAccept: false, x: 45, y: 50 },
        { id: 'q5', label: 'ACCEPT: T→U', isStart: false, isAccept: true, x: 80, y: 50 },
        { id: 'q6', label: 'Speeding', isStart: false, isAccept: false, x: 38, y: 85 },
        { id: 'q7', label: 'Speed+Weave', isStart: false, isAccept: false, x: 65, y: 85 },
        { id: 'q8', label: 'ACCEPT: S→W→G', isStart: false, isAccept: true, x: 92, y: 85 }
    ],
    alphabet: [
        { symbol: 'R', name: '🚦 Red Light', icon: '🚦' },
        { symbol: 'S', name: '🏎️ Speeding', icon: '🏎️' },
        { symbol: 'H', name: '🪖 No Helmet', icon: '🪖' },
        { symbol: 'T', name: '🛑 Stop Ignored', icon: '🛑' },
        { symbol: 'U', name: '↩️ Illegal U-Turn', icon: '↩️' },
        { symbol: 'W', name: '🔀 Lane Weaving', icon: '🔀' },
        { symbol: 'G', name: '🚗 Tailgating', icon: '🚗' },
        { symbol: 'X', name: '❌ Other Event', icon: '❌' }
    ],
    initialState: 'q0',
    acceptStates: ['q3', 'q5', 'q8'],
    transitions: {
        'q0': { 'R': 'q1', 'S': 'q6', 'H': 'q0', 'T': 'q4', 'U': 'q0', 'W': 'q0', 'G': 'q0', 'X': 'q0' },
        'q1': { 'R': 'q1', 'S': 'q2', 'H': 'q0', 'T': 'q4', 'U': 'q0', 'W': 'q0', 'G': 'q0', 'X': 'q0' },
        'q2': { 'R': 'q1', 'S': 'q6', 'H': 'q3', 'T': 'q4', 'U': 'q0', 'W': 'q7', 'G': 'q0', 'X': 'q0' },
        'q3': { 'R': 'q1', 'S': 'q6', 'H': 'q0', 'T': 'q4', 'U': 'q0', 'W': 'q0', 'G': 'q0', 'X': 'q0' },
        'q4': { 'R': 'q1', 'S': 'q6', 'H': 'q0', 'T': 'q4', 'U': 'q5', 'W': 'q0', 'G': 'q0', 'X': 'q0' },
        'q5': { 'R': 'q1', 'S': 'q6', 'H': 'q0', 'T': 'q4', 'U': 'q0', 'W': 'q0', 'G': 'q0', 'X': 'q0' },
        'q6': { 'R': 'q1', 'S': 'q6', 'H': 'q0', 'T': 'q4', 'U': 'q0', 'W': 'q7', 'G': 'q0', 'X': 'q0' },
        'q7': { 'R': 'q1', 'S': 'q6', 'H': 'q0', 'T': 'q4', 'U': 'q0', 'W': 'q0', 'G': 'q8', 'X': 'q0' },
        'q8': { 'R': 'q1', 'S': 'q6', 'H': 'q0', 'T': 'q4', 'U': 'q0', 'W': 'q0', 'G': 'q0', 'X': 'q0' }
    },
    edges: [
        { from: 'q0', to: 'q1', label: 'R', type: 'forward' },
        { from: 'q1', to: 'q2', label: 'S', type: 'forward' },
        { from: 'q2', to: 'q3', label: 'H', type: 'forward' },
        { from: 'q0', to: 'q4', label: 'T', type: 'forward' },
        { from: 'q4', to: 'q5', label: 'U', type: 'forward' },
        { from: 'q0', to: 'q6', label: 'S', type: 'forward' },
        { from: 'q6', to: 'q7', label: 'W', type: 'forward' },
        { from: 'q7', to: 'q8', label: 'G', type: 'forward' },
        { from: 'q0', to: 'q0', label: 'Others', type: 'loop' },
        { from: 'q1', to: 'q1', label: 'R', type: 'loop' },
        { from: 'q6', to: 'q6', label: 'S', type: 'loop' }
    ]
};

const SCENARIOS = {
    'red_speed_helmet': {
        name: 'Red Light → Speeding → No Helmet (Two-Wheeler)',
        vehicleType: 'two-wheeler',
        vehicleEmoji: '🏍️',
        targetSeq: ['R', 'S', 'H'],
        targetSeqText: 'Red Light (R) → Speeding (S) → No Helmet (H)',
        pipeline: [
            { symbol: 'R', text: 'Red Light', icon: '🚦' },
            { symbol: 'S', text: 'Speeding', icon: '🏎️' },
            { symbol: 'H', text: 'No Helmet', icon: '🪖' }
        ]
    },
    'stop_uturn': {
        name: 'Stop Sign Ignored → Illegal U-Turn (Four-Wheeler)',
        vehicleType: 'four-wheeler',
        vehicleEmoji: '🚗',
        targetSeq: ['T', 'U'],
        targetSeqText: 'Stop Sign Ignored (T) → Illegal U-Turn (U)',
        pipeline: [
            { symbol: 'T', text: 'Stop Ignored', icon: '🛑' },
            { symbol: 'U', text: 'Illegal U-Turn', icon: '↩️' }
        ]
    },
    'speed_weaving': {
        name: 'Speeding → Lane Weaving → Tailgating (Four-Wheeler)',
        vehicleType: 'four-wheeler',
        vehicleEmoji: '🚗',
        targetSeq: ['S', 'W', 'G'],
        targetSeqText: 'Speeding (S) → Lane Weaving (W) → Tailgating (G)',
        pipeline: [
            { symbol: 'S', text: 'Speeding', icon: '🏎️' },
            { symbol: 'W', text: 'Lane Weaving', icon: '🔀' },
            { symbol: 'G', text: 'Tailgating', icon: '🚗' }
        ]
    }
};

// --- 1B. CENTRALIZED VIOLATION FINE MAPPING ---
// Fine amounts shown are simulation/demo values and may not represent current legal penalties.
const violationFines = {
    R: { name: 'Red Signal Violation', fine: 500, icon: '🚦' },
    S: { name: 'Speeding', fine: 1000, icon: '🏎️' },
    H: { name: 'No Helmet', fine: 500, icon: '🪖' },
    T: { name: 'Stop Sign Ignored', fine: 300, icon: '🛑' },
    U: { name: 'Illegal U-Turn', fine: 500, icon: '↩️' },
    W: { name: 'Lane Weaving', fine: 750, icon: '🔀' },
    G: { name: 'Tailgating', fine: 800, icon: '🚗' },
    X: { name: 'Other Event (No Violation)', fine: 0, icon: '❌' }
};

// --- 2. WEB AUDIO SYNTHESIZER ---
class SoundController {
    constructor() {
        this.ctx = null;
        this.soundEnabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
    }

    playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.15) {
        if (!this.soundEnabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            // Ignore audio context errors
        }
    }

    playClick() {
        this.playTone(600, 'sine', 0.05, 0.1);
    }

    playAdvance() {
        this.playTone(523.25, 'triangle', 0.12, 0.15); // C5
        setTimeout(() => this.playTone(659.25, 'triangle', 0.12, 0.15), 80); // E5
    }

    playReset() {
        this.playTone(300, 'sawtooth', 0.15, 0.1);
    }

    playViolationSiren() {
        if (!this.soundEnabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.linearRampToValueAtTime(1200, now + 0.2);
        osc.frequency.linearRampToValueAtTime(800, now + 0.4);
        osc.frequency.linearRampToValueAtTime(1200, now + 0.6);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.7);
    }
}

const audioFX = new SoundController();

// --- 3. APPLICATION STATE ---
const AppState = {
    currentPatternKey: 'red_speed_helmet',
    activeScenario: SCENARIOS['red_speed_helmet'],
    dfa: UNIFIED_DFA,
    currentState: 'q0',
    stepHistory: [],
    isSimulating: false,
    autoPlayTimer: null,
    stepCount: 0,
    speedMs: 1200,
    // Fine system state
    totalFine: 0,
    violationCount: 0,
    violationHistory: [],
    driverInfo: {
        driverId: 'DRV-001',
        vehicleNumber: 'MH-XX-1234'
    }
};

// --- 4. DOM ELEMENTS REFERENCES ---
const elements = {
    patternSelect: document.getElementById('pattern-select'),
    speedSelect: document.getElementById('speed-select'),
    startBtn: document.getElementById('start-btn'),
    stepBtn: document.getElementById('step-btn'),
    resetBtn: document.getElementById('reset-btn'),
    soundToggleBtn: document.getElementById('sound-toggle-btn'),
    soundIcon: document.getElementById('sound-icon'),
    helpModalBtn: document.getElementById('help-modal-btn'),
    helpModal: document.getElementById('help-modal'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    modalOkBtn: document.getElementById('modal-ok-btn'),
    
    // Scene Elements
    eventBannerText: document.getElementById('event-banner-text'),
    speedometer: document.getElementById('speedometer'),
    plateNumber: document.getElementById('plate-number'),
    lightRed: document.getElementById('light-red'),
    lightYellow: document.getElementById('light-yellow'),
    lightGreen: document.getElementById('light-green'),
    carWrapper: document.getElementById('car-wrapper'),
    carElement: document.getElementById('car-element'),
    helmetIcon: document.getElementById('helmet-icon'),
    violationTag: document.getElementById('violation-tag'),
    cctvLaser: document.getElementById('cctv-laser'),
    carBody: document.getElementById('car-body'),
    seatbeltIcon: document.getElementById('seatbelt-icon'),
    stopSignWrapper: document.getElementById('stop-sign-wrapper'),
    stopSign: document.getElementById('stop-sign'),
    leadCarWrapper: document.getElementById('lead-car-wrapper'),
    leadCarElement: document.getElementById('lead-car-element'),
    proximityLine: document.getElementById('proximity-line'),
    distanceRadar: document.getElementById('distance-radar'),
    
    // Pipeline & DFA Graph
    pipelineContainer: document.getElementById('pipeline-container'),
    pipelinePatternText: document.getElementById('pipeline-pattern-text'),
    pipelineOverallStatus: document.getElementById('pipeline-overall-status'),
    dfaContainer: document.getElementById('dfa-container'),
    dfaNodeLayer: document.getElementById('dfa-node-layer'),
    dfaSvg: document.getElementById('dfa-svg'),
    svgEdgesGroup: document.getElementById('svg-edges-group'),
    particle: document.getElementById('particle'),
    
    // Controls & Console
    manualBtnGrid: document.getElementById('manual-btn-grid'),
    customSeqInput: document.getElementById('custom-sequence-input'),
    runCustomBtn: document.getElementById('run-custom-btn'),
    loadPresetBtn: document.getElementById('load-preset-btn'),
    
    // Status Cards & Console
    statusCard: document.getElementById('status-card'),
    statusText: document.getElementById('status-text'),
    statusSub: document.getElementById('status-sub'),
    currentStateDisplay: document.getElementById('current-state-display'),
    currentStateName: document.getElementById('current-state-name'),
    logConsole: document.getElementById('log-console'),
    logCount: document.getElementById('log-count'),
    clearLogsBtn: document.getElementById('clear-logs-btn'),
    
    // Theory Elements
    formalTupleList: document.getElementById('formal-tuple-list'),
    transitionTableHead: document.getElementById('transition-table-head'),
    transitionTableBody: document.getElementById('transition-table-body'),
    
    // Overlay
    violationOverlay: document.getElementById('violation-overlay'),
    overlaySeqText: document.getElementById('overlay-seq-text'),
    dismissOverlayBtn: document.getElementById('dismiss-overlay-btn'),

    // Fine System Elements
    totalFineDisplay: document.getElementById('total-fine-display'),
    violationCountDisplay: document.getElementById('violation-count-display'),
    driverIdDisplay: document.getElementById('driver-id-display'),
    vehicleNumDisplay: document.getElementById('vehicle-num-display'),
    driverViolationCount: document.getElementById('driver-violation-count'),
    driverTotalFine: document.getElementById('driver-total-fine'),
    violationHistoryBody: document.getElementById('violation-history-body'),
    violationAlertToast: document.getElementById('violation-alert-toast'),
    alertViolationName: document.getElementById('alert-violation-name'),
    alertFineAmount: document.getElementById('alert-fine-amount'),
    alertStatusText: document.getElementById('alert-status-text'),
    fineSummaryAmount: document.getElementById('fine-summary-amount')
};

// --- 5. INITIALIZATION & PATTERN SWITCHER ---
function initApp() {
    setupEventListeners();
    loadPattern(AppState.currentPatternKey);
    initBackgroundCanvas();
}

function loadPattern(patternKey) {
    AppState.currentPatternKey = patternKey;
    AppState.activeScenario = SCENARIOS[patternKey];
    AppState.currentState = AppState.dfa.initialState;
    AppState.stepCount = 0;
    AppState.stepHistory = [];
    stopAutoPlay();

    // Render UI Components for active pattern
    renderPipelineCards();
    renderDFANodes();
    renderManualButtons();
    renderTheorySection();
    
    // Delay SVG rendering slightly to allow DOM layout bounding boxes to calculate
    setTimeout(updateSVGEdges, 50);

    resetUIState();
}

// --- 6. UI RENDERERS ---

// Pipeline Cards Renderer
function renderPipelineCards() {
    elements.pipelinePatternText.textContent = AppState.activeScenario.targetSeqText;
    elements.pipelineContainer.innerHTML = '';

    AppState.activeScenario.pipeline.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = `pipeline-card ${idx === 0 ? 'active-step' : ''}`;
        card.id = `pipe-card-${idx}`;
        card.innerHTML = `
            <span class="pipeline-card-icon">${item.icon}</span>
            <span class="pipeline-card-text">${item.text}</span>
        `;
        elements.pipelineContainer.appendChild(card);

        if (idx < AppState.activeScenario.pipeline.length - 1) {
            const arrow = document.createElement('span');
            arrow.className = 'pipeline-arrow';
            arrow.textContent = '→';
            elements.pipelineContainer.appendChild(arrow);
        }
    });

    elements.pipelineOverallStatus.textContent = 'Searching Sequence';
    elements.pipelineOverallStatus.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    elements.pipelineOverallStatus.style.color = 'var(--text-muted)';
}

// DFA State Nodes Renderer
function renderDFANodes() {
    elements.dfaNodeLayer.innerHTML = '';

    AppState.dfa.states.forEach((state) => {
        const node = document.createElement('div');
        node.className = `dfa-node ${state.isAccept ? 'accept-state' : ''} ${state.id === AppState.currentState ? 'active' : ''}`;
        node.id = `node-${state.id}`;
        
        node.style.left = `${state.x}%`;
        node.style.top = `${state.y}%`;

        node.innerHTML = `
            <span class="current-badge">CURRENT</span>
            <span class="node-id">${state.id}</span>
            <span class="node-desc">${state.label}</span>
        `;

        node.addEventListener('click', () => {
            audioFX.playClick();
            logConsoleMessage(`[STATE INSPECT] Node <strong>${state.id}</strong>: ${state.label} (${state.isAccept ? 'ACCEPTING STATE' : 'Non-accepting state'})`);
        });

        elements.dfaNodeLayer.appendChild(node);
    });
}

// Manual Buttons Renderer
function renderManualButtons() {
    elements.manualBtnGrid.innerHTML = '';

    AppState.dfa.alphabet.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-action';
        btn.innerHTML = `${item.icon} ${item.name} (${item.symbol})`;
        btn.addEventListener('click', () => {
            audioFX.playClick();
            processSymbol(item.symbol, item.name);
        });
        elements.manualBtnGrid.appendChild(btn);
    });
}

// Theory Section & Transition Matrix Renderer
function renderTheorySection() {
    const pattern = AppState.dfa;

    // 1. 5-Tuple List
    const stateIds = pattern.states.map(s => s.id).join(', ');
    const alphabetSymbols = pattern.alphabet.map(a => `${a.symbol}: ${a.name.replace(/[^a-zA-Z0-9\s]/g, '').trim()}`).join(', ');
    const acceptIds = pattern.acceptStates.join(', ');

    elements.formalTupleList.innerHTML = `
        <li><strong>Q (States)</strong> = { ${stateIds} }</li>
        <li><strong>&Sigma; (Alphabet)</strong> = { ${alphabetSymbols} }</li>
        <li><strong>q<sub>0</sub> (Start State)</strong> = ${pattern.initialState}</li>
        <li><strong>F (Accepting States)</strong> = { ${acceptIds} }</li>
        <li><strong>&delta; (Transition Function)</strong> = Matrix mapped below</li>
    `;

    // 2. Transition Table Header
    const alphaList = pattern.alphabet;
    let headHTML = `<tr><th>State (q)</th>`;
    alphaList.forEach(a => {
        headHTML += `<th>${a.symbol} (${a.name.split(' ')[1] || a.name})</th>`;
    });
    headHTML += `</tr>`;
    elements.transitionTableHead.innerHTML = headHTML;

    // 3. Transition Table Body
    let bodyHTML = '';
    pattern.states.forEach(state => {
        const isStart = state.id === pattern.initialState;
        const isAccept = pattern.acceptStates.includes(state.id);
        const prefix = isStart ? '→ ' : (isAccept ? '* ' : '');

        bodyHTML += `<tr id="tr-state-${state.id}">`;
        bodyHTML += `<td><strong>${prefix}${state.id}</strong></td>`;

        alphaList.forEach(a => {
            const nextState = pattern.transitions[state.id][a.symbol] || pattern.initialState;
            const isAccTarget = pattern.acceptStates.includes(nextState);
            const cellStyle = isAccTarget ? 'style="color: var(--green-accept); font-weight: bold;"' : '';
            bodyHTML += `<td id="td-${state.id}-${a.symbol}" ${cellStyle}>${nextState}</td>`;
        });

        bodyHTML += `</tr>`;
    });
    elements.transitionTableBody.innerHTML = bodyHTML;
}

// --- 7. SVG GRAPH CONNECTIONS & ANIMATIONS ---
function updateSVGEdges() {
    const svg = elements.dfaSvg;
    const group = elements.svgEdgesGroup;
    group.innerHTML = '';

    const svgRect = svg.getBoundingClientRect();
    if (svgRect.width === 0) return;

    window.getNodeCenter = (stateId) => {
        const el = document.getElementById(`node-${stateId}`);
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
            x: r.left + r.width / 2 - svgRect.left,
            y: r.top + r.height / 2 - svgRect.top
        };
    };

    const nodeRadius = 36;
    const pattern = AppState.dfa;

    pattern.edges.forEach(edge => {
        const p1 = window.getNodeCenter(edge.from);
        const p2 = window.getNodeCenter(edge.to);
        const pathId = `edge-${edge.from}-${edge.to}`;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('id', pathId);
        
        let d = '';
        let textX = 0, textY = 0;

        if (edge.type === 'loop') {
            const cx = p1.x;
            const cy = p1.y - nodeRadius;
            d = `M ${p1.x - 10} ${p1.y - nodeRadius + 5} C ${p1.x - 40} ${p1.y - nodeRadius - 40}, ${p1.x + 40} ${p1.y - nodeRadius - 40}, ${p1.x + 10} ${p1.y - nodeRadius + 5}`;
            textX = cx;
            textY = cy - 25;
        } else if (edge.type === 'curve') {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const cx = p1.x + dx / 2;
            const cy = p1.y + dy / 2 - 50; 
            
            const angle1 = Math.atan2(cy - p1.y, cx - p1.x);
            const angle2 = Math.atan2(p2.y - cy, p2.x - cx);
            
            const sx = p1.x + nodeRadius * Math.cos(angle1);
            const sy = p1.y + nodeRadius * Math.sin(angle1);
            const ex = p2.x - nodeRadius * Math.cos(angle2);
            const ey = p2.y - nodeRadius * Math.sin(angle2);
            
            d = `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`;
            textX = cx;
            textY = cy - 10;
        } else {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const angle = Math.atan2(dy, dx);
            const sx = p1.x + nodeRadius * Math.cos(angle);
            const sy = p1.y + nodeRadius * Math.sin(angle);
            const ex = p2.x - nodeRadius * Math.cos(angle);
            const ey = p2.y - nodeRadius * Math.sin(angle);
            
            d = `M ${sx} ${sy} L ${ex} ${ey}`;
            textX = (sx + ex) / 2;
            textY = (sy + ey) / 2 - 10;
        }

        path.setAttribute('d', d);
        path.setAttribute('stroke', 'rgba(0, 243, 255, 0.3)');
        path.setAttribute('stroke-width', '2.5');
        path.setAttribute('fill', 'none');
        path.setAttribute('marker-end', edge.type === 'loop' ? 'url(#arrow-loop)' : 'url(#arrow-default)');
        group.appendChild(path);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', textX);
        text.setAttribute('y', textY);
        text.setAttribute('fill', 'var(--text-muted)');
        text.setAttribute('font-size', '12');
        text.setAttribute('font-weight', '600');
        text.setAttribute('font-family', 'var(--font-code)');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = edge.label;
        group.appendChild(text);
    });
}

// Animate glowing particle travelling along edge path
function animateEdgeParticle(fromState, toState, duration = 800) {
    let pathId = `edge-${fromState}-${toState}`;
    let path = document.getElementById(pathId);
    let tempPath = false;

    if (!path) {
        // Create a temporary dashed path for transitions not statically drawn
        const svg = elements.dfaSvg;
        const group = elements.svgEdgesGroup;
        const p1 = window.getNodeCenter(fromState);
        const p2 = window.getNodeCenter(toState);
        
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('id', pathId);
        path.setAttribute('d', `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`);
        path.setAttribute('stroke', 'rgba(255, 0, 85, 0.4)');
        path.setAttribute('stroke-dasharray', '5,5');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        group.appendChild(path);
        tempPath = true;
    }

    const particle = elements.particle;
    const pathLen = path.getTotalLength();
    particle.setAttribute('opacity', '1');
    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const point = path.getPointAtLength(progress * pathLen);

        particle.setAttribute('cx', point.x);
        particle.setAttribute('cy', point.y);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            particle.setAttribute('opacity', '0');
            if (tempPath) {
                path.remove();
            }
        }
    }
    requestAnimationFrame(step);
}

// --- 8. DFA TRANSITION ENGINE & EXECUTION ---

function processSymbol(inputSymbol, labelName = '') {
    AppState.stepCount++;
    const prev = AppState.currentState;
    const pattern = AppState.dfa;
    const next = pattern.transitions[prev]?.[inputSymbol] || pattern.initialState;
    const isAccepted = pattern.acceptStates.includes(next);

    AppState.currentState = next;

    // --- FINE SYSTEM: Apply fine immediately for this violation (independent of DFA) ---
    const fineInfo = violationFines[inputSymbol] || { name: `Unknown (${inputSymbol})`, fine: 0, icon: '❓' };
    const currentFine = fineInfo.fine;
    const isActualViolation = currentFine > 0;

    if (isActualViolation) {
        AppState.violationCount++;
        AppState.totalFine += currentFine;
    }

    // Record to violation history
    const historyEntry = {
        no: AppState.violationCount > 0 ? (isActualViolation ? AppState.violationCount : '-') : '-',
        symbol: inputSymbol,
        violation: fineInfo.name,
        dfaState: next,
        fine: currentFine,
        status: isActualViolation ? 'Fine Imposed' : 'No Fine'
    };
    AppState.violationHistory.push(historyEntry);

    // 1. Update Visual Road Scene
    updateRoadVisuals(inputSymbol);

    // 2. Update Graph Visual Highlights
    updateDFAHighlights(prev, next, inputSymbol);

    // 3. Animate Edge Particle if forward step
    if (prev !== next) {
        animateEdgeParticle(prev, next, AppState.speedMs * 0.7);
        audioFX.playAdvance();
    } else {
        audioFX.playClick();
    }

    // 4. Update Pipeline Steps
    updatePipelineCards(next);

    // 5. Highlight Transition Table Cell
    highlightMatrixCell(prev, inputSymbol);

    // 6. Update Status Cards & Log Console
    updateStatusCards(prev, next, inputSymbol, isAccepted);
    logStepEntry(AppState.stepCount, labelName || inputSymbol, inputSymbol, prev, next, isAccepted, fineInfo, currentFine);

    // 7. Update Fine System UI
    updateFineSummary();
    updateDriverInfo();
    addViolationHistoryRow(historyEntry);

    // 8. Show Violation Alert Toast (only for actual fines)
    if (isActualViolation) {
        showViolationAlertToast(fineInfo.name, currentFine);
    }

    // 9. Trigger Celebration if Accepted
    if (isAccepted) {
        audioFX.playViolationSiren();
        triggerViolationOverlay();
        triggerConfetti();
    }
}

// Update Road Scene
function updateRoadVisuals(symbol) {
    const bannerText = elements.eventBannerText;
    const lightRed = elements.lightRed;
    const lightYellow = elements.lightYellow;
    const lightGreen = elements.lightGreen;
    const carWrapper = elements.carWrapper;
    const car = elements.carElement;
    const carBody = elements.carBody;
    const helmetIcon = elements.helmetIcon;
    const seatbeltIcon = elements.seatbeltIcon;
    const speedometer = elements.speedometer;
    const violationTag = elements.violationTag;
    const stopSignWrapper = elements.stopSignWrapper;
    const stopSign = elements.stopSign;
    const leadCarWrapper = elements.leadCarWrapper;
    const proximityLine = elements.proximityLine;

    const pattern = AppState.activeScenario;
    const patternKey = AppState.currentPatternKey;

    // Reset visual dynamic classes & tags
    car.classList.remove('speeding', 'uturning', 'weaving');
    if (stopSign) stopSign.classList.remove('ignored');
    violationTag.style.display = 'none';
    if (proximityLine) proximityLine.style.display = 'none';

    // Set vehicle emoji based on pattern type
    if (carBody) {
        carBody.textContent = pattern.vehicleEmoji || '🚗';
    }

    // 1. Pattern 1: Red Light (R) → Speeding (S) → No Helmet (H) — TWO-WHEELER 🏍️
    if (patternKey === 'red_speed_helmet') {
        if (stopSignWrapper) stopSignWrapper.style.display = 'none';
        if (leadCarWrapper) leadCarWrapper.style.display = 'none';
        if (seatbeltIcon) seatbeltIcon.style.display = 'none';

        if (symbol === 'R') {
            bannerText.textContent = 'EVENT: 🚦 RED LIGHT RUNNING DETECTED';
            lightRed.classList.add('active');
            lightYellow.classList.remove('active');
            lightGreen.classList.remove('active');
            carWrapper.style.left = '38%';
            speedometer.textContent = '40 km/h';
            helmetIcon.style.display = 'block';
        } else if (symbol === 'S') {
            bannerText.textContent = 'EVENT: 🏎️ SPEEDING VIOLATION (98 km/h)';
            carWrapper.style.left = '65%';
            car.classList.add('speeding');
            speedometer.textContent = '98 km/h';
            helmetIcon.style.display = 'block';
        } else if (symbol === 'H') {
            bannerText.textContent = 'EVENT: 🪖 NO HELMET — RIDER VIOLATION';
            helmetIcon.style.display = 'none'; // Helmet removed
            carWrapper.style.left = '85%';
            speedometer.textContent = '105 km/h';
            violationTag.style.display = 'block';
            violationTag.textContent = 'NO HELMET';
        } else {
            bannerText.textContent = 'EVENT: ❌ NORMAL RIDING (GREEN LIGHT)';
            carWrapper.style.left = '20%';
            lightRed.classList.remove('active');
            lightGreen.classList.add('active');
            speedometer.textContent = '45 km/h';
            helmetIcon.style.display = 'block';
        }
    } 
    // 2. Pattern 2: Stop Sign Ignored (T) → Illegal U-Turn (U) — FOUR-WHEELER 🚗
    else if (patternKey === 'stop_uturn') {
        if (stopSignWrapper) stopSignWrapper.style.display = 'flex';
        if (leadCarWrapper) leadCarWrapper.style.display = 'none';
        helmetIcon.style.display = 'none';
        if (seatbeltIcon) seatbeltIcon.style.display = 'block';
        lightRed.classList.remove('active');
        lightGreen.classList.add('active');

        if (symbol === 'T') {
            bannerText.textContent = 'EVENT: 🛑 STOP SIGN IGNORED (BLEW THROUGH LINE)';
            if (stopSign) stopSign.classList.add('ignored');
            carWrapper.style.left = '52%';
            speedometer.textContent = '55 km/h';
            violationTag.style.display = 'block';
            violationTag.textContent = 'IGNORED STOP';
        } else if (symbol === 'U') {
            bannerText.textContent = 'EVENT: ↩️ ILLEGAL U-TURN EXECUTED ON ROAD';
            carWrapper.style.left = '68%';
            // Force animation re-trigger by removing class, forcing reflow, then re-adding
            car.classList.remove('uturning');
            void car.offsetWidth; // Force DOM reflow
            car.classList.add('uturning');
            speedometer.textContent = '25 km/h';
            violationTag.style.display = 'block';
            violationTag.textContent = 'ILLEGAL U-TURN';
        } else {
            bannerText.textContent = 'EVENT: ❌ NORMAL DRIVING';
            carWrapper.style.left = '20%';
            speedometer.textContent = '40 km/h';
        }
    } 
    // 3. Pattern 3: Speeding (S) → Lane Weaving (W) → Tailgating (G) — FOUR-WHEELER 🚗
    else if (patternKey === 'speed_weaving') {
        if (stopSignWrapper) stopSignWrapper.style.display = 'none';
        if (leadCarWrapper) leadCarWrapper.style.display = 'block';
        helmetIcon.style.display = 'none';
        if (seatbeltIcon) seatbeltIcon.style.display = 'block';
        lightRed.classList.remove('active');
        lightGreen.classList.add('active');

        if (symbol === 'S') {
            bannerText.textContent = 'EVENT: 🏎️ EXCESSIVE SPEEDING DETECTED (115 km/h)';
            carWrapper.style.left = '45%';
            car.classList.add('speeding');
            speedometer.textContent = '115 km/h';
            if (leadCarWrapper) leadCarWrapper.style.left = '80%';
        } else if (symbol === 'W') {
            bannerText.textContent = 'EVENT: 🔀 RECKLESS DANGEROUS LANE WEAVING';
            carWrapper.style.left = '55%';
            car.classList.add('weaving');
            speedometer.textContent = '108 km/h';
            violationTag.style.display = 'block';
            violationTag.textContent = 'LANE WEAVING';
            if (leadCarWrapper) leadCarWrapper.style.left = '82%';
        } else if (symbol === 'G') {
            bannerText.textContent = 'EVENT: 🚗 HAZARDOUS TAILGATING (< 0.4m CLEARANCE)';
            if (leadCarWrapper) leadCarWrapper.style.left = '68%';
            carWrapper.style.left = '56%';
            speedometer.textContent = '112 km/h';
            violationTag.style.display = 'block';
            violationTag.textContent = 'TAILGATING';
            
            if (proximityLine) {
                proximityLine.style.display = 'flex';
                proximityLine.style.left = '62%';
                proximityLine.style.width = '6%';
            }
        } else {
            bannerText.textContent = 'EVENT: ❌ SAFE DISTANCE DRIVING';
            carWrapper.style.left = '20%';
            if (leadCarWrapper) leadCarWrapper.style.left = '75%';
            speedometer.textContent = '50 km/h';
        }
    } else {
        // Fallback for custom pattern inputs
        bannerText.textContent = `EVENT TRIGGERED: Symbol ${symbol}`;
        carWrapper.style.left = `${Math.min(20 + AppState.stepCount * 20, 85)}%`;
        speedometer.textContent = '60 km/h';
    }
}

// Graph Highlights
function updateDFAHighlights(prev, next, symbol) {
    const nodes = document.querySelectorAll('.dfa-node');
    nodes.forEach(n => n.classList.remove('active', 'rejected'));

    const activeNode = document.getElementById(`node-${next}`);
    if (activeNode) {
        activeNode.classList.add('active');
    }

    elements.currentStateDisplay.textContent = next;
    const stateObj = AppState.dfa.states.find(s => s.id === next);
    elements.currentStateName.textContent = stateObj ? stateObj.label : next;

    // Reject shake effect if non-advancing input resets to q0
    if (prev !== 'q0' && next === 'q0' && symbol !== AppState.activeScenario.targetSeq[0]) {
        const prevNode = document.getElementById(`node-${prev}`);
        if (prevNode) prevNode.classList.add('rejected');
    }
}

// Pipeline Card States
function updatePipelineCards(currentState) {
    const targetSeq = AppState.activeScenario.targetSeq;
    const cards = document.querySelectorAll('.pipeline-card');
    cards.forEach(c => c.classList.remove('completed', 'active-step', 'accepted-step'));

    if (currentState === 'q1') {
        if (cards[0]) cards[0].classList.add('completed');
        if (cards[1]) cards[1].classList.add('active-step');
    } else if (currentState === 'q2') {
        if (cards[0]) cards[0].classList.add('completed');
        if (cards[1]) cards[1].classList.add('completed');
        if (cards[2]) cards[2].classList.add('active-step');
    } else if (currentState === 'q3' || AppState.dfa.acceptStates.includes(currentState)) {
        cards.forEach(c => c.classList.add('accepted-step'));
        elements.pipelineOverallStatus.textContent = '✓ SEQUENCE MATCHED';
        elements.pipelineOverallStatus.style.borderColor = 'var(--green-accept)';
        elements.pipelineOverallStatus.style.color = 'var(--green-accept)';
        return;
    } else {
        if (cards[0]) cards[0].classList.add('active-step');
    }

    elements.pipelineOverallStatus.textContent = 'Searching Sequence';
    elements.pipelineOverallStatus.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    elements.pipelineOverallStatus.style.color = 'var(--text-muted)';
}

// Matrix Cell Highlight
function highlightMatrixCell(prevState, symbol) {
    // Clear previous highlights
    document.querySelectorAll('.transition-table tr').forEach(r => r.classList.remove('active-row'));
    document.querySelectorAll('.transition-table td').forEach(c => c.classList.remove('highlight-cell'));

    const tr = document.getElementById(`tr-state-${prevState}`);
    const td = document.getElementById(`td-${prevState}-${symbol}`);

    if (tr) tr.classList.add('active-row');
    if (td) td.classList.add('highlight-cell');
}

// Status Cards Update
function updateStatusCards(prev, next, symbol, isAccepted) {
    const statusCard = elements.statusCard;
    const statusText = elements.statusText;
    const statusSub = elements.statusSub;

    statusCard.classList.remove('accept', 'reject');

    if (isAccepted) {
        statusCard.classList.add('accept');
        statusText.textContent = '✓ VIOLATION CONFIRMED';
        statusSub.textContent = `State: ${next} — ACCEPTING STATE`;
    } else if (next === 'q0' && prev !== 'q0') {
        statusCard.classList.add('reject');
        statusText.textContent = '✕ SEQUENCE RESET';
        statusSub.textContent = `State reset to q0 — Symbol mismatch`;
    } else {
        statusText.textContent = 'PROCESSING...';
        statusSub.textContent = `State: ${next} — Waiting next symbol`;
    }
}

// Console Logger
function logStepEntry(step, label, symbol, prev, next, isAccepted, fineInfo, currentFine) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';

    const isAdvance = prev !== next && next !== 'q0';
    const statusTag = isAccepted
        ? `<span class="log-status-valid">[ACCEPTED STATE REACHED]</span>`
        : isAdvance
            ? `<span class="log-status-valid">[VALID STEP: ${prev} → ${next}]</span>`
            : `<span class="log-status-invalid">[RESET TO q0]</span>`;

    const fineTag = fineInfo && currentFine > 0
        ? `| <span class="log-fine">Fine: ₹${currentFine.toLocaleString('en-IN')}</span>`
        : `| <span class="log-no-fine">No Fine</span>`;

    entry.innerHTML = `
        <span class="log-step">Step ${step}:</span> Symbol = <span class="log-input">${label} (${symbol})</span> | 
        Transition: <span class="log-trans">${prev} → ${next}</span> | ${statusTag} ${fineTag}
    `;

    elements.logConsole.appendChild(entry);
    elements.logConsole.scrollTop = elements.logConsole.scrollHeight;

    const count = elements.logConsole.querySelectorAll('.log-entry').length;
    elements.logCount.textContent = `${count} ${count === 1 ? 'Entry' : 'Entries'}`;
}

function logConsoleMessage(msg) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = msg;
    elements.logConsole.appendChild(entry);
    elements.logConsole.scrollTop = elements.logConsole.scrollHeight;
}

// --- 9. AUTO-PLAY & SEQUENCE EXECUTION ---

function runTargetViolationSequence() {
    if (AppState.isSimulating) return;
    resetUIState();

    AppState.isSimulating = true;
    toggleControlsDisabled(true);

    const seq = AppState.activeScenario.targetSeq;
    let index = 0;

    AppState.autoPlayTimer = setInterval(() => {
        if (index < seq.length) {
            const sym = seq[index];
            const alphaObj = AppState.dfa.alphabet.find(a => a.symbol === sym);
            processSymbol(sym, alphaObj ? alphaObj.name : sym);
            index++;
        } else {
            stopAutoPlay();
        }
    }, AppState.speedMs);
}

function stepForward() {
    if (AppState.isSimulating) return;

    const seq = AppState.activeScenario.targetSeq;
    const currentStepIdx = AppState.stepHistory.length % seq.length;
    const sym = seq[currentStepIdx];
    const alphaObj = AppState.dfa.alphabet.find(a => a.symbol === sym);

    AppState.stepHistory.push(sym);
    processSymbol(sym, alphaObj ? alphaObj.name : sym);
}

function evaluateCustomString(inputStr) {
    if (!inputStr || AppState.isSimulating) return;
    resetUIState();

    // Clean tokens separated by space or comma
    const symbols = inputStr.toUpperCase().replace(/,/g, ' ').trim().split(/\s+/);
    if (symbols.length === 0) return;

    AppState.isSimulating = true;
    toggleControlsDisabled(true);

    let index = 0;
    AppState.autoPlayTimer = setInterval(() => {
        if (index < symbols.length) {
            const sym = symbols[index];
            const alphaObj = AppState.dfa.alphabet.find(a => a.symbol === sym);
            processSymbol(sym, alphaObj ? alphaObj.name : `Symbol ${sym}`);
            index++;
        } else {
            stopAutoPlay();
        }
    }, Math.max(AppState.speedMs, 500));
}

function stopAutoPlay() {
    if (AppState.autoPlayTimer) {
        clearInterval(AppState.autoPlayTimer);
        AppState.autoPlayTimer = null;
    }
    AppState.isSimulating = false;
    toggleControlsDisabled(false);
}

function resetUIState() {
    stopAutoPlay();
    audioFX.playReset();

    AppState.currentState = AppState.dfa.initialState;
    AppState.stepCount = 0;
    AppState.stepHistory = [];

    // Reset DFA Nodes
    const nodes = document.querySelectorAll('.dfa-node');
    nodes.forEach(n => n.classList.remove('active', 'rejected'));
    const startNode = document.getElementById(`node-${AppState.dfa.initialState}`);
    if (startNode) startNode.classList.add('active');

    // Reset Pipeline
    updatePipelineCards(AppState.dfa.initialState);

    // Reset Road
    elements.eventBannerText.textContent = 'STATUS: MONITORING TRAFFIC FLOW';
    elements.carWrapper.style.left = '20%';
    elements.carElement.className = 'car';
    elements.speedometer.textContent = '45 km/h';
    elements.violationTag.style.display = 'none';

    // Set vehicle emoji based on pattern type
    const pattern = AppState.activeScenario;
    if (elements.carBody) {
        elements.carBody.textContent = pattern.vehicleEmoji || '🚗';
    }

    // Helmet for two-wheelers, seatbelt for four-wheelers
    const isTwoWheeler = pattern.vehicleType === 'two-wheeler';
    elements.helmetIcon.style.display = isTwoWheeler ? 'block' : 'none';
    if (elements.seatbeltIcon) {
        elements.seatbeltIcon.style.display = isTwoWheeler ? 'none' : 'block';
    }

    elements.lightRed.classList.remove('active');
    elements.lightYellow.classList.remove('active');
    elements.lightGreen.classList.add('active');

    // Toggle Environment Elements
    if (elements.stopSignWrapper) {
        elements.stopSignWrapper.style.display = AppState.currentPatternKey === 'stop_uturn' ? 'flex' : 'none';
    }
    if (elements.stopSign) {
        elements.stopSign.classList.remove('ignored');
    }
    if (elements.leadCarWrapper) {
        elements.leadCarWrapper.style.display = AppState.currentPatternKey === 'speed_weaving' ? 'block' : 'none';
        elements.leadCarWrapper.style.left = '75%';
    }
    if (elements.proximityLine) {
        elements.proximityLine.style.display = 'none';
    }

    // Reset Status Cards & Matrix highlights
    elements.statusCard.classList.remove('accept', 'reject');
    elements.statusText.textContent = 'INITIALIZED';
    elements.statusSub.textContent = `State: ${AppState.dfa.initialState}`;
    elements.currentStateDisplay.textContent = AppState.dfa.initialState;
    elements.currentStateName.textContent = 'Clear / Initial';

    document.querySelectorAll('.transition-table tr').forEach(r => r.classList.remove('active-row'));
    document.querySelectorAll('.transition-table td').forEach(c => c.classList.remove('highlight-cell'));

    // Clear log console
    elements.logConsole.innerHTML = `
        <div class="log-entry">
            <span class="log-step">[SYSTEM RESET]</span> DFA reset to initial state <strong>${AppState.dfa.initialState}</strong>.
        </div>
    `;
    elements.logCount.textContent = '1 Entry';

    // Reset Fine System
    AppState.totalFine = 0;
    AppState.violationCount = 0;
    AppState.violationHistory = [];
    updateFineSummary();
    updateDriverInfo();
    if (elements.violationHistoryBody) {
        elements.violationHistoryBody.innerHTML = '';
    }
    if (elements.violationAlertToast) {
        elements.violationAlertToast.classList.remove('show');
    }
}

function toggleControlsDisabled(disable) {
    elements.startBtn.disabled = disable;
    elements.stepBtn.disabled = disable;
    elements.patternSelect.disabled = disable;
    elements.runCustomBtn.disabled = disable;

    const actionBtns = document.querySelectorAll('.btn-action');
    actionBtns.forEach(b => b.disabled = disable);
}

// --- 10. FINE SYSTEM UI UPDATERS ---

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

function updateFineSummary() {
    if (elements.totalFineDisplay) {
        elements.totalFineDisplay.textContent = formatCurrency(AppState.totalFine);
    }
    if (elements.violationCountDisplay) {
        elements.violationCountDisplay.textContent = AppState.violationCount;
    }
    if (elements.fineSummaryAmount) {
        elements.fineSummaryAmount.textContent = formatCurrency(AppState.totalFine);
    }
}

function updateDriverInfo() {
    if (elements.driverIdDisplay) {
        elements.driverIdDisplay.textContent = AppState.driverInfo.driverId;
    }
    if (elements.vehicleNumDisplay) {
        elements.vehicleNumDisplay.textContent = AppState.driverInfo.vehicleNumber;
    }
    if (elements.driverViolationCount) {
        elements.driverViolationCount.textContent = AppState.violationCount;
    }
    if (elements.driverTotalFine) {
        elements.driverTotalFine.textContent = formatCurrency(AppState.totalFine);
    }
}

function addViolationHistoryRow(entry) {
    if (!elements.violationHistoryBody) return;

    const row = document.createElement('tr');
    const fineClass = entry.fine > 0 ? 'fine-imposed' : 'no-fine';
    const statusClass = entry.fine > 0 ? 'status-imposed' : 'status-none';

    row.className = `history-row ${fineClass}`;
    row.innerHTML = `
        <td>${entry.no}</td>
        <td><span class="history-symbol">${entry.symbol}</span></td>
        <td>${entry.violation}</td>
        <td><span class="history-state">${entry.dfaState}</span></td>
        <td class="history-fine-cell">${entry.fine > 0 ? formatCurrency(entry.fine) : '—'}</td>
        <td><span class="history-status ${statusClass}">${entry.status}</span></td>
    `;

    elements.violationHistoryBody.appendChild(row);

    // Auto-scroll to latest entry
    const tableContainer = elements.violationHistoryBody.closest('.violation-history-scroll');
    if (tableContainer) {
        tableContainer.scrollTop = tableContainer.scrollHeight;
    }
}

function showViolationAlertToast(violationName, fineAmount) {
    if (!elements.violationAlertToast) return;

    if (elements.alertViolationName) {
        elements.alertViolationName.textContent = violationName;
    }
    if (elements.alertFineAmount) {
        elements.alertFineAmount.textContent = formatCurrency(fineAmount);
    }
    if (elements.alertStatusText) {
        elements.alertStatusText.textContent = 'Fine Imposed';
    }

    // Remove and re-add show class to re-trigger animation
    elements.violationAlertToast.classList.remove('show');
    void elements.violationAlertToast.offsetWidth; // Force reflow
    elements.violationAlertToast.classList.add('show');

    // Auto-dismiss after 3 seconds
    clearTimeout(AppState._toastTimer);
    AppState._toastTimer = setTimeout(() => {
        elements.violationAlertToast.classList.remove('show');
    }, 3000);
}

// --- 11. OVERLAYS & CANVAS CONFETTI ---

function triggerViolationOverlay() {
    elements.overlaySeqText.textContent = AppState.activeScenario.targetSeqText;
    // Update overlay with fine info
    const overlayBadge = document.querySelector('.violation-badge');
    if (overlayBadge) {
        overlayBadge.innerHTML = `ACCEPTED STATE REACHED — Total Fine: ${formatCurrency(AppState.totalFine)}`;
    }
    elements.violationOverlay.classList.remove('hidden');
}

// Canvas Confetti Generator
function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#00f3ff', '#00ff88', '#ff0055', '#ffb700', '#a855f7'];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 14,
            vy: (Math.random() - 0.5) * 14 - 4,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            rotation: Math.random() * 360
        });
    }

    let startTime = performance.now();
    function render(now) {
        const elapsed = now - startTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; // gravity
            p.alpha -= 0.015;

            ctx.save();
            ctx.globalAlpha = Math.max(p.alpha, 0);
            ctx.fillStyle = p.color;
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });

        if (elapsed < 2000) {
            requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    requestAnimationFrame(render);
}

// --- 11. AMBIENT BACKGROUND CANVAS ---
function initBackgroundCanvas() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const dots = [];
    for (let i = 0; i < 45; i++) {
        dots.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(0, 243, 255, 0.25)';

        dots.forEach(d => {
            d.x += d.vx;
            d.y += d.vy;

            if (d.x < 0 || d.x > width) d.vx *= -1;
            if (d.y < 0 || d.y > height) d.vy *= -1;

            ctx.beginPath();
            ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// --- 12. EVENT LISTENERS SETUP ---
function setupEventListeners() {
    elements.patternSelect.addEventListener('change', (e) => {
        audioFX.playClick();
        loadPattern(e.target.value);
    });

    elements.speedSelect.addEventListener('change', (e) => {
        AppState.speedMs = parseInt(e.target.value, 10);
    });

    elements.startBtn.addEventListener('click', () => {
        audioFX.playClick();
        runTargetViolationSequence();
    });

    elements.stepBtn.addEventListener('click', () => {
        stepForward();
    });

    elements.resetBtn.addEventListener('click', () => {
        resetUIState();
    });

    elements.soundToggleBtn.addEventListener('click', () => {
        audioFX.soundEnabled = !audioFX.soundEnabled;
        elements.soundIcon.textContent = audioFX.soundEnabled ? '🔊' : '🔇';
        elements.soundToggleBtn.classList.toggle('muted', !audioFX.soundEnabled);
    });

    elements.runCustomBtn.addEventListener('click', () => {
        audioFX.playClick();
        evaluateCustomString(elements.customSeqInput.value);
    });

    elements.loadPresetBtn.addEventListener('click', () => {
        audioFX.playClick();
        const presets = {
            'red_speed_helmet': 'R S H R S S H',
            'stop_uturn': 'T T U X T U',
            'speed_weaving': 'S W G S S W'
        };
        elements.customSeqInput.value = presets[AppState.currentPatternKey] || 'R S H';
    });

    elements.clearLogsBtn.addEventListener('click', () => {
        elements.logConsole.innerHTML = '';
        elements.logCount.textContent = '0 Entries';
    });

    elements.dismissOverlayBtn.addEventListener('click', () => {
        elements.violationOverlay.classList.add('hidden');
    });

    elements.helpModalBtn.addEventListener('click', () => {
        elements.helpModal.classList.remove('hidden');
    });

    elements.closeModalBtn.addEventListener('click', () => {
        elements.helpModal.classList.add('hidden');
    });

    elements.modalOkBtn.addEventListener('click', () => {
        elements.helpModal.classList.add('hidden');
    });

    window.addEventListener('resize', () => {
        updateSVGEdges();
    });
}

// Launch application on DOM ready
document.addEventListener('DOMContentLoaded', initApp);
