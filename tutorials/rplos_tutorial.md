---
title: rplos tutorial
layout: tutorial
packge_version: 0.4.1
---



The `rplos` package interacts with the API services of [PLoS](http://www.plos.org/) (Public Library of Science) Journals. In order to use `rplos`, you need to obtain [your own key](http://api.plos.org/registration/) to their API services. Instruction for obtaining and installing keys so they load automatically when you launch R are on our GitHub Wiki page [Installation and use of API keys](https://github.com/ropensci/rOpenSci/wiki/Installation-and-use-of-API-keys).

This tutorial will go through three use cases to demonstrate the kinds
of things possible in `rplos`.

* Search across PLoS papers in various sections of papers
* Search for terms and visualize results as a histogram OR as a plot through time
* Text mining of scientific literature

<section id="installation">

## Installation



```r
install.packages("rplos")
```


```r
library(rplos)
```

<section id="usage">

## Usage

### Search across PLoS papers in various sections of papers

`searchplos` is a general search, and in this case searches for the term
**Helianthus** and returns the DOI's of matching papers


```r
searchplos(q= "Helianthus", fl= "id", limit = 5)
```

```
##                             id
## 1 10.1371/journal.pone.0057533
## 2 10.1371/journal.pone.0045899
## 3 10.1371/journal.pone.0037191
## 4 10.1371/journal.pone.0051360
## 5 10.1371/journal.pone.0070347
```

Get only full article DOIs


```r
searchplos(q="*:*", fl='id', fq='doc_type:full', start=0, limit=5)
```

```
##                                                        id
## 1 10.1371/annotation/dcd836ee-9e23-4538-acb7-450560ba5c1d
## 2                            10.1371/journal.pone.0089484
## 3                            10.1371/journal.pone.0025399
## 4                            10.1371/journal.pone.0063839
## 5                            10.1371/journal.pone.0008141
```

Get DOIs for only PLoS One articles


```r
searchplos(q="*:*", fl='id', fq='cross_published_journal_key:PLoSONE', start=0, limit=5)
```

```
##                                                    id
## 1 10.1371/journal.pone.0076666/results_and_discussion
## 2  10.1371/journal.pone.0076666/materials_and_methods
## 3 10.1371/journal.pone.0076666/supporting_information
## 4               10.1371/journal.pone.0046759/abstract
## 5             10.1371/journal.pone.0046759/references
```

Get DOIs for full article in PLoS One


```r
searchplos(q="*:*", fl='id',
   fq=list('cross_published_journal_key:PLoSONE', 'doc_type:full'),
   start=0, limit=5)
```

```
##                                                        id
## 1 10.1371/annotation/dcd836ee-9e23-4538-acb7-450560ba5c1d
## 2                            10.1371/journal.pone.0089484
## 3                            10.1371/journal.pone.0025399
## 4                            10.1371/journal.pone.0063839
## 5                            10.1371/journal.pone.0008141
```

Serch for many terms


```r
q <- c('ecology','evolution','science')
lapply(q, function(x) searchplos(x, limit=2))
```

```
## [[1]]
##                             id
## 1 10.1371/journal.pone.0059813
## 2 10.1371/journal.pone.0001248
## 
## [[2]]
##                                                        id
## 1 10.1371/annotation/9773af53-a076-4946-a3f1-83914226c10d
## 2 10.1371/annotation/c55d5089-ba2f-449d-8696-2bc8395978db
## 
## [[3]]
##                             id
## 1 10.1371/journal.pbio.0020122
## 2 10.1371/journal.pbio.1001166
```

### Search on specific sections

A suite of functions were created as light wrappers around `searchplos` as a shorthand to search specific sections of a paper.

* `plosauthor` searchers in authors
* `plosabstract` searches in abstracts
* `plostitle` searches in titles
* `plosfigtabcaps` searches in figure and table captions
* `plossubject` searches in subject areas

`plosauthor` searches across authors, and in this case returns the authors of the matching papers. the fl parameter determines what is returned


```r
plosauthor(q = "Eisen", fl = "author", limit = 5)
```

```
##             author
## 1 Jonathan A Eisen
## 2 Jonathan A Eisen
## 3 Jonathan A Eisen
## 4 Jonathan A Eisen
## 5 Jonathan A Eisen
```

`plosabstract` searches across abstracts, and in this case returns the id and title of the matching papers


```r
plosabstract(q = 'drosophila', fl='id,title', limit = 5)
```

```
##                             id
## 1 10.1371/journal.pbio.0040198
## 2 10.1371/journal.pbio.0030246
## 3 10.1371/journal.pone.0012421
## 4 10.1371/journal.pone.0002817
## 5 10.1371/journal.pbio.1000342
##                                                                             title
## 1                                                                     All for All
## 2                                     School Students as Drosophila Experimenters
## 3                            Host Range and Specificity of the Drosophila C Virus
## 4 High-Resolution, In Vivo Magnetic Resonance Imaging of Drosophila at 18.8 Tesla
## 5       Variable Transcription Factor Binding: A Mechanism of Evolutionary Change
```

`plostitle` searches across titles, and in this case returns the title and journal of the matching papers


```r
plostitle(q='drosophila', fl='title,journal', limit=5)
```

```
##                      journal
## 1 PLoS Computational Biology
## 2               PLoS Biology
## 3               PLoS Biology
## 4              PLoS Genetics
## 5               PLoS Biology
##                                                   title
## 1            Parametric Alignment of Drosophila Genomes
## 2      Reinforcement of Gametic Isolation in Drosophila
## 3           Expression in Aneuploid Drosophila S2 Cells
## 4 Phenotypic Plasticity of the Drosophila Transcriptome
## 5           School Students as Drosophila Experimenters
```

### Faceted search

Facet by journal


```r
facetplos(q='*:*', facet.field='journal')
```

```
## $facet_queries
## NULL
## 
## $facet_fields
## $facet_fields$journal
##                                 X1     X2
## 1                         plos one 851747
## 2                    plos genetics  38317
## 3                   plos pathogens  33683
## 4       plos computational biology  28281
## 5                     plos biology  25560
## 6 plos neglected tropical diseases  22897
## 7                    plos medicine  17998
## 8             plos clinical trials    521
## 9                     plos medicin      9
## 
## 
## $facet_dates
## NULL
## 
## $facet_ranges
## NULL
```

Using `facet.query` to get counts


```r
facetplos(q='*:*', facet.field='journal', facet.query='cell,bird')
```

```
## $facet_queries
##        term value
## 1 cell,bird    15
## 
## $facet_fields
## $facet_fields$journal
##                                 X1     X2
## 1                         plos one 851747
## 2                    plos genetics  38317
## 3                   plos pathogens  33683
## 4       plos computational biology  28281
## 5                     plos biology  25560
## 6 plos neglected tropical diseases  22897
## 7                    plos medicine  17998
## 8             plos clinical trials    521
## 9                     plos medicin      9
## 
## 
## $facet_dates
## NULL
## 
## $facet_ranges
## NULL
```

Date faceting


```r
facetplos(q='*:*', url=url, facet.date='publication_date',
  facet.date.start='NOW/DAY-5DAYS', facet.date.end='NOW', facet.date.gap='+1DAY')
```

```
## $facet_queries
## NULL
## 
## $facet_fields
## NULL
## 
## $facet_dates
## $facet_dates$publication_date
##                   date value
## 1 2014-08-02T00:00:00Z     0
## 2 2014-08-03T00:00:00Z  1094
## 3 2014-08-04T00:00:00Z  2194
## 4 2014-08-05T00:00:00Z  1929
## 5 2014-08-06T00:00:00Z  2203
## 6 2014-08-07T00:00:00Z  1374
## 
## 
## $facet_ranges
## NULL
```

### Highlighted search

Search for the term _alcohol_ in the abstracts of articles, return only 10 results


```r
highplos(q='alcohol', hl.fl = 'abstract', rows=2)
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

Search for the term _alcohol_ in the abstracts of articles, and return fragment size of 20 characters, return only 5 results


```r
highplos(q='alcohol', hl.fl='abstract', hl.fragsize=20, rows=2)
```

```
## $`10.1371/journal.pmed.0040151`
## $`10.1371/journal.pmed.0040151`$abstract
## [1] "Background: <em>Alcohol</em>"
## 
## 
## $`10.1371/journal.pone.0027752`
## $`10.1371/journal.pone.0027752`$abstract
## [1] " of <em>alcohol</em> on TB management"
```

Search for the term _experiment_ across all sections of an article, return id (DOI) and title fl only, search in full articles only (via `fq='doc_type:full'`), and return only 10 results


```r
highplos(q='everything:"experiment"', fl='id,title', fq='doc_type:full',
   rows=2)
```

```
## $`10.1371/journal.pone.0039681`
## $`10.1371/journal.pone.0039681`$everything
## [1] " Selection of Transcriptomics <em>Experiments</em> Improves Guilt-by-Association Analyses Transcriptomics <em>Experiment</em>"
## 
## 
## $`10.1371/annotation/9b8741e2-0f5f-49f9-9eaa-1b0cb9b8d25f`
## $`10.1371/annotation/9b8741e2-0f5f-49f9-9eaa-1b0cb9b8d25f`$everything
## [1] " in the labels under the bars. The labels should read <em>Experiment</em> 3 / <em>Experiment</em> 4 instead of <em>Experiment</em>"
```

### Search for terms and visualize results as a histogram OR as a plot through time

`plosword` allows you to search for 1 to K words and visualize the results
as a histogram, comparing number of matching papers for each word


```r
out <- plosword(list("monkey", "Helianthus", "sunflower", "protein", "whale"),
    vis = "TRUE")
out$table
```

```
##   No_Articles       Term
## 1        7715     monkey
## 2         266 Helianthus
## 3         737  sunflower
## 4       84064    protein
## 5         935      whale
```


```r
out$plot
```

![plot of chunk plosword1plot](../assets/tutorial-images/rplos/plosword1plot.png) 

You can also pass in curl options, in this case get verbose information on the curl call.


```r
plosword('Helianthus', callopts=list(verbose=TRUE))
```

```
## Number of articles with search term 
##                                 266
```

### Visualize terms

`plot_througtime` allows you to search for up to 2 words and visualize the results as a line plot through time, comparing number of articles matching through time. Visualize with the ggplot2 package, only up to two terms for now.


```r
plot_throughtime(terms = "phylogeny", limit = 200)
```

![plot of chunk throughtime1](../assets/tutorial-images/rplos/throughtime1.png) 

OR using google visualizations through the googleVis package, check it your self using, e.g. (not shown here)


```r
plot_throughtime(terms = list("drosophila", "flower"), limit = 200, gvis = TRUE)
```

...And a google visualization will render on your local browser and you
can play with three types of plots (point, histogram, line), all through
time. The plot is not shown here, but try it out for yourself!!

<section id="citing">

## Citing

To cite `rplos` in publications use:

<br>

> Scott Chamberlain, Carl Boettiger and Karthik Ram (2014). rplos: Interface to PLoS Journals search API.. R package version 0.4.1. https://github.com/ropensci/rplos

<section id="license_bugs">

## License and bugs

* License: [CC0](http://creativecommons.org/choose/zero/)
* Report bugs at [our Github repo for rplos](https://github.com/ropensci/rplos/issues?state=open)

[Back to top](#top)
