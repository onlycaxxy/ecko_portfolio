# Writing Briefs

Quick topic ideas and rough thoughts for future blog posts.

---

## Ideas Queue

### Design & Aesthetics

- the origin of hikki
The Canvas That Thinks With You
I remember scrolling through all these AI chat tools, and there was always this one feature that made me stop—the canvas. You know, that space where your thoughts could actually live instead of just scrolling away into oblivion. I kept thinking: what if we flip this whole thing? What if there's no chat interface pretending to be the main event, and instead, it's just canvas from the start? Pure workspace. You add words, draw connections, build something visual and alive. No more hunting through endless conversation threads to find that one idea you had three days ago.
This wasn't just some random entrepreneurial itch. I was deep in standardized exam prep at the time, drowning in content, and I realized something—when someone hands you a study flow, a structure, you don't panic. You know where to start. You know what's next. There's no paralysis. And I needed that desperately because my brain doesn't work in straight lines.
My personal journey with this goes back to my own struggles with structure. I have CPTSD fog and ADHD, which means my head can feel like a storm sometimes. I need to see the flow of things. I need the process to be visible, tangible, not buried in some chat log or hidden in my racing thoughts. But here's the thing—I also have a creator's mindset. I love maps, zines, vibe coding. I think in visuals and connections, not rigid spreadsheets or boring templates. So I was stuck between two worlds: needing structure but refusing to sacrifice creativity for it.
Whether I was tackling a standardized exam or diving into a creative project, I realized the workflow had to reflect real tasks—the messy, non-linear, actually-how-humans-work kind of tasks. Not some chatbot asking me "what would you like to do today?" like I'm supposed to have my life figured out already. I wanted something that could keep up with how my brain actually moves.
That's when I added another layer: characterized AI for chat. Not just one generic assistant, but different partners—a tutor when I'm studying, a creative collaborator when I'm making something, an academic coach when I need accountability. Because sometimes you need someone who gets what mode you're in.
What this product means to me now is clarity. I'm not a headless fly buzzing around without direction, learning or creating without a plan. Through chat, the AI takes my half-formed dream-talk, those scattered thoughts that barely make sense even to me, and breaks them down into different domains right there on the canvas. Suddenly I can see it. The chaos becomes structure. The structure becomes movement. And I can write better, think better, work with more dynamics because everything's visual, everything's connected, and nothing gets lost in the scroll.
It's not just a tool. It's the workspace I always needed but could never find.

### Technical / Code

- the structure of hikki 
  From Philosophy to Implementation: Building a Human-Centered Map System
Let me break this down from the philosophical foundation to concrete schemas, exploring how human cognition can guide our technical decisions.
 
🧠 Philosophical Foundation: How Humans Think
Core Insight
Human memory and knowledge aren't stored as rigid hierarchies or random graphs—they're contextual networks that shift based on:
•	Current goals (exam prep vs. creative brainstorming)
•	Emotional associations (this concept excites me, that one intimidates me)
•	Temporal context (what I learned first vs. what I need to master next)
•	Expertise level (beginner needs scaffolding, expert needs connections)
Key Principle
"The map should feel like your brain's whiteboard, not a database diagram"
🌕 Hikki: Mapping the Light Inside Chaos
I never meant to make another AI chat.
I wanted to see what I was thinking.
Most systems only let you talk to intelligence —
but I wanted to walk through it.
That’s how Hikki began —
a name that means “light,” born from the need to illuminate how ideas move inside us.
Not as a productivity hack.
Not as another “assistant.”
But as a visualized language —
a way to render your mind as a living map.
 
💡 The Origin: From Fragments to Flow
I came from a background of design, writing, and conceptual thinking — not engineering.
I was used to shaping meaning, not systems.
But when I started to build Hikki, I realized that logic and emotion follow the same geometry.
Both are networks: branching, looping, converging.
So I began asking a question:
“What if thinking itself could have a coordinate system?”
I imagined each thought as a node,
each connection as a path,
each creative domain — like writing, studying, or reflection — as a territory on a larger mental map.
The interface wouldn’t just show tasks —
it would mirror cognition itself.
 
🧩 From Vision to Implementation
To turn philosophy into something real, I built Hikki with three layers of experience:
1. The Conceptual Layer — Logic of Interaction
•	Core principle: Everything is a node, every decision is a path.
•	The user’s world = a map of territories (Listening, Reading, Writing, Speaking, etc.)
•	Each node carries:
o	label: what the user is working on
o	status: Todo / Doing / Done
o	notes: reflection or learning
•	The system auto-generates relationships between nodes based on reasoning patterns (SWOT, decisions, cause-effect).
The user doesn’t “type tasks.”
They build meaning structures through interaction.
 
2. The Visual Layer — Canvas as Mind
The main experience is not text — it’s movement:
•	Infinite SVG canvas with zoom, drag, pan, and double-click editing
•	Nodes are draggable objects with visible edges (paths) connecting them
•	Auto-layout algorithm keeps territories flexible — they resize and reposition to hold all contained nodes
•	Inspector panel floats with the node, recalculating position based on viewBox to stay visually anchored
When users zoom in, the map becomes personal;
when they zoom out, they see the system —
their whole ecosystem of thoughts.
Core Technologies:
•	Vue 3 + Composition API
•	SVG-based rendering
•	Reactive viewBox for smooth zoom/pan transitions
•	Canvas overlay editor for inline note editing
•	Auto-layout algorithm using geometric constraints (node.x, node.y, padding)
 
3. The Cognitive Layer — Reasoning Engine
This is where the chat becomes meaningful again.
Instead of pure dialogue, Hikki uses an internal function:
runAnalysis(chatInput) → schema(nodes, edges)
For MVP, this is rule-based (a stub):
chat messages are parsed into SWOT categories, generating nodes automatically.
Eventually, it will connect to an LLM Wrapper API,
allowing real reasoning —
turning conversation into structured maps of understanding.
Each iteration can be saved as a snapshot,
so your evolution is visible —
not in chat history, but in cognitive topography.
 
⚙️ Technical Architecture (MVP)
Hikki/
├── index.html               # Entry point
├── src/
│   ├── main.js              # Vue 3 setup
│   ├── components/
│   │   ├── CanvasView.vue   # SVG canvas, panning, zoom
│   │   ├── Node.vue         # Interactive node element
│   │   ├── Inspector.vue    # Floating node editor
│   ├── composables/
│   │   ├── useViewBox.js    # Manages zoom and pan logic
│   │   ├── useGraph.js      # Nodes, edges, territories
│   │   ├── useStorage.js    # Auto snapshot and load
│   └── api/
│       └── runAnalysis.js   # Chat → schema (stub)
└── package.json
Core Stack
•	Frontend: Vue 3 (Composition API)
•	Canvas: SVG with dynamic viewBox
•	State Management: ref / reactive
•	Persistence: localStorage (MVP), later Supabase or Firebase
•	AI Layer: Local rule parser → future OpenAI API
•	Auto Layout: Force-directed or grid-based layout (D3-inspired)
•	Snapshot System: Timestamped schema archives
 
🧭 Decision Priorities
Layer	Decision	AI Agent Role
Workflow Schema	Define node relationships, timestamps, and task states	High — Agent can generate or restructure graphs
Canvas Interaction	Implement drag, zoom, viewBox, overlay editor	Medium — Engineer defines geometry; AI assists
LLM Wrapper	Connect chat to reasoning schema	High — Agent manages API calls & data flow
Auto Snapshot	Save map state per generation	Low — Pure engineering logic
UI Tone	Persona-based interaction design	Founder decision — defines product character
 
🌤️ Cooperation Between Human & AI
As a non-engineer founder, I realized this project isn’t about “doing it all.”
It’s about designing a language of cooperation between human intent and machine precision.
So I began crafting prompts like:
“You are my co-engineer.
Focus on making the canvas logic consistent,

but never touch the emotional tone of the product.
Every node is a moment of thought — treat it with care.”
That became the tone of collaboration.
AI handles the scaffolding — logic, wiring, testing.
I handle the meaning — motivation, emotional rhythm, and direction.
Together, we build not faster, but truer.
 
✨ Why It Matters
Hikki is not an app.
It’s a practice — a way to externalize thinking with the tenderness of a designer and the rigor of a scientist.
It’s built for people who want to see their own logic glow.
When I see a user zoom into a node —
and begin typing in the inspector,
writing not for the system, but for themselves —
that’s the moment I know Hikki is working.
Because they are no longer “using software.”
They are meeting their own light.
 
Hikki means light — not the light that blinds, but the one that guides you home.


-

### Translation 

### Literature

- read joan didion, "play it as it lays" and jointing down my new screenplay
- also connected to a prague movie daises, with it dedication is to dedicate to all those whose sole source of indignation is a trampled-on trifle. the novel and the movie shares the same Nihilism
- while in my play (my characters)everybody cares a lot, 
- Nihilism (Didion/Maria): Nothing matters → drift through life → sad emptiness
- Anti-Nihilism (My characters): Everything matters → work desperately → sad exhaustion
- Playfulness (Daisies): Nothing matters, so play → destroy things for fun → sad revelation (we're choosing to care about trifles)
- my characters exist in the middle space:
- They KNOW their projects might be trifles (C's family says "school doesn't matter"; B's self-destruction suggests she knows power might not save her; A's confession to C succeed precisely because they DON'T matter)
- But they cannot stop caring
- They cannot choose complete lightness which makes them return to nihilism, because people can't never care enough

---

## Currently Working On

**Topic:**

**Status:**

**Target publish:**

---

## Instructions

**Add ideas anytime** - Just jot down quick bullet points

**No need to be polished** - Raw thoughts are fine

**Move to "Currently Working On"** when you start developing a topic

**Example format:**
```
- Why lo-fi design feels more honest than high-polish
  - Connect to translation work?
  - Maybe talk about grain/noise as intentional imperfection
```
