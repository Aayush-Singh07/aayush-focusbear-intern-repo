# Merge Conflicts & Conflict Resolution — Aayush Kumar Singh

## What caused the conflict?
I created a new branch (`conflict-test`) off `main` and edited a line in `internship_time_plan.md`, committing that change on the branch. Then I switched back to `main` and made a *different* edit to that same line, committing that too. When I tried to merge `conflict-test` back into `main`, Git couldn't automatically decide which version of that line was correct — both branches had changed the exact same line since they diverged, so Git flagged it as a conflict instead of guessing.

## How did you resolve it?
Git marked the conflicted section in `internship_time_plan.md` with `<<<<<<< HEAD`, `=======`, and `>>>>>>> conflict-test` markers, showing both versions of the change side by side. I opened the file, manually decided which content to keep (removing the conflict markers and editing the line into the version I actually wanted), then staged the resolved file with `git add` and completed the merge with `git commit`. Finally I pushed the resolved `main` branch back to GitHub.

## What did you learn?
Merge conflicts aren't actually scary once you've done one — Git isn't broken, it's just being honest that it can't guess which change should win when two branches touch the same line. The fix is always the same shape: look at both versions, decide (or combine) what should stay, remove the markers, and commit. I also learned why branching discipline matters on a real team — the more people edit the same lines in parallel without communicating, the more conflicts pile up, so clear task scoping and smaller, more frequent merges actually reduce how often this happens in practice.
