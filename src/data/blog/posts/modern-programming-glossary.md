---
slug: modern-programming-glossary
title: Modern Programming Glossary
date: "2020-11-03T12:00:00.000Z"
status: published
lang: en
tags:
  - programming
  - satire
abstract: Learn how to properly understand Modern Programming technical terms.
cover: /media/blog/modern-programming-glossary/blazingly-fast.jpg
---

!["Blazingly Fast: Modern Programming Glossary](/media/blog/modern-programming-glossary/blazingly-fast.jpg "Credits dev.to/rly")

_Disclaimer: I spent a LOT of time browsing Github, and read a lot of READMEs. This post is a satire, and many great repos / landing pages feature some of the following idioms. I don't mean to offend dedicated maintainers & docs writers, however funny I find dev-targeted marketing tropes._

_[Suggestions welcome!](https://github.com/elierotenberg/rotenberg.io/blob/master/src/data/blog/posts/modern-programming-glossary.md)_

# Table of Contents

# Accessible

`alt` attributes on `img` are encouraged. Some of our components allow `aria` attributes.

_See also: [responsive](#responsive), [mobile-first](#mobile-first)_

# Battle-tested

We used it for the docs website of the project and we haven't received any complains except for browers other than latest Chrome.

_See also: [production-ready](#production-ready), [well-tested](#well-tested), [modern](#modern)_

# Blazingly fast

Fast-enough on our latest-gen Macbook Pros and on the adhoc microbenchmark we have massaged into being faster than _similar project_. We don't support edge cases though.

_See also: [modern](#modern), [lightweight](#lightweight)_

# Bloated

Handles edge cases we don't.

_See also: [modern](#modern), [lightweight](#lightweight), [tiny](#tiny)_

# Bleeding edge

Only works in latest Chrome with experimental flags enabled and a custom `babel` plugin. Expect breaking changes without notice every 1-2 months.

_See also: [modern](#modern), [legacy code](#legacy-code)_

# Cloud-native

We have written a `docker-compose.yml` file and it works on AWS. You need to pass secrets as environment variables.

_See also: [cloud-ready](#cloud-ready), [scalable](#scalable)_

# Cloud-ready

We provide a `Dockerfile`.

_See also: [cloud-native](#cloud-native), [scalable](#scalable)_

# Configurable

You will need to copy/paste a subfolder from our `examples` folder to run it.

_See also: [modular](#modular)_

# Cross-plaform

Laggy on all Web, Android, iOS and Electron. All versions include 20Mb of Node API polyfills.

_See also: [modern](#modern), [progressive web app](#progressive-web-app)_

# Customizable

Our JSON configuration interpreter is Turing-complete.

_See also: [configurable](#configurable), [modular](#modular)_

# Entreprise-level

We provide paid support & services.

_See also: [cloud-native](#cloud-native)_

# Legacy code

Code not written by us less than 3 month ago.

_See also: [modern](#modern), [bleeding-edge](#bleeding-edge)_

# Lightweight

With 100Gbps network speed, it takes no more than several seconds to download in NA.

_See also: [tiny](#tiny), [modern](#modern), [blazingly-fast](#blazingly-fast)_

# Mobile-first

We have copy-pasted `<meta name="viewport" content="width=device-width, initial-scale=1">` and it works on our Macbook Pros in latest Chrome emulating iPhone X.

_See also: [mobile-first](#mobile-first)_

# Modern

Written in a language we are familiar with, using our own linting conventions. Only works on latest Chrome. Expect breaking changes every 2-3 months.

_See also: [bleeding edge](#bleeding-edge), [legacy code](#legacy-code)_

# Modular

Code is spread over 10 different tighly-coupled packages. We expose a `plugin` configuration option that only accepts our own plugins. Expect breaking plugin API changes every 2-3 months.

_See also: [modern](#modern), [bleeding edge](#bleeding-edge)_

# Open standards

We published the source code of our parser and wrote a README file that looks like an RFC.

_See also: [modular](#modular)_

# Privacy-focused

You may opt-out of automated backdoor analytics in both your config file and environment variables, and you must do so again every time you update.

_See also: [secure](#secure)_

# Production-ready

Not yet used in production.

_See also: [entreprise-level](#enterprise-level), [modern](#modern), [well-tested](#well-tested), [battle-tested](#battle-tested)_

# Progressive web app

We display a spinner while the 10Mb bundle is downloading.

_See also: [responsive](#responsive), [lightweight](#lightweight)_

# Responsive

We use `display: flex` instead of `display: block` and we have replaced `16px` with `1em`.

_See also: [accessible](#accessible), [mobile-first](#mobile-first)_

# Robust

It works on our machines.

_See also: [well-tested](#well-tested), [battled-tested](#battle-tested), [production-ready](#production-ready), [entreprise-level](#enterprise-level)_

# Scalable

You need a Kubernetes cluster with at least 3 nodes to serve your blog. We also provide paid hosting, by the way.

_See also: [enterprise-level](#enterprise-level), [cloud-native](#cloud-native), [cloud-ready](#cloud-ready)_

# Secure

We only use `eval` sparingly and we embed a 10Mb third party HTML sanitizer.

_See also: [entreprise-level](#enterprise-level), [typesafe](#typesafe)_

# Serverless

You need an AWS server to run it.

_See also: [scalable](#scalable), [cloud-native](#cloud-native), [cloud-ready](#cloud-ready)_

# Tiny

All code is inlined in a single 1k LOC file.

_See also: [lightweight](#lightweight), [zero-dependencies](#zero-dependencies)_

# Well-tested

We have written some tests and have more than 50% code coverage.

_See also: [battle-tested](#battle-tested), [robust](#robust), [production-ready](#production-ready)_

# Unified

![Standards](https://imgs.xkcd.com/comics/standards.png)

_See also: [xkcd/927](https://xkcd.com/927/), [open standards](#open-standards)_

# Typesafe

We have prefixed all occurences of `any` with `// eslint-ignore-next-line`.

_See also: [secure](#secure)_

# Zero-dependencies

Our dependencies are embeded in a `vendor` folder, and/or we have custom implementations of common functions that don't support edge cases, most of which are copy/pasted from StackOverflow without attribution.

_See also: [tiny](#tiny), [lightweight](#lightweight), [modular](#modular), [modern](#modern)_
