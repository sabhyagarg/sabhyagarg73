import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ArrowUp,
  ExternalLink,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Award,
  Users,
  Wrench,
  Sparkles,
  Target,
  BarChart3,
  Building2,
  FileText,
  Send,
  CheckCircle2,
} from "lucide-react";
import sabhyaAsset from "@/assets/sabhya.png.asset.json";
import resumeAsset from "@/assets/resume.docx.asset.json";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const NAV = [
  ["Home", "home"],
  ["About", "about"],
  ["Education", "education"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Tools", "tools"],
  ["Leadership", "leadership"],
  ["Resume", "resume"],
  ["Contact", "contact"],
] as const;

const TYPING = [
  "Marketing Student",
  "Brand Management Enthusiast",
  "Market Research Enthusiast",
  "Sales & Marketing Intern",
  "Operations Minor",
];

function useTyping(words: string[], speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = w.slice(0, text.length + 1);
          setText(next);
          if (next === w) setTimeout(() => setDel(true), pause);
        } else {
          const next = w.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      del ? 40 : speed,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-up");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounter(target: number, start: boolean, duration = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return v;
}

function Counter({ n, suffix }: { n: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setOn(true),
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const v = useCounter(n, on);
  return (
    <div ref={ref} className="font-display text-5xl font-bold gradient-text md:text-6xl">
      {v}
      {suffix}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "border-b border-border bg-white/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#home" className="font-display text-lg font-bold text-primary">
          Sabhya<span className="text-accent">.</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden btn-primary text-xs md:inline-flex lg:hidden xl:inline-flex">
          Let's Talk
        </a>
        <button
          className="lg:hidden rounded-full border border-border p-2 text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container-page grid grid-cols-2 gap-1 py-4">
            {NAV.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  surface,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  surface?: boolean;
}) {
  return (
    <section id={id} className={`section-pad ${surface ? "bg-surface" : ""}`}>
      <div className="container-page">
        <div className="mx-auto mb-14 max-w-2xl text-center" data-reveal>
          {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function Hero() {
  const typed = useTyping(TYPING);
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.35]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
              <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#e5e7eb" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div className="glass-hero rounded-3xl p-8 md:p-10" data-reveal>
          <span className="eyebrow mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Available for Full-time · 2027
          </span>
          <p className="mt-5 text-lg text-muted-foreground">Hi, I'm</p>
          <h1 className="mt-2 font-display text-5xl font-extrabold leading-tight text-foreground md:text-6xl lg:text-7xl">
            SABHYA <span className="gradient-text">GARG</span>
          </h1>
          <div className="mt-4 flex items-center gap-3 text-lg font-semibold text-primary md:text-xl">
            <span className="text-muted-foreground">I am a</span>
            <span className="text-primary">{typed}</span>
            <span className="caret-blink text-accent">|</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["Marketing PGDM", "Minor in Operations", "Future Brand Manager"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-white/70 px-3 py-1 font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            PGDM student specializing in Marketing with a Minor in Operations at
            Fortune Institute of International Business (FIIB), New Delhi. I solve
            business problems through market research, consumer insights, and
            data-driven strategy — shaped by internships at ITC Limited and IDEA.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={resumeAsset.url} download className="btn-primary">
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a href="#projects" className="btn-outline">
              <Sparkles className="h-4 w-4" /> View Projects
            </a>
            <a
              href="https://www.linkedin.com/in/sabhya-garg-3b2396374"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href="#contact" className="btn-outline">
              <Mail className="h-4 w-4" /> Contact Me
            </a>
          </div>
        </div>

        <div className="relative mx-auto" data-reveal>
          <div
            aria-hidden
            className="absolute -inset-6 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div className="relative">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
            <div className="absolute -left-6 bottom-8 h-32 w-32 rounded-full bg-secondary/20 blur-2xl" />
            <div className="relative aspect-square w-[280px] overflow-hidden rounded-full ring-8 ring-white shadow-[0_30px_80px_-20px_rgba(30,58,138,0.45)] md:w-[360px] lg:w-[420px]">
              <img
                src={sabhyaAsset.url}
                alt="Sabhya Garg"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-[var(--shadow-elevated)]">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Open to Opportunities
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const INTERESTS = [
  "Brand Management",
  "Market Research",
  "Consumer Behaviour",
  "Sales Strategy",
  "Retail Marketing",
  "Business Analytics",
  "Operations Management",
  "Customer Experience",
  "Business Development",
  "Digital Marketing",
];

function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Who I Am"
      subtitle="Curious, analytical, and driven by consumer insight."
      surface
    >
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="card-elevated p-8 md:p-10" data-reveal>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            I am a curious and analytical marketing professional who enjoys
            understanding consumer behaviour, solving business challenges, and
            transforming insights into strategic decisions. During my internship at{" "}
            <span className="font-semibold text-primary">ITC Limited</span>, I
            worked closely with field sales teams, analysed retail operations
            across 80+ outlets, and identified opportunities to improve
            operational efficiency.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            I also contributed to accessibility research through my internship
            with <span className="font-semibold text-primary">IDEA</span> and
            gained accounting exposure during my internship with Chartered
            Accountants.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Target, label: "Strategy" },
              { icon: BarChart3, label: "Analytics" },
              { icon: Users, label: "Consumer" },
              { icon: Building2, label: "Retail" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-2xl border border-border bg-surface p-4"
              >
                <Icon className="h-6 w-6 text-secondary" />
                <span className="mt-2 text-xs font-semibold text-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-elevated p-8" data-reveal>
          <h3 className="font-display text-lg font-semibold text-foreground">
            My Interests
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {INTERESTS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-secondary hover:text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

const EDUCATION = [
  {
    title: "PGDM — Marketing (Minor: Operations)",
    org: "Fortune Institute of International Business (FIIB)",
    period: "2025 – 2027",
    place: "New Delhi",
  },
  {
    title: "Bachelor of Commerce (Hons.)",
    org: "Khalsa College, Patiala",
    period: "2021 – 2024",
    place: "Patiala",
  },
  {
    title: "XII — CBSE",
    org: "Budha Dal Public School",
    period: "2020 – 2021",
    place: "Patiala",
  },
];

function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Academic Journey"
      subtitle="Structured foundation in commerce, marketing, and operations."
    >
      <div className="relative mx-auto max-w-3xl">
        <div
          aria-hidden
          className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-secondary/60 via-border to-transparent md:left-1/2"
        />
        <ul className="space-y-8">
          {EDUCATION.map((e, i) => (
            <li
              key={e.title}
              className={`relative grid gap-4 md:grid-cols-2 md:gap-10 ${
                i % 2 ? "md:text-left" : "md:text-right"
              }`}
              data-reveal
            >
              <div
                className={`hidden md:block ${i % 2 ? "md:order-2" : ""}`}
              />
              <div
                className={`card-elevated relative ml-12 p-6 md:ml-0 ${
                  i % 2 ? "md:order-1 md:mr-10" : "md:ml-10"
                }`}
              >
                <div
                  className="absolute -left-[calc(3rem+9px)] top-6 grid h-8 w-8 place-items-center rounded-full bg-white text-primary shadow-[var(--shadow-soft)] md:left-auto md:top-6"
                  style={{
                    left: undefined,
                  }}
                >
                  <GraduationCap className="h-4 w-4" />
                </div>
                {/* dot on center rail for md */}
                <span
                  aria-hidden
                  className="hidden md:block absolute top-8 h-3 w-3 rounded-full bg-secondary ring-4 ring-white"
                  style={
                    i % 2
                      ? { left: "-2.6rem" }
                      : { right: "-2.6rem" }
                  }
                />
                <span className="eyebrow">{e.period}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                  {e.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.org}</p>
                <p className="mt-1 text-xs text-muted-foreground">{e.place}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

const EXPERIENCE = [
  {
    company: "ITC Limited",
    role: "Sales & Marketing Intern — Tobacco Division",
    place: "New Delhi",
    period: "April 2026 – July 2026",
    points: [
      "Conducted market visits across 80+ retail outlets.",
      "Worked with Company Sales Representatives on daily beats.",
      "Performed 25+ outlet visits daily.",
      "Analysed consumer behaviour and competitor activities.",
      "Supported retail execution and monitored AVF (Availability, Visibility, Freshness).",
      "Designed an AI-powered dashboard concept for the CSR-Radar Market Working App.",
      "Improved understanding of sales distribution and retail operations.",
    ],
  },
  {
    company: "IDEA",
    role: "Social Impact & Research Intern",
    place: "New Delhi",
    period: "June 2026",
    points: [
      "Conducted accessibility audits across public infrastructure.",
      "Collected and analysed primary research data.",
      "Prepared recommendations aligned with accessibility standards.",
      "Contributed to infrastructure assessment and field research.",
    ],
  },
  {
    company: "Jatin Verma & Associates",
    role: "Accounting Intern",
    place: "Patiala",
    period: "June 2023 – July 2023",
    points: [
      "Prepared 50+ accounting vouchers and worked on ledger accounts.",
      "Prepared bank reconciliation statements.",
      "Assisted in GST returns and Income Tax filing.",
    ],
  },
];

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Internship Experience"
      subtitle="Real-world exposure across sales, research, and finance."
      surface
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {EXPERIENCE.map((x) => (
          <article key={x.company} className="card-elevated p-7" data-reveal>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate font-display text-lg font-semibold text-foreground">
                  {x.company}
                </h3>
                <p className="truncate text-xs text-muted-foreground">
                  {x.place} · {x.period}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-secondary">{x.role}</p>
            <ul className="mt-4 space-y-2.5">
              {x.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

const PROJECTS = [
  {
    title: "Mall Immersion Project",
    tag: "STP · Consumer Insights",
    body: "Conducted STP analysis across Camicissima, Hamleys, and P.F. Chang's. Generated 15+ consumer insights and recommended positioning strategies through observation-based research.",
    tools: ["STP", "Consumer Research", "Positioning"],
  },
  {
    title: "AI Dashboard Concept — CSR-Radar App",
    tag: "AI · Retail Analytics",
    body: "Designed a dashboard concept to improve stock visibility, outlet tracking, DSPM monitoring, retail reporting, and decision-making for field sales teams.",
    tools: ["Research", "Business Analysis", "AI Concepts", "Dashboard Design"],
  },
];

function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Academic Projects"
      subtitle="Insight-led problem solving with measurable outputs."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.title} className="card-elevated group p-8" data-reveal>
            <div className="flex items-center justify-between">
              <span className="eyebrow">{p.tag}</span>
              <Lightbulb className="h-5 w-5 text-accent transition group-hover:scale-110" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14" data-reveal>
        <h3 className="text-center font-display text-xl font-semibold text-foreground">
          Certifications
        </h3>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Advanced Accounts",
            "Tally with Excel",
            "Personality Development",
            "Public Speaking",
            "Interview Preparation",
            "Hitbullseye Summer Camp",
            "Vedic Mathematics Level 1",
            "AVAS Employability Skills",
          ].map((c) => (
            <div
              key={c}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground transition hover:border-secondary"
            >
              <Award className="h-4 w-4 text-accent" />
              {c}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const SKILLS = [
  "Marketing Research",
  "Consumer Insights",
  "Presentation Skills",
  "Leadership",
  "Communication",
  "Retail Marketing",
  "Sales Operations",
  "Brand Management",
  "Business Analysis",
  "Strategic Thinking",
  "Problem Solving",
];

function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Core Competencies"
      subtitle="Blending analytical rigor with commercial thinking."
      surface
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s, i) => (
          <div
            key={s}
            className="card-elevated flex items-center gap-4 p-5"
            data-reveal
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-medium text-foreground">{s}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Tools() {
  const tools = ["Power BI", "Microsoft Excel", "PowerPoint", "Word", "MS Office"];
  return (
    <Section
      id="tools"
      eyebrow="Tools"
      title="Tools I Work With"
    >
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {tools.map((t) => (
          <div
            key={t}
            className="card-elevated flex flex-col items-center gap-3 p-6 text-center"
            data-reveal
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-surface text-primary">
              <Wrench className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold text-foreground">{t}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Leadership() {
  const items = [
    {
      title: "Team Leader",
      body: "Led a team of five members, delegated responsibilities, and successfully completed an academic project on time.",
    },
    {
      title: "Event Coordinator",
      body: "Assisted in planning and coordinating a college cultural event attended by 500+ participants.",
    },
  ];
  return (
    <Section
      id="leadership"
      eyebrow="Leadership"
      title="Positions of Responsibility"
      surface
    >
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((x) => (
          <article key={x.title} className="card-elevated p-8" data-reveal>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
              {x.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {x.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-16" data-reveal>
        <h3 className="text-center font-display text-2xl font-semibold text-foreground">
          Achievements at a Glance
        </h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [80, "+", "Retail Outlets Covered"],
            [25, "+", "Daily Retail Visits"],
            [50, "+", "Accounting Vouchers"],
            [15, "+", "Consumer Insights"],
            [3, "", "Professional Internships"],
            [5, "+", "Certifications"],
          ].map(([n, s, label]) => (
            <div
              key={label as string}
              className="card-elevated p-8 text-center"
            >
              <Counter n={n as number} suffix={s as string} />
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {label as string}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Resume() {
  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title="My Resume"
      subtitle="A snapshot of my education, internships, and impact."
    >
      <div className="mx-auto max-w-3xl">
        <div
          className="card-elevated overflow-hidden p-10 text-center"
          data-reveal
        >
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-[var(--shadow-glow)]">
            <FileText className="h-9 w-9" />
          </div>
          <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
            Sabhya Garg — Resume
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            PGDM Marketing · FIIB · 2025 – 2027
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={resumeAsset.url}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <ExternalLink className="h-4 w-4" /> View Resume
            </a>
            <a href={resumeAsset.url} download className="btn-primary">
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been noted.", {
      description: "I'll get back to you at the earliest.",
    });
    (e.currentTarget as HTMLFormElement).reset();
  };
  const infos = [
    { icon: Mail, label: "Email", value: "27-sabhya.garg@fiib.edu.in", href: "mailto:27-sabhya.garg@fiib.edu.in" },
    { icon: Phone, label: "Phone", value: "+91 85880 33074", href: "tel:+918588033074" },
    { icon: MapPin, label: "Location", value: "New Delhi, India" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/sabhya-garg-3b2396374", href: "https://www.linkedin.com/in/sabhya-garg-3b2396374" },
  ];
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Connect"
      subtitle="Open to internships, full-time roles, and brand collaborations."
      surface
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4" data-reveal>
          {infos.map(({ icon: Icon, label, value, href }) => {
            const Tag = href ? "a" : "div";
            return (
              <Tag
                key={label}
                {...(href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : {})}
                className="card-elevated flex items-center gap-4 p-5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <p className="truncate font-medium text-foreground">{value}</p>
                </div>
              </Tag>
            );
          })}
        </div>

        <form
          onSubmit={onSubmit}
          className="card-elevated space-y-4 p-8"
          data-reveal
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-foreground">Name</span>
              <input
                required
                name="name"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10"
                placeholder="Your name"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-foreground">Email</span>
              <input
                required
                type="email"
                name="email"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10"
                placeholder="you@company.com"
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-foreground">Subject</span>
            <input
              required
              name="subject"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10"
              placeholder="Opportunity, collaboration, etc."
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-foreground">Message</span>
            <textarea
              required
              name="message"
              rows={5}
              className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10"
              placeholder="Tell me a bit about the role or opportunity..."
            />
          </label>
          <button type="submit" className="btn-primary w-full sm:w-auto">
            <Send className="h-4 w-4" /> Send Message
          </button>
        </form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">
          Designed & Developed by{" "}
          <span className="font-semibold text-primary">Sabhya Garg</span>
        </p>
        <p className="text-xs text-muted-foreground">© 2026 All rights reserved.</p>
        <a
          href="#home"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-primary transition hover:border-secondary hover:text-secondary"
        >
          <ArrowUp className="h-3.5 w-3.5" /> Back to Top
        </a>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <a
      href="#home"
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full text-white shadow-[var(--shadow-glow)]"
      style={{ background: "var(--gradient-primary)" }}
    >
      <ArrowUp className="h-5 w-5" />
    </a>
  );
}

function Portfolio() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Tools />
        <Leadership />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
