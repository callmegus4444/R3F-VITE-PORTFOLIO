export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened, darkMode, setDarkMode, audioMuted, setAudioMuted } = props;

  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-20 fixed top-4 right-4 md:top-12 md:right-12 p-3 bg-space-button-light hover:bg-pink-700 dark:bg-gradient-to-br dark:from-space-500 dark:to-space-600 dark:hover:from-space-400 dark:hover:to-space-500 transition-all w-11 h-11 rounded-md shadow-[0_0_10px_rgba(190,24,93,0.5)] dark:shadow-[0_0_10px_rgba(147,51,234,0.5)]"
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${menuOpened ? "rotate-45 translate-y-0.5" : ""
            }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${menuOpened ? "hidden" : ""
            }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${menuOpened ? "-rotate-45" : ""
            }`}
        />
      </button>
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 dark:bg-gradient-to-br dark:from-[#1a0b2e] dark:via-[#2d1b4e] dark:to-[#3d2b5e] transition-all overflow-hidden flex flex-col items-center justify-center rounded-l-[100%] shadow-2xl
        ${menuOpened ? " w-80 md:w-96" : "w-0 rounded-l-none"}`}
      >
        {/* Moon Craters (Decoration) */}
        {/* Moon Craters (Decoration) */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
          {/* Crater 1 - Pink/Rose */}
          <div className="absolute top-[10%] left-[30%] w-12 h-12 rounded-full opacity-80"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #fbcfe8, #db2777)',
              boxShadow: 'inset -2px -2px 6px rgba(190, 24, 93, 0.5), 0 0 15px rgba(219, 39, 119, 0.6)'
            }}></div>

          {/* Crater 2 - Cyan/Blue */}
          <div className="absolute top-[20%] left-[60%] w-8 h-8 rounded-full opacity-70"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #cffafe, #06b6d4)',
              boxShadow: 'inset -2px -2px 6px rgba(8, 145, 178, 0.5), 0 0 10px rgba(6, 182, 212, 0.6)'
            }}></div>

          {/* Crater 3 - Purple/Violet (Large) */}
          <div className="absolute top-[50%] left-[20%] w-24 h-24 rounded-full opacity-60"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #e9d5ff, #7c3aed)',
              boxShadow: 'inset -4px -4px 10px rgba(124, 58, 237, 0.5), 0 0 20px rgba(139, 92, 246, 0.6)'
            }}></div>

          {/* Crater 4 - Orange/Peach */}
          <div className="absolute bottom-[20%] left-[50%] w-16 h-16 rounded-full opacity-70"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #fed7aa, #ea580c)',
              boxShadow: 'inset -3px -3px 8px rgba(234, 88, 12, 0.5), 0 0 15px rgba(249, 115, 22, 0.6)'
            }}></div>

          {/* Crater 5 - Indigo */}
          <div className="absolute bottom-[10%] left-[20%] w-10 h-10 rounded-full opacity-60"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #c7d2fe, #4f46e5)',
              boxShadow: 'inset -2px -2px 6px rgba(79, 70, 229, 0.5), 0 0 10px rgba(99, 102, 241, 0.6)'
            }}></div>

          {/* Crater 6 - Side Giant (Gray/Slate base with purple glow) */}
          <div className="absolute top-[40%] right-[-10%] w-32 h-32 rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #9ca3af, #1f2937)',
              boxShadow: 'inset -5px -5px 15px rgba(88, 28, 135, 0.6), 0 0 30px rgba(124, 58, 237, 0.5)'
            }}></div>
        </div>

        <div className="flex-1 flex items-center justify-center flex-col gap-6 p-8 z-10 w-full pl-20">
          <MenuButton label="About" onClick={() => onSectionChange(0)} />
          <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
          <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
          <MenuButton label="Contact" onClick={() => onSectionChange(3)} />

          {/* Dark Mode Toggle in Menu */}
          <div className="mt-8 pt-8 border-t border-gray-300 dark:border-slate-800 w-full flex justify-center">
            <button
              onClick={() => setDarkMode && setDarkMode(!darkMode)}
              className="flex items-center gap-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-space-500 dark:hover:text-space-400 transition-colors"
            >
              {darkMode ? (
                <>
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
                  Light Mode
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                  Dark Mode
                </>
              )}
            </button>
          </div>

          {/* Audio Toggle in Menu */}
          <div className="mt-4 pt-4 border-t border-gray-300 dark:border-slate-800 w-full flex justify-center">
            <button
              onClick={() => setAudioMuted && setAudioMuted(!audioMuted)}
              className="flex items-center gap-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-space-500 dark:hover:text-space-400 transition-colors"
            >
              {audioMuted ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                    <path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4l-6.81 4H4.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.75"></path>
                  </svg>
                  Unmute Music
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                  Mute Music
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer transition-colors relative group overflow-hidden"
    >
      <div className="transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
        <span className="block text-gray-900 dark:text-white group-hover:text-[#BE185D] dark:group-hover:text-[#BE185D]">
          {label}
        </span>
        <span className="block absolute top-full left-0 w-full text-[#BE185D] dark:text-[#BE185D]">
          {label}
        </span>
      </div>
    </button>
  );
};