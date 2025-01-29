# Pic Me Pls Frontend

## Prerequisites

- [Node.js](https://nodejs.org/en/): **v20 or above** is required.
- [pnpm](https://pnpm.io/): **v9 or above** is required.

## Getting Started

1. Clone repository

    ```bash
    git clone https://github.com/CP-RektMart/pic-me-pls-frontend.git
    ```

2. If you not have `pnpm` installed, you can enable it by running the following command:

    ```bash
    corepack enable
    ```

3. Install dependencies

    ```bash
    pnpm install
    ```

4. Start the development server

    ```bash
    pnpm dev
    ```

## Some useful scripts

| Scripts       | Description                                |
| ------------- | ------------------------------------------ |
| `pnpm dev`    | To start your local development!           |
| `pnpm build`  | To building your project up!               |
| `pnpm format` | To use `prettier` for formatting your code |
| `pnpm lint`   | To check lint of your codes!               |

## Commit message formats
* API relevant changes
    * `feat` Commits, that adds or remove a new feature
    * `fix` Commits, that fixes a bug
* `refactor` Commits, that rewrite/restructure your code, however does not change any API behaviour
    * `perf` Commits are special `refactor` commits, that improve performance
* `style` Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)
* `test` Commits, that add missing tests or correcting existing tests
* `docs` Commits, that affect documentation only
* `build` Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...
* `ops` Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...
* `chore` Miscellaneous commits e.g. modifying `.gitignore`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js) - your
feedback and contributions are welcome!
