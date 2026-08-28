# AI Usage Guidelines — Aayush Kumar Singh

## Research & Learn

**AI tools typically used for a mobile developer role:**
- AI coding assistants (e.g., GitHub Copilot, Claude, Antigravity) for writing/debugging code, explaining unfamiliar parts of a codebase, and speeding up boilerplate work
- AI for learning new concepts quickly (e.g., understanding React Native patterns, Git workflows)
- AI for drafting documentation, commit messages, or PR descriptions faster
- AI for test case generation or catching edge cases in logic

**Benefits and risks of using AI in a professional setting:**
- *Benefits:* faster iteration, lower barrier to learning unfamiliar tech, useful second opinion when debugging, can catch things a tired brain misses
- *Risks:* generating code that looks correct but has subtle bugs, over-trusting output without verifying it actually works, leaking confidential/proprietary information into a third-party tool, becoming dependent on AI instead of building real understanding

**Information that should never be entered into AI tools:**
- User personal data (names, emails, health info — especially sensitive given Focus Bear serves ADHD/Autism users)
- API keys, secrets, tokens, credentials of any kind
- Proprietary business logic, internal strategy, or unreleased feature plans
- Any data covered under a confidentiality agreement (like the one I signed as part of this internship)

**Fact-checking and validating AI-generated content:**
- Actually run the code — never assume it works because it "looks right"
- Cross-check AI explanations of unfamiliar concepts against real documentation (official React Native docs, not just what the AI says)
- Be extra skeptical of confident-sounding answers on niche or fast-changing topics, since AI tools can be wrong while sounding certain
- Treat AI output as a first draft or a starting point, not a final answer

## Reflection

**When to use AI for assistance vs. relying on my own skills:**
I use AI heavily to speed up learning and unblock myself when stuck (e.g., using it to understand React Native fundamentals I hadn't deeply learned before this internship, or scaffolding onboarding documentation like this one). But for anything going into the actual Focus Bear codebase, I make sure I understand *why* code works before committing it — not just that it runs. The line I try to hold: AI can accelerate how fast I learn or draft something, but it shouldn't replace understanding the thing well enough to explain or defend it in a code review.

**Avoiding over-reliance while still benefiting from AI:**
The biggest risk for me specifically is that a lot of my past project work was written with heavy AI assistance without me fully understanding the underlying code — I've actively been working to close that gap before this internship (going through React Native fundamentals hands-on rather than just accepting AI-generated code). Going forward, my rule is: if I can't explain what a piece of code does in my own words, I haven't actually learned it yet, regardless of whether it works.

**Steps to ensure data privacy when using AI tools:**
- Never paste real user data, credentials, or confidential Focus Bear business information into any AI tool
- When asking AI for help debugging, use sanitized/dummy data instead of real production data
- Stick to AI tools that don't retain/train on submitted data when working with anything sensitive, and check with the team if unsure whether something is safe to share with an external tool

## Task

**Task tried:** Used an AI coding assistant to help scaffold and debug parts of my React Native learning process ahead of this internship, and to help draft structured onboarding documentation like this file.

**Critical review of the output:** The AI-generated explanations were generally accurate for well-established React Native concepts, but I made a point of testing every code suggestion myself rather than trusting it blindly — a few suggestions needed adjustment once I actually ran them against my real project, which confirmed why "trust but verify" matters even for confident-sounding output.

## Best Practice I'll Follow at Focus Bear
**Never paste real user data or confidential information into an AI tool, and always run/verify AI-suggested code myself before considering it done** — treating AI as a fast first draft, not a finished, trusted answer.
