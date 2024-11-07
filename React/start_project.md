# Vite + React Project Setup with Tailwind CSS and Framer Motion

This guide provides step-by-step instructions on setting up a React project using Vite as the build tool. We will integrate Tailwind CSS for styling, Framer Motion for animations, and smooth scrolling using `react-anchor-link-smooth-scroll`. Additionally, we will configure the project to work with Prettier and the Tailwind Prettier plugin.

## Steps:

### 1. Create a Vite Project

To create a new Vite project, run the following command:

```bash
npm create vite@latest
```

This will prompt you to name your project and select a framework. Choose **React**.

### 2. Install Required Dependencies

After setting up your Vite project, navigate into your project folder and install the required dependencies:

```bash
npm install framer-motion react-anchor-link-smooth-scroll@1.0.12 @heroicons/react
```

These are the main libraries we will be using for animations (`framer-motion`), smooth scrolling (`react-anchor-link-smooth-scroll`), and icons (`@heroicons/react`).

For TypeScript or type support, install the following types as development dependencies:

```bash
npm install -D @types/react-anchor-link-smooth-scroll@1.0.2 @types/node
```

### 3. Remove Unnecessary Files and Code

To clean up the project, perform the following steps:

- **Delete `App.css`:** This file is not needed since we'll use Tailwind for styling.

- **Modify `App.jsx`:** Remove unnecessary boilerplate code. Keep only the essential components or write new ones based on your project's requirements.

- **Clear `index.css`:** Remove all the default CSS from `index.css` as Tailwind will manage the styling.

### 4. Configure Vite for React Import Path Aliases

Open the `vite.config.js` (or `vite.config.ts` for TypeScript projects) and configure the React import path as shown below. This setup uses Vite's path aliasing for cleaner import paths.

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: [{ find: "a", replacement: path.resolve(__dirname, "src") }],
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3000",
  },
});
```

This configuration:

- Sets up an alias to the `src` folder for simpler imports.
- Configures the development server to use port 3000 and to listen on all interfaces (`0.0.0.0`).

### 5. Install and Configure Tailwind CSS

#### Install Tailwind and Related Tools

To install Tailwind CSS along with PostCSS and Autoprefixer, run the following command:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Next, initialize the Tailwind CSS configuration:

```bash
npx tailwindcss init -p
```

This will generate a `tailwind.config.cjs` file and add PostCSS configuration.

#### Modify `tailwind.config.cjs`

In your `tailwind.config.cjs`, specify the files where Tailwind CSS should look for class names (content paths):

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

This setup ensures that Tailwind will scan your HTML and JSX/TSX files for class names to include in the final build.

### 6. Add Tailwind Directives to CSS

In the `index.css` file (or any main CSS file that you will use for global styles), add the Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

These directives include Tailwind’s base, component, and utility styles in your project.

### 7. Install and Configure Prettier with Tailwind Plugin

#### Install Prettier

To ensure code formatting consistency, install Prettier along with the Tailwind CSS Prettier plugin:

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

#### Create a Prettier Configuration File

In the root of your project, create a file named `prettier.config.cjs` and configure it as follows:

```js
// prettier.config.cjs
module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
};
```

This configuration ensures that Prettier automatically sorts Tailwind CSS classes in a consistent order when formatting your code.

## Summary of Files

- **`vite.config.js`:** Configures Vite with React and path aliases.
- **`tailwind.config.cjs`:** Configures Tailwind's content paths.
- **`index.css`:** Includes Tailwind's base, components, and utilities.
- **`prettier.config.cjs`:** Configures Prettier with the Tailwind CSS plugin.

## Running the Project

Now that everything is set up, you can run your development server using:

```bash
npm run dev
```

This will start your Vite server and open your React app in the browser, typically at `http://localhost:3000`.

## Conclusion

You now have a Vite-powered React project with Tailwind CSS, Framer Motion for animations, and Prettier for code formatting, along with smooth scrolling functionality and Heroicons for icons. This setup is highly customizable and can be expanded based on your specific project needs.
