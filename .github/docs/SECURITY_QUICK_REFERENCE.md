# 🔒 Security Quick Reference

**One-page guide for developers and maintainers**

---

## 🚨 Emergency Contacts

| Issue Type                 | Action                                                      | Timeline      |
| -------------------------- | ----------------------------------------------------------- | ------------- |
| **Critical Vulnerability** | Report via [Security Advisories](../../security/advisories) | Response: 48h |
| **Secret Leaked**          | Rotate immediately + contact team                           | Response: 1h  |
| **Security Incident**      | Email security team                                         | Response: 24h |

---

## ✅ Pre-Commit Checklist

Before every commit:

```bash
# 1. Security scan
npm audit --audit-level=moderate

# 2. Check for secrets
git diff --staged | grep -i -E "(password|secret|key|token|api)"

# 3. Run tests
npm test

# 4. Sign your commit (recommended)
git commit -S -m "your message"
```

---

## 🔑 Common Secrets to NEVER Commit

```yaml
❌ API keys (AWS, GitHub, etc.)
❌ Passwords and credentials
❌ Database connection strings
❌ Private keys (SSH, GPG, SSL)
❌ OAuth tokens
❌ Environment variables (.env files)
❌ Configuration files with secrets
```

**If you accidentally commit a secret:**

1. **STOP** - Don't push if possible
2. **Rotate the secret immediately**
3. **Force push with rewritten history** (if not pushed)
4. **Report to security team**

```bash
# Remove secret from history (if not pushed)
git reset --soft HEAD~1
# Or use git filter-branch or BFG Repo-Cleaner for older commits
```

---

## 🛠️ Developer Workflows

### Creating a Feature

```bash
# 1. Create branch from main
git checkout main
git pull origin main
git checkout -b feature/your-feature

# 2. Make changes
# ... code ...

# 3. Before committing
npm audit
npm test

# 4. Commit (signed)
git commit -S -m "feat: your feature"

# 5. Push and create PR
git push origin feature/your-feature
```

### Reviewing Security in PRs

Check these in every PR:

```yaml
✅ No secrets or credentials committed
✅ Dependencies updated (Dependabot PRs merged)
✅ Tests pass (including security tests)
✅ CodeQL scan passes
✅ No new high/critical vulnerabilities introduced
✅ Input validation added for user data
✅ Output sanitization for rendering
```

---

## 🔐 Creating a Release

### Release Checklist

```yaml
1. □ Version bumped in package.json
2. □ CHANGELOG.md updated
3. □ All PRs merged to main
4. □ All security checks pass
5. □ Dependabot PRs reviewed
6. □ Create and push tag:
     git tag -s v1.0.0 -m "Release v1.0.0"
     git push origin v1.0.0
7. □ Wait for automated release workflow
8. □ Verify release artifacts and SBOM
9. □ Test installation from GitHub release
10. □ Announce release (if public)
```

### Tag Naming Convention

```
v{major}.{minor}.{patch}

Examples:
  v1.0.0    - Major release
  v1.2.3    - Minor + patch
  v2.0.0-beta.1  - Pre-release
```

---

## 🔍 Verifying Releases

### For Consumers

```bash
# 1. Verify checksums
wget https://github.com/[repo]/releases/download/v1.0.0/checksums.txt
sha256sum -c checksums.txt

# 2. Verify build provenance (requires gh CLI)
gh attestation verify dist/index.js -R [repo]

# 3. Check SBOM
wget https://github.com/[repo]/releases/download/v1.0.0/sbom.json
# Review dependencies in sbom.json
```

---

## 🚦 Security Status Dashboard

### Where to Check

| What                  | Where                          | Frequency       |
| --------------------- | ------------------------------ | --------------- |
| **Dependabot Alerts** | Security tab → Dependabot      | Daily           |
| **CodeQL Findings**   | Security tab → Code scanning   | After each push |
| **Secret Scanning**   | Security tab → Secret scanning | Real-time       |
| **Workflow Status**   | Actions tab                    | After each run  |
| **OpenSSF Score**     | Security tab → Scorecard       | Weekly          |

### Quick Links (Bookmark These)

```
Security Overview:
  https://github.com/[repo]/security

Code Scanning:
  https://github.com/[repo]/security/code-scanning

Dependabot:
  https://github.com/[repo]/security/dependabot

Actions:
  https://github.com/[repo]/actions
```

---

## ⚡ Quick Fixes

### Fix High/Critical Dependency Vulnerability

```bash
# 1. Update specific package
npm update [package-name]

# 2. Or fix all vulnerabilities
npm audit fix

# 3. For breaking changes
npm audit fix --force  # Use with caution

# 4. Commit and create PR
git checkout -b fix/security-vulnerability
git add package*.json
git commit -m "fix: update dependencies to fix security vulnerabilities"
git push origin fix/security-vulnerability
```

### Dependabot PR Review

```yaml
When Dependabot creates a PR:

1. Check the PR description for: ✅ Type of update (major/minor/patch)
  ✅ Breaking changes
  ✅ Security vulnerabilities fixed

2. Review the diff: ✅ Only package.json and package-lock.json changed
  ✅ No unexpected changes

3. Check CI: ✅ All tests pass
  ✅ Build succeeds
  ✅ Security scans pass

4. Merge strategy:
  - Patch updates: Auto-merge (if tests pass)
  - Minor updates: Review + merge same day
  - Major updates: Review carefully + test locally
```

---

## 🎓 Security Best Practices

### Input Validation

```javascript
// ❌ BAD
function processData(input) {
  return eval(input) // NEVER use eval()
}

// ✅ GOOD
function processData(input) {
  if (typeof input !== "string") {
    throw new Error("Invalid input type")
  }
  if (input.length > 1000) {
    throw new Error("Input too long")
  }
  // Process safely...
}
```

### Environment Variables

```javascript
// ❌ BAD
const apiKey = "sk-1234567890" // Hardcoded secret

// ✅ GOOD
const apiKey = process.env.API_KEY
if (!apiKey) {
  throw new Error("API_KEY environment variable is required")
}
```

### Dependency Usage

```javascript
// ❌ BAD - Outdated package with vulnerabilities
npm install lodash@4.17.15

// ✅ GOOD - Latest stable version
npm install lodash@latest

// ✅ BETTER - Pin minor version, allow patches
"lodash": "~4.17.21"
```

---

## 📱 Notifications Setup

### Get Alerted for Security Issues

**GitHub Web UI:**

```
Settings → Notifications → Watching
  ✅ Security alerts

Repository → Watch → Custom
  ✅ Security alerts
  ✅ All Activity (for critical repos)
```

**Slack Integration (Optional):**

```
Add GitHub app to Slack:
  /github subscribe [repo] reviews comments branches commits:all

For security alerts:
  /github subscribe [repo] +security
```

---

## 🆘 Troubleshooting

### Workflow Failed on Security Check

```yaml
1. Check Actions tab for failure details
2. Look at the specific failed step
3. Common issues:
   - CodeQL: New security vulnerability in code
     → Review findings, fix code, re-run

   - Trivy: High/critical vulnerability in dependency
     → Run npm audit, update dependencies

   - npm audit: Known vulnerability
     → Update affected package or wait for fix

   - Secret scanning: Secret detected
     → Remove secret, rotate it immediately
```

### Branch Protection Preventing Push

```yaml
Error: "required status checks must pass"

Solution:
1. Wait for CI checks to complete
2. Fix any failing tests
3. Ensure all required reviews approved
4. Try push again

Error: "unsigned commits not allowed"

Solution:
git commit --amend -S
git push --force-with-lease
```

---

## 📚 More Information

| Topic                    | Document           | Location                        |
| ------------------------ | ------------------ | ------------------------------- |
| **Full Security Policy** | SECURITY.md        | [Link](../../SECURITY.md)          |
| **Configuration Guide**  | SECURITY_CONFIG.md | [Link](./SECURITY_CONFIG.md)    |
| **Workflows**            | publish.yml        | [Link](./workflows/publish.yml) |
| **Branch Protection**    | GitHub Settings    | Settings → Branches             |

---

## 📊 Security Metrics to Track

Track these monthly:

```yaml
□ OpenSSF Scorecard score (target: > 7.0)
□ Number of open Dependabot alerts (target: 0)
□ Number of CodeQL findings (target: 0 high/critical)
□ Time to patch critical vulnerabilities (target: < 7 days)
□ Percentage of signed commits (target: 100%)
□ Test coverage (target: > 80%)
```

---

## 🎯 Remember

```yaml
✅ Security is everyone's responsibility
✅ When in doubt, ask before committing
✅ Never commit secrets, even temporarily
✅ Keep dependencies updated
✅ Review Dependabot PRs promptly
✅ Sign your commits
✅ Report security issues immediately
```

---

**Questions?** Check [SECURITY.md](../../SECURITY.md) or contact the security team.

**Last Updated**: December 10, 2025
