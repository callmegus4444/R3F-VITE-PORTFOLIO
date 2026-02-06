import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";
import { Suspense, useEffect, useState } from "react";
import { ScrollManager } from "./components/ScrollManager";
import { Menu } from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { framerMotionConfig } from "./config";
import { Leva } from "leva";
import { Cursor } from "./components/Cursor";
import { LoadingScreen } from "./components/LoadingScreen";
import { Background } from "./components/Background";
import { isSpeakingAtom, backgroundAudioMutedAtom } from "./components/AudioState";
import { useAtom } from "jotai";

import { useRef } from "react";

function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isSpeaking] = useAtom(isSpeakingAtom);
  const [audioMuted, setAudioMuted] = useAtom(backgroundAudioMutedAtom);
  const audioRef = useRef(null);

  // Toggle dark class on html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  useEffect(() => {
    // Create audio instance
    const audio = new Audio("/Audios/Space Ambient Music.wav");
    audio.loop = true;
    audio.volume = 0.2; // Default volume
    audioRef.current = audio;

    const playAudio = () => {
      // Only play if NOT muted
      if (!audioRef.current.muted && !audioRef.current.paused) return;

      // We'll rely on the other useEffect to handle the actual play command based on audioMuted state
      // But we need to unlock the audio context for browsers
      audio.play().then(() => {
        // Immediately pause if we are supposed to be muted
        // We can't access audioMuted (atom) easily here in closure without dependency, 
        // but the other effect will catch it. 
      }).catch(e => console.warn("Audio autoplay blocked", e));

      window.removeEventListener('click', playAudio);
      window.removeEventListener('keydown', playAudio);
    };

    // Attempt play
    audio.play().catch(() => {
      window.addEventListener('click', playAudio);
      window.addEventListener('keydown', playAudio);
    });

    return () => {
      audio.pause();
      audio.src = ""; // Clean up source
      window.removeEventListener('click', playAudio);
      window.removeEventListener('keydown', playAudio);
    };
  }, []);

  // Handle Ducking and Muting
  useEffect(() => {
    if (audioRef.current) {
      if (audioMuted) {
        audioRef.current.volume = 0;
        audioRef.current.pause();
      } else {
        // Ensure it's playing if unmuted
        if (audioRef.current.paused) {
          audioRef.current.play().catch(e => console.warn("Resume failed", e));
        }

        if (isSpeaking) {
          audioRef.current.volume = 0.05; // Duck to very low
        } else {
          audioRef.current.volume = 0.2; // Restore volume
        }
      }
    }
  }, [isSpeaking, audioMuted]);

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <MotionConfig transition={{
        ...framerMotionConfig,
      }}>

        <Canvas shadows camera={{ position: [0, 3, 10], fov: 43 }}>
          <color attach="background" args={[darkMode ? "#0f172a" : "#e6e7ff"]} />
          <ScrollControls pages={4} damping={0.1} >
            <ScrollManager section={section} onSectionChange={setSection} />
            {/* Fixed Background that doesn't scroll */}
            <Background darkMode={darkMode} />
            <Scroll>
              <Suspense>
                {(started &&
                  <Experience section={section} menuOpened={menuOpened} darkMode={darkMode} />
                )}
              </Suspense>
            </Scroll>
            <Scroll html>
              {started && <Interface setSection={setSection} darkMode={darkMode} menuOpened={menuOpened} />}
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu onSectionChange={setSection} menuOpened={menuOpened} setMenuOpened={setMenuOpened} darkMode={darkMode} setDarkMode={setDarkMode} audioMuted={audioMuted} setAudioMuted={setAudioMuted} />
        <Cursor />

        {/* Rocket Launch Button removed (moved to Interface.jsx) */}

        {/* Floating Controls Container (Bottom Right) */}
        <div className="fixed bottom-12 left-12 md:bottom-20 md:left-20 z-50 flex flex-row gap-4 items-center">

          {/* Floating Theme Toggle Button */}
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Audio Toggle Button */}
          <button
            className="theme-toggle"
            onClick={() => setAudioMuted(!audioMuted)}
            aria-label="Toggle background audio"
          >
            {audioMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4l-6.81 4H4.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.75"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </button>
        </div>
      </MotionConfig>
      <Leva hidden />
    </>

  );
}

export default App;
