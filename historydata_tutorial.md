---
title: historydata tutorial
layout: tutorial
packge_version: 0.1
---





<section id="installation">

## Installation


```r
install.packages("historydata")
```

Or development version from GitHub


```r
install.packages("devtools")
devtools::install_github("ropensci/historydata")
```


```r
library("historydata")
```

<section id="usage">

## Usage

List all the datasets in the package with their documentation:


```r
help(package = historydata)
```

Which opens help in GUI in Rstudio/R.app, or list within R


```r
ls("package:historydata")
#>  [1] "catholic_dioceses"      "dijon_prices"          
#>  [3] "dijon_prices_wide"      "early_colleges"        
#>  [5] "judges_appointments"    "judges_people"         
#>  [7] "methodists"             "naval_promotions"      
#>  [9] "paulist_missions"       "presbyterians"         
#> [11] "quasi_war"              "sarna"                 
#> [13] "tudors"                 "us_cities_pop"         
#> [15] "us_national_population" "us_state_populations"
```

To load a dataset, e.g, the dataset on Roman Catholic dioceses in the United States, Canada, and Mexico


```r
data("catholic_dioceses")
```

Peek at the dataset


```r
head(catholic_dioceses)
#>                      diocese  rite      lat      long   event       date
#> 1        Baltimore, Maryland Latin 39.29038 -76.61219 erected 1789-04-06
#> 2     New Orleans, Louisiana Latin 29.95107 -90.07153 erected 1793-04-25
#> 3      Boston, Massachusetts Latin 42.35843 -71.05977 erected 1808-04-08
#> 4       Louisville, Kentucky Latin 38.25266 -85.75846 erected 1808-04-08
#> 5         New York, New York Latin 40.71435 -74.00597 erected 1808-04-08
#> 6 Philadelphia, Pennsylvania Latin 39.95233 -75.16379 erected 1808-04-08
```

Another dataset, of the Federal judges in the United States of America


```r
data("judges_people")
```


```r
head(judges_people)
#>   judge_id name_first name_middle name_last name_suffix birth_date
#> 1     3419     Ronnie        <NA>    Abrams        <NA>       1968
#> 2        1    Matthew          T.   Abruzzo        <NA>       1889
#> 3        2     Marcus      Wilson   Acheson        <NA>       1828
#> 4        3    William       Marsh     Acker         Jr.       1927
#> 5        4     Harold      Arnold  Ackerman        <NA>       1928
#> 6        5      James       Waldo  Ackerman        <NA>       1926
#>   birthplace_city birthplace_state death_date  death_city death_state
#> 1        New York               NY         NA        <NA>        <NA>
#> 2        Brooklyn               NY       1971     Potomac          MD
#> 3      Washington               PA       1906  Pittsburgh          PA
#> 4      Birmingham               AL         NA        <NA>        <NA>
#> 5          Newark               NJ       2009 West Orange          NJ
#> 6    Jacksonville               FL       1984 Springfield          IL
#>   gender  race
#> 1      F White
#> 2      M White
#> 3      M White
#> 4      M White
#> 5      M White
#> 6      M White
```


<section id="citing">

## Citing

To cite `historydata` in publications use:

<br>

>  https://cran.rstudio.com/package=historydata

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for historydata](https://github.com/ropensci/historydata/issues?state=open)

[Back to top](#top)
