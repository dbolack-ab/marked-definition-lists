# marked-nonbreaking-spaces

Insert any number of `&nbsp;` non-breaking spaces into the document.

The basic token is `:>`. Additional spaces may be added by adding additional greater-than (`>`) to the sequence. `:>>>` would result in `&nbsp;&nbsp;&nbsp;`. This token may be used inside a block.

# Usage
<!-- Show most examples of how to use this extension -->

```js
const marked = require("marked");
const markedNonbreakingSpaces = require("marked-nonbreaking-spaces");

marked.use({ extensions: [markedNonbreakingSpaces] });

const html = marked.parse(":> This is a single space.\nThis adds :>>>> four!");
console.log(html);
// <p>&nbsp; This is a single space.\nThis adds &nbsp;&nbsp;&nbsp;&nbsp; four!</p>
```
