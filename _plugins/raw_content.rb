# Generator to make raw content avialable as post.raw_content
# 
# Jekyll overwrites the post.content markdown data with the rendered html data
# Consequently liquid filters/etc only have access to HTML versions of the content
# in post.content.  This stores a copy as raw, which can be used for other purposes.
#
# Credit to [matthewowen](https://github.com/matthewowen) for this, https://gist.github.com/4025507
# In answer to StackOverflow question: http://stackoverflow.com/questions/13159286

module Jekyll
  class RawContent < Generator
    def generate(site)
      site.posts.each do |post|
        post.data['raw_content'] = post.content
      end
      site.pages.each do |page|
        page.data['raw_content'] = page.content
      end
    end
  end
end
