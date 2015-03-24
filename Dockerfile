FROM ruby:2.1
MAINTAINER graham@grahamc.com

RUN apt-get update \
  && apt-get install -y \
    node \
    python-pygments \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/

VOLUME /src
WORKDIR /src
COPY Gemfile /src/Gemfile
RUN bundle install
EXPOSE 4000

CMD jekyll serve -H 0.0.0.0

