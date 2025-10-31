# Deployment Guide: Git + Netlify

## 🚀 Quick Deployment (5 minutes)

### 1. Initialize Git & Push to GitHub

```bash
# In your project directory
git add .
git commit -m "Initial commit: Portfolio + Ecko integration"

# Create new GitHub repo, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Netlify

**Option A: Via Netlify UI** (Recommended)
1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub → Select your repo
4. Netlify auto-detects settings from `netlify.toml` ✅
5. Add environment variables (see below)
6. Click "Deploy"

**Option B: Via Netlify CLI**
```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### 3. Add Environment Variables in Netlify

**CRITICAL**: In Netlify dashboard:
1. Go to Site settings → Environment variables
2. Add these variables:

```
VITE_AI_PROVIDER=deepseek
VITE_DEEPSEEK_API_KEY=sk-your-key-here
VITE_DEEPSEEK_MODEL=deepseek-chat
VITE_DEEPSEEK_ENDPOINT=https://api.deepseek.com/v1/chat/completions
VITE_USAGE_LIMIT=100
VITE_TOKEN_WARNING_THRESHOLD=2000
```

3. Click "Save" → Trigger redeploy

---

## 📋 Maintenance Workflow

### Daily Development

```bash
# Make changes locally
pnpm dev              # Test at localhost:8080

# Commit changes
git add .
git commit -m "Descriptive message"
git push

# Netlify auto-deploys! ✅
```

### Writing Blog Posts

```bash
# 1. Create markdown file
touch public/content/blog/my-new-post.md

# 2. Write content (see README in blog folder)

# 3. Update Blog.tsx metadata

# 4. Commit and push
git add .
git commit -m "Add blog post: My New Post"
git push

# Live in 2 minutes! ✅
```

### Updating Ecko Logic

```bash
# Edit files in client/lib/
# Test locally first
pnpm dev

# Commit when working
git add client/lib/
git commit -m "Update Ecko: [description]"
git push
```

---

## 🔒 Security Checklist

- [x] .env is in .gitignore (API keys protected)
- [x] .env.example provided (no secrets)
- [x] Environment variables set in Netlify dashboard
- [ ] Remove API key from any committed files
- [ ] Regularly rotate API keys

---

## 🐛 Troubleshooting

**Build fails on Netlify?**
```bash
# Test build locally first:
pnpm run build

# Check dist/spa folder created
ls dist/spa
```

**Environment variables not working?**
- Must start with `VITE_` prefix
- Set in Netlify UI, not in code
- Redeploy after adding variables

**Blog posts not loading in production?**
- Ensure `public/content/blog/` is committed
- Check netlify.toml publish path is `dist/spa`
- Verify markdown files have correct frontmatter

---

## 📊 Build Info

- **Framework**: React + Vite
- **Build command**: `pnpm run build`
- **Output directory**: `dist/spa`
- **Node version**: 20
- **Package manager**: pnpm

