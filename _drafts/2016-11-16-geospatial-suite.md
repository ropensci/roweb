---
name: geospatial-suite
layout: post
title: The rOpenSci geospatial suite
date: 2016-11-22
authors:
  - name: Scott Chamberlain
  - name: Stefanie Butland
categories:
  - blog
tags:
- R
- geospatial
---


Geospatial data - data embedded in a spatial context - is used across disciplines, whether it be history, biology, business, tech, public health, etc. Along with community contributors, we're working on a suite of tools to make working with spatial data in R as easy as possible.

If you're not familiar with geospatial tools, it's helpful to see what people do with them in the real world.

__Example 1__

One of our geospatial packages, [geonames][geonames], is used for geocoding, the practice of either sorting out place names from geographic data, or vice versa. `geonames` interfaces with the open database of the same name: <http://www.geonames.org/>. A recent paper in PlosONE highlights a common use case. Harsch & HilleRisLambers[^1] asked how plant species distributions have shifted due to climate warming. They used the `GNsrtm3()` function in `geonames`, which uses [Shuttle Radar Topography Mission](http://www.geonames.org/export/web-services.html#srtm3) elevation data, to fill in missing or incorrect elevation values in their dataset.

__Example 2__

Another of our packages, [geojsonio][geojsonio], is used as a tool to ingest GeoJSON, or make GeoJSON from various inputs. `geojsonio` was used in Frankfurt's Open Data Hackathon in March 2016 in a project to present users with random Google Streetview Images of Frankfurt. Check out the repo at [safferli/opendataday2016](https://github.com/safferli/opendataday2016).


[We covered](https://ropensci.org/blog/blog/2016/03/17/ropensci-geospatial-stack) the state of our geospatial tools in March of this year, but a lot has changed since then so we thought it would be useful for us and readers to do an overview of these tools and future work.

There are [many geospatial data formats](https://en.wikipedia.org/wiki/GIS_file_formats), including [shapefiles](https://en.wikipedia.org/wiki/Shapefile), [GeoTIFF](https://en.wikipedia.org/wiki/GeoTIFF), [netCDF](https://en.wikipedia.org/wiki/NetCDF), [Well-known text/Well-known binary](https://en.wikipedia.org/wiki/Well-known_text), [GeoJSON](http://geojson.org/), and much more. Two formats in particular that we create tools for are WKT and GeoJSON. Readers may be more familiar with shape files than WKT or GeoJSON. There are already R tools for shape files, so our tools largely don't concern themselves with shape files and other geospatial data formats.

### GeoJSON

With the explosion of Javascript/Node and web first tools, and increasing dominance of JSON as a data format, [GeoJSON](http://geojson.org/) as a spatial data format has seen increasing use. GeoJSON is a lightweight format based on JSON, and has a very new standard specification: [RFC 7946][rfc7946]. Many of our geospatial tools center around GeoJSON. Our goal with GeoJSON focused tools is to create a pipeline in which users can process GeoJSON data without any headaches due to dependencies.

* GeoJSON
  * links: [specification](https://tools.ietf.org/html/rfc7946) - [Wikipedia entry](https://en.wikipedia.org/wiki/GeoJSON)
  * GeoJSON was inspired in part from Simple Features, but is not part of that specification. The most recent iteration is called [RFC 7946 GeoJSON](https://tools.ietf.org/html/rfc7946).
  * Features of note:
    * JSON character representation only (though see [geobuf](https://github.com/mapbox/geobuf) for binary GeoJSON - not part of RFC 7946)
    * All data is WGS84
    * Often found in web applications


### WKT

Well-known text is a plain text format, just like GeoJSON (although, WKB is a binary form of WKT). It is often used in SQL databases to store geospatial data. Many of the data sources our R packages work with, for example [rgbif][rgbif] that interacts with <http://www.gbif.org/>, use WKT to specify geospatial extent. Thus, `rgbif` shouldn't need to import an entire spatial stack that is hard for some to install only for dealing with a single spatial data format - and only some users will do geospatial queries. We've been working on tools to make dealing with WKT lighterweight.

* Well-known text (WKT)
  * links: [specification](https://d17oy1vhnax1f7.cloudfront.net/items/291d412o1c3E3s0R112A/06-103r4_Implementation_Specification_for_Geographic_Information_-_Simple_feature_access_-_Part_1_Common_Architecture_v1.2.1%20(1).pdf) - [Wikipedia entry](https://en.wikipedia.org/wiki/Well-known_text)
  * WKT is part of [Simple Features](https://en.wikipedia.org/wiki/Simple_Features) (see `sf` below)
  * Features of note:
    * Character and binary representations
    * Supports any coordinate reference system
    * Often used in databases to store geospatial information


There are geospatial tools in R already - e.g., check out the spatial task view, and check out our [maptools taskview](https://github.com/ropensci/maptools) for mapping tools and services in R. A noteable new tool in R geospatial is the package [sf](https://github.com/edzer/sfr) (simple features for R).

-----

## rOpenSci use cases

In part to motivate our geospatial tools, we'll outline use cases for software we make that use WKT and GeoJSON. Some of our use cases:

* Web services that some of our packages interact with accept a geospatial filter as a query component. This often means WKT. Having tools that are light weight is important here as we don't need a full geospatial stack when we only need to lint WKT or create it from a bounding box, for example.
* Likewise, some web services only accept GeoJSON. Same argument as above follows here.
* Vizualize WKT and GeoJSON: given the above, users should be able to vizualize the area that they are defining with their WKT or GeoJSON.
* WKT-GeoJSON conversion: sometimes users, and we, need to convert WKT to GeoJSON, or vice versa. Light weight tools to do that task are really useful.

-----

## Tools

rOpenSci has an growing suite of database tools (with noteable recent releases):

### GeoJSON/WKT Tools

* [geojson](https://github.com/ropensci/geojson) (geojson classes for R) (on CRAN)
* [geojsonio](https://github.com/ropensci/geojsonio) (I/O for GeoJSON) (on CRAN)
* [geojsonlint](https://github.com/ropenscilabs/geojsonlint) (Lint GeoJSON) (on CRAN)
* [lawn](https://github.com/ropensci/lawn) (Turf.js R client) (on CRAN)
* [geoaxe](https://github.com/ropenscilabs/geoaxe) (split up well known text into chunks) (on CRAN)
* [wellknown](https://github.com/ropenscilabs/wellknown) (Well-Known-Text <--> GeoJSON) (on CRAN)
* [geoops](https://github.com/ropensci/geoops) (Operations on GeoJSON, sorta like `rgeos`)

### Data/Data Services

* [geoparser](https://github.com/ropenscilabs/geoparser) (Geoparser.io client for place names) (on CRAN)
* [rgeospatialquality](https://github.com/ropenscilabs/rgeospatialquality) (spatial quality of biodiversity records) (on CRAN)
* [getlandsat](https://github.com/ropenscilabs/getlandsat) (Landsat images) (on CRAN)
* [omsplotr](https://github.com/ropenscilabs/omsplotr) (OpenStreeMap data and vizualization) (on CRAN)
* [rnaturalearth](https://github.com/ropenscilabs/rnaturalearth) (Natural Earth data)
* [geonames](https://github.com/ropensci/geonames) (Access Geonames.org API) (on CRAN)

-----------

## geojson

<a href="https://cran.rstudio.com/web/packages/geojson/"><span class="label label-warning">cran</span></a> <a href="https://github.com/ropensci/geojson"><span class="label label-info">github</span></a>

We're excited to announce a new package `geojson`, which is now on CRAN. Check out the vignettes ([geojson classes](https://cran.rstudio.com/web/packages/geojson/vignettes/geojson.html), [geojson operations](https://cran.rstudio.com/web/packages/geojson/vignettes/geojson-operations.html)) to get started.

You can install the package from CRAN:


```r
install.packages("geojson")
```


```r
library("geojson")
```

The `geojson` package has functions for creating each of the GeoJSON classes - from character strings of GeoJSON.

* `feature()` - Feature
* `featurecollection()` - FeatureCollection
* `geometrycollection()` - GeometryCollection
* `linestring()` - LineString
* `multilinestring()` - MultiLineString
* `multipoint()` - MultiPoint
* `multipolygon()` - MultiPolygon
* `point()` - Point
* `polygon()` - Polygon

Internally, we perform some basic checks that the string first is proper JSON, then if you want to lint the GeoJSON (see the `linting_opts()` function) we'll lint the GeoJSON as well using our `geojsonlint` package.


```r
(x <- point('{ "type": "Point", "coordinates": [100.0, 0.0] }'))
## <Point>
##   coordinates:  [100,0]
geo_type(x)
## [1] "Point"
geo_pretty(x)
## {
##     "type": "Point",
##     "coordinates": [
##         100.0,
##         0.0
##     ]
## }
##
f <- tempfile(fileext = ".geojson")
geo_write(y, f)
jsonlite::fromJSON(f, FALSE)
## $type
## [1] "Polygon"
##
## $coordinates
## $coordinates[[1]]
## $coordinates[[1]][[1]]
## $coordinates[[1]][[1]][[1]]
## [1] 100
##
## $coordinates[[1]][[1]][[2]]
## [1] 0
##
##
## $coordinates[[1]][[2]]
## $coordinates[[1]][[2]][[1]]
## [1] 101
##
## $coordinates[[1]][[2]][[2]]
## [1] 0
##
##
## $coordinates[[1]][[3]]
## $coordinates[[1]][[3]][[1]]
## [1] 101
##
## $coordinates[[1]][[3]][[2]]
## [1] 1
##
##
## $coordinates[[1]][[4]]
## $coordinates[[1]][[4]][[1]]
## [1] 100
##
## $coordinates[[1]][[4]][[2]]
## [1] 1
##
##
## $coordinates[[1]][[5]]
## $coordinates[[1]][[5]][[1]]
## [1] 100
##
## $coordinates[[1]][[5]][[2]]
## [1] 0
```



In addition, you can perform some basic operations, such as adding (`properties_add()`) or getting properties (`properties_get()`), adding (`crs_add()`) or getting CRS (`crs_get()`), adding (`bbox_add()`) or getting (`bbox_get()`) a bounding box. You can calculate a bounding box on your GeoJSON with `geo_bbox()`, prettify your GeoJSON with `geo_pretty()`, and write your GeoJSON to disk with `geo_write()`.

__properties__


```r
(y <- linestring('{ "type": "LineString", "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]}'))
## <LineString>
##   coordinates:  [[100,0],[101,1]]
(z <- y %>% feature() %>% properties_add(population = 1000))
## {
##     "type": "Feature",
##     "properties": {
##         "population": 1000
##     },
##     "geometry": {
##         "type": "LineString",
##         "coordinates": [
##             [
##                 100,
##                 0
##             ],
##             [
##                 101,
##                 1
##             ]
##         ]
##     }
## }
properties_get(z, property = 'population')
## 1000
```

__bbox__


```r
x <- '{ "type": "Polygon",
"coordinates": [
  [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
  ]
}'
(y <- polygon(x))
## <Polygon>
##   no. lines:  1
##   no. holes:  0
##   no. nodes / line:  5
##   coordinates:  [[[100,0],[101,0],[101,1],[100,1],[100,0]]]
```

Add bbox - without an input, we figure out the 2D bbox for you


```r
y %>% feature() %>% bbox_add()
## {
##     "type": "Feature",
##     "properties": {
##
##     },
##     "geometry": {
##         "type": "Polygon",
##         "coordinates": [
##             [
##                 [
##                     100,
##                     0
##                 ],
##                 [
##                     101,
##                     0
##                 ],
##                 [
##                     101,
##                     1
##                 ],
##                 [
##                     100,
##                     1
##                 ],
##                 [
##                     100,
##                     0
##                 ]
##             ]
##         ]
##     },
##     "bbox": [
##         100,
##         0,
##         101,
##         1
##     ]
## }
```

Last, the Mapbox folks have a compact binary encoding for geographic data ([Geobuf](https://github.com/mapbox/geobuf)) that provides lossless compression of GeoJSON data into protocol buffers. Our own [Jeroen Ooms](https://ropensci.org/about/#staff) added Geobuf serialization to his [protolite][protolite] package, which we import in `geojson` to allow you to read Geobuf with `from_geobuf()` and write Geobuf with `to_geobuf()`.


```r
file <- system.file("examples/test.pb", package = "geojson")
(json <- from_geobuf(file))
```

```
## {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[102,0.5]},"id":999,"properties":{"prop0":"value0","double":0.0123,"negative_int":-100,"positive_int":100,"negative_double":-1.2345e+16,"positive_double":1.2345e+16,"null":null,"array":[1,2,3.1],"object":{"foo":[5,6,7]}},"blabla":{"foo":[1,1,1]}},{"type":"Feature","geometry":{"type":"LineString","coordinates":[[102,0],[103,-1.1],[104,-3],[105,1]]},"id":123,"properties":{"custom1":"test","prop0":"value0","prop1":0}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[99,10],[101,0],[100,1],[99,10]]]},"id":"test-id","properties":{"prop0":"value0","prop1":{"this":"that"}},"custom1":"jeroen"},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.2,0.8],[100.2,0.2]]]]}},{"type":"Feature","geometry":{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[100,0]},{"type":"LineString","coordinates":[[101,0],[102,1]]},{"type":"MultiPoint","coordinates":[[100,0],[101,1]]},{"type":"MultiLineString","coordinates":[[[100,0],[101,1]],[[102,2],[103,3]]]},{"type":"MultiPolygon","coordinates":[[[[102,2],[103,2],[103,3],[102,3],[102,2]]],[[[100,0],[101,0],[101,1],[100,1],[100,0]],[[100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2]]]]}]}}]}
```

```r
from_geobuf(file, pretty = TRUE)
```

```
## {
##   "type": "FeatureCollection",
##   "features": [
##     {
##       "type": "Feature",
##       "geometry": {
##         "type": "Point",
## ...
```

```r
to_geobuf(json)
```

```
##   [1] 0a 05 70 72 6f 70 30 0a 06 64 6f 75 62 6c 65 0a 0c 6e 65 67 61 74 69
##  [24] 76 65 5f 69 6e 74 0a 0c 70 6f 73 69 74 69 76 65 5f 69 6e 74 0a 0f 6e
##  [47] 65 67 61 74 69 76 65 5f 64 6f 75 62 6c 65 0a 0f 70 6f 73 69 74 69 76
##  [70] 65 5f 64 6f 75 62 6c 65 0a 04 6e 75 6c 6c 0a 05 61 72 72 61 79 0a 06
##  ...
```

## geoops

<span class="label label-default">cran</span> <a href="https://github.com/ropensci/geoops"><span class="label label-info">github</span></a>

[geoops](https://github.com/ropenscilabs/geoops) - `geoops` is not quite ready to use yet, but
the goal with `geoops` is to provide spatial operations on GeoJSON that works with `geojson`
package. Example operations are:

* Find the set of points that are also in a polygon
* Centroid of a polygon
* Distance between two points
* Buffer of a given radius around a point
* Combine one or more polygons together
* and more

Another feature of `geoops` we're excited about is slicing up GeoJSON easily by using our
package [jqr][jqr]. It's similar in concept to using `dplyr` for drilling down into
a data.frame, but instead we can do that with GeoJSON.

> note: this package used to be called `siftgeojson`

## geojsonio

<a href="https://cran.rstudio.com/web/packages/geojsonio/"><span class="label label-warning">cran</span></a> <a href="https://github.com/ropensci/geojsonio"><span class="label label-info">github</span></a>

[geojsonio](https://github.com/ropensci/geojsonio) - `geojsonio` is a client for making it
easy to convert lots of different things to GeoJSON, and for reading/writing GeoJSON.

We had a new version (`v0.2`) come out in July this year, with major performance improvements to
`geojson_json()` - and we've deprecated GeoJSON linting functionality and now point people
towards our package `geojsonlint` for all GeoJSON linting tasks.

### Example

A quick example of the power of `geojsonio`


```r
install.packages("geojsonio")
```


```r
library("geojsonio")
```

Convert a numeric vector to a GeoJSON `Point`:


```r
geojson_json(c(32.45, -99.74))
```

```
## {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[32.45,-99.74]},"properties":{}}]}
```

Read GeoJSON from a file with one simple command and plot it:


```r
file <- system.file("examples", "california.geojson", package = "geojsonio")
out <- geojson_read(file, what = "sp")
library('sp')
plot(out)
```

![plot of chunk unnamed-chunk-12](figure/unnamed-chunk-12-1.png)


## geojsonlint

<a href="https://cran.rstudio.com/web/packages/geojsonlint/"><span class="label label-warning">cran</span></a> <a href="https://github.com/ropensci/geojsonlint"><span class="label label-info">github</span></a>

[geojsonlint](https://github.com/ropensci/geojsonlint) - `geojsonlint` is a client for linting
GeoJSON. It provides three different ways to lint GeoJSON, using: the API at <geojsonlint.com>,
the JS library `geojsonhint`, or the JS library `is-my-json-valid`. The package provides a consistent
interface to the three different linters, always returning a boolean, and toggles provided for
verbose output and whether to stop when invalid GeoJSON is found.

We had a new version (`v0.2`) come out this month, that uses the a newer version of the JS
library `geojsonhint`, affecting the `geojson_hint()` function. Note that the dev version of
`geojsonlint` has an even newer version of the JS `geojsonhint` library, so you may want to
upgrade if you're using that linter: `devtools::install_github("ropensci/geojsonlint")`.

### Example

A quick example of the power of `geojsonlint`


```r
install.packages("geojsonlint")
```


```r
library("geojsonlint")
```

Good GeoJSON


```r
geojson_hint(x = '{"type": "Point", "coordinates": [-100, 80]}')
```

```
## [1] TRUE
```

Bad GeoJSON


```r
geojson_hint('{ "type": "FeatureCollection" }')
#> [1] FALSE
geojson_hint('{ "type": "FeatureCollection" }', verbose = TRUE)
#> [1] FALSE
#> attr(,"errors")
#>   line                    message
#> 1    1 "features" member required
geojson_hint('{ "type": "FeatureCollection" }', error = TRUE)
#> Error: Line 1
#>        - "features" member required
```



## lawn

<a href="https://cran.rstudio.com/web/packages/lawn/"><span class="label label-warning">cran</span></a> <a href="https://github.com/ropensci/lawn"><span class="label label-info">github</span></a>

[lawn](https://github.com/ropensci/lawn) - `lawn` is an R client wrapping [Turf.js](http://turfjs.org/)
from Mapbox. Turf is a JS library for doing advanced geospatial analysis. Using the great [V8][v8]
R client from [Jeroen Ooms](https://ropensci.org/about/#staff) we can wrap Turf.js
in R.

We had a new version (`v0.3`) come out late last month that is a big change from the previous
version as we now wrap the newest version of Turf `v3.5.2` that dropped a number of methods,
and introduced new ones.

### Example

A quick example of the power of `lawn`


```r
install.packages("lawn")
```


```r
library("lawn")
```

Calcuate distance (default: km) between two points


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
lawn_distance(from, to)
```

```
## [1] 97.15958
```

Buffer a point (with distance of 5 km)


```r
pt <- '{
 "type": "Feature",
 "properties": {},
 "geometry": {
    "type": "Point",
    "coordinates": [-90.548630, 14.616599]
  }
}'
lawn_buffer(pt, dist = 5)
```

-----------

## Future work

<!-- will highlight upcoming new things and improvements to existing things here -->
Despite all the above work, we still have a lot to do. Here's a run down of some of
the items on our list:

* xxx
* xxx
* xxx
* xxx
* xxx
* xxx

-----------

## Takeaway and Feedback

Our goal with our geospatial tools is to make your work -- whether it be serious reproducible science, analysis of your company's data, or just fooling around with some data --  as easy as possible with as few installation headaches as possible.

How are you using our geospatial tools? We'd love to hear about how you're using our packages, whether it be blog posts, scholarly papers, shiny apps, business use cases, etc.

Let us know if you have any feedback on these packages, and/or if you think there's anything else we should be thinking about making in this space.

<!-- links -->

[rfc7946]: https://tools.ietf.org/html/rfc7946
[rgbif]: https://github.com/ropensci/rgbif
[geonames]: https://github.com/ropensci/geonames
[geojsonio]: https://github.com/ropensci/geojsonio
[jqr]: https://github.com/ropensci/jqr
[v8]: https://github.com/jeroenooms/v8

<!-- references -->

[^1]: Harsch, M. A., & HilleRisLambers, J. (2016). Climate Warming and Seasonal Precipitation Change Interact to Limit Species Distribution Shifts across Western North America. PLoS ONE, 11(7), e0159184. doi:10.1371/journal.pone.0159184
