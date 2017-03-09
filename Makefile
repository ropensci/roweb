deploy:
	bundle exec jekyll build && cd _site && rsync -avzh -e ssh * ropensci@direct.ropensci.org:"/home/ropensci/public_html/"

serve:
	rm -Rf _site
	bundle exec jekyll serve --watch --incremental


