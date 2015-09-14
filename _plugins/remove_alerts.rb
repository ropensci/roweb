# Title: remove_alerts.rb
# Author: Scott Chamberlain, @sckott
# License: MIT

require 'oga'

module Jekyll
  module RemoveAlerts
    def remove_alerts(input)
    	res = Oga.parse_html(input)
      # res = Nokogiri::HTML(input)
      res.xpath('//div[@role="alert"]').remove
      res
    end
  end
end
Liquid::Template.register_filter(Jekyll::RemoveAlerts)

# require 'oga'
# handle = File.open('/Users/sacmac/github/ropensci/roweb/_site/blog/2014/02/18/antweb/index.html')
# res = Oga.parse_html(handle)
# res.xpath('//div[@role="alert"]')
