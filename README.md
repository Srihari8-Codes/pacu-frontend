# PACU Monitor Frontend - Getting Started

This is the React + TypeScript frontend for the PACU Monitor system, designed with a modern medical aesthetic based on the Figma mockups.

## Features
- **Splash & Onboarding**: Animated intro and carousel explaining core monitoring features.
- **Auth Flow**: Secure Login/Register with HttpOnly cookie support and role selection.
- **Real-time Dashboard**: 
  - Live statistics for hospital metrics.
  - Interactive Vital Monitor grid with pulse wave simulations.
  - Socket.IO integration for live patient updates.
- **Admin Panel**: User Management and System Audit Logs.

## Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

## Local Development Setup

### 1. Install Dependencies
Run from the root directory:
```bash
npm install
```

### 2. Configure Environment Variables
You need to set up your environment variables before running the application.
Copy the example file to create your own configuration:
```bash
cp .env.example .env
```
Update `.env` with the IP/port of the backend server:
```text
VITE_API_URL=http://<backend-ip>:8181/api
VITE_SOCKET_URL=http://<backend-ip>:8181
```

### 3. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## Production Deployment 🚀

To deploy this application to a production environment (like Vercel, Netlify, or an Nginx server):

1. **Environment Variables**: Configure the environment variables `VITE_API_URL` and `VITE_SOCKET_URL` in your hosting platform's settings.
2. **Build the App**:
   ```bash
   npm run build
   ```
   This will generate a `dist` directory with the compiled static assets.
3. **Serve**: Point your web server (e.g., Nginx, Apache) to serve the `dist` folder. If using a modern cloud platform, simply set the build command to `npm run build` and output directory to `dist`.

*Note: The frontend has been validated and compiled successfully without TypeScript errors.*

## Design System
- **Colors**: Deep Blue (`#2B6BF3`), Monitor Dark (`#090C12`), Monitor Green (`#34D399`).
- **Typography**: Inter (Modern Sans-Serif).
- **Icons**: Lucide React.
- **Animations**: Framer Motion.
