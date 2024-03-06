See [here](https://www.boost.org/doc/libs/1_84_0/more/getting_started/unix-variants.html) for getting started with Boost.

Run

```
c++ -I 'boost/boost_1_82_0' common.cpp -o common
```

then

```
./common
```

## debugging
- Does the algorithm find *all* common spanning trees? current committed example finds nothing.
- Extra spanning tree (the first one) for the given example? 