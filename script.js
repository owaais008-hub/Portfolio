/* ================================================
   PORTFOLIO SCRIPT â€” OWAIS
   Features: Nav, Reveal, EmailJS, Cursor Spotlight,
   Text Scramble, 3D Tilt, Progress Bar, Magnetic Btns,
   Particle Stars, Terminal Widget
================================================ */

/* ===== NAV TOGGLE ===== */
const navMenu   = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

/* ===== STICKY HEADER ===== */
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) header.classList.toggle('scroll-header', window.scrollY >= 50);
});

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top    = section.offsetTop - 80;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
});

/* ===== SCROLL-UP BUTTON ===== */
window.addEventListener('scroll', () => {
    const scrollUp = document.getElementById('scroll-up');
    if (scrollUp) scrollUp.classList.toggle('show-scroll', window.scrollY >= 350);
});

/* ===== SCROLL REVEAL ===== */
function reveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) el.classList.add('active');
    });
}
window.addEventListener('scroll', reveal);
reveal();

/* ================================================
   [I] SCROLL PROGRESS BAR
================================================ */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const scrollTop  = document.documentElement.scrollTop;
    const docHeight  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
});

/* ================================================
   [H] CURSOR SPOTLIGHT
================================================ */
const spotlight = document.getElementById('cursor-spotlight');
document.addEventListener('mousemove', e => {
    if (!spotlight) return;
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top  = e.clientY + 'px';
});

/* ================================================
   [D] TEXT SCRAMBLE EFFECT
================================================ */
class TextScramble {
    constructor(el) {
        this.el    = el;
        this.chars = '!<>-_\\/[]{}â€”=+*^?#@ABCDEFabcdef0123456';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const old = this.el.innerText;
        const len = Math.max(old.length, newText.length);
        const promise = new Promise(r => this.resolve = r);
        this.queue = [];
        for (let i = 0; i < len; i++) {
            const from  = old[i] || '';
            const to    = newText[i] || '';
            const start = Math.floor(Math.random() * 20);
            const end   = start + Math.floor(Math.random() * 20);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '', complete = 0;
        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

window.addEventListener('load', () => {
    const scrambleEl = document.getElementById('scramble-text');
    if (scrambleEl) {
        const fx = new TextScramble(scrambleEl);
        fx.setText('Full Stack Developer');
    }
});

/* ================================================
   [C] 3D TILT EFFECT ON CARDS
================================================ */
document.querySelectorAll('.project-card, .resume-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const cx     = rect.width  / 2;
        const cy     = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -8;
        const rotateY = ((x - cx) / cx) *  8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(108,63,224,0.25)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.boxShadow  = '';
        card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

/* ================================================
   [A] MAGNETIC BUTTONS
================================================ */
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x    = e.clientX - rect.left - rect.width  / 2;
        const y    = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform  = '';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
    });
    btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'none';
    });
});

/* ================================================
   [F] ANIMATED MESH GRADIENT BLOB
================================================ */
(function animateBlob() {
    const blob = document.getElementById('hero-blob');
    if (!blob) return;
    let t = 0;
    function loop() {
        t += 0.004;
        const x = 50 + Math.sin(t)       * 10;
        const y = 50 + Math.cos(t * 0.7) * 10;
        blob.style.background =
            `radial-gradient(circle at ${x}% ${y}%, rgba(108,63,224,0.25) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)`;
        requestAnimationFrame(loop);
    }
    loop();
})();

/* ================================================
   [E] CSS PARTICLE STARFIELD
================================================ */
(function createStars() {
    const canvas  = document.getElementById('star-canvas');
    if (!canvas) return;
    const ctx     = canvas.getContext('2d');
    let W, H, stars;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function initStars() {
        stars = Array.from({ length: 120 }, () => ({
            x:     Math.random() * W,
            y:     Math.random() * H,
            r:     Math.random() * 1.5 + 0.3,
            speed: Math.random() * 0.3 + 0.05,
            alpha: Math.random()
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        stars.forEach(s => {
            s.alpha += s.speed * 0.02;
            if (s.alpha > 1) { s.alpha = 0; s.x = Math.random() * W; s.y = Math.random() * H; }
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,200,255,${s.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();
    window.addEventListener('resize', () => { resize(); initStars(); });
})();

/* ================================================
   [J] INTERACTIVE TERMINAL
================================================ */
const termToggle = document.getElementById('term-toggle');
const termBox    = document.getElementById('terminal-box');
const termInput  = document.getElementById('term-input');
const termOutput = document.getElementById('term-output');

const COMMANDS = {
    help:    'ðŸ“‹ Available: <b>about</b>, <b>skills</b>, <b>contact</b>, <b>projects</b>, <b>clear</b>',
    about:   'ðŸ‘¤ Owais â€” Full Stack Developer based in Karachi, Pakistan. Software Engineering student with real-world experience.',
    skills:  'âš¡ React, Node.js, PHP, Laravel, Flutter, MongoDB, MySQL, Firebase, Git',
    contact: 'ðŸ“§ owaais008@gmail.com | ðŸ“ž +92 371 3253890 | ðŸ ™ github.com/owaais008-hub',
    projects:'🚀 Event Management System | Flux-solutions | Ticket-system',
    clear:   '__CLEAR__',
};

function termPrint(html) {
    const line = document.createElement('p');
    line.innerHTML = html;
    termOutput.appendChild(line);
    termOutput.scrollTop = termOutput.scrollHeight;
}

if (termToggle) {
    termToggle.addEventListener('click', () => {
        termBox.classList.toggle('show-terminal');
        if (termBox.classList.contains('show-terminal')) termInput.focus();
    });
}

if (termInput) {
    termInput.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        const cmd = termInput.value.trim().toLowerCase();
        termInput.value = '';
        termPrint(`<span class="term-prompt">owais@portfolio:~$</span> ${cmd}`);
        if (!cmd) return;
        const response = COMMANDS[cmd];
        if (response === '__CLEAR__') {
            termOutput.innerHTML = '';
        } else if (response) {
            termPrint(response);
        } else {
            termPrint(`âš ï¸ Command not found: <b>${cmd}</b>. Type <b>help</b>.`);
        }
    });
}

/* ===== EMAILJS ===== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = contactForm.querySelector('.contact-submit');
        const orig = btn.innerHTML;
        btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        emailjs.sendForm('service_36efkz9', 'template_cxdnr64', '#contact-form')
            .then(() => {
                btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                contactForm.reset();
                setTimeout(() => btn.innerHTML = orig, 3000);
            }, err => {
                btn.innerHTML = 'Failed <i class="fas fa-times"></i>';
                alert('Error: ' + JSON.stringify(err));
                setTimeout(() => btn.innerHTML = orig, 3000);
            });
    });
}

/* ================================================
   AI CHATBOT
================================================ */
const chatToggle  = document.getElementById('chat-toggle');
const chatBox     = document.getElementById('chatbot-box');
const chatClose   = document.getElementById('chat-close');
const chatInput   = document.getElementById('chat-input');
const chatSend    = document.getElementById('chat-send');
const chatMsgs    = document.getElementById('chat-messages');
const chatBadge   = document.getElementById('chat-badge');
const quickBtns   = document.querySelectorAll('.quick-btn');

const BOT_NAME = 'Owais AI';

const KB = [
  { keys:['hello','hi','hey','greet','howdy','salam'],
    ans:'🤖 Hi there! I\'m Owais AI, your virtual guide to learning about Owais — a passionate Full Stack Developer from Karachi, Pakistan. How can I help you today?' },
  { keys:['who','owais','about','introduce','yourself'],
    ans:'🤖 Owais is a Full Stack Developer and Software Engineering student based in Karachi, Pakistan. He has real-world experience at Maccansoft Corporation (Nov 2025) building scalable web apps with modern tech stacks.' },
  { keys:['skill','tech','stack','know','language','use'],
    ans:'🤖 Owais\'s tech stack:\n\n<b>Frontend:</b> React.js, Next.js, JavaScript, HTML5, CSS3\n<b>Backend:</b> Node.js, Express, PHP, Laravel\n<b>Databases:</b> MongoDB, MySQL\n<b>Mobile:</b> Flutter (Dart)\n<b>Tools:</b> Git, GitHub, Firebase, REST APIs' },
  { keys:['experience','work','job','company','maccansoft','intern'],
    ans:'🤖 Owais worked as a <b>Full Stack Developer</b> at <b>Maccansoft Corporation</b> (November 2025). He built and maintained web applications, developed scalable features, fixed bugs, and improved system performance.' },
  { keys:['education','study','college','degree','aptech','alama','iqbal','school','university'],
    ans:'🤖 Education:\n\n• <b>ACCP Diploma</b> — Aptech Metro Star Gate (2023–2026)\n• <b>Pre-Engineering (Intermediate)</b> — Allama Iqbal Boys College (2024–2026, expected May 2026)' },
  { keys:['project','build','make','create','portfolio','ecommerce','task','app'],
    ans:'🤖 Projects Owais has built:\n\n• <b>Event Management System</b> — A comprehensive platform for event discovery and management.\n• <b>Flux-solutions</b> — High-performance business workflow automation.\n• <b>Ticket-system</b> — AI-driven help desk and ticketing solution.\n\nYou can view them in the Projects section!' },
  { keys:['contact','reach','email','phone','whatsapp','message','hire'],
    ans:'🤖 You can reach Owais at:\n\n• ?? owaais008@gmail.com\n• ?? +92 371 3253890\n• ?? github.com/owaais008-hub\n• ?? linkedin.com/in/owaisali-fullstackdeveloper\n\nOr use the <b>Contact</b> section on this page!' },
  { keys:['location','city','karachi','pakistan','where','live','based'],
    ans:'🤖 Owais is based in <b>Karachi, Pakistan</b>.' },
  { keys:['github','linkedin','twitter','facebook','social','profile'],
    ans:'🤖 Owais\'s social profiles:\n\n• GitHub: github.com/owaais008-hub\n• LinkedIn: linkedin.com/in/owaisali-fullstackdeveloper\n• Twitter/X: x.com/owaais008\n• Facebook: facebook.com/muhammad.owaaisalii' },
  { keys:['freelance','available','hire','open','freelancer'],
    ans:'? Yes! Owais is <b>open to freelance work</b> and new opportunities. Feel free to reach out at owaais008@gmail.com or use the contact form!' },
  { keys:['react','node','flutter','php','laravel','mongodb','mysql','firebase'],
    ans:'? Yes, Owais works with that technology! His full stack expertise spans React, Node.js, PHP, Laravel, Flutter, MongoDB, MySQL, Firebase, and more.' },
  { keys:['thanks','thank','nice','great','awesome','good','wow','cool'],
    ans:'🤖 You\'re welcome! Feel free to ask me anything else about Owais or his work.' },
  { keys:['bye','goodbye','exit','close','later','cya'],
    ans:'🤖 Thanks for stopping by! Feel free to come back anytime. Have a great day!' },
];

function getTime() {
  return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}

function addMsg(text, role) {
  const wrap = document.createElement('div');
  wrap.className = `msg ${role}`;
  const icon = document.createElement('div');
  icon.className = 'msg-icon';
  icon.innerHTML = role === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = text.replace(/\n/g,'<br>');
  const time = document.createElement('span');
  time.className = 'msg-time';
  time.textContent = getTime();
  bubble.appendChild(time);
  wrap.appendChild(icon);
  wrap.appendChild(bubble);
  chatMsgs.appendChild(wrap);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function showTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'msg bot'; wrap.id = 'typing-wrap';
  const icon = document.createElement('div');
  icon.className = 'msg-icon';
  icon.innerHTML = '<i class="fas fa-robot"></i>';
  const bubble = document.createElement('div');
  bubble.className = 'typing-indicator';
  bubble.innerHTML = '<span></span><span></span><span></span>';
  wrap.appendChild(icon); wrap.appendChild(bubble);
  chatMsgs.appendChild(wrap);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typing-wrap');
  if (t) t.remove();
}

function botReply(query) {
  showTyping();
  const q = query.toLowerCase();
  let answer = '?? I\'m not sure about that. Try asking about Owais\'s <b>skills</b>, <b>experience</b>, <b>projects</b>, or <b>contact</b> info!';
  for (const item of KB) {
    if (item.keys.some(k => q.includes(k))) { answer = item.ans; break; }
  }
  setTimeout(() => { removeTyping(); addMsg(answer, 'bot'); }, 900 + Math.random() * 400);
}

function handleSend() {
  const val = chatInput.value.trim();
  if (!val) return;
  addMsg(val, 'user');
  chatInput.value = '';
  botReply(val);
}

// Toggle chat open/close
if (chatToggle) {
  chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('show-chat');
    if (chatBadge) chatBadge.style.display = 'none';
    if (chatBox.classList.contains('show-chat') && chatMsgs.children.length === 0) {
      setTimeout(() => {
        addMsg('?? Hi! I\'m <b>Owais AI</b>. Ask me anything about Owais — his skills, projects, experience, or how to contact him!', 'bot');
      }, 300);
    }
  });
}
if (chatClose)  chatClose.addEventListener('click',  () => chatBox.classList.remove('show-chat'));
if (chatSend)   chatSend.addEventListener('click',   handleSend);
if (chatInput)  chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

quickBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.getAttribute('data-q');
    chatInput.value = q;
    handleSend();
  });
});
