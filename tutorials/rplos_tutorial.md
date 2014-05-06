---
title: rplos tutorial
layout: tutorial
packge_version: 0.3.6
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
searchplos(terms = "Helianthus", fields = "id", limit = 5)
```

```
                            id
1 10.1371/journal.pone.0057533
2 10.1371/journal.pone.0045899
3 10.1371/journal.pone.0037191
4 10.1371/journal.pone.0051360
5 10.1371/journal.pone.0070347
```


Get only full article DOIs


```r
searchplos(terms = "*:*", fields = "id", toquery = "doc_type:full", start = 0, 
    limit = 20)
```

```
                             id
1  10.1371/journal.pone.0022062
2  10.1371/journal.pntd.0000698
3  10.1371/journal.pone.0053864
4  10.1371/journal.pone.0069888
5  10.1371/journal.pone.0025985
6  10.1371/journal.pone.0073918
7  10.1371/journal.pntd.0000703
8  10.1371/journal.pone.0038002
9  10.1371/journal.pone.0077917
10 10.1371/journal.pone.0022056
11 10.1371/journal.pone.0093807
12 10.1371/journal.pone.0053868
13 10.1371/journal.pntd.0000700
14 10.1371/journal.pone.0001838
15 10.1371/journal.pone.0041875
16 10.1371/journal.pone.0005899
17 10.1371/journal.pone.0022055
18 10.1371/journal.pone.0057881
19 10.1371/journal.pone.0045998
20 10.1371/journal.pone.0053894
```


Get DOIs for only PLoS One articles


```r
searchplos(terms = "*:*", fields = "id", toquery = "cross_published_journal_key:PLoSONE", 
    start = 0, limit = 15)
```

```
                                        id
1             10.1371/journal.pone.0022062
2    10.1371/journal.pone.0053864/abstract
3        10.1371/journal.pone.0053864/body
4             10.1371/journal.pone.0053864
5             10.1371/journal.pone.0069888
6       10.1371/journal.pone.0053864/title
7       10.1371/journal.pone.0033995/title
8    10.1371/journal.pone.0033995/abstract
9  10.1371/journal.pone.0033995/references
10       10.1371/journal.pone.0033995/body
11            10.1371/journal.pone.0025985
12            10.1371/journal.pone.0073918
13      10.1371/journal.pone.0073918/title
14 10.1371/journal.pone.0073918/references
15       10.1371/journal.pone.0073918/body
```


Get DOIs for full article in PLoS One


```r
searchplos(terms = "*:*", fields = "id", toquery = list("cross_published_journal_key:PLoSONE", 
    "doc_type:full"), start = 0, limit = 20)
```

```
                             id
1  10.1371/journal.pone.0022062
2  10.1371/journal.pone.0053864
3  10.1371/journal.pone.0069888
4  10.1371/journal.pone.0025985
5  10.1371/journal.pone.0073918
6  10.1371/journal.pone.0038002
7  10.1371/journal.pone.0077917
8  10.1371/journal.pone.0022056
9  10.1371/journal.pone.0093807
10 10.1371/journal.pone.0053868
11 10.1371/journal.pone.0001838
12 10.1371/journal.pone.0041875
13 10.1371/journal.pone.0005899
14 10.1371/journal.pone.0022055
15 10.1371/journal.pone.0057881
16 10.1371/journal.pone.0045998
17 10.1371/journal.pone.0053894
18 10.1371/journal.pone.0009837
19 10.1371/journal.pone.0001878
20 10.1371/journal.pone.0065967
```


Serch for many terms


```r
terms <- c("ecology", "evolution", "science")
lapply(terms, function(x) searchplos(x, limit = 2))
```

```
[[1]]
                            id
1 10.1371/journal.pone.0059813
2 10.1371/journal.pone.0001248

[[2]]
                                                       id
1 10.1371/annotation/c55d5089-ba2f-449d-8696-2bc8395978db
2 10.1371/annotation/9773af53-a076-4946-a3f1-83914226c10d

[[3]]
                            id
1 10.1371/journal.pbio.0020122
2 10.1371/journal.pbio.1001166
```


### Search on specific sections

A suite of functions were created as light wrappers around `searchplos` as a shorthand to search specific sections of a paper.

* `plosauthor` searchers in authors
* `plosabstract` searches in abstracts
* `plostitle` searches in titles
* `plosfigtabcaps` searches in figure and table captions
* `plossubject` searches in subject areas

`plosauthor` searches across authors, and in this case returns the authors of the matching papers. the fields parameter determines what is returned


```r
plosauthor(terms = "Eisen", fields = "author", limit = 10)
```

```
             author
1  Jonathan A Eisen
2  Jonathan A Eisen
3  Jonathan A Eisen
4  Jonathan A Eisen
5  Jonathan A Eisen
6  Jonathan A Eisen
7  Jonathan A Eisen
8  Jonathan A Eisen
9  Jonathan A Eisen
10 Jonathan A Eisen
```


`plosabstract` searches across abstracts, and in this case returns the id and title of the matching papers


```r
plosabstract(terms = "drosophila", fields = "id,title", limit = 5)
```

```
                            id
1 10.1371/journal.pbio.0040198
2 10.1371/journal.pbio.0030246
3 10.1371/journal.pone.0012421
4 10.1371/journal.pbio.0030389
5 10.1371/journal.pone.0002817
                                                                            title
1                                                                     All for All
2                                     School Students as Drosophila Experimenters
3                            Host Range and Specificity of the Drosophila C Virus
4                     New Environments Set the Stage for Changing Tastes in Mates
5 High-Resolution, In Vivo Magnetic Resonance Imaging of Drosophila at 18.8 Tesla
```


`plostitle` searches across titles, and in this case returns the title and journal of the matching papers


```r
plostitle(terms = "drosophila", fields = "title,journal", limit = 10)
```

```
                      journal
1  PLoS Computational Biology
2               PLoS Genetics
3                    PLoS ONE
4                PLoS Biology
5                    PLoS ONE
6                PLoS Biology
7                PLoS Biology
8                    PLoS ONE
9                PLoS Biology
10               PLoS Biology
                                                   title
1             Parametric Alignment of Drosophila Genomes
2  Phenotypic Plasticity of the Drosophila Transcriptome
3               A Tripartite Synapse Model in Drosophila
4            Combinatorial Coding for Drosophila Neurons
5            Quantification of Food Intake in Drosophila
6       Reinforcement of Gametic Isolation in Drosophila
7            Expression in Aneuploid Drosophila S2 Cells
8                              A DNA Virus of Drosophila
9          Identification of Drosophila MicroRNA Targets
10           School Students as Drosophila Experimenters
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
  No_Articles       Term
1        7308     monkey
2         244 Helianthus
3         667  sunflower
4       78935    protein
5         868      whale
```

```r
out$plot
```

![plot of chunk plosword](../assets/tutorial-images/rplos/plosword.png) 


You can also pass in curl options, in this case get verbose information on the curl call.


```r
plosword("Helianthus", callopts = list(verbose = TRUE))
```

```
Number of articles with search term 
                                244 
```


### Visualize terms

`plot_througtime` allows you to search for up to 2 words and visualize the results as a line plot through time, comparing number of articles matching through time. Visualize with the ggplot2 package, only up to two terms for now.


```r
plot_throughtime(terms = "phylogeny", limit = 200, gvis = FALSE)
```

![plot of chunk throughtime1](../assets/tutorial-images/rplos/throughtime1.png) 



```r
plot_throughtime(list("drosophila", "monkey"), 100)
```

![plot of chunk throughtime2](../assets/tutorial-images/rplos/throughtime2.png) 


OR using google visualizations through the googleVis package, check it your self using, e.g.


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

> Scott Chamberlain, Carl Boettiger and Karthik Ram (2014). rplos: Interface to PLoS Journals search API.. R package version 0.3.6. https://github.com/ropensci/rplos

<section id="license_bugs">

## License and bugs

* License: [CC0](http://creativecommons.org/choose/zero/)
* Report bugs at [our Github repo for rplos](https://github.com/ropensci/rplos/issues?state=open)
