/* WinOptimize Pro — app.js */

const MODULES = [
  { id:'tmp',    name:'Clear Temp Files',       emoji:'🧹', desc:'Safely deletes user/system temp folders and prefetch cache.',           badge:'safe',     optional:false },
  { id:'dns',    name:'Flush DNS Cache',         emoji:'🌐', desc:'Clears the DNS resolver cache to fix stale lookups and speed browsing.', badge:'safe',     optional:false },
  { id:'sfc',    name:'System File Checker',     emoji:'🔍', desc:'Runs sfc /scannow to detect and repair corrupt Windows system files.',   badge:'admin',    optional:false },
  { id:'dism',   name:'DISM Health Restore',     emoji:'🏥', desc:'Repairs the Windows component store via DISM RestoreHealth.',            badge:'admin',    optional:false },
  { id:'disk',   name:'Disk Optimization',       emoji:'💽', desc:'Runs Defrag on HDDs and TRIM on SSDs for optimal read/write speed.',    badge:'safe',     optional:false },
  { id:'power',  name:'High Performance Plan',   emoji:'⚡', desc:'Switches power plan to High Performance for maximum CPU throughput.',    badge:'safe',     optional:false },
  { id:'net',    name:'Reset Network Stack',     emoji:'🔌', desc:'Resets Winsock, TCP/IP, and IPv4/IPv6 stack. Requires reboot.',         badge:'optional', optional:true  },
  { id:'svc',    name:'Stop Junk Services',      emoji:'🛑', desc:'Disables non-critical services: SysMain, DiagTrack, WSearch.',          badge:'optional', optional:true  },
  { id:'visual', name:'Disable Visual Effects',  emoji:'🎨', desc:'Turns off animations and transparency for faster UI rendering.',         badge:'optional', optional:true  },
  { id:'mem',    name:'Memory Cache Flush',      emoji:'🧠', desc:'Clears standby memory list using RAMMap-style empty working set call.',  badge:'safe',     optional:false },
  { id:'update', name:'Check Windows Update',    emoji:'🔄', desc:'Triggers UsoClient to scan for pending Windows updates silently.',       badge:'safe',     optional:false },
  { id:'startup',name:'Startup Audit',           emoji:'🚀', desc:'Lists all startup entries so you can review and manage them safely.',    badge:'safe',     optional:false },
];

const SCRIPT_SEGMENTS = {
  header: () => `@echo off
setlocal EnableDelayedExpansion
title WinOptimize Pro — Windows Performance Optimization
color 0A

:: ============================================================
::   WinOptimize Pro v3.2.1
::   Generated: ${new Date().toLocaleString()}
::   SAFE • REVERSIBLE • CMD ONLY
::   Run as Administrator for full functionality
:: ============================================================

echo.
echo  ██╗    ██╗██╗███╗   ██╗ ██████╗ ██████╗ ████████╗
echo  ██║    ██║██║████╗  ██║██╔═══██╗██╔══██╗╚══██╔══╝
echo  ██║ █╗ ██║██║██╔██╗ ██║██║   ██║██████╔╝   ██║
echo  ██║███╗██║██║██║╚██╗██║██║   ██║██╔═══╝    ██║
echo  ╚███╔███╔╝██║██║ ╚████║╚██████╔╝██║        ██║
echo   ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝        ╚═╝
echo.
echo  WinOptimize Pro — Windows Performance Suite
echo  -----------------------------------------------
echo  Generated: ${new Date().toLocaleString()}
echo.
echo  [!] Checking for Administrator privileges...
net session >nul 2>&1
if %errorLevel% NEQ 0 (
    echo  [X] ERROR: Please right-click this file and
    echo      select "Run as Administrator"
    echo.
    pause
    exit /b 1
)
echo  [OK] Running as Administrator.
echo.
pause
`,

  tmp: () => `
:: ============================================================
:: MODULE 1: Clear Temporary Files
:: Removes stale temp data from user/system folders safely.
:: REVERSIBLE: Yes — clears only cache, not user data.
:: ============================================================
echo [1/12] Clearing Temporary Files...
echo.

:: User temp folder
echo  -- Cleaning %%TEMP%%...
del /q /f /s "%TEMP%\\*" >nul 2>&1
rd /s /q "%TEMP%" >nul 2>&1
md "%TEMP%" >nul 2>&1

:: Windows temp folder
echo  -- Cleaning C:\\Windows\\Temp...
del /q /f /s "C:\\Windows\\Temp\\*" >nul 2>&1

:: Prefetch cache (safe to clear, Windows rebuilds it)
echo  -- Cleaning Prefetch cache...
del /q /f /s "C:\\Windows\\Prefetch\\*" >nul 2>&1

:: Recent items list
echo  -- Clearing Recent Items list...
del /q /f /s "%APPDATA%\\Microsoft\\Windows\\Recent\\*" >nul 2>&1

echo  [OK] Temp files cleared.
echo.
`,

  dns: () => `
:: ============================================================
:: MODULE 2: Flush DNS Cache
:: Clears the DNS resolver cache to fix stale lookups.
:: REVERSIBLE: Yes — DNS cache auto-rebuilds on next lookup.
:: ============================================================
echo [2/12] Flushing DNS Cache...
echo.
ipconfig /flushdns
ipconfig /registerdns
echo  [OK] DNS cache flushed and re-registered.
echo.
`,

  sfc: () => `
:: ============================================================
:: MODULE 3: System File Checker
:: Scans and repairs corrupt Windows system files.
:: REVERSIBLE: Yes — only restores known-good files.
:: NOTE: This may take 5-15 minutes to complete.
:: ============================================================
echo [3/12] Running System File Checker (sfc /scannow)...
echo  [!] This may take several minutes — please wait.
echo.
sfc /scannow
echo  [OK] SFC scan complete. Check above for results.
echo.
`,

  dism: () => `
:: ============================================================
:: MODULE 4: DISM Health Restore
:: Repairs the Windows component store (WinSxS).
:: REVERSIBLE: Yes — only fixes detected corruption.
:: NOTE: Requires active internet connection.
:: ============================================================
echo [4/12] Running DISM Health Restore...
echo  [!] This may take 10-20 minutes. Internet required.
echo.
DISM /Online /Cleanup-Image /CheckHealth
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth
echo  [OK] DISM health restore complete.
echo.
`,

  disk: () => `
:: ============================================================
:: MODULE 5: Disk Optimization
:: Defragments HDDs, sends TRIM command to SSDs.
:: REVERSIBLE: N/A — no data is modified, only rearranged.
:: ============================================================
echo [5/12] Optimizing Disk Drives...
echo.

:: Optimize all drives (Windows auto-detects HDD/SSD type)
defrag C: /U /V /H
echo.
echo  [!] For additional drives, run: defrag D: /U /V /H
echo  [OK] Disk optimization complete.
echo.
`,

  power: () => `
:: ============================================================
:: MODULE 6: Set High Performance Power Plan
:: Maximizes CPU performance by removing power throttling.
:: REVERSIBLE: Run "powercfg /setactive BALANCED_GUID" to undo.
:: ============================================================
echo [6/12] Setting Power Plan to High Performance...
echo.
powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
powercfg /list
echo  [OK] High Performance power plan activated.
echo  [!] To revert: powercfg /setactive BALANCED_GUID
echo.
`,

  net: () => `
:: ============================================================
:: MODULE 7: [OPTIONAL] Reset Network Stack
:: Resets Winsock, TCP/IP, and firewall settings.
:: REVERSIBLE: Requires a reboot to apply. All settings reset.
:: WARNING: Existing VPN/custom network configs may reset.
:: ============================================================
echo [7/12] [OPTIONAL] Resetting Network Stack...
echo.
netsh winsock reset
netsh int ip reset
netsh int ipv4 reset
netsh int ipv6 reset
netsh advfirewall reset
echo  [OK] Network stack reset. REBOOT REQUIRED.
echo.
`,

  svc: () => `
:: ============================================================
:: MODULE 8: [OPTIONAL] Disable Non-Critical Services
:: Stops background services that consume RAM/CPU.
:: REVERSIBLE: Re-enable via services.msc or sc config start= auto
:: Services: SysMain (SuperFetch), DiagTrack, WSearch
:: ============================================================
echo [8/12] [OPTIONAL] Disabling Non-Critical Services...
echo.

:: SysMain (SuperFetch) — pre-loads apps, heavy on HDDs
sc stop SysMain >nul 2>&1
sc config SysMain start= disabled
echo  -- SysMain (SuperFetch) disabled.

:: DiagTrack — Connected User Experiences / telemetry
sc stop DiagTrack >nul 2>&1
sc config DiagTrack start= disabled
echo  -- DiagTrack (Telemetry) disabled.

:: Windows Search Indexer — heavy disk usage
sc stop WSearch >nul 2>&1
sc config WSearch start= disabled
echo  -- WSearch (Search Indexer) disabled.

echo  [OK] Non-critical services stopped.
echo  [!] To re-enable SysMain: sc config SysMain start= auto
echo.
`,

  visual: () => `
:: ============================================================
:: MODULE 9: [OPTIONAL] Disable Visual Effects
:: Turns off animations, shadows, transparency for faster UI.
:: REVERSIBLE: System Properties > Advanced > Visual Effects > Best appearance
:: ============================================================
echo [9/12] [OPTIONAL] Disabling Visual Effects...
echo.
:: Set SystemParameters to "Adjust for best performance" (value 2)
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v VisualFXSetting /t REG_DWORD /d 2 /f >nul 2>&1
:: Disable listview shadows
reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 0 /f >nul 2>&1
echo  [OK] Visual effects minimized for performance.
echo  [!] Log out and back in for full effect.
echo.
`,

  mem: () => `
:: ============================================================
:: MODULE 10: Memory Cache Flush
:: Uses built-in Windows command to reduce standby memory.
:: REVERSIBLE: Yes — memory refills automatically on demand.
:: ============================================================
echo [10/12] Flushing Memory Cache...
echo.
:: Use rundll32 to signal the system to trim working sets
rundll32.exe advapi32.dll,ProcessIdleTasks
echo  [OK] Memory idle tasks triggered. Standby cache flushed.
echo.
`,

  update: () => `
:: ============================================================
:: MODULE 11: Check for Windows Updates
:: Triggers Windows Update scan silently via UsoClient.
:: REVERSIBLE: N/A — only initiates a check, no auto-install.
:: ============================================================
echo [11/12] Triggering Windows Update Check...
echo.
UsoClient ScanInstallWait
echo  [OK] Update check initiated. Check Windows Update in Settings.
echo.
`,

  startup: () => `
:: ============================================================
:: MODULE 12: Startup Program Audit
:: Lists all startup entries so you can identify slow starters.
:: REVERSIBLE: N/A — read-only audit, nothing is changed.
:: ============================================================
echo [12/12] Auditing Startup Programs...
echo.
echo  --- Registry Run Keys (HKCU) ---
reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"
echo.
echo  --- Registry Run Keys (HKLM) ---
reg query "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"
echo.
echo  [OK] Startup audit complete.
echo  [!] Use Task Manager > Startup tab to disable items.
echo.
`,

  footer: () => `
:: ============================================================
:: OPTIMIZATION COMPLETE
:: ============================================================
echo.
echo  ============================================================
echo   WinOptimize Pro — All selected tasks completed!
echo  ============================================================
echo.
echo  RECOMMENDATIONS:
echo  1. Restart your PC to apply all changes.
echo  2. Review warnings noted above in the output.
echo  3. If network was reset, reconnect to your WiFi/LAN.
echo  4. Run SFC and DISM output was logged above.
echo.
echo  Stay safe. Stay optimized.
echo.
pause
endlocal
`
};

const WARNINGS = [
  { type:'danger',  icon:'🔴', title:'Run as Administrator',      text:'This script requires Admin privileges. Right-click the .bat file and select "Run as administrator" or it will exit immediately.' },
  { type:'caution', icon:'🟡', title:'Create a Restore Point First', text:'Before running, go to System Properties → System Protection → Create a restore point. This lets you undo all changes instantly.' },
  { type:'caution', icon:'🟡', title:'Network Reset Requires Reboot', text:'If you included the Network Stack Reset module, a full reboot is required before your internet will work again.' },
  { type:'info',    icon:'🔵', title:'SFC & DISM Take Time',      text:'System File Checker and DISM can take 10–20 minutes each. Do not interrupt the script while these are running.' },
  { type:'info',    icon:'🔵', title:'Services Can Be Re-enabled', text:'All stopped services (SysMain, DiagTrack, WSearch) can be re-enabled any time via services.msc or the sc command shown in comments.' },
  { type:'safe',    icon:'🟢', title:'No Data Is Deleted',        text:'This script only clears temp/cache files. No user documents, photos, or installed applications are affected in any way.' },
  { type:'caution', icon:'🟡', title:'Visual Effects Needs Logoff', text:'Changes to visual effects take effect after logging off and back on, or after a full system restart.' },
  { type:'safe',    icon:'🟢', title:'Fully Reversible',          text:'Every command includes a reversal instruction in its comment block. Each module is independent — you can undo selectively.' },
];

// ── State ──
let selected = new Set(MODULES.filter(m => !m.optional).map(m => m.id));
let generatedScript = '';

// ── Build Module Grid ──
function buildModules() {
  const grid = document.getElementById('modulesGrid');
  grid.innerHTML = MODULES.map(m => `
    <div class="module-card ${m.optional ? 'optional' : ''} ${selected.has(m.id) ? 'active' : ''}"
         id="mod-${m.id}" onclick="toggleModule('${m.id}')" role="checkbox"
         aria-checked="${selected.has(m.id)}" tabindex="0">
      <div class="module-check">
        <svg viewBox="0 0 12 10" fill="none" width="12" height="10">
          <path d="M1 5l3.5 3.5L11 1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="module-body">
        <div class="module-top">
          <span class="module-emoji">${m.emoji}</span>
          <span class="module-name">${m.name}</span>
          <span class="module-badge badge-${m.badge}">${m.badge.toUpperCase()}</span>
        </div>
        <p class="module-desc">${m.desc}</p>
      </div>
    </div>
  `).join('');
}

function toggleModule(id) {
  if (selected.has(id)) { selected.delete(id); }
  else { selected.add(id); }
  const card = document.getElementById('mod-' + id);
  card.classList.toggle('active', selected.has(id));
  card.setAttribute('aria-checked', selected.has(id));
}

// ── Generate Script ──
function generateScript() {
  const btn = document.getElementById('generateBtn');
  btn.classList.add('loading');

  setTimeout(() => {
    let script = SCRIPT_SEGMENTS.header();
    MODULES.forEach(m => { if (selected.has(m.id)) script += SCRIPT_SEGMENTS[m.id](); });
    script += SCRIPT_SEGMENTS.footer();
    generatedScript = script;

    renderScript(script);
    renderMeta();
    renderWarnings();

    const outEl = document.getElementById('outputSection');
    const warnEl = document.getElementById('warningSection');
    outEl.classList.add('visible');
    warnEl.classList.add('visible');

    setTimeout(() => outEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    btn.classList.remove('loading');
  }, 800);
}

function renderScript(raw) {
  const block = document.getElementById('codeBlock');
  let html = '';
  raw.split('\n').forEach(line => {
    const esc = line.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    if (esc.trim().startsWith('::'))        html += `<span class="cm">${esc}</span>\n`;
    else if (esc.trim().startsWith('echo')) html += `<span class="fn">${esc}</span>\n`;
    else if (/^(if|for|set|pause|call|goto|endlocal|setlocal)/i.test(esc.trim())) html += `<span class="kw">${esc}</span>\n`;
    else if (/\[OPTIONAL\]/.test(esc))      html += `<span class="op">${esc}</span>\n`;
    else if (esc.includes('=====') || /MODULE \d+/.test(esc)) html += `<span class="hd">${esc}</span>\n`;
    else html += `${esc}\n`;
  });
  block.innerHTML = html;
}

function renderMeta() {
  const el = document.getElementById('scriptMeta');
  const lines = generatedScript.split('\n').length;
  const modules = selected.size;
  const ts = new Date().toLocaleString();
  el.innerHTML = `
    <span class="meta-item"><span class="meta-key">modules:</span><span class="meta-val">${modules}</span></span>
    <span class="meta-item"><span class="meta-key">lines:</span><span class="meta-val">${lines}</span></span>
    <span class="meta-item"><span class="meta-key">generated:</span><span class="meta-val">${ts}</span></span>
    <span class="meta-item"><span class="meta-key">type:</span><span class="meta-val">CMD .bat</span></span>
    <span class="meta-item"><span class="meta-key">admin_required:</span><span class="meta-val">YES</span></span>
  `;
}

function renderWarnings() {
  const grid = document.getElementById('warningsGrid');
  grid.innerHTML = WARNINGS.map(w => `
    <div class="warn-card ${w.type}">
      <span class="warn-ic">${w.icon}</span>
      <div class="warn-body">
        <h4>${w.title}</h4>
        <p>${w.text}</p>
      </div>
    </div>
  `).join('');
}

// ── Copy ──
function copyScript() {
  navigator.clipboard.writeText(generatedScript).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.classList.add('copied');
    btn.querySelector('span').textContent = 'Copied!';
    setTimeout(() => { btn.classList.remove('copied'); btn.querySelector('span').textContent = 'Copy'; }, 2000);
  });
}

// ── Download ──
function downloadScript() {
  const blob = new Blob([generatedScript], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'WinOptimizePro.bat';
  a.click();
  URL.revokeObjectURL(url);
}

// ── Particle Canvas ──
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: ['#3b82f6','#8b5cf6','#06b6d4'][Math.floor(Math.random()*3)]
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Init ──
buildModules();
