---
title: bold tutorial
layout: tutorial
packge_version: 0.2.0
---



`bold` is an R package to connect to BOLD Systems \url{http://www.boldsystems.org/} via their API. Functions in `bold` let you search for sequence data, specimen data, sequence + specimen data, and download raw trace files.

__`bold` info__

+ [BOLD home page](http://boldsystems.org/)
+ [BOLD API docs](boldsystems.org/index.php/resources/api)

<section id="installation">

## Installation

You can install the stable version from CRAN



```r
install.packages("bold")
```

Or the development version from Github



```r
install.packages("devtools")
devtools::install_github("ropensci/bold")
```

Then load the package into the R sesssion



```r
library("bold")
```

<section id="usage">

## Usage

## Search for taxonomic names via names

`bold_tax_name` searches for names with names.


```r
bold_tax_name(name='Diplura')
#>     input  taxid   taxon tax_rank tax_division parentid       parentname
#> 1 Diplura 591238 Diplura    order      Animals       82          Insecta
#> 2 Diplura 603673 Diplura    genus     Protists    53974 Scytosiphonaceae
#>   taxonrep
#> 1  Diplura
#> 2     <NA>
```


```r
bold_tax_name(name=c('Diplura','Osmia'))
#>     input  taxid   taxon tax_rank tax_division parentid       parentname
#> 1 Diplura 591238 Diplura    order      Animals       82          Insecta
#> 2 Diplura 603673 Diplura    genus     Protists    53974 Scytosiphonaceae
#> 3   Osmia   4940   Osmia    genus      Animals     4962     Megachilinae
#>   taxonrep
#> 1  Diplura
#> 2     <NA>
#> 3    Osmia
```


### Search for taxonomic names via BOLD identifiers

`bold_tax_id` searches for names with BOLD identifiers.


```r
bold_tax_id(id=88899)
#>   input taxid   taxon tax_rank tax_division parentid parentname
#> 1 88899 88899 Momotus    genus      Animals    88898  Momotidae
```


```r
bold_tax_id(id=c(88899,125295))
#>    input  taxid      taxon tax_rank tax_division parentid parentname
#> 1  88899  88899    Momotus    genus      Animals    88898  Momotidae
#> 2 125295 125295 Helianthus    genus       Plants   100962 Asteraceae
```


### Search for sequence data only

The BOLD sequence API gives back sequence data, with a bit of metadata.

The default is to get a list back


```r
bold_seq(taxon='Coelioxys')[1:2]
#> [[1]]
#> [[1]]$id
#> [1] "BBHYL406-10"
#> 
#> [[1]]$name
#> [1] "Coelioxys moesta"
#> 
#> [[1]]$gene
#> [1] "BBHYL406-10"
#> 
#> [[1]]$sequence
#> [1] "TATAATATATATAATTTTTGCAATATGATCAGGAATAATTGGATCTTCTATAAGTATAATTATTCGAATAGAATTAAGAATCCCAGGATCATGAATTAATAATGATCAAATTTATAACTCTTTTATTACAGCACATGCATTTTTAATAATTTTTTTTTTAGTTATACCTTTTTTAATTGGAGGGTTTGGAAATTGATTAACACCATTAATATTAGGAGCTCCTGATATAGCTTTCCCTCGAATAAATAATATTAGATTTTGATTATTACCCCCATCTTTATTAATATTATTATCAAGAAATTTAATTAATCCAAGACCAGGTACAGGATGAACTGTTTACCCTCCTTTATCCTCATATATATATCATCCTTCACCATCAGTAGATTTAGCTATTTTTTCTTTACACTTATCTGGTATTTCTTCAATTATTGGATCAATAAATTTTATTGTAACAATTTTAATAATAAAAAATTATTCAATAAATTATAATCAAATACCCCTATTTCCATGATCAGTTTTAATTACTACAATTTTATTATTATTATCATTACCGGTATTAGCAGGAGCAATTACAATATTATTATTTGATCGAAATTTAAATTCATCTTTTTTTGATCCTATAGGAGGAGGAGATCCTATTTTATACCAACATTTATTT"
#> 
#> 
#> [[2]]
#> [[2]]$id
#> [1] "BCHYM446-13"
#> 
#> [[2]]$name
#> [1] "Coelioxys afra"
#> 
#> [[2]]$gene
#> [1] "BCHYM446-13"
#> 
#> [[2]]$sequence
#> [1] "-------------------------------------------------------------------------------------------------------------------------------------------TTTTTAATAATTTTTTTTTTAGTTATACCATTTTTAATTGGAGGATTTGGAAATTGATTAGTACCTTTAATACTAGGAGCCCCCGATATAGCTTTTCCACGAATAAATAATGTAAGATTTTGACTATTACCTCCCTCAATTTTCTTATTATTATCAAGAACCCTAATTAACCCAAGAGCTGGTACTGGATGAACTGTANCTCCTCCTTTATCCTTATATACATTTCATGCCTCACCTTCCGTTGATTTAGCAATTTTTTCACTTCATTTATCAGGAATTTCATCAATTATTGGATCAATAAATTTTATTGTTACAATCTTAATAATAAAAAATTTTTCTTTAAATTATAGACAAATACCATTATTTTCATGATCAGTTTTAATTACTACAATTTTACTTTTATTATCATTACCAATTTTAGCTGGAGCAATTACTATACTCCTATTTGATCGAAATTTAAATACCTCATTCTTTGACC-----------------------------------------"
```

You can optionally get back the `httr` response object


```r
res <- bold_seq(taxon='Coelioxys', response=TRUE)
res$headers
#> $date
#> [1] "Thu, 13 Nov 2014 02:07:55 GMT"
#> 
#> $server
#> [1] "Apache/2.2.15 (Red Hat)"
#> 
#> $`x-powered-by`
#> [1] "PHP/5.3.15"
#> 
#> $`content-disposition`
#> [1] "attachment; filename=fasta.fas"
#> 
#> $connection
#> [1] "close"
#> 
#> $`transfer-encoding`
#> [1] "chunked"
#> 
#> $`content-type`
#> [1] "application/x-download"
#> 
#> attr(,"class")
#> [1] "insensitive" "list"
```

You can do geographic searches


```r
bold_seq(geo = "USA")
#> [[1]]
#> [[1]]$id
#> [1] "NEONV108-11"
#> 
#> [[1]]$name
#> [1] "Aedes thelcter"
#> 
#> [[1]]$gene
#> [1] "NEONV108-11"
#> 
#> [[1]]$sequence
#> [1] "AACTTTATACTTCATCTTCGGAGTTTGATCAGGAATAGTTGGTACATCATTAAGAATTTTAATTCGTGCTGAATTAAGTCAACCAGGTATATTTATTGGAAATGACCAAATTTATAATGTAATTGTTACAGCTCATGCTTTTATTATAATTTTCTTTATAGTTATACCTATTATAATTGGAGGATTTGGAAATTGACTAGTTCCTCTAATATTAGGAGCCCCAGATATAGCTTTCCCTCGAATAAATAATATAAGTTTTTGAATACTACCTCCCTCATTAACTCTTCTACTTTCAAGTAGTATAGTAGAAAATGGATCAGGAACAGGATGAACAGTTTATCCACCTCTTTCATCTGGAACTGCTCATGCAGGAGCCTCTGTTGATTTAACTATTTTTTCTCTTCATTTAGCCGGAGTTTCATCAATTTTAGGGGCTGTAAATTTTATTACTACTGTAATTAATATACGATCTGCAGGAATTACTCTTGATCGACTACCTTTATTCGTTTGATCTGTAGTAATTACAGCTGTTTTATTACTTCTTTCACTTCCTGTATTAGCTGGAGCTATTACAATACTATTAACTGATCGAAATTTAAATACATCTTTCTTTGATCCAATTGGAGGAGGAGACCCAATTTTATACCAACATTTATTT"
#> 
#> 
#> [[2]]
#> [[2]]$id
#> [1] "NEONV109-11"
#> 
#> [[2]]$name
#> [1] "Aedes thelcter"
#> 
#> [[2]]$gene
#> [1] "NEONV109-11"
#> 
#> [[2]]$sequence
#> [1] "AACTTTATACTTCATCTTCGGAGTTTGATCAGGAATAGTTGGTACATCATTAAGAATTTTAATTCGTGCTGAATTAAGTCAACCAGGTATATTTATTGGAAATGACCAAATTTATAATGTAATTGTTACAGCTCATGCTTTTATTATAATTTTCTTTATAGTTATACCTATTATAATTGGAGGATTTGGAAATTGACTAGTTCCTCTAATATTAGGAGCCCCAGATATAGCTTTCCCTCGAATAAATAATATAAGTTTTTGAATACTACCTCCCTCATTAACTCTTCTACTTTCAAGTAGTATAGTAGAAAATGGGTCAGGAACAGGATGAACAGTTTATCCACCTCTTTCATCTGGAACTGCTCATGCAGGAGCCTCTGTTGATTTAACTATTTTTTCTCTTCATTTAGCCGGAGTTTCATCAATTTTAGGGGCTGTAAATTTTATTACTACTGTAATTAATATACGATCTGCAGGAATTACTCTTGATCGACTACCTTTATTCGTTTGATCTGTAGTAATTACAGCTGTTTTATTACTTCTTTCACTTCCTGTATTAGCTGGAGCTATTACAATACTATTAACTGATCGAAATTTAAATACATCTTTCTTTGACCCAATTGGAGGGGGAGACCCAATTTTATACCAACATTTATTT"
```

And you can search by researcher name


```r
bold_seq(researchers='Thibaud Decaens')[[1]]
#> $id
#> [1] "COLNO056-09"
#> 
#> $name
#> [1] "Lepidocyrtus"
#> 
#> $gene
#> [1] "COLNO056-09"
#> 
#> $sequence
#> [1] "AACATTGTATTTAATTTTCGGCGCATGGTCTGCCATAGTAGGAACTGCATTTAGTGTATTAATCCGCCTAGAGTTAGGCCAACCAGGAAGCTTCATTGGAGATGATCAAATTTATAATGTTATAGTAACCGCCCACGCTTTTATTATAATTTTTTTCATAGTTATACCAATTATAATTGGTGGGTTCGGTAACTGACTAGTCCCCTTAATAATTGGTGCTCCAGATATAGCCTTCCCACGAATAAATAATATAAGTTTTTGACTACTACCCCCTTCATTAACACTTCTTTTAGCGGGGGGGCTAGTAGAAAGAGGGGCCGGTACGGGATGAACTGTTTACCCTCCGCTAGCAGCGGGGATTGCCCATGCTGGAGCCTCCGTAGATCTTTCTATTTTTAGTCTCCACCTAGCGGGTGCCTCTTCAATTTTGGGGGCTGTAAATTTTATTACAACTATTATTAATATACGAACACCAGGCCTGTCCTGGGACCAGACCCCACTTTTTGTGTGGTCTGTGTTTCTTACAGCAATTTTATTGCTTCTATCCCTTCCAGTTTTAGCTGGTGCTATCACCATACTTTTAACAGACCGTAATTTAAATACCTCTTTCTTCGATCCTGCTGGAGGAGGGGACCCTATTTTGTACCAACATTTATTT"
```

by taxon IDs


```r
bold_seq(ids=c('ACRJP618-11','ACRJP619-11'))
#> [[1]]
#> [[1]]$id
#> [1] "ACRJP618-11"
#> 
#> [[1]]$name
#> [1] "Lepidoptera"
#> 
#> [[1]]$gene
#> [1] "ACRJP618-11"
#> 
#> [[1]]$sequence
#> [1] "------------------------TTGAGCAGGCATAGTAGGAACTTCTCTTAGTCTTATTATTCGAACAGAATTAGGAAATCCAGGATTTTTAATTGGAGATGATCAAATCTACAATACTATTGTTACGGCTCATGCTTTTATTATAATTTTTTTTATAGTTATACCTATTATAATTGGAGGATTTGGTAATTGATTAGTTCCCCTTATACTAGGAGCCCCAGATATAGCTTTCCCTCGAATAAACAATATAAGTTTTTGGCTTCTTCCCCCTTCACTATTACTTTTAATTTCCAGAAGAATTGTTGAAAATGGAGCTGGAACTGGATGAACAGTTTATCCCCCACTGTCATCTAATATTGCCCATAGAGGTACATCAGTAGATTTAGCTATTTTTTCTTTACATTTAGCAGGTATTTCCTCTATTTTAGGAGCGATTAATTTTATTACTACAATTATTAATATACGAATTAACAGTATAAATTATGATCAAATACCACTATTTGTGTGATCAGTAGGAATTACTGCTTTACTCTTATTACTTTCTCTTCCAGTATTAGCAGGTGCTATCACTATATTATTAACGGATCGAAATTTAAATACATCATTTTTTGATCCTGCAGGAGGAGGAGATCCAATTTTATATCAACATTTATTT"
#> 
#> 
#> [[2]]
#> [[2]]$id
#> [1] "ACRJP619-11"
#> 
#> [[2]]$name
#> [1] "Lepidoptera"
#> 
#> [[2]]$gene
#> [1] "ACRJP619-11"
#> 
#> [[2]]$sequence
#> [1] "AACTTTATATTTTATTTTTGGTATTTGAGCAGGCATAGTAGGAACTTCTCTTAGTCTTATTATTCGAACAGAATTAGGAAATCCAGGATTTTTAATTGGAGATGATCAAATCTACAATACTATTGTTACGGCTCATGCTTTTATTATAATTTTTTTTATAGTTATACCTATTATAATTGGAGGATTTGGTAATTGATTAGTTCCCCTTATACTAGGAGCCCCAGATATAGCTTTCCCTCGAATAAACAATATAAGTTTTTGGCTTCTTCCCCCTTCACTATTACTTTTAATTTCCAGAAGAATTGTTGAAAATGGAGCTGGAACTGGATGAACAGTTTATCCCCCACTGTCATCTAATATTGCCCATAGAGGTACATCAGTAGATTTAGCTATTTTTTCTTTACATTTAGCAGGTATTTCCTCTATTTTAGGAGCGATTAATTTTATTACTACAATTATTAATATACGAATTAACAGTATAAATTATGATCAAATACCACTATTTGTGTGATCAGTAGGAATTACTGCTTTACTCTTATTACTTTCTCTTCCAGTATTAGCAGGTGCTATCACTATATTATTAACGGATCGAAATTTAAATACATCATTTTTTGATCCTGCAGGAGGAGGAGATCCAATTTTATATCAACATTTATTT"
```

by container (containers include project codes and dataset codes)


```r
bold_seq(container='ACRJP')[[1]]
#> $id
#> [1] "ACRJP036-09"
#> 
#> $name
#> [1] "Lepidoptera"
#> 
#> $gene
#> [1] "ACRJP036-09"
#> 
#> $sequence
#> [1] "-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------TAAGATTTTGACTTCTTCCCCCCTCTTTAATTTTGCTAATTTCCAGTAGTATTGTAGAAAATGGAACTGGAACTGGATGAACAGTTTACCCTCCTTTATCCTCTAACACAGCTCATAGGGGGGCCTCTGTTGATTTAACTATTTTTTCCCTTCATTTAGCAGGTATTTCTTCTATTTTAGGAGCTATTAACTTCATTACCACAATTATTAATATACGATTAAATAATCTATCATTTGATAAAATACCTTTATTTGTTTGAGCAGTAGGAATTACAGCTTTATTATTACTTTTATCTTTACCAGTCTTAGCTGGAGCTATTACTATATTATTAACCGATCGTAATTTAAACACTTCATTTTTTGATCCTGCGGGAGGTGGTGACCCTATTCTCTACCAACATTTATTT"
```

by bin (a bin is a _Barcode Index Number_)


```r
bold_seq(bin='BOLD:AAA5125')[[1]]
#> $id
#> [1] "ASARD6776-12"
#> 
#> $name
#> [1] "Lepidoptera"
#> 
#> $gene
#> [1] "ASARD6776-12"
#> 
#> $sequence
#> [1] "AACTTTATATTTTATTTTTGGAATTTGAGCAGGTATAGTAGGAACTTCTTTAAGATTACTAATTCGAGCAGAATTAGGTACCCCCGGATCTTTAATTGGAGATGACCAAATTTATAATACCATTGTAACAGCTCATGCTTTTATTATAATTTTTTTTATAGTTATACCTATTATAATTGGAGGATTTGGAAATTGATTAGTACCCCTAATACTAGGAGCTCCTGATATAGCTTTCCCCCGAATAAATAATATAAGATTTTGACTATTACCCCCATCTTTAACCCTTTTAATTTCTAGAAGAATTGTCGAAAATGGAGCTGGAACTGGATGAACAGTTTATCCCCCCCTTTCATCTAATATTGCTCATGGAGGCTCTTCTGTTGATTTAGCTATTTTTTCCCTTCATCTAGCTGGAATCTCATCAATTTTAGGAGCTATTAATTTTATCACAACAATCATTAATATACGACTAAATAATATAATATTTGACCAAATACCTTTATTTGTATGAGCTGTTGGTATTACAGCATTTCTTTTATTGTTATCTTTACCTGTACTAGCTGGAGCTATTACTATACTTTTAACAGATCGAAACTTAAATACATCATTTTTTGACCCAGCAGGAGGAGGAGATCCTATTCTCTATCAACATTTATTT"
```

And there are more ways to query, check out the docs for `?bold_seq`.


### Search for specimen data only

The BOLD specimen API doesn't give back sequences, only specimen data. By default you download `tsv` format data, which is given back to you as a `data.frame`


```r
res <- bold_specimens(taxon='Osmia')
head(res[,1:8])
#>      processid         sampleid recordID       catalognum         fieldnum
#> 1  BBHYL361-10     10BBCHY-3315  1769804     10BBCHY-3315   L#PC2010GR-153
#> 2  BBHYL363-10     10BBCHY-3317  1769806     10BBCHY-3317   L#PC2010YO-001
#> 3  BBHYL365-10     10BBCHY-3319  1769808     10BBCHY-3319   L#PC2010YO-150
#> 4 BCHYM1491-13 BC ZSM HYM 19351  4005340 BC ZSM HYM 19351 BC ZSM HYM 19351
#> 5  FBAPB666-09 BC ZSM HYM 02141  1289027 BC ZSM HYM 02141 BC ZSM HYM 02141
#> 6  FBAPB667-09 BC ZSM HYM 02142  1289028 BC ZSM HYM 02142 BC ZSM HYM 02142
#>                    institution_storing      bin_uri phylum_taxID
#> 1    Biodiversity Institute of Ontario BOLD:ABZ0288           20
#> 2    Biodiversity Institute of Ontario BOLD:ABZ0288           20
#> 3    Biodiversity Institute of Ontario BOLD:AAC8510           20
#> 4 Bavarian State Collection of Zoology BOLD:AAK6070           20
#> 5 Bavarian State Collection of Zoology BOLD:AAI1798           20
#> 6 Bavarian State Collection of Zoology BOLD:AAI1798           20
```

You can optionally get back the data in `XML` format


```r
bold_specimens(taxon='Osmia', format='xml')
```


```r
<?xml version="1.0" encoding="UTF-8"?>
<bold_records  xsi:noNamespaceSchemaLocation="http://www.boldsystems.org/schemas/BOLDPublic_record.xsd"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <record>
    <record_id>1470124</record_id>
    <processid>BOM1525-10</processid>
    <bin_uri>BOLD:AAN3337</bin_uri>
    <specimen_identifiers>
      <sampleid>DHB 1011</sampleid>
      <catalognum>DHB 1011</catalognum>
      <fieldnum>DHB1011</fieldnum>
      <institution_storing>Marjorie Barrick Museum</institution_storing>
    </specimen_identifiers>
    <taxonomy>
```

You can choose to get the `httr` response object back if you'd rather work with the raw data returned from the BOLD API.


```r
res <- bold_specimens(taxon='Osmia', format='xml', response=TRUE)
res$url
#> [1] "http://www.boldsystems.org/index.php/API_Public/specimen?taxon=Osmia&specimen_download=xml"
res$status_code
#> [1] 200
res$headers
#> $date
#> [1] "Thu, 13 Nov 2014 02:08:54 GMT"
#> 
#> $server
#> [1] "Apache/2.2.15 (Red Hat)"
#> 
#> $`x-powered-by`
#> [1] "PHP/5.3.15"
#> 
#> $`content-disposition`
#> [1] "attachment; filename=bold_data.xml"
#> 
#> $connection
#> [1] "close"
#> 
#> $`transfer-encoding`
#> [1] "chunked"
#> 
#> $`content-type`
#> [1] "application/x-download"
#> 
#> attr(,"class")
#> [1] "insensitive" "list"
```

### Search for specimen plus sequence data

The specimen/sequence combined API gives back specimen and sequence data. Like the specimen API, this one gives by default `tsv` format data, which is given back to you as a `data.frame`. Here, we're setting `sepfasta=TRUE` so that the sequence data is given back as a list, and taken out of the `data.frame` returned so the `data.frame` is more manageable.


```r
res <- bold_seqspec(taxon='Osmia', sepfasta=TRUE)
res$fasta[1:2]
#> $`BBHYL361-10`
#> [1] "AATTTTATATATAATTTTTGCTATATGATCAGGTATAATTGGATCAGCAATAAGAATTATTATTCGTATAGAATTAAGAATTCCCGGTTCATGAATTTCAAATGATCAAACTTATAATTCTTTAGTAACTGCTCATGCCTTTTTAATAATTTTTTTCTTAGTTATACCATTTTTAATTGGAGGATTTGGTAATTGATTAATTCCTTTAATATTAGGAATTCCAGATATAGCTTTCCCCCGAATAAATAATATTAGATTTTGACTTTTACCTCCCTCATTAATATTATTACTTTTAAGAAATTTTCTTAATCCAAGACCAGGTACTGGATGAACTGTTTATCCTCCTCTTTCTTCTCATTTATTTCATTCCTCTCCTTCAATTGATATAGCTATTTTTTCTTTACATATTTCTGGTTTATCTTCTATTATAGGTTCATTAAATTTTATTGTAACAATTATTATAATAAAAAATATTTCTTTAAAACATATTCAATTACCTTTATTTCCATGATCTGTATTTATTACTACTATTTTATTACTTCTTTCTTTACCTGTTTTAGCAGGAGCTATTACTATATTATTATTTGATCGAAATTTTAATACTTCATTTTTTGATCCTACAGGAGGAGGAGATCCAATTCTTTATCAACATTTATTT"
#> 
#> $`BBHYL363-10`
#> [1] "AATTTTATATATAATTTTTGCTATATGATCAGGTATAATTGGATCAGCAATAAGAATTATTATTCGTATAGAATTAAGAATTCCCGGTTCATGAATTTCAAATGATCAAACTTATAATTCTTTAGTAACTGCTCATGCCTTTTTAATAATTTTTTTCTTAGTTATACCATTTTTAATTGGAGGATTTGGTAATTGATTAATTCCTTTAATATTAGGAATTCCAGATATAGCTTTCCCCCGAATAAATAATATTAGATTTTGACTTTTACCTCCCTCATTAATATTATTACTTTTAAGAAATTTTCTTAATCCAAGACCAGGTACTGGATGAACTGTTTATCCTCCTCTTTCTTCTCATTTATTTCATTCCTCTCCTTCAATTGATATAGCTATTTTTTCTTTACATATTTCTGGTTTATCTTCTATTATAGGTTCATTAAATTTTATTGTAACAATTATTATAATAAAAAATATTTCTTTAAAACATATTCAATTACCTTTATTTCCATGATCTGTATTTATTACTACTATTTTATTACTTCTTTCTTTACCTGTTTTAGCAGGAGCTATTACTATATTATTATTTGATCGAAATTTTAATACTTCATTTTTTGATCCTACAGGAGGAGGAGATCCAATTCTTTATCAACATTTATTT"
```

Or you can index to a specific sequence like


```r
res$fasta['GBAH0293-06']
#> $`GBAH0293-06`
#> [1] "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------TTAATGTTAGGGATTCCAGATATAGCTTTTCCACGAATAAATAATATTAGATTTTGACTGTTACCTCCATCTTTAATATTATTACTTTTAAGAAATTTTTTAAATCCAAGTCCTGGAACAGGATGAACAGTTTATCCTCCTTTATCATCAAATTTATTTCATTCTTCTCCTTCAGTTGATTTAGCAATTTTTTCTTTACATATTTCAGGTTTATCTTCTATTATAGGTTCATTAAATTTTATTGTTACAATTATTATAATAAAAAATATTTCTTTAAAATATATTCAATTACCTTTATTTTCTTGATCTGTATTTATTACTACTATTCTTTTATTATTTTCTTTACCTGTATTAGCTGGAGCTATTACTATATTATTATTTGATCGAAATTTTAATACATCTTTTTTTGATCCAACAGGAGGGGGAGATCCAATTCTTTATCAACATTTATTTTGATTTTTTGGTCATCCTGAAGTTTATATTTTAATTTTACCTGGATTTGGATTAATTTCTCAAATTATTTCTAATGAAAGAGGAAAAAAAGAAACTTTTGGAAATATTGGTATAATTTATGCTATATTAAGAATTGGACTTTTAGGTTTTATTGTT---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
```

### Get trace files

This function downloads files to your machine - it does not load them into your R session - but prints out where the files are for your information.


```r
bold_trace(taxon='Osmia', quiet=TRUE)
#> Downloading: 51 MB     
#> <bold trace files> 
#> 
#> .../bold/bold_trace_files/BBHYL361-10[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/BBHYL361-10[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/BBHYL363-10[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/BBHYL363-10[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/BBHYL365-10[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/BBHYL365-10[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBAPB666-09[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBAPB666-09[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBAPB667-09[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBAPB674-09[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBAPB674-09[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBAPB685-09[LepF1,C_ANTMR1D]_F.ab1
#> .../bold/bold_trace_files/FBAPB685-09[RonMWASPdeg_t1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBAPB685-09[RonMWASPdeg_t1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBAPB708-09[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBAPB708-09[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBAPB718-09[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBAPB718-09[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBAPB739-09[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBAPB739-09[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBHAP295-09[LepF1,C_ANTMR1D]_F.ab1
#> .../bold/bold_trace_files/FBHAP295-09[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBHAP295-09[RonMWASPdeg_t1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBHAP295-09[RonMWASPdeg_t1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBHAP299-09[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBHAP299-09[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBHAP301-09[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBHAP301-09[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBHAP328-09[LepF1,C_ANTMR1D]_F.ab1
#> .../bold/bold_trace_files/FBHAP328-09[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBHAP328-09[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBHAP328-09[RonMWASPdeg_t1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBHAP328-09[RonMWASPdeg_t1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBHAP329-09[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBHAP329-09[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/SSWLB1482-13[LepF1,LepR1]_R.ab1
```


<section id="citing">

## Citing

To cite `bold` in publications use:

<br>

> Scott Chamberlain (2014). bold: Interface to Bold Systems API. R package version 0.2.0. https://github.com/ropensci/bold

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for bold](https://github.com/ropensci/bold/issues?state=open)

[Back to top](#top)
