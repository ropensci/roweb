---
title: rgbif tutorial
layout: tutorial
packge_version: 0.7.7
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

## Number of occurrences

Search by type of record, all observational in this case


```r
occ_count(basisOfRecord='OBSERVATION')
#> [1] 100350449
```

Records for **Puma concolor** with lat/long data (georeferened) only. Note that `hasCoordinate` in `occ_search()` is the same as `georeferenced` in `occ_count()`.


```r
occ_count(taxonKey=2435099, georeferenced=TRUE)
#> [1] 2720
```

All georeferenced records in GBIF


```r
occ_count(georeferenced=TRUE)
#> [1] 449118753
```

Records from Denmark


```r
denmark_code <- isocodes[grep("Denmark", isocodes$name), "code"]
occ_count(country=denmark_code)
#> [1] 8734941
```

Number of records in a particular dataset


```r
occ_count(datasetKey='9e7ea106-0bf8-4087-bb61-dfe4f29e0f17')
#> [1] 4591
```

All records from 2012


```r
occ_count(year=2012)
#> [1] 36173316
```

Records for a particular dataset, and only for preserved specimens


```r
occ_count(datasetKey='e707e6da-e143-445d-b41d-529c4a777e8b', basisOfRecord='OBSERVATION')
#> [1] 2120907
```

## Search for taxon names

Get possible values to be used in taxonomic rank arguments in functions


```r
taxrank()
#> [1] "kingdom"       "phylum"        "class"         "order"        
#> [5] "family"        "genus"         "species"       "infraspecific"
```

`name_lookup()` does full text search of name usages covering the scientific and vernacular name, the species description, distribution and the entire classification across all name usages of all or some checklists. Results are ordered by relevance as this search usually returns a lot of results.

By default `name_lookup()` returns five slots of information: meta, data, facets, hierarchies, and names. hierarchies and names elements are named by their matching GBIF key in the `data.frame` in the data slot.


```r
out <- name_lookup(query='mammalia')
```


```r
names(out)
#> [1] "meta"        "data"        "facets"      "hierarchies" "names"
```


```r
out$meta
#>   offset limit endOfRecords  count
#> 1      0   100        FALSE 122151
```


```r
head(out$data)
#>         key nubKey parentKey        parent   phylum phylumKey  classKey
#> 1 125798198    359 137006861      Chordata Chordata 137006861 125798198
#> 2 116665331    359 116842680      Chordata Chordata 116842680 116665331
#> 3       359    359        44      Chordata Chordata        44       359
#> 4 125826646    359 137006861      Chordata Chordata 137006861 125826646
#> 5 137066410    359 137066409 Macroscelidea Chordata 116842680 137066409
#> 6 102402290    359 102545028      Chordata Chordata 102545028 102402290
#>   canonicalName     authorship   nameType  rank numOccurrences  kingdom
#> 1      Mammalia                WELLFORMED CLASS              0     <NA>
#> 2      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0 Animalia
#> 3      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0 Animalia
#> 4      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0     <NA>
#> 5      Mammalia                WELLFORMED ORDER              0 Animalia
#> 6      Mammalia                WELLFORMED CLASS              0 Animalia
#>   kingdomKey    order  orderKey family familyKey genus genusKey
#> 1         NA     <NA>        NA   <NA>        NA  <NA>       NA
#> 2  116630539     <NA>        NA   <NA>        NA  <NA>       NA
#> 3          1     <NA>        NA   <NA>        NA  <NA>       NA
#> 4         NA     <NA>        NA   <NA>        NA  <NA>       NA
#> 5  116630539 Mammalia 137066410   <NA>        NA  <NA>       NA
#> 6  101719444     <NA>        NA   <NA>        NA  <NA>       NA
```


```r
out$facets
#> NULL
```


```r
out$hierarchies[1:2]
#> $`125798198`
#>     rankkey     name
#> 1 137006861 Chordata
#> 
#> $`116665331`
#>     rankkey     name
#> 1 116630539 Animalia
#> 2 116842680 Chordata
```


```r
out$names[2]
#> $`116665331`
#>   vernacularName language
#> 1        Mammals  ENGLISH
```

Search for a genus


```r
head(name_lookup(query='Cnaemidophorus', rank="genus", return="data"))
#>         key  nubKey parentKey        parent  kingdom     phylum
#> 1 116755723 1858636 110614854 Pterophoridae Animalia Arthropoda
#> 2   1858636 1858636      8863 Pterophoridae Animalia Arthropoda
#> 3 125802004 1858636 125793784 Pterophoridae     <NA>       <NA>
#> 4 134773282 1858636        NA          <NA>     <NA>       <NA>
#> 5 127882857 1858636 127804516 Pterophoridae Animalia Arthropoda
#> 6 128073730 1858636 128015003       Viruses  Viruses       <NA>
#>         order        family          genus kingdomKey phylumKey  classKey
#> 1 Lepidoptera Pterophoridae Cnaemidophorus  116630539 116668755 116686069
#> 2 Lepidoptera Pterophoridae Cnaemidophorus          1        54       216
#> 3 Lepidoptera Pterophoridae Cnaemidophorus         NA        NA 137009267
#> 4        <NA>          <NA> Cnaemidophorus         NA        NA        NA
#> 5 Lepidoptera Pterophoridae Cnaemidophorus  127795487 127795488 127795683
#> 6        <NA>          <NA> Cnaemidophorus  128015003        NA        NA
#>    orderKey familyKey  genusKey  canonicalName       authorship   nameType
#> 1 116843281 110614854 116755723 Cnaemidophorus Wallengren, 1862 WELLFORMED
#> 2       797      8863   1858636 Cnaemidophorus Wallengren, 1862 WELLFORMED
#> 3 125810165 125793784 125802004 Cnaemidophorus Wallengren, 1862 WELLFORMED
#> 4        NA        NA 134773282 Cnaemidophorus                  WELLFORMED
#> 5 127795981 127804516 127882857 Cnaemidophorus                  WELLFORMED
#> 6        NA        NA 128073730 Cnaemidophorus                  WELLFORMED
#>    rank numOccurrences
#> 1 GENUS              0
#> 2 GENUS              0
#> 3 GENUS              0
#> 4 GENUS              0
#> 5 GENUS              0
#> 6 GENUS              0
```

Search for the class mammalia


```r
head(name_lookup(query='mammalia', return = 'data'))
#>         key nubKey parentKey        parent   phylum phylumKey  classKey
#> 1 125798198    359 137006861      Chordata Chordata 137006861 125798198
#> 2 116665331    359 116842680      Chordata Chordata 116842680 116665331
#> 3       359    359        44      Chordata Chordata        44       359
#> 4 125826646    359 137006861      Chordata Chordata 137006861 125826646
#> 5 137066410    359 137066409 Macroscelidea Chordata 116842680 137066409
#> 6 102402290    359 102545028      Chordata Chordata 102545028 102402290
#>   canonicalName     authorship   nameType  rank numOccurrences  kingdom
#> 1      Mammalia                WELLFORMED CLASS              0     <NA>
#> 2      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0 Animalia
#> 3      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0 Animalia
#> 4      Mammalia Linnaeus, 1758 WELLFORMED CLASS              0     <NA>
#> 5      Mammalia                WELLFORMED ORDER              0 Animalia
#> 6      Mammalia                WELLFORMED CLASS              0 Animalia
#>   kingdomKey    order  orderKey family familyKey genus genusKey
#> 1         NA     <NA>        NA   <NA>        NA  <NA>       NA
#> 2  116630539     <NA>        NA   <NA>        NA  <NA>       NA
#> 3          1     <NA>        NA   <NA>        NA  <NA>       NA
#> 4         NA     <NA>        NA   <NA>        NA  <NA>       NA
#> 5  116630539 Mammalia 137066410   <NA>        NA  <NA>       NA
#> 6  101719444     <NA>        NA   <NA>        NA  <NA>       NA
```

Look up the species Helianthus annuus


```r
head(name_lookup('Helianthus annuus', rank="species", return = 'data'))
#>         key  nubKey parentKey     parent       kingdom     order
#> 1 116845199 3119195 116853573 Helianthus       Plantae Asterales
#> 2   3119195 3119195   3119134 Helianthus       Plantae Asterales
#> 3 125790787 3119195 125809269 Helianthus          <NA> Asterales
#> 4 106239436 3119195 106239325 Helianthus Viridiplantae Asterales
#> 5 128399814 3119195 134815689 Helianthus          <NA>      <NA>
#> 6 111449704 3119195 111449703 Helianthus       Plantae      <NA>
#>       family      genus kingdomKey  orderKey familyKey  genusKey
#> 1 Asteraceae Helianthus  116668764 116852024 116856030 116853573
#> 2 Asteraceae Helianthus          6       414      3065   3119134
#> 3 Asteraceae Helianthus         NA 137012188 125799038 125809269
#> 4 Asteraceae Helianthus  106147210 106237428 106237535 106239325
#> 5       <NA> Helianthus         NA        NA        NA 134815689
#> 6 Compositae Helianthus  111449174        NA 111442813 111449703
#>       canonicalName authorship   nameType    rank numOccurrences
#> 1 Helianthus annuus         L. WELLFORMED SPECIES              0
#> 2 Helianthus annuus         L. WELLFORMED SPECIES              0
#> 3 Helianthus annuus         L. WELLFORMED SPECIES              0
#> 4 Helianthus annuus            WELLFORMED SPECIES              0
#> 5 Helianthus annuus            WELLFORMED SPECIES              0
#> 6 Helianthus annuus         L. WELLFORMED SPECIES              0
#>          phylum phylumKey  classKey
#> 1          <NA>        NA        NA
#> 2 Magnoliophyta        49       220
#> 3          <NA>        NA        NA
#> 4  Streptophyta 106171079        NA
#> 5          <NA>        NA        NA
#> 6 Spermatophyta 111449175 111449177
```

The function `name_usage()` works with lots of different name endpoints in GBIF, listed at [http://www.gbif.org/developer/species#nameUsages]().


```r
library("plyr")
out <- name_usage(key=3119195, language="FRENCH", data='vernacularNames')
compact(lapply(out$results, function(x) if(x$language=="FRENCH") x else NULL))[1:2]
#> [[1]]
#> [[1]]$vernacularName
#> [1] "grand soleil"
#> 
#> [[1]]$language
#> [1] "FRENCH"
#> 
#> [[1]]$sourceTaxonKey
#> [1] 107001935
#> 
#> [[1]]$preferred
#> [1] FALSE
#> 
#> 
#> [[2]]
#> [[2]]$vernacularName
#> [1] "grand soleil"
#> 
#> [[2]]$language
#> [1] "FRENCH"
#> 
#> [[2]]$sourceTaxonKey
#> [1] 100019171
#> 
#> [[2]]$preferred
#> [1] FALSE
```

The function `name_backbone()` is used to search against the GBIF backbone taxonomy


```r
name_backbone(name='Helianthus', rank='genus', kingdom='plants')
#> $usageKey
#> [1] 3119134
#> 
#> $scientificName
#> [1] "Helianthus L."
#> 
#> $canonicalName
#> [1] "Helianthus"
#> 
#> $rank
#> [1] "GENUS"
#> 
#> $synonym
#> [1] FALSE
#> 
#> $confidence
#> [1] 97
#> 
#> $matchType
#> [1] "EXACT"
#> 
#> $kingdom
#> [1] "Plantae"
#> 
#> $phylum
#> [1] "Magnoliophyta"
#> 
#> $order
#> [1] "Asterales"
#> 
#> $family
#> [1] "Asteraceae"
#> 
#> $genus
#> [1] "Helianthus"
#> 
#> $kingdomKey
#> [1] 6
#> 
#> $phylumKey
#> [1] 49
#> 
#> $classKey
#> [1] 220
#> 
#> $orderKey
#> [1] 414
#> 
#> $familyKey
#> [1] 3065
#> 
#> $genusKey
#> [1] 3119134
#> 
#> $class
#> [1] "Magnoliopsida"
```

The function `name_suggest()` is optimized for speed, and gives back suggested names based on query parameters.


```r
head( name_suggest(q='Puma concolor') )
#>       key                canonicalName       rank
#> 1 2435099                Puma concolor    SPECIES
#> 2 6164589       Puma concolor anthonyi SUBSPECIES
#> 3 6164590        Puma concolor couguar SUBSPECIES
#> 4 6164591    Puma concolor kaibabensis SUBSPECIES
#> 5 6164592    Puma concolor oregonensis SUBSPECIES
#> 6 6164594 Puma concolor vancouverensis SUBSPECIES
```


## Single occurrence records

Get data for a single occurrence. Note that data is returned as a list, with slots for metadata and data, or as a hierarchy, or just data.

Just data


```r
occ_get(key=766766824, return='data')
#>              name       key decimalLatitude decimalLongitude        issues
#> 1 Corvus monedula 766766824         59.4568          17.9054 depunl,gass84
```

Just taxonomic hierarchy


```r
occ_get(key=766766824, return='hier')
#>              name     key    rank
#> 1        Animalia       1 kingdom
#> 2        Chordata      44  phylum
#> 3            Aves     212   class
#> 4   Passeriformes     729   order
#> 5        Corvidae    5235  family
#> 6          Corvus 2482468   genus
#> 7 Corvus monedula 2482473 species
```

All data, or leave return parameter blank


```r
occ_get(key=766766824, return='all')
#> $hierarchy
#>              name     key    rank
#> 1        Animalia       1 kingdom
#> 2        Chordata      44  phylum
#> 3            Aves     212   class
#> 4   Passeriformes     729   order
#> 5        Corvidae    5235  family
#> 6          Corvus 2482468   genus
#> 7 Corvus monedula 2482473 species
#> 
#> $media
#> list()
#> 
#> $data
#>              name       key decimalLatitude decimalLongitude        issues
#> 1 Corvus monedula 766766824         59.4568          17.9054 depunl,gass84
```

Get many occurrences. `occ_get` is vectorized


```r
occ_get(key=c(766766824,101010,240713150,855998194,49819470), return='data')
#>                     name       key decimalLatitude decimalLongitude
#> 1        Corvus monedula 766766824        59.45680         17.90540
#> 2    Platydoras costatus    101010        -4.35000        -70.06670
#> 3                   none 240713150       -77.56670        163.58299
#> 4       Sciurus vulgaris 855998194        58.40680         12.04380
#> 5 Phlogophora meticulosa  49819470        55.72462         13.28238
#>                    issues
#> 1           depunl,gass84
#> 2          cucdmis,gass84
#> 3 cdround,gass84,txmatnon
#> 4           depunl,gass84
#> 5          cdround,gass84
```


## Search for occurrences

By default `occ_search()` returns a `dplyr` like output summary in which the data printed expands based on how much data is returned, and the size of your window. You can search by scientific name:


```r
occ_search(scientificName = "Ursus americanus", limit = 20)
#> Records found [7279] 
#> Records returned [20] 
#> No. unique hierarchies [1] 
#> No. media records [20] 
#> Args [scientificName=Ursus americanus, limit=20, offset=0, fields=all] 
#> First 10 rows of data
#> 
#>                name        key decimalLatitude decimalLongitude
#> 1  Ursus americanus  891034709        29.23322       -103.29468
#> 2  Ursus americanus 1024328693        34.20990       -118.14681
#> 3  Ursus americanus  891045574        43.73511        -72.52534
#> 4  Ursus americanus  891041363        29.28284       -103.28908
#> 5  Ursus americanus  891056344        29.27444       -103.31536
#> 6  Ursus americanus 1024180980        34.56844       -119.16081
#> 7  Ursus americanus 1024182262        50.09019       -117.46038
#> 8  Ursus americanus 1024328712        39.51185       -120.16434
#> 9  Ursus americanus  911496466        29.27817       -103.30167
#> 10 Ursus americanus  910498357        43.90460       -110.61871
#> ..              ...        ...             ...              ...
#> Variables not shown: issues (chr), datasetKey (chr), publishingOrgKey
#>      (chr), publishingCountry (chr), protocol (chr), lastCrawled (chr),
#>      lastParsed (chr), extensions (chr), basisOfRecord (chr), taxonKey
#>      (int), kingdomKey (int), phylumKey (int), classKey (int), orderKey
#>      (int), familyKey (int), genusKey (int), speciesKey (int),
#>      scientificName (chr), kingdom (chr), phylum (chr), order (chr),
#>      family (chr), genus (chr), species (chr), genericName (chr),
#>      specificEpithet (chr), taxonRank (chr), dateIdentified (chr), year
#>      (int), month (int), day (int), eventDate (chr), modified (chr),
#>      lastInterpreted (chr), references (chr), identifiers (chr), facts
#>      (chr), relations (chr), geodeticDatum (chr), class (chr), countryCode
#>      (chr), country (chr), gbifID (chr), verbatimEventDate (chr),
#>      institutionCode (chr), datasetName (chr), catalogNumber (chr),
#>      recordedBy (chr), rights (chr), occurrenceDetails (chr), rightsHolder
#>      (chr), eventTime (chr), occurrenceID (chr), identifier (chr), taxonID
#>      (chr), collectionCode (chr), identificationID (chr),
#>      infraspecificEpithet (chr), verbatimLocality (chr), occurrenceRemarks
#>      (chr), informationWithheld (chr)
```

Or to be more precise, you can search for names first, make sure you have the right name, then pass the GBIF key to the `occ_search()` function:


```r
key <- name_suggest(q='Helianthus annuus', rank='species')$key[1]
occ_search(taxonKey=key, limit=20)
#> Records found [20119] 
#> Records returned [20] 
#> No. unique hierarchies [1] 
#> No. media records [11] 
#> Args [taxonKey=3119195, limit=20, offset=0, fields=all] 
#> First 10 rows of data
#> 
#>                 name        key decimalLatitude decimalLongitude
#> 1  Helianthus annuus  922042404        -3.28140         37.52415
#> 2  Helianthus annuus  899948224         1.27890        103.79930
#> 3  Helianthus annuus 1038317691       -43.52777        172.62544
#> 4  Helianthus annuus  891052261        24.82589        -99.58411
#> 5  Helianthus annuus  922039507        50.31402          8.52341
#> 6  Helianthus annuus  922044332        21.27114         40.41424
#> 7  Helianthus annuus  998785009        44.10879          4.66839
#> 8  Helianthus annuus 1038322459       -43.07327        172.68473
#> 9  Helianthus annuus  899969160        24.82901        -99.58257
#> 10 Helianthus annuus  899970378        32.54041       -117.08731
#> ..               ...        ...             ...              ...
#> Variables not shown: issues (chr), datasetKey (chr), publishingOrgKey
#>      (chr), publishingCountry (chr), protocol (chr), lastCrawled (chr),
#>      lastParsed (chr), extensions (chr), basisOfRecord (chr), taxonKey
#>      (int), kingdomKey (int), phylumKey (int), classKey (int), orderKey
#>      (int), familyKey (int), genusKey (int), speciesKey (int),
#>      scientificName (chr), kingdom (chr), phylum (chr), order (chr),
#>      family (chr), genus (chr), species (chr), genericName (chr),
#>      specificEpithet (chr), taxonRank (chr), year (int), month (int), day
#>      (int), eventDate (chr), lastInterpreted (chr), identifiers (chr),
#>      facts (chr), relations (chr), geodeticDatum (chr), class (chr),
#>      countryCode (chr), country (chr), gbifID (chr), institutionCode
#>      (chr), catalogNumber (chr), recordedBy (chr), locality (chr),
#>      collectionCode (chr), dateIdentified (chr), modified (chr),
#>      references (chr), verbatimEventDate (chr), verbatimLocality (chr),
#>      rights (chr), rightsHolder (chr), occurrenceID (chr), taxonID (chr),
#>      occurrenceRemarks (chr), datasetName (chr), occurrenceDetails (chr),
#>      eventTime (chr), identifier (chr), identificationID (chr),
#>      identifiedBy (chr), coordinateAccuracy (dbl), elevation (dbl),
#>      elevationAccuracy (dbl), depth (dbl), depthAccuracy (dbl),
#>      stateProvince (chr), county (chr)
```

Like many functions in `rgbif`, you can choose what to return with the `return` parameter, here, just returning the metadata:


```r
occ_search(taxonKey=key, return='meta')
#>   offset limit endOfRecords count
#> 1    300   200        FALSE 20119
```

You can choose what fields to return. This isn't passed on to the API query to GBIF as they don't allow that, but we filter out the columns before we give the data back to you.


```r
occ_search(scientificName = "Ursus americanus", fields=c('name','basisOfRecord','protocol'), limit = 20)
#> Records found [7279] 
#> Records returned [20] 
#> No. unique hierarchies [1] 
#> No. media records [20] 
#> Args [scientificName=Ursus americanus, limit=20, offset=0,
#>      fields=name,basisOfRecord,protocol] 
#> First 10 rows of data
#> 
#>                name    protocol     basisOfRecord
#> 1  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
#> 2  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
#> 3  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
#> 4  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
#> 5  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
#> 6  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
#> 7  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
#> 8  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
#> 9  Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
#> 10 Ursus americanus DWC_ARCHIVE HUMAN_OBSERVATION
#> ..              ...         ...               ...
```

Most parameters are vectorized, so you can pass in more than one value:


```r
splist <- c('Cyanocitta stelleri', 'Junco hyemalis', 'Aix sponsa')
keys <- sapply(splist, function(x) name_suggest(x)$key[1], USE.NAMES=FALSE)
occ_search(taxonKey=keys, limit=5)
#> Occ. found [2482598 (355895), 2492010 (1943196), 2498387 (591646)] 
#> Occ. returned [2482598 (5), 2492010 (5), 2498387 (5)] 
#> No. unique hierarchies [2482598 (1), 2492010 (1), 2498387 (1)] 
#> No. media records [2482598 (5), 2492010 (5), 2498387 (1)] 
#> Args [taxonKey=2482598,2492010,2498387, limit=5, offset=0, fields=all] 
#> First 10 rows of data from 2482598
#> 
#>                  name       key decimalLatitude decimalLongitude
#> 1 Cyanocitta stelleri 891781350        37.73646       -122.48801
#> 2 Cyanocitta stelleri 891056081        37.76811       -122.47370
#> 3 Cyanocitta stelleri 891046151        19.29372        -98.65598
#> 4 Cyanocitta stelleri 891046529        32.82392       -116.53233
#> 5 Cyanocitta stelleri 891047537        37.86877       -122.23729
#> Variables not shown: issues (chr), datasetKey (chr), publishingOrgKey
#>      (chr), publishingCountry (chr), protocol (chr), lastCrawled (chr),
#>      lastParsed (chr), extensions (chr), basisOfRecord (chr), taxonKey
#>      (int), kingdomKey (int), phylumKey (int), classKey (int), orderKey
#>      (int), familyKey (int), genusKey (int), speciesKey (int),
#>      scientificName (chr), kingdom (chr), phylum (chr), order (chr),
#>      family (chr), genus (chr), species (chr), genericName (chr),
#>      specificEpithet (chr), taxonRank (chr), dateIdentified (chr), year
#>      (int), month (int), day (int), eventDate (chr), modified (chr),
#>      lastInterpreted (chr), references (chr), identifiers (chr), facts
#>      (chr), relations (chr), geodeticDatum (chr), class (chr), countryCode
#>      (chr), country (chr), verbatimEventDate (chr), verbatimLocality
#>      (chr), rights (chr), rightsHolder (chr), occurrenceID (chr),
#>      collectionCode (chr), taxonID (chr), gbifID (chr), institutionCode
#>      (chr), catalogNumber (chr), datasetName (chr), recordedBy (chr),
#>      occurrenceDetails (chr), eventTime (chr), identifier (chr),
#>      identificationID (chr), occurrenceRemarks (chr)
```

********************

## Maps

Static map using the ggplot2 package. Make a map of *Puma concolor* occurrences.


```r
key <- name_backbone(name='Puma concolor')$speciesKey
dat <- occ_search(taxonKey=key, return='data', limit=300)
gbifmap(input=dat)
```

![plot of chunk gbifmap1](../assets/tutorial-images/rgbif/gbifmap1-1.png) 

[gbifapi]: http://data.gbif.org/tutorial/services


<section id="citing">

## Citing

To cite `rgbif` in publications use:

<br>

> Scott Chamberlain, Carl Boettiger, Karthik Ram, Vijay Barve and Dan Mcglinn (2014). rgbif: Interface to the Global Biodiversity Information Facility API. R package version 0.7.7. https://github.com/ropensci/rgbif

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rgbif](https://github.com/ropensci/rgbif/issues?state=open)

[Back to top](#top)
