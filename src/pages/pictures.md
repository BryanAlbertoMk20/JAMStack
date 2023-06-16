---
pageTitle: Apples
navTitle: Pictures
singleImage: /img/apples.png
pageClass: pictures
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

## Markdown, single image:

![alt info goes here]( {{ singleImage }} )

## HTML, single image:

<img src="{{ singleImage }}" alt="info goes here" style="transform: scale(50%) rotate(20deg);" />

## Markdown in Liquid for loop:

{% for filename in images %}
![alt info goes here](/img/{{ filename }})
{% endfor %}

## HTML in Liquid for loop:

{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." />
{% endfor %}

[Home](/)
