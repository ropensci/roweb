---
name: year-end-summary
layout: post
title: Community calls
date: 2014-12-16
authors:
  - name: Leadership Team
tags:
- community
- R
---

We've had a very productive year, ...

This year we have...

```{r echo=FALSE}
knitr::opts_chunk$set(
  warning = FALSE,
  message = FALSE
)
```

We briefly summarize the activities of the rOpenSci project from July 2013 till October 2014.


# 1. Software Developed

One of the significant deliverables we listed in our grant proposal was development of several key software packages to increase interest and participation from our community. To this end, we actively developed 103 packages (60 of them new to the grant period) over the last 15 month period. The following is a summary of the highlights:

**EML** Ecological Metadata Languages is an XML extension that allows users to make machine readable
metadata for datasets. The R client `EML` makes it simple to create EML formatted metadata, which
can be published to many data repositories online, and used to parse EML data.

**RNeXML** NeXML is a XML extension for specifying metadata, and data, for phylogenetic trees.
Phylogenies are used across many disciplines, including biology, linguistics, and anthropology.
The `RNeXML` R client makes it easy to create and read NeXML.

**spocc** There are a lot of sources of species occurrence data for biologists. We make R clients
for many of them. Instead of users learning a different interface to each data source, `spocc`
allows users to learn one interface to all data sources. We will integrate `rMaps` soon
for interactive maps (see below).

**testdat** Much like `testthat` makes testing easier in R, `testdat` makes cleaning data easier
in R.

**plotly** We accepted into our suite the R client for Plotly, a company that provides an API to
create interactive plots on their web platform.

**rDat** We started development on an R client for Dat, the _github for data_, which will allow our
users to up their reproducible science game by keeping track of changes in their data, and easily
accessing data avaialble in Data repositories.

**rMaps** We are close to accepting rMaps into our software suite, which will be easily incorporated
into especially our package for spatial species occurrence data, `spocc`, but other packages as
well that deal with any kind of spatial data.

**fulltext** A package started in May 2014 aims to be a one stop shop for acquiring data for text
mining in R. In addition to our existing packages to feed into this package for sources of text data,
including for Public Library of Science, Pubmed, eLife, we've started more: for IEEE, arXiv,
Biomed Central, Zenodo, and Crossref.

We now have a number of history R clients, for getting historical USA maps (`USAboundaries`), fetching
commonly used history datasets (`historydata`), and determining gender of names at any historical date
(`gender`). In addition, we've started many packages of use in the archeology field, including a client
for the Pleiades database (`pleiades`). Other packages are of use across social science disciplines,
including for the Digital Public Library of America (`rdpla`), Europeana (`reuropeana`), and to scrape
museum metadata (`musemeta`).

Last, we have many generic R clients for databases, including for Solr (`solr`), Elasticsearch (`elastic`),
CKAN (`ckanr`), and ERDDAP (`rerddap`). These will be valuable to individual users, but will also
facilitate more tools that use these databases, including in our own software.

- Members committed code on `103` R packages in the last 15 months.
- `43` packages were updates of existing software,
- `60` packages were new software developed this year.
- `27` packages were new packages sent to the central R repository (CRAN) since the Sloan funding started.
- `8` packages were updated one or more times on CRAN.
- `83` packages are in active development.


# 2. Outreach efforts

A second but equally important objective of our initial year of funding was to engage broadly with various research communities through a range of activities such as talks, hands on workshops (of varying lengths from an hour to all day), to one-on-one conversations. In particular, we focused our efforts on new communities of researches with three main objectives:  
  1. Exposing new users and communities of users to our existing suite of tools.  
  2. Partner with active researchers from various domains to develop new software.  
  3. Provide a community to researchers with no formal experience in software development.  


We spent countless hours over the past 18 months running workshops around the world (6 countries, 400+ participants). Our workshops have typically consisted of 1-4
hour sessions where we provide a rationale for open science and open software, and then walk participants through powerful use-cases closely tailored to their sub-domain. Using a cloud instance of R/RStudio for our workshops, we have successfully eliminated time wasted on installation and troubleshooting allowing us to focus on demos and discussion.

**List of workshops**

- Oxford University
- University of Sheffield
- Open Knowledge foundation (Geneva)
- UC Berkeley (various workshops at D-lab, Berkeley Initiative in Global Change Biology, Geospatial innovation facility)
- National Center for Ecological Analysis and Synthesis, UC Santa Barbara
- Zoological Society of London
-  The Genome Analysis Center, Norwich Research Park, UK
-  The Commonwealth Scientific and Industrial Research Organisation (CSIRO), Canberra, Australia
-  The University of Melbourne
-  University of North Carolina
-  Duke University
-  University of British Columbia
-  Quebec Centre for Biodiversity Science
-  Science Online (Main event in North Carolina and Science Online Climate)

**Hackathon**

Besides such workshops, we also modeled a highly successful coding un-conference, the first of while we held in March 2014 in San Francisco ([http://ropensci.github.io/hackathon/](http://ropensci.github.io/hackathon/)). Our model differed from traditional hackathons in various ways. To combat the problem of gender imbalance at these events, we invested considerable time to locate and invite women participants at various levels of expertize to serve both as mentors but also attend as beginners. Our efforts results in 40% women attendees, a considerable improvement over similar events. We then invited several experts in R to attend, providing participants with an opportunity to closely interact with many of the language's well-known developers over two full days. Finally, we provided full financial support to everyone and held the event at an ideal location provided by our industry partner (GitHub). The event was a success for building a more inclusive community of research software developers in R, as addressed in a short [video documentary](https://www.youtube.com/watch?v=iUcm5COsKJo&nofeather=True) about the event.  The event was also widely covered in the R, open science and related communities (representative blog post from [Simply Statistics at Johns Hopkins](http://simplystatistics.org/2014/04/10/the-ropensci-hackathon-ropenhack/)).





# 3. Engagement with our community

## 3a Software developed

Participation in rOpenSci software development increased exponentially during the
grant period, both in number of contributors (Fig. 1) and number of code contributions
(Fig. 2). The number of package downloads (from one partial source, the
[RStudio mirror](http://cran-logs.rstudio.com/)) also increased x fold during this
time (Fig. 3).

```{r child="children/cumcontribs.Rmd", echo=FALSE, fig.cap='Cumulative number of contributors to rOpenSci packages from October 2011 to December 2014. The blue shaded area is the period of this grant.'}
```

```{r child="children/cumcommits.Rmd", echo=FALSE, fig.cap='Cumulative number of code commits to rOpenSci packages from October 2011 to December 2014. The blue shaded area is the period of this grant.'}
```

```{r child="children/crandownloads.Rmd", echo=FALSE, fig.cap='Cumulative downloads of rOpenSci packages from October 2011 to December 2014. Each line is a separate package.'}
```

## 3b Engagement via the website

We reached our goal of 30,000 visitors for the grant period. In addition, via the chat client
on our site, our users have requested 157 conversations with us, with questions about software
installation or use. Last, we have received 144 conversations from users via our _Contact Us_ page.

## 3c Impact across disciplines

We have engaged with two major disciplines in the social sciences: archeology and history.
We have talked with three leading digital archeologists, and two leading digital historians,
leading to a long list of potential future projects, and a few in development R packages
to connect archeologists and historians to open data on the web. We are making great progress
in these two fields and are starting to make connections in other social science fields,
including psychology. We are involved in a grant with an archeologist to work on R clients.


# 4. Sustainability plan for the rOpenSci Project

We held a meeting at UC Berkeley on November 15th, 2013 to discuss the
long-term sustainability plan for the rOpenSci project. In addition to
the four-member core team, we invited [Mackenzie Smith](http://www.lib.ucdavis.edu/ul/about/meetnewul.php) (head university librarian for UC Davis and rOpenSci board member), [Nicoletta Cellinese](http://www.flmnh.ufl.edu/about-us/people/spotlight/cellinese/) (Professor, Florida Museum of Natural History,UFL, and rOpenSci board member), and [Neil Chue Hong](http://software.ac.uk/about/people/neil-chue-hong) (Director of the Software Sustainability Institute, Edinburgh, UK) to participate. We spent the day exploring various funding models and organizational structures, including the possibility of moving the project to another non-profit organization.

The entire group agreed that one year of funding was not a sufficient
runway to becoming fully sustainable. We expect the project to remain
grant funded for at least another two years (2014 - 2016), supporting
the cost of 1-2 FTEs, before we are truly on the path to incorporating
other funding streams. During this proposal round, we obtained one year of matching funding for Karthik Ram, providing continued project activity for one additional year.

Among the various options we discussed, the following emerged as the
most promising models going forward:

-   Since three of us (Karthik Ram, Scott Chamberlain and Carl Boettiger) are
    be based at UC Berkeley, we are considering the possibility of
    becoming an organized research unit within UC Berkeley. This will
    allow us to obtain some funding from central campus, but also freely
    pursue all available grant opportunities related to research
    software development (including from NSF, NIH, DOD, and other
    foundations). While Karthik Ram and Scott Chamberlain are
    based at the Museum of Paleontology/Berkeley Initiative in Global
    Change Biology, we are open to the possibility of a new
    institutional home (such as the Berkeley Institute for Data Science) if deemed more appropriate in the future.

-   Since the beginning of Sloan funding last summer, we have received
    numerous requests for participation in grants. Tom Webb, a professor
    at the University of Sheffield, was successful in obtaining a NSERC
    research grant that includes a significant rOpenSci component.
    Similarly, we have recently signed letters of collaboration on a NSF
    grant (with Water Jetz from Yale University). We are planning to
    collaborate on software development with a group at the University
    of Southern Denmark lead by Dalia Conde, to integrate `taxize` with
    demographic data for a web application. Similarly we have received
    other requests from scientists at federal agencies such as the
    National Ocean and Atmospheric Administration (NOAA) and the
    Environmental Protection Agency. In both cases, they have raised the
    possibility of funding us through sub-contracts for specific
    projects. We plan to test out this funding stream in the coming year
    to determine feasibility of continuing to seek such support.

-   Based on Mackenzie Smith's advice, we are also considering a
    membership model similar to the preprint server,
    [arXiv](http://arxiv.org/). Researchers across the world deeply
    value our software (see some testimonials in the appendix) and have
    expressed interest in making direct contributions to the project. We
    have also had early interest from industry partners (RStudio,
    Revolution Analytics, etc.) who are keen on making annual
    contributions to the project. If Berkeley is not the right home for
    such a model, we plan to continue talks with the
    [NumFOCUS](http://numfocus.org/) foundation on how best to leverage
    corporate sponsorships for our efforts.

-   Our project now has considerable name recognition in the world of
    open-source scientific software. The core team continues to maintain
    a strong research presence (to varying degrees), which has also
    helped us maintain a strong reputation. In the last two years, we
    have produced numerous key software tools, fostered new research,
    and lead the way in training and outreach. We plan to leverage our
    position to apply for several key NSF grants for which we are strong
    competitors and a few that we have identified are listed below. We
    are also exploring various other forms of support to continue
    activities in the area long after support from Sloan and BIDS will
    end. These include current efforts to obtain funding from various
    NSF calls such as:

[NSF: Cyber-Innovation for Sustainability Science and
Engineering](http://www.nsf.gov/pubs/2014/nsf14531/nsf14531.htm?WT.mc_id=USNSF_25&WT.mc_ev=click),
[NSF: Software Infrastructure for Sustained Innovation - SSE & SSI
(SI2-SSE&SSI)](http://www.nsf.gov/pubs/2014/nsf14520/nsf14520.htm?WT.mc_id=USNSF_25&WT.mc_ev=click)
and [NSF: Dimensions of
Biodiversity](http://www.nsf.gov/pubs/2014/nsf14525/nsf14525.htm?WT.mc_id=USNSF_25&WT.mc_ev=click).
These grants are in addition to ongoing funding discussions with
organizations such as [The Helmsley Trust](http://helmsleytrust.org/) and DataONE (KR, for example, currently has support for a graduate student at UC Davis, co-advised with statistics professor Duncan Temple Lang. However, larger support to cover %FTE is a strong possibility in the future).


# 5. rOpenSci citations and mentions in blogs/media

### List of Research Papers

* Miya M, Friedman M, Satoh TP, Takeshima H, Sado T, et al. (2013) Evolutionary Origin of the Scombridae (Tunas and Mackerels): Members of a Paleogene Adaptive Radiation with 14 Other Pelagic Fish Families. PLoS ONE 8(9): e73535. doi: 10.1371/journal.pone.0073535

* Gagnon, Yakir L., Sutton, Tracey T., Johnsen, Sönke. (2013) Visual acuity in pelagic fishes and mollusks. Vision Research 92: 1-9.

* Bartomeus, Ignasi, et al. (2013) "Biodiversity ensures plant–pollinator phenological synchrony against climate change." Ecology letters 16: 1331-1338.

* Goring, Simon, et al. (2013). "Pollen assemblage richness does not reflect regional plant species richness: a cautionary tale." Journal of Ecology 101: 1137-1145.

* Poisot, Timothée, Bérangère Péquin, and Dominique Gravel. (2013) "High Throughput Sequencing: A Roadmap Toward Community Ecology". Ecology and evolution 3: 1125-1139.

* Drozd, Pavel, and Jan Šipoš. (2013). "R for all (I): Introduction to the new age of biological analyses." Casopis slezskeho zemskeho muzea (A) 62: 51-57.

* Goodman, Alyssa, et al. (2014). "10 Simple Rules for the Care and Feeding of Scientific Data." arXiv preprint arXiv:1401.2134.

* Holman, L. et al. "Is there a preponderance of p values just under 0.05? Testing for p hacking across the biological sciences".

* Holman, L et al. "Evidence for strong and pervasive observer bias in biology: The importance of blind data recording".

* Price, S.A., et al. (2014). "Two waves of colonization straddling the K–Pg boundary formed the modern reef fish fauna". Proc. R. Soc. B vol. 281 no. 1783.

* Varela S, et al. (2014) "rAvis: An R-Package for Downloading Information Stored in Proyecto AVIS, a Citizen Science Bird Project". PLoS ONE 9(3)

* Talent, N., et al. (2014). "Character Selection During Interactive Taxonomic Identification:'Best Characters'." Biodiversity Informatics 9:1-12.

* Pandit, M.K., et al. (2014). "The contrasting effects of genome size, chromosome number and ploidy level on plant invasiveness: a global analysis." New Phytologist (In press).

* Altman, J., et al. "TRADER: A package for Tree Ring Analysis of Disturbance Events in R." Dendrochronologia 32(2) (2014): 107-112.

_(Other papers in progress are not reported here to protect confidentialty requested by some authors)_

__Papers by rOpenSci's team:__

* Chamberlain, S.A., and E. Szocs (2013). "taxize - taxonomic search and retrieval in R". F1000Research, 2:191. http://f1000research.com/articles/2-191/v2.

* Chamberlain, S.A. (2013). "Consuming Article-Level Metrics: Observations and Lessons from Comparing Aggregator Provider Data". Information Standards Quarterly 25(2): 5-13.

* F1000 special issue in preparation

*  RNeXML: Parsing and Serializing the Next Generation of Phyloinformatic Data in R (in preparation by the team)

* One simple way to share your data (in preparation by the team). This paper is a response to the popular article _"Nine simple ways to make it easier to (re)use your data"_ published in Ideas in Ecology and Evolution.


### Websites ###

- [http://labs.biblioteca.uoc.edu/blog/?p=4332](http://labs.biblioteca.uoc.edu/blog/?p=4332) The Importance of Being Reproducible
- [http://www.infoworld.com/article/2608259/development-tools/github-rolls-out-the-red-carpet-for-scientists.html](http://www.infoworld.com/article/2608259/development-tools/github-rolls-out-the-red-carpet-for-scientists.html) GitHub rolls the red carpet for scientists
- [http://wiki.datadryad.org/External_Metadata_Use#ROpenSci](http://wiki.datadryad.org/External_Metadata_Use#ROpenSci)
- [http://paidcontent.org/2012/09/10/open-access-research-catastrophic-for-reed-elsevier/](http://paidcontent.org/2012/09/10/open-access-research-catastrophic-for-reed-elsevier/)
- [http://radar.oreilly.com/2013/01/kaitlin-thaney-open-science.html](http://radar.oreilly.com/2013/01/kaitlin-thaney-open-science.html)
- [http://sciencehackday.pbworks.com/w/page/24607895/Programming%20Tools%20and%20Frameworks](http://sciencehackday.pbworks.com/w/page/24607895/Programming%20Tools%20and%20Frameworks)
- [http://www.scilogs.com/mola_mola/big-data-for-big-ecology/](http://www.scilogs.com/mola_mola/big-data-for-big-ecology/)
- [http://captaincalliope.net/](http://captaincalliope.net/)
- [http://krr.cs.vu.nl/2012/11/trip-report-plos-article-level-metrics-workshop-and-hackathon/](http://krr.cs.vu.nl/2012/11/trip-report-plos-article-level-metrics-workshop-and-hackathon/)
- [http://postgenomic.com/blog/altmetric-in-2012-year-end-review/](http://postgenomic.com/blog/altmetric-in-2012-year-end-review/)
- [http://rossmounce.co.uk/2013/01/12/from-card-catalogs-to-computers-databases-in-vertebrate-paleontology/](http://rossmounce.co.uk/2013/01/12/from-card-catalogs-to-computers-databases-in-vertebrate-paleontology/)
- [http://ebooks.iospress.nl/publication/33465](http://ebooks.iospress.nl/publication/33465) (and paper in this folder: JahnEtal2013.pdf)
- [http://libreas.wordpress.com/category/libreas-visualisierung/](http://libreas.wordpress.com/category/libreas-visualisierung/)



# 6. The road ahead

The success of our activities in 2013-2014 have put us in a very strong and competitive position as we enter the year ahead.

* Over the past few months we have made significant progress in building our programmatic API packages that provide interoperable routines for related groups of data. We are also on track towards finishing our general purpose tools for describing, integrating, and publishing diverse data sets (see data pipeline; `EML`, `RNeXML`, `rfigshare`).

* rOpenSci's community has grown rapidly in 2014. Much of this success has been through our incubator program, where we work with domain scientists providing them with our software development expertise. We also attribute recent growth to our new ambassador program, where current collaborators have been reaching out to new (both in terms of geography and domains) communities. Building on the success of last year's hackathon, we are gearing up for additional such events both locally and internationally.

* Perhaps most importantly, we have made significant progress towards governance and sustainability in recent months. The project now has an interim board (called the leadership team) to establish by-laws and governance to ensure the sustainability of the project. We are also in the midst of a few new grant applications (both public funds and private foundations) to ensure that key personnel are maintained for the next three to five years.
