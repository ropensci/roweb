---
title: taxize
layout: singlepkg
status: good
license: MIT
cran_version: 0.6.0
dev_version: 0.6.2.9000
downloads: 10000
tutorial: "../tutorials/taxize_tutorial.html"
---

`taxize` is a taxonomic toolbelt for R. `taxize` wraps APIs for a large suite of taxonomic databases availab on the web.

## Installation

Stable from CRAN

```r
install.packages("taxize")
```

Development from GitHub

```r
devtools::install_github("ropensci/taxize")
```

## Examples

```r
downstream("Apis", downto = "Species", db = "itis")
```

```
#> $Apis
#>      tsn parentname parenttsn          taxonname rankid rankname
#> 1 154396       Apis    154395     Apis mellifera    220  Species
#> 2 763550       Apis    154395 Apis andreniformis    220  Species
#> 3 763551       Apis    154395        Apis cerana    220  Species
#> 4 763552       Apis    154395       Apis dorsata    220  Species
#> 5 763553       Apis    154395        Apis florea    220  Species
#> 6 763554       Apis    154395 Apis koschevnikovi    220  Species
#> 7 763555       Apis    154395   Apis nigrocincta    220  Species
#>
#> attr(,"class")
#> [1] "downstream"
#> attr(,"db")
#> [1] "itis"
```

## Links

### Citations

* Bradie, J., Pietrobon, A., & Leung, B. In press. Beyond species-specific assessments: an analysis and validation of environmental distance metrics for non-indigenous species risk assessment. Biological Invasions, 1-11.
* Dodd, A. J., Burgman, M. A., McCarthy, M. A., & Ainsworth, N. (2015). The changing patterns of plant naturalization in Australia. Diversity and Distributions, 21(9), 1038-1050.
* Berghe, E. V., Coro, G., Bailly, N., Fiorellato, F., Aldemita, C., Ellenbroek, A., & Pagano, P. (2015). Retrieving taxa names from large biodiversity data collections using a flexible matching workflow. Ecological Informatics, 28, 29-41.
* Bocci, G. (2015). TR8: an R package for easily retrieving plant species traits. Methods in Ecology and Evolution, 6(3), 347-350.
* Barve, V. (2014). Discovering and developing primary biodiversity data from social networking sites: A novel approach. Ecological Informatics, 24, 194-199. [doi:10.1016/j.ecoinf.2014.08.008](http://www.sciencedirect.com/science/article/pii/S1574954114001186)

### Blog posts 

* Chamberlain, Scott. (2014). taxize workflows. http://recology.info/2014/12/
* Cichini, Kay. (2012). Taxonomy with R: Exploring the Taxize-Package. http://thebiobucket.blogspot.com/2012/12/taxonomy-with-r-exploring-taxize-package.html
* Boettiger, Carl. (2011). http://www.carlboettiger.info/2011/08/26/rfishbase-and-some-taxonomy-in-r-with-taxize.html
taxize-workflows/
