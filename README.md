# github-release-consumer

A test project demonstrating GitHub Actions-based releases and deployment workflow for Node.js packages.

[![Build and Release](https://github.com/forhad-hosain/github-release-experiment/actions/workflows/publish.yml/badge.svg)](https://github.com/forhad-hosain/github-release-experiment/actions/workflows/publish.yml)

> 🚀 **GitHub-based releases**: Automated build and release workflow with pre-built artifacts - no compilation needed during installation!

## 📦 Installation

### Option 1: Install from GitHub Release Branch (Latest)

Add to your `package.json`:

```json
{
  "dependencies": {
    "github-release-consumer": "github:YOUR_USERNAME/github-release-consumer#release"
  }
}
```

### Option 2: Install Specific Version (Recommended for Production)

Add to your `package.json`:

```json
{
  "dependencies": {
    "github-release-consumer": "github:YOUR_USERNAME/github-release-consumer#v1.0.0"
  }
}
```

Then run:

```bash
npm install
# or
pnpm install
# or
yarn install
```

## 🚀 Usage

```javascript
import { greet, getVersion, Calculator } from "github-release-consumer"
// or
import calculator from "github-release-consumer"

// Use the greet function
console.log(greet("World")) // "Hello, World! Welcome to github-release-consumer."

// Get version
console.log(getVersion()) // "1.0.0"

// Use the Calculator class
const calc = new Calculator()
console.log(calc.add(5, 3)) // 8
console.log(calc.subtract(10, 4)) // 6
console.log(calc.multiply(2, 7)) // 14
console.log(calc.divide(20, 4)) // 5

// Or use the default export
console.log(calculator.add(1, 2)) // 3
```

## 🛠️ Development

### Prerequisites

- Node.js 20 or higher
- npm, pnpm, or yarn

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/github-release-consumer.git
   cd github-release-consumer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run build` - Build the project (cleans dist, runs rollup, generates types)
- `npm run clean` - Remove the dist directory
- `npm run build:rollup` - Bundle the project using Rollup
- `npm run build:types` - Generate TypeScript declaration files
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and fix issues
- `npm run release:patch` - Create a patch release (1.0.0 → 1.0.1)
- `npm run release:minor` - Create a minor release (1.0.0 → 1.1.0)
- `npm run release:major` - Create a major release (1.0.0 → 2.0.0)

## 📋 Release Process

This project uses GitHub Actions for automated releases. The workflow is triggered when you push a version tag.

### Creating a Release

1. **Update version** (choose one):

   ```bash
   npm run release:patch  # 1.0.0 → 1.0.1
   npm run release:minor  # 1.0.0 → 1.1.0
   npm run release:major  # 1.0.0 → 2.0.0
   ```

   This will:

   - Update `package.json` version
   - Create a git tag (e.g., `v1.0.1`)
   - Push the commit and tag to GitHub

2. **GitHub Actions automatically**:
   - Builds the project
   - Validates build artifacts
   - Creates/updates the `release` branch with built artifacts
   - Creates a GitHub Release with installation instructions

### Manual Release Validation

You can also manually trigger the workflow to validate the build without creating a release:

1. Go to the Actions tab in GitHub
2. Select "Build and Release" workflow
3. Click "Run workflow"
4. Choose "Run validation without creating release" (dry_run: true)

### Troubleshooting

**If you get a "remote rejected" error:**

1. **Configure workflow permissions** (most common fix):

   - Go to: Settings → Actions → General → Workflow permissions
   - Select: "Read and write permissions"
   - ✅ Check: "Allow GitHub Actions to create and approve pull requests"
   - Save and try again

2. **Use a Personal Access Token** (if above doesn't work):
   - Create a PAT with `repo` permissions at: Settings → Developer settings → Personal access tokens
   - Add it as a repository secret named `PAT_TOKEN`
   - The workflow will automatically use it

## 🔧 How It Works

- **Pre-built artifacts**: The release process includes pre-built JavaScript bundles, TypeScript type definitions, and source maps in the tag and release branch
- **No build required**: Installing from GitHub doesn't require running build scripts - fast and efficient!
- **CI/CD friendly**: Works perfectly in CI/CD environments without `npm ci` slowdown
- **Type-safe**: Full TypeScript support with pre-generated `.d.ts` files

## 📁 Project Structure

```
github-release-consumer/
├── .github/
│   └── workflows/
│       └── publish.yml          # GitHub Actions release workflow
├── src/
│   └── index.ts                 # Main source file
├── dist/                        # Build output (gitignored, added to releases)
│   ├── index.js                 # Bundled JavaScript
│   └── types/
│       └── index.d.ts           # TypeScript declarations
├── package.json                 # Package configuration
├── tsconfig.json                # TypeScript configuration
├── rollup.config.js             # Rollup bundler configuration
└── README.md                    # This file
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

**Note**: Remember to replace `YOUR_USERNAME` in the installation instructions with your actual GitHub username or organization name.
