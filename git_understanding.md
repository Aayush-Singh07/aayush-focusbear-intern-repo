# Git Understanding — Aayush Kumar Singh

## 1. Merge Conflicts & Conflict Resolution

### What caused the conflict?
I created a new branch (`conflict-test`) off `main` and edited a line in `internship_time_plan.md`, committing that change on the branch. Then I switched back to `main` and made a different edit to that same line, committing that too. When I tried to merge `conflict-test` back into `main`, Git couldn't automatically decide which version of that line was correct, since both branches had changed the exact same line since they diverged, so Git flagged it as a conflict instead of guessing.

### How did you resolve it?
Git marked the conflicted section with `<<<<<<< HEAD`, `=======`, and `>>>>>>> conflict-test` markers, showing both versions side by side. I opened the file, manually decided which content to keep, removed the conflict markers, staged the resolved file with `git add`, and completed the merge with `git commit`. Finally I pushed the resolved `main` branch back to GitHub.

### What did you learn?
Merge conflicts aren't actually scary once you've done one. Git isn't broken, it's just being honest that it can't guess which change should win when two branches touch the same line. I also learned why branching discipline matters on a real team, since the more people edit the same lines in parallel without communicating, the more conflicts pile up.

---

## 2. Staging vs. Committing

### What is the difference between staging and committing?
Staging is preparing changes to be included in the next commit, it's like putting items in a shopping cart before checkout. Committing is actually saving that snapshot permanently into the repo's history, the checkout itself. A file can be modified but not staged, staged but not committed, or committed, and each of those is a different state.

### Why does Git separate these two steps?
It gives you control over exactly what goes into each commit. If I've changed five files but only three of them belong together as one logical change, staging lets me pick just those three for this commit and leave the other two for later, instead of being forced to commit everything I've touched at once.

### When would you want to stage changes without committing?
When I'm still deciding exactly what should go into a commit, or when I want to review the staged diff one more time before finalizing it. It's also useful when working on multiple small changes at once and I want to group them into separate, cleaner commits instead of one messy one.

### Hands-on steps performed
Modified a file, staged it with `git add`, checked `git status` to confirm it showed as staged, unstaged it with `git restore --staged <file>`, confirmed with `git status` again that it moved back to unstaged, then staged and committed it for real and observed it move into the commit history with `git log`.

---

## 3. Branching & Team Collaboration

### Why is pushing directly to main problematic?
Main is meant to always be in a working, deployable state. Pushing directly to it skips review, so an untested or broken change can land straight in the branch everyone else builds on top of, breaking things for the whole team at once instead of being caught in isolation first.

### How do branches help with reviewing code?
A branch isolates a change from main until it's actually ready. That gives reviewers a clean, contained diff to look at, and gives the author a safe space to experiment, get things wrong, and fix them, without any of that instability touching the shared main branch in the meantime.

### What happens if two people edit the same file on different branches?
Both branches can happily coexist and get worked on independently. The moment either one gets merged into main, and then the second one tries to merge afterward, Git will flag a conflict if they touched the same lines, exactly like the merge conflict exercise above, requiring a manual resolution before the second merge can complete.

### Hands-on steps performed
Created a new branch, made a small change and committed it there, switched back to main and confirmed the change was not present, verifying that a branch's commits stay isolated until merged.

---

## 4. Advanced Git Commands

### git checkout main -- <file>
Restores a single file to match its version on main, without touching anything else in the working directory. Useful when I've made unwanted edits to one specific file and want to discard just that file's changes without resetting my whole branch.

### git cherry-pick <commit>
Applies one specific commit from another branch onto the current branch, without merging the entire branch. Useful when a fix or small change lives on a branch that isn't ready to be fully merged yet, but that one commit is needed elsewhere right away.

### git log
Shows the commit history, author, date, and message for each change. Useful for understanding how a file or feature evolved over time, and for finding a specific commit to reference, revert, or cherry-pick.

### git blame <file>
Shows who last modified each line of a file and in which commit. Useful for understanding why a specific line exists the way it does, especially when it looks unusual or you need context before changing it.

### What surprised me while testing these commands
`git cherry-pick` was more useful than I expected, since it solves a very specific real problem, needing just one change from a branch without pulling in everything else that branch has. `git blame` also felt more practical than I assumed, it turns a confusing line of code into an actual person and commit you can go ask questions about, rather than an unexplained mystery.

### Hands-on steps performed
Modified a file and restored it using `git checkout main -- <file>`. Committed a change on a branch, then cherry-picked that single commit onto main. Used `git log` to browse commit history. Used `git blame` on a file to see the author and commit behind each line.

---

## 5. Debugging with git bisect

### What does git bisect do?
It automates finding which commit introduced a bug using binary search. Instead of manually checking commits one by one, you tell Git a known good commit and a known bad commit, and it checks out commits in between, you mark each as good or bad, and it narrows down to the exact commit that broke things in very few steps.

### When would you use it in a real-world debugging situation?
When something that used to work is now broken, but I don't know when it broke or which of many commits caused it, especially in a project with a long history where manually checking each commit would take far too long.

### How does it compare to manually reviewing commits?
Manual review means checking commits one at a time in order, which is slow and scales badly as the number of commits grows. Bisect uses binary search instead, so even with hundreds of commits between good and bad, it only takes a handful of steps to find the culprit, which is a massive time saver on any real project history.

### Hands-on steps performed
Made a series of commits in the test repo, deliberately introduced a bug in one of them, then used `git bisect start`, marked a known good and known bad commit, and stepped through Git's automatic checkouts marking each as good or bad until it identified the exact commit that introduced the bug.

---

## 6. Writing Meaningful Commit Messages

### What makes a good commit message?
A short, clear summary line describing what changed and why, written in the imperative mood (e.g., "Fix crash on empty input" rather than "Fixed a crash" or "Fixes"). If more context is needed, a blank line followed by a longer explanation in the body. It should be specific enough that someone scanning the log later understands the change without having to open the diff.

### How does a clear commit message help in team collaboration?
It lets teammates understand the history of a project just by scanning `git log`, without having to open every single diff. It also makes tools like `git blame` and `git bisect` far more useful, since the message itself gives context about why a change was made, not just what changed.

### How can poor commit messages cause issues later?
A message like "fixed stuff" gives zero context months later when someone is trying to understand why a line of code exists, or when bisecting a bug and trying to figure out if a given commit is relevant. It turns the commit history from a useful record into a list of unhelpful timestamps.

### Hands-on steps performed
Made three commits with different message styles to compare directly: a vague one ("fixed stuff"), an overly detailed one (multiple paragraphs describing unrelated implementation minutiae), and a well-structured one (a short clear summary line with a brief body explaining the why). Reviewing commit histories on React and Node.js on GitHub reinforced this, since their better commits followed the same short-summary-plus-context pattern, while confusing ones in any project tend to be vague single words like "update" or "fix".

---

## 7. Creating & Reviewing Pull Requests

### Why are PRs important in a team workflow?
A PR is a formal checkpoint before code reaches main, it packages up a set of changes, shows the diff clearly, and gives the team a chance to review, discuss, and catch problems before they become part of the shared codebase, rather than after.

### What makes a well-structured PR?
A clear title describing the change, a description explaining what changed and why (and linking the related issue if there is one), a reasonably small and focused scope so it's actually reviewable, and a description of how to test or verify the change works.

### What did you learn from reviewing an open-source PR?
Looking through PRs on the React repo, the clearest ones stated the problem being solved up front, kept the diff focused on just that problem, and had active back-and-forth in the comments where the author responded to specific review feedback with follow-up commits rather than one giant final push. It made the review process feel like a conversation refining the change, not just a single yes or no gate.

### Hands-on steps performed
Created a new branch, made a small change, pushed it to GitHub, and opened a Pull Request with a clear title and description linking back to this issue. Reviewed an existing PR on the React repo to observe real review comments and how changes were requested. Requested feedback, then merged the PR and deleted the branch once it was in a mergeable state.
