# JQuery notes

## Add JQuery to a page

To incorporate JQuery in a web page, write:

```
<head>
<script src="jquery-3.4.1.min.js"></script>
</head>
```

## Selecting and Action

The syntax for performing an action on an element is

```
$(-element-).-action-()
```

### Selectors (like CSS)

#### Select specific html element

To select an html element, here for example all the <p> of the page, do:

```
$('p')
```

#### Select html element by id

To select an element by its id, here for example the element with id '001', do:

```
$('#001')
```

#### Select html class of elements

To select a class of html elements, or example here 'blocks', do:

```
$('.blocks')
```

### Table of selector combination

| $(this)                  | Selects the current HTML element                             |
| ------------------------ | ------------------------------------------------------------ |
| $("p.intro")             | Selects all <p> elements with class="intro"                  |
| $("p:first")             | Selects the first <p> element                                |
| $("ul li:first")         | Selects the first <li> element of the first <ul>             |
| $("ul li:first-child")   | Selects the first <li> element of every <ul>                 |
| $("[href]")              | Selects all elements with an href attribute                  |
| $("a[target='_blank']")  | Selects all <a> elements with a target attribute value equal to "_blank" |
| $("a[target!='_blank']") | Selects all <a> elements with a target attribute value NOT equal to "_blank" |
| $(":button")             | Selects all <button> elements and <input> elements of type="button" |
| $("tr:even")             | Selects all even <tr> elements                               |
| $("tr:odd")              | Selects all odd <tr> elements                                |

For a more complete tab, go to https://www.w3schools.com/jquery/jquery_ref_selectors.asp

## Events

events are attached to selected elements with a dot. Example:

```
$('document').ready(
	...
)
```

This is what lies at the start of every jquery file to wait for the document to load before adding functions to it.

## JQuery effects

### Hide & Show

Syntax:

```
$(sel).hide(*speed*, *callback*)
$(sel).show(*speed*, *callback*)
```

speed can be 'slow', 'fast' or a number in milliseconds.

The callback method is performed when the hiding is complete.

### Toggle

Syntax:

```
$(sel).toggle(*speed*, *callback*)
```

same parameters as before.

### Fade

Syntax:

```
$(sel).fadeIn(*speed*,*callback*);
$(sel).fadeOut(*speed*,*callback*);
$(sel).fadeToggle(*speed*,*callback*);
$(sel).fadeTo(*speed*,*opacity*,*callback*);
```

speed and callback are the same as before.

*FadeIn* makes the element appear while *fadeOut* disapear. *FadeToggle* calls fadeIn if the element is hidden and fadeOut if the element is shown. *FadeTo* also has an opacity (between 0 & 1) parameter, and thus doesn't hide completely the element.

### Slide

Syntax:

```
$('sel').slideDown(*speed*, *callback*)
$('sel').slideUp(*speed*, *callback*)
$('sel').slideToggle(*speed*, *callback*)
```

*SlideDown* shows the element by sliding it down while *slideUp* does the opposite. *SlideToggle* calls down if up and conversely.

### Animate

Syntax:

```
$('sel').animate({*params*}, *speed*, *callback*)
```

*params* are mandatory and specify which CSS property are animated. Speed & callback as before.

Note: elements can't be moved if are defined as static.

Example:

```
$("button").click(function(){
  $("div").animate({
    left: '250px',
    opacity: '0.5',
    height: '150px',
    width: '150px'
  });
}); 
```

This example will animate the element to its new opacity, color, height and width from its previous.

It also is possible to animate wrt the element current value:

```
$("button").click(function(){
  $("div").animate({
    left: '250px',
    height: '+=150px',
    width: '+=150px'
  });
}); 
```

This will add 150 to its current position.

It also is possible to set a value like hide/show or toggle to a css property in the animation parameters:

```
$("button").click(function(){
  $("div").animate({
    height: 'toggle'
  });
}); 
```

This code will perform a slide in the height of the element.

Animations are **queued**, meaning that if we perform two animations on an element, the second will be executed only when the first will be over.

```
$("button").click(function(){
  var div = $("div");
  div.animate({left: '100px'}, "slow");
  div.animate({fontSize: '3em'}, "slow");
}); 
```

Here, for example, the font will change only after the element is moved.

### Stop

Syntax:

```
$(sel).stop(*stopAll*, *goToEnd*);
```

This methods stops the animations before they are finished. *stopAll* specifies if the queue should be also cleared or not. *goToEnd* specifies if the animation should be terminated immediately or not.

## Chaining

Elements often have many jQuery commands applied to them. Thus, it is better to avoid to search for the element each time it is selected. To do that, simply chain the actions to the previous:

```
$("#p1").css("color", "red").slideUp(2000).slideDown(2000);
```

## Selecting content and attributes / DOM (Document Object Model) manipulation

The DOM defines a standard for accessing HTML and XML documents.

Three useful methods are:

- text(): sets or returns the text content

- html(): sets or returns the content

- val(): sets or returns the value of a field

- attr(): sets or returns the value of a given attribute, example:

  ```
  $('sel').attr('href', 'www.ericandre.com')
  ```

## Add

