#!/usr/bin/env node

/**
 * Wednesday Agent Skills CLI
 * Installs agent skills to your project's .wednesday/skills directory
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'install';
  const targetDir = args[1] || process.cwd();

  console.log('');
  log('blue', '╔═══════════════════════════════════════════════════════════╗');
  log('blue', '║         Wednesday Agent Skills                            ║');
  log('blue', '╚═══════════════════════════════════════════════════════════╝');
  console.log('');

  if (command === 'install') {
    install(targetDir);
  } else if (command === 'help' || command === '--help' || command === '-h') {
    showHelp();
  } else if (command === 'list') {
    listSkills();
  } else {
    log('red', `Unknown command: ${command}`);
    showHelp();
    process.exit(1);
  }
}

function install(targetDir) {
  // Check if we're in a project directory
  const projectIndicators = ['package.json', 'pyproject.toml', 'Cargo.toml', 'go.mod'];
  const hasProjectFile = projectIndicators.some(file =>
    fs.existsSync(path.join(targetDir, file))
  );

  if (!hasProjectFile) {
    log('yellow', 'Warning: No package.json, pyproject.toml, Cargo.toml, or go.mod found.');
    log('yellow', 'Installing anyway...');
  }

  // Find the skills directory in the package
  const packageRoot = path.join(__dirname, '..');
  const skillsSource = path.join(packageRoot, 'skills');

  if (!fs.existsSync(skillsSource)) {
    log('red', 'Error: Skills not found in package. Please reinstall.');
    process.exit(1);
  }

  // Create .wednesday/skills directory
  const skillsDir = path.join(targetDir, '.wednesday', 'skills');
  log('blue', `Creating skills directory: ${skillsDir}`);
  fs.mkdirSync(skillsDir, { recursive: true });

  // Copy each skill
  const skills = fs.readdirSync(skillsSource);
  skills.forEach(skill => {
    const src = path.join(skillsSource, skill);
    const dest = path.join(skillsDir, skill);

    if (fs.statSync(src).isDirectory()) {
      log('blue', `Installing ${skill} skill...`);
      copyRecursive(src, dest);
      log('green', `  ✓ ${skill} installed`);
    }
  });

  // Check .gitignore
  const gitignorePath = path.join(targetDir, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const gitignore = fs.readFileSync(gitignorePath, 'utf8');
    if (!gitignore.includes('.wednesday')) {
      console.log('');
      log('yellow', 'Note: .wednesday is not in your .gitignore');
      log('yellow', 'You may want to add it if you don\'t want to commit the skills:');
      log('blue', '  echo \'.wednesday/\' >> .gitignore');
      console.log('');
      log('yellow', 'Or keep it tracked to share with your team.');
    }
  }

  console.log('');
  log('green', '╔═══════════════════════════════════════════════════════════╗');
  log('green', '║         Installation complete!                            ║');
  log('green', '╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  log('blue', 'Installed skills:');
  console.log('  • wednesday-dev     - Technical development guidelines');
  console.log('  • wednesday-design  - Design & UX guidelines (492+ components)');
  console.log('');
  log('blue', `Skills location: ${skillsDir}`);
  console.log('');
  log('blue', 'What\'s next:');
  console.log('  1. AI assistants will automatically discover these skills');
  console.log('  2. Try: \'Create a shimmer button\' - AI will use approved components');
  console.log('  3. Read: .wednesday/skills/wednesday-design/references/COMPONENT-LIBRARY.md');
  console.log('');
}

function showHelp() {
  console.log('Usage: wednesday-skills [command] [options]');
  console.log('');
  console.log('Commands:');
  console.log('  install [dir]  Install skills to directory (default: current dir)');
  console.log('  list           List available skills');
  console.log('  help           Show this help message');
  console.log('');
  console.log('Examples:');
  console.log('  npx @wednesday/ai-agent-skills install');
  console.log('  npx @wednesday/ai-agent-skills install ./my-project');
  console.log('  wednesday-skills install');
  console.log('');
}

function listSkills() {
  log('blue', 'Available skills:');
  console.log('');
  console.log('  wednesday-dev');
  console.log('    Technical development guidelines for Wednesday Solutions projects.');
  console.log('    - Import ordering rules');
  console.log('    - Cyclomatic complexity limits (max 8)');
  console.log('    - Naming conventions (PascalCase, camelCase, UPPER_SNAKE_CASE)');
  console.log('');
  console.log('  wednesday-design');
  console.log('    Design & UX guidelines for Wednesday Solutions projects.');
  console.log('    - 492+ approved UI components from 8 vetted libraries');
  console.log('    - Design tokens (colors, typography, spacing, shadows)');
  console.log('    - Animation patterns and easing functions');
  console.log('    - Component styling patterns');
  console.log('');
}

main();
