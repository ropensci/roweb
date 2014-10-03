# Contributing to the rOpenSci Website

To submit any changes to the [rOpenSci website](http://ropensci.org), please fork a copy and send a pull request. At this time we will accept the following updates/changes.

### Blog posts  
If we've asked for an invited blog post, write your post as `.md` or if it contains R examples as `.Rmd` and render the file to the [`_posts`](https://github.com/ropensci/roweb/tree/master/_posts) folder.

Then add appropriate `yml` to your post, including `authorurl` if you are not a core member of the rOpenSci team.
- [example 1](https://github.com/ropensci/roweb/blob/master/_posts/2014-06-09-reproducibility.md)
-  [example 2](https://github.com/ropensci/roweb/blob/master/_posts/2014-08-15-open-tree-of-life-hackathon.md)

Your `yml` should include the following information:

```
---
name: short-title
layout: post
title: Full title of your blog post
date: 2014-08-15
author: Your Name
authorurl: url of your website
tags:
- R
- other tags (one per line)
---

```



### Tutorials
To submit a new tutorial that doesn't already exist on our [tutorials page](http://ropensci.org/tutorials), use one of two methods:

* Content: Vignette from the package (if there is one), or content from the package README, etc., in `.Rmd` format with code blocks wrapped in \`\`\`{r}...\`\`\`
* Copy and paste an extant tutorial with `.Rmd` file extension from the `tutorials/` folder into a new file named `<package name>_tutorial.Rmd`.
* Delete everything except for the yaml header, and the tags `<section id="installation">`, `<section id="usage">` and the footer starting with `<section id="citing">`.
* Alter yaml header to fit the package and version, e.g.

```
---
title: rfishbase tutorial
layout: tutorial
packge_version: 0.1.0
---
```

* Alter footer section as needed for the package.
* knit the `.Rmd` using `knitr::knit("<package name>_tutorial.Rmd")` to make a `.md` file.
* You can look at the rendered page if you have `jekyll` installed by doing `jekyll serve`, or `jekyll serve --watch` to auto compile any changes.

We only accept tutorials for packages in the rOpenSci suite of packages. In the future we hope to have an at least somewhat automated process...But for now, we move files manually.

### Adding to the community page
If we have already approved you as a community member, please send us a picture that is at least `250` pixels on each side (or one that can be cropped) by adding the file to:

```
assets/common-files/img/community/firstname_lastname.png
```

Include a two sentence blurb in your PR. We'll do the rest to add the appropriate html to the community page.


### Minor typos and display issues

For minor typos or grammatical errors, we would be grateful if you just sent us a pull request with a fix rather than opening up a new issue.



If you have any other issues not covered by this document, please file an [issue](https://github.com/ropensci/roweb/issues/new).
