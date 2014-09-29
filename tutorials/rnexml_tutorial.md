---
title: RNeXML tutorial
layout: tutorial
packge_version: 1.1.3
---





An R package for reading, writing, integrating and publishing data using the Ecological Metadata Language (EML) format.

An extensive and rapidly growing collection of richly annotated phylogenetics data is now available in the NeXML format. NeXML relies on state-of-the-art data exchange technology to provide a format that can be both validated and extended, providing a data quality assurance and and adaptability to the future that is lacking in other formats [Vos et al 2012](http://doi.org/10.1093/sysbio/sys025 "NeXML: Rich, Extensible, and Verifiable Representation of Comparative Data and Metadata.").

<section id="installation">

## Installation

The stable version is on CRAN


```r
install.packages("RNeXML")
```

The development version of RNeXML is [available on Github](https://github.com/ropensci/RNeXML).  With the `devtools` package installed on your system, RNeXML can be installed using:


```r
library(devtools)
install_github("RNeXML", "ropensci")
library(RNeXML)
```



<section id="usage">

## Usage

Read in a `nexml` file into the `ape::phylo` format:


```r
f <- system.file("examples", "comp_analysis.xml", package="RNeXML")
nexml <- nexml_read(f)
tr <- get_trees(nexml) # or: as(nexml, "phylo")
plot(tr)
```

![plot of chunk unnamed-chunk-5](../assets/tutorial-images/rnexml/unnamed-chunk-5.png) 

Write an `ape::phylo` tree into the `nexml` format:


```r
data(bird.orders)
nexml_write(bird.orders, "test.xml")
```

```
[1] "test.xml"
```

A key feature of NeXML is the ability to formally validate the construction of the data file against the standard (the lack of such a feature in nexus files had lead to inconsistencies across different software platforms, and some files that cannot be read at all).  While it is difficult to make an invalid NeXML file from `RNeXML`, it never hurts to validate just to be sure:


```r
nexml_validate("test.xml")
```

```
[1] TRUE
```



Extract metadata from the NeXML file:


```r
birds <- nexml_read("test.xml")
get_taxa(birds)
```

```
 [1] "Struthioniformes" "Tinamiformes"     "Craciformes"     
 [4] "Galliformes"      "Anseriformes"     "Turniciformes"   
 [7] "Piciformes"       "Galbuliformes"    "Bucerotiformes"  
[10] "Upupiformes"      "Trogoniformes"    "Coraciiformes"   
[13] "Coliiformes"      "Cuculiformes"     "Psittaciformes"  
[16] "Apodiformes"      "Trochiliformes"   "Musophagiformes" 
[19] "Strigiformes"     "Columbiformes"    "Gruiformes"      
[22] "Ciconiiformes"    "Passeriformes"   
```

```r
get_metadata(birds)
```

```
                      dcterms:bibliographicCitation 
                                                 NA 
                                         cc:license 
"http://creativecommons.org/publicdomain/zero/1.0/" 
```

--------------------------------------------


Add basic additional metadata:  


```r
nexml_write(bird.orders, file="meta_example.xml",
            title = "My test title",
            description = "A description of my test",
            creator = "Carl Boettiger <cboettig@gmail.com>",
            publisher = "unpublished data",
            pubdate = "2012-04-01")
```

```
[1] "meta_example.xml"
```
By default, `RNeXML` adds certain metadata, including the NCBI taxon id numbers for all named taxa.  This acts a check on the spelling and definitions of the taxa as well as providing a link to additional metadata about each taxonomic unit described in the dataset.  


### Advanced annotation


We can also add arbitrary metadata to a NeXML tree by define `meta` objects:


```r
modified <- meta(property = "prism:modificationDate",
                 content = "2013-10-04")
```

Advanced use requires specifying the namespace used.  Metadata follows the RDFa conventions.  Here we indicate the modification date using the prism vocabulary. This namespace is included by default, as it is used for some of the basic metadata shown in the previous example.  We can see from this list:


```r
RNeXML:::nexml_namespaces
```

```
                                                     nex 
                             "http://www.nexml.org/2009" 
                                                     xsi 
             "http://www.w3.org/2001/XMLSchema-instance" 
                                                     xml 
                  "http://www.w3.org/XML/1998/namespace" 
                                                    cdao 
"http://www.evolutionaryontology.org/cdao/1.0/cdao.owl#" 
                                                     xsd 
                     "http://www.w3.org/2001/XMLSchema#" 
                                                      dc 
                      "http://purl.org/dc/elements/1.1/" 
                                                 dcterms 
                             "http://purl.org/dc/terms/" 
                                                   prism 
        "http://prismstandard.org/namespaces/1.2/basic/" 
                                                      cc 
                        "http://creativecommons.org/ns#" 
                                                    ncbi 
                 "http://www.ncbi.nlm.nih.gov/taxonomy#" 
                                                      tc 
         "http://rs.tdwg.org/ontology/voc/TaxonConcept#" 
```

This next block defines a resource (link), described by the `rel` attribute as a homepage, a term in the `foaf` vocabulalry.  Becuase `foaf` is not a default namespace, we will have to provide its URL in the full definition below.


```r
website <- meta(href = "http://carlboettiger.info",
                rel = "foaf:homepage")
```

Here we create a history node using the `skos` namespace.  We can also add id values to any metadata element to make the element easier to reference externally:


```r
history <- meta(property = "skos:historyNote",
                content = "Mapped from the bird.orders data in the ape package using RNeXML",
                id = "meta123")
```

Once we have created the `meta` elements, we can pass them to our `nexml_write` function, along with definitions of the namespaces.  


```r
nexml_write(bird.orders,
            file = "example.xml",
            meta = list(history, modified, website),
            namespaces = c(skos = "http://www.w3.org/2004/02/skos/core#",
                           foaf = "http://xmlns.com/foaf/0.1/"))
```

```
[1] "example.xml"
```

### Taxonomic identifiers

Add taxonomic identifier metadata to the OTU elements:
<!-- This block relies on a robust internet connection that can occassionally fail.  Also it's a bit slow, so don't run it. After all, this command is tested in the unit tests.-->


```r
nex <- add_trees(bird.orders)
nex <- taxize_nexml(nex)
```



### Working with character data

NeXML also provides a standard exchange format for handling character data.  The R platform is particularly popular in the context of phylogenetic comparative methods, which consider both a given phylogeny and a set of traits.  NeXML provides an ideal tool for handling this metadata.  

#### Extracting character data

We can load the library, parse the NeXML file and extract both the characters and the phylogeny.  


```r
library(RNeXML)
nexml <- read.nexml(system.file("examples", "comp_analysis.xml", package="RNeXML"))
traits <- get_characters(nexml)
tree <- get_trees(nexml)
```

(Note that `get_characters` would return both discrete and continuous characters together in the same data.frame, but we use `get_characters_list` to get separate data.frames for the continuous `characters` block and the discrete `characters` block).  

We can then fire up `geiger` and fit, say, a Brownian motion model the continuous data and a Markov transition matrix to the discrete states:  


```r
library(geiger)
fitContinuous(tree, traits[1], ncores=1)
```

```
GEIGER-fitted comparative model of continuous data
 fitted 'BM' model parameters:
	sigsq = 1.166011
	z0 = 0.255591

 model summary:
	log-likelihood = -20.501183
	AIC = 45.002367
	AICc = 46.716652
	free parameters = 2

Convergence diagnostics:
	optimization iterations = 100
	failed iterations = 0
	frequency of best fit = 1.00

 object summary:
	'lik' -- likelihood function
	'bnd' -- bounds for likelihood search
	'res' -- optimization iteration summary
	'opt' -- maximum likelihood parameter estimates
```

```r
fitDiscrete(tree, traits[2], ncores=1)
```

```
GEIGER-fitted comparative model of discrete data
 fitted Q matrix:
             0        1
    0 -0.07308  0.07308
    1  0.07308 -0.07308

 model summary:
	log-likelihood = -4.574133
	AIC = 11.148266
	AICc = 11.648266
	free parameters = 1

Convergence diagnostics:
	optimization iterations = 100
	failed iterations = 0
	frequency of best fit = 1.00

 object summary:
	'lik' -- likelihood function
	'bnd' -- bounds for likelihood search
	'res' -- optimization iteration summary
	'opt' -- maximum likelihood parameter estimates
```






<section id="citing">

## Citing

To cite `RNeXML` in publications use:

<br>

> Carl Boettiger, Scott Chamberlain, Hilmar Lapp, Kseniia Shumelchyk and Rutger Vos (2014). RNeXML: Implement semantically rich I/O for NeXML format. R package version 1.1.3. http://CRAN.R-project.org/package=RNeXML

<section id="license_bugs">

## License and bugs

* License: BSD 3
* Report bugs at [our Github repo for alm](https://github.com/ropensci/RNeXML/issues?state=open)

[Back to top](#top)
