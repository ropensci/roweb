---
name: curl-options
layout: post
title: Curling - accessing web resources from R
date: 2014-12-16
authors:
  - name: Scott Chamberlain
tags:
- R
- API
- curl
---



rOpenSci specializes in creating R libraries for accessing data resources on the web from R. Most times you request data from the web in R with our packages, you should have no problem. However, you evenutally will run into problems. In addition, there are advanced things you can do modifying requests to web resources that fall in the _advanced stuff_ category.

Underlying almost all of our packages are requests to web resources served over the `http` protocol via [curl][curl]. `curl` _is a command line tool and library for transferring data with URL syntax, supporting (lots of protocols)_ . `curl` has many options that you may not know about.

I'll go over some of the common and less commonly used curl options.

## Discover curl options

You can go to the source, that is the curl manual page at [http://curl.haxx.se/docs/manpage.html](http://curl.haxx.se/docs/manpage.html). In R: `RCurl::listCurlOptions()` for finding curl options, give website for more info and equivalent call in `httr` is `httr::httr_options()`. `httr::httr_options()` gives more information for each curl option, including the libcurl variable name (e.g., `CURLOPT_CERTINFO`) and the type of variable (e.g., logical).

## Other ways to use curl besides R

Perhaps the canonical way to use curl is on the command line. You can get curl for your operating system at [http://curl.haxx.se/download.html](http://curl.haxx.se/download.html), though hopefully you already have curl. Once you have curl, you can have lots of fun. For example, get the contents of the Google landing page:

```sh
curl https://www.google.com
```

* If you like that you may also like [httpie][httpie], a Python command line tool that is a little more convenient than curl (e.g., JSON output is automatically parsed and colorized).
* Alot of data from the web is in JSON format. A great command line tool to pair with `curl` is [jq][jq].

## Install httr

> Note: `RCurl` is a dependency, so you'll get it when you install `httr`


```r
install.packages("httr")
```

There are some new features in `httr` dev version you may want. If so, do:


```r
install.packages("devtools")
devtools::install_github("hadley/httr")
```

Load `httr`


```r
library("RCurl")
library("httr")
```

## general option setting

With `httr` you can either set globally for an R session like


```r
set_config(timeout(seconds = 2))
```

Or use `with_config()`


```r
with_config(verbose(), {
  GET("http://had.co.nz")
})
```

Or extensions to `with_*`, like for `verbose` output


```r
with_verbose(
  GET("http://had.co.nz")
)
#> Response [http://had.co.nz/]
#>   Date: 2014-12-16 15:37
#>   Status: 200
#>   Content-Type: text/html
#>   Size: 5.11 kB
#> <html>
#> 
#> <head>
#> 	<title>had.co.nz</title>
#> 	<link rel="stylesheet" type="text/css" href="/style.css">
#>   <META name="verify-v1" content="VO/AqSceU4SiCKMtFDZG5vDVPKDmpMlnhPcVLY...
#> </head>
#> 
#> <body>
#> <script src="http://www.google-analytics.com/urchin.js" type="text/javas...
#> ...
```

Or pass into each function call


```r
GET("http://www.google.com/search", query=list(q="httr"), timeout(seconds = 0.5))
```

With `RCurl` you can set options for a function call by passing curl options to the `.opts` parameter


```r
getForm("http://www.google.com/search?q=RCurl", btnG="Search", .opts = list(timeout.ms = 20))
```

For all examples below I'll use `httr`, and pass in config options to function calls.

## curl options in rOpenSci packages

In most of our packages we allow you to pass in any curl options, either via `...` or a named parameter. We are increasingly making our packages consistent, but they may not all have this ability yet. For example, using the `rgbif` package, an R client for [GBIF][gbif]:


```r
install.packages("rgbif")
```

verbose output


```r
library("rgbif")
res <- occ_search(geometry=c(-125.0,38.4,-121.8,40.9), limit=20, config=verbose())
#> -> GET /v1/occurrence/search?geometry=POLYGON%28%28-125%2038.4%2C%20-121.8%2038.4%2C%20-121.8%2040.9%2C%20-125%2040.9%2C%20-125%2038.4%29%29&limit=20&offset=0 HTTP/1.1
#> -> User-Agent: curl/7.37.1 Rcurl/1.95.4.5 httr/0.6.0
#> -> Host: api.gbif.org
#> -> Accept-Encoding: gzip
#> -> Accept: application/json, text/xml, application/xml, */*
#> -> 
#> <- HTTP/1.1 200 OK
#> <- Content-Type: application/json
#> <- Access-Control-Allow-Origin: *
#> <- Server: Jetty(9.1.z-SNAPSHOT)
#> <- x-api-url: /v1/occurrence/search?geometry=POLYGON%28%28-125%2038.4%2C%20-121.8%2038.4%2C%20-121.8%2040.9%2C%20-125%2040.9%2C%20-125%2038.4%29%29&limit=20&offset=0
#> <- Content-Length: 48698
#> <- Accept-Ranges: bytes
#> <- Date: Tue, 16 Dec 2014 23:35:52 GMT
#> <- X-Varnish: 1067986052 1067940827
#> <- Age: 209
#> <- Via: 1.1 varnish
#> <- Connection: keep-alive
#> <- 
```

Print progress


```r
res <- occ_search(geometry=c(-125.0,38.4,-121.8,40.9), limit=20, config=progress())
#> |===================================================================| 100%
```

You can also combine curl options - use `c()` in this case to combine them


```r
c(verbose(), progress())
#> Config: 
#> List of 4
#>  $ debugfunction   :function (...)  
#>  $ verbose         :TRUE
#>  $ noprogress      :FALSE
#>  $ progressfunction:function (...)
```


```r
res <- occ_search(geometry=c(-125.0,38.4,-121.8,40.9), limit=20, config=c(verbose(), progress()))
#> -> GET /v1/occurrence/search?geometry=POLYGON%28%28-125%2038.4%2C%20-121.8%2038.4%2C%20-121.8%2040.9%2C%20-125%2040.9%2C%20-125%2038.4%29%29&limit=20&offset=0 HTTP/1.1
#> -> User-Agent: curl/7.37.1 Rcurl/1.95.4.5 httr/0.6.0
#> -> Host: api.gbif.org
#> -> Accept-Encoding: gzip
#> -> Accept: application/json, text/xml, application/xml, */*
#> -> 
#> <- HTTP/1.1 200 OK
#> <- Content-Type: application/json
#> <- Access-Control-Allow-Origin: *
#> <- Server: Jetty(9.1.z-SNAPSHOT)
#> <- x-api-url: /v1/occurrence/search?geometry=POLYGON%28%28-125%2038.4%2C%20-121.8%2038.4%2C%20-121.8%2040.9%2C%20-125%2040.9%2C%20-125%2038.4%29%29&limit=20&offset=0
#> <- Content-Length: 48698
#> <- Accept-Ranges: bytes
#> <- Date: Tue, 16 Dec 2014 23:35:52 GMT
#> <- X-Varnish: 1067986052 1067940827
#> <- Age: 209
#> <- Via: 1.1 varnish
#> <- Connection: keep-alive
#> <- 
#>   |======================================================================| 100%
```

## timeout

> Set a timeout for a request. If request exceeds timeout, request stops.

* `httr`: `timeout(seconds=2)` Here, the value is in seconds - converted to ms internally
* `RCurl`: `timeout.ms=2000` Here, the value is in ms


```r
GET("http://had.co.nz", timeout(0.01))
#> Error in function (type, msg, asError = TRUE)  :
#>   Connection timed out after 16 milliseconds
```

## verbose

> Print detailed info on a curl call

* `httr`: `verbose()`
* `RCurl`: `verbose=TRUE`

Just do a `HEAD` request so we don't have to deal with big output


```r
#> HEAD("http://had.co.nz", verbose())
#> -> HEAD / HTTP/1.1
#> -> User-Agent: curl/7.37.1 Rcurl/1.95.4.5 httr/0.6.0
#> -> Host: had.co.nz
#> -> Accept-Encoding: gzip
#> -> Accept: application/json, text/xml, application/xml, */*
#> ->
#> <- HTTP/1.1 200 OK
#> <- X-Powered-By: PHP/4.4.6
#> <- Content-type: text/html
#> <- Date: Tue, 16 Dec 2014 21:03:21 GMT
#> <- Server: LiteSpeed
#> <- Connection: Keep-Alive
#> <- Keep-Alive: timeout=5, max=100
#> <-
#> Response [http://had.co.nz/]
#>   Date: 2014-12-16 12:29
#>   Status: 200
#>   Content-Type: text/html
#> <EMPTY BODY>
```

## headers

> Add headers to modify requests, including authentication, setting content-type, accept type, etc.

* `httr`: `add_headers()`
* `RCurl`: `httpheader`


```r
res <- HEAD("http://had.co.nz", add_headers(Accept = "application/json"))
res$request$opts$httpheader
#>             Accept 
#> "application/json"
```

> Note: there are shortcuts for `add_headers(Accept = "application/json")` and add_headers(Accept = "application/xml"): `accept_json()`, and `accept_xml()`

## authenticate

> Set authentication details for a resource

* `httr`: `authenticate()`, `oauth2.0_token()`, `oauth_app()`, `oauth_endpoint()`
* `RCurl`: various

`authenticate()` for basic username/password authentication


```r
authenticate(user = "foo", password = "bar")
#> Config: 
#> List of 2
#>  $ httpauth:1
#>   ..- attr(*, "names")="basic"
#>  $ userpwd :"foo:bar"
```

To use an API key, this depends on the data provider. They may request it one or either of the header (in multiple different ways)


```r
HEAD("http://had.co.nz", add_headers(Authorization = "Bearer 234kqhrlj2342"))
# or
HEAD("http://had.co.nz", add_headers("token" = "234kqhrlj2342"))
```

or as a query parameter (which is passed in the URL string)


```r
HEAD("http://had.co.nz", query = list(api_key = "<your key>"))
```

Another authentication options is OAuth workflows. `OAuth2` is probably more commonly used than `OAuth1`.

* Find OAuth settings for github http://developer.github.com/v3/oauth/


```r
endpts <- oauth_endpoint(authorize = "authorize", access = "access_token", base_url = "https://github.com/login/oauth")
```

* Register an application at https://github.com/settings/applications. Use any URL you would like for the homepage URL (http://github.com is fine) and http://localhost:1410 as the callback url. Insert your client ID and secret below - if secret is omitted, it will look it up in the GITHUB_CONSUMER_SECRET environmental variable.


```r
myapp <- oauth_app(appname = "github", key = "<key>", secret = "<secret>")
```

* Get OAuth credentials


```r
github_token <- oauth2.0_token(endpts, myapp)
```

* Use API


```r
gtoken <- config(token = github_token)
req <- GET("https://api.github.com/rate_limit", gtoken)
content(req)
```

## cookies

> Set or get cookies.

* `httr`: `set_cookies()`, `cookies()`
* `RCurl`: `cookie`

Set cookies


```r
GET("http://httpbin.org/cookies", set_cookies(a = 1, b = 2))
#> Error in function (type, msg, asError = TRUE) : easy handle already used in multi handle
```

If there are cookies in a response, you can access them easily with `cookies()`


```r
res <- GET("http://httpbin.org/cookies/set", query = list(a = 1, b = 2))
#> Error in function (type, msg, asError = TRUE) : easy handle already used in multi handle
cookies(res)
#> list()
```

## progress

> Print curl progress

* `httr`: `progress()`
* `RCurl`: `progressfunction`


```r
res <- GET("http://httpbin.org", progress())
#> Error in function (type, msg, asError = TRUE) : easy handle already used in multi handle
```

## proxies

> When behind a proxy, give authentiction details for your proxy.

* `httr`: `use_proxy()`
* `RCurl`: See various curl options that start with `proxy`


```r
GET("http://had.co.nz", use_proxy(url = "125.39.66.66", port = 80, username = "username", password = "password"))
```

## user agent

> Some resources require a user-agent string.

* `httr`: `user_agent()`
* `RCurl`: `useragent`

Get the default user agent set if using `httr`


```r
GET("http://httpbin.org/user-agent")
#> Error in function (type, msg, asError = TRUE) : easy handle already used in multi handle
```

Set a user agent string


```r
GET("http://httpbin.org/user-agent", user_agent("its me!"))
#> Error in function (type, msg, asError = TRUE) : easy handle already used in multi handle
```

## Questions?

Let us know if you have any questions. The new `curl` newbie, it may seem a bit overwhelming, but we're here to help. 

[curl]: http://curl.haxx.se/
[jq]: http://stedolan.github.io/jq/
[httpie]: https://github.com/jakubroztocil/httpie
[gbif]: http://www.gbif.org/
 