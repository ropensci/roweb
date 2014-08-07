---
title: spocc tutorial
layout: tutorial
packge_version: 0.2.0
---



The rOpenSci projects aims to provide programmatic access to scientific data repositories on the web. A vast majority of the packages in our current suite retrieve some form of biodiversity or taxonomic data. Since several of these datasets have been georeferenced, it provides numerous opportunities for visualizing species distributions, building species distribution maps, and for using it analyses such as species distribution models. In an effort to streamline access to these data, we have developed a package called Spocc, which provides a unified API to all the biodiversity sources that we provide. The obvious advantage is that a user can interact with a common API and not worry about the nuances in syntax that differ between packages. As more data sources come online, users can access even more data without significant changes to their code. However, it is important to note that spocc will never replicate the full functionality that exists within specific packages. Therefore users with a strong interest in one of the specific data sources listed below would benefit from familiarising themselves with the inner working of the appropriate packages.

### Data Sources

`spocc` currently interfaces with six major biodiversity repositories

1. Global Biodiversity Information Facility (`rgbif`)
[GBIF](http://www.gbif.org/) is a government funded open data repository with several partner organizations with the express goal of providing access to data on Earth's biodiversity. The data are made available by a network of member nodes, coordinating information from various participant organizations and government agencies.

2. [Berkeley Ecoengine](http://ecoengine.berkeley.edu/) (`ecoengine`)
The ecoengine is an open API built by the [Berkeley Initiative for Global Change Biology](http://globalchange.berkeley.edu/). The repository provides access to over 3 million specimens from various Berkeley natural history museums. These data span more than a century and provide access to georeferenced specimens, species checklists, photographs, vegetation surveys and resurveys and a variety of measurements from environmental sensors located at reserves across University of California's natural reserve system.

3. [iNaturalist](http://www.inaturalist.org/) (`rinat`)
iNaturalist provides access to crowd sourced citizen science data on species observations.

5. [Biodiversity Information Serving Our Nation](http://bison.usgs.ornl.gov/) (`rbison`)
Built by the US Geological Survey's core science analytic team, BISON is a portal that provides access to species occurrence data from several participating institutions.

6. [eBird](http://ebird.org/content/ebird/) (`rebird`)
ebird is a database developed and maintained by the Cornell Lab of Ornithology and the National Audubon Society. It provides real-time access to checklist data, data on bird abundance and distribution, and communtiy reports from birders.

7. [AntWeb](http://antweb.org) (`AntWeb`)
AntWeb is the world's largest online database of images, specimen records, and natural history information on ants. It is community driven and open to contribution from anyone with specimen records, natural history comments, or images.

__Note:__ It's important to keep in mind that several data providers interface with many of the above mentioned repositories. This means that occurence data obtained from BISON may be duplicates of data that are also available through GBIF. We do not have a way to resolve these duplicates or overlaps at this time but it is an issue we are hoping to resolve in future versions of the package.


### Data retrieval

The most significant function in spocc is the `occ` (short for occurrence) function. `occ` takes a query, often a species name, and searches across all data sources specified in the `from` argument. For example, one can search for all occurrences of [Sharp-shinned Hawks](http://www.allaboutbirds.org/guide/sharp-shinned_hawk/id) (_Accipiter striatus_) from the GBIF database with the following R call.


```r
library('spocc')
(df <- occ(query = 'Accipiter striatus', from = 'gbif'))
```

```
## Summary of results - occurrences found for: 
##  gbif  : 25 records across 1 species 
##  bison :  0 records across 1 species 
##  inat  :  0 records across 1 species 
##  ebird :  0 records across 1 species 
##  ecoengine :  0 records across 1 species 
##  antweb :  0 records across 1 species
```

```r
df$gbif
```

```
## Species [Accipiter striatus (25)] 
## First 10 rows of [Accipiter_striatus]
## 
##                  name longitude latitude prov       key
## 1  Accipiter striatus    -72.53    43.13 gbif 891035349
## 2  Accipiter striatus    -97.20    32.86 gbif 891038901
## 3  Accipiter striatus    -97.65    30.16 gbif 891040018
## 4  Accipiter striatus    -71.73    18.27 gbif 891035119
## 5  Accipiter striatus   -122.44    37.49 gbif 891040169
## 6  Accipiter striatus    -76.64    41.86 gbif 891043765
## 7  Accipiter striatus    -73.07    43.63 gbif 891048899
## 8  Accipiter striatus    -99.10    26.49 gbif 891049443
## 9  Accipiter striatus   -117.15    32.70 gbif 891056214
## 10 Accipiter striatus    -97.88    26.10 gbif 891050439
## ..                ...       ...      ...  ...       ...
```

The data returned are part of a `S3` class called `occdat`. This class has slots for the five data sources described above. One can easily switch the source by changing the `from` parameter in the function call above.

Within each data source is the set of species queried. In the above example, we only asked for occurrence data for one species, but we could have asked for any number. Let's say we asked for data for two species: _Accipiter striatus_, and _Pinus contorta_. Then the structure of the response would be

```
response -- |
            | -- gbif ------- |
                              | -- Accipiter_striatus
                              | -- Pinus_contorta

            | -- ecoengine -- |
                              | -- Accipiter_striatus
                              | -- Pinus_contorta

            | -- inat ------- |
                              | -- Accipiter_striatus
                              | -- Pinus_contorta

            | -- bison ------ |
                              | -- Accipiter_striatus
                              | -- Pinus_contorta

            | -- ebird ------ |
                              | -- Accipiter_striatus
                              | -- Pinus_contorta

            | -- antweb ----- |
                              | -- Accipiter_striatus
                              | -- Pinus_contorta

```

If you only request data from gbif, like `from = 'gbif'`, then the other four source slots are present in the response object, but have no data.

You can quickly get just the data by indexing to the data element, like


```r
head(df$gbif$data$Accipiter_striatus)
```

```
##                 name      key decimalLatitude decimalLongitude prov
## 1 Accipiter striatus 8.91e+08           43.13           -72.53 gbif
## 2 Accipiter striatus 8.91e+08           32.86           -97.20 gbif
## 3 Accipiter striatus 8.91e+08           30.16           -97.65 gbif
## 4 Accipiter striatus 8.91e+08           18.27           -71.73 gbif
## 5 Accipiter striatus 8.91e+08           37.49          -122.44 gbif
## 6 Accipiter striatus 8.91e+08           41.86           -76.64 gbif
```

When you get data from multiple providers, the fields returned are slightly different, e.g.:


```r
df <- occ(query = 'Accipiter striatus', from = c('gbif', 'ecoengine'))
df$gbif
```

```
## Species [Accipiter striatus (25)] 
## First 10 rows of [Accipiter_striatus]
## 
##                  name longitude latitude prov       key
## 1  Accipiter striatus    -72.53    43.13 gbif 891035349
## 2  Accipiter striatus    -97.20    32.86 gbif 891038901
## 3  Accipiter striatus    -97.65    30.16 gbif 891040018
## 4  Accipiter striatus    -71.73    18.27 gbif 891035119
## 5  Accipiter striatus   -122.44    37.49 gbif 891040169
## 6  Accipiter striatus    -76.64    41.86 gbif 891043765
## 7  Accipiter striatus    -73.07    43.63 gbif 891048899
## 8  Accipiter striatus    -99.10    26.49 gbif 891049443
## 9  Accipiter striatus   -117.15    32.70 gbif 891056214
## 10 Accipiter striatus    -97.88    26.10 gbif 891050439
## ..                ...       ...      ...  ...       ...
```

```r
df$ecoengine
```

```
## Species [Accipiter striatus (25)] 
## First 10 rows of [Accipiter_striatus]
## 
##                        name longitude latitude      prov    type
## 1  Accipiter striatus velox    -81.52    41.08 ecoengine Feature
## 2  Accipiter striatus velox   -135.27    57.53 ecoengine Feature
## 3  Accipiter striatus velox   -134.29    57.71 ecoengine Feature
## 4  Accipiter striatus velox   -134.29    57.71 ecoengine Feature
## 5  Accipiter striatus velox   -148.24    60.55 ecoengine Feature
## 6  Accipiter striatus velox   -145.82    61.11 ecoengine Feature
## 7  Accipiter striatus velox   -148.24    60.55 ecoengine Feature
## 8  Accipiter striatus velox   -133.77    58.01 ecoengine Feature
## 9  Accipiter striatus velox   -133.84    58.52 ecoengine Feature
## 10 Accipiter striatus velox   -133.84    58.52 ecoengine Feature
## ..                      ...       ...      ...       ...     ...
## Variables not shown: url (chr), observation_type (chr), country (chr),
##      state_province (chr), begin_date (time), end_date (time), source
##      (chr), remote_resource (chr)
```

We provide a function `occ2df` that pulls out a few key columns needed for making maps:


```r
combined <- occ2df(df)
head(combined); tail(combined)
```

```
##                 name longitude latitude prov
## 1 Accipiter striatus    -72.53    43.13 gbif
## 2 Accipiter striatus    -97.20    32.86 gbif
## 3 Accipiter striatus    -97.65    30.16 gbif
## 4 Accipiter striatus    -71.73    18.27 gbif
## 5 Accipiter striatus   -122.44    37.49 gbif
## 6 Accipiter striatus    -76.64    41.86 gbif
```

```
##                        name longitude latitude      prov
## 45 Accipiter striatus velox    -72.52    43.62 ecoengine
## 46 Accipiter striatus velox    -71.57    42.61 ecoengine
## 47 Accipiter striatus velox    -71.58    42.50 ecoengine
## 48 Accipiter striatus velox    -71.58    42.50 ecoengine
## 49 Accipiter striatus velox   -113.75    48.63 ecoengine
## 50 Accipiter striatus velox    -92.93    36.25 ecoengine
```


### Fix names

One problem you often run in to is that there can be various names for the same taxon in any one source. For example:


```r
df <- occ(query='Pinus contorta', from=c('gbif','inat'), limit = 50)
print(df$inat, n=20)
```

```
## Species [Pinus contorta (50)] 
## First 10 rows of [Pinus_contorta]
## 
##                        name longitude latitude prov
## 1            Pinus contorta    -109.5    40.83 inat
## 2            Pinus contorta    -120.2    39.43 inat
## 3            Pinus contorta    -120.3    39.34 inat
## 4            Pinus contorta    -110.7    43.78 inat
## 5            Pinus contorta    -110.5    44.72 inat
## 6            Pinus contorta    -110.8    44.46 inat
## 7            Pinus contorta    -110.8    44.55 inat
## 8            Pinus contorta    -110.8    44.59 inat
## 9            Pinus contorta    -111.1    44.66 inat
## 10           Pinus contorta    -110.7    44.11 inat
## 11           Pinus contorta    -118.7    37.46 inat
## 12           Pinus contorta    -120.2    39.43 inat
## 13           Pinus contorta    -120.2    39.43 inat
## 14 Pinus contorta latifolia    -116.1    51.19 inat
## 15         Letharia vulpina    -116.3    51.36 inat
## 16           Pinus contorta    -120.5    39.62 inat
## 17 Pinus contorta murrayana    -120.0    38.67 inat
## 18           Pinus contorta    -122.1    42.71 inat
## 19           Pinus contorta    -122.3    47.67 inat
## 20           Pinus contorta    -122.3    47.66 inat
## ..                      ...       ...      ...  ...
## Variables not shown: Datetime (chr), Description (chr), Place.guess (chr),
##      Tag.list (chr), Common.name (chr), Url (chr), Image.url (chr),
##      User.login (chr), Id (int), Species.guess (chr), Iconic.taxon.name
##      (chr), Taxon (int), Id.please (chr), Num.identification.agreements
##      (int), Num.identification.disagreements (int), Observed.on.string
##      (chr), Observed.on (chr), Time.observed.at (chr), Time.zone (chr),
##      Positional.accuracy (int), Geoprivacy (chr), Positioning.method
##      (chr), Positioning.device (chr), Out.of.range (chr), User (int),
##      Created.at (chr), Updated.at (chr), Quality.grade (chr), License
##      (chr)
```

This is fine, but when trying to make a map in which points are colored for each taxon, you can have many colors for a single taxon, where instead one color per taxon is more appropriate. There is a function in `spocc` called `fixnames`, which has a few options in which you can take the shortest names (usually just the plain binomials like _Homo sapiens_), or the original name queried, or a vector of names supplied by the user.


```r
df <- fixnames(df, how = 'query')
print(df$inat, n=20)
```

```
## Species [Pinus contorta (50)] 
## First 10 rows of [Pinus_contorta]
## 
##              name longitude latitude prov                  Datetime
## 1  Pinus contorta    -109.5    40.83 inat 2014-08-05 18:53:25 +0000
## 2  Pinus contorta    -120.2    39.43 inat 2014-07-18 00:00:00 +0000
## 3  Pinus contorta    -120.3    39.34 inat 2014-08-02 23:05:00 +0000
## 4  Pinus contorta    -110.7    43.78 inat 2014-08-02 17:40:58 +0000
## 5  Pinus contorta    -110.5    44.72 inat 2014-08-01 16:29:48 +0000
## 6  Pinus contorta    -110.8    44.46 inat 2014-07-31 22:09:48 +0000
## 7  Pinus contorta    -110.8    44.55 inat 2014-07-31 19:46:23 +0000
## 8  Pinus contorta    -110.8    44.59 inat 2014-07-31 18:50:05 +0000
## 9  Pinus contorta    -111.1    44.66 inat 2014-07-31 17:56:38 +0000
## 10 Pinus contorta    -110.7    44.11 inat 2014-08-02 16:21:43 +0000
## 11 Pinus contorta    -118.7    37.46 inat 2014-07-29 15:22:43 +0000
## 12 Pinus contorta    -120.2    39.43 inat 2014-06-25 00:00:00 +0000
## 13 Pinus contorta    -120.2    39.43 inat 2014-07-09 20:49:41 +0000
## 14 Pinus contorta    -116.1    51.19 inat 2014-07-08 00:00:00 +0000
## 15 Pinus contorta    -116.3    51.36 inat 2014-07-06 00:00:00 +0000
## 16 Pinus contorta    -120.5    39.62 inat 2014-06-24 15:39:56 +0000
## 17 Pinus contorta    -120.0    38.67 inat 2014-06-18 22:28:02 +0000
## 18 Pinus contorta    -122.1    42.71 inat 2014-06-17 00:54:22 +0000
## 19 Pinus contorta    -122.3    47.67 inat 2014-06-02 00:00:00 +0000
## 20 Pinus contorta    -122.3    47.66 inat 2014-04-28 00:00:00 +0000
## ..            ...       ...      ...  ...                       ...
## Variables not shown: Description (chr), Place.guess (chr), Tag.list (chr),
##      Common.name (chr), Url (chr), Image.url (chr), User.login (chr), Id
##      (int), Species.guess (chr), Iconic.taxon.name (chr), Taxon (int),
##      Id.please (chr), Num.identification.agreements (int),
##      Num.identification.disagreements (int), Observed.on.string (chr),
##      Observed.on (chr), Time.observed.at (chr), Time.zone (chr),
##      Positional.accuracy (int), Geoprivacy (chr), Positioning.method
##      (chr), Positioning.device (chr), Out.of.range (chr), User (int),
##      Created.at (chr), Updated.at (chr), Quality.grade (chr), License
##      (chr)
```

```r
df_comb <- occ2df(df)
head(df_comb); tail(df_comb)
```

```
##             name longitude latitude prov
## 1 Pinus contorta    -122.8    48.14 gbif
## 2 Pinus contorta    -120.0    38.82 gbif
## 3 Pinus contorta    -120.3    39.34 gbif
## 4 Pinus contorta    -120.2    39.20 gbif
## 5 Pinus contorta    -122.3    47.66 gbif
## 6 Pinus contorta    -120.2    39.32 gbif
```

```
##               name longitude latitude prov
## 95  Pinus contorta    -120.2    39.20 inat
## 96  Pinus contorta    -120.2    39.20 inat
## 97  Pinus contorta    -120.3    39.34 inat
## 98  Pinus contorta    -122.2    37.90 inat
## 99  Pinus contorta    -120.3    39.34 inat
## 100 Pinus contorta    -120.5    39.62 inat
```

### Visualization routines

__Interactive maps__

_Leaflet.js_

[Leaflet JS](http://leafletjs.com/) is an open source mapping library that can leverage various layers from multiple sources. Using the [`leafletR`](http://cran.r-project.org/web/packages/leafletR/index.html) library, it's possible to generate a local `geoJSON` file and a html file of species distribution maps. The folder can easily be moved to a web server and served widely without any additional coding.

It's also possible to render similar maps with Mapbox by committing just the geoJSON file to GitHub or posting it as a gist on GitHub. All the remaining fields will become part of a table inside a tooltip, providing a extremely quick and easy way to serve up interactive maps. This is especially useful when users do not have their own web hosting options.

Here is an example of making a leaflet map:


```r
spp <- c('Danaus plexippus','Accipiter striatus','Pinus contorta')
dat <- occ(query = spp, from = 'gbif', gbifopts = list(hasCoordinate = TRUE))
mapleaflet(dat, dest = ".")
```

![](../assets/tutorial-images/spocc/leaflet.png)

_Geojson map as a Github gist_

You can also create interactive maps via the `mapgist` function. You have to have a Github account to use this function. Github accounts are free though, and great for versioning and collaborating on code or papers. When you run the `mapgist` function it will ask for your Github username and password. You can alternatively store those in your `.Rprofile` file by adding entries for username (`options(github.username = 'username')`) and password (`options(github.password = 'password')`).


```r
spp <- c('Danaus plexippus','Accipiter striatus','Pinus contorta')
dat <- occ(query = spp, from = 'gbif', gbifopts = list(hasCoordinate = TRUE))
dat <- fixnames(dat)
mapgist(data = dat, color = c("#976AAE", "#6B944D", "#BD5945"))
```
  
![](../assets/tutorial-images/spocc/gist.png)

__Static maps__

_base plots_

Base plots, or the built in plotting facility in R accessed via `plot()`, is quite fast, but not easy or efficient to use, but are good for a quick glance at some data.


```r
spnames <- c('Accipiter striatus', 'Setophaga caerulescens', 'Spinus tristis')
out <- occ(query = spnames, from = 'gbif', gbifopts = list(hasCoordinate = TRUE))
plot(out, cex = 1, pch = 10)
```

![](../assets/tutorial-images/spocc/baseplots.png)

_ggplot2_

`ggplot2` is a powerful package for making visualizations in R. Read more about it [here](http://docs.ggplot2.org/0.9.3.1/). We created a simple wrapper function `mapggplot` to make a ggplot2 map from occurrence data using the `ggmap` package, which is built on top of `ggplot2`. Here's an example:


```r
ecoengine_data <- occ(query = 'Lynx rufus californicus', from = 'ecoengine')
mapggplot(ecoengine_data)
```

![](../assets/tutorial-images/spocc/ggplot2.png)

### Upcoming features

* As soon as we have an updated `rvertnet` package, we'll add the ability to query VertNet data from `spocc`.
* We will add `rCharts` as an official import once the package is on CRAN (Eta end of March)
* We're helping on a new package `rMaps` to make interactive maps using various Javascript mapping libraries, which will give access to a variety of awesome interactive maps. We will integrate `rMaps` once it's on CRAN.
* We'll add a function to make interactive maps using RStudio's Shiny in a future version.


<section id="citing">

## Citing

To cite `spocc` in publications use:

<br>

> Scott Chamberlain, Karthik Ram and Ted Hart (2014). spocc: R interface to many species occurrence data sources. R package version 0.2.0. https://github.com/ropensci/spocc

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for spocc](https://github.com/ropensci/spocc/issues?state=open)

[Back to top](#top)
