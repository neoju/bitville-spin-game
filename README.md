# Bitville SpinGame challenge

The goal is to create a simple game where users can spin a wheel to win random prizes.
The wheel should have various segments, each representing a different prize.
When the user clicks the "Spin" button, the wheel spins and randomly selects a prize.

## The intro

A Spin Game built with: Nuxt3, Pinia, Vuetify, TailwindCSS, D3js, Howlerjs

What is the strategy? After many hours of research (I didn't make something like this before, have no ideal)
I think the right way is to <b>create a PieChart and make it spinnable</b>,
and D3js is the best choice (with many example). That's it!

## Setup

I used `bun` for development but you can use other package manager to run the project.

Anw `bun` is a nice try :D

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```
