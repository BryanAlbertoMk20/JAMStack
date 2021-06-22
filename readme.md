# 1. The JAMStack, AJAX and Static Site Generation

- [1. The JAMStack, AJAX and Static Site Generation](#1-the-jamstack-ajax-and-static-site-generation)
  - [1.1. Homework](#11-homework)
  - [1.2. Reading](#12-reading)
  - [1.3. Goals](#13-goals)
  - [1.4. Static Site Generation](#14-static-site-generation)
    - [1.4.1. The Jamstack](#141-the-jamstack)
    - [1.4.2. Eleventy](#142-eleventy)
    - [1.4.3. Initial Setup](#143-initial-setup)
    - [1.4.4. Create a Layout Template](#144-create-a-layout-template)
    - [1.6.1. Markdown](#161-markdown)
    - [1.6.2. Create a Collection](#162-create-a-collection)
    - [1.7.1. Templating and Front Matter](#171-templating-and-front-matter)
      - [1.7.1.1. Collections](#1711-collections)
      - [1.7.1.2. HTML and Markdown](#1712-html-and-markdown)
    - [1.7.2. Simplify the Posts Collection](#172-simplify-the-posts-collection)
    - [1.7.3. Commit and Deploy](#173-commit-and-deploy)
  - [1.8. Ajax](#18-ajax)
    - [1.8.1. Fetch](#181-fetch)
    - [1.8.2. Rest API](#182-rest-api)
    - [1.8.3. Looping](#183-looping)
    - [1.8.4. Second Deploy](#184-second-deploy)
  - [1.9. Notes](#19-notes)

## 1.1. Homework

- create your own New York Times developer account and use it to customize your Ajax page

## 1.2. Reading

- watch this video on [Fetch](https://youtu.be/Oive66jrwBs)

## 1.3. Goals

- introduce static site generation (SSG) with eleventy (11ty)
- introduce the Markdown language
- use templates and markdown to generate a web site
- introduce templating languages (Liquid) and YAML

The [site we are creating](https://heuristic-morse-711174.netlify.app/).

## 1.4. Static Site Generation

### 1.4.1. The JAMstack

A "stack" is a collection of software used to solve a common problem. In web development common stacks include MEAN (MongoDB, ExpressJS, Angular and Node), MERN (MongoDB, ExpressJS, React and Node) and LAMP (Linux, Apache, MySQL, and PHP).

The [JAMstack](https://jamstack.org/what-is-jamstack/) is an architecture that uses a build process to create web pages and sites that are deployed to a content delivery network.

Recall the [design patterns](https://github.com/front-end-foundations/FlexNav#aside---design-patterns) we examined previously. JAMstack sites are the simplest and most traditional - static HTML pages - but they way they are created is thoroughly modern.

### 1.4.2. Eleventy

As we just learned, JAMstack sites use pre-rendering tools that use a build process to create the multiple pages that comprise a web site.

[Eleventy](https://www.11ty.io/) (aka 11ty) is a simple [static site generator](https://jamstack.org/generators/) (SSG). Statically generated websites are very popular due to their simplicity, superior speed, SEO and security.

The benefits of 11ty over other completing generators include the fact that it is written in JavaScript (Node) and its simplicity. It uses templating engines to facilitate the flow of data.

There are [many](https://www.developerdrive.com/best-javascript-templating-engines/) templating languages and 11ty supports them all:

- [Pug](https://pugjs.org/api/getting-started.html)
- [Handlebars](https://handlebarsjs.com)
- [Moustache](https://github.com/janl/mustache.js/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)

We'll use [Liquid](https://shopify.github.io/liquid/) today. Liquid is the in-house templating engine created and maintained by Shopify.

If template languages is new to you don't worry, they are generally quite simple, resemble JavaScript and can be mastered easily.

### 1.4.3. Initial Setup

Today we're are building a simple multipage [static website](https://zealous-kilby-113356.netlify.com) with an [ajax connection](https://zealous-kilby-113356.netlify.com/posts/ajax/) that fetches articles from the New York Times.

Create a `.gitignore` file at the top level targeting the node_modules folder:

```sh
node_modules
```

```sh
$ npm init -y
$ npm install @11ty/eleventy
```

Add a script to `package.json`:

```js
"scripts": {
  "start": "eleventy --serve"
},
```

Note: since 11ty renders Markdown files we need to either delete the readme.md file in this repo or create an `.eleventyignore` file with the contents `readme.md`. Here's the [documentation](https://www.11ty.dev/docs/ignores/) for Eleventy ignore files.

### 1.4.4. Create a Layout Template

[Reference](https://www.11ty.io/docs/layouts/)

Create `src/_includes/layout.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="/css/styles.css" />
    <title>My Blog</title>
  </head>
  <body>
    <div class="content">
      <h1>{{ pageTitle }}</h1>
      {{ content }}
    </div>
  </body>
</html>
```

Note the `{{ pageTitle }}` and `{{ content }}` template regions. Our content will be inserted there.

Add [passthroughs](https://www.11ty.dev/docs/copy/) for our static assets in an `.eleventy.js` file.

```js
module.exports = function (config) {
  config.addPassthroughCopy("./src/css/");
  config.addPassthroughCopy("./src/img/");
  config.addPassthroughCopy("./src/js/");
};
```

This is our eleventy configuration file. It is a function that exports its contents for use by the Eleventy publishing system.

Add instructions for input and output folders:

```js
module.exports = function (config) {
  config.addPassthroughCopy("./src/css/");
  config.addPassthroughCopy("./src/img/");
  config.addPassthroughCopy("./src/js/");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
```

Create `src/index.md` on the top level with the following structure:

```md
---
pageTitle: New York Today
---

## Articles

A list of articles will appear here
```

Run `npm start` and open the localhost address in Chrome.

Note:

- the generated `dist` folder
- the conversion from markdown to html
- the folders specified in our config are copied into `dist`

Link the page to our template and add more content:

```md
---
layout: layout.html
pageTitle: New York Today
---

## Articles

> Dorothy followed her through many of the beautiful rooms in her castle.

A list of articles will appear here
```

The index file we created has been merged with `_includes/layout` because of the `layout: layout.html` front matter instruction.

Now that the page is linked to our template - `layout.html` - it includes the `<h1>` tag referenced there `<h1>{{ pageTitle }}</h1>`.

`layout.html` uses a [liquid](https://shopify.github.io/liquid/basics/introduction/) snippet. We will be using a handful of these.

Because the `_site` folder is generated by eleventy we can add it to our `.gitignore`.

### 1.6.1. Markdown

[Markdown](https://www.markdownguide.org/getting-started/) is an extremely simple language used extensively in web development.

It allows you to create content using an easy-to-read, easy-to-write plain text format. It converts to structurally valid HTML. Invented by [John Gruber](https://daringfireball.net/projects/markdown/) - it (or one of its many [flavors](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)) is ubiquitous in web publishing. This readme file is written in [markdown](https://www.markdownguide.org/basic-syntax#code).

Note: many of the conventions for Markdown arose from how people used email when it was confined to simple text documents, e.g. a bulleted list:

```txt
* item one
* item two
* item three
```

- item one
- item two
- item three

### 1.6.2. Create a Collection

We wll create a collection of pages using [tags](https://www.11ty.io/docs/collections/) in our front matter.

In a new page folder, `pages/about.md`:

```md
---
layout: layout.html
pageTitle: About Us
tags: page
navTitle: About
---

## We are

- a group of commited citizens
- a caring community
- a force in national politics

We are New Yorkers.

[Home](/)
```

Note:

- the changes in the `_site` folder (navigate to `http://localhost:8080/pages/about/`)
- the transformation of markdown to HTML (examine the HTML in dev tools)

Create a navbar in `layout.html`:

```html
<nav>
  <ul>
    {% for page in collections.page %}
    <li>{{ page.data.navTitle }}</li>
    {% endfor %}
  </ul>
</nav>
```

Add a tag and nav title to index.md:

```md
---
layout: layout.html
pageTitle: New York Today
navTitle: Home
tags: page
---
```

You should see a list of navTitles at the top.

The front matter `navTitle` and `tags` in our two pages are used in the template's navbar.

Add anchor tags to the template:

```html
<nav>
  <ul>
    {% for page in collections.page %}
    <li>
      <a href="{{ page.url | url }}">{{ page.data.navTitle }}</a>
    </li>
    {% endfor %}
  </ul>
</nav>
```

Let's a few more pages to the pages folder:

`contact.md`:

```md
---
layout: layout.html
pageTitle: Contact Us
tags: page
navTitle: Contact
---

## Here's how:

- 917 865 5517

[Home](/)
```

And `pictures.md`:

```md
---
pageTitle: Apples
navTitle: Pictures
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." />
{% endfor %}

[Home](/)
```

Note the use of HTML in the Markdown file. This is common.

Navigate to `http://localhost:8080/pages/pictures/`

Link it to the template:

```md
---
layout: layout.html
pageTitle: Apples
navTitle: Pictures
tags: page
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---
```

### 1.7.1. Templating and Front Matter

The material at the top between the `---`'s is commonly called [front matter](https://www.11ty.io/docs/data-frontmatter/) and uses [YAML](https://yaml.org/) (YAML Ain't Markup Language). YAML is typically used for processing instructions.

#### 1.7.1.1. Tagged Collections

[Collections](https://www.11ty.io/docs/collections/) use tags to group content.

Note: you can use multiple tags.

```md
---
layout: layout.html
pageTitle: Contact Us
tags:
  - page
  - contact
navTitle: Contact
---
```

YAML front matter tags can be written

`tags: page` or

`tags: [page]`

If you need multiple tags use: `tags: [page, other]`.

Here's the tagging [documentation](https://www.11ty.io/docs/collections/#tag-syntax).

#### 1.7.1.2. HTML and Markdown

As noted, you can use HTML in a markdown file.

Change `contact.md`:

```html
---
layout: layout.html
pageTitle: Contact Us
tags: page
navTitle: Contact
---

<h2>Here's how:</h2>

<ul>
  <li>917 865 5517</li>
</ul>

<a href="/">Home</a>
```

You can use HTML files alongside markdown.

Change the name of `contact.md` to `contact.html`.

### 1.7.2. Simplify the Posts Collection

We will add additional tags that can be used to reorganize content.

Create `pages/pages.json`:

```js
{
	"layout": "layout.html",
	"tags": ["page", "nav"]
}

```

Any document in the pages folder will inherit these properties. We can now remove the `tags` and `layout` metadata from all files in the pages directory.

E.g.: `pages/about.md`:

```md
---
pageTitle: About Us
navTitle: About
---

## We are

- a group of commited New Yorkers
- a caring community
- a force in national politics

We are New Yorkers.

[Home](/)
```

Perform the same deletions on all files in `pages`.

Let's use the `page` collection to display all the posts.

In `index.md` :

```md
---
layout: layout.html
pageTitle: New York Today
navTitle: Home
tags:
  - page
---

## Articles

{% for page in collections.page %}

  <h2><a href="{{ page.url }}">{{ page.data.pageTitle }}</a></h2>
  <em>{{ page.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

Note: the `|` character in `post.date | date: "%Y-%m-%d"` is a filter. There are quite a number of [available filters](https://help.shopify.com/en/themes/liquid/filters) for example: `upcase`:

```html
{% for page in collections.page %}
<h2><a href="{{ page.url }}">{{ page.data.pageTitle | upcase }}</a></h2>
<em>{{ page.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

### 1.7.3. Commit and Deploy

Commit your changes, merge them into the main branch and push your site to a new Github repository.

Sign into Netlify and create a new site from Git. Check the settings to ensure that Netlify has auto detected 11ty and deploy the site.

Examine the deploy logs. Note that Netlify will download and install 11ty in order to generate your `_site` folder.

## 1.8. Ajax

Ajax allows you to get data from your own or another's service. Web services expose data in the form of an API which allows you to get, delete, update or create data via [routes](http://jsonplaceholder.typicode.com/).

Today, we will get data from the New York Times and display it on our home page.

Edit `index.md` in VS Code:

```html
---
layout: layout.html
pageTitle: New York Today
---

## Articles {% for page in collections.page %}

<h2><a href="{{ page.url }}">{{ page.data.pageTitle | upcase }}</a></h2>
<em>{{ page.date | date: "%Y-%m-%d" }}</em>
{% endfor %}

<button>Show Stories</button>
```

Add a hard coded link to the page in the template:

```html
<nav>
  <ul>
    <!-- NEW -->
    <li><a href="/">Home</a></li>
    {% for page in collections.page %}
    <li>
      <a href="{{ page.url | url }}">{{ page.data.navTitle }}</a>
    </li>
    {% endfor %}
  </ul>
</nav>
```

### 1.8.1. Fetch

The `fetch()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) takes one mandatory argument, the path to the resource you want to fetch. It returns something known as a Promise that returns a response after the content is received.

_API_ stands for [Application Programming Interface](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82).

### 1.8.2. Rest API

We need data we can fetch from the internet. We'll start with the [Typicode](http://jsonplaceholder.typicode.com/) play ground. Note that you can do more than just get data, you can also post, create, delete and update data. Together these functions are often refered to a `CRUD`.

Open a console in the browser.

A promise:

```sh
> fetch('https://jsonplaceholder.typicode.com/posts')
```

A resolved promise using `.then`:

```sh
> fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
```

Since the promise is resolved you can see the actual data in the console. It returns an array of 100 fake posts which we can console.log:

```sh
fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(json => console.log(json))
```

You can see the same data if you travel to `https://jsonplaceholder.typicode.com/posts/` in a new tab. Try [other resources](http://jsonplaceholder.typicode.com/) such as comments or photos.

Note the basic structure - an array of objects:

```js
[
  { ... },
  { ... }
]
```

The format is json - [JavaScript Object Notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

Let's start out our script with event delegation.

In layout.html:

`<script src="/js/scripts.js"></script>`

In `scripts.js`:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers(event) {
  console.log(event.target);
}
```

Use [matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) in the context of in `if` statement to run a function:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => console.log(json));
}
```

Instead of logging the data we will call another function:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => showData(data));
}

function showData(data) {
  document.querySelector(".stories").innerText = data[1].body;
}
```

Note:

- `document.querySelector(".stories")` - targets an empty div
- `data[1]` - we use `[1]` to get the second entry
- `data[1].body` - we use `.` notation to access just one of the properties of the entry

Let's use the New York Times [developers](https://developer.nytimes.com/) site for our data.

```js
document.addEventListener("click", clickHandlers);

// store the link plus the API key in a variable
var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data));
}

function showData(data) {
  console.log(data);
}
```

Examine the nature of the returned data in the console. The `results` property contains the data we are interested in.

```js
function showData(data) {
  console.log(data.results);
}
```

### 1.8.3. Looping

```js
document.addEventListener("click", clickHandlers);

// store the link plus the API key in a variable
var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  console.log(stories[0].title);
  // initialize an empty string
  var looped = "";
  // use += in a for loop that uses the length of the results
  for (let story of stories) {
    console.log(story);
    looped =
      looped +
      `
      <div class="item">
        <h3>${story.title}</h3>
        <p>${story.abstract}</p>
      </div>
      `;
  }
  console.log(looped);
}
```

Note: I've declared the variable looped _before_ I started working with it.

Something like the below wouldn't work as it resets the value everytime the for loop runs.

```js
for (let story of stories) {
  var looped = "";
  looped += `
      <div class="item">
        <h3>${story.title}</h3>
        <p>${story.abstract}</p>
      </div>
      `;
}
```

Here's the script so far:

```js
document.addEventListener("click", clickHandlers);

var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  var looped = "";
  for (let story of stories) {
    looped += `
      <div class="item">
        <h3>${story.title}</h3>
        <p>${story.abstract}</p>
      </div>
      `;
  }

  document.querySelector(".stories").innerHTML = looped;
}
```

An alternative method might use the `map()` method on the array:

```js
document.addEventListener("click", clickHandlers);

var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  var looped = stories
    .map(
      (result) => `
    <div class="item">
      <h3>${result.title}</h3>
      <p>${result.abstract}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
}
```

Add CSS to format the data:

```css
@media (min-width: 480px) {
  .stories {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }
}

.stories .item {
  border-bottom: 1px dashed #aaa;
}
```

Remove the button:

```md
---
layout: layout.html
pageTitle: New York Today
---

## Articles

<div class="stories"></div>
```

And the script's dependancy on it:

```js
var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";

function getStories(event) {
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  var looped = stories
    .map(
      (result) => `
    <div class="item">
      <h3>${result.title}</h3>
      <p>${result.abstract}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
}

getStories();
```

### 1.8.4. Second Deploy

Commit, merge and push the content to Github. Log in to [app.netlify.com](https://app.netlify.com) and ensure that the deploy has succeeded.

## 1.9. Notes

For more experience with 11ty try Andy Bell's [11ty](https://piccalil.li/course/learn-eleventy-from-scratch/) course.

````

```

```
````
