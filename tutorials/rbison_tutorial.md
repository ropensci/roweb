---
title: rbison tutorial
layout: tutorial
packge_version: 0.3.2
---




`rbison` is an R package to search and retrieve data from the USGS BISON service. `rbison` wraps R code around the BISON API to allow you to talk to the BISON database from R.

BISON has occurrence data for the US only.

BISON is a node of the Global Biodiversity Information Facility (GBIF) - i.e., you can get data that's available in BISON via GBIF instead if you want.

********************

### Info

See [here](http://bison.usgs.ornl.gov/services.html) for API docs for the BISON API.

********************

<section id="installation">

## Installation


```r
install.packages("rbison")
```



```r
library("rbison")
```


<section id="usage">

## Usage

Notice that the function `bisonmap` automagically selects the map extent to plot for you,
being one of the contiguous lower 48 states, or the lower 48 plus AK and HI, or a global map

### Some or all points outside the US

If some or all points outside the US, a global map is drawn, and throws a warning. . You may want to make sure the occurrence lat/long coordinates are correct.

Get data


```r
out <- bison(species = "Helianthus annuus", count = 2000)
```


Inspect summary


```r
out$summary
```

```
##   total observation fossil specimen literature unknown living centroid
## 1  4388          13    102     1267       1106    1892      8        1
```


Map occurrences


```r
bisonmap(out)
```

```
## Some of your points are outside the US. Make sure the data is correct
```

![plot of chunk unnamed-chunk-2](../assets/tutorial-images/rbison/unnamed-chunk-2.png) 


That one point off the coast of Africa is probably wrong, but the point here is that a world map is drawn if there are points outside the US.

********************

### All points within the US (including AK and HI)

Get data


```r
out <- bison(species = "Bison bison", count = 600)
```


Inspect summary


```r
out$summary
```

```
##   total observation fossil specimen unknown centroid
## 1   956          32    157      718      49        1
```


Map occurrences


```r
bisonmap(out)
```

![plot of chunk six](../assets/tutorial-images/rbison/six.png) 


********************

###  All points within the contiguous 48 states

Get data


```r
out <- bison(species = "Aquila chrysaetos", count = 600)
```


Inspect summary


```r
out$summary
```

```
##   total observation fossil specimen literature unknown centroid
## 1 52626       50896    105      799        118     708        1
```


Map occurrences


```r
bisonmap(out)
```

![plot of chunk nine](../assets/tutorial-images/rbison/nine.png) 


********************

###  With any data returned from a `bison` call, you can choose to plot county or state level data

Counties - using last data call for Aquila


```r
bisonmap(out, tomap = "county")
```

![plot of chunk ten](../assets/tutorial-images/rbison/ten.png) 


States - using last data call for Aquila


```r
bisonmap(out, tomap = "state")
```

![plot of chunk eleven](../assets/tutorial-images/rbison/eleven.png) 


********************

###  Constrain search with county IDs or bounding boxes

#### Constrain search to a certain county.

Check out [this site](http://www.epa.gov/enviro/html/codes/state.html) to get state and county fips codes. Fips codes are like so: First two digits are the state code - last three are the county code. For example the *06* in  06037 is the state of California, and the *037* is the Los Angeles county.


```r
out <- bison(species = "Helianthus annuus", countyFips = "06037")
```


Inspect summary


```r
out$summary
```

```
##   total observation fossil specimen literature unknown centroid
## 1    24           1      3       12          1       7        1
```


By default, the query only returned 10 records


```r
out$points
```

```
##                 name decimalLongitude decimalLatitude occurrenceID
## 1  Helianthus annuus           -118.4           33.39   1032095838
## 2  Helianthus annuus           -118.3           34.20     45597818
## 3  Helianthus annuus           -118.0           34.00    225207520
## 4  Helianthus annuus           -118.0           34.00    225206595
## 5  Helianthus annuus           -118.0           34.00    225207727
## 6  Helianthus annuus           -118.0           34.00    225207562
## 7  Helianthus annuus           -118.0           34.00    225207875
## 8  Helianthus annuus           -118.0           34.00    225207687
## 9  Helianthus annuus           -118.0           34.00    225206669
## 10 Helianthus annuus           -118.0           34.00    225207892
##                             provider      basis
## 1               USDA PLANTS Database Literature
## 2    University of California, Davis    Unknown
## 3  Consortium of California Herbaria   Specimen
## 4  Consortium of California Herbaria   Specimen
## 5  Consortium of California Herbaria   Specimen
## 6  Consortium of California Herbaria   Specimen
## 7  Consortium of California Herbaria   Specimen
## 8  Consortium of California Herbaria   Specimen
## 9  Consortium of California Herbaria   Specimen
## 10 Consortium of California Herbaria   Specimen
##                                                      common_name geo
## 1  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 2  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 3  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 4  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 5  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 6  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 7  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 8  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 9  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 10 sunflower, annual sunflower, common sunflower, wild sunflower Yes
```


Or specify county by its actual name - probably much easier.


```r
out <- bison(species = "Helianthus annuus", county = "Los Angeles")
```


Inspect summary


```r
out$summary
```

```
##   total observation fossil specimen literature unknown centroid
## 1    24           1      3       12          1       7        1
```


By default, the query only returned 10 records


```r
out$points
```

```
##                 name decimalLongitude decimalLatitude occurrenceID
## 1  Helianthus annuus           -118.4           33.39   1032095838
## 2  Helianthus annuus           -118.3           34.20     45597818
## 3  Helianthus annuus           -118.0           34.00    225207520
## 4  Helianthus annuus           -118.0           34.00    225206595
## 5  Helianthus annuus           -118.0           34.00    225207727
## 6  Helianthus annuus           -118.0           34.00    225207562
## 7  Helianthus annuus           -118.0           34.00    225207875
## 8  Helianthus annuus           -118.0           34.00    225207687
## 9  Helianthus annuus           -118.0           34.00    225206669
## 10 Helianthus annuus           -118.0           34.00    225207892
##                             provider      basis
## 1               USDA PLANTS Database Literature
## 2    University of California, Davis    Unknown
## 3  Consortium of California Herbaria   Specimen
## 4  Consortium of California Herbaria   Specimen
## 5  Consortium of California Herbaria   Specimen
## 6  Consortium of California Herbaria   Specimen
## 7  Consortium of California Herbaria   Specimen
## 8  Consortium of California Herbaria   Specimen
## 9  Consortium of California Herbaria   Specimen
## 10 Consortium of California Herbaria   Specimen
##                                                      common_name geo
## 1  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 2  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 3  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 4  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 5  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 6  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 7  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 8  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 9  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 10 sunflower, annual sunflower, common sunflower, wild sunflower Yes
```


`bison` will help you if you spell the name wrong, or use a partial name. The results are not printed below, but you would get a prompt asking you to pick between the two counties that start with *Los*.


```r
bison(species = "Helianthus annuus", county = "Los")
```


#### Constrain search to a amorphous area.

Check out the Wikipedia page [here](http://en.wikipedia.org/wiki/Well-known_text) for an in depth look at the options, terminology, etc.


```r
out <- bison(species = "Helianthus annuus", aoi = "POLYGON((-111.06360117772908 38.84001566645886,-110.80542246679359 39.37707771107983,-110.20117441992392 39.17722368276862,-110.20666758398464 38.90844075244811,-110.63513438085685 38.67724220095734,-111.06360117772908 38.84001566645886))")
```


Inspect summary


```r
out$summary
```

```
##   total literature centroid
## 1     1          1        1
```


The data


```r
out$points
```

```
##                name decimalLongitude decimalLatitude occurrenceID
## 1 Helianthus annuus           -110.7           38.99   1032098012
##               provider      basis
## 1 USDA PLANTS Database Literature
##                                                     common_name geo
## 1 sunflower, annual sunflower, common sunflower, wild sunflower Yes
```


#### Constrain search to a certain aoibbox.

An aoibbox uses the format minx, miny, maxx, maxy.


```r
out <- bison(species = "Helianthus annuus", aoibbox = "-120.31,35.81,-110.57,40.21")
```


Inspect summary


```r
out$summary
```

```
##   total observation fossil specimen literature unknown centroid
## 1   149           6      8       33         25      77        1
```


The data, by default, the query only returned 10 records


```r
out$points
```

```
##                 name decimalLongitude decimalLatitude occurrenceID
## 1  Helianthus annuus           -115.0           36.21    320466814
## 2  Helianthus annuus           -111.8           35.83    320466028
## 3  Helianthus annuus           -119.7           36.76     45598447
## 4  Helianthus annuus           -119.7           36.76     45598264
## 5  Helianthus annuus           -111.8           35.84   1032095762
## 6  Helianthus annuus           -115.0           36.20   1032096818
## 7  Helianthus annuus           -120.0           36.82     40891639
## 8  Helianthus annuus           -120.0           36.82     40891641
## 9  Helianthus annuus           -120.0           36.82     40891643
## 10 Helianthus annuus           -120.0           36.82     40891645
##                              provider      basis
## 1           Missouri Botanical Garden   Specimen
## 2           Missouri Botanical Garden   Specimen
## 3     University of California, Davis    Unknown
## 4     University of California, Davis    Unknown
## 5                USDA PLANTS Database Literature
## 6                USDA PLANTS Database Literature
## 7  US National Plant Germplasm System    Unknown
## 8  US National Plant Germplasm System    Unknown
## 9  US National Plant Germplasm System    Unknown
## 10 US National Plant Germplasm System    Unknown
##                                                      common_name geo
## 1  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 2  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 3  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 4  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 5  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 6  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 7  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 8  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 9  sunflower, annual sunflower, common sunflower, wild sunflower Yes
## 10 sunflower, annual sunflower, common sunflower, wild sunflower Yes
```


<section id="citing">

## Citing

To cite `rbison` in publications use:

<br>

> Scott Chamberlain (2014). rbison: R interface to the USGS BISON API. R package version 0.3.2. http://CRAN.R-project.org/package=rbison

<section id="license_bugs">

## License and bugs

* License: [CC0](http://creativecommons.org/choose/zero/)
* Report bugs at [our Github repo for rbison](https://github.com/ropensci/rbison/issues?state=open)
