Notes for the website:

* Use the `Makefile` and `make deploy` to `jekyll build`, cd to `_site`, and push to the `new` folder (i.e. `new.ropensci.org`). We can remote the new and push to main site once we are happy.
Note: Can someone fix the makefile? It doesn't cd properly before pushing.

* If adding new community members, it's best to add a square image that is 250 x 250 px. If you have issues, @karthik has Photoshop and can fix things.

Note on ggplots: When saving ggplots, if possible save like so (maybe by setting up `fig.width` and `fig.height` in the hooks). I usually do 6" by 4". See [here for an example](https://github.com/karthik/roweb/commit/7f562a4019dd660a5176fd7c0e0791674ce48b98). Otherwise the figures lose their aspect ratio and becomes squished (easier to spot in the maps. [example](http://new.ropensci.org/packages/))