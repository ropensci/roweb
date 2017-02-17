deploy:
	bundle exec jekyll build && cd _site && rsync -avzh -e ssh * ropensci@direct.ropensci.org:"/home/ropensci/public_html/"

serve:
	bundle exec jekyll serve --watch --incremental


