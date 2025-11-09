# Parallel You

## 🌌 Project Overview

**Parallel You** is an AI-powered life simulator where users can experience alternate versions of their life based on different choices. Built with a futuristic, cinematic design featuring dark themes and teal/cyan accents, this web application lets you explore "what if" scenarios and see how different decisions could shape your life.

## ✨ Features

- **Interactive Life Simulator**: Make choices about your origin, education, personality, and career path
- **AI-Generated Life Events**: Experience random events that shape your parallel life
- **Leaderboard System**: Compare your simulated lives with others
- **User Authentication**: Secure login/signup with email and Google OAuth
- **Contact Form**: Reach out via integrated EmailJS
- **Beautiful Animations**: Smooth Framer Motion transitions and custom particle effects
- **Responsive Design**: Fully optimized for all devices

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Backend**: Lovable Cloud (Supabase)
- **Authentication**: Supabase Auth with Google OAuth
- **Email**: EmailJS Integration
- **Build Tool**: Vite
- **UI Components**: Custom components + Shadcn UI

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd parallel-you
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
parallel-you/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable components
│   │   ├── ui/          # UI component library
│   │   ├── Navigation.tsx
│   │   ├── LoadingAnimation.tsx
│   │   └── ParticleBackground.tsx
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── Simulator.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Auth.tsx
│   │   └── NotFound.tsx
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Backend integrations
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Public assets
└── package.json
```

## 🎨 Design System

The project uses a custom design system with:
- **Colors**: Dark backgrounds (#0a0a0a to #121212) with teal (#00ffc6) and cyan (#00bcd4) accents
- **Typography**: Inter font with bold tracking-tight headings
- **Effects**: Glow shadows, text shadows, and gradient text utilities
- **Animations**: Fade-in, glow-pulse, and custom keyframe animations

## 🔐 Authentication

Authentication is powered by Lovable Cloud with support for:
- Email/Password authentication
- Google OAuth sign-in
- Automatic session management
- Protected routes

## 📧 Email Integration

Contact form uses EmailJS with the following configuration:
- Service ID: `service_0tz9frrx`
- Template ID: `template_16ds9rx`
- Public Key: `KRsxH4cZ_5RJ2EMJB`

## 🌐 Deployment

### Deploy with Lovable

1. Open your project in [Lovable](https://lovable.dev)
2. Click "Publish" in the top right
3. Follow the deployment wizard

### Manual Deployment

The project can be deployed to any static hosting service:

```bash
npm run build
```

Then upload the `dist/` folder to your hosting provider.

## 📝 License

© 2025 Parallel You | Crafted by Nextup Studio

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, use the contact form at `/contact` or reach out to Nextup Studio.

## 🔮 Future Enhancements

- Advanced AI integration for more personalized simulations
- Social sharing features
- Save and revisit previous simulations
- More detailed life event scenarios
- Multilingual support

---

**Live your what ifs.** 🌌
