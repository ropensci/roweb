---
title: rnoaa tutorial
layout: tutorial
packge_version: 0.1.0
---



<section id="installation">

## Installation


Install and load `rnoaa` into the R session.


```r
library("devtools")
devtools::install_github("rnoaa", "ropensci")
```


```r
library("rnoaa")
library("plyr")
```
<br>

<section id="usage">

## Usage

Get info on a station by specifying a datasetid, locationid, and stationid


```r
noaa_stations(datasetid='GHCND', locationid='FIPS:12017', stationid='GHCND:USC00084289')
```

```
## Error: Could not resolve host: www.ncdc.noaa.gov
```
<br>
Search for data and get a data.frame or list


```r
out <- noaa(datasetid='GHCND', stationid='GHCND:USW00014895', startdate = '2013-10-01', enddate = '2013-12-01')
```

```
## Error: Could not resolve host: www.ncdc.noaa.gov
```

See a data.frame


```r
out$data
```

```
## NULL
```


Plotting

Example 1

Search for data first, then plot


```r
out <- noaa(datasetid='GHCND', stationid='GHCND:USW00014895', datatypeid='PRCP', startdate = '2010-05-01', enddate = '2010-10-31', limit=500)
```

```
## Error: Could not resolve host: www.ncdc.noaa.gov
```

Default plot


```r
noaa_plot(out)
```

```
## Error: no applicable method for 'noaa_plot' applied to an object of class
## "gauge"
```

Create 14 day breaks


```r
noaa_plot(out, breaks="14 days")
```

```
## Error: no applicable method for 'noaa_plot' applied to an object of class
## "gauge"
```

One month breaks


```r
noaa_plot(out, breaks="1 month", dateformat="%d/%m")
```

```
## Error: no applicable method for 'noaa_plot' applied to an object of class
## "gauge"
```
<br>
Example 2

Search for data


```r
out2 <- noaa(datasetid='GHCND', stationid='GHCND:USW00014895', datatypeid='PRCP', startdate = '2010-05-01', enddate = '2010-05-03', limit=100)
```

```
## Error: Could not resolve host: www.ncdc.noaa.gov
```

Make a plot, with 6 hour breaks, and date format with only hour


```r
noaa_plot(out2, breaks="6 hours", dateformat="%H")
```

```
## Error: object 'out2' not found
```
<br>
Combine many calls to noaa function

Search for two sets of data


```r
out1 <- noaa(datasetid='GHCND', stationid='GHCND:USW00014895', datatypeid='PRCP', startdate = '2010-03-01', enddate = '2010-05-31', limit=500)
```

```
## Error: Could not resolve host: www.ncdc.noaa.gov
```

```r
out2 <- noaa(datasetid='GHCND', stationid='GHCND:USW00014895', datatypeid='PRCP', startdate = '2010-09-01', enddate = '2010-10-31', limit=500)
```

```
## Error: Could not resolve host: www.ncdc.noaa.gov
```

Then combine with a call to `noaa_combine`


```r
df <- noaa_combine(out1, out2)
```

```
## Error: object 'out1' not found
```

```r
head(df[[1]]); tail(df[[1]])
```

```
## Error: object of type 'closure' is not subsettable
```

Then plot - the default passing in the combined plot plots the data together. In this case it looks kind of weird since a straight line combines two distant dates.


```r
noaa_plot(df)
```

```
## Error: no applicable method for 'noaa_plot' applied to an object of class
## "function"
```

But we can pass in each separately, which uses `facet_wrap` in `ggplot2` to plot each set of data in its own panel.


```r
noaa_plot(out1, out2, breaks="60 days", dateformat = "%d/%m")
```

```
## Error: object 'out1' not found
```

<section id="citing">

## Citing

To cite `rnoaa` in publications use:

<br>

> Hart Edmund, Scott Chamberlain and Karthik Ram (2014). rnoaa: NOAA climate data from R. R package version 0.1.2. https://github.com/ropensci/rnoaa

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rnoaa](https://github.com/ropensci/rnoaa/issues?state=open)

[Back to top](#top)
