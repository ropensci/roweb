---
name: nceas-codefest-follow-up
layout: post
title: NCEAS Codefest Follow-up
date: 2014-09-23
author: Scott Chamberlain and Ted Hart
authorurl: http://ropensci.org/about/#core
tags:
- R
- Conference
---

The week after labor day, we had the pleasure of attending the [NCEAS open science codefest](http://nceas.github.io/open-science-codefest/) event in Santa Barbara. It was great to meet folks like the new arrivals at the expanding [Mozilla Science Lab](http://mozillascience.org), [Bill Mills](https://twitter.com/billdoesphysics) and [Abby Cabunoc](https://twitter.com/abbycabs) (Bill even already has a great [post up about the codefest](http://mozillascience.org/worries-critical-mass/)), and see old friends from NCEAS and DataONE, among many more. This 2.5 day event ran smoothly thanks to the leadership of [Matt Jones](https://www.nceas.ucsb.edu/~jones/). It is worth noting how projects were chosen to provide context for what we worked on. Prior to the event people [filed issues](https://github.com/NCEAS/open-science-codefest/issues), but on top of that at the beginning of the event everyone was able to give an elevator pitch for their idea (1 floor ride length :) ), and could even include ideas not posted as issues. Each idea was then posted up on a giant post it on the wall.  Then people had about 30 minutes to wander the room and sign-up to work on projects which the organizers then scheduled. The approach allowed for a consensus based filtering of ideas.  So with that in mind, here's an overview of the projects the rOpenSci team worked on and what we accomplished at the open science codefest.

1. [rdataone](https://github.com/dataoneorg/rdataone) - R client for the [DataONE](https://www.dataone.org/) [API](http://mule1.dataone.org/ArchitectureDocs-current/apis/) that is native to R and doesn't rely Java libraries.
2. [open science in ecology manuscript](https://etherpad.mozilla.org/osmanuscript) - Publication on open science in ecology, and a guide for ecologists wanting to practice open science.
3. [coverage extraction](https://github.com/ropensci/mdextract) - Extract coverage (temporal, spatial, taxonomic) metadata from datasets.  This package will be integrated with a variety of other packages such as [EML](https://github.com/ropensci/EML) and [spocc](https://github.com/ropensci/spocc), facilitating the creation of metadata.
4. [pangear](https://github.com/ropensci/pangaear) - An R client to interact with the [Pangaea database](http://www.pangaea.de/)
5. [datapackage](https://github.com/ropensci/datapackage) - An R package to create and read data packages (similar to [OKFN's data packages](http://data.okfn.org/doc/data-package))

One great thing about this event was mixing more experienced programmers with less experienced ones. In addition to making software, there was a fair amount of training going on. For example, a few people were interested in how to make an R package, so we went through the whole process with [pangear](https://github.com/ropensci/pangaear), and now we have [5 awesome contributors on the package](https://github.com/ropensci/pangaear/graphs/contributors).

Overall we had a great time, were able to begin some new projects, and contribute to some important existing ones. We hope to continue to build out what we started at codefest and integrate it into our existing tool set and work flows.
