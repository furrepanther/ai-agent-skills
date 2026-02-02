# Wednesday Agent Skills

Pre-configured agent skills for Wednesday Solutions projects. These skills provide AI coding assistants (Claude Code, Cursor, etc.) with project-specific guidelines for code quality and design standards.

## What's Included

| Skill | Description |
|-------|-------------|
| `wednesday-dev` | Technical development guidelines (imports, complexity, naming) |
| `wednesday-design` | Design & UX guidelines (tokens, animations, components) |

### wednesday-dev
- Import ordering rules
- Cyclomatic complexity limits (max 8)
- Naming conventions (PascalCase, camelCase, UPPER_SNAKE_CASE)
- TypeScript best practices
- React patterns
- Testing requirements

### wednesday-design
- **492+ approved UI components** from 8 vetted libraries
- Design tokens (colors, typography, spacing, shadows)
- Animation patterns and easing functions
- Component styling patterns
- Accessibility requirements
- Performance guidelines

## Installation

```bash
npm i @wednesday-solutions-eng/ai-agent-skills
```

After installation, run the CLI to install skills to your project:

```bash
wednesday-skills install
```

### CLI Commands

```bash
# Install skills to current directory
wednesday-skills install

# Install skills to a specific directory
wednesday-skills install ./my-project

# List available skills
wednesday-skills list

# Show help
wednesday-skills help
```

## Directory Structure After Installation

```
your-project/
├── .wednesday/
│   └── skills/
│       ├── wednesday-dev/
│       │   ├── SKILL.md
│       │   └── references/
│       │       ├── COMPLEXITY.md
│       │       └── NAMING.md
│       └── wednesday-design/
│           ├── SKILL.md
│           └── references/
│               ├── COMPONENT-LIBRARY.md
│               ├── TOKENS.md
│               ├── ANIMATIONS.md
│               └── COMPONENTS.md
├── src/
├── package.json
└── ...
```

## Supported AI Tools

These skills work with:
- **Claude Code** (Anthropic)
- **Cursor** (cursor.com)
- **Gemini CLI** (Google)
- **GitHub Copilot Workspace**
- **Amp** (Sourcegraph)
- Any tool supporting the [Agent Skills](https://agentskills.io) format

## Usage

Once installed, AI assistants will automatically discover and apply these guidelines when working on your project.

### Example Prompts

```
"Create a new button component"
→ AI will use approved components from the library (e.g., Shimmer Button from Magic UI)

"Add a hero section with text animation"
→ AI will use Text Generate Effect from Aceternity UI

"Fix the complexity in this function"
→ AI will apply refactoring strategies from the complexity guide
```

## Customization

### Extending the skills

You can add project-specific rules by editing the SKILL.md files:

```markdown
## Project-Specific Rules

- Use `@company/ui` for internal components
- All API calls go through `lib/api/client.ts`
```

### Overriding defaults

Create a `.wednesday/config.json` to override defaults:

```json
{
  "skills": {
    "wednesday-dev": {
      "complexity": {
        "max": 10
      }
    }
  }
}
```

## Updating

```bash
npm update @wednesday-solutions-eng/ai-agent-skills
wednesday-skills install
```

This will overwrite the existing skills with the latest version.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes to the skill files
4. Submit a pull request

## License

MIT License - Wednesday Solutions

## Links

- [npm Package](https://www.npmjs.com/package/@wednesday-solutions-eng/ai-agent-skills)
- [Agent Skills Specification](https://agentskills.io/specification)
- [Wednesday Solutions](https://wednesday.is)
- [Report Issues](https://github.com/wednesday-solutions/ai-agent-skills/issues)
