---
name: text-commmunity
layout: post
title: A new full text package, and community conversations
date: 2014-08-08
author: Scott Chamberlain
tags:
- R
- community
---

## Community

Community is at the heart of rOpenSci. We couldn't have down most of the work we've done without help from all our contributors and users, some of which are listed [on our website](http://ropensci.org/community/#community).

Key to a strong community is good places to hold discussions. Often this takes the form of mailing lists. We've had [a public mailing list](https://groups.google.com/forum/#!forum/ropensci-discuss) for a while now, but have not used it very much. We aim to rectify that by posting more to the community mailing list asking for feedback, testing, etc., and we hope the community can use it more for discussions of our software.

Sometimes discussions are most appropriate on StackOverflow, especially when the problem is specific to the programming language you're using, not the extension package to that language. Some extension software packages, like `ggplot2`, have their own mailing list, and have a long list of fruitful discussions on it. Other times, you have a bug report for a particular R package, which is often appropriate for the issue tracker for that package.

The mailing list is appropriate for a broad array of discussions, including:

* Questions about any of our R packages, including questions like "How do I make this function do XYZ..." to "I'm getting an error with this package/function...".
* Announcements of what you've done with our software. We'd love to know how you're using our software.
* Questions/thoughts about the future of rOpenSci. Do you want to see a package do XYZ in the future? Do you want a new package to do ABc in the future?

Sign up for our mailing list, ask questions, and help make this a strong community. The mailing list: https://groups.google.com/forum/#!forum/ropensci-discuss

## Text

Through time we have been attempting to unify our R packages that interact with individual data sources into single packages that handle one use case. For example, [spocc](https://github.com/ropensci/spocc) aims to create a single entry point to many different sources (currently 6) of species occurrence data, including [GBIF](http://www.gbif.org/), [AntWeb](http://www.antweb.org/), and others.

Another area we hope to simplify is acquiring text data, specifically text from scholarly journal articles. We call this R package `fulltext`. The goal of `fulltext` is to allow a single user interface to searching for and retrieving full text data from scholarly journal articles. Rather than learning a different interface for each data source, you can learn one interface, making your work easier. `fulltext` will likely only get you data, and make it easy to browse that data, and use it downstream for manipulation, analysis, and vizualization. 

We currently have R packages for a number of sources of scholarly article text, including for [Public Library of Science (PLOS)](https://github.com/ropensci/rplos), [Biomed Central (BMC)](https://github.com/ropensci/bmc), and [ eLife](https://github.com/ropensci/elife) - which could all be included in `fulltext`. We can add more sources as they become available.

Instead of us rOpenSci core members planning out the whole package, we'd love to get the community involved at the beginning.


* What _use cases_ should we include in this packge?
* What data sources should/can be included?
* What are packages that you'd use after getting data with `fulltext`? We can try to make it easy to use data from `fulltext` in your favorite packages for analysis/visualization.
* Any other thoughts are welcome.

This is where we tie in the mailing list above: Please do use the mailing list to let us know what you think. We can then elevate items to the [issue tracker for the package](https://github.com/ropensci/fulltext) on Github as needed.
