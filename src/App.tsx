import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  House, User, Flask, TreeStructure, Notebook, Envelope, GithubLogo, LinkedinLogo, ArrowUpRight, ArrowRight,
  Brain, Database, ChartLineUp, Function as FnIcon, Graph, Terminal, Sparkle,
} from '@phosphor-icons/react'

import DotGrid from '@/components/reactbits/DotGrid'
import Dock from '@/components/reactbits/Dock'
import ScrollStack, { ScrollStackItem } from '@/components/reactbits/ScrollStack'
import PixelCard from '@/components/reactbits/PixelCard'
import Counter from '@/components/reactbits/Counter'
import TextType from '@/components/reactbits/TextType'
import ScrambledText from '@/components/reactbits/ScrambledText'
import ScrollFloat from '@/components/reactbits/ScrollFloat'
import ElectricBorder from '@/components/reactbits/ElectricBorder'
import StarBorder from '@/components/reactbits/StarBorder'
import FadeContent from '@/components/reactbits/FadeContent'
import { Badge } from '@/components/ui/badge'

gsap.registerPlugin(ScrollTrigger)

const COBALT = '#2b44ff'
const INK = '#111111'
const HL = '#ffd23f'

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

function Clock() {
  const [t, setT] = useState(() => new Date())
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id) }, [])
  return <span className="tabular-nums">{t.toLocaleTimeString('en-GB')}</span>
}

function Section({ id, n, title, children, className = '' }: { id: string; n: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-[min(92%,1180px)] py-28 ${className}`}>
      <div className="mb-10 flex items-baseline gap-4 border-b border-rule pb-4">
        <span className="font-mono text-sm text-cobalt">§{n}</span>
        <ScrollFloat
          containerClassName="!m-0"
          textClassName="font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-semibold leading-none tracking-tight"
          effect="float" splitBy="chars" stagger={0.02} scrollStart="top 95%" scrollEnd="top 60%"
        >
          {title}
        </ScrollFloat>
      </div>
      {children}
    </section>
  )
}

const URL = {
  github: 'https://github.com/Olamieee',
  linkedin: 'https://linkedin.com/in/alonge-olamide-493237242',
  hf: 'https://huggingface.co/Olamieee',
  email: 'mailto:alongeola16@gmail.com',
}

type Link = { label: string; href: string }
type Experiment = { id: string; title: string; img: string; bg: string; fg: string; status: string; desc: string; metric: [string, string]; tags: string[]; links: Link[] }

const experiments: Experiment[] = [
  {
    id: 'EXP-01', title: 'Yoruba emotion detection', img: '/ph/f1-yoruba.svg', bg: '#ffffff', fg: INK, status: 'published',
    desc: 'Fine-tuned AfroXLMR-base on SemEval-2025 Task 11 (Yoruba) for six-class multilabel emotion detection, against a 0.165 majority baseline.',
    metric: ['0.40', 'macro F1 · official test set'], tags: ['AfroXLMR', 'PyTorch', 'Hugging Face'],
    links: [
      { label: 'Code', href: 'https://github.com/Olamieee/yoruba-emotion' },
      { label: 'Model', href: 'https://huggingface.co/Olamieee/yoruba-emotion-model' },
      { label: 'Paper', href: 'https://zenodo.org/records/20356810' },
    ],
  },
  {
    id: 'EXP-02', title: 'Kinyarwanda hate speech platform', img: '/ph/kinya-confusion.png', bg: COBALT, fg: '#ffffff', status: 'deployed',
    desc: 'Fine-tuned AfroXLMR-mini to classify Kinyarwanda text as hate speech, sarcasm or normal, with role-based dashboards and explainable predictions for community moderators.',
    metric: ['3', 'classes · hate / sarcasm / normal'], tags: ['AfroXLMR-mini', 'Flask', 'scikit-learn'],
    links: [{ label: 'Code', href: 'https://github.com/Olamieee/kinyarwanda-hatespeech-detection' }],
  },
  {
    id: 'EXP-03', title: 'Credit risk and fairness', img: '/ph/plot-3.svg', bg: HL, fg: INK, status: 'preprint',
    desc: 'A comparative study of machine learning credit-risk models, with a fairness analysis.',
    metric: ['2026', 'Zenodo preprint'], tags: ['Python', 'scikit-learn', 'Fairness'],
    links: [{ label: 'Paper', href: 'https://zenodo.org/records/20524242' }],
  },
  {
    id: 'EXP-04', title: 'IGA Hifadhi subject recommender', img: '/ph/plot-4.svg', bg: INK, fg: '#f4f3ee', status: 'client project',
    desc: 'Web platform for students in Kigali that recommends academic subjects from IQ assessments, personality profiling and compatibility scoring.',
    metric: ['2024', 'client project · Kigali'], tags: ['Django', 'scikit-learn', 'PostgreSQL'], links: [],
  },
]

const alsoBuilt = [
  { y: '2022 – 2023', t: 'Ransomware detection', d: 'Real-time Random Forest classifier on PE file features, with live file monitoring and Arduino hardware alerts.' },
  { y: '2023', t: 'Malaria diagnosis', d: 'MLP and RBF network models benchmarked on clinical data under limited-data conditions.' },
  { y: '2023', t: 'Spam classification', d: 'SMS spam detection (Random Forest) and email spam filtering (Multinomial Naive Bayes) on TF-IDF features.' },
  { y: 'Client work', t: 'Churn and dry bean classification', d: 'Customer churn prediction and multi-class agricultural product classification, documented and deployed.' },
]

const publications = [
  { t: 'Multilabel Emotion Detection in Yoruba: Fine-tuning AfroXLMR on SemEval-2025 Task 11', href: 'https://zenodo.org/records/20356810' },
  { t: 'Credit Risk Assessment Using Machine Learning: A Comparative Study with Fairness Analysis', href: 'https://zenodo.org/records/20524242' },
]

const methods = [
  { icon: Brain, label: 'Fine-tuning transformers' },
  { icon: Graph, label: 'Low-resource NLP' },
  { icon: ChartLineUp, label: 'Model evaluation' },
  { icon: FnIcon, label: 'Predictive modelling' },
  { icon: Database, label: 'Data cleaning and features' },
  { icon: Terminal, label: 'Flask and Django apps' },
]

const log = [
  { d: 'Feb 2022 — present', role: 'Machine Learning Engineer', org: 'Freelance (Remote)', note: 'Built and deployed NLP and ML solutions for clients, including a Kinyarwanda hate speech platform and a sentiment analyzer for English, Yoruba and Nigerian Pidgin.' },
  { d: 'Remote', role: 'Expert benchmark task author', org: 'AfterQuery (Kepler project)', note: 'Authored 4 expert-level science tasks approved for an AI agent benchmark: each a containerised environment with an instruction, reference solution and automated verifier.' },
  { d: 'Sept 2025 — Jan 2026', role: 'Software Automation Engineer', org: 'Crown Polytechnic', note: 'Automated ethical-clearance certificate generation for 100+ researchers with Google Apps Script.' },
  { d: 'Sept 2024 — Dec 2025', role: 'Software Automation Engineer', org: 'BUESTI', note: 'Built an end-to-end research compliance workflow across Google Forms, Sheets, Docs and Apps Script.' },
  { d: 'Graduated Sept 2024', role: 'B.Sc. Computer Science', org: 'Federal University Oye-Ekiti', note: 'CGPA 3.79/5.0, Second Class Upper. Thesis: text-based emotion detection across 13+ categories.' },
]

export default function App() {
  const logRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // changelog spine fills as you read
      gsap.fromTo('.log-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: logRef.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.4 } })
      gsap.utils.toArray<HTMLElement>('.log-dot').forEach((d) =>
        gsap.fromTo(d, { scale: 0.4, backgroundColor: '#f4f3ee' }, { scale: 1, backgroundColor: COBALT, duration: 0.4, scrollTrigger: { trigger: d, start: 'top 62%', toggleActions: 'play none none reverse' } }))
      // highlighter swipes on key words
      gsap.utils.toArray<HTMLElement>('.hl').forEach((el) =>
        ScrollTrigger.create({ trigger: el, start: 'top 75%', onEnter: () => el.classList.add('on') }))
      // hero sticky note drops in
      gsap.from('.sticky-note', { y: -80, rotate: -20, opacity: 0, duration: 1.1, ease: 'back.out(2)', delay: 0.6 })
      gsap.from('.hero-line', { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.1, delay: 0.1 })
      gsap.from('.cell', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.5 })
    })
    // sticky stacking cards change page height after first layout; re-measure triggers
    const refresh = () => ScrollTrigger.refresh()
    const t = window.setTimeout(refresh, 900)
    window.addEventListener('load', refresh)
    return () => { ctx.revert(); window.clearTimeout(t); window.removeEventListener('load', refresh) }
  }, [])

  const dockItems = [
    { icon: <House size={20} />, label: 'Top', onClick: () => go('top') },
    { icon: <User size={20} />, label: 'Abstract', onClick: () => go('about') },
    { icon: <Flask size={20} />, label: 'Experiments', onClick: () => go('work') },
    { icon: <TreeStructure size={20} />, label: 'Methods', onClick: () => go('methods') },
    { icon: <Notebook size={20} />, label: 'Changelog', onClick: () => go('log') },
    { separator: true },
    { icon: <Envelope size={20} />, label: 'Contact', onClick: () => go('contact') },
    { icon: <GithubLogo size={20} />, label: 'GitHub', onClick: () => window.open(URL.github, '_blank', 'noopener') },
  ]

  return (
    <>
      {/* ── TOP BAR ───────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex w-[min(92%,1180px)] items-center justify-between py-3 font-mono text-[11px] tracking-wider uppercase">
          <span>Alonge O. S. <span className="text-cobalt">/ notebook</span></span>
          <span className="hidden items-center gap-2 sm:flex"><span className="size-1.5 animate-pulse rounded-full bg-cobalt" />open to remote roles</span>
          <span className="text-dim"><Clock /></span>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-32 [&>*]:pointer-events-auto">
        <Dock items={dockItems} theme="light" position="bottom" baseItemSize={46} magnification={70} panelHeight={62} accentColor={COBALT} showIndicators />
      </div>

      {/* ── HERO ──────────────────────────────── */}
      <section id="top" className="relative min-h-[100svh] overflow-hidden pt-24 pb-28">
        <div className="absolute inset-0">
          <DotGrid dotSize={4} gap={22} baseColor="rgba(17,17,17,0.26)" activeColor={COBALT} proximity={140} shockRadius={240} shockStrength={4} glow={0.4} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_40%,#f4f3ee_85%)]" />

        <div className="relative mx-auto grid w-[min(92%,1180px)] gap-10 pt-10 lg:grid-cols-[1.25fr_1fr] lg:pt-16">
          <div>
            <div className="mb-8 font-mono text-xs tracking-widest text-dim uppercase">Fig. 1 — Machine learning engineer</div>
            <h1 className="font-display text-[clamp(3rem,6.2vw,6rem)] leading-[0.92] font-semibold tracking-[-0.03em]">
              <span className="block overflow-hidden"><span className="hero-line block">Alonge</span></span>
              <span className="block overflow-hidden"><span className="hero-line block">Olamide</span></span>
              <span className="block overflow-hidden"><span className="hero-line block">Samson<span className="text-cobalt">.</span></span></span>
            </h1>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-3 font-display text-[clamp(1.4rem,3vw,2.3rem)] font-medium">
              <span className="text-dim">builds</span>
              <TextType
                text={['NLP models for African languages.', 'working ML applications.', 'benchmark tasks for AI agents.']}
                className="text-cobalt" typingSpeed={55} deletingSpeed={30} pauseDuration={1500} cursorStyle="bar" cursorColor={COBALT} loop
              />
            </div>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-dim">
              I fine-tune and evaluate language models, including for low-resource African languages such as Yoruba and Kinyarwanda, and deploy them as working applications.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button onClick={() => go('work')} className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-cobalt">
                See the experiments <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => go('contact')} className="rounded-full border border-ink/20 px-6 py-3.5 transition-colors hover:border-cobalt hover:text-cobalt">Get in touch</button>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-ink/20 px-6 py-3.5 transition-colors hover:border-cobalt hover:text-cobalt">Resume</a>
            </div>
          </div>

          {/* notebook cell */}
          <div className="relative self-end">
            <div className="sticky-note absolute -top-10 right-6 z-10 rotate-3 bg-hl px-4 py-3 font-mono text-xs leading-snug shadow-[0_8px_20px_rgba(0,0,0,.12)]">
              ✎ open to work<br />(remote)
            </div>
            <div className="cell overflow-hidden rounded-2xl border border-ink/15 bg-white/85 shadow-[0_30px_60px_-30px_rgba(17,17,17,.35)] backdrop-blur">
              <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5 font-mono text-[11px] text-dim">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" /><span className="size-2.5 rounded-full bg-[#febc2e]" /><span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2">profile.ipynb</span>
              </div>
              <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed">
                <div><span className="text-cobalt">In [1]:</span> <TextType text={['load_profile("olamide")', 'summarise(focus="african-language NLP")']} typingSpeed={40} pauseDuration={1800} loop cursorStyle="block" cursorColor={INK} /></div>
                <div className="text-dim">Out[1]:</div>
                <div className="grid grid-cols-3 gap-3">
                  {[{ v: 2, s: 'preprints' }, { v: 3, s: 'African languages' }, { v: 4, s: 'benchmark tasks approved' }].map((x, i) => (
                    <div key={i} className="rounded-lg border border-rule bg-paper p-3">
                      <Counter value={x.v} fontSize={30} fontWeight={600} textColor={INK} minDigits={2} intro stagger={0.08} />
                      <div className="mt-1 text-[11px] text-dim uppercase">{x.s}</div>
                    </div>
                  ))}
                </div>
                <div><span className="text-cobalt">In [2]:</span> <span className="text-dim">#</span> next cell<span className="caret">▍</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TAPE ──────────────────────────────── */}
      <div className="relative z-10 -my-4 -rotate-2 overflow-hidden bg-ink py-4 text-paper">
        <div className="tape flex w-max gap-10 font-display text-3xl font-semibold whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10">
              {['Python', 'PyTorch', 'Hugging Face', 'NLP', 'scikit-learn', 'TensorFlow', 'Flask', 'Django', 'SQL', 'Model evaluation'].map((t, i) => (
                <span key={i} className="flex items-center gap-10">{t}<Sparkle size={22} weight="fill" className="text-hl" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── ABSTRACT ──────────────────────────── */}
      <Section id="about" n="1" title="Abstract">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6 text-[clamp(1.2rem,2vw,1.6rem)] leading-relaxed">
            <p>I'm a machine learning engineer and data scientist who builds and deploys <span className="hl">NLP and predictive-modelling systems</span> across healthcare, security, education and language technology.</p>
            <p className="text-dim">My strongest work is fine-tuning transformers on <span className="hl text-ink">low-resource African languages</span>, Yoruba and Kinyarwanda, with two published preprints and a released Hugging Face model.</p>
            <div className="mt-10 overflow-hidden rounded-xl border border-rule bg-white">
              <div className="border-b border-rule px-4 py-2 font-mono text-[11px] tracking-widest text-dim uppercase">Model card</div>
              {[['Role', 'Machine Learning Engineer · Data Scientist'], ['Focus', 'Applied NLP, African languages, model evaluation'], ['Stack', 'Python · PyTorch · Hugging Face · scikit-learn'], ['Based in', 'Nigeria'], ['Status', 'Open to remote roles and freelance projects']].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[140px_1fr] border-b border-rule px-4 py-3 text-base last:border-0">
                  <span className="font-mono text-sm text-dim">{k}</span><span>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <FadeContent effect="develop" duration={1.4}>
            <figure className="mb-6 rounded-xl border border-rule bg-white p-3">
              <img src="/portrait.jpg" alt="Portrait of Alonge Olamide Samson" className="aspect-square w-full rounded-lg object-cover object-top" />
              <figcaption className="mt-3 flex justify-between font-mono text-[11px] text-dim uppercase"><span>Fig. 2</span><span>Alonge Olamide Samson</span></figcaption>
            </figure>
            <figure className="rounded-xl border border-rule bg-white p-5">
              <div className="mb-4 font-mono text-[11px] tracking-widest text-dim uppercase">Fig. 3 — Publications</div>
              <ul className="space-y-5">
                {publications.map((pb, i) => (
                  <li key={i}>
                    <a href={pb.href} target="_blank" rel="noreferrer" className="group block">
                      <span className="font-mono text-[11px] text-dim">[{i + 1}] Zenodo preprint, 2026</span>
                      <span className="mt-1 block font-display text-xl leading-snug font-medium transition-colors group-hover:text-cobalt">{pb.t} <ArrowUpRight size={16} className="inline" /></span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href="https://huggingface.co/Olamieee/yoruba-emotion-model" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 border-t border-rule pt-4 font-mono text-xs text-dim uppercase transition-colors hover:text-cobalt">Released model on Hugging Face <ArrowUpRight size={14} /></a>
            </figure>
          </FadeContent>
        </div>
      </Section>

      {/* ── EXPERIMENTS (stacking cards) ─────── */}
      <Section id="work" n="2" title="Experiments" className="!pb-10">
        <ScrollStack useWindowScroll smoothScroll={false} itemDistance={140} itemStackDistance={26} stackPosition="18%" itemScale={0.04} baseScale={0.86} dimAmount={0.12} blurAmount={0.6} className="-mx-[6%]">
          {experiments.map((e) => (
            <ScrollStackItem key={e.id} itemClassName="!h-[min(70vh,560px)] !p-0 overflow-hidden" style={{ background: e.bg, color: e.fg }}>
              <div className="grid h-full md:grid-cols-[1fr_1.15fr]">
                <div className="flex flex-col justify-between p-8 sm:p-10">
                  <div className="flex items-center justify-between font-mono text-xs tracking-widest uppercase opacity-70"><span>{e.id}</span><span>status: {e.status}</span></div>
                  <div>
                    <h3 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-none font-semibold tracking-tight">{e.title}</h3>
                    <p className="mt-4 max-w-md opacity-75">{e.desc}</p>
                    <div className="mt-6 flex flex-wrap gap-2">{e.tags.map((t, i) => <Badge key={i} variant="outline" className="rounded-full border-current/30 text-current">{t}</Badge>)}</div>
                  </div>
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div><div className="font-display text-5xl font-semibold">{e.metric[0]}</div><div className="font-mono text-xs uppercase opacity-60">{e.metric[1]}</div></div>
                    {e.links.length > 0 && (
                      <div className="flex flex-wrap justify-end gap-2">
                        {e.links.map((l) => (
                          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-current/30 px-3 py-2 font-mono text-xs uppercase transition-colors hover:bg-current/10">{l.label}<ArrowUpRight size={14} /></a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="hidden p-4 md:block"><img src={e.img} alt="" className="h-full w-full rounded-[20px] object-cover" /></div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
        <div className="mt-24">
          <div className="mb-5 font-mono text-xs tracking-widest text-dim uppercase">Also built</div>
          <div className="grid gap-4 sm:grid-cols-2">
            {alsoBuilt.map((a) => (
              <div key={a.t} className="rounded-xl border border-rule bg-white p-5">
                <div className="font-mono text-[11px] text-dim">{a.y}</div>
                <div className="mt-1 font-display text-2xl font-semibold">{a.t}</div>
                <p className="mt-2 text-dim">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── METHODS (pixel cards) ─────────────── */}
      <Section id="methods" n="3" title="Methods">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {methods.map((m, i) => (
            <PixelCard key={i} theme="light" colors={i % 2 ? [HL, '#ffe98a', '#fff3c2'] : [COBALT, '#6f80ff', '#b8c1ff']} gap={6} speed={40} origin="pointer" radius={18} className="!h-56 !w-full border border-rule bg-white">
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6">
                <m.icon size={34} weight="duotone" color={i % 2 ? INK : COBALT} />
                <div>
                  <div className="font-mono text-[11px] text-dim">0{i + 1}</div>
                  <div className="font-display text-2xl font-semibold">{m.label}</div>
                </div>
              </div>
            </PixelCard>
          ))}
        </div>
      </Section>

      {/* ── CHANGELOG ─────────────────────────── */}
      <Section id="log" n="4" title="Changelog">
        <div ref={logRef} className="relative pl-10 sm:pl-14">
          <div className="absolute top-2 bottom-2 left-3 w-px bg-rule sm:left-5"><div className="log-fill h-full w-full origin-top bg-cobalt" /></div>
          {log.map((r, i) => (
            <FadeContent key={i} effect="focus" duration={0.9} delay={0.05}>
              <div className="group relative mb-12 grid gap-2 sm:grid-cols-[200px_1fr]">
                <span className="log-dot absolute top-1.5 -left-[33px] size-3.5 rounded-full border-2 border-cobalt sm:-left-[43px]" />
                <span className="font-mono text-sm text-dim">{r.d}</span>
                <div>
                  <div className="font-display text-3xl font-semibold transition-colors group-hover:text-cobalt">{r.role} <span className="text-dim">@ {r.org}</span></div>
                  <p className="mt-1 text-dim">{r.note}</p>
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </Section>

      {/* ── CORRESPONDENCE ────────────────────── */}
      <Section id="contact" n="5" title="Correspondence" className="!pb-40">
        <ElectricBorder color={COBALT} theme="light" speed={1} chaos={0.5} thickness={2} borderRadius={28} interactive>
          <div className="grid gap-10 rounded-[28px] bg-white p-8 sm:p-14 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <ScrambledText className="!m-0 !max-w-none !font-display !text-[clamp(3rem,8vw,7rem)] !leading-[0.9] !font-semibold !tracking-tight" radius={120} duration={1.1} scrambleChars="01.:/" color={INK} scrambleColor={COBALT}>
                Say hello.
              </ScrambledText>
              <p className="mt-6 max-w-md text-lg text-dim">Open to remote machine learning, NLP and data science roles, AI evaluation work, and freelance projects.</p>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <StarBorder as="a" href={URL.email} theme="light" color={COBALT} className="w-full" backgroundColor="#111111" textColor="#f4f3ee" hover="lap">
                <span className="flex items-center justify-center gap-3 py-1 text-lg"><Envelope size={20} /> alongeola16@gmail.com</span>
              </StarBorder>
              <div className="flex gap-3">
                {[
                  { href: URL.github, label: 'GitHub', node: <GithubLogo size={22} /> },
                  { href: URL.linkedin, label: 'LinkedIn', node: <LinkedinLogo size={22} /> },
                  { href: URL.hf, label: 'Hugging Face', node: <span className="text-xl leading-none">🤗</span> },
                ].map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" aria-label={l.label} className="grid flex-1 place-items-center rounded-2xl border border-rule py-4 transition-all hover:-translate-y-1 hover:border-cobalt hover:text-cobalt">{l.node}</a>
                ))}
              </div>
            </div>
          </div>
        </ElectricBorder>
        <div className="mt-16 flex justify-between border-t border-rule pt-6 font-mono text-[11px] tracking-widest text-dim uppercase">
          <span>© 2026 Alonge Olamide Samson</span><span>— end of notebook —</span>
        </div>
      </Section>
    </>
  )
}
