# jest-memory-leak-demo

A demo of a set of tests which leak memory in Jest. To see this repo in action, clone the repo and run `yarn install` to install all dependencies. Then, run `yarn test-with-memory` to see tests run while reporting memory usage. To run the tests with the chrome debugger attached, start the tests using `yarn test-with-memory-and-inspector`.

The `enWords.json` file comes from https://github.com/dwyl/english-words. 

The specific leak in this repo, from `agent-base`, is fixed as of agent-base v4.3.0. Still, it's a useful to illustrate how this sort of memory leak works in Jest, and to practice debugging memory leaks in general.