---
name: software-review
layout: post
title: Onboarding at ROpenSci: A Year in Reviews
date: 2016-02-22
authors:
  - name: Noam Ross
    url: http://twitter.com/noamross
  - name: Carl Boettiger
  - name: Jenny Bryan
  - name: Scott Chamberlain
  - name: Rich FitzJohn
  - name: Karthik Ram
tags:
  - software
  - review
  - infrastructure
---

Open source software (OSS), like academic articles, benefits from peer-review.
However, peer-review is a tough problem to solve in scientific OSS.  More general
software projects can benefit from review large numbers of user-developers, or
structured review in developer teams. Scientific software, which is often more
specialized, has fewer users and is often developed by single users.  Software
*papers* may be peer-reviewed, but rarely the code itself - there isn't a robust
ecosystem for review of scientific OSS with a large pool of potential reviewers,
editors, and incenvtive mechanisms.

At ROpenSci, we have been experimenting with a system of peer-review of
software for the past year for R packages contributed to [our collection](https://ropensci.org/packages/).
We blend some components of both traditional scientific peer-review
and production software review.  We've done this to maintain high quality packages,
to help spread development best practices in the community, and to experiment
with processes that could be useful for scientific review and communication more generally.

Here's how it works: When a author sends us a package, we
evaluate for fit according to our [criteria](https://github.com/ropensci/policies#package-fit),
then assign reviewers who evaluate the package for usability, quality, and style
based on our [guidelines](https://github.com/ropensci/packaging_guide#ropensci-packaging-guide).
After the reviewers evaluate and the  author makes recommended changes, the
package gets the ROpenSci stamp in its README and is added to our collection.

We work entirely through the GitHub issue system - authors
[open an issue](https://github.com/ropensci/onboarding/issues/new) to
submit their package for review, and reviewers attach all their comments to that
issue.  This means the entire process is open and public from the start.  Reviewers
and authors are known to each other, free to communicate directly with each other and with the author.

# Some lessons learned

So far, we've recieved 13 packages.  Of these, only 1 was rejected due to lack of
fit. 11 were reviewed, 6 of which were accepted, and 5 are awaiting changes requested
by reviewers.  1 is still pending review. Here are some lessons based on this
humble start:

-  *Our reviewers are **awesome**.*  The quality, tone, and thoroughness of reviews
    has been excellent and package authors are generally very happy with the
    feedback they get.  We think the openness of the process has something to
    do with this, as reviews are public and this incents reviewers to do good
    work and abide by a [code of conduct](https://github.com/ropensci/policies#code-of-conduct).

-  *Openness and tooling enable more efficient review.* The ongoing, direct interaction
   between reviewers and authors lets issues be resolved faster than in reviews
   mediated by an editor.  Also, GitHub based reviews allows reviewers to publicly
   consult others by **@tagging** others if expertise is wanted. An especially
   nice feature is that reviewers can contribute to the package directly via
   a pull request when this is more efficient than *describing* the changes they
   suggest.

-  *Reviews get better.*  Our sample size is still small, but our community of
   reviewers seems to be writing better reviews as we get more experience.  The
   review *process* has also improved, via [active feedback](https://discuss.ropensci.org/t/code-review-onboarding-milestones/180) [from the community](https://discuss.ropensci.org/t/how-could-the-onboarding-package-review-process-be-even-better/302)
   as well as input from experiments of others (such as the [Mozilla Science Lab](https://mozillascience.org/code-review-for-science-what-we-learned)).

-  *We have the same labor issues as any journal.*  Reviewing is a volunteer
   activity.  We haven't tracked the time it takes carefully, but anecdotes have ranged
   from 4-9 hours.  Despite the great reviewers we have, an editor has to wrangle
   and remind reviewers, and review when no other reviewers can be found.
   As package development is often volunteer, as well, authors can take a long time to respond.

# Questions and ideas for the future

-  *Scaling and reviewer incentives.* Like other review processes, we rely on the the volunteer time of
   reviewers to get timely, high-quality reviews.  As packages increase, so does
   the burden on our community.  So one change we are making is assigning packages
   to 'handling editors' rather than having everything handled by a single editor.
   Hopefully these editors will be able to reach out to a larger, diverse pool of
   reviewers, and help guide new reviewers as they gain experience.  It remains
   to be seen if we can maintain high quality and enthusiasm as the reviewer pool
   expands beyond early adopters.

-  *Author Incentives.* At the moment, we believe package authors submit because (1) they think
   they will get useful feedback from high-quality reviews, (2) the ROpenSci
   "stamp" is a form of credential for themselves and their package, and (3)
   they can recieve some ongoing help with package maintenance after acceptance.
   Will these incentives be enough to continue to draw more package authors to
   do the extra work of putting their packages through review? What other incentives
   could we offer?

-  *Automation.* We may be able to take advantage of existing tools such as
   integration systems system to make the process even smoother.  One suggestion
   has been to submit packages [*as* pull requests](https://discuss.ropensci.org/t/how-could-the-onboarding-package-review-process-be-even-better/302/3) to take more advantage of GitHub review features such as in-line commenting.  We're making [ automated reminders](https://github.com/ropenscilabs/heythere), too, so soon ROpenSci
   can spam you just like Manuscript Central. There may be more we can do via
   automated testing, too, but some of this will rely on having higher standards
   and burdens for our package authors.  How much should we demand?

We have learned a ton from this experiment and look forward to making review better!
Many, many thanks to the authors who have contributed to the ROpenSci package
ecosystem and the reviewers who have lent their time to this project.
