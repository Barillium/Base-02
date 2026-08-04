#!/usr/bin/env node

import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const args = process.argv.slice(2);

function out(message = "") {
  process.stdout.write(`${message}\n`);
}

function err(message = "") {
  process.stderr.write(`${message}\n`);
}

function run(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, {
    cwd: projectRoot,
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
    encoding: "utf8",
  });

  if (options.capture) {
    return {
      ...result,
      stdout: result.stdout?.trim() ?? "",
      stderr: result.stderr?.trim() ?? "",
    };
  }

  return result;
}

function commandExists(command) {
  const result = spawnSync("which", [command], {
    cwd: projectRoot,
    stdio: "ignore",
  });

  return result.status === 0;
}

function ensureCommand(command, installHint) {
  if (commandExists(command)) {
    return true;
  }

  err(`Missing dependency: '${command}'.`);
  if (installHint) {
    err(installHint);
  }
  process.exit(1);
}

function hasOriginRemote() {
  const result = run("git", ["remote", "get-url", "origin"], { capture: true });
  return result.status === 0 && result.stdout.length > 0;
}

function getOriginRemote() {
  const result = run("git", ["remote", "get-url", "origin"], { capture: true });
  return result.status === 0 ? result.stdout : null;
}

function getCurrentBranch() {
  const result = run("git", ["branch", "--show-current"], { capture: true });
  return result.status === 0 ? result.stdout : null;
}

function getCurrentPrNumber() {
  const result = run("gh", ["pr", "view", "--json", "number", "--jq", ".number"], { capture: true });
  return result.status === 0 && result.stdout ? result.stdout : null;
}

function parseOption(name) {
  const index = args.indexOf(name);
  if (index === -1) {
    return null;
  }

  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    return null;
  }

  return value;
}

function hasFlag(flag) {
  return args.includes(flag);
}

function prefixBranchName(name) {
  if (!name) {
    return null;
  }

  return name.startsWith("codex/") ? name : `codex/${name}`;
}

function usage() {
  out("Base GitHub CLI");
  out("");
  out("Usage:");
  out("  npm run gh -- <command> [options]");
  out("  node ./scripts/base-gh.mjs <command> [options]");
  out("");
  out("Commands:");
  out("  doctor                      Check git, gh, auth, and origin remote");
  out("  status                      Show auth, repo, and PR status");
  out("  auth                        Run 'gh auth status'");
  out("  repo                        Show repository details");
  out("  issue list                  List issues");
  out("  pr status                   Show pull request status");
  out("  pr view [number]            Show current or selected PR");
  out("  pr checks [number]          Show checks for current or selected PR");
  out("  pr create [gh flags]        Create a pull request via gh");
  out("  branch <name> [--push]      Create branch, defaults to codex/<name>");
  out("  browse <repo|pr|actions>    Open repo, current PR, or actions in browser");
  out("");
  out("Examples:");
  out("  npm run gh -- doctor");
  out("  npm run gh -- status");
  out("  npm run gh -- branch live-copy-pass --push");
  out("  npm run gh -- pr create --draft --fill");
  out("  npm run gh -- pr checks");
}

function ensureRepoContext() {
  ensureCommand("git");
  ensureCommand("gh", "Install with: brew install gh");

  if (!existsSync(resolve(projectRoot, ".git"))) {
    err("This command must run inside a git repository.");
    process.exit(1);
  }
}

function printDoctor() {
  ensureRepoContext();

  out("Environment");
  out(`- project: ${projectRoot}`);
  out(`- git: ${commandExists("git") ? "ok" : "missing"}`);
  out(`- gh: ${commandExists("gh") ? "ok" : "missing"}`);

  const auth = run("gh", ["auth", "status"], { capture: true });
  out(`- gh auth: ${auth.status === 0 ? "ok" : "not ready"}`);

  const branch = getCurrentBranch();
  out(`- branch: ${branch ?? "unknown"}`);

  const origin = getOriginRemote();
  out(`- origin: ${origin ?? "missing"}`);

  if (auth.status !== 0 && auth.stderr) {
    out("");
    out("gh auth status:");
    out(auth.stderr);
  }
}

function printStatus() {
  ensureRepoContext();

  out("GitHub status");
  out("");
  run("gh", ["auth", "status"]);

  if (!hasOriginRemote()) {
    out("");
    out("No 'origin' remote configured yet.");
    out("Add one with: git remote add origin <github-url>");
    return;
  }

  out("");
  run("gh", ["repo", "view", "--web=false"]);
  out("");
  run("gh", ["pr", "status"]);
}

function passThroughGh(ghArgs) {
  ensureRepoContext();

  if (!hasOriginRemote()) {
    err("No 'origin' remote configured yet.");
    process.exit(1);
  }

  const result = run("gh", ghArgs);
  process.exit(result.status ?? 0);
}

function createBranch() {
  ensureRepoContext();

  const rawName = args[1];
  if (!rawName) {
    err("Please provide a branch name.");
    err("Example: npm run gh -- branch live-copy-pass --push");
    process.exit(1);
  }

  const branchName = prefixBranchName(rawName);
  const checkout = run("git", ["checkout", "-b", branchName]);

  if (checkout.status !== 0) {
    process.exit(checkout.status ?? 1);
  }

  out(`Created branch: ${branchName}`);

  if (hasFlag("--push")) {
    if (!hasOriginRemote()) {
      err("Cannot push: no 'origin' remote configured.");
      process.exit(1);
    }

    const push = run("git", ["push", "-u", "origin", branchName]);
    process.exit(push.status ?? 0);
  }
}

function browseTarget() {
  ensureRepoContext();

  if (!hasOriginRemote()) {
    err("No 'origin' remote configured yet.");
    process.exit(1);
  }

  const target = args[1] ?? "repo";

  if (target === "repo") {
    process.exit(run("gh", ["repo", "view", "--web"]).status ?? 0);
  }

  if (target === "actions") {
    process.exit(run("gh", ["run", "list", "--limit", "10"]).status ?? 0);
  }

  if (target === "pr") {
    const prNumber = parseOption("--number") ?? getCurrentPrNumber();
    if (!prNumber) {
      err("No current PR found. Pass one explicitly with: --number <pr>");
      process.exit(1);
    }

    process.exit(run("gh", ["pr", "view", prNumber, "--web"]).status ?? 0);
  }

  err(`Unknown browse target: ${target}`);
  process.exit(1);
}

function main() {
  const command = args[0] ?? "help";

  if (command === "help" || command === "--help" || command === "-h") {
    usage();
    return;
  }

  if (command === "doctor") {
    printDoctor();
    return;
  }

  if (command === "status") {
    printStatus();
    return;
  }

  if (command === "auth") {
    passThroughGh(["auth", "status"]);
    return;
  }

  if (command === "repo") {
    passThroughGh(["repo", "view", "--web=false"]);
    return;
  }

  if (command === "issue" && args[1] === "list") {
    passThroughGh(["issue", "list", ...args.slice(2)]);
    return;
  }

  if (command === "pr" && args[1] === "status") {
    passThroughGh(["pr", "status"]);
    return;
  }

  if (command === "pr" && args[1] === "view") {
    const prNumber = args[2] ?? getCurrentPrNumber();
    if (!prNumber) {
      err("No current PR found. Pass one explicitly: npm run gh -- pr view <number>");
      process.exit(1);
    }
    passThroughGh(["pr", "view", prNumber]);
    return;
  }

  if (command === "pr" && args[1] === "checks") {
    const prNumber = args[2] ?? getCurrentPrNumber();
    if (!prNumber) {
      err("No current PR found. Pass one explicitly: npm run gh -- pr checks <number>");
      process.exit(1);
    }
    passThroughGh(["pr", "checks", prNumber]);
    return;
  }

  if (command === "pr" && args[1] === "create") {
    passThroughGh(["pr", "create", ...args.slice(2)]);
    return;
  }

  if (command === "branch") {
    createBranch();
    return;
  }

  if (command === "browse") {
    browseTarget();
    return;
  }

  err(`Unknown command: ${command}`);
  err("Run 'npm run gh -- help' for usage.");
  process.exit(1);
}

main();
