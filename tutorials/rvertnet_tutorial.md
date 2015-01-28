---
title: rvertnet tutorial
layout: tutorial
packge_version: 0.2.2
---



`rvertnet` is a client for interacting with [VertNet.org](http://vertnet.org/). VertNet is a online database of vertebrate specimens/observations. They have a really nice web interface at [http://portal.vertnet.org/search](http://portal.vertnet.org/search), but of course to do reproducible research you may want to use this package. 

This package retrieves data, makes maps, and summarizes data from VertNet, with functions for searching by many parameters, including taxonomic names, places, dates, and more. In addition, there is an interface for conducting spatially delimited searches, and another for requesting large datasets via email.

<section id="installation">

## Installation

You can install the stable version from CRAN:


```r
install.packages("rvertnet")
```

Or the development version from GitHub using the `devtools` package:


```r
install.packages("devtools")
devtools::install_github("ropensci/rvertnet")
```

<section id="usage">

## Usage


```r
library('rvertnet')
```

### Search by term

Search for _Aves_ in the state of _California_, limit to 10 records


```r
res <- searchbyterm(class = "Aves", state = "California", limit = 10, verbose = FALSE)
head(res[,1:5])
```

```
#>       type                   institutionid institutioncode collectioncode
#> 1 specimen http://grbio.org/cool/i64g-wjcr            CUMV Bird specimens
#> 2 specimen http://grbio.org/cool/i64g-wjcr            CUMV Bird specimens
#> 3 specimen http://grbio.org/cool/i64g-wjcr            CUMV Bird specimens
#> 4 specimen http://grbio.org/cool/i64g-wjcr            CUMV Bird specimens
#> 5 specimen http://grbio.org/cool/i64g-wjcr            CUMV Bird specimens
#> 6 specimen http://grbio.org/cool/i64g-wjcr            CUMV Bird specimens
#>       basisofrecord
#> 1 PreservedSpecimen
#> 2 PreservedSpecimen
#> 3 PreservedSpecimen
#> 4 PreservedSpecimen
#> 5 PreservedSpecimen
#> 6 PreservedSpecimen
```

Search for _Mustela nigripes_ in the states of _Wyoming_ or _South Dakota_, limit to 20 records


```r
res <- searchbyterm(specificepithet = "nigripes", genus = "Mustela", state = "(wyoming OR south dakota)", limit = 20, verbose=FALSE)
head(res[,1:4])
```

```
#>       type                   institutionid institutioncode
#> 1 specimen http://grbio.org/cool/iakn-125z              KU
#> 2 specimen   urn:lsid:biocol.org:col:34495             MSB
#> 3 specimen   urn:lsid:biocol.org:col:34925            AMNH
#> 4 specimen   urn:lsid:biocol.org:col:35013            DMNS
#> 5 specimen   urn:lsid:biocol.org:col:35013            DMNS
#> 6 specimen   urn:lsid:biocol.org:col:35013            DMNS
#>     collectioncode
#> 1              KUM
#> 2 Mammal specimens
#> 3          Mammals
#> 4 Mammal specimens
#> 5 Mammal specimens
#> 6 Mammal specimens
```

Search for class _Aves_, in the state of _Nevada_, with a coordinate uncertainty range (in meters) of less than 25 meters


```r
res <- searchbyterm(class = "Aves", stateprovince = "Nevada", error = "<25", verbose=FALSE)
head(res[,1:5])
```

```
#>          type                 institutionid                  collectionid
#> 1 observation urn:lsid:biocol.org:col:34777                          <NA>
#> 2    specimen urn:lsid:biocol.org:col:34777 urn:lsid:biocol.org:col:34952
#>   institutioncode    collectioncode
#> 1             MVZ Bird observations
#> 2             MVZ    Bird specimens
```

### Email dump of data

Specifies a termwise search (like `searchbyterm()`), but requests that all available records be made available for download as a tab-delimited text file.


```r
bigsearch(genus = "ochotona", rfile = "mydata", email = "you@gmail.com")
#> Processing request...
#>
#> Download of records file 'mydata' requested for 'you@gmail.com'
#>
#> Query/URL: "http://api.vertnet-portal.appspot.com/api/download?q=%7B%22q%22:%22genus:ochotona%22,%22n%22:%22mydata%22,%22e%22:%22you@gmail.com%22%7D"
#>
#> Thank you! Download instructions will be sent by email.
```

### Spatial search

Spatial search service allows only to search on a point defined by latitude and longitude pair, with a radius (meters) from that point. All three parameters are required.


```r
res <- spatialsearch(lat = 33.529, lon = -105.694, radius = 2000, limit = 10, verbose = FALSE)
head(res[,1:5])
```

```
#>       type                 institutionid                  collectionid
#> 1 specimen urn:lsid:biocol.org:col:34495 urn:lsid:biocol.org:col:34950
#> 2 specimen urn:lsid:biocol.org:col:34495                          <NA>
#> 3 specimen urn:lsid:biocol.org:col:34495                          <NA>
#> 4 specimen urn:lsid:biocol.org:col:34495                          <NA>
#> 5 specimen urn:lsid:biocol.org:col:34495                          <NA>
#> 6 specimen urn:lsid:biocol.org:col:34495                          <NA>
#>   institutioncode   collectioncode
#> 1             MSB   Bird specimens
#> 2             MSB Mammal specimens
#> 3             MSB Mammal specimens
#> 4             MSB Mammal specimens
#> 5             MSB Mammal specimens
#> 6             MSB Mammal specimens
```

### Messages

In the previous examples, we've suppressed messages for more concise output, but you can set `verbose=TRUE` to get helpful messages - `verbose=TRUE` is also the default setting so if you don't specify that parameter messages will be printed to the console.


```r
res <- searchbyterm(class = "Aves", state = "California", limit = 10, verbose = TRUE)
```

</section>

<section id="citing">

## Citing

To cite `rvertnet` in publications use:

<br>

>  Scott Chamberlain, Chris Ray and Vijay Barve (2015). rvertnet: Search
  VertNet, a Database of Vertebrate Specimen Records. R package version
  0.2.2. https://github.com/ropensci/rvertnet

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rvertnet](https://github.com/ropensci/rvertnet/issues?state=open)

[Back to top](#top)
