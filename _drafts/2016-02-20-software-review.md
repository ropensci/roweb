---
name: software-review
layout: post
title: Software review - lessons learned
date: 2016-02-20
authors:
  - name: Noam Ross
    url: http://www.noamross.net
  - name: Scott Chamberlain
  - name: Karthik Ram
  - name: Carl Boettiger
tags:
- software
- review
- infrastructure
---

Open source software (OSS), like academic articles, benefits from
peer-review. However, peer-review is a tough problem to solve in OSS.
Unlike academic articles there isn't a robust ecosystem around OSS
with a large pool of potential reviewers, editors, and incenvtive mechanisms.

We started a review system approximately one year ago. We'll describe the system, and share some lesssons learned on the system.

The review system is built on top of GitHub, using a single repository ([ropensci/onboarding][onboard]). In the `onboarding` repository, software developers can submit their R package by [opening a new Issue](https://github.com/ropensci/onboarding/issues/new). The issue has a template for the information we'd like them to fill out.

The entire review process is completely in the open. This is an important piece of the puzzle of making software review work. Closed review means that reviewer's are free to be harsher than is warranted, but good reviewers also don't get credit for their good reviews.

The fact that the review process is all on GitHub means everything is linked. That is, in response to reviewers comments, authors can respond on the issue, or link from the source repository, also on GitHub, and open new issues in their repository to address reviewer comments, and make changes to the code, etc., all linked together so the process can be tracked.

## Observations

### Are issues the best way of conducting reviews?

It has been proposed that pull requests (PR) may be a better way to do reviews. This format is used extensively in software development, where even if PR aren't meant to be merged, they are still used to do review, where comments can be made on a line by line basis and discussion on the content of the PR.

### Seeking reviewers

perhaps a discussion about how to handle assigning reviewers?

### Automate all the things

Could talk about benefits of automation: eg., travis-ci (although not triggered when someone submits, we can ask them to do it, and use that as a check), [heythere](https://github.com/ropenscilabs/heythere) (granted, it's still in dev.), etc.

### what else?

xxx

[onboard]: https://github.com/ropensci/onboarding
