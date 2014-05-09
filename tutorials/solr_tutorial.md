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
##                                          id
## 1              10.1371/journal.pone.0022949
## 2 10.1371/journal.pone.0075114/introduction
```

**Facet**


```r
solr_facet(q='*:*', facet.field='journal', facet.query=c('cell','bird'), base=url, key=key)
```

```
## $facet_queries
##   term value
## 1 cell 90163
## 2 bird  9010
## 
## $facet_fields
## $facet_fields$journal
##                                  X1     X2
## 1                          plos one 790366
## 2                     plos genetics  36699
## 3                    plos pathogens  32254
## 4        plos computational biology  26944
## 5                      plos biology  25086
## 6  plos neglected tropical diseases  21071
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
## counter_total_all   0 301433 20800       0 70736569    1.236e+12 3400.797
## alm_twitterCount    0   1518 20800       0    82716    1.227e+07    3.977
##                    stddev
## counter_total_all 6919.38
## alm_twitterCount    23.97
```


```r
out$facet
```

```
## $counter_total_all
## $counter_total_all$journal
##    min    max count missing      sum sumOfSquares  mean stddev
## 1  135  40559   440       0  2478545    2.281e+10  5633   4489
## 2    0  45019   572       0  3581769    3.572e+10  6262   4825
## 3    0 301433 16396       0 44339703    7.182e+11  2704   6041
## 4 5019   9024     2       0    14043    1.066e+08  7022   2832
## 5  527  87593   219       0  2488825    5.846e+10 11364  11766
## 6    0  84691   399       0  2259732    3.010e+10  5663   6594
## 7 1113 183618   768       0  9229624    2.532e+11 12018  13620
## 8    0 168274   753       0  2619025    4.250e+10  3478   6663
##                        facet_field
## 1                   plos pathogens
## 2                    plos genetics
## 3                         plos one
## 4             plos clinical trials
## 5                    plos medicine
## 6       plos computational biology
## 7                     plos biology
## 8 plos neglected tropical diseases
## 
## $counter_total_all$volume
##     min    max count missing      sum sumOfSquares  mean stddev
## 1   889 109435   741       0  5369288    1.006e+11  7246   9130
## 2  1179  87718   482       0  4157166    8.504e+10  8625  10113
## 3  1407 115372    81       0  1110885    3.960e+10 13715  17452
## 4     0  85674   185       0  1227906    2.663e+10  6637  10022
## 5     0 179914  4825       0 14274273    2.036e+11  2958   5784
## 6     0 171970  2948       0 11086329    1.524e+11  3761   6129
## 7     0  75835  1539       0  7915144    9.614e+10  5143   6004
## 8   527 301433  1010       0  6670588    1.996e+11  6605  12418
## 9     0 183618  2726       0  4885844    1.101e+11  1792   6098
## 10    0 213152  6170       0 13089929    1.998e+11  2122   5281
## 11  726  81875    72       0   797708    2.015e+10 11079  12622
## 12 1363  44516    21       0   151509    2.655e+09  7215   8836
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
## 1   0   74   440       0  1607        43441  3.652  9.251
## 2   0  154   572       0  1787        56681  3.124  9.460
## 3   0  842 16396       0 58909      7002193  3.593 20.352
## 4   0    3     2       0     3            9  1.500  2.121
## 5   0  536   219       0  2515       457913 11.484 44.362
## 6   0  127   399       0  1653        68371  4.143 12.433
## 7   0 1518   768       0  7603      3593051  9.900 67.723
## 8   0  806   753       0  2161       667367  2.870 29.651
##                        facet_field
## 1                   plos pathogens
## 2                    plos genetics
## 3                         plos one
## 4             plos clinical trials
## 5                    plos medicine
## 6       plos computational biology
## 7                     plos biology
## 8 plos neglected tropical diseases
## 
## $alm_twitterCount$volume
##    min  max count missing   sum sumOfSquares    mean  stddev facet_field
## 1    0   29   741       0   362         3332  0.4885   2.065           3
## 2    0   36   482       0   298         4896  0.6183   3.130           2
## 3    0   28    81       0   103         1855  1.2716   4.642           1
## 4    0  536   185       0  3705       511873 20.0270  48.771          10
## 5    0  791  4825       0 17702      1749190  3.6688  18.685           7
## 6    0  806  2948       0  3198       866442  1.0848  17.112           6
## 7    0  111  1539       0  1229        48169  0.7986   5.539           5
## 8    0  158  1010       0   591        31751  0.5851   5.579           4
## 9    0  628  2726       0 18388      1875786  6.7454  25.354           9
## 10   0  842  6170       0 30375      3618499  4.9230  23.713           8
## 11   0 1518    72       0  4826      2731478 67.0278 184.162          11
## 12   0  817    21       0  1939       831639 92.3333 180.638          12
```

**More like this**

`solr_mlt` is a function to return similar documents to the one


```r
out <- solr_mlt(q='title:"ecology" AND body:"cell"', mlt.fl='title', mlt.mindf=1, mlt.mintf=1, fl='counter_total_all', rows=5, base=url, key=key)
out$docs
```

```
##                             id counter_total_all
## 1 10.1371/journal.pbio.1001805              6710
## 2 10.1371/journal.pbio.0020440             16259
## 3 10.1371/journal.pone.0087217              1822
## 4 10.1371/journal.pone.0040117              1942
## 5 10.1371/journal.pone.0072525               823
```


```r
out$mlt
```

```
## $`10.1371/journal.pbio.1001805`
##                             id counter_total_all
## 1 10.1371/journal.pone.0082578               783
## 2 10.1371/journal.pcbi.1003408              3132
## 3 10.1371/journal.pcbi.1002652              2181
## 4 10.1371/journal.pcbi.1002915              4484
## 5 10.1371/journal.pone.0087380               471
## 
## $`10.1371/journal.pbio.0020440`
##                             id counter_total_all
## 1 10.1371/journal.pone.0035964              2863
## 2 10.1371/journal.pone.0003259              1748
## 3 10.1371/journal.pone.0068814              4782
## 4 10.1371/journal.pbio.0050104              2655
## 5 10.1371/journal.pbio.0030105              2822
## 
## $`10.1371/journal.pone.0087217`
##                             id counter_total_all
## 1 10.1371/journal.pcbi.0020092             13721
## 2 10.1371/journal.pone.0063375              1120
## 3 10.1371/journal.pone.0015143             11745
## 4 10.1371/journal.pone.0034096              2127
## 5 10.1371/journal.pcbi.1000986              2702
## 
## $`10.1371/journal.pone.0040117`
##                             id counter_total_all
## 1 10.1371/journal.pone.0069352              1176
## 2 10.1371/journal.pone.0014065              3658
## 3 10.1371/journal.pone.0035502              2193
## 4 10.1371/journal.pone.0078369              1401
## 5 10.1371/journal.ppat.1003221              7082
## 
## $`10.1371/journal.pone.0072525`
##                             id counter_total_all
## 1 10.1371/journal.pone.0060766              1065
## 2 10.1371/journal.pcbi.1002928              6571
## 3 10.1371/journal.pcbi.0020144             12041
## 4 10.1371/journal.pcbi.1000350              8394
## 5 10.1371/journal.pone.0072862              2562
```

**Parsing**

`solr_parse` is a general purpose parser function with extension methods `solr_parse.sr_search`, `solr_parse.sr_facet`, and `solr_parse.sr_high`, for parsing `solr_search`, `solr_facet`, and `solr_highlight` function output, respectively. `solr_parse` is used internally within those three functions (`solr_search`, `solr_facet`, `solr_highlight`) to do parsing. You can optionally get back raw `json` or `xml` from `solr_search`, `solr_facet`, and `solr_highlight` setting parameter `raw=TRUE`, and then parsing after the fact with `solr_parse`. All you need to know is `solr_parse` can parse

For example:


```r
(out <- solr_highlight(q='alcohol', hl.fl = 'abstract', rows=2, base = url, key=key, raw=TRUE))
```

```
## [1] "{\"response\":{\"numFound\":13066,\"start\":0,\"docs\":[{},{}]},\"highlighting\":{\"10.1371/journal.pmed.0040151\":{\"abstract\":[\"Background: <em>Alcohol</em> consumption causes an estimated 4% of the global disease burden, prompting\"]},\"10.1371/journal.pone.0027752\":{\"abstract\":[\"Background: The negative influences of <em>alcohol</em> on TB management with regard to delays in seeking\"]}}}\n"
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

[Back to top](#top)
