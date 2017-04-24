---
name: ropensci-interns
layout: post_discourse
title: adsfadf
date: 2017-04-25
authors:
  - name: Scott Chamberlain
  - name: Stefanie Butland
categories: blog
tags:
- community
- ropensci
---

There's a lot of work that goes in to making software: the code that does the thing itself, unit testing, examples, tutorials, documentation, and support. 

We have a number of [full time people](https://ropensci.org/about/#staff), and there's A LOT of contributions from [the community](https://ropensci.org/community/#community).

We've recently started working with a few interns. Since we're nested inside of UC Berkely, it made sense to get interns through that route. Right now we have two interns.

## The interns

- Katie Rice: 
    - Is a junior doing a major in Environmental Sciences and a minor in Sustainabile Design
    - [Katie on GitHub](https://github.com/katieroserice)
- Siwei (Steven) Ye: 
    - Is a sophmore doing a double major in Mathematics and Statistics
    - [Steven on GitHub](https://github.com/steven2249)

## What they're working on:

### Katie

README's are the first thing someone reads when landing on a GitHub repository. Thus, it's important the README has sufficient information to tell the reader what the software is for, who it's meant for, what it does, how to install and how to give feedback. 

Most software maintainers do a good job with installation and how to give feedback (link to issues tab usually), but we often fall short on describing at a high level what the piece of software is about. 

This is where Katie comes in! She's been going through rOpenSci repositories on GitHub, and sending pull requests with changes to the README, improving the high level description of the software.

Check out Katie's [GitHub activity](https://github.com/search?p=1&q=is%3Apr+involves%3Akatieroserice+user%3Aropensci&type=Issues). 

### Steven

Software unit tests are very important. We [have it as policy that packages submitted to our onboarding repo have tests](https://github.com/ropensci/onboarding/blob/master/issue_template.md). 

In addition, we strive to use continuous integration to build and check our packages on each commit. However, since rOpenSci has been around for a while, there's still some packages that don't have tests, or enough tests. In addition, when you have tests, you can calculate test coverage using, for example, [Codecov](https://codecov.io/).

Last, it's ideal to signal to potential users that you have continuous integration and test coverage through badges, like this one:

[![codecov.io](https://codecov.io/github/ropensci/rredlist/coverage.svg?branch=master)](https://codecov.io/github/ropensci/rredlist?branch=master)

This is where Steven comes in! He has been doing the following:

1) When a package has tests already, he adds integration for Codecov and a badge for it (like the one above) when its missing. 
2) When packages don't have tests, he writes tests for the package, including integrating Codecov.

Check out Steven's [GitHub activity](https://github.com/search?p=1&q=is%3Apr+involves%3Asteven2249+user%3Aropensci&type=Issues). 

## Want to be an rOpenSci intern?

We'll be from time to time looking for new interns. Contact us at [info@ropensci.org](mailto:info@ropensci.org) with any questions. 
