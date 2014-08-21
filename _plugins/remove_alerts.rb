# Title: remove_alerts.rb
# Author: Scott Chamberlain, @sckott
# License: MIT

require 'Nokogiri'

module Jekyll
  module RemoveAlerts
    def remove_alerts(input)
      res = Nokogiri::HTML(input)
      res.xpath('//div[@role="alert"]').remove
      res
    end
  end
end
Liquid::Template.register_filter(Jekyll::RemoveAlerts)
