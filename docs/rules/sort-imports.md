# Sorts ES6 imports (sort-imports)

With ES6, import declarations take a different format. Some developers like having their import declartions as tidy as possible.

## Rule Details

This rule aims to sort import dependencies as of ES6 specification.

The following patterns are considered warnings:

```js
Ex1
import a from 'foo';
import * as B from 'bar';
import { c, b } from 'biz';

Ex2
import A from 'foo';
import * as b from 'bar';
import { c, B } from 'biz';
```

The following patterns are not warnings:

```js
Ex1
import * as B from 'bar';
import a from 'foo';
import { b, c } from 'biz'; *

Ex2
import A from 'foo';
import * as b from 'bar';
import { c, B } from 'biz'; *
```

***NOTE**: The rule also checks for inline named import sorting

### Options

```js
...
"sort-imports": [<enabled>, { "order":  ["namespace", "named", "default"] }]
...
```

### `order`

This rule may also check the order by each subgroup, for that it takes an input array called `order` which **must** contain the 3 types of imports ordered in the desired fashion. By using for example `["namespace", "named", "default"]`, would enforce the following code to generate a warning:

```js
import a from 'foo'; // default import
import * as b from 'bar'; // namespace import
import { c } from 'qux'; // named import
import { d } from 'biz'; // named import
```

This code would not generate a warning:

```js
import * as c from 'bar'; // namespace import
import { b } from 'biz'; // named import
import { d } from 'qux'; // named import
import a from 'foo'; // default import
```

## When Not To Use It

This rule is purely stylistic and for developers who care about sorting their imports.
