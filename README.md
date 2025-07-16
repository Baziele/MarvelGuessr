# MarvelGuessr

A web-based Marvel character guessing game built with Next.js, TypeScript, and Tailwind CSS.

![Home Screen](/docs/home.png)

## Description

MarvelGuessr is an interactive game where players test their knowledge of Marvel characters. The game features a dynamic interface with character input suggestions, statistics tracking, and an immersive background that changes based on gameplay.

![Question Interface](/docs/question.png)

## Features

-   Character guessing gameplay
-   Autocomplete character suggestions
-   Dynamic background effects
-   Statistics tracking
-   Mobile-responsive design
-   Dark/light theme support
-   Interactive UI with dialogs for quitting and revealing answers

![Statistics Screen](/docs/stats.png)

## Tech Stack

-   [Next.js](https://nextjs.org/) - React framework
-   [TypeScript](https://www.typescriptlang.org/) - Type safety
-   [Tailwind CSS](https://tailwindcss.com/) - Styling
-   [shadcn/ui](https://ui.shadcn.com/) - UI components
-   Marvel Quotes System
    -   Current: Local implementation in [lib/marvel-quotes.ts](lib/marvel-quotes.ts)
    -   Planned: Dedicated Quote API with database integration

## Getting Started

### Prerequisites

-   Node.js 16.8 or later
-   pnpm (recommended package manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/MarvelGuessr.git
cd MarvelGuessr
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to start playing.

## Project Structure

-   `/app` - Next.js application routes and layouts
-   `/components` - React components including game-specific and UI components
-   `/hooks` - Custom React hooks
-   `/lib` - Utility functions and type definitions
-   `/public` - Static assets and images
-   `/styles` - Global CSS styles

## Future Improvements

-   Implementation of a dedicated Marvel Quote API with database integration for:
    -   Improved quote management
    -   Dynamic quote updates
    -   Better scalability
    -   Enhanced performance
    -   More comprehensive quote collection

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
