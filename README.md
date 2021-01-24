# pretty-tag

## example

```js
import { tag } from 'pretty-tag';
// first
const str1 = tag`
    <div>
        <span></span>
    </div>
    `;
// equal
const str2 = `<div>
    <span></span>
</div>`;
// equal
const str3 = `<div>\n\t<span></span>\n</div>`;

// the first is more pretty
```

## Usage

`tag` is a tag function. By default it will remove leading and trailing Spaces, and align the left.

- remove leading Spaces
- remove trailing Spaces
- align left
- nested

### remove leading Spaces

```js
import { tag } from 'pretty-tag';
const str = tag`
    <div></div>`;
console.log(tag);
// '<div></div>'
```

### remove trailing Spaces

```js
import { tag } from 'pretty-tag';
const str = tag`<div></div>
    `;
console.log(tag);
// '<div></div>'
```

### align left

```js
import { tag } from 'pretty-tag';
const str = tag`
      <div>
        <div></div>
      </div>
    `;
console.log(tag);
```

=>

```html
<div>
  <div></div>
</div>
```

### nested

```js
const innerCode = tag`
    <div>
        <span>abc</span>
    </div>
    `;
const code = tag`
    <div>
        ${innerCode}
    </div>
    `;
// equal
const code2 = tag`
    <div>
        <div>
            <span>abc</span>
        </div>
    </div>
    `;
```

## The problem

Template string is convenience, but sometimes the code is ugly with multi-line due to tab or space.  
For example, if you are writing code to generate code.

```js
function a() {
  let code = `let a={
    foo:'b'
}`;
}
```

Thanks to the tag function, we could implement a better version. In the tag function, we could remove the same extra spaces at the beginning of every line according to the whitespace brefore the first non-blank line.

```

function a(){
    let code=tag`
    let a={
        foo:'b'
    }`
}
```

## Another Issues

It will remove whitespace every line the same as the first non-blank line. But some people may use 4-space indentation.
the editor will automatically add space when press enter key. If we press tab key at the same time, the whitespace may combine space and tab, and will result in inconsistent results.

**To avoid the problem, you should switch to [hard tabs](https://github.com/romefrontend/rome/issues/425)----always use tab indentation.**

```js
function a() {
  let code = tag`
\tlet a={
\40\40foo:'b'
\t}`;
}
```

=>

```js
function a() {
  let code = tag`
let a={
\40\40foo:'b'
}`;
}
```

## Customize

The default config is

```js
const defaultConfig = {
  trimStart: true,
  align: true,
  trimEnd: true,
};
```

### change default config

```js
import { tag, setDefaultConfig } from 'pretty-tag';
const newConfig = {
  trimStart: true,
  align: false,
  trimEnd: false,
};
setDefaultConfig(config);

const str = tag`
<div></div>`;
// => '<div></div>'
```

### Use different tags

```js
import { Tag } from 'pretty-tag';
const tag2 = new Tag({
  trimStart: true,
  align: false,
  trimEnd: false,
});
const str = tag2`
<div></div>`;
// => '<div></div>'
```
