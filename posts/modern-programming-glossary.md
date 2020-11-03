---
slug: modern-programming-glossary
title: Modern Programming Glossary
date: 2020-11-03T12:00:00.000Z
status: published
tags:
  - programming
  - satire
---

<i>Disclaimer: I spent a LOT of time browsing Github, and read a lot of READMEs. This post is a satire, and many great repos / landing pages feature some of the following idioms. I don't mean to offend dedicated maintainers & docs writers, however funny I find dev-targeted marketing tropes.</i>

<i>[Suggestions welcome!](https://github.com/elierotenberg/rotenberg.io/blob/master/posts/modern-programming-glossary.md)</i>

# Table of contents

# Accessible

`alt` attributes on `img` are encouraged. Some of our components allow `aria` attributes.

<i>See also: [responsive](#responsive), [mobile-first](#mobile-first)</i>

# Battle-tested

We used it for the docs website of the project and we haven't received any complains except for browers other than latest Chrome.

<i>See also: [production-ready](#production-ready), [well-tested](#well-tested), [modern](#modern)</i>

# Blazingly fast

Fast-enough on our latest-gen Macbook Pros and on the adhoc microbenchmark we have massaged into being faster than _\<similar project>_. We don't support edge cases though.

<i>See also: [modern](#modern), [lightweight](#lightweight)</i>

# Bloated

Handles edge cases we don't.

<i>See also: [modern](#modern), [lightweight](#lightweight), [tiny](#tiny)</i>

# Bleeding edge

Only works in latest Chrome with experimental flags enabled and a custom `babel` plugin. Expect breaking changes without notice every 1-2 months.

<i>See also: [modern](#modern), [legacy code](#legacy-code)</i>

# Cloud-native

We have written a `docker-compose.yml` file and it works on AWS. You need to pass secrets as environment variables.

<i>See also: [cloud-ready](#cloud-ready), [scalable](#scalable)</i>

# Cloud-ready

We provide a `Dockerfile`.

<i>See also: [cloud-native](#cloud-native), [scalable](#scalable)</i>

# Configurable

You will need to copy/paste a subfolder from our `examples` folder to run it.

<i>See also: [modular](#modular)</i>

# Cross-plaform

Laggy on all Web, Android, iOS and Electron. All versions include 20Mb of Node API polyfills.

<i>See also: [modern](#modern), [progressive web app](#progressive-web-app)</i>

# Customizable

Our JSON configuration interpreter is Turing-complete.

<i>See also: [configurable](#configurable), [modular](#modular)</i>

# Entreprise-level

We provide paid support & services.

<i>See also: [cloud-native](#cloud-native)</i>

# Legacy code

Code not written by us less than 3 month ago.

<i>See also: [modern](#modern), [bleeding-edge](#bleeding-edge)</i>

# Lightweight

With 100Gbps network speed, it takes no more than several seconds to download in NA.

<i>See also: [tiny](#tiny), [modern](#modern), [blazingly-fast](#blazingly-fast)</i>

# Mobile-first

We have copy-pasted `<meta name="viewport" content="width=device-width, initial-scale=1">` and it works on our Macbook Pros in latest Chrome emulating iPhone X.

<i>See also: [mobile-first](#mobile-first)</i>

# Modern

Written in a language we are familiar with, using our own linting conventions. Only works on latest Chrome. Expect breaking changes every 2-3 months.

<i>See also: [bleeding edge](#bleeding-edge), [legacy code](#legacy-code)</i>

# Modular

Code is spread over 10 different tighly-coupled packages. We expose a `plugin` configuration option that only accepts our own plugins. Expect breaking plugin API changes every 2-3 months.

<i>See also: [modern](#modern), [bleeding edge](#bleeding-edge)</i>

# Open standards

We published the source code of our parser and wrote a README file that looks like an RFC.

<i>See also: [modular](#modular)</i>

# Privacy-focused

You may opt-out of automated backdoor analytics in both your config file and environment variables, and you must do so again every time you update.

<i>See also: [secure](#secure)</i>

# Production-ready

Not yet used in production.

<i>See also: [entreprise-level](#enterprise-level), [modern](#modern), [well-tested](#well-tested), [battle-tested](#battle-tested)</i>

# Progressive web app

We display a spinner while the 10Mb bundle is downloading.

<i>See also: [responsive](#responsive), [lightweight](#lightweight)</i>

# Responsive

We use `display: flex` instead of `display: block` and we have replaced `16px` with `1em`.

<i>See also: [accessible](#accessible), [mobile-first](#mobile-first)</i>

# Robust

It works on our machines.

<i>See also: [well-tested](#well-tested), [battled-tested](#battle-tested), [production-ready](#production-ready), [entreprise-level](#enterprise-level)</i>

# Scalable

You need a Kubernetes cluster with at least 3 nodes to serve your blog. We also provide paid hosting, by the way.

<i>See also: [enterprise-level](#enterprise-level), [cloud-native](#cloud-native), [cloud-ready](#cloud-ready)</i>

# Secure

We only use `eval` sparingly and we embed a 10Mb third party HTML sanitizer.

<i>See also: [entreprise-level](#enterprise-level), [typesafe](#typesafe)</i>

# Serverless

You need an AWS server to run it.

<i>See also: [scalable](#scalable), [cloud-native](#cloud-native), [cloud-ready](#cloud-ready)</i>

# Tiny

All code is inlined in a single 1k LOC file.

<i>See also: [lightweight](#lightweight), [zero-dependencies](#zero-dependencies)</i>

# Well-tested

We have written some tests and have more than 50% code coverage.

<i>See also: [battle-tested](#battle-tested), [robust](#robust), [production-ready](#production-ready)</i>

# Unified

[![Standards](https://imgs.xkcd.com/comics/standards.png)](https://xkcd.com/927/)

<i>See also: [open standards](#open-standards)</i>

# Typesafe

We have prefixed all occurences of `any` with `// eslint-ignore-next-line`.

<i>See also: [secure](#secure)</i>

# Zero-dependencies

Our dependencies are embeded in a `vendor` folder, and/or we have custom implementations of common functions that don't support edge cases, most of which are copy/pasted from StackOverflow without attribution.

<i>See also: [tiny](#tiny), [lightweight](#lightweight), [modular](#modular), [modern](#modern)</i>
