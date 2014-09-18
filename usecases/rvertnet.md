---
title: Plot species occurrence data
pkg: rvertnet
layout: usecases
---


### Load libraries


```r
library("rvertnet")
library("ggplot2")
```


### Define a species list


```r
splist <- c("Accipiter erythronemius", "Junco hyemalis", "Aix sponsa", "Haliaeetus leucocephalus",
    "Corvus corone", "Threskiornis molucca", "Merops malimbicus")
```


### Search for occurrences in VertNet


```r
out <- lapply(splist, function(x) vertoccurrence(t = x, grp = "bird", num = 500))
```


### Plot data


```r
vertmap(out) + theme_grey()
```

![plot of chunk vertmap1](../../assets/usecases-images/vertmap1.png)
