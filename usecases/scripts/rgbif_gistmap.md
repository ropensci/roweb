---
title: Easily make an interactive map on the web from R
pkg: rgbif
layout: usecases
---

R is great, but not so great for interactive stuff. Github recently announced support for interactive maps based on geojson format data. geojson is basically just JSON data with additional metadata for mapping purposes. We have discussed this before on our blog when we talked about [making geojson based maps](http://ropensci.org/blog/2013/07/04/rbison-geoson/) and about [styling geojson maps](http://ropensci.org/blog/2013/07/17/style-geojson/). 

Here is a brief demo of a simple, but awesome, use case in which you have a set of species and you want an interactive map. This is an easy way to get there using our package rgbif which gets GBIF occurrence data from R.

### Install development version of rgbif from Github, branch *newapi*


```r
install.packages("rgbif")
```


### Load packages


```r
library(rgbif)
library(plyr)
```


### Define a species list, and search for GBIF keys using `gbif_lookup`


```r
splist <- c("Accipiter erythronemius", "Junco hyemalis", "Aix sponsa")
keys <- sapply(splist, function(x) name_backbone(name = x, kingdom = "plants")$speciesKey, 
    USE.NAMES = FALSE)
```


### Search for occurrence data for each species using `occ_search`

And fix names so that there is only one unique name string per taxon. 


```r
out <- occ_search(keys, georeferenced = TRUE, limit = 100, return = "data")
out <- lapply(out, function(x) {
    lens <- sapply(x$name, function(y) length(strsplit(as.character(y), " ")[[1]]))
    shortest <- x$name[lens == 2][[1]]
    x$name <- shortest
    x
})
dat <- ldply(out)
```


### Make a geojson file

Add styling to your data.frame for the map using `stylegeojson`, making points vary in size and color by species. We also need to write the file to the machine. Then, we use the function `togeojson`


```r
datgeojson <- stylegeojson(input = dat, var = "name", color = c("#976AAE", "#6B944D", 
    "#BD5945"), size = c("small", "medium", "large"))

# We can see that there is no styling info associated with the occurrences
head(datgeojson)
```

```
      .id                    name       key longitude latitude
1 2480598 Accipiter erythronemius 686297260    -60.73    5.267
2 2480598 Accipiter erythronemius 699417490    -60.73    5.267
3 2480598 Accipiter erythronemius 352220558    -59.02  -31.133
4 2480598 Accipiter erythronemius   6619988    -48.67  -27.500
5 2480598 Accipiter erythronemius 442321942    -52.03  -26.817
6 2480598 Accipiter erythronemius 442321943    -52.03  -26.817
  marker-color marker-size
1      #976AAE       small
2      #976AAE       small
3      #976AAE       small
4      #976AAE       small
5      #976AAE       small
6      #976AAE       small
```


Now write the data to disk, then convert to geojson.


```r
write.csv(datgeojson, "~/my.csv")
togeojson(input = "~/my.csv", method = "web", outfilename = "my")
```

```
## Success! File is at ~/my.geojson
```


### Make a Github gist from R

Simply use the `gist` function to send the geojson file to Github gists, and you've got an ineractive map on the interwebs.


```r
gist("~/my.geojson", description = "Occurrences of three bird species mapped")
```


Done, that was easy, no?
