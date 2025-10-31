---
title: "From Philosophy to Implementation: Building Hikki's Architecture"
date: "2025-10-27"
excerpt: "I came from design, writing, translation—spaces where you shape meaning, not systems. When I started building Hikki, I knew I'd need to learn frontend architecture deeply enough to make technical decisions that served the philosophy: this is a tool for seeing how you think."
image: "/placeholder.svg"
---

I came from design, writing, translation—spaces where you shape meaning, not systems. When I started building Hikki, I knew I'd need to learn frontend architecture. Not superficially, but deeply enough to make technical decisions that served the philosophy: this is a tool for seeing how you think. No backend. No data collection. Just smooth, immediate interaction between user and canvas.

That focus shaped everything. I spent time understanding SVG coordinate systems, force-directed layouts, reactive state management—not because they're "proper engineering," but because they're how you build fluid visual interfaces.

## 一、世界座標系統：Canvas as Foundation

Before writing code, I kept returning to one question: what if thinking had coordinates? Not as metaphor, but as interface. Every idea occupying a position in space. Connections visible as paths. The whole system browsable like a map.

This led to a decision: **canvas first, chat secondary. Everything is a node in world coordinates.**

I knew the existing pattern felt backwards—chat interfaces with canvas buried as "optional visualization," as if spatial arrangement was decoration rather than foundation. I needed canvas as primary interface, which meant learning how SVG viewBox works as camera, how world-to-screen transforms maintain spatial relationships during zoom, how coordinate systems stay consistent when users drag nodes.

These aren't abstract concepts. They're the technical foundation for "thoughts staying where you place them." I learned by building: implementing zoom broke positioning, fixing positioning revealed viewBox math, understanding viewBox led to proper coordinate transforms.

## 二、Frontend-First Architecture

The flow I designed: text input becomes structured analysis becomes visual map becomes iterative workspace. User types "prepare for standardized exam" and watches territories appear—listening, reading, writing, speaking. Each containing nodes for specific tasks. Everything visible. Nothing scrolling away.

This required understanding layout algorithms. Force-directed graphs push nodes apart like magnets. DAG layouts arrange hierarchies. I studied these not to follow patterns, but to choose what served the experience: organic territory resizing, smooth zoom transitions, inspector panels that track node position during viewport changes.

Frontend-first meant prioritizing interaction over data architecture. The first version used localStorage—no backend, no server, no data leaving the browser. Because the point isn't storing user information. It's letting users see their own thinking process unfold in real-time, fluidly, without lag between thought and visual representation.

## 三、Learning Through Building

The first version was one file. Vue 3, localStorage, runAnalysis() returning mock data. No build tools, no backend. It was rough—nodes overlapped, zoom felt janky, the inspector didn't track properly.

But the core was there. Thoughts in space. Structure emerging visually.

Each problem became a learning path. Nodes overlapping led me to force-directed layouts and collision detection. Janky zoom revealed the need for smooth viewBox transitions and transform calculations. Inspector positioning taught me how to synchronize UI elements with coordinate systems during viewport changes.

I wasn't just describing what I wanted and letting AI figure it out. I was learning why zoom feels janky (discrete jumps instead of interpolated transitions), what makes positioning smooth (understanding the relationship between world coordinates and screen pixels), how to maintain spatial consistency (keeping node relationships stable during layout recalculation).

The technical knowledge accumulated through iteration. Not by studying frontend engineering systematically, but by identifying what broke the experience and learning what fixed it. When the inspector panel lagged during zoom, I needed to understand viewBox transforms to solve it—not theoretically, but practically, in the context of this specific interaction.

This is how I work: philosophy sets direction, experience reveals problems, technical learning follows need. The result is selective but deep knowledge—I understand SVG coordinate math because smooth canvas interaction required it, not because it was on a curriculum.
