<h1><img src="https://i.imgur.com/cXYo5bi.png"> Eva Icons</h1>

**Eva Icons** is a pack of more than 480 beautifully crafted Open Source icons for common actions and items. Additionally Eva Icons supports 4 animation types: `zoom`, `pulse`, `shake` and `flip`.  Download on desktop to use them in your digital products for Web, iOS and Android. Icons are provided in two visual types: `Fill` and `Outline` and in serveral formats, including `PNG`, `SVG`, `font`, `Sketch`, etc.

## Download
- [Complete Eva Icons Package](https://akveo.github.io/eva-icons/eva-icons.zip)
- [NPM Package](https://www.npmjs.com/package/eva-icons)
- you also can download icons one by one in `PNG` and `SVG` formats from [Eva Icons Website](https://akveo.github.io/eva-icons/).

### CDN

Load from CDN in your project:
```html
<script src="https://unpkg.com/eva-icons"></script>
```
After including the script, `eva` will be available as a global variable.

### NPM

- Install the package:
```
npm i eva-icons
``` 

- Include it to your page:
```html
<script src="path/to/dist/eva-icons.js"></script>
```

- Or require the package (may vary depending on your build system):

```js
const eva = require('eva-icons');
```

```js
import * as eva from 'eva-icons';
```

## How to use

### JavaScript

- Add the `data-eva` attribute with the icon name to an element:

```html
<i data-eva="github"></i>
```

- Call `eva.replace();` to replace all elements with the `data-eva` data attribute with SVG elements. You can also pass some additional parameters to the `replace` method to modify the `replace` function behavior. 

```html
<!DOCTYPE html>
<html lang="en">
  <title></title>
  <script src="https://unpkg.com/eva-icons"></script>
  <body>
  
    <i data-eva="github"></i>

    <script>
      eva.replace()
    </script>
  </body>
</html>
```
*Thanks to Feather Icons for the build process inspiration.*

### Fonts

Eva Icons are also available as a Web Font.

- Include the font css into your page:

```html
<link href="path/to/style/eva-icons.css">
```
- Add `eva` and `eva-icon` classes to an element:

```html
<i class="eva eva-github"></i>
```

We recommend using SVG icons due to better rendering and performance capabilities, [more details](https://css-tricks.com/icon-fonts-vs-svg/).

## Documentation

### `eva.replace({ ... })`

Replaces all elements that have a `data-eva` attribute with SVG markup corresponding to the element's `data-eva` attribute value.
## License
[MIT](LICENSE.txt) license.

## More from Akveo

- [Nebular](https://github.com/akveo/nebular) - Angular Component, Auth and Security
- [ngx-admin](https://github.com/akveo/ngx-admin) - the best Angular admin template

## How can I support the developers?
- Star our GitHub repo :star:
- Create pull requests, submit bugs, suggest new features or documentation updates :wrench:
- Follow us on [Twitter](https://twitter.com/akveo_inc) :feet:
- Like our page on [Facebook](https://www.facebook.com/akveo/) :thumbsup:

## From Developers
Made with :heart: by [Akveo team](http://akveo.com?utm_source=github&utm_medium=nebular_readme). Follow us on [Twitter](https://twitter.com/akveo_inc) to get the latest news first!
We're always happy to receive your feedback!
