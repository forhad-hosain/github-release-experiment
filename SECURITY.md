# Security Policy

## 🔒 Security Standards

This project follows industry-standard security practices for software releases:

### Supply Chain Security

- **SLSA Level 3 Compliance**: Build provenance attestations for all releases
- **SBOM (Software Bill of Materials)**: Generated for every release
- **Dependency Scanning**: Automated vulnerability scanning via Dependabot and npm audit
- **Code Scanning**: CodeQL analysis for security vulnerabilities
- **Trivy Scanning**: Container and filesystem vulnerability scanning

### Release Security

- **Signed Commits**: All release commits are verified
- **Artifact Attestation**: Build artifacts are cryptographically attested
- **Checksums**: SHA256 checksums provided for integrity verification
- **Branch Protection**: Protected branches with required reviews
- **Environment Protection**: Production releases require manual approval (optional)

## 🔍 Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

### DO NOT create a public GitHub issue

Instead, please report security vulnerabilities through one of these methods:

1. **GitHub Security Advisories** (Preferred)

   - Go to the [Security tab](../../security/advisories)
   - Click "Report a vulnerability"
   - Fill out the form with details

2. **Direct Email**
   - Email: [your-email@example.com]
   - Include "SECURITY" in the subject line
   - Provide detailed description of the vulnerability

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)
- Your contact information

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 7-14 days
  - Medium: 14-30 days
  - Low: 30-90 days

## 🛡️ Security Features

### Automated Security Checks

- ✅ CodeQL analysis on every push and PR
- ✅ Trivy vulnerability scanning
- ✅ npm audit for dependency vulnerabilities
- ✅ Dependabot automated security updates
- ✅ OSSF Scorecard monitoring

### Release Process Security

1. **Code Review**: All changes require approval
2. **Security Scanning**: Automated checks must pass
3. **Build Attestation**: Provenance generated and signed
4. **SBOM Generation**: Dependencies tracked
5. **Checksum Verification**: SHA256 for artifacts
6. **Signed Tags**: Git tags are GPG signed

### Verification for Consumers

To verify the integrity of a release:

```bash
# 1. Download checksums.txt from the release
wget https://github.com/forhad-hosain/github-release-experiment/releases/download/v1.0.0/checksums.txt

# 2. Verify the checksums
sha256sum -c checksums.txt

# 3. Verify build provenance (requires gh CLI)
gh attestation verify dist/index.js -R forhad-hosain/github-release-experiment
```

## 🔐 Security Best Practices for Contributors

### Before Committing

- ✅ Run `npm audit` to check for vulnerabilities
- ✅ Ensure no secrets/credentials in code
- ✅ Use `.env` files for local secrets (never commit)
- ✅ Run linter and tests
- ✅ Sign your commits with GPG

### Dependency Management

- Only add necessary dependencies
- Regularly update dependencies
- Review dependency licenses
- Check for known vulnerabilities
- Use lock files (`package-lock.json`)

### Code Security

- Validate all inputs
- Sanitize outputs
- Use parameterized queries
- Avoid `eval()` and similar dangerous functions
- Follow principle of least privilege
- Use environment variables for configuration

## 📚 Resources

### External Resources

- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [SLSA Framework](https://slsa.dev/)
- [OSSF Scorecards](https://github.com/ossf/scorecard)
- [npm Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)

### Repository Documentation

- 🚀 **Setup Guide**: [.github/docs/SETUP_INSTRUCTIONS.md](.github/docs/SETUP_INSTRUCTIONS.md)
- 📖 **Quick Reference**: [.github/docs/SECURITY_QUICK_REFERENCE.md](.github/docs/SECURITY_QUICK_REFERENCE.md)
- ⚙️ **Configuration Details**: [.github/docs/SECURITY_CONFIG.md](.github/docs/SECURITY_CONFIG.md)

## 🏆 Security Scorecard

We participate in the OpenSSF Scorecard project. View our score:

- [Scorecard Results](https://securityscorecards.dev/)

## 📝 Security Changelog

All security-related changes are documented in [CHANGELOG.md](CHANGELOG.md) with a `🔒 SECURITY` prefix.

## ⚖️ Disclosure Policy

We follow **Coordinated Vulnerability Disclosure**:

1. Security researcher reports vulnerability privately
2. We acknowledge and investigate
3. We develop and test a fix
4. We release the fix
5. Public disclosure after fix is available
6. Credit given to reporter (if desired)

## 🙏 Acknowledgments

We appreciate the security research community and will acknowledge contributors in our releases (with permission).

---

Last Updated: December 10, 2025
