<div align="center">
  <h1>Pogoda</h1>
</div>

## What is Pogoda?

Pogoda is a simple and minimalist <a href="https://pogoda.vercel.app">weather dashboard</a> built with the following modern web development technologies:

- [React.js](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgresQL](https://www.postgresql.org/)
- [Bulma.io](https://bulma.io/)
- [`styled-components`](https://styled-components.com/)

The project uses [OpenWeather](https://openweathermap.org/)'s [Weather API](https://openweathermap.org/api) to fetch real time weather data.

The production site connects to a PostgreSQL instance located on Supabase.

## Getting Started

In order to run the project locally, you'll need the following:

- [`nvm`](https://github.com/nvm-sh/nvm)
- [`Node.js`](https://nodejs.org/) (16.x)
- [`npm`](https://www.npmjs.com/)
- [`yarn`](https://classic.yarnpkg.com/) (1.x)

You'll also need the following in order to fetch real time data:

- API key for OpenWeather
- database URL for PostgreSQL

[`nvm`](https://github.com/nvm-sh/nvm) lets us quickly install and use different versions of `node`/`npm` via the command line. Instructions for installing are located [here](https://github.com/nvm-sh/nvm#installing-and-updating).

Once `nvm` is installed, you can install the `16.x` verson of `Node.js`:

```bash
nvm install 16
```

And then use the new version:

```bash
nvm use 16
```

This project uses the classic version of [`yarn`](https://classic.yarnpkg.com/) for dependency management, which can be installed like so:

```bash
npm install --global yarn
```

Once `yarn` is installed, install the dependencies of the project:

```bash
yarn
```

Once installed, run the development server like so:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also make a production build:

```bash
yarn build
```

Or analyze the production build itself:

```bash
yarn analyze
```
