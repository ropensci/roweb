# Title: image_url.rb
# Author: Scott Chamberlain, @recology_
# Licence: CC0
# Description: Wraps <img> tag in an <a> tag to give it a hyperlink.
# 
# Configuration:
# 	Specify your base url below in the filter
# 
# Example use: 
#
# {{ "img/foo.png" | image_url }} # <a href="http://google.com/img/foo.png"><img src="http://google.com/img/foo.png"></a>

module Jekyll
  module ImageUrl
    def image_url(input)
      x = input.to_s
      "<a href='http://ropensci.org/"+ x + "'><img src='http://ropensci.org/" + x + "'></a>"
    end
  end
end
Liquid::Template.register_filter(Jekyll::ImageUrl)