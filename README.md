# Webzi - Web3 Trading Platform

A modern, Next.js-based web3 trading platform built with wagmi and RainbowKit integration.

## Features

- **Modern Web3 Integration**: Connect your wallet with RainbowKit and wagmi
- **Responsive Design**: Beautiful, mobile-first design with Tailwind CSS
- **Trading Platform**: Mock trading interface with real-time data visualization
- **Token Sale**: Interactive token sale countdown and purchase interface
- **DeFi Features**: Showcase of crypto management, exchange, and compliance features
- **Professional UI**: Glass-morphism effects, gradients, and smooth animations

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **wagmi**: React hooks for Ethereum
- **RainbowKit**: Wallet connection UI
- **Viem**: TypeScript interface for Ethereum
- **Heroicons**: Beautiful SVG icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd webzi-clone
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
webzi-clone/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles and custom CSS
│   │   ├── layout.tsx       # Root layout with providers
│   │   ├── page.tsx         # Main landing page
│   │   └── providers.tsx    # Web3 providers configuration
│   └── ...
├── public/                  # Static assets
├── package.json
└── README.md
```

## Key Components

### Landing Page Sections

1. **Hero Section**: "Built on Web3. Powered by You" with animated elements
2. **Features Grid**: 6 key features with icons and descriptions
3. **Trading Platform**: Mock trading interface with price charts
4. **Token Sale**: Countdown timer and purchase interface
5. **FAQ Section**: Common questions and answers
6. **Footer**: Links and company information

### Web3 Configuration

The project uses wagmi with support for:
- Ethereum Mainnet
- Polygon
- Optimism
- Arbitrum
- Base

### Styling

- **Dark Theme**: Modern dark color scheme with purple/pink gradients
- **Glass-morphism**: Backdrop blur effects for cards and overlays
- **Animations**: Floating elements and smooth transitions
- **Responsive**: Mobile-first design with breakpoints

## Configuration

### RainbowKit Setup

Update the `projectId` in `src/app/providers.tsx` with your WalletConnect project ID:

```typescript
const config = getDefaultConfig({
  appName: 'Webzi',
  projectId: 'YOUR_PROJECT_ID', // Replace with your project ID
  wallets,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});
```

### Environment Variables

Create a `.env.local` file for any environment-specific configuration:

```
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id
```

## Customization

### Colors and Themes

The project uses CSS custom properties defined in `globals.css`. You can customize:

- Color scheme variables
- Gradient backgrounds
- Animation durations
- Component styles

### Content

Update the content in `page.tsx`:
- Hero section text
- Feature descriptions
- Token sale information
- FAQ content

## Deployment

The project can be deployed on:

- **Vercel**: `vercel --prod`
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **AWS/GCP**: Build and serve the static files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

If you encounter any issues:

1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify your wallet connection
4. Check network connectivity

---

Built with ❤️ using Next.js and Web3 technologies.
# mirage-agent
