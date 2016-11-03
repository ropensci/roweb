---
name: release-isdparser
layout: post
title: Parse NOAA Integrated Surface Data Files
date: 2016-11-03
authors:
  - name: Scott Chamberlain
categories:
  - technotes
tags:
  - R
  - climate
---



A new package [isdparser](https://cran.rstudio.com/web/packages/isdparser) is 
on CRAN. `isdparser` was in part liberated from [rnoaa](https://github.com/ropensci/rnoaa), 
then improved. We'll use `isdparser` in `rnoaa` soon. 

`isdparser` does not download files for you from NOAA's ftp servers. The 
package focuses on parsing the files, which are variable length ASCII strings
stored line by line, where each line has some mandatory data, and any amount 
of optional data. 

The data is great, and includes for example, wind speed and direction, temperature, 
cloud data, sea level pressure, and more. Includes data from approximately 35,000 
stations worldwide, though best coverage is in North America/Europe/Australia.
Data go all the way back to 1901, and are updated daily.
    
However, [the data](ftp://ftp.ncdc.noaa.gov/pub/data/noaa/) is not fun to parse, 
warranting an packge to deal with the parsing. 

## Installation


```r
install.packages("isdparser")
```

If binaries aren't available, try from source: 
`install.packages("isdparser", type = "source")` or from GitHub: 
`devtools::install_github("ropenscilabs/isdparser")`


```r
library(isdparser)
library(dplyr)
```

## Parse individual lines

If you want to parse individual lines, use `isd_parse_line()`

First, let's get a ISD file. There's a few that come with the package:


```r
path <- system.file('extdata/024130-99999-2016.gz', package = "isdparser")
```

Read in the file


```r
lns <- readLines(path, encoding = "latin1")
```

Parse a line


```r
isd_parse_line(lns[1])
#> # A tibble: 1 × 42
#>   total_chars usaf_station wban_station       date  time date_flag
#>         <dbl>        <chr>        <chr>     <date> <chr>     <chr>
#> 1          54       024130        99999 2016-01-01  0000         4
#> # ... with 36 more variables: latitude <dbl>, longitude <dbl>,
#> #   type_code <chr>, elevation <dbl>, call_letter <chr>, quality <chr>,
#> #   wind_direction <dbl>, wind_direction_quality <chr>, wind_code <chr>,
#> #   wind_speed <dbl>, wind_speed_quality <chr>, ceiling_height <chr>,
#> #   ceiling_height_quality <chr>, ceiling_height_determination <chr>,
#> #   ceiling_height_cavok <chr>, visibility_distance <chr>,
#> #   visibility_distance_quality <chr>, visibility_code <chr>,
#> #   visibility_code_quality <chr>, temperature <dbl>,
#> #   temperature_quality <chr>, temperature_dewpoint <dbl>,
#> #   temperature_dewpoint_quality <chr>, air_pressure <dbl>,
#> #   air_pressure_quality <chr>,
#> #   AW1_present_weather_observation_identifier <chr>,
#> #   AW1_automated_atmospheric_condition_code <chr>,
#> #   AW1_quality_automated_atmospheric_condition_code <chr>,
#> #   N03_original_observation <chr>, N03_original_value_text <chr>,
#> #   N03_units_code <chr>, N03_parameter_code <chr>, REM_remarks <chr>,
#> #   REM_identifier <chr>, REM_length_quantity <chr>, REM_comment <chr>
```

By default you get a tibble back, but you can ask for a list in return instead.

Parsing by line allows the user to decide how to apply parsing across lines, 
whether it be `lapply` style, or for loop, etc.

## Parse entire files

You can also parse entire ISD files.


```r
(res <- isd_parse(path))
#> # A tibble: 2,601 × 42
#>    total_chars usaf_station wban_station       date  time date_flag
#>          <dbl>        <chr>        <chr>     <date> <chr>     <chr>
#> 1           54       024130        99999 2016-01-01  0000         4
#> 2           54       024130        99999 2016-01-01  0100         4
#> 3           54       024130        99999 2016-01-01  0200         4
#> 4           54       024130        99999 2016-01-01  0300         4
#> 5           54       024130        99999 2016-01-01  0400         4
#> 6           39       024130        99999 2016-01-01  0500         4
#> 7           54       024130        99999 2016-01-01  0600         4
#> 8           39       024130        99999 2016-01-01  0700         4
#> 9           54       024130        99999 2016-01-01  0800         4
#> 10          54       024130        99999 2016-01-01  0900         4
#> # ... with 2,591 more rows, and 36 more variables: latitude <dbl>,
#> #   longitude <dbl>, type_code <chr>, elevation <dbl>, call_letter <chr>,
#> #   quality <chr>, wind_direction <dbl>, wind_direction_quality <chr>,
#> #   wind_code <chr>, wind_speed <dbl>, wind_speed_quality <chr>,
#> #   ceiling_height <chr>, ceiling_height_quality <chr>,
#> #   ceiling_height_determination <chr>, ceiling_height_cavok <chr>,
#> #   visibility_distance <chr>, visibility_distance_quality <chr>,
#> #   visibility_code <chr>, visibility_code_quality <chr>,
#> #   temperature <dbl>, temperature_quality <chr>,
#> #   temperature_dewpoint <dbl>, temperature_dewpoint_quality <chr>,
#> #   air_pressure <dbl>, air_pressure_quality <chr>,
#> #   AW1_present_weather_observation_identifier <chr>,
#> #   AW1_automated_atmospheric_condition_code <chr>,
#> #   AW1_quality_automated_atmospheric_condition_code <chr>,
#> #   N03_original_observation <chr>, N03_original_value_text <chr>,
#> #   N03_units_code <chr>, N03_parameter_code <chr>, REM_remarks <chr>,
#> #   REM_identifier <chr>, REM_length_quantity <chr>, REM_comment <chr>
```

Optionally, you can print progress:


```r
isd_parse(path, progress = TRUE)
#>   |                                                                         |                                                                 |   0%  |                                                                         |                                                                 |   1%  |                                                                         |=                                                                |   1%  |                                                                         |=                                                                |   2%  |                                                                         |==                                                               |   2%  |                                                                         |==                                                               |   3%  |                                                                         |==                                                               |   4%  |                                                                         |===                                                              |   4%  |                                                                         |===                                                              |   5%  |                                                                         |====                                                             |   5%  |                                                                         |====                                                             |   6%  |                                                                         |====                                                             |   7%  |                                                                         |=====                                                            |   7%  |                                                                         |=====                                                            |   8%  |                                                                         |======                                                           |   8%  |                                                                         |======                                                           |   9%  |                                                                         |======                                                           |  10%  |                                                                         |=======                                                          |  10%  |                                                                         |=======                                                          |  11%  |                                                                         |=======                                                          |  12%  |                                                                         |========                                                         |  12%  |                                                                         |========                                                         |  13%  |                                                                         |=========                                                        |  13%  |                                                                         |=========                                                        |  14%  |                                                                         |=========                                                        |  15%  |                                                                         |==========                                                       |  15%  |                                                                         |==========                                                       |  16%  |                                                                         |===========                                                      |  16%  |                                                                         |===========                                                      |  17%  |                                                                         |===========                                                      |  18%  |                                                                         |============                                                     |  18%  |                                                                         |============                                                     |  19%  |                                                                         |=============                                                    |  19%  |                                                                         |=============                                                    |  20%  |                                                                         |=============                                                    |  21%  |                                                                         |==============                                                   |  21%  |                                                                         |==============                                                   |  22%  |                                                                         |===============                                                  |  22%  |                                                                         |===============                                                  |  23%  |                                                                         |===============                                                  |  24%  |                                                                         |================                                                 |  24%  |                                                                         |================                                                 |  25%  |                                                                         |=================                                                |  25%  |                                                                         |=================                                                |  26%  |                                                                         |=================                                                |  27%  |                                                                         |==================                                               |  27%  |                                                                         |==================                                               |  28%  |                                                                         |===================                                              |  28%  |                                                                         |===================                                              |  29%  |                                                                         |===================                                              |  30%  |                                                                         |====================                                             |  30%  |                                                                         |====================                                             |  31%  |                                                                         |====================                                             |  32%  |                                                                         |=====================                                            |  32%  |                                                                         |=====================                                            |  33%  |                                                                         |======================                                           |  33%  |                                                                         |======================                                           |  34%  |                                                                         |======================                                           |  35%  |                                                                         |=======================                                          |  35%  |                                                                         |=======================                                          |  36%  |                                                                         |========================                                         |  36%  |                                                                         |========================                                         |  37%  |                                                                         |========================                                         |  38%  |                                                                         |=========================                                        |  38%  |                                                                         |=========================                                        |  39%  |                                                                         |==========================                                       |  39%  |                                                                         |==========================                                       |  40%  |                                                                         |==========================                                       |  41%  |                                                                         |===========================                                      |  41%  |                                                                         |===========================                                      |  42%  |                                                                         |============================                                     |  42%  |                                                                         |============================                                     |  43%  |                                                                         |============================                                     |  44%  |                                                                         |=============================                                    |  44%  |                                                                         |=============================                                    |  45%  |                                                                         |==============================                                   |  45%  |                                                                         |==============================                                   |  46%  |                                                                         |==============================                                   |  47%  |                                                                         |===============================                                  |  47%  |                                                                         |===============================                                  |  48%  |                                                                         |================================                                 |  48%  |                                                                         |================================                                 |  49%  |                                                                         |================================                                 |  50%  |                                                                         |=================================                                |  50%  |                                                                         |=================================                                |  51%  |                                                                         |=================================                                |  52%  |                                                                         |==================================                               |  52%  |                                                                         |==================================                               |  53%  |                                                                         |===================================                              |  53%  |                                                                         |===================================                              |  54%  |                                                                         |===================================                              |  55%  |                                                                         |====================================                             |  55%  |                                                                         |====================================                             |  56%  |                                                                         |=====================================                            |  56%  |                                                                         |=====================================                            |  57%  |                                                                         |=====================================                            |  58%  |                                                                         |======================================                           |  58%  |                                                                         |======================================                           |  59%  |                                                                         |=======================================                          |  59%  |                                                                         |=======================================                          |  60%  |                                                                         |=======================================                          |  61%  |                                                                         |========================================                         |  61%  |                                                                         |========================================                         |  62%  |                                                                         |=========================================                        |  62%  |                                                                         |=========================================                        |  63%  |                                                                         |=========================================                        |  64%  |                                                                         |==========================================                       |  64%  |                                                                         |==========================================                       |  65%  |                                                                         |===========================================                      |  65%  |                                                                         |===========================================                      |  66%  |                                                                         |===========================================                      |  67%  |                                                                         |============================================                     |  67%  |                                                                         |============================================                     |  68%  |                                                                         |=============================================                    |  68%  |                                                                         |=============================================                    |  69%  |                                                                         |=============================================                    |  70%  |                                                                         |==============================================                   |  70%  |                                                                         |==============================================                   |  71%  |                                                                         |==============================================                   |  72%  |                                                                         |===============================================                  |  72%  |                                                                         |===============================================                  |  73%  |                                                                         |================================================                 |  73%  |                                                                         |================================================                 |  74%  |                                                                         |================================================                 |  75%  |                                                                         |=================================================                |  75%  |                                                                         |=================================================                |  76%  |                                                                         |==================================================               |  76%  |                                                                         |==================================================               |  77%  |                                                                         |==================================================               |  78%  |                                                                         |===================================================              |  78%  |                                                                         |===================================================              |  79%  |                                                                         |====================================================             |  79%  |                                                                         |====================================================             |  80%  |                                                                         |====================================================             |  81%  |                                                                         |=====================================================            |  81%  |                                                                         |=====================================================            |  82%  |                                                                         |======================================================           |  82%  |                                                                         |======================================================           |  83%  |                                                                         |======================================================           |  84%  |                                                                         |=======================================================          |  84%  |                                                                         |=======================================================          |  85%  |                                                                         |========================================================         |  85%  |                                                                         |========================================================         |  86%  |                                                                         |========================================================         |  87%  |                                                                         |=========================================================        |  87%  |                                                                         |=========================================================        |  88%  |                                                                         |==========================================================       |  88%  |                                                                         |==========================================================       |  89%  |                                                                         |==========================================================       |  90%  |                                                                         |===========================================================      |  90%  |                                                                         |===========================================================      |  91%  |                                                                         |===========================================================      |  92%  |                                                                         |============================================================     |  92%  |                                                                         |============================================================     |  93%  |                                                                         |=============================================================    |  93%  |                                                                         |=============================================================    |  94%  |                                                                         |=============================================================    |  95%  |                                                                         |==============================================================   |  95%  |                                                                         |==============================================================   |  96%  |                                                                         |===============================================================  |  96%  |                                                                         |===============================================================  |  97%  |                                                                         |===============================================================  |  98%  |                                                                         |================================================================ |  98%  |                                                                         |================================================================ |  99%  |                                                                         |=================================================================|  99%  |                                                                         |=================================================================| 100%
#> # A tibble: 2,601 × 42
#>    total_chars usaf_station wban_station       date  time date_flag
#>          <dbl>        <chr>        <chr>     <date> <chr>     <chr>
#> 1           54       024130        99999 2016-01-01  0000         4
#> 2           54       024130        99999 2016-01-01  0100         4
#> 3           54       024130        99999 2016-01-01  0200         4
#> 4           54       024130        99999 2016-01-01  0300         4
#> 5           54       024130        99999 2016-01-01  0400         4
#> 6           39       024130        99999 2016-01-01  0500         4
#> 7           54       024130        99999 2016-01-01  0600         4
#> 8           39       024130        99999 2016-01-01  0700         4
#> 9           54       024130        99999 2016-01-01  0800         4
#> 10          54       024130        99999 2016-01-01  0900         4
#> # ... with 2,591 more rows, and 36 more variables: latitude <dbl>,
#> #   longitude <dbl>, type_code <chr>, elevation <dbl>, call_letter <chr>,
#> #   quality <chr>, wind_direction <dbl>, wind_direction_quality <chr>,
#> #   wind_code <chr>, wind_speed <dbl>, wind_speed_quality <chr>,
#> #   ceiling_height <chr>, ceiling_height_quality <chr>,
#> #   ceiling_height_determination <chr>, ceiling_height_cavok <chr>,
#> #   visibility_distance <chr>, visibility_distance_quality <chr>,
#> #   visibility_code <chr>, visibility_code_quality <chr>,
#> #   temperature <dbl>, temperature_quality <chr>,
#> #   temperature_dewpoint <dbl>, temperature_dewpoint_quality <chr>,
#> #   air_pressure <dbl>, air_pressure_quality <chr>,
#> #   AW1_present_weather_observation_identifier <chr>,
#> #   AW1_automated_atmospheric_condition_code <chr>,
#> #   AW1_quality_automated_atmospheric_condition_code <chr>,
#> #   N03_original_observation <chr>, N03_original_value_text <chr>,
#> #   N03_units_code <chr>, N03_parameter_code <chr>, REM_remarks <chr>,
#> #   REM_identifier <chr>, REM_length_quantity <chr>, REM_comment <chr>
```

There's a parallel option as well, coming in handy with the larger ISD files:


```r
isd_parse(path, parallel = TRUE)
```

## Visualize the data

Make better date + time


```r
df <- res %>% 
  rowwise() %>% 
  mutate(
    datetime = as.POSIXct(strptime(paste(date, paste0(substring(time, 1, 2), ":00:00")), "%Y-%m-%d %H:%M:%S"))
  ) %>% 
  ungroup
```

viz


```r
# removing some outliers (obs, look into more for serious use)
library(ggplot2)
ggplot(df[df$temperature < 100,], aes(datetime, temperature)) +
  geom_point() + 
  theme_grey(base_size = 18)
```

![plot of chunk unnamed-chunk-11](figure/unnamed-chunk-11-1.png)


## Future work

I plan to improve performance via profiling and swapping out slower code for faster,
as well as possibly dropping down to C++. 

There was already a featur request for asking for fields of interest instead of
getting all fields, so [that's on the list](https://github.com/ropenscilabs/isdparser/issues/8). 

Do try out `isdparser`. Let us know of any bugs, and any feature requests!
