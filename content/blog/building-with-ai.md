# Building with AI — How I Actually Use It in My Workflow

Not a tutorial. Not a "10 prompts to 10x your productivity" thread.
Just how I actually build stuff day to day as a 19-year-old 
developer who ships real projects.

---

## First, the honest part

I don't write most of my boilerplate anymore.
I don't Google syntax anymore.
I don't spend 40 minutes setting up a project structure anymore.

And I'm not ashamed of that.

A carpenter doesn't feel bad for using a nail gun
instead of a hammer.
The skill is still in knowing what to build
and how to build it right.

---

## How a typical build starts for me

I open Claude or ChatGPT before I open my code editor.

Not to write code — to think.

I'll dump everything in my head into the chat.
What I'm building, what problem it solves,
what stack I'm thinking, what I'm unsure about.

It pushes back. Asks questions I hadn't considered.
Sometimes completely changes my approach before
I've written a single line.

That conversation alone saves me hours of
going down the wrong path.

---

## The part where I actually write code

I still write code. A lot of it.

But my loop looks like this:

1. I know what I want to build
2. I write the rough structure myself
3. I use AI to fill in the parts I know how to verify
4. I read everything it gives me before using it
5. I break it. Fix it. Understand why.

Step 4 is where most people fail.

Copying code you don't understand is how you ship
bugs you can never debug. The AI doesn't know your
codebase. It doesn't know your edge cases.
It's giving you a starting point, not a finish line.

---

## Real example — my Discord RPC card

I wanted to add a live Discord presence card to my portfolio.
Basically show my real-time status, what I'm listening to,
what I'm coding — right on my site.

Here's how I actually built it:

First I researched Lanyard API myself. Understood how the
WebSocket worked, what data it returned, what I needed.

Then I wrote a detailed prompt describing exactly what I wanted —
the data structure, the visual design, the states to handle,
the animations. Basically a full spec.

AI gave me a solid first draft.

Then I spent probably 3x longer than the initial generation
tweaking it. The Spotify progress bar alone went through
like 6 different versions because I kept changing my mind
about how it should look.

AI wrote maybe 60% of the final code.
But 100% of the decisions were mine.

---

## What I use and when

**Claude** — when I need to think through architecture,
debug something weird, or want it to actually 
explain what's happening and why.

**ChatGPT** — quick syntax, quick generations,
when I just need something fast.

**Cursor** — when I'm deep in a codebase and need
AI that has context of my whole project.
Game changer for refactoring.

**v0 by Vercel** — UI components when I need
something to look good fast and I'll customize it after.

I don't use just one. Different tools for different moments.

---

## The thing nobody tells you

Using AI well is actually a skill.

Bad prompt in, garbage out.

The developers getting the most out of AI are the ones
who can clearly articulate what they want,
understand the output they get back,
and know when the AI is confidently wrong.

That last one is important.
AI will give you wrong answers with the same
energy it gives you right ones.
You need to know the difference.

Which means you still need to actually know things.

---

## What's changed for me

I ship faster. Way faster.
Projects that would've taken me a month
take a week now.

But the quality of my thinking has gone up too —
because I spend less time on the tedious parts
and more time on the interesting parts.

The architecture. The decisions.
The "does this actually solve the problem" part.

---

## What hasn't changed

I still get stuck. Still debug for hours sometimes.
Still build things that don't work on the first try.
Still have to actually understand my own codebase.

AI didn't make development easy.
It made it faster.

There's a difference.

---

改善.
Keep building. Keep improving.
Use every tool available to you.

— Manas
