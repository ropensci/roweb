---
title: solr tutorial
layout: tutorial
packge_version: 0.1.4
---



<section id="installation">

## Installation


More stable version from CRAN


```r
install.packages("solr")
```

Development version from Github


```r
install.packages("devtools")
library(devtools)
install_github("ropensci/solr")
```

Load


```r
library("solr")
```

<section id="usage">

## Usage

The `solr` package is a general purpose R interface to [Solr](http://lucene.apache.org/solr/)

This package only deals with exracting data from a Solr endpoint, not writing data (pull request or holla if you're interested in writing solr data).

### Solr info

+ [Solr home page](http://lucene.apache.org/solr/)
+ [Highlighting help](http://wiki.apache.org/solr/HighlightingParameters)
+ [Faceting help](http://wiki.apache.org/solr/SimpleFacetParameters)
+ [Installing Solr on Mac using homebrew](http://ramlev.dk/blog/2012/06/02/install-apache-solr-on-your-mac/)
+ [Install and Setup SOLR in OSX, including running Solr](http://risnandar.wordpress.com/2013/09/08/how-to-install-and-setup-apache-lucene-solr-in-osx/)

### Quick start

**Define stuff** Your base url and a key (if needed). This example should work. You do need to pass a key to the Public Library of Science search API, but it apparently doesn't need to be a real one.


```r
url <- 'http://api.plos.org/search'
key <- 'key'
```

**Search**


```r
solr_search(q='*:*', rows=2, fl='id', base=url, key=key)
```

```
##                                                    id
## 1  10.1371/journal.pntd.0002444/materials_and_methods
## 2 10.1371/journal.pntd.0002444/supporting_information
```

**Facet**


```r
solr_facet(q='*:*', facet.field='journal', facet.query=c('cell','bird'), base=url, key=key)
```

```
## $facet_queries
##   term value
## 1 cell 89923
## 2 bird  8981
## 
## $facet_fields
## $facet_fields$journal
##                                  X1     X2
## 1                          plos one 787953
## 2                     plos genetics  36537
## 3                    plos pathogens  32193
## 4        plos computational biology  26818
## 5                      plos biology  25086
## 6  plos neglected tropical diseases  20961
## 7                     plos medicine  17669
## 8              plos clinical trials    521
## 9                  plos collections     20
## 10                     plos medicin      9
## 
## 
## $facet_dates
## NULL
## 
## $facet_ranges
## NULL
```

**Highlight**


```r
solr_highlight(q='alcohol', hl.fl = 'abstract', rows=2, base = url, key=key)
```

```
## $`10.1371/journal.pmed.0040151`
## $`10.1371/journal.pmed.0040151`$abstract
## [1] "Background: <em>Alcohol</em> consumption causes an estimated 4% of the global disease burden, prompting"
## 
## 
## $`10.1371/journal.pone.0027752`
## $`10.1371/journal.pone.0027752`$abstract
## [1] "Background: The negative influences of <em>alcohol</em> on TB management with regard to delays in seeking"
```

**Stats**


```r
out <- solr_stats(q='ecology', stats.field=c('counter_total_all','alm_twitterCount'), stats.facet=c('journal','volume'), base=url, key=key)
```


```r
out$data
```

```
##                   min    max count missing      sum sumOfSquares     mean
## counter_total_all   0 301291 20743       0 70514013    1.232e+12 3399.412
## alm_twitterCount    0   1518 20743       0    82269    1.222e+07    3.966
##                    stddev
## counter_total_all 6915.26
## alm_twitterCount    23.94
```


```r
out$facet
```

```
## $counter_total_all
## $counter_total_all$journal
##    min    max count missing      sum sumOfSquares  mean stddev
## 1  806  40519   439       0  2470710    2.270e+10  5628   4482
## 2  981  44972   569       0  3573282    3.558e+10  6280   4810
## 3    0 301291 16352       0 44184594    7.151e+11  2702   6036
## 4 5008   9012     2       0    14020    1.063e+08  7010   2831
## 5    0 183250   768       0  9208850    2.525e+11 11991  13611
## 6    0  87489   219       0  2482672    5.826e+10 11336  11754
## 7  771  83944   396       0  2253630    2.987e+10  5691   6570
## 8  250 168186   747       0  2609773    4.240e+10  3494   6679
##                        facet_field
## 1                   plos pathogens
## 2                    plos genetics
## 3                         plos one
## 4             plos clinical trials
## 5                     plos biology
## 6                    plos medicine
## 7       plos computational biology
## 8 plos neglected tropical diseases
## 
## $counter_total_all$volume
##     min    max count missing      sum sumOfSquares  mean stddev
## 1   888 109404   741       0  5364074    1.004e+11  7239   9123
## 2  1178  87686   482       0  4153585    8.489e+10  8617  10104
## 3  1405 115245    81       0  1110096    3.953e+10 13705  17435
## 4   771  85555   178       0  1220104    2.648e+10  6855  10116
## 5     0 179890  4825       0 14238246    2.031e+11  2951   5778
## 6     0 171743  2948       0 11063837    1.519e+11  3753   6121
## 7     0  75771  1539       0  7904151    9.588e+10  5136   5995
## 8   527 301291  1010       0  6663464    1.993e+11  6597  12409
## 9     0 183250  2682       0  4826364    1.087e+11  1800   6107
## 10    0 212364  6164       0 13036254    1.988e+11  2115   5271
## 11    0  81651    72       0   793484    2.003e+10 11021  12606
## 12    0  44159    21       0   140354    2.574e+09  6684   9045
##    facet_field
## 1            3
## 2            2
## 3            1
## 4           10
## 5            7
## 6            6
## 7            5
## 8            4
## 9            9
## 10           8
## 11          11
## 12          12
## 
## 
## $alm_twitterCount
## $alm_twitterCount$journal
##   min  max count missing   sum sumOfSquares   mean stddev
## 1   0   74   439       0  1583        42115  3.606  9.117
## 2   0  154   569       0  1786        56674  3.139  9.482
## 3   0  842 16352       0 58527      6949113  3.579 20.302
## 4   0    3     2       0     3            9  1.500  2.121
## 5   0 1518   768       0  7581      3590807  9.871 67.706
## 6   0  536   219       0  2513       457417 11.475 44.339
## 7   0  125   396       0  1650        67862  4.167 12.426
## 8   0  805   747       0  2148       665628  2.876 29.732
##                        facet_field
## 1                   plos pathogens
## 2                    plos genetics
## 3                         plos one
## 4             plos clinical trials
## 5                     plos biology
## 6                    plos medicine
## 7       plos computational biology
## 8 plos neglected tropical diseases
## 
## $alm_twitterCount$volume
##    min  max count missing   sum sumOfSquares    mean  stddev facet_field
## 1    0   29   741       0   362         3332  0.4885   2.065           3
## 2    0   36   482       0   297         4865  0.6162   3.120           2
## 3    0   28    81       0   103         1855  1.2716   4.642           1
## 4    0  536   178       0  3677       509609 20.6573  49.498          10
## 5    0  788  4825       0 17687      1741423  3.6657  18.643           7
## 6    0  805  2948       0  3099       847155  1.0512  16.922           6
## 7    0  111  1539       0  1227        48159  0.7973   5.539           5
## 8    0  157  1010       0   588        31432  0.5822   5.551           4
## 9    0  628  2682       0 18138      1848752  6.7629  25.374           9
## 10   0  842  6164       0 30349      3618121  4.9236  23.724           8
## 11   0 1518    72       0  4825      2731411 67.0139 184.164          11
## 12   0  817    21       0  1917       829395 91.2857 180.887          12
```

**More like this**

`solr_mlt` is a function to return similar documents to the one


```r
out <- solr_mlt(q='title:"ecology" AND body:"cell"', mlt.fl='title', mlt.mindf=1, mlt.mintf=1, fl='counter_total_all', rows=5, base=url, key=key)
out$docs
```

```
##                             id counter_total_all
## 1 10.1371/journal.pbio.1001805              6663
## 2 10.1371/journal.pbio.0020440             16258
## 3 10.1371/journal.pone.0087217              1801
## 4 10.1371/journal.pone.0040117              1921
## 5 10.1371/journal.pone.0072525               822
```


```r
out$mlt
```

```
## $`10.1371/journal.pbio.1001805`
##                             id counter_total_all
## 1 10.1371/journal.pone.0082578               771
## 2 10.1371/journal.pcbi.1002915              4472
## 3 10.1371/journal.pcbi.1002652              2180
## 4 10.1371/journal.pone.0087380               464
## 5 10.1371/journal.pcbi.1003408              3058
## 
## $`10.1371/journal.pbio.0020440`
##                             id counter_total_all
## 1 10.1371/journal.pone.0035964              2859
## 2 10.1371/journal.pone.0003259              1748
## 3 10.1371/journal.pone.0068814              4767
## 4 10.1371/journal.pbio.0050104              2654
## 5 10.1371/journal.pbio.0020215              4304
## 
## $`10.1371/journal.pone.0087217`
##                             id counter_total_all
## 1 10.1371/journal.pcbi.0020092             13704
## 2 10.1371/journal.pone.0063375              1117
## 3 10.1371/journal.pone.0015143             11730
## 4 10.1371/journal.pone.0034096              2125
## 5 10.1371/journal.pcbi.1000986              2702
## 
## $`10.1371/journal.pone.0040117`
##                             id counter_total_all
## 1 10.1371/journal.pone.0069352              1171
## 2 10.1371/journal.pone.0035502              2183
## 3 10.1371/journal.pone.0014065              3652
## 4 10.1371/journal.pone.0078369              1387
## 5 10.1371/journal.pone.0053825              2134
## 
## $`10.1371/journal.pone.0072525`
##                             id counter_total_all
## 1 10.1371/journal.pone.0060766              1063
## 2 10.1371/journal.pcbi.1002928              6565
## 3 10.1371/journal.pcbi.0020144             12037
## 4 10.1371/journal.pcbi.1000350              8392
## 5 10.1371/journal.pone.0068714              2630
```

**Parsing**

`solr_parse` is a general purpose parser function with extension methods `solr_parse.sr_search`, `solr_parse.sr_facet`, and `solr_parse.sr_high`, for parsing `solr_search`, `solr_facet`, and `solr_highlight` function output, respectively. `solr_parse` is used internally within those three functions (`solr_search`, `solr_facet`, `solr_highlight`) to do parsing. You can optionally get back raw `json` or `xml` from `solr_search`, `solr_facet`, and `solr_highlight` setting parameter `raw=TRUE`, and then parsing after the fact with `solr_parse`. All you need to know is `solr_parse` can parse

For example:


```r
(out <- solr_highlight(q='alcohol', hl.fl = 'abstract', rows=2, base = url, key=key, raw=TRUE))
```

```
## [1] "{\"response\":{\"numFound\":13027,\"start\":0,\"docs\":[{},{}]},\"highlighting\":{\"10.1371/journal.pmed.0040151\":{\"abstract\":[\"Background: <em>Alcohol</em> consumption causes an estimated 4% of the global disease burden, prompting\"]},\"10.1371/journal.pone.0027752\":{\"abstract\":[\"Background: The negative influences of <em>alcohol</em> on TB management with regard to delays in seeking\"]}}}\n"
## attr(,"class")
## [1] "sr_high"
## attr(,"wt")
## [1] "json"
```

Then parse


```r
solr_parse(out, 'df')
```

```
##                          names
## 1 10.1371/journal.pmed.0040151
## 2 10.1371/journal.pone.0027752
##                                                                                                    abstract
## 1   Background: <em>Alcohol</em> consumption causes an estimated 4% of the global disease burden, prompting
## 2 Background: The negative influences of <em>alcohol</em> on TB management with regard to delays in seeking
```

**Using specific data sources**

*USGS BISON service*

The occurrences service


```r
url <- "http://bisonapi.usgs.ornl.gov/solr/occurrences/select"
solr_search(q='*:*', fl=c('decimalLatitude','decimalLongitude','scientificName'), base=url)
```

```
##    decimalLongitude decimalLatitude    scientificName
## 1            -85.67           35.76 Tyrannus tyrannus
## 2           -111.71           40.22 Tyrannus tyrannus
## 3            -82.87           24.63 Tyrannus tyrannus
## 4           -111.71           40.22 Tyrannus tyrannus
## 5            -84.13           31.63 Tyrannus tyrannus
## 6           -118.69           47.17 Tyrannus tyrannus
## 7            -87.65           44.09 Tyrannus tyrannus
## 8           -111.71           40.22 Tyrannus tyrannus
## 9            -87.65           44.09 Tyrannus tyrannus
## 10          -118.43           42.94 Tyrannus tyrannus
```

The species names service


```r
url <- "http://bisonapi.usgs.ornl.gov/solr/scientificName/select"
out <- solr_search(q='*:*', base=url, raw=TRUE)
solr_parse(out, "list")$response$docs[1:3]
```

```
## [[1]]
## [[1]]$scientificName
## [1] "Dictyopteris polypodioides"
## 
## [[1]]$`_version_`
## [1] 1.457e+18
## 
## 
## [[2]]
## [[2]]$scientificName
## [1] "Lonicera iberica"
## 
## [[2]]$`_version_`
## [1] 1.457e+18
## 
## 
## [[3]]
## [[3]]$scientificName
## [1] "Pseudopomala brachyptera"
## 
## [[3]]$`_version_`
## [1] 1.457e+18
```


Sweet!  Love me some `solr`


<section id="citing">

## Citing

To cite `solr` in publications use:

<br>

> Scott Chamberlain (2014). solr: General purpose R interface to Solr. R package version 0.1.4. http://CRAN.R-project.org/package=solr

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for solr](https://github.com/solr/rgauges/issues?state=open)
