---
name: docker
layout: post
title: Using Docker for reproducible research
date: 2014-10-10
author: Carl Boettiger
tags:
- R
- reproducible-research
---

The variety and ever-changing nature of computer software poses a
significant challenge to reproducible research.  An [earlier post](http://ropensci.org/blog/2014/06/09/reproducibility/)
on this blog discussed detailed efforts to make research more
reproducible, and highlight substantial barriers to doing this well,
including:

- dependencies could still be missed by incomplete documentation

- The set of scripts for managing reproducibility are at least as complex
as the analysis itself

- [Continuous integration](http://en.wikipedia.org/wiki/Continuous_integration) tools, though a major advance for reproducible research, remain tricky
to configure and limited to short runs

- Though a wide array of tools to solve these challenges now exists, many are difficult to learn and
some are still too unpolished

Several people in the discussion thread [suggested](http://disqus.com/embed/comments/?base=default&disqus_version=7ba1eb42&f=ropenscience&t_u=http%3A%2F%2Fropensci.org%2Fblog%2F2014%2F06%2F09%2Freproducibility%2F&t_d=Reproducible%20research%20is%20still%20a%20challenge&t_t=Reproducible%20research%20is%20still%20a%20challenge&s_o=default#) that a new tool known as
[Docker](https://www.docker.com/) might be helpful.  Docker an [open source project](https://github.com/docker/docker/blob/master/LICENSE)
providing a clever packaging of [existing and new tools](https://docs.docker.com/faq/#what-does-docker-add-to-just-plain-lxc)
by a startup of the same name which has continually been
making Silicon Valley headlines for its rapid growth, adoption, and
success in [raising](http://techcrunch.com/2014/01/21/docker-raises-15m-for-popular-open-source-platform-designed-for-developers-to-build-apps-in-the-cloud/) venture [capital](http://blogs.wsj.com/venturecapital/2014/09/16/sequoia-leads-40-million-round-for-docker-as-app-platform-takes-off/). While the hype has focused largely
on it's potential to save money through more efficient use of computer
servers and in deploying web applications, the technology has interesting
implications for reproducible research as well.

Before we worry much about those implications, it is important
that any tool be relatively easy to adopt into one's existing workflow,
and must promise some immediate benefit to users adopting it.  In this post,
we'll therefore jump right in and see how we can use Docker as an easy
way to run an identical RStudio environment from the cloud or our local
computers.


## Getting started

_**Note**: Requires a docker version `>= 1.2`.  Docker
only runs on 64 bit machines at this time._

### Running Docker locally ###

#### Windows/Mac Installation ####

On a Mac or Windows machine, you'll need [boot2docker](https://github.com/boot2docker/boot2docker)
installed (easy point & click install, ~24 MB), see
[[Mac Instructions](https://docs.docker.com/installation/mac/)] or
[[Windows Instructions](https://docs.docker.com/installation/windows/)].
Downloading the most recent version is strongly recommended.

Launch boot2docker as described in the documentation linked above.
To use RStudio, we'll also need to know what IP address boot2docker is
using. To do so, just make a note of the address given by:

```bash
boot2docker ip
```
(it's probably `http://92.168.59.103`, but that can change).


#### Linux Installation ####

Follow the [instructions](https://docs.docker.com/installation/) for
your distribution.  Using the `curl` script method to install the latest
docker version is highly recommended, e.g. on Ubuntu simply run:

```bash
curl -sSL https://get.docker.io/ubuntu/ | sudo sh
```

### Run Docker ###

From the boot2docker terminal or linux terminal, simply run:

```bash
sudo docker run -d -p 8787:8787 --name rstudio rocker/rstudio
```

The first time this runs, docker will download the necessary image (~750 MB). When the
download finishes, rstudio server will start running on the docker _container_.  To
login to RStudio, enter the IP we noted above into your browser, followed by `:8787`.
For Linux users, just use `http://localhost:8787`.  Login with the credentials:

- user: `rstudio`
- password: `rstudio`

### Life on a container ###

Note that the container is completely isolated from your local R installation
and filesystem.  Any R packages you may have already installed will not yet be installed
on the container, and files you have locally will not be visible to the container.
We will see later how to change this using volumes, but for now this is intentional:
it means that everyone running this container has access to an identical software
environment.  It also means that you can feel free to experiment -- upgrade or delete
packages, etc -- without fear of altering or breaking anything already set up in your
home environment.

#### Accessing files ####

The best way to move files on and off of your container is by using the git
interface with a remote repository such as Github or Bitbucket. Later we will
show how to link a directory/folder on the container to one on your home operating
system (this is trivial for Linux users, but requires an extra step with `boot2docker`
users.)

#### Saving your system ####

To preserve our container for later use, complete with any files we created or
packages we have installed in the meantime, we will commit our changes to
the local docker image repository:

```bash
docker commit rstudio user/rstudio
```

The term `docker commit` works a lot like a `git commit`.  The first `rstudio`
refers to the `--name` we specified when running our container.  What
follows can be any name you want to use to save your image, but I recommend
using your own username followed by `/rstudio` to help remember what
this image contains. To pick up where you left off in future, substitute
`user/rstudio` (or whatever you called the image) for `rocker/rstudio`
in the `docker run` command above.

#### Portable system, will travel ####

The beauty of Docker is that your image is completely portable. The
easiest way to move Docker image around is through the [Docker Hub](http://hub.docker.com).
After creating an account on Docker Hub, you can create a public or
private repository for your image (accounts are free and provide 1 free
private and unlimited public images).  Having created a repository on
the hub, you can do:

```bash
docker login
docker push user/rstudio
```

Note that `user` must match the username you have chosen on the hub
and that which you used in `docker commit`.  You can now access your
image from any other machine running docker using this image name.
(For private images you will have to login first).

## DigitalOcean ##

Docker also makes it very easy to set up an RStudio server in the cloud. This
has several uses:

- Sharing your computational environment with collaborators
- Scaling up -- running your code on a machine with more memory or processor power than your laptop
- Accessing RStudio from a browser on portable devices, such as i-pads

For this tutorial we'll use [DigitalOcean](http://digitalocean.com), a
simpler alternative to Amazon's EC2 cloud, though these instructions would
work just as well on most any cloud server running a recent Linux version.
Follow the instructions on the DigitalOcean website to create an account
and log in to a terminal on your cloud server. A few quick notes:

- The smallest size 'droplet' costs less than 1 cent per hour and will
  be fine for our purposes.
- Pick any region, doesn't matter. Don't worry about checking the
  extra boxes.
- I recommend picking the Ubuntu 14.04 distribution for your
  droplet. On the Applications tab you can also tag the box to have Docker
  pre-installed.

### Enable swap ###

If you've chosen the small droplet with 512 MB of RAM, we'll need to do an extra step
to make sure R has enough memory.  From the terminal run:

```bash
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Install & run docker ###

If you didn't check the box to install docker during the setup,
or are using a different cloud provider, just run: `curl -sSL
https://get.docker.io/ubuntu/ | sudo sh` as described in the Linux
section above.

We'll now start docker as above, but we'll also pass in a custom
username and password to secure our session, since we are now
using a publicly visible IP address.

```bash
docker run -e USER=your_username -e=PASSWORD a_secure_pw \
  -d -p 8787:8787 --name rstudio rocker/rstudio
```

Look up your public IP address in the DigtialOcean web panel and append
the port, `:8787` to the end of that address in your browser.  You should
be greeted by the RStudio welcome screen and can now log in as before
using the username and secret password you have specified.

If you created your own image on the Docker Hub in the previous
section, can run that image instead of `rocker/rstudio` in the
command above.


## analogsea: DigitalOcean the easy way ##

[Scott](http://scottchamberlain.info/) and [Hadley](http://had.co.nz/) have an excellent R package in the works called
[analogsea](https://github.com/sckott/analogsea), which makes it really easy to do all kinds of things on
DigitalOcean without ever leaving your R command line.  Analogsea uses
Docker behind-the-scenes for a fast and portable installation of R,
R Studio, and related packages. Launching an RStudio instance on
DigitalOcean is as easy as

```r
docklet_create() %>%
  docklet_rstudio()
```

Head on over to their [Github page](https://github.com/sckott/analogsea) to checkout the latest developments and
give your feedback, and watch this space for a full package release soon.


-------------------

Well, that's just the tip of the iceberg.  In later posts, we'll
take a look at more things you can do with Docker, including:

- More fun with analogsea
- Reproducible research use cases
- Introducing other pre-built images
- Writing your own Dockerfiles
- Linking your local files: using volumes


