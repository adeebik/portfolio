"use client";

import Link from "next/link";
import Image from "next/image";
import { GitHubActivity } from "@/components/shared/GitHubActivity";
import { ArrowRight, Github, Linkedin, ExternalLink, Link as LinkIcon, Twitter, Hash } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { SpotifyPlayer } from "@/components/shared/SpotifyPlayer";
import { motion, AnimatePresence } from "framer-motion";

function ExperienceItem({ exp, isDefaultOpen }: { exp: any, isDefaultOpen: boolean }) {
  const [isExpanded, setIsExpanded] = useState(isDefaultOpen);
  
  return (
    <div className="border-b border-border/50 py-6 transition-all duration-300">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-4 text-left group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center overflow-hidden">
             <Image 
              src={exp.logo || `https://api.dicebear.com/7.x/initials/svg?seed=${exp.company}&backgroundColor=b6e3f4`} 
              alt={exp.company}
              width={48}
              height={48}
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{exp.role}</h3>
              {exp.current && (
                <div className="badge inline-flex items-center gap-1.5 bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400 py-0.5 px-2">
                   <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                   current
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground font-medium">{exp.company} • {exp.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono hidden sm:block">{exp.period}</p>
          <div className={`p-2 rounded-full bg-muted/20 border border-border transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>
        </div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 pl-16 flex flex-col gap-6">
              <ul className="flex flex-col gap-2">
                {exp.points.map((point: string, pIdx: number) => (
                  <li key={pIdx} className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t: string) => (
                  <div key={t} className="px-2.5 py-1 bg-muted/30 border border-border/50 rounded-lg text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <img src={`https://skillicons.dev/icons?i=${t.toLowerCase().replace(/[\s.]/g, '')}`} className="w-3.5 h-3.5" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {

  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".hero-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.2
    })
    .from(".hero-description", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .from(".hero-buttons", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5");

    (async function () {
      const cal = await getCalApi({"namespace":"15min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-24 opacity-0 transition-opacity duration-700 ease-in-out"
      style={{ opacity: 1 }}
    >
      {/* Hero Section */}
      <section className="flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-border shadow-2xl">
                <Image
                  src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Adeeb&backgroundColor=b6e3f4"
                  alt="Avatar"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="badge inline-flex items-center gap-2 bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Available for work
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="hero-title text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Adeeb Khan —
              </h1>
              <p className="hero-description text-xl text-muted-foreground font-medium">
                Full Stack Developer & Designer.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-start sm:items-end">
            <div className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-full border border-border">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Currently: Super 30 @100xdevs
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground/60 font-mono uppercase tracking-widest bg-muted/10 px-3 py-1 rounded-md border border-border/50">
              <span>Delhi, IN</span>
              <span>•</span>
              <span suppressHydrationWarning>
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}{" "}
                IST
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 max-w-3xl">
          <p className="hero-bio text-base leading-relaxed text-muted-foreground">
            I create minimalist and{" "}
            <span className="text-foreground font-semibold underline decoration-border underline-offset-8">
              performant
            </span>{" "}
            web experiences. Obsessed with tech, music,
            and fitness. I build interactive apps using{" "}
            <span className="inline-flex items-center gap-1.5 bg-muted/40 border border-border px-2 py-1 rounded-md text-xs font-semibold">
              <img
                src="https://skillicons.dev/icons?i=nextjs"
                className="w-4 h-4"
              />{" "}
              Next.js
            </span>
            ,{" "}
            <span className="inline-flex items-center gap-1.5 bg-muted/40 border border-border px-2 py-1 rounded-md text-xs font-semibold">
              <img
                src="https://skillicons.dev/icons?i=ts"
                className="w-4 h-4"
              />{" "}
              TypeScript
            </span>{" "}
            and{" "}
            <span className="inline-flex items-center gap-1.5 bg-muted/40 border border-border px-2 py-1 rounded-md text-xs font-semibold">
              <img
                src="https://skillicons.dev/icons?i=react"
                className="w-4 h-4"
              />{" "}
              React
            </span>
            .
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link href="#contact" className="btn-primary btn-sm">
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="https://drive.google.com/file/d/1EJHmzBoRR-ppT-_uGHNPHHKOPHwpH8hr/view?usp=sharing"
              target="_blank"
              className="btn-secondary btn-sm"
            >
              Resume
              <ExternalLink className="w-4 h-4 opacity-60" />
            </Link>
            <div className="flex items-center gap-3 ml-2">
              {[
                { icon: Github, href: "https://github.com/adeebik" },
                { icon: Twitter, href: "https://x.com/adeeebik" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/adeebiqbalkhan/",
                },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="p-2 text-muted-foreground hover:text-foreground transition-all hover:bg-muted/30 rounded-xl border border-transparent hover:border-border"
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          <SpotifyPlayer />
        </div>
      </section>

      <section id="projects" className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <div className="badge inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            My Projects
          </div>
          <h2 className="text-2xl font-bold text-foreground">Selected Work</h2>
        </div>

        <div className="grid lg:grid-cols-2  sm:grid-cols-1 gap-8">
          <ProjectCard
            title="Mindly"
            description="Your second brain, supercharged. Save links, videos, tweets, and ideas. Organize your knowledge in one place."
            tags={[
              "Nextjs",
              "Typescript",
              "PostgreSQL",
              "Prisma",
              "TailwindCSS",
            ]}
            github="https://github.com/adeebik/Mindly_Fe"
            demo="https://mindly-fe-five.vercel.app/"
            video="https://www.loom.com/share/abdf456ddfae4eb08687f7b74174b3ca"
            image="/mindly-mockup.png"
          />
          <ProjectCard
            title="Chat-App"
            description="A real-time messaging platform where users can engage in seamless conversations and group chats."
            tags={["React", "Nodejs", "MongoDB", "Cloudinary", "Socketio"]}
            github="https://github.com/adeebik/Chat-App_FE"
            demo="https://chat-app-fe-sepia.vercel.app/"
            video="https://www.loom.com/share/4774a0dbeba946e8ae7b4708ab420a54"
            image="/chat-app-mockup.png"
          />
        </div>

        <div className="flex justify-center -mt-4">
          <Link
            href="https://github.com/adeebik"
            target="_blank"
            className="btn-secondary btn-sm"
          >
            Explore more on GitHub
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <div className="badge inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Technical Skills
          </div>
          <h2 className="text-2xl font-bold text-foreground">My Toolkit</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            "js",
            "ts",
            "nodejs",
            "express",
            "react",
            "nextjs",
            "mongodb",
            "mysql",
            "postgres",
            "tailwind",
            "bootstrap",
            "prisma",
            "websocket",
            "docker",
            "aws",
            "git",
            "github",
            "postman",
            "figma",
            "wordpress",
          ].map((tech) => (
            <div
              key={tech}
              className="group flex items-center gap-2.5 bg-card/40 border border-border/50 px-4 py-2.5 rounded-2xl hover:bg-card/70 transition-all duration-300 glass hover:scale-105"
            >
              <img
                src={`https://skillicons.dev/icons?i=${tech}`}
                alt={tech}
                className="w-5 h-5 dark:grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <span className="text-[11px] font-bold capitalize tracking-tight">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <div className="badge inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Journey
          </div>
          <h2 className="text-2xl font-bold text-foreground">My Experience</h2>
        </div>

        <div className="flex flex-col border-t border-border/50">
          {[
            {
              company: "Freelance",
              role: "Fullstack Developer",
              location: "Remote",
              period: "Jun 2025 — Present",
              logo: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Adeeb&backgroundColor=b6e3f4",
              points: [
                "Building production-grade applications with modern stacks",
                "Specialized in AI tool integrations and scalable web architectures",
                "Consulting for startups on design systems and UX optimization",
              ],
              tech: ["Nextjs", "Typescript", "React", "Nodejs", "TailwindCSS"],
              current: true,
            },
            {
              company: "MARXRAY",
              role: "Junior Software Engineer",
              location: "Onsite",
              period: "Jul 2024 — Jun 2025",
              logo: "/marxray-logo.jpeg",
              points: [
                "Developed and maintained several full-stack projects using React and Node.js",
                "Optimized database queries and improved application performance by 30%",
                "Collaborated with cross-functional teams to deliver high-quality features",
              ],
              tech: ["React", "Nodejs", "MongoDB", "Express", "Docker"],
            },
            {
              company: "MARXRAY",
              role: "Software Developer Intern",
              location: "Onsite",
              period: "Jan 2024 — Jun 2024",
              logo: "/marxray-logo.jpeg",
              points: [
                "Worked on core feature development and bug fixing",
                "Gained hands-on experience with modern CI/CD pipelines and agile methodologies",
                "Participated in code reviews and architectural discussions",
              ],
              tech: ["React", "Express", "PostgreSQL", "Git"],
            },
            {
              company: "Top Chef Dubai",
              role: "Front End Developer Intern",
              location: "Onsite",
              period: "Jun 2023 — Nov 2023",
              logo: "/top-chef-logo.png",
              points: [
                "Led the redesign of the user dashboard, focusing on accessibility and responsive design",
                "Collaborated with designers to implement pixel-perfect UIs",
                "Integrated third-party APIs for seamless data flow",
              ],
              tech: ["React", "TailwindCSS", "Figma", "Bootstrap"],
            },
          ].map((exp, idx) => (
            <ExperienceItem key={idx} exp={exp} isDefaultOpen={idx === 0} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <div className="badge inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Open Source
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            GitHub Activity
          </h2>
        </div>
        <div className="w-full">
          <GitHubActivity />
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex flex-col gap-10 pt-10 pb-6" id="contact">
        <div className="flex items-center gap-4">
          <div className="badge inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Connect
          </div>
          <h2 className="text-2xl font-bold text-foreground">Get in touch</h2>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/0 rounded-[2.6rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative p-10 bg-card/40 border border-border/50 rounded-[2.5rem] glass flex flex-col gap-8 text-center items-center">
            <div className="max-w-md flex flex-col gap-4">
              <h3 className="text-3xl font-black tracking-tight text-foreground">
                Let&apos;s build something{" "}
                <span className="text-muted-foreground italic">
                  extraordinary
                </span>
                .
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                I&apos;m currently open to new opportunities and interesting
                projects. Whether you have a question or just want to say hi,
                I&apos;ll try my best to get back to you!
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="mailto:adeeb.codes@gmail.com" className="btn-primary">
                Send an Email
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                data-cal-namespace="15min"
                data-cal-link="adeeb-v48e9j/15min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="btn-secondary"
              >
                Schedule a Call
                <ExternalLink className="w-5 h-5 opacity-60" />
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-border/30 w-full justify-center">
              {[
                {
                  icon: Twitter,
                  href: "https://x.com/adeeebik",
                  label: "Twitter",
                },
                {
                  icon: Github,
                  href: "https://github.com/adeebik",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/adeebiqbalkhan/",
                  label: "LinkedIn",
                },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Connect */}
      <footer className="pt-12 border-t border-border flex flex-col gap-8">
        <p className="text-[10px] text-center font-bold uppercase tracking-widest text-muted-foreground/40">
          © {new Date().getFullYear()} Adeeb Khan. Built with love and a
          lot of caffeine.
        </p>
      </footer>
    </div>
  );
}


