# streak

[![Build Status](https://travis-ci.org/tphummel/streak.svg?branch=master)](https://travis-ci.org/tphummel/streak)

gather streaks from an ordered, contiguous json array on stdin. results are printed in json to stdout.

*Composable*: Reads json from stdin and writes json to stdout. Use with other popular cli data tools like ([jq](https://stedolan.github.io/jq/) and [csvkit](https://csvkit.readthedocs.io/en/1.0.2/)) to build [powerful pipelines](https://gist.github.com/tphummel/0045124009192f59dcd4c90df7f9eec6).

*Portable*: Easy, flexible installation options. Cross-platform, standalone [executables](https://github.com/tphummel/streak/releases/latest) (windows, linux, osx). Agnostic to database technology or application language.

*Opinionated*: Transformation, formatting, munging, grouping, sorting, looping, presentation are out of scope.

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
- streak: two or more consecutive input rows that satisfy the criteria
- active streak: a streak which is still active once all input rows have been processed

### limits
- input data must be contiguous (not sparse, sufficiently filtered)
- input rows must be ordered oldest to newest
- output streaks list is ordered oldest to newest
- criteria can be a minimum value (>=), a maximum value (<=), or both, on a single column
- this is intended for small datasets. stdin is buffered in memory before processing.

### related work
- [Find Streaks in Daily Data with Sparse/Missing Days](https://gist.github.com/tphummel/0045124009192f59dcd4c90df7f9eec6)
- [MySQL Stored Procedure for Streaks](https://github.com/tphummel/tetris-report/blob/master/PyTom/Data/procs/player_perf_streaks.sql)
