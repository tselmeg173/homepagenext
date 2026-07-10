"use client"
import { useState, useEffect, useRef } from "react";

const TRANSLATIONS = {
  en: {
    available: "Available for work",
    greeting: "Hi, I'm",
    description: "I build fast, beautiful digital products — from concept to deployment. Focused on clean code and exceptional user experience.",
    viewWork: "View my work →",
    getInTouch: "Get in touch",
    yearsExp: "Years experience",
    projectsShipped: "Projects shipped",
    happyClients: "Happy clients",
    selectedWork: "Selected Work",
    projectsTitle: "Projects that",
    projectsSub: "speak for themselves",
    aboutLabel: "About me",
    aboutTitle: "I turn ideas into",
    aboutSub: "polished products",
    aboutP1: "I'm a full-stack developer based in Ulaanbaatar with a passion for building things that live on the internet.",
    aboutP2: "When I'm not coding, I'm exploring new technologies and always looking for the next interesting problem to solve.",
    skillsLabel: "Skills",
    skillsTitle: "Tools of the trade",
    contactLabel: "Contact",
    contactTitle: "Let's build something",
    contactSub: "great together",
    contactDesc: "Have a project in mind? Drop me a message.",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    messagePlaceholder: "Message",
    sendBtn: "Send message →",
    sentTitle: "Message sent!",
    sentDesc: "I'll get back to you within 24 hours.",
    sendAnother: "Send another",
    openTo: "Open to opportunities",
    hireMe: "Hire me",
    scroll: "Scroll",
    footer: "Built with Next.js",
  },
  mn: {
    available: "Ажилд бэлэн",
    greeting: "Сайн уу, би",
    description: "Би хурдан, гоё дижитал бүтээгдэхүүн хийдэг — санаанаас эхлээд deploy хүртэл. Цэвэр код, гайхалтай хэрэглэгчийн туршлагад анхаардаг.",
    viewWork: "Миний ажлуудыг харах →",
    getInTouch: "Холбоо барих",
    yearsExp: "Жилийн туршлага",
    projectsShipped: "Хийсэн төсөл",
    happyClients: "Хэрэглэгч",
    selectedWork: "Сонгосон ажлууд",
    projectsTitle: "Төслүүд",
    projectsSub: "өөрөө ярьдаг",
    aboutLabel: "Миний тухай",
    aboutTitle: "Санааг бодит болгодог",
    aboutSub: "боловсронгуй бүтээгдэхүүн",
    aboutP1: "Би Улаанбаатар хотод суурилсан full-stack хөгжүүлэгч бөгөөд интернэтэд амьдардаг зүйлс бүтээхэд дуртай.",
    aboutP2: "Код бичихгүй үед шинэ технологи судлаж, дараагийн сонирхолтой асуудлыг хайж байдаг.",
    skillsLabel: "Ур чадвар",
    skillsTitle: "Ажлын хэрэгслүүд",
    contactLabel: "Холбоо барих",
    contactTitle: "Хамтдаа ямар нэгэн",
    contactSub: "гайхалтай зүйл бүтээе",
    contactDesc: "Төсөл санаа байна уу? Мэссэж илгээгээрэй.",
    namePlaceholder: "Нэр",
    emailPlaceholder: "Имэйл",
    messagePlaceholder: "Мэссэж",
    sendBtn: "Мэссэж илгээх →",
    sentTitle: "Мэссэж илгээгдлээ!",
    sentDesc: "24 цагийн дотор хариу өгнө.",
    sendAnother: "Дахин илгээх",
    openTo: "Ажлын санал хүлээж байна",
    hireMe: "Ажилд авах",
    scroll: "Доош",
    footer: "Next.js-ээр хийсэн",
  }
}

const NAV_LINKS = ["Work", "About", "Skills", "Contact"];

const PROJECTS = [
  { id: "01", title: "Trading Dashboard", tags: ["React", "D3.js", "WebSocket"], desc: "Real-time market data visualization with live charts and portfolio analytics.", color: "#00FF94" },
  { id: "02", title: "E-Commerce Platform", tags: ["Next.js", "Prisma", "Stripe"], desc: "Full-stack marketplace with payment integration and admin dashboard.", color: "#7B61FF" },
  { id: "03", title: "AI Chat Interface", tags: ["Python", "FastAPI", "React"], desc: "Conversational AI product with streaming responses and memory management.", color: "#00D4FF" },
];

const SKILLS = [
  { name: "React / Next.js", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "Node.js", level: 85 },
  { name: "UI/UX Design", level: 80 },
  { name: "Python", level: 75 },
  { name: "DevOps / Docker", level: 70 },
];

const STATS_KEYS = [
  { value: "3+", key: "yearsExp" },
  { value: "24", key: "projectsShipped" },
  { value: "12", key: "happyClients" },
];

function useTyping(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function GlowOrb({ style }: { style: React.CSSProperties }) {
  return <div style={{ position: "absolute", borderRadius: "50%", filter: "blur(80px)", opacity: 0.18, pointerEvents: "none", ...style }} />;
}

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

function RevealSection({ children, style, id }: { children: React.ReactNode; style?: React.CSSProperties; id: string }) {
  const [ref, visible] = useReveal();
  return (
    <section id={id} ref={ref} style={{ ...style, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(50px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
      {children}
    </section>
  );
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [filled, setFilled] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setFilled(level), delay); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level, delay]);
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: "#CBD5E1", fontSize: 14 }}>{name}</span>
        <span style={{ color: "#00FF94", fontSize: 13, fontWeight: 600 }}>{filled}%</span>
      </div>
      <div style={{ height: 4, background: "#1E293B", borderRadius: 2 }}>
        <div style={{ height: "100%", width: `${filled}%`, background: "linear-gradient(90deg, #00FF94, #00D4FF)", borderRadius: 2, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 0 10px #00FF9466" }} />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: { id: string; title: string; tags: string[]; desc: string; color: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "#0F172A" : "#080C14", border: `1px solid ${hovered ? project.color + "55" : "#1E293B"}`, borderRadius: 16, padding: "32px 28px", cursor: "pointer", transition: "all 0.3s ease", transform: hovered ? "translateY(-4px)" : "none", boxShadow: hovered ? `0 20px 60px ${project.color}18` : "none", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`, opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ color: project.color, fontSize: 13, fontWeight: 700, letterSpacing: 2, fontFamily: "'JetBrains Mono', monospace" }}>{project.id}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={project.color} strokeWidth="2" style={{ opacity: hovered ? 1 : 0.3, transition: "opacity 0.3s" }}>
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
      <h3 style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>{project.title}</h3>
      <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{project.desc}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {project.tags.map((t) => (
          <span key={t} style={{ background: project.color + "18", color: project.color, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState<'en' | 'mn'>('en');
  const t = TRANSLATIONS[lang];

  const typingWords = lang === 'en'
    ? ["Information System Developer", "UI/UX Designer", "Problem Solver", "Open to Work"]
    : ["Мэдээллийн системийн хөгжүүлэгч", "UI/UX Дизайнер", "Асуудал шийдэгч", "Ажил хайж байна"];

  const typed = useTyping(typingWords);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  // Mouse neon glow effect
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.id = 'neon-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 350px;
      height: 350px;
      border-radius: 50%;
      background: radial-gradient(circle, #00FF9430 0%, #00FF9408 40%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: left 0.08s ease, top 0.08s ease;
    `;
    document.body.appendChild(cursor);

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      if (document.body.contains(cursor)) document.body.removeChild(cursor);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (formData.name && formData.email && formData.message) {
      try {
        await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
      } catch (err) { console.error(err); }
    }
  };

  const S: { [key: string]: React.CSSProperties } = {
    page: { background: "#030712", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#F1F5F9", overflowX: "hidden", width: "100%" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(3,7,18,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid #1E293B" : "1px solid transparent", transition: "all 0.3s ease" },
    logo: { fontSize: 18, fontWeight: 800, color: "#F1F5F9", letterSpacing: -0.5, cursor: "pointer" },
    section: { width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 40px" },
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#0F172A", border: "1px solid #1E293B", borderRadius: 10,
    padding: "14px 16px", color: "#F1F5F9", fontSize: 14, fontFamily: "'Inter', sans-serif",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.logo} onClick={() => scrollTo("hero")}>
          <span style={{ color: "#00FF94" }}>&lt;</span>Dev<span style={{ color: "#00FF94" }}>/&gt;</span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <span key={l} onClick={() => scrollTo(l.toLowerCase())}
              style={{ color: "#94A3B8", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#00FF94"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "#94A3B8"}
            >{l}</span>
          ))}

          {/* Lang toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'mn' : 'en')}
            style={{ background: "transparent", border: "1px solid #1E293B", color: "#94A3B8", padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#00FF94"; (e.currentTarget as HTMLElement).style.color = "#00FF94"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1E293B"; (e.currentTarget as HTMLElement).style.color = "#94A3B8"; }}
          >
            {lang === 'en' ? 'MN' : 'EN'}
          </button>

          <button onClick={() => scrollTo("contact")}
            style={{ background: "transparent", border: "1px solid #00FF94", color: "#00FF94", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#00FF9415"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >{t.hireMe}</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", width: "100%" }}>
        <GlowOrb style={{ width: 600, height: 600, background: "#00FF94", top: -100, right: -200 }} />
        <GlowOrb style={{ width: 400, height: 400, background: "#7B61FF", bottom: 50, left: -100 }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(#1E293B22 1px, transparent 1px), linear-gradient(90deg, #1E293B22 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div style={{ ...S.section, position: "relative", zIndex: 1, paddingTop: 80 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00FF9412", border: "1px solid #00FF9430", borderRadius: 30, padding: "6px 16px", marginBottom: 32 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00FF94", boxShadow: "0 0 8px #00FF94", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#00FF94", fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{t.available}</span>
          </div>

          <h1 style={{ fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20, letterSpacing: -2 }}>
            {t.greeting}{" "}
            <span style={{ background: "linear-gradient(135deg, #00FF94, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tselmeg</span>
            <br />
            <span style={{ color: "#94A3B8", fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 700 }}>
              {typed}<span style={{ color: "#00FF94", animation: "blink 1s step-end infinite" }}>|</span>
            </span>
          </h1>

          <p style={{ color: "#64748B", fontSize: 18, maxWidth: 560, lineHeight: 1.8, marginBottom: 48 }}>
            {t.description}
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("work")}
              style={{ background: "#00FF94", color: "#030712", border: "none", padding: "16px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 0 30px #00FF9440" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px #00FF9460"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px #00FF9440"; }}
            >{t.viewWork}</button>
            <button onClick={() => scrollTo("contact")}
              style={{ background: "transparent", color: "#F1F5F9", border: "1px solid #1E293B", padding: "16px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#94A3B8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1E293B"; }}
            >{t.getInTouch}</button>
          </div>

          <div style={{ display: "flex", gap: 48, marginTop: 72, paddingTop: 48, borderTop: "1px solid #1E293B", flexWrap: "wrap" }}>
            {STATS_KEYS.map((s) => (
              <div key={s.key}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#F1F5F9", lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: "#64748B", fontSize: 13, marginTop: 6 }}>{t[s.key as keyof typeof t]}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#475569", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>{t.scroll}</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, #475569, transparent)" }} />
        </div>
      </section>

      {/* WORK */}
      <RevealSection id="work" style={{ padding: "120px 0", width: "100%" }}>
        <div style={S.section}>
          <div style={{ marginBottom: 60 }}>
            <span style={{ color: "#00FF94", fontSize: 13, fontWeight: 700, letterSpacing: 3, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>{t.selectedWork}</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, marginTop: 12, letterSpacing: -1 }}>
              {t.projectsTitle}<br /><span style={{ color: "#475569" }}>{t.projectsSub}</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </RevealSection>

      {/* ABOUT */}
      <RevealSection id="about" style={{ padding: "120px 0", position: "relative", width: "100%" }}>
        <GlowOrb style={{ width: 500, height: 500, background: "#00D4FF", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ ...S.section, position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <span style={{ color: "#00FF94", fontSize: 13, fontWeight: 700, letterSpacing: 3, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>{t.aboutLabel}</span>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, marginTop: 12, marginBottom: 24, letterSpacing: -1 }}>
                {t.aboutTitle}<br />
                <span style={{ background: "linear-gradient(135deg, #00FF94, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.aboutSub}</span>
              </h2>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>{t.aboutP1}</p>
              <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.9, marginBottom: 36 }}>{t.aboutP2}</p>
              <div style={{ display: "flex", gap: 16 }}>
                {["GitHub", "LinkedIn", "Twitter"].map((s) => (
                  <span key={s} style={{ color: "#94A3B8", fontSize: 13, fontWeight: 600, cursor: "pointer", borderBottom: "1px solid #334155", paddingBottom: 2, transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#00FF94"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "#94A3B8"}
                  >{s} ↗</span>
                ))}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ width: "100%", paddingBottom: "100%", background: "linear-gradient(135deg, #0F172A, #1E293B)", borderRadius: 20, border: "1px solid #1E293B", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                  <div style={{ fontSize: 72 }}>👩‍💻</div>
                  <span style={{ color: "#475569", fontSize: 13 }}>Your photo here</span>
                </div>
              </div>
              <div style={{ position: "absolute", bottom: -16, right: -16, background: "#0F172A", border: "1px solid #00FF9430", borderRadius: 12, padding: "12px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FF94", boxShadow: "0 0 8px #00FF94" }} />
                <span style={{ color: "#F1F5F9", fontSize: 13, fontWeight: 600 }}>{t.openTo}</span>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* SKILLS */}
      <RevealSection id="skills" style={{ padding: "120px 0", width: "100%" }}>
        <div style={S.section}>
          <span style={{ color: "#00FF94", fontSize: 13, fontWeight: 700, letterSpacing: 3, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>{t.skillsLabel}</span>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, marginTop: 12, marginBottom: 60, letterSpacing: -1 }}>{t.skillsTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 80px" }}>
            {SKILLS.map((s, i) => <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 100} />)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 48 }}>
            {["PostgreSQL", "Redis", "AWS", "Tailwind CSS", "GraphQL", "Figma", "Git", "Linux"].map((tech) => (
              <span key={tech} style={{ background: "#0F172A", border: "1px solid #1E293B", color: "#94A3B8", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontFamily: "'JetBrains Mono', monospace", transition: "all 0.2s", cursor: "default" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#00FF9450"; (e.currentTarget as HTMLElement).style.color = "#00FF94"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1E293B"; (e.currentTarget as HTMLElement).style.color = "#94A3B8"; }}
              >{tech}</span>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* CONTACT */}
      <RevealSection id="contact" style={{ padding: "120px 0 80px", width: "100%" }}>
        <div style={{ ...S.section, maxWidth: 700 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ color: "#00FF94", fontSize: 13, fontWeight: 700, letterSpacing: 3, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>{t.contactLabel}</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, marginTop: 12, letterSpacing: -1 }}>
              {t.contactTitle}<br /><span style={{ color: "#475569" }}>{t.contactSub}</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 16, marginTop: 16, lineHeight: 1.7 }}>{t.contactDesc}</p>
          </div>

          {sent ? (
            <div style={{ background: "#00FF9410", border: "1px solid #00FF9430", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ color: "#00FF94", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{t.sentTitle}</h3>
              <p style={{ color: "#64748B" }}>{t.sentDesc}</p>
              <button onClick={() => setSent(false)} style={{ marginTop: 24, background: "transparent", border: "1px solid #00FF9430", color: "#00FF94", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontSize: 14 }}>{t.sendAnother}</button>
            </div>
          ) : (
            <div style={{ background: "#080C14", border: "1px solid #1E293B", borderRadius: 20, padding: 40 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 8, fontWeight: 500 }}>{t.namePlaceholder}</label>
                  <input style={inputStyle} placeholder={t.namePlaceholder} value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={(e) => e.target.style.borderColor = "#00FF9450"}
                    onBlur={(e) => e.target.style.borderColor = "#1E293B"} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 8, fontWeight: 500 }}>{t.emailPlaceholder}</label>
                  <input style={inputStyle} placeholder={t.emailPlaceholder} value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={(e) => e.target.style.borderColor = "#00FF9450"}
                    onBlur={(e) => e.target.style.borderColor = "#1E293B"} />
                </div>
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 8, fontWeight: 500 }}>{t.messagePlaceholder}</label>
                <textarea style={{ ...inputStyle, height: 140, resize: "vertical" }} placeholder={t.messagePlaceholder} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={(e) => e.target.style.borderColor = "#00FF9450"}
                  onBlur={(e) => e.target.style.borderColor = "#1E293B"} />
              </div>
              <button onClick={handleSend}
                style={{ width: "100%", background: "#00FF94", color: "#030712", border: "none", padding: "16px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 0 30px #00FF9440" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px #00FF9460"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px #00FF9440"; }}
              >{t.sendBtn}</button>
            </div>
          )}
        </div>
      </RevealSection>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1E293B", padding: "32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ color: "#475569", fontSize: 13 }}>© 2026 <span style={{ color: "#00FF94" }}>&lt;Dev/&gt;</span> — {t.footer}</div>
          <div style={{ color: "#475569", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>Ulaanbaatar, Mongolia 🇲🇳</div>
        </div>
      </footer>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; overflow-x: hidden; background: #030712; }
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 3px; }
      `}</style>
    </div>
  );
}