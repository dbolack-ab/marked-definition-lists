# marked-definition-lists

This module provides two styles of definition lists for use with marked.js

## Inline Lists

Inline lists build each term and definition as a single line. A term is not required. Multiple lines will be placed in the same dictionary list ( `<dl>`).

```
My term :: My First Definition
```

## PANdoc style lists

PANdoc style lists place the Term on the first line, follows by a series of definitions, preceded by `::` until a blank line is reached. Text not preceeded by `::` but before a blank line will be concatenated with the previous definition entry. Multiple Term and definistion set combinations will be placed in the same

### Single Term, Single Definition

1Term 1
::1Definition 1


### Single Term, Plural Definitions
2Term 1
::2Definition 1
::2Definition 2


### Multiple Term, Single Definitions
3Term 1
::4Definition 1

3Term 2
::3Definition 1


### Multiple Term, Plural Definitions

4Term 1
::41Definition 1
::41Definition 2

4Term 2
::42Definition 1
::42Definition 2


### Single Term, Single multiple line definition

5Term 1
::5Definition 1
and more and
more and more

# Usage
<!-- Show most examples of how to use this extension -->

```js
const marked = require("marked");
const markedDefinitionLists = require("marked-definition-lists");

marked.use({ extensions: [markedDefinitionLists] });

const html = marked.parse("My term :: My First Definition");
console.log(html);
// <dl><dt>My term</dt><dd>My First Definition</dd></dl>
```
