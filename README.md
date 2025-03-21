# Tic-Tac-Toe

Tic-Tac-Toe game built with React + TypeScript + Vite.

Read project walkthrough on: [Substack](https://itsjjteoh.substack.com/p/building-a-tic-tac-toe-game-with)

## Preview

![Tic Tac Toe Gameplay](tic-tac-toe.gif)


## About The Project

This is a fully-functional Tic Tac Toe game with the following features:

- **Multiple Game Modes**: Play against a friend or challenge the AI
- **Difficulty Levels**: Choose from Easy, Medium, or Hard AI opponents


The AI in Hard mode uses the Minimax algorithm with Alpha-Beta pruning to make optimal moves, making it almost unbeatable!

Read project walkthrough on: [Substack](https://itsjjteoh.substack.com/p/building-a-tic-tac-toe-game-with)

## Built With

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Folder Structure

The project is organized into the following folder structure to ensure clarity and maintainability:

```
react-tic-tac-toe/
├── src/
│   ├── components/       # Reusable React components (e.g., Board, Square)
│   ├── types/            # common types shared across components
│   ├── utils/            # Utility functions (e.g., checkWinner, minimax)
│   ├── App.tsx           # Main application component
│   ├── main.tsx         # Entry point of the application
├── public/               # Static assets (e.g., favicon, index.html)
├── eslint.config.js      # linting rules
├── index.html            # index file
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

### Key Folders

- **`components/`**: Contains all the React components used in the application. Each component is modular and focuses on a specific part of the UI.
- **`types/`**: Contains common types that shared across components.
- **`utils/`**: Houses utility functions for game logic, such as checking for a winner and implementing AI.

## Getting Started

Follow these simple steps to get a local copy up and running:

### Prerequisites

- Node.js (version 16.x or later)
- npm or yarn

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/jjteoh-thewebdev/react-tic-tac-toe.git
   ```

2. Navigate to the project directory
   ```sh
   cd react-tic-tac-toe
   ```

3. Install dependencies
   ```sh
   npm install
   ```

4. Start the development server
   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

To create a production build:

```sh
npm run build
```

The build artifacts will be located in the `dist/` directory.

## License

Distributed under the MIT License. See `LICENSE` file for more information.

## Contact

Your Name - [thewebdev.jjteoh@gmail.com](mailto:thewebdev.jjteoh@gmail.com)

Project Link: [https://github.com/jjteoh-thewebdev/react-tic-tac-toe](https://github.com/jjteoh-thewebdev/react-tic-tac-toe)
