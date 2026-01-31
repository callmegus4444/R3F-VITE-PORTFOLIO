import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import { useForm, ValidationError } from '@formspree/react';

import { rocketModeAtom } from "./Rocket";

const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start relative
   ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection, menuOpened } = props;
  const [rocketMode] = useAtom(rocketModeAtom);

  return (
    <div className="flex flex-col items-center w-screen">
      {/* Main UI - Fades out during Rocket Mode */}
      <div className={`transition-opacity duration-1000 w-full flex flex-col items-center ${rocketMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <AboutSection setSection={setSection} />
        <SkillsSection menuOpened={menuOpened} />
        <Section>
          <ProjectsSection />
        </Section>
        <ContactSection />
      </div>

      {/* Smoke Effect and Iris Overlay managed via components below */}
      <SmokeEffect active={rocketMode} />
      <IrisOverlay active={rocketMode} />

      {/* FINAL APPROACH FOR IRIS:
           We need a dark overlay that covers the screen.
           We cut a hole in it.
           We expand the hole.
           This is best done with a massive box-shadow or SVG, or simply:
           A div with `clip-path: circle(0% at center)` REVEALS nothing (so div is invisible? No).
           Clip-path clips the element itself.
           
           If we want to COVER the screen and REVEAL the center:
           We neeed the Overlay to be distinct.
           Let's use a full-screen div with a radial-gradient mask?
           Or simpler: 4 divs? No.
           
           SVG Mask is best.
       */}
      <IrisOverlay active={rocketMode} />

    </div>
  );
};

const IrisOverlay = ({ active }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      {/* 
                We use an SVG mask to create a "hole" in a black rectangle.
             */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="50" cy="50" r="0" fill="black">
              <animate attributeName="r" from="0" to="100" dur="3s" fill="freeze" begin="0.5s" calcMode="spline" keySplines="0.42 0 0.58 1" />
            </circle>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#BE185D" mask="url(#hole)" />
        {/* 1e1b4b is deep indigo/space color */}
      </svg>
    </div>
  )
}

const SmokeEffect = ({ active }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none flex justify-center overflow-hidden">
      {/* Container: Holds the smoke generator, moves UP with rocket */}
      <div className="smoke-container absolute bottom-0 w-full h-full flex justify-center">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="smoke-particle"
            style={{
              animationDelay: `${Math.random() * 2}s`,
              left: `${50 + (Math.random() - 0.5) * 15}%`,
              transform: `scale(${0.5 + Math.random()})`
            }}
          />
        ))}
      </div>
      <style>{`
            /* Phase 1 & 2: Stay bottom. Phase 3: Fly UP */
            .smoke-container {
                animation: container-fly 7s ease-in forwards;
            }
            @keyframes container-fly {
                0% { transform: translateY(0); }
                70% { transform: translateY(0); } /* 5s / 7s approx 70% */
                100% { transform: translateY(-150vh); } /* Follow rocket up */
            }

            /* Continuous Puffing Animation */
            .smoke-particle {
                position: absolute;
                bottom: -50px;
                width: 120px;
                height: 120px;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
                border-radius: 50%;
                /* translate-x handled in transform but we need to keep centering? 
                   Actually left 50% centers it. */
                opacity: 0;
                animation: puff 2s infinite ease-out;
            }
            @keyframes puff {
                0% { opacity: 0; transform: translateX(-50%) scale(0.5) translateY(0); }
                20% { opacity: 0.8; }
                100% { opacity: 0; transform: translateX(-50%) scale(2.5) translateY(-300px); }
            }
        `}</style>
    </div>
  );
}

const AboutSection = (props) => {
  const { setSection } = props;
  return (
    <Section mobileTop>
      <h1 className="text-[clamp(2rem,5vw,4rem)] font-basteleur font-bold leading-snug mt-8 md:mt-0 dark:text-white">
        Hi, I'm
        <br />
        <span className="text-[#BE185D] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#7c3aed] dark:via-purple-400 dark:to-white dark:drop-shadow-[0_0_15px_rgba(124,58,237,0.8)]">
          Amandeep Singh Batra
        </span>
      </h1>
      <motion.p
        className="text-lg text-gray-800 mt-4 dark:text-gray-300"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        I develop new technological solutions.
        <br />
        Can help you out !!
      </motion.p>
      <motion.button
        onClick={() => setSection(3)}
        className={`bg-space-button-light hover:bg-pink-700 dark:bg-space-500 dark:hover:bg-space-600 text-white py-4 px-8 transition-colors shadow-[0_0_15px_rgba(190,24,93,0.5)] dark:shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(190,24,93,0.8)] dark:hover:shadow-[0_0_25px_rgba(147,51,234,0.8)]
      rounded-lg font-bold text-lg mt-4 md:mt-16`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "MERN STACK",
    level: 80,
  },
  {
    title: "MACHINE LEARNING",
    level: 90,
  },
  {
    title: "DEEP LEARNING",
    level: 90,
  },
  {
    title: "JAVA",
    level: 60,
  },
  {
    title: "THREEJS & GSAP",
    level: 40,
  },
];
const languages = [
  {
    title: " 🇮🇳 Hindi",
    level: 100,
  },
  {
    title: "🇺🇸 English",
    level: 80,
  },
  {
    title: "🇮🇳 Punjabi",
    level: 20,
  },
];

const SkillsSection = ({ menuOpened }) => {
  return (
    <Section>
      <motion.div className="w-full" whileInView={"visible"}>
        <h2 className="text-3xl md:text-4xl font-basteleur tracking-wider font-bold text-[#7c3aed] drop-shadow-[0_0_10px_rgba(124,58,237,0.5)] group inline-block cursor-default relative">
          Skills
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#BE185D] transition-all duration-500 group-hover:w-full"></span>
        </h2>
        <div className=" mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className=" w-full md:w-64" key={index}>
              <motion.h3
                className=" text-lg md:text-xl font-bold text-gray-100"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-[#BE185D] rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-basteleur tracking-wider font-bold mt-10 text-[#7c3aed] drop-shadow-[0_0_10px_rgba(124,58,237,0.5)] group inline-block cursor-default relative">
            Languages
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#BE185D] transition-all duration-500 group-hover:w-full"></span>
          </h2>
          <div className=" mt-8 space-y-4">
            {languages.map((lng, index) => (
              <div className="w-full md:w-64" key={index}>
                <motion.h3
                  className=" text-lg md:text-xl font-bold text-gray-100"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-[#BE185D] rounded-full "
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3D Character Message Boxes - Fades out when menu opens */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl pointer-events-none h-full hidden md:block"
        animate={{ opacity: menuOpened ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >


        {/* Box 1 (Left) - Hidden on mobile */}
        <motion.div
          className="hidden md:block absolute left-[16%] top-[35%] bg-white/30 dark:bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/40 dark:border-white/10 shadow-xl max-w-xs pointer-events-auto"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-basteleur">About Me</div>
          <p className="text-gray-800 dark:text-gray-200">👋my developer name is callmegus</p>
          {/* Arrow pointing right */}
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-white/30 dark:border-l-black/40 blur-[1px]"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-white/30 dark:border-l-black/40"></div>
        </motion.div>

        {/* Box 2 (Right) - Hidden on mobile */}
        <motion.div
          className="hidden md:block absolute right-[15%] top-[35%] bg-white/30 dark:bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/40 dark:border-white/10 shadow-xl max-w-xs pointer-events-auto"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-250px" }} // Increased margin to fade out earlier
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-800 dark:text-gray-200 italic leading-relaxed">
            "Always chasing new places, stronger lifts, and better stories.
            If there's a book to read or people to meet, I'm in — curiosity included 😄"
          </p>
          {/* Arrow pointing left */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-white/30 dark:border-r-black/40 blur-[1px]"></div>
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-white/30 dark:border-r-black/40"></div>
        </motion.div>

      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full flex-col items-center justify-center gap-8">
        <h2 className="text-3xl md:text-4xl font-basteleur tracking-wider font-bold text-[#7c3aed] mb-8 drop-shadow-[0_0_10px_rgba(124,58,237,0.5)] group inline-block cursor-default relative -ml-16">
          Projects
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#BE185D] transition-all duration-500 group-hover:w-full"></span>
        </h2>
        <motion.div
          className="flex gap-24 mt-[28rem] z-10 -ml-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-100px" }} // Appears sooner, but still fades out towards edges
          transition={{ duration: 0.2 }} // Faster fade
        >
          <button
            className="hover:scale-110 transition-all p-3 rounded-full bg-pink-700 dark:bg-pink-700 shadow-lg text-white hover:bg-pink-600 dark:hover:bg-pink-600 cursor-pointer pointer-events-auto"
            onClick={previousProject}
            aria-label="Previous Project"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="hover:scale-110 transition-all p-3 rounded-full bg-pink-700 dark:bg-pink-700 shadow-lg text-white hover:bg-pink-600 dark:hover:bg-pink-600 cursor-pointer pointer-events-auto"
            onClick={nextProject}
            aria-label="Next Project"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </Section>
  );
};
const ContactSection = () => {
  const [state, handleSubmit] = useForm("xrbqjlyb");
  const [, setRocketMode] = useAtom(rocketModeAtom);

  return (
    <Section>
      {/* Large Bold Typography Header - Inspired by reference */}
      <div className="w-full mb-8 -mt-10"> {/* Reduced negative margin to prevent cutoff */}
        <h2 className="text-3xl md:text-4xl font-basteleur tracking-wider font-bold leading-none text-[#7c3aed] drop-shadow-[0_0_10px_rgba(124,58,237,0.5)] group inline-block cursor-default relative">
          <span className="block">Contact</span>
          <span className="block">Me</span>
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#BE185D] transition-all duration-500 group-hover:w-full"></span>
        </h2>
      </div>

      {/* Main Contact Card - Glassmorphism Style */}
      <div className="w-full max-w-lg">
        <div className="p-8 rounded-2xl bg-white/80 dark:bg-zinc-800/90 backdrop-blur-lg shadow-xl border border-white/20">
          {state.succeeded ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✨</div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Thanks for reaching out!</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="font-semibold text-gray-900 dark:text-white block mb-2 text-sm uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  className="block w-full rounded-xl border-0 bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white shadow-inner ring-1 ring-gray-200 dark:ring-zinc-600 placeholder:text-gray-400 dark:placeholder:text-zinc-400 focus:ring-2 focus:ring-indigo-500 p-4 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-semibold text-gray-900 dark:text-white block mb-2 text-sm uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="your@email.com"
                  className="block w-full rounded-xl border-0 bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white shadow-inner ring-1 ring-gray-200 dark:ring-zinc-600 placeholder:text-gray-400 dark:placeholder:text-zinc-400 focus:ring-2 focus:ring-indigo-500 p-4 transition-all"
                />
                <ValidationError
                  className="mt-2 text-red-500 text-sm"
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div>
                <label htmlFor="message" className="font-semibold text-gray-900 dark:text-white block mb-2 text-sm uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="block w-full rounded-xl border-0 bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white shadow-inner ring-1 ring-gray-200 dark:ring-zinc-600 placeholder:text-gray-400 dark:placeholder:text-zinc-400 focus:ring-2 focus:ring-indigo-500 p-4 transition-all resize-none"
                />
                <ValidationError
                  className="mt-2 text-red-500 text-sm"
                  errors={state.errors}
                />
              </div>
              <button
                disabled={state.submitting}
                className="w-full bg-space-button-light hover:bg-pink-700 dark:bg-space-500 dark:hover:bg-space-600 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </div>
        {/* Rocket Launch Button - Returned to Interface */}
        <div className="absolute bottom-28 right-6 md:absolute md:top-1/2 md:bottom-auto md:right-60 md:-translate-y-1/2 z-[50]">
          <button
            onClick={() => setRocketMode(true)}
            className="w-12 h-12 bg-pink-700 hover:bg-pink-600 dark:bg-space-600 dark:hover:bg-space-500 text-white rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center group cursor-pointer"
            title="Launch Rocket!"
          >
            <span className="text-lg group-hover:-translate-y-1 transition-transform">🚀</span>
          </button>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/10 backdrop-blur-md p-2 rounded text-xs text-white max-w-[100px] text-center hidden md:block pointer-events-none w-max">
            Wanna ride back up!
          </div>
        </div>
      </div>

      {/* Social Links - Adaptive Layout */}
      <div className="w-full md:w-auto md:absolute md:right-8 md:bottom-32 flex flex-row md:flex-col items-center justify-center gap-8 z-50 mt-10 md:mt-0">
        <a href="https://github.com/callmegus4444" target="_blank" rel="noopener noreferrer" className="text-black dark:text-gray-400 hover:text-space-500 dark:hover:text-space-400 transition-colors transform hover:scale-110 pointer-events-auto">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-black dark:text-gray-400 hover:text-space-500 dark:hover:text-space-400 transition-colors transform hover:scale-110 pointer-events-auto">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black dark:text-gray-400 hover:text-space-500 dark:hover:text-space-400 transition-colors transform hover:scale-110 pointer-events-auto">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
        </a>
        <span className="text-black dark:text-gray-600 text-sm font-bold tracking-widest md:[writing-mode:vertical-rl] md:rotate-180">© 2026</span>
      </div>

      {/* Marquee Banner at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900/60 via-pink-900/60 to-purple-900/60 dark:bg-gradient-to-r dark:from-[#1a0b2e]/80 dark:via-[#2d1b4e]/80 dark:to-[#1a0b2e]/80 backdrop-blur-md py-3 z-40">
        <div className="marquee-container">
          <div className="marquee-content text-white font-bold text-lg">
            <span className="mx-8">Reach me out for work inquiries and commissions</span>
            <span className="mx-4">☺</span>
            <span className="mx-8 px-6 py-2 bg-space-button-light dark:bg-space-500 text-white rounded-full font-bold">Get in touch</span>
            <span className="mx-8">Reach me out for work inquiries and commissions</span>
            <span className="mx-4">☺</span>
            <span className="mx-8 px-6 py-2 bg-space-button-light dark:bg-space-500 text-white rounded-full font-bold">Get in touch</span>
            <span className="mx-8">Reach me out for work inquiries and commissions</span>
            <span className="mx-4">☺</span>
            <span className="mx-8 px-6 py-2 bg-space-button-light dark:bg-space-500 text-white rounded-full font-bold">Get in touch</span>
          </div>
        </div>
      </div>
    </Section >
  );
};
