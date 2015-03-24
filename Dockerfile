FROM ubuntu:14.04

ENV DEBIAN_FRONTEND noninteractive
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN locale-gen en_US.UTF-8 && dpkg-reconfigure locales

RUN apt-get update && apt-get -y install \
    bundler \
    git \
    libxml2-dev \
    libxslt1-dev \
    libcurl4-openssl-dev \
    make \
    pandoc \
    pandoc-citeproc \
    ruby1.9.1 \
    ruby1.9.1-dev 


ADD . /website
WORKDIR /website

## Configure bundler and install gems listed in the Gemfile

RUN bundle config --global LANG en_US.UTF-8 \
    && bundle config --global LC_ALL en_US.UTF-8 \
    && bundle install && bundle update

EXPOSE 4000

CMD bundle exec jekyll build --trace
CMD bundle exec jekyll serve -h 0.0.0.0

