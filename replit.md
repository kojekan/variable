# Metaverse Landing Page

## Overview
A modern metaverse/virtual world landing page built with Next.js 13 App Router. Features smooth animations using Framer Motion and styled with Tailwind CSS.

## Tech Stack
- **Framework**: Next.js 13 (with experimental App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build System**: Next.js built-in (Webpack)

## Project Structure
- `/app` - Next.js App Router pages and layout
- `/components` - Reusable UI components (Navbar, Footer, Cards, etc.)
- `/sections` - Page sections (Hero, About, Explore, etc.)
- `/styles` - Global CSS and Tailwind configuration
- `/public` - Static assets (images, fonts, icons)
- `/utils` - Utility functions (motion variants)

## Development Setup
- **Server**: Runs on port 5000 (configured for Replit)
- **Host**: Bound to 0.0.0.0 for Replit proxy support
- **Dev Command**: `npm run dev`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

## Deployment Configuration
- **Type**: Autoscale (stateless website)
- **Build**: `npm run build`
- **Run**: `npm start`
- **Port**: 5000

## Recent Changes
- 2025-10-02: Initial Replit setup from GitHub import
  - Configured Next.js for Replit environment
  - Set up development workflow on port 5000
  - Configured deployment settings for autoscale
