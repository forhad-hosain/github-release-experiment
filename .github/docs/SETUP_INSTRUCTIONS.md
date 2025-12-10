# 🚀 Security Setup Instructions

**Complete guide to configure your repository with industry-standard security**

---

## 📝 Overview

This repository has been configured with enterprise-grade security practices including:

- ✅ SLSA Level 3 compliance (build provenance)
- ✅ Automated security scanning (CodeQL, Trivy)
- ✅ Dependency management (Dependabot)
- ✅ SBOM generation (CycloneDX)
- ✅ Artifact attestation
- ✅ OpenSSF Scorecard monitoring
- ✅ Branch protection rules
- ✅ Environment protection

---

## 🎯 What Was Changed

### Files Added

```
.github/
├── workflows/
│   ├── publish.yml           # UPDATED: Added security features
│   ├── codeql-analysis.yml   # NEW: Code security scanning
│   ├── scorecard.yml         # NEW: OpenSSF security scorecard
│   └── ...
├── dependabot.yml            # NEW: Automated dependency updates
├── SECURITY_CONFIG.md        # NEW: Complete security configuration guide
└── SECURITY_QUICK_REFERENCE.md  # NEW: Quick reference for developers

SECURITY.md                   # NEW: Security policy and vulnerability reporting
```

### Changes to `publish.yml`

```yaml
Added: ✅ Security scanning job (runs in parallel with validation)
  ✅ Trivy vulnerability scanner
  ✅ SBOM generation
  ✅ Build provenance attestation
  ✅ Artifact checksums
  ✅ Fine-grained permissions (id-token, attestations)
  ✅ Environment protection (production)
  ✅ npm audit security checks
  ✅ Outdated dependency checks
  ✅ PAT token support for branch protection
  ✅ Delete + recreate strategy (instead of force push)
```

---

## ⚙️ Required GitHub UI Configuration

### Step 1: Enable Security Features

**Navigate to: Settings → Code security and analysis**

Enable all these features:

```yaml
Dependency graph: ☑️ Enable

Dependabot: ☑️ Dependabot alerts
  ☑️ Dependabot security updates
  ☑️ Grouped security updates

Code scanning: ☑️ CodeQL analysis → Set up → Use workflows (already configured)

Secret scanning: ☑️ Secret scanning
  ☑️ Push protection (highly recommended)
```

### Step 2: Configure Branch Protection

#### For `main` branch:

**Navigate to: Settings → Branches → Add rule**

**Branch name pattern:** `main`

```yaml
Protection Rules:

✅ Require a pull request before merging
   ✅ Require approvals: 1 (or more for teams)
   ✅ Dismiss stale pull request approvals when new commits are pushed
   □ Require review from Code Owners (optional, needs CODEOWNERS file)

✅ Require status checks to pass before merging
   ✅ Require branches to be up to date before merging
   Status checks that are required:
     → validate
     → security-scan
     → CodeQL
     → Trivy

✅ Require conversation resolution before merging

✅ Require signed commits (recommended)

□ Require linear history (optional)

✅ Include administrators (prevents bypassing for everyone)

✅ Restrict who can push to matching branches
   → Add yourself and team members

✅ Allow force pushes: No one

✅ Allow deletions: Disabled
```

**Save changes**

#### For `release` branch:

**Add another rule:**

**Branch name pattern:** `release`

```yaml
Protection Rules:

✅ Require status checks to pass before merging
   Status checks:
     → validate
     → security-scan

✅ Restrict who can push to matching branches
   → Add: github-actions[bot]

✅ Allow force pushes: Specify who can force push
   → Add: github-actions[bot]

   OR (if the above doesn't work):

✅ Allow deletions
   → Add: github-actions[bot]

Note: The workflow now uses delete + recreate instead of force push,
      so you may only need to allow deletions, not force pushes.
```

**Save changes**

### Step 3: Create Production Environment

**Navigate to: Settings → Environments → New environment**

```yaml
Environment name: production

Environment protection rules:

✅ Required reviewers
   → Add yourself or team leads (1-6 reviewers)
   → This requires manual approval before releases

□ Wait timer (optional)
   → 5 minutes (gives time to cancel if needed)

✅ Deployment branches and tags
   → Limit to protected branches and tags
   → Add pattern: v*
```

**Save rules**

### Step 4: Add Repository Secrets (if needed)

**Navigate to: Settings → Secrets and variables → Actions → New repository secret**

#### Option A: If you encounter branch protection issues

```yaml
Name: PAT_TOKEN
Value: [Your Personal Access Token]

To create PAT:
1. Go to GitHub Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Select scopes:
   ✅ repo (all)
   ✅ workflow
5. Copy token immediately (you won't see it again)
6. Add as repository secret
```

#### Option B: If publishing to npm (future use)

```yaml
Name: NPM_TOKEN
Value: [Your npm automation token]

To create npm token:
1. Go to npmjs.com → Access Tokens
2. Generate new token → Automation
3. Copy token
4. Add as repository secret
```

### Step 5: Configure Notifications

**Your personal settings:** Settings → Notifications

```yaml
✅ Watching
   ✅ Security alerts

For this repository:
   → Watch → Custom
   ✅ Security alerts
   ✅ Issues (if you want to track)
   ✅ Pull requests
```

---

## 🧪 Testing the Setup

### Test 1: Validation Works

```bash
# Create a test tag
git tag v0.0.1-test
git push origin v0.0.1-test

# Check GitHub Actions
# → validate job should run
# → security-scan job should run
# → release job should ask for approval (environment protection)
```

### Test 2: Branch Protection Works

```bash
# Try to push directly to main (should fail)
git checkout main
echo "test" >> README.md
git add README.md
git commit -m "test"
git push origin main

# Expected: Error - branch protection
```

### Test 3: Security Scanning Works

```bash
# Check Security tab on GitHub
# → Should see CodeQL results
# → Should see Dependabot alerts (if any)
# → Should see Secret scanning status
```

### Test 4: PR Workflow

```bash
# Create feature branch
git checkout -b test/security-setup
echo "# Test" >> test.md
git add test.md
git commit -m "test: verify security setup"
git push origin test/security-setup

# Create PR on GitHub
# → Wait for status checks
# → All should pass
# → Request review
# → Merge after approval
```

---

## 🔄 Workflow Behavior

### On Push to Main

```
Triggers:
  → CodeQL Analysis (security scanning)
  → OpenSSF Scorecard (if scheduled)

No release created (only on tags)
```

### On Tag Push (v\*)

```
Workflow steps:
1. security-scan runs (Trivy)
2. validate runs (build, tests, audit)
3. Wait for both to complete
4. If both pass → release job starts
5. Production environment requires approval
6. After approval:
   - Builds project
   - Generates SBOM
   - Creates checksums
   - Attests artifacts (provenance)
   - Updates release branch
   - Creates GitHub Release with artifacts
```

### On Pull Request

```
Triggers:
  → CodeQL Analysis
  → Required status checks (if configured)

Must pass before merge allowed
```

---

## 📊 Monitoring Security

### Daily

```
Check: https://github.com/[repo]/security/dependabot
Action: Review and merge Dependabot PRs
```

### Weekly

```
Check: https://github.com/[repo]/security/code-scanning
Action: Review and fix any new CodeQL findings

Check: Actions tab
Action: Ensure workflows are passing
```

### Monthly

```
Check: OpenSSF Scorecard results
Action: Improve score based on recommendations

Review: SECURITY.md
Action: Update if policies changed
```

---

## 🐛 Troubleshooting

### Issue: "remote rejected" on release push

**Symptoms:**

```
! [remote rejected] release -> release (failure)
error: failed to push some refs
```

**Solutions:**

1. **Check branch protection** (most common)

   - Settings → Branches → release rule
   - Ensure github-actions[bot] can push/delete

2. **Use PAT token**

   - Create PAT with repo permissions
   - Add as repository secret: PAT_TOKEN
   - Already configured in workflow

3. **Check workflow permissions**
   - Settings → Actions → General
   - Workflow permissions: Read and write (or specific permissions)

### Issue: Environment protection blocking

**Symptoms:**

```
Waiting for approval from production environment
```

**This is expected!**

- Go to Actions tab → Click workflow run
- Click "Review deployments"
- Select "production"
- Click "Approve and deploy"

To disable:

- Settings → Environments → production
- Remove required reviewers

### Issue: Status checks required but not found

**Symptoms:**

```
Required status checks are not passing: validate, security-scan
```

**Solution:**

- Workflows must run at least once to appear in branch protection
- Push a commit or create PR to trigger workflows
- After workflows run, they'll appear in status checks
- Go back to branch protection and select them

### Issue: CodeQL not finding JavaScript

**Solution:**

```yaml
Check .github/workflows/codeql-analysis.yml:
  language: ["javascript"] # or 'typescript'
```

### Issue: Dependabot PRs not appearing

**Solution:**

1. Check Settings → Code security → Dependabot is enabled
2. Check .github/dependabot.yml exists
3. Wait up to 24 hours for first scan
4. Check Settings → Insights → Dependency graph

---

## 📈 Success Metrics

After setup, you should see:

```yaml
✅ Green badge in Security tab
✅ Dependabot checking for updates
✅ CodeQL running on pushes/PRs
✅ Scorecard score visible
✅ Branch protection preventing direct pushes
✅ Environment protection requiring approval
✅ Releases include SBOM and checksums
✅ Build provenance verifiable
```

---

## 🎓 Training Your Team

### For All Developers

Required reading:

1. [SECURITY_QUICK_REFERENCE.md](./SECURITY_QUICK_REFERENCE.md) (10 min)
2. [SECURITY.md](../../SECURITY.md) - Security policy (15 min)

### For Maintainers/Release Managers

Additional reading:

1. [SECURITY_CONFIG.md](./SECURITY_CONFIG.md) (30 min)
2. This file (SETUP_INSTRUCTIONS.md) (15 min)

### Team Meeting Topics

Cover these in team meeting:

- How to review Dependabot PRs
- Never commit secrets
- How to create secure releases
- Responding to security alerts
- Using signed commits

---

## 📋 Post-Setup Checklist

Complete these after initial setup:

```yaml
Repository Configuration:
  ✅ All security features enabled
  ✅ Branch protection configured (main + release)
  ✅ Production environment created
  ✅ Notifications configured
  ✅ Secrets added (if needed)

Testing:
  ✅ Created test tag and verified workflow
  ✅ Verified branch protection blocks direct push
  ✅ Created test PR and verified checks
  ✅ Reviewed Dependabot alerts (if any)
  ✅ Checked CodeQL results

Documentation:
  ✅ Team has access to security docs
  ✅ Added security badges to README (optional)
  ✅ Updated SECURITY.md with contact info
  ✅ Documented any custom configuration

Ongoing:
  ✅ Calendar reminder: Review security weekly
  ✅ Calendar reminder: Rotate secrets quarterly
  ✅ Assigned: Security point person
```

---

## 🔗 Quick Links

| Resource                | Link                                                         |
| ----------------------- | ------------------------------------------------------------ |
| **Security Policy**     | [SECURITY.md](../../SECURITY.md)                                |
| **Quick Reference**     | [SECURITY_QUICK_REFERENCE.md](./SECURITY_QUICK_REFERENCE.md) |
| **Configuration Guide** | [SECURITY_CONFIG.md](./SECURITY_CONFIG.md)                   |
| **GitHub Security**     | Settings → Code security and analysis                        |
| **Branch Protection**   | Settings → Branches                                          |
| **Environments**        | Settings → Environments                                      |
| **Secrets**             | Settings → Secrets and variables → Actions                   |

---

## ✅ Summary

Your repository now has:

1. **Automated Security Scanning**

   - CodeQL for code vulnerabilities
   - Trivy for dependencies and filesystem
   - Secret scanning to prevent leaks
   - OpenSSF Scorecard for best practices

2. **Supply Chain Security**

   - SLSA Level 3 compliant
   - Build provenance attestation
   - SBOM generation
   - Artifact checksums

3. **Access Control**

   - Branch protection on main and release
   - Required reviews before merge
   - Environment protection for production
   - Restricted who can push

4. **Dependency Management**

   - Dependabot automated updates
   - Grouped security updates
   - Weekly update schedule
   - Audit before releases

5. **Documentation**
   - Security policy
   - Configuration guide
   - Quick reference for developers
   - Setup instructions (this file)

---

## 🆘 Need Help?

1. **Check documentation** in `.github/` folder
2. **Review GitHub docs** on security
3. **Contact maintainers** via issues
4. **Security issues**: Use [Security Advisories](../../security/advisories)

---

**Setup Complete!** 🎉

Your repository now follows industry-standard security practices.

**Next Steps:**

1. Complete the post-setup checklist above
2. Share security docs with your team
3. Schedule first security review
4. Create your first secure release!

---

**Last Updated**: December 10, 2025  
**Version**: 1.0  
**Maintained By**: Repository Security Team
