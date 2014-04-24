
server:
	jekyll server

deploy:
	jekyll build
	cd _site
	rsync -avzh -e ssh * ropensci@direct.ropensci.org:"/home/ropensci/public_html/new"
