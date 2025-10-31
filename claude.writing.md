# Claude Writing Workflow

**Purpose:** Structured system for collaborating with Claude on design and tech blog posts.

---

## Workflow Overview

This system helps you write thoughtful, engaging blog posts through a structured process:

```
Brief → Research → Angle → Co-edit → Publish
  ↓         ↓         ↓        ↓         ↓
brief.md  knowledge  angle.md  co-edit.md  /blog/
          _base.md
```

---

## File Structure

```
.writing/
├─ brief.md              ← Your short topic ideas (manual entry)
├─ knowledge_base.md     ← Research & online sources (Claude searches)
├─ angle.md              ← Discussion history on writing angles
├─ principles.md         ← Your writing preferences (natural language)
├─ co-edit.md            ← Active collaboration workspace
└─ style_reference.md    ← Archive of your writing for style learning
```

---

## How to Use Each File

### 1. `brief.md` - Topic Ideas
**You write:** Short bullet points on what you want to write about

**Example:**
```markdown
## Ideas Queue

- Why minimalist design isn't just "less is more"
- Building a translation system with React + Markdown
- The aesthetics of lo-fi web design
- How translation mirrors fragmentation (Pessoa)
```

**When:** Anytime you have an idea

---

### 2. `knowledge_base.md` - Research Repository
**Claude writes:** Precise knowledge from online searches

**Example:**
```markdown
## Research: Minimalist Design History

### Sources
- Dieter Rams' 10 Principles (1970s)
- Japanese Ma (negative space concept)
- Bauhaus influence on digital design

### Key Findings
[Claude's research notes with citations]
```

**When:** After you pick a topic from brief.md

---

### 3. `angle.md` - Discussion Archive
**Both of you:** Chat history on finding the right angle

**Example:**
```markdown
## Post: Minimalist Design (2025-10-21)

**Initial angle:** "10 principles of minimalist design"
- You: Too generic, everyone writes this
- Claude: What about focusing on WHY minimalism fails?

**Pivot:** "When minimalism becomes maximalism in disguise"
- You: Yes! The irony of "minimal" design that's actually complex
- Claude: Could tie to your translation work - stripping down to essence

**Final angle:** "Responsible Creation: What minimalism gets wrong"
[Saved discussion continues...]
```

**When:** During angle exploration phase

---

### 4. `principles.md` - Writing Preferences
**You write:** Natural language rules for Claude to follow

**Example:**
```markdown
## What I Want

- Start with a story or specific image, not abstract concepts
- Short paragraphs (3-4 sentences max)
- No buzzwords or jargon unless deconstructing them
- Chinese/English bilingual when discussing translation
- Honest, not trying to impress
- Show don't tell

## What I Don't Want

- Listicles ("5 ways to...")
- Overly academic tone
- Marketing speak
- Forced conclusions
- Apple emoji style (use text symbols instead)
```

**When:** Before starting any writing, update as you go

---

### 5. `co-edit.md` - Active Workspace
**Both of you:** Live collaboration on current draft

**Structure:**
```markdown
## Draft: [Title] - Status: [Outline/Draft/Revision/Final]

### Version History
- v1: First draft (Claude)
- v2: Your edits + comments
- v3: Claude revision based on feedback
[continues...]

### Current Version

[The actual draft being worked on]

### Notes & Feedback
- You: "This paragraph feels too formal"
- Claude: "Revised with more conversational tone"
```

**When:** Active writing session

---

### 6. `style_reference.md` - Style Archive
**You archive:** Your finished writing + co-edit learnings

**Example:**
```markdown
## Archived Pieces

### "Responsible Creation" (2025-08-16)

[Full text of published post]

**Style notes:**
- Opened with Pessoa quote (worked well)
- Used "I" voice throughout (personal, honest)
- Mixed short/long sentences for rhythm
- Ended without conclusion (let reader think)

### "Translation as Fragmentation" (2025-06-24)

[Full text]

**What worked:**
- Bilingual presentation
- Poetic fragments instead of essay structure
```

**When:** After publishing a post

---

## Typical Workflow

### Phase 1: Ideation
1. You add ideas to `brief.md`
2. You pick one topic to develop

### Phase 2: Research
1. You tell Claude: "Research [topic] for knowledge_base.md"
2. Claude searches online, adds findings to `knowledge_base.md`
3. You review research

### Phase 3: Find Angle
1. You start discussion in `angle.md`
2. Both brainstorm different approaches
3. Claude saves discussion history to `angle.md`
4. You decide on final angle

### Phase 4: Co-write
1. Claude drafts outline in `co-edit.md` (based on principles.md + style_reference.md)
2. You give feedback
3. Claude revises
4. Iterate until done

### Phase 5: Publish & Archive
1. Final version posted to `/public/content/blog/`
2. You copy to `style_reference.md` with notes
3. Clear `co-edit.md` for next post

---

## Commands for Claude

**When you want to:**
- Start new post: "Read brief.md, let's work on [topic]"
- Research: "Search online for [topic], update knowledge_base.md"
- Find angle: "Let's brainstorm angles in angle.md"
- Start draft: "Create outline in co-edit.md following principles.md"
- Revise: "Read my comments in co-edit.md and revise"
- Learn style: "Read style_reference.md before writing"

---

## File Locations

**Workflow files:**
`.writing/` folder in project root

**Published posts:**
`/public/content/blog/[slug].md`

**Portfolio cards:**
`/client/pages/Blog.tsx` (add new posts here)

---

## Principles (Link to Detail)

See `.writing/principles.md` for your complete writing preferences.

---

**Last Updated:** 2025-10-21
**Version:** 1.0
