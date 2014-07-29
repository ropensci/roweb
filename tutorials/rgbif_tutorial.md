---
title: rgbif tutorial
layout: tutorial
packge_version: 0.6.9.99
---



`rgbif` is an R package to search and retrieve data from the Global Biodiverity Information Facilty (GBIF). `rgbif` wraps R code around the [GBIF API][gbifapi] to allow you to talk to GBIF from R.

********************

<section id="installation">

## Installation

Install rgbif from Github as the CRAN version fails with some functions due to changes in the GBIF API.


```r
devtools::install_github("ropensci/rgbif")
```

Load rgbif


```r
library("rgbif")
```

********************

<section id="usage">

## Usage

## Get number of occurrences for a set of search parameters

Search by type of record, all observational in this case


```r
occ_count(basisOfRecord='OBSERVATION')
```

```
[1] 100300628
```

Records for **Puma concolor** with lat/long data (georeferened) only. Note that `hasCoordinate` in `occ_search()` is the same as `georeferenced` in `occ_count()`.


```r
occ_count(taxonKey=2435099, georeferenced=TRUE)
```

```
[1] 2902
```

All georeferenced records in GBIF


```r
occ_count(georeferenced=TRUE)
```

[1] 383144587

Records from Denmark


```r
(denmark_code <- isocodes[grep("Denmark", isocodes$name), "code"])
```

```
[1] "DK"
```

```r
occ_count(country=denmark_code)
```

```
[1] 8708275
```

Number of records in a particular dataset


```r
occ_count(datasetKey='9e7ea106-0bf8-4087-bb61-dfe4f29e0f17')
```

```
[1] 4591
```

All records from 2012


```r
occ_count(year=2012)
```

```
[1] 32993561
```

Records for a particular dataset, and only for preserved specimens


```r
occ_count(datasetKey='e707e6da-e143-445d-b41d-529c4a777e8b', basisOfRecord='OBSERVATION')
```

```
[1] 2120907
```

********************

## Search for taxon information

Get possible values to be used in taxonomic rank arguments in functions


```r
taxrank()
```

```
[1] "kingdom"       "phylum"        "class"         "order"        
[5] "family"        "genus"         "species"       "infraspecific"
```

`name_lookup()` does full text search of name usages covering the scientific and vernacular name, the species description, distribution and the entire classification across all name usages of all or some checklists. Results are ordered by relevance as this search usually returns a lot of results.

By default `name_lookup()` returns five slots of information: meta, data, facets, hierarchies, and names. hierarchies and names elements are named by their matching GBIF key in the `data.frame` in the data slot.


```r
out <- name_lookup(query='mammalia')
names(out)
```

```
## [1] "meta"        "data"        "facets"      "hierarchies" "names"
```

```r
out$meta
```

```
##   offset limit endOfRecords  count
## 1      0    20        FALSE 122151
```

```r
head(out$data)
```

```
##         key nubKey parentKey        parent   phylum phylumKey  classKey
## 1 125798198    359 137006861      Chordata Chordata 137006861 125798198
## 2 116665331    359 116842680      Chordata Chordata 116842680 116665331
## 3       359    359        44      Chordata Chordata        44       359
## 4 125826646    359 137006861      Chordata Chordata 137006861 125826646
## 5 137066410    359 137066409 Macroscelidea Chordata 116842680 137066409
## 6 102402290    359 102545028      Chordata Chordata 102545028 102402290
##   canonicalName     authorship   nameType  rank numOccurrences  kingdom
## 1      Mammalia                WELLFORMED CLASS              0     <NA>
## 2      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0 Animalia
## 3      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0 Animalia
## 4      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0     <NA>
## 5      Mammalia                WELLFORMED ORDER              0 Animalia
## 6      Mammalia                WELLFORMED CLASS              0 Animalia
##   kingdomKey    order  orderKey
## 1         NA     <NA>        NA
## 2  116630539     <NA>        NA
## 3          1     <NA>        NA
## 4         NA     <NA>        NA
## 5  116630539 Mammalia 137066410
## 6  101719444     <NA>        NA
```

```r
out$facets
```

```
## NULL
```

```r
out$hierarchies[1:2]
```

```
## $`125798198`
##     rankkey     name
## 1 137006861 Chordata
## 
## $`116665331`
##     rankkey     name
## 1 116630539 Animalia
## 2 116842680 Chordata
```

```r
out$names[1:2]
```

```
## $`125798198`
##   vernacularName   language
## 1    Triconodont    CATALAN
## 2   Triconodonta      CZECH
## 3     Säugetiere     GERMAN
## 4   Triconodonta      DUTCH
## 5   Trykonodonty     POLISH
## 6   Triconodonta PORTUGUESE
## 7   Триконодонты    RUSSIAN
## 
## $`116665331`
##   vernacularName language
## 1        Mammals  ENGLISH
```

Search for a genus


```r
head(name_lookup(query='Cnaemidophorus', rank="genus", return="data"))
```

```
        key  nubKey parentKey        parent  kingdom     phylum
1 116755723 1858636 110614854 Pterophoridae Animalia Arthropoda
2   1858636 1858636      8863 Pterophoridae Animalia Arthropoda
3 125802004 1858636 125793784 Pterophoridae     <NA>       <NA>
4 134773282 1858636        NA          <NA>     <NA>       <NA>
5 127882857 1858636 127804516 Pterophoridae Animalia Arthropoda
6 128073730 1858636 128015003       Viruses  Viruses       <NA>
        order        family          genus kingdomKey phylumKey  classKey
1 Lepidoptera Pterophoridae Cnaemidophorus  116630539 116668755 116686069
2 Lepidoptera Pterophoridae Cnaemidophorus          1        54       216
3 Lepidoptera Pterophoridae Cnaemidophorus         NA        NA 137009267
4        <NA>          <NA> Cnaemidophorus         NA        NA        NA
5 Lepidoptera Pterophoridae Cnaemidophorus  127795487 127795488 127795683
6        <NA>          <NA> Cnaemidophorus  128015003        NA        NA
   orderKey familyKey  genusKey  canonicalName       authorship   nameType
1 116843281 110614854 116755723 Cnaemidophorus Wallengren, 1862 WELLFORMED
2       797      8863   1858636 Cnaemidophorus Wallengren, 1862 WELLFORMED
3 125810165 125793784 125802004 Cnaemidophorus Wallengren, 1862 WELLFORMED
4        NA        NA 134773282 Cnaemidophorus                  WELLFORMED
5 127795981 127804516 127882857 Cnaemidophorus                  WELLFORMED
6        NA        NA 128073730 Cnaemidophorus                  WELLFORMED
   rank numOccurrences
1 GENUS              0
2 GENUS              0
3 GENUS              0
4 GENUS              0
5 GENUS              0
6 GENUS              0
```

Search for the class mammalia


```r
head(name_lookup(query='mammalia', return = 'data'))
```

```
        key nubKey parentKey        parent   phylum phylumKey  classKey
1 125798198    359 137006861      Chordata Chordata 137006861 125798198
2 116665331    359 116842680      Chordata Chordata 116842680 116665331
3       359    359        44      Chordata Chordata        44       359
4 125826646    359 137006861      Chordata Chordata 137006861 125826646
5 137066410    359 137066409 Macroscelidea Chordata 116842680 137066409
6 102402290    359 102545028      Chordata Chordata 102545028 102402290
  canonicalName     authorship   nameType  rank numOccurrences  kingdom
1      Mammalia                WELLFORMED CLASS              0     <NA>
2      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0 Animalia
3      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0 Animalia
4      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0     <NA>
5      Mammalia                WELLFORMED ORDER              0 Animalia
6      Mammalia                WELLFORMED CLASS              0 Animalia
  kingdomKey    order  orderKey
1         NA     <NA>        NA
2  116630539     <NA>        NA
3          1     <NA>        NA
4         NA     <NA>        NA
5  116630539 Mammalia 137066410
6  101719444     <NA>        NA
```

Look up the species Helianthus annuus


```r
head(name_lookup('Helianthus annuus', rank="species", return = 'data'))
```

```
        key  nubKey parentKey     parent       kingdom     order
1 116845199 3119195 116853573 Helianthus       Plantae Asterales
2   3119195 3119195   3119134 Helianthus       Plantae Asterales
3 125790787 3119195 125809269 Helianthus          <NA> Asterales
4 106239436 3119195 106239325 Helianthus Viridiplantae Asterales
5 128399814 3119195 134815689 Helianthus          <NA>      <NA>
6 111449704 3119195 111449703 Helianthus       Plantae      <NA>
      family      genus kingdomKey  orderKey familyKey  genusKey
1 Asteraceae Helianthus  116668764 116852024 116856030 116853573
2 Asteraceae Helianthus          6       414      3065   3119134
3 Asteraceae Helianthus         NA 137012188 125799038 125809269
4 Asteraceae Helianthus  106147210 106237428 106237535 106239325
5       <NA> Helianthus         NA        NA        NA 134815689
6 Compositae Helianthus  111449174        NA 111442813 111449703
      canonicalName authorship   nameType    rank numOccurrences
1 Helianthus annuus         L. WELLFORMED SPECIES              0
2 Helianthus annuus         L. WELLFORMED SPECIES              0
3 Helianthus annuus         L. WELLFORMED SPECIES              0
4 Helianthus annuus            WELLFORMED SPECIES              0
5 Helianthus annuus            WELLFORMED SPECIES              0
6 Helianthus annuus         L. WELLFORMED SPECIES              0
         phylum phylumKey  classKey
1          <NA>        NA        NA
2 Magnoliophyta        49       220
3          <NA>        NA        NA
4  Streptophyta 106171079        NA
5          <NA>        NA        NA
6 Spermatophyta 111449175 111449177
```

The function `name_usage()` works with lots of different name endpoints in GBIF, listed at \url{http://www.gbif.org/developer/species#nameUsages}.


```r
library("plyr")
out <- name_usage(key=3119195, language="FRENCH", data='vernacularNames')
compact(lapply(out$results, function(x) if(x$language=="FRENCH") x else NULL))
```

```
## [[1]]
## [[1]]$vernacularName
## [1] "grand soleil"
## 
## [[1]]$language
## [1] "FRENCH"
## 
## [[1]]$sourceTaxonKey
## [1] 1.07e+08
## 
## [[1]]$preferred
## [1] FALSE
## 
## 
## [[2]]
## [[2]]$vernacularName
## [1] "grand soleil"
## 
## [[2]]$language
## [1] "FRENCH"
## 
## [[2]]$sourceTaxonKey
## [1] 1e+08
## 
## [[2]]$preferred
## [1] FALSE
## 
## 
## [[3]]
## [[3]]$vernacularName
## [1] "hélianthe annuel"
## 
## [[3]]$language
## [1] "FRENCH"
## 
## [[3]]$sourceTaxonKey
## [1] 1e+08
## 
## [[3]]$preferred
## [1] FALSE
```

The function `name_backbone()` is used to search against the GBIF backbone taxonomy


```r
name_backbone(name='Helianthus', rank='genus', kingdom='plants')
```

```
## $usageKey
## [1] 3119134
## 
## $scientificName
## [1] "Helianthus L."
## 
## $canonicalName
## [1] "Helianthus"
## 
## $rank
## [1] "GENUS"
## 
## $synonym
## [1] FALSE
## 
## $confidence
## [1] 97
## 
## $matchType
## [1] "EXACT"
## 
## $kingdom
## [1] "Plantae"
## 
## $phylum
## [1] "Magnoliophyta"
## 
## $order
## [1] "Asterales"
## 
## $family
## [1] "Asteraceae"
## 
## $genus
## [1] "Helianthus"
## 
## $kingdomKey
## [1] 6
## 
## $phylumKey
## [1] 49
## 
## $classKey
## [1] 220
## 
## $orderKey
## [1] 414
## 
## $familyKey
## [1] 3065
## 
## $genusKey
## [1] 3119134
## 
## $class
## [1] "Magnoliopsida"
```

The function `name_suggest()` is optimized for speed, and gives back suggested names based on query parameters.


```r
name_suggest(q='Puma concolor')
```

```
##        key                canonicalName       rank
## 1  2435099                Puma concolor    SPECIES
## 2  6164589       Puma concolor anthonyi SUBSPECIES
## 3  6164590        Puma concolor couguar SUBSPECIES
## 4  6164591    Puma concolor kaibabensis SUBSPECIES
## 5  6164592    Puma concolor oregonensis SUBSPECIES
## 6  6164594 Puma concolor vancouverensis SUBSPECIES
## 7  6164599         Puma concolor azteca SUBSPECIES
## 8  6164600          Puma concolor coryi SUBSPECIES
## 9  6164602      Puma concolor improcera SUBSPECIES
## 10 6164603   Puma concolor missoulensis SUBSPECIES
## 11 6164604     Puma concolor stanleyana SUBSPECIES
## 12 6164608    Puma concolor californica SUBSPECIES
## 13 6164610    Puma concolor hippolestes SUBSPECIES
## 14 6164611       Puma concolor mayensis SUBSPECIES
## 15 6164613      Puma concolor schorgeri SUBSPECIES
## 16 6164618         Puma concolor browni SUBSPECIES
## 17 6164620         Puma concolor cougar SUBSPECIES
## 18 6164622           Puma concolor puma SUBSPECIES
## 19 6164623       Puma concolor cabrerae SUBSPECIES
## 20 6164624  Puma concolor costaricensis SUBSPECIES
```


********************

## Get data for a single occurrence. Note that data is returned as a list, with slots for metadata and data, or as a hierarchy, or just data.

Just data


```r
occ_get(key=766766824, return='data')
```

```
             name       key decimalLatitude decimalLongitude
1 Corvus monedula 766766824           59.46            17.91
```

Just taxonomic hierarchy


```r
occ_get(key=766766824, return='hier')
```

```
             name     key    rank
1        Animalia       1 kingdom
2        Chordata      44  phylum
3            Aves     212   class
4   Passeriformes     729   order
5        Corvidae    5235  family
6          Corvus 2482468   genus
7 Corvus monedula 2482473 species
```

All data, or leave return parameter blank


```r
occ_get(key=766766824, return='all')
```

```
$hierarchy
             name     key    rank
1        Animalia       1 kingdom
2        Chordata      44  phylum
3            Aves     212   class
4   Passeriformes     729   order
5        Corvidae    5235  family
6          Corvus 2482468   genus
7 Corvus monedula 2482473 species

$media
list()

$data
             name       key decimalLatitude decimalLongitude
1 Corvus monedula 766766824           59.46            17.91
```

Get many occurrences. `occ_get` is vectorized


```r
occ_get(key=c(766766824,101010,240713150,855998194,49819470), return='data')
```

```
                    name       key decimalLatitude decimalLongitude
1        Corvus monedula 766766824           59.46            17.91
2    Platydoras costatus    101010           -4.35           -70.07
3                   <NA> 240713150          -77.57           163.58
4       Sciurus vulgaris 855998194           58.41            12.04
5 Phlogophora meticulosa  49819470           55.72            13.28
```

********************

## Search for occurrences

By default `occ_search()` returns a `dplyr` like output summary in which the data printed expands based on how much data is returned, and the size of your window. You can search by scientific name:


```r
occ_search(scientificName = "Ursus americanus")
```

```
## Records found [8330] 
## Records returned [20] 
## No. unique hierarchies [1] 
## No. media records [20] 
## Args [scientificName=Ursus americanus, limit=20, fields=minimal] 
## First 10 rows of data
## 
##                name       key decimalLatitude decimalLongitude
## 1  Ursus americanus 891034709           29.23          -103.29
## 2  Ursus americanus 891045574           43.74           -72.53
## 3  Ursus americanus 891041363           29.28          -103.29
## 4  Ursus americanus 891056344           29.27          -103.32
## 5  Ursus americanus 911496466           29.28          -103.30
## 6  Ursus americanus 911500351           37.40           -79.99
## 7  Ursus americanus 911503296           32.96          -108.47
## 8  Ursus americanus 911503052           37.79          -119.87
## 9  Ursus americanus 911501579           47.78          -122.96
## 10 Ursus americanus 911504089           38.74           -78.31
## ..              ...       ...             ...              ...
```

Or to be more precise, you can search for names first, make sure you have the right name, then pass the GBIF key to the `occ_search()` function:


```r
(key <- name_suggest(q='Helianthus annuus', rank='species')$key[1])
```

```
## [1] 3119195
```

```r
occ_search(taxonKey=key, limit=2)
```

```
## Records found [19536] 
## Records returned [2] 
## No. unique hierarchies [1] 
## No. media records [2] 
## Args [taxonKey=3119195, limit=2, fields=minimal] 
## First 10 rows of data
## 
##                name       key decimalLatitude decimalLongitude
## 1 Helianthus annuus 899948224           1.279           103.80
## 2 Helianthus annuus 922042404          -3.281            37.52
```

Like many functions in `rgbif`, you can choose what to return with the `return` parameter, here, just returning the metadata:


```r
occ_search(taxonKey=key, return='meta')
```

```
##   offset limit endOfRecords count
## 1      0    20        FALSE 19536
```

You can choose what fields to return. This isn't passed on to the API query to GBIF as they don't allow that, but we filter out the columns before we give the data back to you.


```r
occ_search(scientificName = "Ursus americanus", fields=c('name','basisOfRecord','protocol'))
```

```
## Records found [8330] 
## Records returned [20] 
## No. unique hierarchies [1] 
## No. media records [20] 
## Args [scientificName=Ursus americanus, limit=20,
##      fields=name,basisOfRecord,protocol] 
## First 10 rows of data
## 
##                name    protocol     basisOfRecord
## 1  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
## 2  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
## 3  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
## 4  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
## 5  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
## 6  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
## 7  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
## 8  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
## 9  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
## 10 Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
## ..              ...         ...               ...
```

Most parameters are vectorized, so you can pass in more than one value:


```r
splist <- c('Cyanocitta stelleri', 'Junco hyemalis', 'Aix sponsa')
keys <- sapply(splist, function(x) name_suggest(x)$key[1], USE.NAMES=FALSE)
out <- occ_search(taxonKey=keys, limit=5)
out
```

```
## Occ. found [2482598 (255927), 2492010 (1436233), 2498387 (416768)] 
## Occ. returned [2482598 (5), 2492010 (5), 2498387 (5)] 
## No. unique hierarchies [2482598 (1), 2492010 (1), 2498387 (1)] 
## No. media records [2482598 (5), 2492010 (5), 2498387 (5)] 
## Args [taxonKey=2482598,2492010,2498387, limit=5, fields=minimal] 
## First 10 rows of data from 2482598
## 
##                  name       key decimalLatitude decimalLongitude
## 1 Cyanocitta stelleri 891781350           37.74           -122.5
## 2 Cyanocitta stelleri 891051562           38.94           -120.0
## 3 Cyanocitta stelleri 891042142           37.24           -122.0
## 4 Cyanocitta stelleri 891047537           37.87           -122.2
## 5 Cyanocitta stelleri 891051134           35.19           -111.6
```


********************

## Maps

Static map using the ggplot2 package. Make a map of *Puma concolor* occurrences.


```r
key <- name_backbone(name='Puma concolor')$speciesKey
dat <- occ_search(taxonKey=key, return='data', limit=300)
gbifmap(input=dat)
```

![plot of chunk gbifmap1](../assets/tutorial-images/rgbif/gbifmap1.png) 

[gbifapi]: http://data.gbif.org/tutorial/services


<section id="citing">

## Citing

To cite `rgbif` in publications use:

<br>

> Scott Chamberlain, Carl Boettiger, Karthik Ram, Vijay Barve and Dan Mcglinn (2014). rgbif: Interface to the Global Biodiversity Information Facility API. R package version 0.6.9.99. https://github.com/ropensci/rgbif

<section id="license_bugs">

## License and bugs

* License: [CC0](http://creativecommons.org/choose/zero/)
* Report bugs at [our Github repo for rgbif](https://github.com/ropensci/rgbif/issues?state=open)

[Back to top](#top)
