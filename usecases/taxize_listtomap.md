---
title: From a species list to cleaning names to a map of their occurrences
pkg: taxize
layout: usecases
---





Load libraries


```r
library("taxize")
```


Most of us will start out with a species list, something like the one below. Note that each of the names is spelled incorrectly.


```r
splist <- c("Helanthus annuus", "Pinos contorta", "Collomia grandiflorra", "Abies magnificaa",
    "Rosa california", "Datura wrighti", "Mimulus bicolour", "Nicotiana glauca",
    "Maddia sativa", "Bartlettia scapposa")
```


There are many ways to resolve taxonomic names in taxize. Of course, the ideal name resolver will do the work behind the scenes for you so that you don't have to do things like fuzzy matching. There are a few services in taxize like this we can choose from: the Global Names Resolver service from EOL (see function `gnr_reso`) and the Taxonomic Name Resolution Service from iPlant (see function `tnrs`). In this case let's use the function `tnrs`.

The tnrs function accepts a vector of 1 or more


```r
splist_tnrs <- tnrs(query = splist, getpost = "POST", source = "iPlant_TNRS")
```


Remove some fields


```r
(splist_tnrs <- splist_tnrs[, !names(splist_tnrs) %in% c("matchedname", "annotations",
    "uri")])
```

```
##            submittedname         acceptedname    sourceid score
## 3       Helanthus annuus    Helianthus annuus iPlant_TNRS  0.98
## 1         Pinos contorta       Pinus contorta iPlant_TNRS  0.96
## 4  Collomia grandiflorra Collomia grandiflora iPlant_TNRS  0.99
## 5       Abies magnificaa      Abies magnifica iPlant_TNRS  0.98
## 10       Rosa california     Rosa californica iPlant_TNRS  0.99
## 9         Datura wrighti      Datura wrightii iPlant_TNRS  0.98
## 7       Mimulus bicolour      Mimulus bicolor iPlant_TNRS  0.98
## 8       Nicotiana glauca     Nicotiana glauca iPlant_TNRS     1
## 6          Maddia sativa         Madia sativa iPlant_TNRS  0.97
## 2    Bartlettia scapposa   Bartlettia scaposa iPlant_TNRS  0.98
```



* Note the scores. They suggest that there were no perfect matches, but they were all very close, ranging from 0.77 to 0.99 (1 is the highest). Let's assume the names in the `acceptedName` column are correct (and they should be).

Here's our updated species list


```r
(splist <- as.character(splist_tnrs$acceptedname))
```

```
##  [1] "Helianthus annuus"    "Pinus contorta"       "Collomia grandiflora"
##  [4] "Abies magnifica"      "Rosa californica"     "Datura wrightii"
##  [7] "Mimulus bicolor"      "Nicotiana glauca"     "Madia sativa"
## [10] "Bartlettia scaposa"
```


Another thing we may want to do is collect common names for our taxa.


```r
tsns <- get_tsn(searchterm = splist, searchtype = "sciname", verbose = FALSE)
comnames <- lapply(tsns, getcommonnamesfromtsn)
```


Unfortunately, common names are not standardized like species names, so there are multiple common names for each taxon.


```r
sapply(comnames, length)
```

```
##  [1] 3 3 3 3 3 3 3 3 3 3
```


So let's just take the first common name for each species


```r
comnames_vec <- do.call(c, lapply(comnames, function(x) as.character(x[1, "comname"])))
```


And we can make a data.frame of our scientific and common names


```r
(allnames <- data.frame(spname = splist, comname = comnames_vec))
```

```
##                  spname                       comname
## 1     Helianthus annuus              common sunflower
## 2        Pinus contorta                lodgepole pine
## 3  Collomia grandiflora        largeflowered collomia
## 4       Abies magnifica                    golden fir
## 5      Rosa californica           California wildrose
## 6       Datura wrightii            sacred thorn-apple
## 7       Mimulus bicolor yellow and white monkeyflower
## 8      Nicotiana glauca                  tree tobacco
## 9          Madia sativa                 coast tarweed
## 10   Bartlettia scaposa                Bartlett daisy
```


Another common task is getting the taxonomic tree upstream from your study taxa. We often know what family or order our taxa are in, but it we often don't know the tribes, subclasses, and superfamilies. taxize provides many avenues to getting classifications. Two of them are accessible via a single function (`classification`): the Integrated Taxonomic Information System (ITIS) and National Center for Biotechnology Information (NCBI); and via the Catalogue of Life (see function `col_classification`):

Let's get classifications from ITIS using Taxonomic Serial Numbers. Note that we could use uBio instead.


```r
class_list <- classification(tsns)
```


We can attach these names to our allnames data.frame


```r
library("plyr")
gethiernames <- function(x) {
    temp <- x[, c("rank", "name")]
    values <- data.frame(t(temp[, 2]))
    names(values) <- temp[, 1]
    values
}
class_df <- ldply(class_list, gethiernames)
```



```r
allnames_df <- merge(allnames, class_df, by.x = "spname", by.y = "Species")
```


Now that we have allnames_df, we can start to see some relationships among species simply by their shared taxonomic names.


```r
allnames_df[1:2, ]
```

```
##               spname        comname    .id Kingdom     Subkingdom
## 1    Abies magnifica     golden fir 181834 Plantae Viridaeplantae
## 2 Bartlettia scaposa Bartlett daisy  36822 Plantae Viridaeplantae
##   Infrakingdom     Division     Subdivision Infradivision         Class
## 1 Streptophyta Tracheophyta Spermatophytina  Gymnospermae     Pinopsida
## 2 Streptophyta Tracheophyta Spermatophytina  Angiospermae Magnoliopsida
##   Superorder     Order     Family      Genus
## 1       <NA>   Pinales   Pinaceae      Abies
## 2  Asteranae Asterales Asteraceae Bartlettia
```


Using the species list, with the corrected names, we can now search for occurrence data. The Global Biodiversity Information Facility (GBIF) has the largest collection of records data, and has a  API that we can interact with programmatically from R.


```r
library("rgbif")
library("ggplot2")
```


### Get occurences


```r
keys <- sapply(as.character(allnames$spname[1:5]), function(x) name_backbone(x)$speciesKey)
res <- occ_search(keys, hasCoordinate = TRUE, limit = 100, return = "data")
df <- ldply(res)
```


### Make a map


```r
gbifmap(df) +
  theme_grey(base_size = 16) +
  theme(legend.position = "bottom", legend.key = element_blank()) +
  guides(col = guide_legend(nrow = 2))
```

![plot of chunk unnamed-chunk-16](../assets/usecases-images/unnamed-chunk-16.png) 
