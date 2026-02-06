# 🚀 3D Interactive Portfolio

An immersive, high-performance 3D portfolio website built with **React Three Fiber**, featuring a speaking 3D avatar, audio-reactive elements, and a gamified "Rocket Mode" navigation.

![Portfolio Preview](./public/preview.png)

## 🛠 Tech Stack

-   **Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
-   **3D Engine**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
-   **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/), Framer Motion 3D, GSAP
-   **State Management**: [Jotai](https://jotai.org/)
-   **Audio**: Native Web Audio API + Custom Hooks

---

## ✨ Key Features & Technical Details

### 1. 🧙‍♂️ Interactive 3D Avatar (`Avatar.jsx`)
-   **Lip Syncing**: Uses pre-computed JSON viseme data to animate the avatar's mouth morph targets (`Wolf3D_Head`, `Wolf3D_Teeth`) in sync with audio tracks.
-   **State Machine**: Switches between animations (`Typing`, `Standing`, `Falling`) based on scroll position.
-   **Head & Eye Tracking**: The avatar's head follows the camera, and smooth look-at constraints keep it lively.

### 2. 🎧 Advanced Audio System
-   **Audio Ducking**: Implements a "ducking" algorithm where background ambient music automatically lowers volume (from 0.2 to 0.05) when the avatar starts speaking.
-   **Smart Mute**:
    -   Global mute button (persists across tracks).
    -   **Rocket Mode Logic**: Immediately stops avatar speech when "Rocket Mode" is triggered to prevent audio overlapping.
    -   **Replay Prevention**: Logic in `Experience.jsx` prevents the avatar from repeating introductory lines when scrolling back up.

### 3. 🚀 "Rocket Mode" Gamification (`Rocket.jsx`)
-   A custom interaction where the user "rides" a rocket back to the top of the page.
-   **Particle Systems**: Custom GLSL element shaders for the rocket fire/smoke effect.
-   **Camera Transitions**: Smoothly animates the camera to follow the rocket's trajectory using `useFrame`.

### 4. 🌓 Dynamic Theming (Dark/Light Mode)
-   **Hybrid System**: Toggles Tailwind's `dark` class on the HTML root AND updates the 3D scene's background color dynamically.
-   **UI Adaptation**: Glassmorphism effects (`backdrop-blur`) adapt their opacity and tint based on the active mode (e.g., `bg-white/30` vs `bg-black/40`).

### 5. 📱 Responsive & Performance Optimized
-   **Adaptive Scaling**: The 3D office and avatar scale down automatically based on viewport width (`responsiveRatio` logic in `Experience.jsx`).
-   **Asset Optimization**: GLTF models are compressed, and textures are optimized for web delivery.

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── AudioState.js       # Jotai atoms for global audio state
│   ├── Avatar.jsx          # 3D Character logic & lip sync
│   ├── Experience.jsx      # Main 3D scene coordinator
│   ├── Interface.jsx       # HTML Overlay (UI, Text, Buttons)
│   ├── Menu.jsx            # hamburger menu & mobile nav
│   ├── Rocket.jsx          # Rocket 3D model & particle effects
│   └── ...
├── App.jsx                 # Entry point, Layout, Audio Context
├── config.js               # Animation constants
└── index.css               # Tailwind & Global styles
```

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/callmegus4444/r3f-vite-starter.git
    cd r3f-vite-starter
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view it in the browser.

---

## 🌐 Live Demo

Check out the live version here: [**Live Preview**](https://effortless-pudding-fa1d13.netlify.app/)

---

## 🎨 Asset Credits
-   **3D Models**: Custom built in Blender & Ready Player Me.
-   **Icons**: Heroicons & FontAwesome.
-   **Fonts**: 'Basteleur' (Custom display font).

---

Developed by **Amandeep Singh Batra**
