# Security Configuration Guide

This document outlines the complete security configuration for this repository following industry standards.

## 📋 Table of Contents

1. [GitHub Repository Settings](#github-repository-settings)
2. [Branch Protection Rules](#branch-protection-rules)
3. [Environment Protection](#environment-protection)
4. [Secrets Management](#secrets-management)
5. [Security Scanning](#security-scanning)
6. [Compliance Standards](#compliance-standards)

---

## 🔧 GitHub Repository Settings

### Required Settings in GitHub UI

Navigate to **Settings** → **Security**:

#### Code Security and Analysis

```
✅ Dependency graph: Enabled
✅ Dependabot alerts: Enabled
✅ Dependabot security updates: Enabled
✅ Grouped security updates: Enabled
✅ Code scanning: Enabled
   → CodeQL analysis: Configured
   → Trivy scanning: Configured
✅ Secret scanning: Enabled
✅ Push protection: Enabled (prevents committing secrets)
```

#### Actions Permissions

Navigate to **Settings** → **Actions** → **General**:

```
Workflow permissions:
  ⚪ Read and write permissions (default)
  ⦿ Read repository contents and packages permissions (recommended)

  ✅ Allow GitHub Actions to create and approve pull requests
```

---

## 🛡️ Branch Protection Rules

### Main Branch Protection

**Settings** → **Branches** → **Add rule** → Branch name pattern: `main`

```yaml
Branch Protection Settings:

✅ Require a pull request before merging
   ✅ Require approvals: 1
   ✅ Dismiss stale pull request approvals when new commits are pushed
   ✅ Require review from Code Owners
   ✅ Require approval of the most recent reviewable push

✅ Require status checks to pass before merging
   ✅ Require branches to be up to date before merging
   Required status checks:
     - validate
     - security-scan
     - CodeQL
     - Trivy

✅ Require conversation resolution before merging

✅ Require signed commits (highly recommended)

✅ Require linear history

✅ Require deployments to succeed before merging (if using environments)

✅ Lock branch (for critical releases)

✅ Do not allow bypassing the above settings
   □ Include administrators (recommended for high security)

✅ Restrict who can push to matching branches
   Allowed to push:
     - [Your team/username]
     - github-actions[bot] (if needed)

✅ Allow force pushes: No one
   OR
   Specify who can force push:
     - github-actions[bot] (only if required)

✅ Allow deletions: Disabled
```

### Release Branch Protection

**Branch name pattern: `release`**

```yaml
Branch Protection Settings:

✅ Require status checks to pass before merging
   Required status checks:
     - validate
     - security-scan

✅ Do not allow bypassing the above settings

✅ Restrict who can push to matching branches
   Allowed to push:
     - github-actions[bot]

✅ Allow force pushes: Specify who can force push
   - github-actions[bot]

⚠️ Note: Force push is needed for release branch updates
```

---

## 🌍 Environment Protection

### Creating Protected Environments

**Settings** → **Environments** → **New environment**

#### Production Environment

```yaml
Environment name: production

Protection rules:
  ✅ Required reviewers
     Reviewers: [Team leads, Release managers]

  ✅ Wait timer: 5 minutes (optional safety delay)

  ✅ Deployment branches and tags
     Selected tags:
       - v*
     Selected branches:
       - main

Environment secrets:
  - NPM_TOKEN (if publishing to npm)
  - PAT_TOKEN (if needed for branch protection bypass)
```

#### Staging Environment (Optional)

```yaml
Environment name: staging

Protection rules:
  ✅ Required reviewers (optional)
  ✅ Deployment branches:
       - develop
       - staging
```

---

## 🔑 Secrets Management

### Repository Secrets

**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

#### Required Secrets

```yaml
Secrets to configure:

1. PAT_TOKEN (optional, only if branch protection requires it)
   Description: Personal Access Token with repo permissions
   Scope: repo, workflow
   Expiration: 90 days (rotate regularly)

2. NPM_TOKEN (if publishing to npm)
   Description: npm automation token
   Type: Automation token (not granular)
   Permissions: Read and Publish

3. SLACK_WEBHOOK_URL (optional, for notifications)
   Description: Slack webhook for release notifications

4. GPG_PRIVATE_KEY (optional, for signing)
   Description: GPG private key for commit signing
```

#### Secret Security Best Practices

```yaml
✅ Use GitHub environment secrets for production-specific secrets
✅ Rotate secrets every 90 days maximum
✅ Use fine-grained PATs instead of classic tokens when possible
✅ Never log secrets in workflow outputs
✅ Use secret scanning to prevent accidental exposure
✅ Limit secret scope to specific environments/workflows
```

---

## 🔍 Security Scanning

### 1. CodeQL Analysis

**Purpose**: Static code analysis for security vulnerabilities

```yaml
Configuration: .github/workflows/codeql-analysis.yml

Frequency:
  - On every push to main, develop, release
  - On every pull request to main
  - Weekly scheduled scan (Monday 00:00 UTC)

Languages: JavaScript/TypeScript

Queries: security-extended, security-and-quality
```

### 2. Trivy Vulnerability Scanner

**Purpose**: Scan for vulnerabilities in dependencies and filesystem

```yaml
Configuration: Embedded in publish.yml

Scans:
  - Filesystem vulnerabilities
  - Dependency vulnerabilities
  - Misconfigurations

Severity levels: CRITICAL, HIGH

Results: Uploaded to GitHub Security tab
```

### 3. npm Audit

**Purpose**: Check for known vulnerabilities in npm dependencies

```yaml
Configuration: Embedded in publish.yml

Audit level: Moderate and above

Runs: On every release and validation
```

### 4. Dependabot

**Purpose**: Automated dependency updates and security patches

```yaml
Configuration: .github/dependabot.yml

Update frequency: Weekly (Monday 09:00)

Ecosystems:
  - npm (dependencies)
  - GitHub Actions (workflow dependencies)

Groups:
  - development-dependencies (minor + patch)
  - production-dependencies (minor + patch)

Auto-merge: Configure in Settings → Code security → Dependabot
```

### 5. Secret Scanning

**Purpose**: Detect accidentally committed secrets

```yaml
Configuration: GitHub-managed (no config file)

Enable: Settings → Code security → Secret scanning
  ✅ Secret scanning
  ✅ Push protection

Supported patterns:
  - API keys
  - Tokens
  - Credentials
  - Private keys
  - Database connection strings
```

### 6. OpenSSF Scorecard

**Purpose**: Measure repository security posture

```yaml
Configuration: .github/workflows/scorecard.yml

Frequency: Weekly (Saturday 00:00 UTC)

Checks:
  - Branch protection
  - CI tests
  - Code review
  - Dependency updates
  - Fuzzing
  - Maintained
  - Pinned dependencies
  - SAST
  - Security policy
  - Signed releases
  - Token permissions
  - Vulnerabilities
```

---

## 📜 Compliance Standards

### SLSA (Supply-chain Levels for Software Artifacts)

**Target Level: SLSA Level 3**

```yaml
Requirements Met:

Level 1: ✅ Build process is fully scripted/automated
  ✅ Provenance is generated

Level 2: ✅ Version control for source code
  ✅ Authenticated and service-generated provenance
  ✅ Build service

Level 3: ✅ Source and build platforms meet specific standards
  ✅ Provenance is non-falsifiable
  ✅ Provenance includes all build parameters

Implementation:
  - actions/attest-build-provenance@v1
  - id-token: write permission
  - attestations: write permission
```

### SBOM (Software Bill of Materials)

**Standard: CycloneDX**

```yaml
Generated for every release:
  - Format: CycloneDX JSON
  - Tool: @cyclonedx/cyclonedx-npm
  - Attached to GitHub Releases
  - Includes all dependencies with versions and licenses
```

### Supply Chain Security

```yaml
Components:

1. Provenance Generation
   - Build attestation for artifacts
   - Signed with GitHub OIDC token
   - Verifiable with gh CLI

2. Artifact Integrity
   - SHA256 checksums for all artifacts
   - Checksums published in release
   - Verification instructions in SECURITY.md

3. Dependency Management
   - Lock file committed (package-lock.json)
   - Regular updates via Dependabot
   - Security audits before releases

4. Code Signing
   - Git tags signed with GPG
   - Commits signed (optional but recommended)
   - Release artifacts attested
```

---

## 🎯 Security Checklist for New Repositories

Use this checklist when setting up a new repository:

### Initial Setup

```yaml
□ Enable all security features in Settings → Code security
□ Configure branch protection rules for main
□ Create production environment with required reviewers
□ Add CodeQL workflow
□ Add Trivy scanning
□ Configure Dependabot
□ Add OSSF Scorecard workflow
□ Create SECURITY.md file
□ Add security badges to README.md
```

### Workflow Configuration

```yaml
□ Use fine-grained permissions in workflows
□ Enable id-token: write for provenance
□ Add attestations: write for artifact signing
□ Generate SBOM in release workflow
□ Create checksums for artifacts
□ Add security scanning step
□ Require security jobs to pass before release
```

### Documentation

```yaml
□ Document security policy in SECURITY.md
□ Add security section to README.md
□ Document secrets management
□ Provide verification instructions
□ Include security badges
```

### Ongoing Maintenance

```yaml
□ Review Dependabot PRs weekly
□ Monitor CodeQL alerts
□ Check OSSF Scorecard results monthly
□ Rotate secrets quarterly
□ Review and update security policy annually
□ Respond to security reports within 48 hours
```

---

## 🔗 Additional Resources

### GitHub Documentation

- [Securing your repository](https://docs.github.com/en/code-security/getting-started/securing-your-repository)
- [About branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Using environments for deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

### Security Standards

- [SLSA Framework](https://slsa.dev/)
- [OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org/)
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks)

### Tools

- [Trivy](https://github.com/aquasecurity/trivy)
- [CodeQL](https://codeql.github.com/)
- [Dependabot](https://github.com/dependabot)
- [OSSF Scorecard](https://github.com/ossf/scorecard)

---

## 📞 Support

For questions about security configuration:

1. Review this document
2. Check [SECURITY.md](../../SECURITY.md)
3. Review GitHub's security documentation
4. Contact repository maintainers

---

**Last Updated**: December 10, 2025  
**Maintained By**: Security Team  
**Review Frequency**: Quarterly
