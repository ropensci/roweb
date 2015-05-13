---
title: lawn tutorial
layout: tutorial
packge_version: 0.1.0
---



`lawn` is an R wrapper for the Javascript library [turf.js](http://turfjs.org/) for advanced geospatial analysis. In addition, we have a few functions to interface with the [geojson-random](https://github.com/mapbox/geojson-random) Javascript library.

`lawn` includes traditional spatial operations, helper functions for creating GeoJSON data, and data classification and statistics tools.

There is an additional helper function (see `view()`) in this package to help visualize data with interactive maps via the `leaflet` package ([https://github.com/rstudio/leaflet](https://github.com/rstudio/leaflet)). Note that `leaflet` is not required to install `lawn` - it's in Suggests, not Imports or Depends.

<section id="installation">

## Installation

If installing `leaflet`


```r
devtools::install_github("rstudio/leaflet")
```

Stable `lawn` version from CRAN


```r
install.packages("lawn")
```

Or, the development version from Github


```r
devtools::install_github("ropensci/lawn")
```


```r
library("lawn")
```

<section id="usage">

## Usage

### Make some geojson data

Point


```r
lawn_point(c(-74.5, 40))
#> $type
#> [1] "Feature"
#> 
#> $geometry
#> $geometry$type
#> [1] "Point"
#> 
#> $geometry$coordinates
#> [1] -74.5  40.0
#> 
#> 
#> $properties
#> named list()
#> 
#> attr(,"class")
#> [1] "point"
```

Polygon


```r
rings <- list(list(
  c(-2.275543, 53.464547),
  c(-2.275543, 53.489271),
  c(-2.215118, 53.489271),
  c(-2.215118, 53.464547),
  c(-2.275543, 53.464547)
))
lawn_polygon(rings)
#> $type
#> [1] "Feature"
#> 
#> $geometry
#> $geometry$type
#> [1] "Polygon"
#> 
#> $geometry$coordinates
#> , , 1
#> 
#>           [,1]      [,2]      [,3]      [,4]      [,5]
#> [1,] -2.275543 -2.275543 -2.215118 -2.215118 -2.275543
#> 
#> , , 2
#> 
#>          [,1]     [,2]     [,3]     [,4]     [,5]
#> [1,] 53.46455 53.48927 53.48927 53.46455 53.46455
#> 
#> 
#> 
#> $properties
#> named list()
#> 
#> attr(,"class")
#> [1] "polygon"
```

### count

Count number of points within polygons


```r
lawn_count(polygons = lawn_data$polygons_count, points = lawn_data$points_count)
#> $type
#> [1] "FeatureCollection"
#> 
#> $features
#>      type pt_count geometry.type
#> 1 Feature        2       Polygon
#> 2 Feature        0       Polygon
#>                                                                                           geometry.coordinates
#> 1 -112.07239, -112.07239, -112.02810, -112.02810, -112.07239, 46.58659, 46.61761, 46.61761, 46.58659, 46.58659
#> 2 -112.02398, -112.02398, -111.96613, -111.96613, -112.02398, 46.57043, 46.61502, 46.61502, 46.57043, 46.57043
#> 
#> attr(,"class")
#> [1] "featurecollection"
```

### average

Average value of a field for a set of points within a set of polygons


```r
lawn_average(polygons = lawn_data$polygons_average,
             points = lawn_data$points_average,
             field = 'population')
#> $type
#> [1] "FeatureCollection"
#> 
#> $features
#>      type average geometry.type
#> 1 Feature     300       Polygon
#> 2 Feature     250       Polygon
#>                                                                                 geometry.coordinates
#> 1 10.66635, 10.66635, 10.76248, 10.76248, 10.66635, 59.89066, 59.93678, 59.93678, 59.89066, 59.89066
#> 2 10.76454, 10.76454, 10.86617, 10.86617, 10.76454, 59.88928, 59.93713, 59.93713, 59.88928, 59.88928
#> 
#> attr(,"class")
#> [1] "featurecollection"
```

### distance

Define two points


```r
from <- '{
 "type": "Feature",
 "properties": {},
 "geometry": {
   "type": "Point",
   "coordinates": [-75.343, 39.984]
 }
}'
to <- '{
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Point",
    "coordinates": [-75.534, 39.123]
  }
}'
```

Calculate distance, default units is kilometers (default output: `km`)


```r
lawn_distance(from, to)
#> [1] 97.15958
```

### random set of points


```r
lawn_random(n = 2)
#> $type
#> [1] "FeatureCollection"
#> 
#> $features
#>      type geometry.type geometry.coordinates
#> 1 Feature         Point   21.97757, 13.12265
#> 2 Feature         Point -110.93869, 47.96132
#> 
#> attr(,"class")
#> [1] "featurecollection"
```


```r
lawn_random(n = 5)
#> $type
#> [1] "FeatureCollection"
#> 
#> $features
#>      type geometry.type    geometry.coordinates
#> 1 Feature         Point -80.2474412, -0.2338901
#> 2 Feature         Point    -104.75440, 61.34878
#> 3 Feature         Point     42.43227, -33.78958
#> 4 Feature         Point   -127.35324, -67.36504
#> 5 Feature         Point      67.95762, 30.22066
#> 
#> attr(,"class")
#> [1] "featurecollection"
```

### random features with geojson-random

Positions


```r
gr_position()
#> [1] -147.818105    7.749464
```

Points


```r
gr_point(2)
#> $type
#> [1] "FeatureCollection"
#> 
#> $features
#>      type geometry.type geometry.coordinates
#> 1 Feature         Point  -18.84722, 50.56293
#> 2 Feature         Point   -12.84356, 5.76044
#> 
#> attr(,"class")
#> [1] "featurecollection"
```

Polygons


```r
gr_polygon(n = 1, vertices = 5, max_radial_length = 5)
#> $type
#> [1] "FeatureCollection"
#> 
#> $features
#>      type geometry.type
#> 1 Feature       Polygon
#>                                                                                                                       geometry.coordinates
#> 1 -140.46534, -138.80870, -139.98371, -143.68460, -142.29049, -140.46534, -79.26876, -82.57643, -82.05062, -80.50215, -79.34784, -79.26876
#> 
#> attr(,"class")
#> [1] "featurecollection"
```

### sample from a FeatureCollection


```r
dat <- lawn_data$points_average
lawn_sample(dat, 1)
#> $type
#> [1] "FeatureCollection"
#> 
#> $features
#>      type population geometry.type geometry.coordinates
#> 1 Feature        200         Point   10.80643, 59.90891
#> 
#> attr(,"class")
#> [1] "featurecollection"
```


```r
lawn_sample(dat, 2)
#> $type
#> [1] "FeatureCollection"
#> 
#> $features
#>      type population geometry.type geometry.coordinates
#> 1 Feature        100         Point   10.74600, 59.90857
#> 2 Feature        200         Point   10.80643, 59.90891
#> 
#> attr(,"class")
#> [1] "featurecollection"
```


```r
lawn_sample(dat, 3)
#> $type
#> [1] "FeatureCollection"
#> 
#> $features
#>      type population geometry.type geometry.coordinates
#> 1 Feature        300         Point   10.79544, 59.93162
#> 2 Feature        600         Point   10.71579, 59.90478
#> 3 Feature        200         Point   10.72403, 59.92681
#> 
#> attr(,"class")
#> [1] "featurecollection"
```

### extent


```r
lawn_extent(lawn_data$points_average)
#> [1] 10.71579 59.90478 10.80643 59.93162
```

### within


```r
lawn_within(lawn_data$points_within, lawn_data$polygons_within)
#> $type
#> [1] "FeatureCollection"
#> 
#> $features
#>      type geometry.type geometry.coordinates
#> 1 Feature         Point   -46.6318, -23.5523
#> 2 Feature         Point     -46.643, -23.557
#> 
#> attr(,"class")
#> [1] "featurecollection"
```

### buffer


```r
dat <- '{
 "type": "Feature",
 "properties": {},
 "geometry": {
     "type": "Polygon",
     "coordinates": [[
       [-112.072391,46.586591],
       [-112.072391,46.61761],
       [-112.028102,46.61761],
       [-112.028102,46.586591],
       [-112.072391,46.586591]
     ]]
   }
}'
lawn_buffer(dat, 1, "miles")
#> $type
#> [1] "FeatureCollection"
#> 
#> $features
#>      type geometry.type
#> 1 Feature       Polygon
#>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           geometry.coordinates
#> 1 -112.07239, -112.07522, -112.07793, -112.08044, -112.08263, -112.08443, -112.08577, -112.08660, -112.08687, -112.08687, -112.08660, -112.08577, -112.08443, -112.08263, -112.08044, -112.07793, -112.07522, -112.07239, -112.02810, -112.02528, -112.02256, -112.02006, -112.01786, -112.01606, -112.01472, -112.01390, -112.01362, -112.01362, -112.01390, -112.01472, -112.01606, -112.01786, -112.02006, -112.02256, -112.02528, -112.02810, -112.07239, 46.57211, 46.57239, 46.57321, 46.57455, 46.57635, 46.57854, 46.58105, 46.58377, 46.58659, 46.61761, 46.62044, 46.62315, 46.62566, 46.62785, 46.62965, 46.63099, 46.63181, 46.63209, 46.63209, 46.63181, 46.63099, 46.62965, 46.62785, 46.62566, 46.62315, 46.62044, 46.61761, 46.58659, 46.58377, 46.58105, 46.57854, 46.57635, 46.57455, 46.57321, 46.57239, 46.57211, 46.57211
#> 
#> attr(,"class")
#> [1] "featurecollection"
```

### lint input geojson

For most functions, you can lint your input geojson data to make sure it is proper geojson. We use
the javascript library geojsonhint. See the `lint` parameter where available.

Good GeoJSON


```r
dat <- '{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "population": 200
      },
      "geometry": {
        "type": "Point",
        "coordinates": [10.724029, 59.926807]
      }
    },
      {
      "type": "Feature",
      "properties": {
        "population": 600
      },
      "geometry": {
        "type": "Point",
        "coordinates": [10.715789, 59.904778]
      }
    }
  ]
}'
lawn_extent(dat)
#> [1] 10.71579 59.90478 10.72403 59.92681
```

Bad GeoJSON


```r
dat <- '{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "population": 200
      },
      "geometry": {
        "type": "Point"
      }
    },
      {
      "type": "Feature",
      "properties": {
        "population": 600
      },
      "geometry": {
        "type": "Point",
        "coordinates": [10.715789, 59.904778]
      }
    }
  ]
}'
lawn_extent(dat, lint = TRUE)

#> Error: Line 1 - "coordinates" property required
```

### view

`lawn` includes a tiny helper function for visualizing geojson.


```r
view(lawn_data$points_average)
```

![map1](../assets/tutorial-images/lawn/map1.png)

Here, we sample at random two points from the same dataset just viewed.


```r
lawn_sample(lawn_data$points_average, 2) %>% view()
```

![map2](../assets/tutorial-images/lawn/map2.png)


<section id="citing">

## Citing

To cite `lawn` in publications use:

<br>

> Scott Chamberlain and Jeff Hollister (2015). lawn: R Client for Turf.js for Geospatial
  Analysis. R package version 0.1.0. https://github.com/ropensci/lawn

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for bold](https://github.com/ropensci/lawn/issues?state=open)

[Back to top](#top)
