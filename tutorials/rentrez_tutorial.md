---
title: rentrez tutorial
layout: tutorial
packge_version: 0.4.2
---



`rentrez` is an R package that helps users query the NCBI's databases to download genetic and bibliographic data.`rentrez` is now on CRAN, so can be installed by using `install.packages("rentrez")`. The source code is also avaliablefrom the [ROpenSci github repository](http://github.com/ropensci/rentrez).


What rentrez does
-----------------
`rentrez` provides a low-level R wrapper to the NCBI's EUtils API.
The core functions take a set of arguments provided by a user, produce the URL
needed to query the NCBI's API and then fetches the resulting data. In most
cases the functions return lists that contain the parts of the resulting file
that are most likely to be useful as items.

`rentrez` presumes you already know your way around the Eutils' API, [which is well documented](http://www.ncbi.nlm.nih.gov/books/NBK25500/). Make sure you read the documentation, and in particular, be aware of the NCBI's usage policies and try to limit very large requests to off peak (USA) times.

Examples
--------

Lately, I've been working on a little meta-analysis of phylogenies. In particualr, we're interested in why sometimes different genes tell different stories about the relationships between species from which the come. In terms of being able to get the individual gene trees I need to do these analyses there are good, rather less good and quite bad papers out there. In the best cases I can just download the trees as nice, parsable newick files from [TreeBase](treebase.org), which has already been [wrapped by ROpenSci](http://github.com/ropensci/treebase). Sometimes I need to print out the trees from a paper and work with pencil and paper, which I can handle. In a few cases people haven't actually published their individual gene trees, if I want to included these papers I need to replicate their work by downloading the gene sequences, aligning them and making new trees.

So, here's an example of how I've been using `rentrez` to automate some of that process. I'm going to use a slightly convaluted process to get all the data, but that's just so I can walk though a bunch of the `rentrez` functions. Let's get started.

<section id="installation">

## Installation



```r
install.packages("rentrez")
```

<section id="usage">

## Finding papers in Pubmed

Reece et al (2010, [doi:10.1016/j.ympev.2010.07.013](http://dx.doi.org/10.1016/j.ympev.2010.07.013)) presented a phylogeny of moray eels using four different genes, but didn't publish the gene trees. I want to get the sequences underlying their analyses, which will be in the NCBI's databases, so I can reproduce their results. To get data associated with this paper from the NCBI I need the PMID (pubmed ID), which I can find using the `rentrez` function `entrez_search` to query the pubmed database with the paper's doi:


```r
library("rentrez")
library("XML")
```


```r
pubmed_search <- entrez_search(db = "pubmed", term = "10.1016/j.ympev.2010.07.013[doi]")
pubmed_search$ids
```

```
#> [1] "20674752"
```

All the functions in `rentrez` create a URL to get data from the NCBI, then fetch the resulting document, usually as an XML file. In most cases the functions will parse the most relevant sections of the XML file out and present them to you as items in a list (`ids` being one item of the `pubmed_search` list in this case).

## Find data related to a particular record in an NCBI database

OK, now we have the PMID, what data does NCBI have for this paper? The
`entrez_link` function lets us find out. In this case the `db` argument can be
used to limit the number of data sources to check ( a list of avaliable
linked-databases can be found via `entrez_db_links()`. In this case, I want to see every data
source so I'll set `db` to "all":


```r
NCBI_data <- entrez_link(dbfrom = "pubmed", id = pubmed_search$ids, db = "all")
NCBI_data
```

```
#> elink result with ids from 13 databases:
#>  [1] pubmed_medgen              pubmed_nuccore            
#>  [3] pubmed_nucleotide          pubmed_pmc_refs           
#>  [5] pubmed_popset              pubmed_protein            
#>  [7] pubmed_pubmed              pubmed_pubmed_citedin     
#>  [9] pubmed_pubmed_combined     pubmed_pubmed_five        
#> [11] pubmed_pubmed_reviews      pubmed_pubmed_reviews_five
#> [13] pubmed_taxonomy_entrez
```

## Fetch a summary of a record

The most relevant data here is the from the [popset](ncbi.nlm.nih.gov/popset)
database, which containts population and phylogenetic datasets. We can find out
a little bit more about this datbase with `entrez_db_summary()`


```r
entrez_db_summary("popset")
```

```
#>  DbName: popset
#>  MenuName: PopSet
#>  Description: PopSet sequence record
#>  DbBuild: Build150307-0732m.1
#>  Count: 220162
#>  LastUpdate: 2015/03/07 10:07
```

If I want to see
what each of the four popset datasets associated with this paper are about I can
use `entrez_summary` to have a look. This function collects summaries of
database records, and returns a list of parsed records with each element of a
given record represented as the most natural base `R` type. In this case we
can get summaries for each popset ID, check out the first record to see what
kind of information they contain then extract the Title from each record:


```r
data_summaries <- entrez_summary(db = "popset", id = NCBI_data$pubmed_popset)
data_summaries[[1]]
```

```
#> esummary result with 16 items:
#>  [1] uid        caption    title      extra      gi         settype   
#>  [7] createdate updatedate flags      taxid      authors    article   
#> [13] journal    statistics properties oslt
```

```r
sapply(data_summaries, "[[", "title")
```

```
#>                                                                   307082412 
#> "Muraenidae cytochrome oxidase subunit 1 gene, partial cds; mitochondrial." 
#>                                                                   307075396 
#>          "Muraenidae recombination activating protein 2 gene, partial cds." 
#>                                                                   307075338 
#>          "Muraenidae recombination activating protein 1 gene, partial cds." 
#>                                                                   307075274 
#>                 "Muraenidae cytochrome b gene, partial cds; mitochondrial."
```

## Fetch data
Ok, since we might expect nuclear and mitochondrial genes to hav different histories, let's get sequences from each genome (the the COI and RAG1 datasets) using `entrez_fetch`. By specifying `rettype="fasta"` we will get characater vectors in the fasta format:


```r
coi <- entrez_fetch(db = "popset", rettype = 'fasta', id = NCBI_data$pubmed_popset[1])
rag1 <- entrez_fetch(db = "popset", rettype = 'fasta', id = NCBI_data$pubmed_popset[3])
```

So I've got the data on hand - that's all the I need `rentrez` for, but I might as well align these sequences and make gene trees for each. I'll just do a quick and diry neighbor-joining tree using `ape` and we can clean up the long OTU names with the help of `stingr`. (I put the fussy work of cleaning the names and rooting the trees into a function `clean_and_root`):

_Note: This code block requires the user have have `muscle` installed on their `$PATH`,
since many users won't hae this executable installed this code is not executed
as part of the vignette_


```r
library(ape)
library(stringr)
clean_and_root <- function(tr, outgroup, resolved = TRUE) {

    tr$tip.label <- sapply(str_split(tr$tip.label, " "), function(x) paste(x[2:3],
        collapse = "_"))
    return(root(tr, outgroup, resolve.root = resolved))
}
write(coi, "~/moray_coi_raw.fasta")
write(rag1, "~/moray_rag1_raw.fasta")

par(mfrow = c(1, 2))

coi_ali <- muscle(read.dna("~/moray_coi_raw.fasta", "fasta"))
coi_tr <- nj(dist.dna(coi_ali, "k81"))
clean_coi_tr <- clean_and_root(coi_tr, "Uropterygius_macrocephalus")
plot(clean_coi_tr, direction = "rightwards", cex = 1)

rag_ali <- muscle(read.dna("~/moray_rag1_raw.fasta", "fasta"))
rag_tr <- nj(dist.dna(rag_ali, "k81"))
clean_rag_tr <- clean_and_root(rag_tr, "Uropterygius_macrocephalus")
plot(clean_rag_tr, direction = "leftward", cex = 1)
```

![](../assets/tutorial-images/rentrez/rentrez_tree.png)

Working with WebEnvs
--------------------

The NCBI provides search history features, which can be useful for dealing with
a large lists of IDs (which will not fit in a single URL) or repeated searches.
As an example, we will go searching for COI sequences from all the snail
(Gastrppod) species we can find in the nucleotide database.

`entrez_db_searchable` helps us find fields that can make part of a search term.



```r
search_fields <- entrez_db_searchable("nuccore")
search_fields
```

```
#> Searchable fields for database 'nuccore'
#>   ALL 	 All terms from all searchable fields 
#>   UID 	 Unique number assigned to each sequence 
#>   FILT 	 Limits the records 
#>   WORD 	 Free text associated with record 
#>   TITL 	 Words in definition line 
#>   KYWD 	 Nonstandardized terms provided by submitter 
#>   AUTH 	 Author(s) of publication 
#>   JOUR 	 Journal abbreviation of publication 
#>   VOL 	 Volume number of publication 
#>   ISS 	 Issue number of publication 
#>   PAGE 	 Page number(s) of publication 
#>   ORGN 	 Scientific and common names of organism, and all higher levels of taxonomy 
#>   ACCN 	 Accession number of sequence 
#>   PACC 	 Does not include retired secondary accessions 
#>   GENE 	 Name of gene associated with sequence 
#>   PROT 	 Name of protein associated with sequence 
#>   ECNO 	 EC number for enzyme or CAS registry number 
#>   PDAT 	 Date sequence added to GenBank 
#>   MDAT 	 Date of last update 
#>   SUBS 	 CAS chemical name or MEDLINE Substance Name 
#>   PROP 	 Classification by source qualifiers and molecule type 
#>   SQID 	 String identifier for sequence 
#>   GPRJ 	 BioProject 
#>   SLEN 	 Length of sequence 
#>   FKEY 	 Feature annotated on sequence 
#>   PORG 	 Scientific and common names of primary organism, and all higher levels of taxonomy 
#>   COMP 	 Component accessions for an assembly 
#>   ASSM 	 Assembly 
#>   DIV 	 Division 
#>   STRN 	 Strain 
#>   ISOL 	 Isolate 
#>   CULT 	 Cultivar 
#>   BRD 	 Breed 
#>   BIOS 	 BioSample
```

```r
search_fields$ORGN
```

```
#>  Name: ORGN
#>  FullName: Organism
#>  Description: Scientific and common names of organism, and all higher levels of taxonomy
#>  TermCount: 2935841
#>  IsDate: N
#>  IsNumerical: N
#>  SingleToken: Y
#>  Hierarchy: Y
#>  IsHidden: N
```
We can then use those terms in a call to `entrez_search`:


```r
snail_search <- entrez_search(db = "nuccore", "Gastropoda[ORGN] AND COI[Gene]", usehistory = "y")
```

Because we set usehistory to "y" the `snail_search` object contains a unique ID for the search (`WebEnv`) and the particular query in that search history (`QueryKey`). Instead of using the hundreds of ids we turned up to make a new URL and fetch the sequences we can use the webhistory features.


```r
cookie <- snail_search$WebEnv
qk <- snail_search$QueryKey
snail_coi <- entrez_fetch(db = "nuccore", WebEnv = cookie, query_key = qk, rettype = "fasta", retmax = 10)
```

In that case we used `retmax` to limit the number of queries we downloaded.
There are actually thousands of records. If we wanted to download all of them it
would probably be a good idea to downlaod them in batches (both to give the
NCBI's severs a break and to make sure a corrupted download doesn't ruin your
whole process. Using a for loop in conjunction with the terms `restart` and
`retmax` we can download the sequences 50 at a time. (This code is not run as
part of this vignette so save you time and the NCBI some server-load):

```r
for (start_rec in seq(0, 200, 50)) {
    fname <- paste("snail_coi_", start_rec, ".fasta", sep = "")
    recs <- entrez_fetch(db = "nuccore", WebEnv = cookie, query_key = qk, rettype = "fasta", retstart = start_rec, retmax = 50)
    write(recs, fname)
    print(paste("wrote records to ", fname, sep = ""))
}
```

<section id="citing">

## Citing

To cite `rentrez` in publications use:

<br>

> David Winter (2014). rentrez: Entrez in R. R package version 0.4.2

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rentrez](https://github.com/ropensci/rentrez/issues?state=open)
