---
title: rebird tutorial
layout: tutorial
packge_version: 0.2.0
---

A programmatic interface to the eBird database. Find out more about eBird at [their website](http://ebird.org/content/ebird/).

<section id="installation">

## Installation


You can install the stable version from CRAN


```r
install.packages("rebird")
```

Or the development version from Github


```r
install.packages("devtools")
devtools::install_github("ropensci/rebird")
```

Then load the package into the R sesssion


```r
library("rebird")
```

<section id="usage">

## Usage

### Sightings at location determined by latitude/longitude

Search for bird occurrences by latitude and longitude point


```r
ebirdgeo(species = 'spinus tristis', lat = 42, lng = -76)
```

```
## Source: local data frame [12 x 11]
## 
##               obsDt       lng
##               (chr)     (dbl)
## 1  2015-12-28 11:45 -75.90543
## 2  2015-12-28 10:50 -75.89836
## 3  2015-12-26 10:25 -75.98355
## 4  2015-12-25 13:01 -75.88002
## 5  2015-12-24 14:57 -76.07799
## 6  2015-12-24 10:32 -76.09052
## 7  2015-12-23 11:49 -76.08453
## 8  2015-12-22 10:00 -75.93579
## 9  2015-12-20 14:15 -75.96821
## 10 2015-12-20 09:00 -76.00171
## 11 2015-12-19 11:13 -76.27245
## 12 2015-12-19 11:02 -75.93946
## Variables not shown: locName (chr), obsValid (lgl), comName (chr),
##   obsReviewed (lgl), sciName (chr), locationPrivate (lgl), howMany (int),
##   lat (dbl), locID (chr)
```

Same, but with additional parameter settings, returning only 10 records, including provisional records, and hotspot records.


```r
ebirdgeo(lat = 42, lng = -76, max = 10, includeProvisional = TRUE, hotspot = TRUE)
```

```
## Source: local data frame [10 x 11]
## 
##               obsDt       lng              locName obsValid
##               (chr)     (dbl)                (chr)    (lgl)
## 1  2015-12-28 12:02 -75.91100 Water St. River Walk     TRUE
## 2  2015-12-28 12:02 -75.91100 Water St. River Walk     TRUE
## 3  2015-12-28 12:02 -75.91100 Water St. River Walk     TRUE
## 4  2015-12-28 12:02 -75.91100 Water St. River Walk     TRUE
## 5  2015-12-28 12:02 -75.91100 Water St. River Walk     TRUE
## 6  2015-12-28 12:02 -75.91100 Water St. River Walk     TRUE
## 7  2015-12-28 12:02 -75.91100 Water St. River Walk     TRUE
## 8  2015-12-28 07:32 -76.00171  River Rd. (Endwell)     TRUE
## 9  2015-12-28 07:32 -76.00171  River Rd. (Endwell)     TRUE
## 10 2015-12-27 10:43 -76.01297    Harold Moore Park     TRUE
## Variables not shown: comName (chr), obsReviewed (lgl), sciName (chr),
##   locationPrivate (lgl), howMany (int), lat (dbl), locID (chr)
```


### Recent sightings frm location IDs

Search for bird occurrences for two locations by their IDs


```r
ebirdloc(locID = c('L99381','L99382'))
```

```
## Source: local data frame [61 x 11]
## 
##               obsDt       lng      locName obsValid
##               (chr)     (dbl)        (chr)    (lgl)
## 1  2015-12-26 08:48 -76.50375 Stewart Park     TRUE
## 2  2015-12-26 08:48 -76.50375 Stewart Park     TRUE
## 3  2015-12-26 08:48 -76.50375 Stewart Park     TRUE
## 4  2015-12-26 08:48 -76.50375 Stewart Park     TRUE
## 5  2015-12-26 08:48 -76.50375 Stewart Park     TRUE
## 6  2015-12-26 08:48 -76.50375 Stewart Park     TRUE
## 7  2015-12-26 08:48 -76.50375 Stewart Park     TRUE
## 8  2015-12-26 08:48 -76.50375 Stewart Park     TRUE
## 9  2015-12-26 08:48 -76.50375 Stewart Park     TRUE
## 10 2015-12-26 08:48 -76.50375 Stewart Park     TRUE
## ..              ...       ...          ...      ...
## Variables not shown: comName (chr), obsReviewed (lgl), sciName (chr),
##   locationPrivate (lgl), howMany (int), lat (dbl), locID (chr)
```

Search by location ID and species name, as well as some additional parameter settings


```r
ebirdloc(locID = 'L99381', species = 'larus delawarensis', max = 10, provisional = TRUE, hotspot=TRUE)
```

```
## Source: local data frame [1 x 11]
## 
##              obsDt       lng      locName obsValid          comName
##              (chr)     (dbl)        (chr)    (lgl)            (chr)
## 1 2015-12-26 08:48 -76.50375 Stewart Park     TRUE Ring-billed Gull
## Variables not shown: obsReviewed (lgl), sciName (chr), locationPrivate
##   (lgl), howMany (int), lat (dbl), locID (chr)
```


### Recent observations at a region

Search for bird occurrences by region and species name


```r
ebirdregion(region = 'US', species = 'Setophaga caerulescens')
```

```
## Source: local data frame [28 x 11]
## 
##               obsDt       lng
##               (chr)     (dbl)
## 1  2015-12-28 16:05 -80.33864
## 2  2015-12-28 15:15 -80.31086
## 3        2015-12-28 -80.79450
## 4  2015-12-27 08:00 -80.27264
## 5  2015-12-27 07:30 -74.50722
## 6  2015-12-26 16:03 -76.58631
## 7  2015-12-26 15:01 -80.28426
## 8  2015-12-26 14:51 -80.30780
## 9  2015-12-26 11:28 -80.29746
## 10 2015-12-26 10:21 -80.26847
## ..              ...       ...
## Variables not shown: locName (chr), obsValid (lgl), comName (chr),
##   obsReviewed (lgl), sciName (chr), locationPrivate (lgl), howMany (int),
##   lat (dbl), locID (chr)
```

Search by location ID and species name, as well as some additional parameter settings. Note that we use `US-OH` to represent Ohio within the US. [See possible region values](https://confluence.cornell.edu/display/CLOISAPI/eBird-1.1-RegionCodeReference).


```r
ebirdregion(region = 'US-OH', max = 10, provisional = TRUE, hotspot = TRUE)
```

```
## Source: local data frame [10 x 11]
## 
##               obsDt       lng
##               (chr)     (dbl)
## 1  2015-12-29 08:45 -82.96656
## 2  2015-12-29 08:45 -82.96656
## 3  2015-12-29 08:45 -82.96656
## 4  2015-12-29 08:45 -82.96656
## 5  2015-12-29 08:45 -82.96656
## 6  2015-12-29 08:45 -82.96656
## 7  2015-12-29 08:45 -82.96656
## 8  2015-12-29 08:45 -82.96656
## 9  2015-12-29 08:45 -82.96656
## 10 2015-12-29 08:45 -82.96656
## Variables not shown: locName (chr), obsValid (lgl), comName (chr),
##   obsReviewed (lgl), sciName (chr), locationPrivate (lgl), howMany (int),
##   lat (dbl), locID (chr)
```


### Recent observations at hotspots

Search for bird occurrences by region and species name


```r
ebirdhotspot(locID = c('L99381','L99382'), species = 'larus delawarensis')
```

```
## Source: local data frame [1 x 11]
## 
##              obsDt       lng      locName obsValid          comName
##              (chr)     (dbl)        (chr)    (lgl)            (chr)
## 1 2015-12-26 08:48 -76.50375 Stewart Park     TRUE Ring-billed Gull
## Variables not shown: obsReviewed (lgl), sciName (chr), locationPrivate
##   (lgl), howMany (int), lat (dbl), locID (chr)
```


### Frequency of observations at hotspots or regions

Obtain historical frequencies of bird occurrences at a given hotspot


```r
ebirdfreq(loctype = 'hotspots', loc = 'L196159')
```

```
## Source: local data frame [8,208 x 4]
## 
##                        comName   monthQt frequency sampleSize
##                          (chr)     (chr)     (dbl)      (dbl)
## 1  Greater White-fronted Goose January-1    0.0000         16
## 2                   Snow Goose January-1    0.0000         16
## 3               Cackling Goose January-1    0.0000         16
## 4                 Canada Goose January-1    0.0000         16
## 5        Cackling/Canada Goose January-1    0.0000         16
## 6               Trumpeter Swan January-1    0.0000         16
## 7                    Wood Duck January-1    0.2500         16
## 8                      Gadwall January-1    0.0000         16
## 9              Eurasian Wigeon January-1    0.5625         16
## 10             American Wigeon January-1    1.0000         16
## ..                         ...       ...       ...        ...
```

Same, but in wide format (for making bar charts)


```r
ebirdfreq(loctype = 'hotspots', loc = 'L196159', long = FALSE)
```

```
## Source: local data frame [172 x 49]
## 
##                        comName January-1  January-2 January-3  January-4
##                          (chr)     (dbl)      (dbl)     (dbl)      (dbl)
## 1                 Sample Size:   16.0000 19.0000000      20.0 28.0000000
## 2  Greater White-fronted Goose    0.0000  0.0000000       0.0  0.0000000
## 3                   Snow Goose    0.0000  0.0000000       0.0  0.0000000
## 4               Cackling Goose    0.0000  0.0000000       0.0  0.0000000
## 5                 Canada Goose    0.0000  0.0000000       0.0  0.0000000
## 6        Cackling/Canada Goose    0.0000  0.0000000       0.0  0.0000000
## 7               Trumpeter Swan    0.0000  0.0000000       0.0  0.0000000
## 8                    Wood Duck    0.2500  0.0000000       0.0  0.0000000
## 9                      Gadwall    0.0000  0.0000000       0.0  0.0000000
## 10             Eurasian Wigeon    0.5625  0.7368421       0.8  0.3928571
## ..                         ...       ...        ...       ...        ...
## Variables not shown: February-1 (dbl), February-2 (dbl), February-3 (dbl),
##   February-4 (dbl), March-1 (dbl), March-2 (dbl), March-3 (dbl), March-4
##   (dbl), April-1 (dbl), April-2 (dbl), April-3 (dbl), April-4 (dbl), May-1
##   (dbl), May-2 (dbl), May-3 (dbl), May-4 (dbl), June-1 (dbl), June-2
##   (dbl), June-3 (dbl), June-4 (dbl), July-1 (dbl), July-2 (dbl), July-3
##   (dbl), July-4 (dbl), August-1 (dbl), August-2 (dbl), August-3 (dbl),
##   August-4 (dbl), September-1 (dbl), September-2 (dbl), September-3 (dbl),
##   September-4 (dbl), October-1 (dbl), October-2 (dbl), October-3 (dbl),
##   October-4 (dbl), November-1 (dbl), November-2 (dbl), November-3 (dbl),
##   November-4 (dbl), December-1 (dbl), December-2 (dbl), December-3 (dbl),
##   December-4 (dbl)
```

Obtain frequency data for a given state


```r
ebirdfreq(loctype = 'states', loc = 'CA-BC')
```

```
## Source: local data frame [32,160 x 4]
## 
##                                          comName   monthQt   frequency
##                                            (chr)     (chr)       (dbl)
## 1                         Fulvous Whistling-Duck January-1 0.000000000
## 2                    Greater White-fronted Goose January-1 0.008611263
## 3  Swan x Graylag Goose (Domestic type) (hybrid) January-1 0.000000000
## 4                                  Emperor Goose January-1 0.000000000
## 5                                     Snow Goose January-1 0.024876982
## 6                                   Ross's Goose January-1 0.000000000
## 7                              Snow/Ross's Goose January-1 0.000000000
## 8                                          Brant January-1 0.007927829
## 9                                 Cackling Goose January-1 0.014762165
## 10                                  Canada Goose January-1 0.188627665
## ..                                           ...       ...         ...
## Variables not shown: sampleSize (dbl)
```

Or county


```r
ebirdfreq(loctype = 'counties', loc = 'CA-BC-GV')
```

```
## Source: local data frame [22,704 x 4]
## 
##                        comName   monthQt   frequency sampleSize
##                          (chr)     (chr)       (dbl)      (dbl)
## 1  Greater White-fronted Goose January-1 0.008098727       2593
## 2                Emperor Goose January-1 0.000000000       2593
## 3                   Snow Goose January-1 0.058233706       2593
## 4                 Ross's Goose January-1 0.000000000       2593
## 5            Snow/Ross's Goose January-1 0.000000000       2593
## 6                        Brant January-1 0.018125723       2593
## 7               Cackling Goose January-1 0.014269186       2593
## 8                 Canada Goose January-1 0.185499422       2593
## 9        Cackling/Canada Goose January-1 0.001156961       2593
## 10                   goose sp. January-1 0.000000000       2593
## ..                         ...       ...         ...        ...
```

Obtain frequency data within a range of years and months


```r
ebirdfreq(loctype = 'hotspots', loc = 'L196159', startyear = 2010,
          endyear = 2014, startmonth = 1, endmonth = 3)
```

```
## Source: local data frame [3,792 x 4]
## 
##                                comName   monthQt frequency sampleSize
##                                  (chr)     (chr)     (dbl)      (dbl)
## 1                         Canada Goose January-1       0.0         10
## 2                            Wood Duck January-1       0.4         10
## 3                              Gadwall January-1       0.0         10
## 4                      Eurasian Wigeon January-1       0.4         10
## 5                      American Wigeon January-1       1.0         10
## 6  Eurasian x American Wigeon (hybrid) January-1       0.0         10
## 7                              Mallard January-1       1.0         10
## 8                    Northern Shoveler January-1       0.8         10
## 9                     Northern Pintail January-1       0.0         10
## 10                   Green-winged Teal January-1       0.0         10
## ..                                 ...       ...       ...        ...
```


### Recent notable sightings

Search for notable sightings at a given latitude and longitude


```r
ebirdnotable(lat = 42, lng = -70)
```

```
## Source: local data frame [1,215 x 11]
## 
##               obsDt       lng                                   locName
##               (chr)     (dbl)                                     (chr)
## 1  2015-12-29 11:54 -71.61575                           Westborough WMA
## 2  2015-12-29 11:54 -71.10285                         1016 Boston Road 
## 3  2015-12-29 11:50 -70.89774                              Fort Phoenix
## 4  2015-12-29 09:57 -71.13639                    Allandale Woods--marsh
## 5  2015-12-29 08:00 -71.84466                             Beaumont Home
## 6  2015-12-28 15:30 -72.54394                     Broad Brook Mill Pond
## 7  2015-12-28 15:30 -72.54394                     Broad Brook Mill Pond
## 8  2015-12-28 15:28 -70.34081         Stroudwater St. fields, Westbrook
## 9  2015-12-28 15:10 -70.98352 Belle Isle Cemetery/Winthrop Compost Dump
## 10 2015-12-28 15:10 -70.98352 Belle Isle Cemetery/Winthrop Compost Dump
## ..              ...       ...                                       ...
## Variables not shown: obsValid (lgl), comName (chr), obsReviewed (lgl),
##   sciName (chr), locationPrivate (lgl), howMany (int), lat (dbl), locID
##   (chr)
```


### eBird taxonomy

Returns a data.frame of all species in the eBird taxonomy for the given parameter inputs


```r
ebirdtaxonomy()
```

```
## Source: local data frame [10,473 x 9]
## 
##    speciesCode category                comName sciNameCodes
##          (chr)    (chr)                  (chr)        (chr)
## 1      ostric2  species         Common Ostrich         STCA
## 2      ostric3  species         Somali Ostrich         STMO
## 3      grerhe1  species           Greater Rhea         RHAM
## 4      lesrhe2  species            Lesser Rhea         RHPE
## 5      tabtin1  species Tawny-breasted Tinamou         NOJU
## 6      higtin1  species       Highland Tinamou         NOBO
## 7      hootin1  species         Hooded Tinamou         NONI
## 8      grytin1  species           Gray Tinamou         TITA
## 9      soltin1  species       Solitary Tinamou         TISO
## 10     blatin1  species          Black Tinamou         TIOS
## ..         ...      ...                    ...          ...
## Variables not shown: sciName (chr), taxonID (chr), taxonOrder (dbl),
##   comNameCodes (chr), bandingCodes (chr)
```

Search for hybrid species only


```r
ebirdtaxonomy(cat="hybrid")
```

```
## Source: local data frame [308 x 9]
## 
##    speciesCode category
##          (chr)    (chr)
## 1       x00721   hybrid
## 2       x00775   hybrid
## 3       x00776   hybrid
## 4       x00755   hybrid
## 5       x00627   hybrid
## 6      sxrgoo1   hybrid
## 7       x00685   hybrid
## 8       x00756   hybrid
## 9       x00757   hybrid
## 10      x00649   hybrid
## ..         ...      ...
## Variables not shown: comName (chr), sciNameCodes (chr), sciName (chr),
##   taxonID (chr), taxonOrder (dbl), comNameCodes (chr), bandingCodes (chr)
```


### Check eBird region

Check if region is valid in eBird database


```r
ebirdregioncheck(loctype = 'counties', loc = 'CA-BC-GV')
```

```
## [1] TRUE
```


<section id="citing">

## Citing

To cite `rebird` in publications use:

<br>

> Rafael Maia, Scott Chamberlain and Andy Teucher (2015). rebird: Interface to eBird. R package version 0.2.0. http://github.com/ropensci/rebird

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rebird](https://github.com/ropensci/rebird/issues?state=open)

[Back to top](#top)
