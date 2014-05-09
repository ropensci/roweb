---
title: rebird tutorial
layout: tutorial
packge_version: 0.1.1
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
library("devtools")
install_github("ropensci/rebird")
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
out <- ebirdgeo(species = 'spinus tristis', lat = 42, lng = -76)
head(out)
```

```
##              comName howMany   lat    lng    locID             locName
## 1 American Goldfinch      10 42.09 -75.79  L518236   Kirkwood Backyard
## 2 American Goldfinch       3 42.13 -76.00  L519103  Waterman--IBM Glen
## 3 American Goldfinch       5 42.11 -76.00  L978114        Murphys Pits
## 4 American Goldfinch      10 42.09 -76.04 L2291049      Imperial Woods
## 5 American Goldfinch      NA 42.08 -75.98 L1160914 Lamoureux Yard list
## 6 American Goldfinch       8 42.07 -75.81 L2230015      4 Stratford St
##   locationPrivate            obsDt obsReviewed obsValid        sciName
## 1            TRUE 2014-05-09 10:07       FALSE     TRUE Spinus tristis
## 2           FALSE 2014-05-09 09:01       FALSE     TRUE Spinus tristis
## 3           FALSE 2014-05-09 07:57       FALSE     TRUE Spinus tristis
## 4            TRUE 2014-05-09 07:19       FALSE     TRUE Spinus tristis
## 5            TRUE 2014-05-09 07:00       FALSE     TRUE Spinus tristis
## 6            TRUE 2014-05-09 06:30       FALSE     TRUE Spinus tristis
```

Same, but with additional parameter settings, returning only 10 records, including provisional records, and hotspot records.


```r
out1 <- ebirdgeo(lat = 42, lng = -76, max = 10, includeProvisional = TRUE, hotspot = TRUE)
head(out1)
```

```
##                  comName howMany   lat lng   locID            locName
## 1          American Crow       1 42.13 -76 L519103 Waterman--IBM Glen
## 2  Yellow-rumped Warbler       1 42.13 -76 L519103 Waterman--IBM Glen
## 3         American Robin       6 42.13 -76 L519103 Waterman--IBM Glen
## 4       Baltimore Oriole       1 42.13 -76 L519103 Waterman--IBM Glen
## 5 Black-capped Chickadee       3 42.13 -76 L519103 Waterman--IBM Glen
## 6               Blue Jay       1 42.13 -76 L519103 Waterman--IBM Glen
##   locationPrivate            obsDt obsReviewed obsValid
## 1           FALSE 2014-05-09 09:01       FALSE     TRUE
## 2           FALSE 2014-05-09 09:01       FALSE     TRUE
## 3           FALSE 2014-05-09 09:01       FALSE     TRUE
## 4           FALSE 2014-05-09 09:01       FALSE     TRUE
## 5           FALSE 2014-05-09 09:01       FALSE     TRUE
## 6           FALSE 2014-05-09 09:01       FALSE     TRUE
##                 sciName
## 1 Corvus brachyrhynchos
## 2    Setophaga coronata
## 3    Turdus migratorius
## 4       Icterus galbula
## 5  Poecile atricapillus
## 6   Cyanocitta cristata
```

```r
nrow(out1)
```

```
## [1] 10
```


### Recent sightings frm location IDs

Search for bird occurrences for two locations by their IDs


```r
out2 <- ebirdloc(locID = c('L99381','L99382'))
head(out2)
```

```
##            comName   lat    lng  locID      locName locationPrivate
## 1     Canada Goose 42.46 -76.51 L99381 Stewart Park           FALSE
## 2        Wood Duck 42.46 -76.51 L99381 Stewart Park           FALSE
## 3          Mallard 42.46 -76.51 L99381 Stewart Park           FALSE
## 4          Redhead 42.46 -76.51 L99381 Stewart Park           FALSE
## 5       Bufflehead 42.46 -76.51 L99381 Stewart Park           FALSE
## 6 Hooded Merganser 42.46 -76.51 L99381 Stewart Park           FALSE
##              obsDt obsReviewed obsValid               sciName howMany
## 1 2014-05-09 12:48       FALSE     TRUE     Branta canadensis      NA
## 2 2014-05-09 12:48       FALSE     TRUE            Aix sponsa       2
## 3 2014-05-09 12:48       FALSE     TRUE    Anas platyrhynchos      NA
## 4 2014-05-09 12:48       FALSE     TRUE      Aythya americana       8
## 5 2014-05-09 12:48       FALSE     TRUE     Bucephala albeola       1
## 6 2014-05-09 12:48       FALSE     TRUE Lophodytes cucullatus       1
```

Search by location ID and species name, as well as some additional parameter settings


```r
ebirdloc(locID = 'L99381', species = 'larus delawarensis', max = 10, provisional = TRUE, hotspot=TRUE)
```

```
##            comName   lat    lng  locID      locName locationPrivate
## 1 Ring-billed Gull 42.46 -76.51 L99381 Stewart Park           FALSE
##              obsDt obsReviewed obsValid            sciName
## 1 2014-05-09 12:48       FALSE     TRUE Larus delawarensis
```


### Recent observations at a region

Search for bird occurrences by region and species name


```r
out3 <- ebirdregion(region = 'US', species = 'Setophaga caerulescens')
head(out3)
```

```
##                       comName howMany   lat    lng    locID
## 1 Black-throated Blue Warbler       2 38.96 -77.05  L280792
## 2 Black-throated Blue Warbler       1 40.79 -73.98 L1221391
## 3 Black-throated Blue Warbler       3 40.65 -73.99  L285884
## 4 Black-throated Blue Warbler       4 40.53 -74.41 L2838839
## 5 Black-throated Blue Warbler       1 36.19 -81.85 L2838830
## 6 Black-throated Blue Warbler       1 41.65 -73.20 L2457013
##                               locName locationPrivate            obsDt
## 1 Rock Creek Park--Nature Center area           FALSE 2014-05-09 15:24
## 2                305 W 91st St (Home)            TRUE 2014-05-09 15:00
## 3                 Green-Wood Cemetery           FALSE 2014-05-09 14:55
## 4            Timothy Christian school            TRUE 2014-05-09 14:51
## 5                     beech creek bog            TRUE 2014-05-09 14:45
## 6                                Home            TRUE 2014-05-09 14:45
##   obsReviewed obsValid                sciName
## 1       FALSE     TRUE Setophaga caerulescens
## 2       FALSE     TRUE Setophaga caerulescens
## 3       FALSE     TRUE Setophaga caerulescens
## 4       FALSE     TRUE Setophaga caerulescens
## 5       FALSE     TRUE Setophaga caerulescens
## 6       FALSE     TRUE Setophaga caerulescens
```

Search by location ID and species name, as well as some additional parameter settings. Note that we use `US-OH` to represent Ohio within the US. [See possible region values](https://confluence.cornell.edu/display/CLOISAPI/eBird-1.1-RegionCodeReference).


```r
ebirdregion(region = 'US-OH', max = 10, provisional = TRUE, hotspot = TRUE)
```

```
##                      comName howMany   lat    lng    locID
## 1           American Bittern       1 39.92 -83.21 L1129017
## 2  Greater/Lesser Yellowlegs       8 39.92 -83.21 L1129017
## 3              American Crow       3 39.92 -83.21 L1129017
## 4             American Robin       1 39.92 -83.21 L1129017
## 5           Blue-winged Teal       4 39.92 -83.21 L1129017
## 6              Cliff Swallow       3 39.92 -83.21 L1129017
## 7        Common Yellowthroat       1 39.92 -83.21 L1129017
## 8         Eastern Meadowlark       1 39.92 -83.21 L1129017
## 9              Field Sparrow       1 39.92 -83.21 L1129017
## 10                   Gadwall       2 39.92 -83.21 L1129017
##                                                             locName
## 1  Battelle Darby Creek Metro Park--Wet Prairie Trails Teal/Harrier
## 2  Battelle Darby Creek Metro Park--Wet Prairie Trails Teal/Harrier
## 3  Battelle Darby Creek Metro Park--Wet Prairie Trails Teal/Harrier
## 4  Battelle Darby Creek Metro Park--Wet Prairie Trails Teal/Harrier
## 5  Battelle Darby Creek Metro Park--Wet Prairie Trails Teal/Harrier
## 6  Battelle Darby Creek Metro Park--Wet Prairie Trails Teal/Harrier
## 7  Battelle Darby Creek Metro Park--Wet Prairie Trails Teal/Harrier
## 8  Battelle Darby Creek Metro Park--Wet Prairie Trails Teal/Harrier
## 9  Battelle Darby Creek Metro Park--Wet Prairie Trails Teal/Harrier
## 10 Battelle Darby Creek Metro Park--Wet Prairie Trails Teal/Harrier
##    locationPrivate            obsDt obsReviewed obsValid
## 1            FALSE 2014-05-09 16:07       FALSE     TRUE
## 2            FALSE 2014-05-09 16:07       FALSE     TRUE
## 3            FALSE 2014-05-09 16:07       FALSE     TRUE
## 4            FALSE 2014-05-09 16:07       FALSE     TRUE
## 5            FALSE 2014-05-09 16:07       FALSE     TRUE
## 6            FALSE 2014-05-09 16:07       FALSE     TRUE
## 7            FALSE 2014-05-09 16:07       FALSE     TRUE
## 8            FALSE 2014-05-09 16:07       FALSE     TRUE
## 9            FALSE 2014-05-09 16:07       FALSE     TRUE
## 10           FALSE 2014-05-09 16:07       FALSE     TRUE
##                        sciName
## 1        Botaurus lentiginosus
## 2  Tringa melanoleuca/flavipes
## 3        Corvus brachyrhynchos
## 4           Turdus migratorius
## 5                 Anas discors
## 6     Petrochelidon pyrrhonota
## 7           Geothlypis trichas
## 8              Sturnella magna
## 9             Spizella pusilla
## 10               Anas strepera
```


### Recent observations at hotspots

Search for bird occurrences by region and species name


```r
ebirdhotspot(locID = c('L99381','L99382'), species = 'larus delawarensis')
```

```
##            comName   lat    lng  locID      locName locationPrivate
## 1 Ring-billed Gull 42.46 -76.51 L99381 Stewart Park           FALSE
## 2 Ring-billed Gull 42.46 -76.52 L99382     Hog Hole           FALSE
##              obsDt obsReviewed obsValid            sciName howMany
## 1 2014-05-09 12:48       FALSE     TRUE Larus delawarensis      NA
## 2 2014-04-28 17:00       FALSE     TRUE Larus delawarensis       2
```


### Recent notable sightings

Search for notable sightings at a given latitude and longitude


```r
out4 <- ebirdnotable(lat = 42, lng = -70)
head(out4)
```

```
##                    comName howMany   lat    lng    locID
## 1            Field Sparrow       1 42.34 -71.09  L710606
## 2             Horned Grebe       2 41.72 -71.38  L143298
## 3   Short-billed Dowitcher       1 43.54 -70.32  L472167
## 4 Summer Tanager (Eastern)       1 43.77 -69.31  L251836
## 5   Semipalmated Sandpiper       1 41.63 -70.22 L1313783
## 6        Northern Wheatear       1 43.56 -70.36  L448189
##                          locName locationPrivate            obsDt
## 1       Fenway & Victory Gardens           FALSE 2014-05-09 17:06
## 2                 Home-Waterside            TRUE 2014-05-09 15:50
## 3       Ferry Beach, Scarborough           FALSE 2014-05-09 14:46
## 4                Monhegan Island           FALSE 2014-05-09 14:00
## 5       Sea Gull Beach, Yarmouth           FALSE 2014-05-09 13:09
## 6 Scarborough Marsh--Eastern Rd.           FALSE 2014-05-09 13:06
##   obsReviewed obsValid             sciName
## 1       FALSE    FALSE    Spizella pusilla
## 2       FALSE    FALSE    Podiceps auritus
## 3       FALSE    FALSE Limnodromus griseus
## 4       FALSE    FALSE       Piranga rubra
## 5       FALSE    FALSE    Calidris pusilla
## 6       FALSE    FALSE   Oenanthe oenanthe
```


### eBird taxonomy

Returns a data.frame of all species in the eBird taxonomy for the given parameter inputs


```r
out5 <- ebirdtaxonomy()
head(out5)
```

```
##              comName                    sciName  taxonID
## 1            Ostrich           Struthio camelus TC000001
## 2       Greater Rhea             Rhea americana TC000004
## 3        Lesser Rhea               Rhea pennata TC000005
## 4 Southern Cassowary        Casuarius casuarius TC000008
## 5    Dwarf Cassowary         Casuarius bennetti TC000009
## 6 Northern Cassowary Casuarius unappendiculatus TC000010
```

Search for hybrid species only


```r
out6 <- ebirdtaxonomy(cat="hybrid")
head(out6)
```

```
##                                         comName
## 1 Spotted x White-faced Whistling-Duck (hybrid)
## 2   Greater White-fronted x Snow Goose (hybrid)
## 3                  Snow x Ross's Goose (hybrid)
## 4                   Brant x Snow Goose (hybrid)
## 5             Graylag x Barnacle Goose (hybrid)
## 6                Snow x Cackling Goose (hybrid)
##                                 sciName  taxonID
## 1         Dendrocygna guttata x viduata TC013397
## 2   Anser albifrons x Chen caerulescens TC000095
## 3            Chen caerulescens x rossii TC000106
## 4   Branta bernicla x Chen caerulescens TC013017
## 5        Anser anser x Branta leucopsis TC012915
## 6 Chen caerulescens x Branta hutchinsii TC013042
```


<section id="citing">

## Citing

To cite `rebird` in publications use:

<br>

> Rafael Maia, Scott Chamberlain and Andy Teucher (2014). rebird: Interface to eBird. R package version 0.1.1. http://github.com/ropensci/rebird

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rebird](https://github.com/ropensci/rebird/issues?state=open)

[Back to top](#top)
