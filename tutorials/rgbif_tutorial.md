---
title: rgbif tutorial
layout: tutorial
packge_version: 0.6.2
---



`rgbif` is an R package to search and retrieve data from the Global Biodiverity Information Facilty (GBIF). `rgbif` wraps R code around the [GBIF API][gbifapi] to allow you to talk to GBIF from R.

********************

<section id="installation">

## Installation

Install rgbif


```r
install.packages("rgbif")
```

Load rgbif


```r
library("rgbif")
```

********************

<section id="usage">

## Usage

### Get number of occurrences for a set of search parameters

Search by type of record, all observational in this case


```r
occ_count(basisOfRecord='OBSERVATION')
```

```
[1] 99391054
```

Records for **Puma concolor** with lat/long data (georeferened) only


```r
occ_count(taxonKey=2435099, georeferenced=TRUE)
```

```
[1] 2664
```

All georeferenced records in GBIF


```r
occ_count(georeferenced=TRUE)
```

```
[1] 372806248
```

Records from Denmark


```r
occ_count(country='DENMARK')
```

```
[1] 8642028
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
[1] 32203523
```

********************

### Get possible values to be used in taxonomic rank arguments in functions


```r
taxrank()
```

```
[1] "kingdom"       "phylum"        "class"         "order"        
[5] "family"        "genus"         "species"       "infraspecific"
```

********************

### Search for taxon information

Search for a genus


```r
head(name_lookup(query='Cnaemidophorus', rank="genus", return="data"))
```

```
        key  nubKey parentKey        parent  kingdom     phylum   clazz
1 116755723 1858636 110614854 Pterophoridae Animalia Arthropoda Insecta
2   1858636 1858636      8863 Pterophoridae Animalia Arthropoda Insecta
3 125802004 1858636 125793784 Pterophoridae     <NA>       <NA> Insecta
4 131295800 1858636        NA          <NA>     <NA>       <NA>    <NA>
5 127882857 1858636 127804516 Pterophoridae Animalia Arthropoda Insecta
6 115123697 1858636        NA          <NA>     <NA>       <NA>    <NA>
        order        family          genus kingdomKey phylumKey  classKey
1 Lepidoptera Pterophoridae Cnaemidophorus  116630539 116762374 131743724
2 Lepidoptera Pterophoridae Cnaemidophorus          1        54       216
3 Lepidoptera Pterophoridae Cnaemidophorus         NA        NA 131714461
4        <NA>          <NA> Cnaemidophorus         NA        NA        NA
5 Lepidoptera Pterophoridae Cnaemidophorus  127795487 127795488 127795683
6        <NA>          <NA> Cnaemidophorus         NA        NA        NA
   orderKey familyKey  genusKey  canonicalName       authorship   nameType
1 116843281 110614854 116755723 Cnaemidophorus Wallengren, 1862 WELLFORMED
2       797      8863   1858636 Cnaemidophorus Wallengren, 1862 WELLFORMED
3 125810165 125793784 125802004 Cnaemidophorus Wallengren, 1862 WELLFORMED
4        NA        NA 131295800 Cnaemidophorus                  WELLFORMED
5 127795981 127804516 127882857 Cnaemidophorus                  WELLFORMED
6        NA        NA 115123697 Cnaemidophorus                  WELLFORMED
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
head(name_lookup(query='mammalia')$data)
```

```
        key nubKey parentKey        parent   phylum         clazz
1 125798198    359 131712102      Chordata Chordata      Mammalia
2 116665331    359 116842680      Chordata Chordata      Mammalia
3       359    359        44      Chordata Chordata      Mammalia
4 125826646    359 131712102      Chordata Chordata      Mammalia
5 131754503    359 131754502 Macroscelidea Chordata Macroscelidea
6 102402290    359 102545028      Chordata Chordata      Mammalia
  phylumKey  classKey canonicalName     authorship   nameType  rank
1 131712102 125798198      Mammalia                WELLFORMED CLASS
2 116842680 116665331      Mammalia Linnaeus, 1758 WELLFORMED CLASS
3        44       359      Mammalia Linnaeus, 1758 WELLFORMED CLASS
4 131712102 125826646      Mammalia Linnaeus, 1758 WELLFORMED CLASS
5 116842680 131754502      Mammalia                WELLFORMED ORDER
6 102545028 102402290      Mammalia                WELLFORMED CLASS
  numOccurrences  kingdom kingdomKey    order  orderKey
1              0     <NA>         NA     <NA>        NA
2              0 Animalia  116630539     <NA>        NA
3              0 Animalia          1     <NA>        NA
4              0     <NA>         NA     <NA>        NA
5              0 Animalia  116630539 Mammalia 131754503
6              0 Animalia  101719444     <NA>        NA
```

Look up the species Helianthus annuus


```r
head(name_lookup('Helianthus annuus', rank="species")$data)
```

```
        key  nubKey parentKey     parent       kingdom     order
1 116845199 3119195 116853573 Helianthus       Plantae Asterales
2   3119195 3119195   3119134 Helianthus       Plantae Asterales
3 125790787 3119195 125809269 Helianthus          <NA> Asterales
4 106239436 3119195 106239325 Helianthus Viridiplantae Asterales
5 128399814 3119195 131338207 Helianthus          <NA>      <NA>
6 111449704 3119195 111449703 Helianthus       Plantae      <NA>
      family      genus kingdomKey  orderKey familyKey  genusKey
1 Asteraceae Helianthus  116668764 116852024 116856030 116853573
2 Asteraceae Helianthus          6       414      3065   3119134
3 Asteraceae Helianthus         NA 131717243 125799038 125809269
4 Asteraceae Helianthus  106147210 106237428 106237535 106239325
5       <NA> Helianthus         NA        NA        NA 131338207
6 Compositae Helianthus  111449174        NA 111442813 111449703
      canonicalName authorship   nameType    rank numOccurrences
1 Helianthus annuus         L. WELLFORMED SPECIES              0
2 Helianthus annuus         L. WELLFORMED SPECIES              0
3 Helianthus annuus         L. WELLFORMED SPECIES              0
4 Helianthus annuus            WELLFORMED SPECIES              0
5 Helianthus annuus            WELLFORMED SPECIES              0
6 Helianthus annuus         L. WELLFORMED SPECIES              0
         phylum         clazz phylumKey  classKey
1          <NA>          <NA>        NA        NA
2 Magnoliophyta Magnoliopsida        49       220
3          <NA>          <NA>        NA        NA
4  Streptophyta          <NA> 106171079        NA
5          <NA>          <NA>        NA        NA
6 Spermatophyta Dicotyledones 111449175 111449177
```

********************

### Get data for a single occurrence. Note that data is returned as a list, with slots for metadata and data, or as a hierarchy, or just data.

Just data


```r
occ_get(key=855998194, return='data')
```

```
              name      key decimalLatitude decimalLongitude
1 Sciurus vulgaris 8.56e+08           58.41            12.04
```

Just taxonomic hierarchy


```r
occ_get(key=855998194, return='hier')
```

```
              name     key    rank
1         Animalia       1 kingdom
2         Chordata      44  phylum
3         Mammalia     359   class
4         Rodentia    1459   order
5        Sciuridae    9456  family
6          Sciurus 2437489   genus
7 Sciurus vulgaris 5219668 species
```

All data, or leave return parameter blank


```r
occ_get(key=855998194, return='all')
```

```
$hierarchy
              name     key    rank
1         Animalia       1 kingdom
2         Chordata      44  phylum
3         Mammalia     359   class
4         Rodentia    1459   order
5        Sciuridae    9456  family
6          Sciurus 2437489   genus
7 Sciurus vulgaris 5219668 species

$data
              name      key decimalLatitude decimalLongitude
1 Sciurus vulgaris 8.56e+08           58.41            12.04
```

Get many occurrences. `occ_get` is vectorized


```r
occ_get(key=c(101010,855998194,49819470), return='data')
```

```
                    name       key decimalLatitude decimalLongitude
1    Platydoras costatus    101010           -4.35           -70.07
2       Sciurus vulgaris 855998194           58.41            12.04
3 Phlogophora meticulosa  49819470           55.72            13.28
```

********************

### Maps

Static map using the ggplot2 package

Make a map of **Puma concolor** occurrences


```r
key <- name_backbone(name='Puma concolor', kingdom='plants')$speciesKey
dat <- occ_search(taxonKey=key, return='data', limit=300)
dat$name <- "Puma concolor" # so that we just get one symbol type
gbifmap(input=dat)
```

![plot of chunk gbifmap1](../assets/tutorial-images/rgbif/gbifmap1.png) 

[gbifapi]: http://www.gbif.org/developer/summary


<section id="citing">

## Citing

To cite `rgbif` in publications use:

<br>

> Scott Chamberlain, Carl Boettiger, Karthik Ram, Vijay Barve and Dan Mcglinn (2014). rgbif: Interface to the Global Biodiversity Information Facility API. R package version 0.6.3. https://github.com/ropensci/rgbif

<section id="license_bugs">

## License and bugs

* License: [CC0](http://creativecommons.org/choose/zero/)
* Report bugs at [our Github repo for rgbif](https://github.com/ropensci/rgbif/issues?state=open)

[Back to top](#top)
