export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened, darkMode, setDarkMode } = props;

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
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-[10%] left-[30%] w-12 h-12 bg-gray-300 dark:bg-slate-800 rounded-full opacity-60"></div>
          <div className="absolute top-[20%] left-[60%] w-8 h-8 bg-gray-300 dark:bg-slate-800 rounded-full opacity-40"></div>
          <div className="absolute top-[50%] left-[20%] w-24 h-24 bg-gray-300 dark:bg-slate-800 rounded-full opacity-30"></div>
          <div className="absolute bottom-[20%] left-[50%] w-16 h-16 bg-gray-300 dark:bg-slate-800 rounded-full opacity-50"></div>
          <div className="absolute bottom-[10%] left-[20%] w-10 h-10 bg-gray-300 dark:bg-slate-800 rounded-full opacity-40"></div>
          <div className="absolute top-[40%] right-[-10%] w-32 h-32 bg-gray-300 dark:bg-slate-800 rounded-full opacity-20"></div>
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