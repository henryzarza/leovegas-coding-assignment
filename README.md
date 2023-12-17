# Movieland 

React + Redux + RTK + Bootstrap application that fetches movies from [https://www.themoviedb.org/](https://www.themoviedb.org/)

Created with [Create React App](https://github.com/facebook/create-react-app).

### [Visit the app running in prod 🚀](https://leovegas-coding-assignment.vercel.app/)

[<img width="1415" alt="Screenshot 2023-12-17 at 11 56 14" src="https://github.com/henryzarza/leovegas-coding-assignment/assets/28515670/c13392e6-c13b-4e76-bc38-bdbf3ff79306">](https://leovegas-coding-assignment.vercel.app/)

## Available Scripts

In the project directory, you can run:

### Install all dependencies

```sh
npm install
```

### Runs the app in the development mode

```sh
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Unit Tests

```sh
npm run test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

<img width="744" alt="Screenshot 2023-12-16 at 23 02 22" src="https://github.com/henryzarza/leovegas-coding-assignment/assets/28515670/d589a4ad-985b-48e6-baa4-7c2b76558441">

### Run linter

```sh
npm run lint:fix
```

### Fix linter errors

```sh
npm run lint:fix
```

<hr />

## Important comments and known issues

- [`development`](https://github.com/henryzarza/leovegas-coding-assignment/tree/development) branch has all the latest changes
- Responsive in the `Header` needs to be fixed
- I added a scroll to the top of the page when the search input is clear but I'm not sure if is a good UX or not. [Code here](https://github.com/henryzarza/leovegas-coding-assignment/pull/7/files#diff-6efde9512356a2f5c3cc4c161365127d269413d13ae8fb43c3395c334981f447R14)
- [There is a known issue](https://github.com/henryzarza/leovegas-coding-assignment/pull/7/files#diff-6efde9512356a2f5c3cc4c161365127d269413d13ae8fb43c3395c334981f447R40) when the user goes to a page different than the home page, the input value is not being cleared, it could be fixed following my recommendation [here](https://github.com/henryzarza/leovegas-coding-assignment/pull/1/files#r1426674560), a good approach could be [this one](https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen)


#### Made with ❤️ by Henry Zarza
