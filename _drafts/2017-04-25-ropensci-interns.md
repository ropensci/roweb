---
name: ropensci-interns
layout: post_discourse
title: Welcome to our rOpenSci Interns
date: 2017-04-25
authors:
  - name: Scott Chamberlain
  - name: Stefanie Butland
categories: blog
tags:
- community
- ropensci
---

There's a lot of work that goes in to making software: the code that does the thing itself, unit testing, examples, tutorials, documentation, and support. rOpenSci software is created and maintained both by our [staff](https://ropensci.org/about/#staff) and by our (awesome) community. In keeping with our aim to build capacity of software users and developers, two interns from our academic home at [UC Berkeley](https://bids.berkeley.edu/research) are now working with us as well. Our interns are mentored by [Carl Boettiger](https://ropensci.org/about/#leadership) and [Scott Chamberlain](https://ropensci.org/about/#leadership) and they will receive academic credit for their work at the end of term.

_can we indicate interns get school credits for this? i.e. not free labor?_

## The interns

- Katie Rice:
    - Is a first-year undergraduate student doing a major in Environmental Sciences and a minor in Sustainable Design
    - [Katie on GitHub](https://github.com/katieroserice)
- Siwei (Steven) Ye:
    - Is a second-year undergraduate student doing a double major in Mathematics and Statistics
    - [Steven on GitHub](https://github.com/steven2249)

## What they're working on:

### Katie

README's are the first thing someone reads when landing on a GitHub repository. Thus, it's important the README has sufficient information to tell the reader what the software is for, who it's meant for, what it does, how to install and how to give feedback.

Most software maintainers do a good job with how to install and how to give feedback (link to issues tab usually), but we often fall short on describing at a high level what the piece of software is about.

This is where Katie comes in! She's been going through [rOpenSci repositories](https://github.com/ropensci) on GitHub, improving the high level description of the software and then sending pull requests with changes to the README's.

Check out Katie's [GitHub activity](https://github.com/search?p=1&q=is%3Apr+involves%3Akatieroserice+user%3Aropensci&type=Issues).

### Steven

Software unit tests are very important. We [have it as policy that packages submitted to our onboarding repo have tests](https://github.com/ropensci/onboarding/blob/master/issue_template.md).

_Explain what unit tests and continuous integration are and why important - in para's above and below. In link above, I expected to get to something about tests. Was not clear._

_in para below, use word "tests" less?_

In addition, we strive to use continuous integration to build and check our packages on each commit. However, since rOpenSci has been around for a while, there are still some packages that don't have tests, or enough tests. In addition, when you have tests, you can calculate test coverage using, for example, [Codecov](https://codecov.io/).

Lastly, it's ideal to signal to potential users that you have continuous integration and test coverage through badges, like this one:

[![codecov.io](https://codecov.io/github/ropensci/rredlist/coverage.svg?branch=master)](https://codecov.io/github/ropensci/rredlist?branch=master)

This is where Steven comes in! When a package has tests already, he adds integration for Codecov and a badge for it (like the one above) when it's missing. When packages don't have tests, he writes tests for the package, including integrating Codecov.

Check out Steven's [GitHub activity](https://github.com/search?p=1&q=is%3Apr+involves%3Asteven2249+user%3Aropensci&type=Issues).

## Want to be an rOpenSci intern?

We'll be looking for new interns from time to time. Contact us at [info@ropensci.org](mailto:info@ropensci.org) with any questions.
