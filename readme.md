# 1. The JAMStack, AJAX and Static Site Generation

- [1. The JAMStack, AJAX and Static Site Generation](#1-the-jamstack-ajax-and-static-site-generation)
  - [1.1. Homework](#11-homework)
  - [1.2. Goals](#12-goals)
  - [1.3. Static Site Generation](#13-static-site-generation)
    - [1.3.1. Eleventy](#131-eleventy)
    - [1.3.2. Initial Setup](#132-initial-setup)
    - [1.3.3. Create a Layout Template](#133-create-a-layout-template)
    - [1.3.4. Markdown](#134-markdown)
    - [1.3.5. Create a Collection](#135-create-a-collection)
    - [1.3.6. temp](#136-temp)
    - [1.3.7. Collections](#137-collections)
    - [1.3.8. Pass Throughs](#138-pass-throughs)
    - [1.3.9. Site Preferences](#139-site-preferences)
    - [1.3.10. The Posts Collection](#1310-the-posts-collection)
  - [1.4. Ajax](#14-ajax)
    - [1.4.1. Fetch](#141-fetch)
    - [1.4.2. Rest API](#142-rest-api)
    - [1.4.3. Looping](#143-looping)
    - [1.4.4. Adding Our Ajax](#144-adding-our-ajax)
  - [1.5. Notes](#15-notes)

## 1.1. Homework

- watch this video on [Fetch](https://youtu.be/Oive66jrwBs)
- create your own New York Times developer account and use it to customize your Ajax page

## 1.2. Goals

- introduce static site generation with eleventy
- introduce the Markdown language
- use templates to create html pages
- introduce templating languages

## 1.3. Static Site Generation

### 1.3.1. Eleventy

[Eleventy](https://www.11ty.io/) (aka 11ty) is a simple [static site generator](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/) (Smashing Magazine itself is [statically generated](https://www.smashingmagazine.com/2017/03/a-little-surprise-is-waiting-for-you-here/)). Static websites are very popular these days due to their simplicity, superior speed, SEO and security. Here is a [list](https://www.staticgen.com/) sorted by popularity.

Every generator uses a template processor - software designed to combine templates with data to output documents. The language that the templates are written in is known as a template language or templating language.

The benefits of 11ty over other completing generators include the fact that it is written in JavaScript and its comparative simplicity. It uses [Liquid](https://shopify.github.io/liquid/) under the hood to make pages. Liquid is the in-house templating engine created and maintained by Shopify. You can use additional template engines with 11ty if you wish.

The most popular static site generator - Jekyll - is used at Github and is written in Ruby.

### 1.3.2. Initial Setup

Today were are building a simple multipage [static website](https://zealous-kilby-113356.netlify.com) with an [ajax connection](https://zealous-kilby-113356.netlify.com/posts/ajax/) that pulls articles from the New York Times.

Create a git `.gitignore` file at the top level targeting the node_modules folder:

```sh
node_modules
```

```sh
$ npm init -y
$ npm install --save-dev @11ty/eleventy
```

Add a script to `package.json`:

```js
"scripts": {
  "start": "eleventy --serve"
},
```

Create an `.eleventyignore` with the contents `readme.md`. Here's the [documentation](https://www.11ty.dev/docs/ignores/) for Eleventy ignore files.

### 1.3.3. Create a Layout Template

[Reference](https://www.11ty.io/docs/layouts/)

Create `_includes/layout.html` at the top level:

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
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "static/css": "css" });
  eleventyConfig.addPassthroughCopy({ "static/img": "img" });
  eleventyConfig.addPassthroughCopy({ "static/js": "js" });
};
```

This is our eleventy configuration file. It is a function that exports its contents for use by the Eleventy publishing system.

Create `index.md` on the top level with the following structure:

```md
---
layout: layout.html
pageTitle: New York Today
navTitle: Home
tags: post
---

## Articles

<button>Click</button>

<div></div>
```

Run `npm start` and open the localhost address in Chrome and examine the `\_site` directory.

Note:

- the generated `_site` folder
- the conversion from markdown to html
- the files specified in our config are copied into `_site`
- the new `index.html` in `posts/about`
- the index file we created has been merged into `_includes/layout` because of the `layout: layout.html` front matter instruction
- `<h1>{{ pageTitle }}</h1>` in our template is using the data in the front matter `pageTitle: New York Today`
- `{{ content }}` in our template is using the code that appears below the front matter
- do not edit the files in `_site` as they are generated

The template uses a templating language called [liquid](https://shopify.github.io/liquid/basics/introduction/) developed by Shopify. we will be using a handfull of these. eleventy supports many templating languages.

Because the `_site` folder is generated by eleventy we can add it to our `.gitignore`.

### 1.3.4. Markdown

[Markdown](https://www.markdownguide.org/getting-started/) is an extremely simple language used extensively in web development.

It allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid HTML. invented by [John Gruber](https://daringfireball.net/projects/markdown/) - it (or one of its flavors) is ubiquitous in web publishing. This readme file is written in [markdown](https://help.github.com/en/articles/basic-writing-and-formatting-syntax).

Note: many of the conventions for Markdown arose from how people used email when it was confined to simple text documents, e.g. a bulleted list:

```txt
* item one
* item two
* item three
```

- item one
- item two
- item three

### 1.3.5. Create a Collection

To create our pages we will use a combination of html and markdown.

We wll create a collection of pages using [tags](https://www.11ty.io/docs/collections/) in our front matter.

In `posts/about.md`:

```md
---
layout: layout.html
pageTitle: About Us
tags: post
navTitle: About
---

## We are

- a group of commited New Yorkers
- a caring community
- a force in national politics

We are New Yorkers.

[Home](/)
```

Note:

- the changes in the `_site` folder. Navigate to `http://localhost:8080/posts/about/`
- the transformation of markdown to HTML (examine the HTML in dev tools)

Create a navbar in `layout.html`:

```html
<ul>
  {% for post in collections.post %}
  <li>{{ post.data.navTitle }}</li>
  {% endfor %}
</ul>
```

Add a tag and nav title to index.html:

```html
---
layout: layout.html
pageTitle: New York Today
navTitle: Ajax
tags: post
---

<h2>Ajax</h2>
<button>Click</button>
<div></div>
```

You should see a list of page titles at the top. The front matter `navTitle` and `tags` in our two pages are used in the template's navbar.

Add anchor tags to the template:

```html
<ul>
  {% for post in collections.post %}
  <li>
    <a href="{{ post.url | url }}">{{ post.data.navTitle }}</a>
  </li>
  {% endfor %}
</ul>
```

Try adding a few more pages to the posts folder:

`contact.md`:

```md
---
pageTitle: Contact Us
navTitle: Contact
tags: post
---

## Here's how:

- 917 865 5517

[Home](/)
```

Preview and then add `layout: layout.html` to the front matter.

`pictures.md`:

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

Navigate to the pictures page. Add `layout: layout.html` and `tags: post` to the front matter.

Try:

- changing the name of the folder `posts` to `pages`
- adding, editing and removing the

==========================================================================================================

### 1.3.6. temp

Recall, 11ty uses a templating software called Liquid by default. `{{ content }}` is a Liquid [object](https://shopify.github.io/liquid/basics/introduction/). If templating is new to you don't worry, it is generally quite simple and can be mastered easily. There are many templating languages besides Liquid (and 11ty supports most). You will eventually find one that works best for you.

Edit index.html as follows:

```html
---
layout: layout.html
---

<h2>Home</h2>
```

The material at the top between the `---`s is called [frontmatter](https://www.11ty.io/docs/data-frontmatter/) as uses `Yaml` (Yet Another Markup Language) syntax. It can also be written in JSON.

The front matter here specifies that this document (index.html) should use layout.html as its template.

We can use front matter to pass information to the template.

Add this to layout.html:

`<h1>{{ pageTitle }}</h1>`

And extend the frontmatter in `index.html`:

```html
---
layout: layout.html
pageTitle: Home
---

<p>Welcome to my site.</p>
```

Let use front matter in our other documents.

In `about.md`:

```html
---
layout: layout.html
pageTitle: About Us
---

We are a group of commited users. [Home](/)
```

`about.md` now renders via the template.

And in `pictures.md`:

```html
---
layout: layout.html
pageTitle: Pictures
---

* pic one * pic two *
![image](http://pngimg.com/uploads/apple/apple_PNG12405.png) [Back](/)
```

### 1.3.7. Collections

[Collections](https://www.11ty.io/docs/collections/) can be used to group, sort and filter content.

In `about.md`:

```html
---
layout: layout.html
pageTitle: About Us
tags:
  - nav
navTitle: About
---

We are a group of commited users. [Home](/)
```

And in `pictures.md`:

```html
---
layout: layout.html
pageTitle: Pictures
tags:
  - nav
navTitle: Pictures
---

* pic one * pic two *
![image](http://pngimg.com/uploads/apple/apple_PNG12405.png) [Back](/)
```

We will use use the nav collection to create a nav.

In layout.html:

```html
<nav>
  <ul>
    {% for nav in collections.nav %}
    <li class="nav-item">
      <a href="{{ nav.url | url }}">{{ nav.data.navTitle }}</a>
    </li>
    {%- endfor -%}
  </ul>
</nav>
```

Note: `{% ... %}` is a liquid [tag](https://shopify.github.io/liquid/basics/introduction/). Templating tags create the logic and control flow for templates.

This looks identical to our hard coded nav. Let's add a home link.

In index.html:

```html
---
layout: layout.html
pageTitle: Home
tags:
  - nav
navTitle: Home
---

<p>Welcome to my site.</p>
```

Note: you can use HTML in a markdown file.

Add `contact.md` to the posts folder:

```html
---
layout: layout.html
pageTitle: Contact Us
tags:
  - nav
navTitle: Contact
---

<h2>Here's how:</h2>

<a href="/">Back</a>
```

Note: front matter tags can also be written `tags: nav` or `tags: [nav]` if you need multiples use the latter: `tags: [nav, other]`. Here's the tagging [documentation](https://www.11ty.io/docs/collections/#tag-syntax).

You can use HTML files alongside markdown.

Change the name of `contact.md` to `contact.html`:

```html
---
layout: layout.html
pageTitle: Contact Us
tags:
  - nav
navTitle: Contact
---

<h2>Here's how:</h2>

<ul>
  <li>917 865 5517</li>
</ul>

<a href="/">Back</a>
```

### 1.3.8. Pass Throughs

We will add some images to the pictures page. Copy the `img` folder from today's project into the new eleventy folder.

We'll create another collection:

```html
---
layout: layout.html
pageTitle: Pictures
tags:
  - nav
navTitle: Pictures
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

![Image of apples](img/apples.png) [Home](/)
```

Note that the img folder in our project doesn't copy to the rendered site - we only see the alt text.

### 1.3.9. Site Preferences

Add a `.eleventy.js` file to the top level of the project:

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img");
};
```

Restart the server and you'll find the img folder in `_site`.

Note: the image path needs to be altered from a relative path to a root directory (`/`) path:

`![Image of apples](/img/apples.png)`

We can use our collection to loop through the images collection with:

```html
{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." srcset="" />
{% endfor %}
```

In `pictures.md`:

```html
---
layout: layout.html
pageTitle: Apples
tags:
  - nav
navTitle: Pictures
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." />
{% endfor %} [Home](/)
```

Note: if we were to restart the build process at this point you would receive an error due to the fact that these folders do not exist.

Add a new `js` folder.

Add a css folder and, inside it, `styles.css` with:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #333;
  font-size: 100%;
  max-width: 980px;
  margin: 0 auto;
}

img {
  width: 100%;
}

a {
  text-decoration: none;
  color: #007eb6;
}

nav ul {
  padding: 0;
  list-style: none;
  display: flex;
}

nav ul a {
  padding: 0.5rem;
}

article {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
```

And a link to it in the `layout.html` template:

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
    <nav>
      <ul>
        {% for nav in collections.nav %}
        <li
          class="nav-item{% if nav.url == page.url %} nav-item-active{% endif %}"
        >
          <a href="{{ nav.url | url }}">{{ nav.data.navTitle }}</a>
        </li>
        {%- endfor -%}
      </ul>
    </nav>

    <div class="content">
      <h1>{{ pageTitle }}</h1>

      {{ content }}
    </div>
  </body>
</html>
```

Note the addition of the `{% if ... endif %}` tag in the navbar. This creates a static active class that we will leverage shortly.

**Restart the server and refresh the browser.** You should see the css in the \_site directory and its effect on the site..

### 1.3.10. The Posts Collection

We will add additional tags that can be used to reorganize content.

Instead of this however:

```html
---
layout: layout.html
pageTitle: Pictures
tags:
  - nav
  - posts
---
```

We can create `posts/posts.json`:

```js
{
	"layout": "layout.html",
	"tags": ["posts", "nav"]
}

```

Any document in the posts folder will inherit these properties so can can now remove the duplicate tags and layout metadata from all publications in the posts directory.

- `posts/about.md`:

```md
---
pageTitle: About Us
navTitle: About
---

We are a group of commited users.

[Home](/)
```

- `posts/contact.html`:

```html
---
pageTitle: Contact Us
navTitle: Contact
---

<h2>Here's how:</h2>

<ul>
  <li>917 865 5517</li>
</ul>

<a href="/">Home</a>
```

- and `posts/pictures.md`:

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
<img src="/img/{{ filename }}" alt="A nice picture of apples." srcset="">
{% endfor %}

[Home](/)
```

Now that we have assigned the `posts` tag to every file in the `posts` folder, let's use that collection in `index.html` to display all the posts:

```html
---
layout: layout.html
pageTitle: Home
tags:
  - nav
navTitle: Home
---

<p>Welcome to my site.</p>

{% for post in collections.posts %}
<h2><a href="{{ post.url }}">{{ post.data.pageTitle }}</a></h2>
<em>{{ post.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

Note: the `|` character in `post.date | date: "%Y-%m-%d"` is a filter. There are quite a number of [available filters](https://help.shopify.com/en/themes/liquid/filters) for example: `upcase`:

```html
{% for post in collections.posts %}
<h2><a href="{{ post.url }}">{{ post.data.pageTitle | upcase }}</a></h2>
<em>{{ post.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

Note: to make sure it shows up first in the nav add `date: 2010-01-01` to the front matter in `index.html`.

==========================================================================================================

## 1.4. Ajax

Ajax allows you to get data from your own or another's web service. Web services expose specific data and services in the form of an API which allows you to get, delete, update or create data via [routes](http://jsonplaceholder.typicode.com/). Today, we are solely focused on getting data.

The original [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) browser API is in widespread use. You should make yourself familiar with it, however we will be using a newer (and simpler) API called fetch.

Examine `posts/ajax.html` in VS Code:

```html
---
pageClass: ajax
pageTitle: New York Today
navTitle: Ajax
---

<h2>Ajax</h2>

<button>Click</button>

<div></div>
```

Don't worry about the `---` material at the top. It is not part of the HTML and can be ignored (we'll get to it later).

View the page in chrome.

### 1.4.1. Fetch

The `fetch()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) takes one mandatory argument, the path to the resource you want to fetch. It returns something known as a Promise that, in turn, resolves to the response after the content is received.

_API_ stands for [Application Programming Interface](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82).

### 1.4.2. Rest API

We need data we can fetch from the internet. We'll start with [Typicode](http://jsonplaceholder.typicode.com/), a site set up just to play with. Note that you can do more than just get data, you can also post, create, delete and update data. Together these functions are often refered to a `CRUD`.

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

In `scripts.js`:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers() {
  console.log(event.target);
}
```

Use [matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) in the context of in `if` statement to run a function:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var getData = function () {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => console.log(json));
};
```

Instead of logging the data we will call yet another function:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var addContent = function (data) {
  console.log(data);
  document.querySelector(".content div").innerText = data[1].body;
};

var getData = function () {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => addContent(json));
};
```

Note:

- `document.querySelector('.content div')` - targets an empty div
- `data[1]` - we use `[1]` to get the second entry
- `data[1].body` - we use `.` notation to access just one of the properties of the entry

For comparison, here's the XMLHttpRequest version:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers() {
  console.log(event.target);
  if (event.target.matches("button")) {
    getData();
  }
}

var addContent = function (data) {
  console.log(data);
  document.querySelector(".content div").innerText = data[4].title;
};

var getData = function (data) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      addContent(JSON.parse(xhr.responseText));
    } else {
      console.log("The request failed!");
    }
  };
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
  xhr.send();
};
```

Note:

- `JSON.parse(xhr.responseText)` is similar to `response => response.json()` in the `fetch` version

### 1.4.3. Looping

Let's use the New York Times [developers](https://developer.nytimes.com/) site for our data.

```js
document.addEventListener("click", clickHandlers);

// store the link plus the API key in a variable
// https://api.nytimes.com/svc/topstories/v2/science.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0
var nyt =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var getData = function () {
  fetch(nyt)
    .then((response) => response.json())
    .then((json) => console.log(json));
};
```

Examine the nature of the returned data in the console. The `results` property contains the data we are interested in.

```js
document.addEventListener("click", clickHandlers);

var nyt =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa";

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var addContent = function (data) {
  // initialize an empty variable
  var looped = "";

  // use += in a for loop that uses the length of the results
  for (i = 0; i < data.results.length; i++) {
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `;
  }
  document.querySelector(".content").innerHTML = looped;
};

var getData = function () {
  fetch(nyt)
    .then((response) => response.json())
    .then((json) => addContent(json));
};
```

Note: I've declared the variable looped _before_ I started working with it.

Something like the below wouldn't work as it resets the value everytime the for loop runs.

```js
for (i = 0; i < data.results.length; i++) {
  var looped = "";
  looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `;
}
```

An alternative method (which is more advanced) might use the `map()` method on the array:

```js
document.addEventListener("click", clickHandlers);

var nyt =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa";

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var addContent = function (data) {
  var looped = data.results
    .map(
      (result) =>
        `
      <div class="item">
        <h3>${result.title}</h3>
        <p>${result.abstract}</p>
      </div>
    `
    )
    .join("");
  document.querySelector(".content").innerHTML = looped;
};

var getData = function () {
  fetch(nyt)
    .then((response) => response.json())
    .then((json) => addContent(json));
};
```

Add CSS to format the data:

```css
.ajax .content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
}

.ajax .item {
  border-bottom: 1px dashed #aaa;
}
```

Note: I've added a class `ajax` to the body tag of this page _only_.

Commit your changes and push to your github repo. A finished version of this file is available to you in the `spring2019-done` branch of this repo.

### 1.4.4. Adding Our Ajax

Add a new `ajax.html` file to the posts folder with:

```html
---
pageClass: ajax
pageTitle: New York Today
navTitle: Ajax
---

<h2>Ajax</h2>

<button>Click</button>
```

Note the new `pageClass` property. We will use this in our `layout.html` template.

Add the following to `js/scripts.js`:

```js
document.addEventListener("click", clickHandlers);

var nyt =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa";

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var addContent = function (data) {
  var looped = "";

  for (i = 0; i < data.results.length; i++) {
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `;
  }

  document.querySelector(".content div").innerHTML = looped;
};

var getData = function () {
  fetch(nyt)
    .then((response) => response.json())
    .then((json) => addContent(json));
};
```

And edit `layout.html` to include a link (`<script src="/js/scripts.js" ></script>`) to our JavaScript file _and_ to use `pageClass` (`<body class="{{ pageClass }}">`):

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
  <!-- new -->
  <body class="{{ pageClass }}">
    <nav>
      <ul>
        {% for nav in collections.nav %}
        <li
          class="nav-item{% if nav.url == page.url %} nav-item-active{% endif %}"
        >
          <a href="{{ nav.url | url }}">{{ nav.data.navTitle }}</a>
        </li>
        {%- endfor -%}
      </ul>
    </nav>

    <div class="content">
      <h1>{{ pageTitle }}</h1>

      {{ content }}
    </div>
    <!-- new -->
    <script src="/js/scripts.js"></script>
  </body>
</html>
```

Note:

- the ajax should work
- the body tag should now have the class defined in `ajax.html`

Add CSS to taste:

```css
.nav-item-active a {
  color: #fff;
  background-color: #007eb6;
  border-radius: 4px;
}

.ajax button {
  border: none;
  padding: 0.5rem 1rem;
  background: #007eb6;
  color: #fff;
  border-radius: 4px;
  font-size: 1rem;
}

.ajax .content > div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
}

.ajax .item {
  border-bottom: 1px dashed #aaa;
}
```

Note:

- we are using the className frontmatter property to scope this page and enable the css
- the use of the `>` selector
- the use of the `.nav-item-active a` selector
- the root relative paths for the CSS and JavaScript.

If we upload this to a web server our site will [break](http://oit2.scps.nyu.edu/~devereld/session7/_site/) due to the root links.

The error reads:

`Loading failed for the <script> with source “http://oit2.scps.nyu.edu/js/scripts.js”.`

There are a number of ways to deal with this including putting a `base` tag in the head of the document:

`<base href="https://www.oit2.scps.nyu.edu.com/session7/_site">`

We'll use [Netlify](https://www.netlify.com/) to put this on the web. Register and/or log in to [app.netlify.com](https://app.netlify.com) and drag and drop the `_site` folder onto the web browser window to upload the contents [live to the web](https://zealous-kilby-113356.netlify.com/).

We can also hook into a Github branch to set up [continuous delpoyment](https://app.netlify.com/start). Here is a [sample](https://agitated-bartik-814348.netlify.com/) with [admin](https://agitated-bartik-814348.netlify.com/admin).

For more experience with 11ty, download the official 11ty blog template or, if you feel like a challenge and something fancier, try Villalobos' new [template](https://github.com/planetoftheweb/seven) or [Skeleventy](https://skeleventy.netlify.com/), or any of the starter files on the [11ty](https://www.11ty.io/docs/starter/) starter page.

## 1.5. Notes

[JAM stack](https://jamstack.org/)
