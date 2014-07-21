---
title: rnoaa tutorial
layout: tutorial
packge_version: 0.2.0
---



<section id="installation">

## Installation


Install and load `rnoaa` into the R session. Stable version from CRAN


```r
install.packages("rnoaa")
```

Or development version from Github:


```r
install.packages("devtools")
devtools::install_github("rnoaa", "ropensci")
```


```r
library('rnoaa')
library('plyr')
```

__Note__ that NOAA buoy data requires `netcdf`, and the `ncdf4` R package, which doesn't work well on Windows. Thus, we put functions to interact with that data into a different branch `buoy`. Install that version by doing


```r
devtools::install_github("rnoaa", "ropensci", ref="buoy")
library('rnoaa')
```

<section id="usage">

## Usage

### Get info on a station by specifying a datasetid, locationid, and stationid


```r
ncdc_stations(datasetid='GHCND', locationid='FIPS:12017', stationid='GHCND:USC00084289')
```

```
## $meta
## NULL
## 
## $data
##                  id elevation                  name elevationUnit
## 1 GHCND:USC00084289      12.2 INVERNESS 3 SE, FL US        METERS
##   datacoverage longitude    mindate latitude    maxdate
## 1            1    -82.31 1899-02-01     28.8 2014-07-18
## 
## attr(,"class")
## [1] "ncdc_stations"
```

### Search for data and get a data.frame


```r
out <- ncdc(datasetid='NORMAL_DLY', datatypeid='dly-tmax-normal', startdate = '2010-05-01', enddate = '2010-05-10')
```

See a data.frame


```r
out$data
```

```
##              station value        datatype                date fl_c
## 1  GHCND:AQW00061705   869 DLY-TMAX-NORMAL 2010-05-01T00:00:00    C
## 2  GHCND:CAW00064757   607 DLY-TMAX-NORMAL 2010-05-01T00:00:00    Q
## 3  GHCND:CQC00914080   840 DLY-TMAX-NORMAL 2010-05-01T00:00:00    R
## 4  GHCND:CQC00914801   858 DLY-TMAX-NORMAL 2010-05-01T00:00:00    R
## 5  GHCND:FMC00914395   876 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 6  GHCND:FMC00914419   885 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 7  GHCND:FMC00914446   885 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 8  GHCND:FMC00914482   868 DLY-TMAX-NORMAL 2010-05-01T00:00:00    R
## 9  GHCND:FMC00914720   899 DLY-TMAX-NORMAL 2010-05-01T00:00:00    R
## 10 GHCND:FMC00914761   897 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 11 GHCND:FMC00914831   870 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 12 GHCND:FMC00914892   883 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 13 GHCND:FMC00914898   875 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 14 GHCND:FMC00914911   885 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 15 GHCND:FMW00040308   888 DLY-TMAX-NORMAL 2010-05-01T00:00:00    S
## 16 GHCND:FMW00040504   879 DLY-TMAX-NORMAL 2010-05-01T00:00:00    C
## 17 GHCND:FMW00040505   867 DLY-TMAX-NORMAL 2010-05-01T00:00:00    S
## 18 GHCND:GQC00914025   852 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 19 GHCND:GQW00041415   877 DLY-TMAX-NORMAL 2010-05-01T00:00:00    C
## 20 GHCND:JQW00021603   852 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 21 GHCND:PSC00914519   883 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 22 GHCND:PSC00914712   840 DLY-TMAX-NORMAL 2010-05-01T00:00:00    P
## 23 GHCND:PSW00040309   879 DLY-TMAX-NORMAL 2010-05-01T00:00:00    S
## 24 GHCND:RMW00040604   867 DLY-TMAX-NORMAL 2010-05-01T00:00:00    S
## 25 GHCND:RMW00040710   863 DLY-TMAX-NORMAL 2010-05-01T00:00:00    C
```

### Plot data, super simple, but it's a start


```r
out <- ncdc(datasetid='NORMAL_DLY', stationid='GHCND:USW00014895', datatypeid='dly-tmax-normal', startdate = '2010-01-01', enddate = '2010-12-10', limit = 300)
ncdc_plot(out)
```

![plot of chunk six](../assets/tutorial-images/rnoaa/six.png) 

### More on plotting

#### Example 1

Search for data first, then plot


```r
out <- ncdc(datasetid='GHCND', stationid='GHCND:USW00014895', datatypeid='PRCP', startdate = '2010-05-01', enddate = '2010-10-31', limit=500)
```

Default plot


```r
ncdc_plot(out)
```

![plot of chunk unnamed-chunk-3](../assets/tutorial-images/rnoaa/unnamed-chunk-3.png) 

Create 14 day breaks


```r
ncdc_plot(out, breaks="14 days")
```

![plot of chunk unnamed-chunk-4](../assets/tutorial-images/rnoaa/unnamed-chunk-4.png) 

One month breaks


```r
ncdc_plot(out, breaks="1 month", dateformat="%d/%m")
```

![plot of chunk unnamed-chunk-5](../assets/tutorial-images/rnoaa/unnamed-chunk-5.png) 

#### Example 2

Search for data


```r
out2 <- ncdc(datasetid='GHCND', stationid='GHCND:USW00014895', datatypeid='PRCP', startdate = '2010-05-01', enddate = '2010-05-03', limit=100)
```

Make a plot, with 6 hour breaks, and date format with only hour


```r
ncdc_plot(out2, breaks="6 hours", dateformat="%H")
```

![plot of chunk unnamed-chunk-7](../assets/tutorial-images/rnoaa/unnamed-chunk-7.png) 

### Combine many calls to noaa function

Search for two sets of data


```r
out1 <- ncdc(datasetid='GHCND', stationid='GHCND:USW00014895', datatypeid='PRCP', startdate = '2010-03-01', enddate = '2010-05-31', limit=500)

out2 <- ncdc(datasetid='GHCND', stationid='GHCND:USW00014895', datatypeid='PRCP', startdate = '2010-09-01', enddate = '2010-10-31', limit=500)
```

Then combine with a call to `ncdc_combine`


```r
df <- ncdc_combine(out1, out2)
head(df[[1]]); tail(df[[1]])
```

```
##             station value datatype                date fl_m fl_q fl_so
## 1 GHCND:USW00014895     0     PRCP 2010-03-01T00:00:00    T          0
## 2 GHCND:USW00014895     0     PRCP 2010-03-02T00:00:00    T          0
## 3 GHCND:USW00014895     0     PRCP 2010-03-03T00:00:00    T          0
## 4 GHCND:USW00014895     0     PRCP 2010-03-04T00:00:00               0
## 5 GHCND:USW00014895     0     PRCP 2010-03-05T00:00:00               0
## 6 GHCND:USW00014895     0     PRCP 2010-03-06T00:00:00               0
##   fl_t
## 1 2400
## 2 2400
## 3 2400
## 4 2400
## 5 2400
## 6 2400
```

```
##               station value datatype                date fl_m fl_q fl_so
## 148 GHCND:USW00014895   221     PRCP 2010-10-26T00:00:00               0
## 149 GHCND:USW00014895     0     PRCP 2010-10-27T00:00:00               0
## 150 GHCND:USW00014895     0     PRCP 2010-10-28T00:00:00    T          0
## 151 GHCND:USW00014895     0     PRCP 2010-10-29T00:00:00    T          0
## 152 GHCND:USW00014895     0     PRCP 2010-10-30T00:00:00               0
## 153 GHCND:USW00014895     0     PRCP 2010-10-31T00:00:00               0
##     fl_t
## 148 2400
## 149 2400
## 150 2400
## 151 2400
## 152 2400
## 153 2400
```

Then plot - the default passing in the combined plot plots the data together. In this case it looks kind of weird since a straight line combines two distant dates.


```r
ncdc_plot(df)
```

![plot of chunk unnamed-chunk-10](../assets/tutorial-images/rnoaa/unnamed-chunk-10.png) 

But we can pass in each separately, which uses `facet_wrap` in `ggplot2` to plot each set of data in its own panel.


```r
ncdc_plot(out1, out2, breaks="45 days")
```

![plot of chunk unnamed-chunk-11](../assets/tutorial-images/rnoaa/unnamed-chunk-11.png) 

<section id="citing">

## Citing

To cite `rnoaa` in publications use:

<br>

> Hart Edmund, Scott Chamberlain and Karthik Ram (2014). rnoaa: NOAA climate data from R. R package version 0.2.0. https://github.com/ropensci/rnoaa

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rnoaa](https://github.com/ropensci/rnoaa/issues?state=open)

[Back to top](#top)
