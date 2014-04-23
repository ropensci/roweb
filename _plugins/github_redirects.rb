module Jekyll

  class RedirectsPage < Page
    def initialize(site, base, dir, packagename)
        @site = site
        @base = base
        @dir = dir
        @name = packagename + '.html'
        @packagename = packagename

        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), 'github_redirect.html')
        self.data['packagename'] =  packagename
        self.data['permalink'] = "/" + packagename + ".html"
    end
  end

  class RedirectsGenerator < Generator
    safe true
    def generate(site)
      site.config['packages'].each do |p|
        if(!p.nil?)
          site.pages << RedirectsPage.new(site, site.source, site.source, p)
        end
      end
    end
  end

end
