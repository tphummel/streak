# streak

gather streaks from an ordered json array on stdin. results are printed in json to stdout.

[![Build Status](https://travis-ci.org/tphummel/streak.svg?branch=master)](https://travis-ci.org/tphummel/streak)

### setup

with npm:
```
npm install --global @tphummel/streak
```

or with homebrew:

```
brew install tphummel/util/streak
```

or download a standalone [executable](https://github.com/tphummel/streak/releases/latest) for your system. Put the file (or link) on your $PATH.

### usage

```
streak --help
```

### definitions
- streak: two or more consecutive rows that satisfy the criteria
- active streak: a streak which is still active as of the final provided row

### scope/limits
- the rows from stdin must be filled if it contains sparse data
- the rows from stdin must be ordered from oldest to newest
- the data from stdin must be filtered to include only relevant rows
- stdout streaks list is not ordered
