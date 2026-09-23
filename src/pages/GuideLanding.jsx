import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Check, ArrowRight, FileText, Clock, CalendarCheck, LayoutGrid } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadFormModal from "@/components/LeadForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GUIDE_PDF_URL, publicUrl } from "@/lib/siteConfig";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const STATS = [
  { icon: FileText, value: "33", label: "pages of practical guidance" },
  { icon: Clock, value: "10 min", label: "a day is all it takes" },
  { icon: CalendarCheck, value: "14-day", label: "step-by-step plan" },
  { icon: LayoutGrid, value: "20+", label: "diagrams, routines & printables" },
];

const CHAPTERS = [
  ["001", "The Desk Problem", "Why sitting all day leads to back, neck and joint pain, with the numbers behind it."],
  ["002", "Your Body at the Desk", "The six pressure points that take the load, and the pain loop that keeps you sore."],
  ["003", "Workstation Setup", "A labelled ideal desk setup and an 8-point audit you can finish in 15 minutes."],
  ["004", "The Hour-by-Hour Blueprint", "A simple plan for a normal workday, from wake-up mobility to wind-down."],
  ["005", "Micro-Break Library", "Six moves under 60 seconds each, plus ready-made 2-minute combos."],
  ["006", "Targeted Routines", "Neck & shoulders, the 10-minute back reset, wrists, hips and knees."],
  ["007", "Recovery at Home", "Heat vs. cold, a what-should-I-do flowchart, and sleep without a stiff neck."],
  ["008", "Your 14-Day Plan", "A day-by-day plan, a habit tracker, a progress journal and a monitor cheat sheet."],
];

const PREVIEWS = [
  { src: "/guide/preview-1.jpg", alt: "Guide page: the ideal desk setup diagram" },
  { src: "/guide/preview-2.jpg", alt: "Guide page: the hour-by-hour blueprint" },
  { src: "/guide/preview-3.jpg", alt: "Guide page: the 10-minute back reset" },
  { src: "/guide/preview-4.jpg", alt: "Guide page: the 14-day plan" },
];

const FAQS = [
  ["Is the guide really free?", "Yes. Enter your name and email and the full PDF downloads instantly. No payment and no catch."],
  ["Who is it for?", "Anyone who sits for work: office and remote workers, students, drivers, and anyone who ends the day stiff or sore."],
  ["Do I need any equipment?", "No. Everything uses your own chair and desk, a towel or cushion, and 10 minutes a day."],
  ["Is this medical advice?", "No. The guide is general wellbeing education. If you have an injury or ongoing pain, talk to a doctor or physiotherapist first."],
  ["Will you spam me?", "No. We send occasional tips and offers, and you can unsubscribe in one click."],
];

const PDF_FILENAME = "MotionPluse-Pain-Free-Workday-Blueprint.pdf";

// Runs after the async form submit, so it must not open a new tab/window —
// browsers (and Instagram's in-app browser) block those as pop-ups.
function triggerDownload() {
  const sameOrigin = new URL(GUIDE_PDF_URL, window.location.href).origin === window.location.origin;
  if (sameOrigin) {
    const a = document.createElement("a");
    a.href = GUIDE_PDF_URL;
    a.download = PDF_FILENAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } else {
    // Cross-origin (Shopify → Netlify): `download` is ignored, but Netlify
    // serves the PDF with Content-Disposition: attachment (netlify.toml), so
    // navigating to it downloads the file and keeps this page open.
    window.location.assign(GUIDE_PDF_URL);
  }
}

function DownloadButton({ onClick, variant = "light" }) {
  const cls =
    variant === "light"
      ? "bg-accent-green text-navy hover:bg-white"
      : "bg-navy text-white hover:bg-trust-blue";
  return (
    <button onClick={onClick} className={`group inline-flex items-center justify-center gap-3 w-full sm:w-auto max-w-full rounded-full px-6 sm:px-9 py-4 sm:py-5 text-sm font-semibold tracking-wide text-center transition-colors ${cls}`}>
      <Download size={18} className="shrink-0" />
      <span>DOWNLOAD THE FREE GUIDE</span>
      <ArrowRight size={16} className="shrink-0 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

export default function GuideLanding() {
  const [open, setOpen] = useState(false);
  const openForm = () => setOpen(true);

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-deep-navy overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-trust-blue/20 blur-3xl" />
        <div className="relative container-px max-w-[1400px] mx-auto pt-36 pb-20 md:pt-44 md:pb-28 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center [&>*]:min-w-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <span className="rounded-full bg-accent-green text-navy text-xs font-semibold px-3 py-1.5">FREE PDF GUIDE</span>
              <span className="eyebrow text-white/60">Desk-worker edition · 2026</span>
            </div>
            <h1 className="heading-display text-white text-[2.4rem] leading-[0.98] sm:text-6xl md:text-7xl lg:text-8xl">
              The Pain-Free Workday <span className="text-accent-green">Blueprint</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl mt-7 max-w-xl leading-relaxed">
              A practical, hour-by-hour system to protect your back, neck and joints, built for people who sit for a living.
            </p>
            <ul className="mt-8 space-y-3">
              {["Fix your desk setup in 15 minutes", "10-minute routines for back, neck, wrists and knees", "A printable 14-day plan and habit tracker"].map((b) => (
                <li key={b} className="flex items-center gap-3 text-white/85">
                  <span className="h-6 w-6 rounded-full bg-accent-green/20 text-accent-green flex items-center justify-center shrink-0">
                    <Check size={14} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
              <DownloadButton onClick={openForm} />
              <span className="text-white/50 text-sm">Instant download · No spam</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[420px]"
          >
            <img src={publicUrl("/guide/preview-2.jpg")} alt="" aria-hidden="true" className="absolute inset-0 translate-x-10 translate-y-6 rotate-6 shadow-2xl opacity-60" />
            <img src={publicUrl("/guide/preview-1.jpg")} alt="" aria-hidden="true" className="absolute inset-0 translate-x-5 translate-y-3 rotate-3 shadow-2xl opacity-80" />
            <img src={publicUrl("/guide/cover.jpg")} alt="The Pain-Free Workday Blueprint guide cover" className="relative w-full shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container-px max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div key={s.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="py-8 sm:py-10 px-3 sm:px-4 lg:px-8 border-border odd:border-r lg:border-r lg:last:border-r-0">
              <s.icon size={20} className="text-trust-blue mb-4" strokeWidth={1.75} />
              <div className="heading-display text-navy text-[1.6rem] leading-[1.1] sm:text-4xl md:text-5xl whitespace-nowrap">{s.value}</div>
              <p className="text-muted-brand text-sm mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What's inside */}
      <section className="py-24 md:py-32">
        <div className="container-px max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <span className="eyebrow text-trust-blue mb-4 block">What's inside</span>
            <h2 className="heading-display text-navy text-[1.75rem] leading-[1.05] sm:text-4xl md:text-6xl">Eight chapters. One simple system.</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHAPTERS.map(([n, t, d], i) => (
              <motion.div
                key={n}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 4) * 0.07 }}
                className={`rounded-2xl p-7 min-h-[220px] flex flex-col ${i === 3 ? "bg-accent-green text-navy" : "bg-off-white text-navy"}`}
              >
                <span className={`text-xs font-semibold ${i === 3 ? "text-navy" : "text-trust-blue"}`}>({n})</span>
                <h3 className="heading-display text-2xl mt-4">{t}</h3>
                <p className={`text-[15px] mt-3 leading-relaxed ${i === 3 ? "text-navy/80" : "text-muted-brand"}`}>{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="bg-deep-navy py-24 md:py-32 overflow-hidden">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <motion.div {...fadeUp} className="max-w-2xl">
              <span className="eyebrow text-accent-green mb-4 block">Take a look inside</span>
              <h2 className="heading-display text-white text-[1.75rem] leading-[1.05] sm:text-4xl md:text-6xl">Diagrams, routines and printables. No fluff.</h2>
            </motion.div>
            <DownloadButton onClick={openForm} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {PREVIEWS.map((p, i) => (
              <motion.img
                key={p.src}
                src={publicUrl(p.src)}
                alt={p.alt}
                loading="lazy"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="w-full rounded-lg shadow-2xl hover:-translate-y-2 transition-transform duration-500"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-24 md:py-32">
        <div className="container-px max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <motion.div {...fadeUp}>
            <span className="eyebrow text-trust-blue mb-4 block">Who it's for</span>
            <h2 className="heading-display text-navy text-[1.75rem] leading-[1.05] sm:text-4xl md:text-6xl">If you sit for work, this is for you.</h2>
            <p className="text-muted-brand text-lg mt-6 max-w-md leading-relaxed">
              You don't need a gym or a physio budget. You need a better setup, a few minutes of movement and a plan you'll actually follow.
            </p>
          </motion.div>
          <div className="space-y-4">
            {[
              ["Office & remote workers", "End the day without a stiff neck and aching lower back."],
              ["Students & creators", "Long study or editing sessions without the slump."],
              ["Drivers & shift workers", "Simple resets for long hours in one position."],
            ].map(([t, d], i) => (
              <motion.div key={t} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="flex gap-6 border-t border-border pt-6">
                <span className="heading-display text-trust-blue text-3xl">0{i + 1}</span>
                <div>
                  <h3 className="heading-display text-navy text-2xl">{t}</h3>
                  <p className="text-muted-brand mt-1">{d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white py-24 md:py-28">
        <div className="container-px max-w-3xl mx-auto">
          <motion.h2 {...fadeUp} className="heading-display text-navy text-[1.6rem] leading-[1.1] sm:text-4xl md:text-5xl text-center mb-10">Questions, answered.</motion.h2>
          <Accordion type="single" collapsible className="bg-white rounded-2xl px-6">
            {FAQS.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-navy text-left text-base font-semibold">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-brand text-[15px] leading-relaxed">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-accent-green py-20 md:py-28">
        <div className="container-px max-w-[1400px] mx-auto text-center">
          <h2 className="heading-display text-navy text-[1.9rem] leading-[1.05] sm:text-5xl md:text-7xl max-w-4xl mx-auto">Start your pain-free workday today.</h2>
          <p className="text-navy/75 text-lg mt-5 max-w-xl mx-auto">Free, instant, and built to fit into 10 minutes a day.</p>
          <div className="mt-10">
            <DownloadButton onClick={openForm} variant="dark" />
          </div>
        </div>
      </section>

      <Footer />

      <LeadFormModal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Free PDF guide"
        title="Where should we send your guide?"
        subtitle="Enter your details and your download starts right away."
        source="guide-download"
        submitLabel="GET MY FREE GUIDE"
        onSuccess={triggerDownload}
        successContent={
          <>
            <h3 className="heading-display text-navy text-3xl">Your guide is downloading.</h3>
            <p className="text-muted-brand mt-3">If it didn't start, use the button below.</p>
            <a
              href={GUIDE_PDF_URL}
              download={PDF_FILENAME}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy text-white px-7 py-3 text-sm font-semibold hover:bg-trust-blue"
            >
              <Download size={16} /> DOWNLOAD PDF
            </a>
            <div className="mt-4">
              <Link to="/shop" onClick={() => setOpen(false)} className="text-sm font-semibold text-trust-blue hover:underline">
                Browse our support products →
              </Link>
            </div>
          </>
        }
      />
    </div>
  );
}
