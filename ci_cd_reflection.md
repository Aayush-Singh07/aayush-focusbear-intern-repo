# Static Analysis Checks in CI/CD — Aayush Kumar Singh

## What is the purpose of CI/CD?
Continuous Integration means automatically checking every change (running tests, linting, builds) as soon as it's pushed, rather than waiting to discover problems later. Continuous Deployment/Delivery extends that automation to actually shipping the change once it passes those checks. Together they replace manual, easy-to-skip checks with automatic gates that run the same way every time.

## Setting up a CI workflow (Markdown linting and spell checks)
Set up a GitHub Actions workflow (`.github/workflows/lint.yml`) that triggers on every pull request, running a markdown linter (`markdownlint-cli`) and a spell checker (`cspell`) against the repo's `.md` files. The workflow installs dependencies, runs both tools, and fails the check if either finds issues, so problems show up directly on the PR instead of needing a manual review pass.

## Experimenting with Git Hooks (Husky)
Installed Husky and configured a pre-commit hook that runs the linter locally before a commit is even allowed to complete. This catches issues earlier, before they're even pushed, rather than relying solely on the CI check to catch them after the fact.

## Opening a test PR and reviewing automated checks
Opened a small test PR with a deliberately introduced markdown issue (a broken link format) and a misspelled word. The GitHub Actions check ran automatically, failed clearly, and pointed to the exact file and line causing the failure, confirming the pipeline actually catches real issues rather than just running silently.

## Reflection

### What is the purpose of CI/CD?
To make quality checks automatic, consistent, and impossible to accidentally skip, catching problems the moment they're introduced instead of discovering them much later, potentially after they've already caused a real issue.

### How does automating style checks improve project quality?
It removes the burden of manually remembering every style rule, and ensures every single PR gets checked the same way, regardless of who's reviewing it or how much time they have. It also means style nitpicks get caught by a bot instead of taking up a human reviewer's time and attention.

### What are some challenges with enforcing checks in CI/CD?
Overly strict or noisy checks can slow the team down or get treated as obstacles to work around rather than genuinely helpful. There's also a setup cost, someone has to configure and maintain the pipeline itself, and checks that are too slow can discourage frequent small commits if every push takes a long time to get feedback on.

### How do CI/CD pipelines differ between small projects and large teams?
A small or solo project can get away with a lightweight pipeline, maybe just linting and basic tests, since coordination overhead is low. A larger team usually needs a more elaborate pipeline, staged checks (fast checks first, slower ones later), required approvals before merging, and automated deployment steps, since the cost of a bad merge slipping through grows significantly as more people are working in the same codebase at once.
