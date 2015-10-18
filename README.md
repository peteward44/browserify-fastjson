# browserify-fastjson
Browserify transform to inline JSON files in to the code.

Under normal operation, Browserify will embed the JSON as it would a regular js file. All the transforms are executed on it, and in the case of the more complicated transforms
(e.g. Babel) this can slow your build down considerably in the case of large JSON files - even though it's not necessary (it's only JSON!).

Browserify-fastjson will read in your require'd JSON files as text and inline it directly into your code, after all your other transforms have already executed **as long as it's the last one in the transform chain**!


**Example**  
```
var fastjson = require( 'browserify-fastjson' );

...

// Always make sure it's the last transform executed - else you won't get the full performance benefit
bundle.transform( anotherTransform );
bundle.transform( someOtherTransform );
bundle.transform( fastjson );
```


**Example**  
```
browserify -t someTransform -t browserify-fastjson main.js
```
