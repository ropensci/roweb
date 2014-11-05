---
name: open-data-growth
layout: post
title: Growth of open data in biology
date: 2014-11-04
author: Scott Chamberlain
tags:
- R
- data
---

## Why open data growth

At rOpenSci we make it easier for you to use open data, and contribute your own open data to the community. The question often arises: How much is the amount of open data growing through time?

We work with more than X data sources. We asked many of them to share some data on the amount of data they have, and if possible, growth through time of their data holdings. Many of our partners came through with some data.

We collated data from the different sources, and made some pretty graphs using the data. Here's what we found:

## Amount of open data

XXXX

## Growth of open data

XXXX

### Reproduce this

You can reproduce or build on the work here using the following:

* Option 1: If you are comfortable with git, simply clone the [dbgrowth repository](https://github.com/ropensci/dbgrowth) to your machine, uncompress the compressed file, `cd` to the directory, and run `R`. Running R should enter _packrat mode_, which will install packages from within the directory, after which point you can reproduce what we have done above.
* Option 2: Install the `packrat` R package if you don't have it already. Download the compressed file (a _packrat bundle_), then in R, run `packrat::unbundle("<path to tar.gz>", "<path to put the contents>")`, which will uncompress the file, and install packages, and you're ready to go.
