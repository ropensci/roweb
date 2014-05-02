## Notes for the website

* [doesn't work] Use the `Makefile` and `make deploy` to `jekyll build`, cd to `_site`, and push to `public_html` (i.e. `ropensci.org`). 
* 
Note: Can someone fix the makefile? It doesn't cd properly before pushing.

* If adding new community members, it's best to add a square image that is 250 x 250 px. If you have issues, @karthik has Photoshop and can fix things.

Note on ggplots: When saving ggplots, if possible save like so (maybe by setting up `fig.width` and `fig.height` in the hooks). I usually do 6" by 4". See [here for an example](https://github.com/karthik/roweb/commit/7f562a4019dd660a5176fd7c0e0791674ce48b98). Otherwise the figures lose their aspect ratio and becomes squished (easier to spot in the maps. [example](http://new.ropensci.org/usecases/rwbclimate_intro.html))

Please deploy to the regular site:

```coffee
rsync -avzh -e ssh * ropensci@direct.ropensci.org:"/home/ropensci/public_html/"
```