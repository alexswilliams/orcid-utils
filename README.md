# ORCID Utils


![Node.js CI](https://github.com/alexswilliams/orcid-utils/workflows/Node.js%20CI/badge.svg)

Library to manipulate [ORCID](https://orcid.org/) identifiers.
Allows validation of identifiers based on their check-digit,
and to format a provided identifier into a number of potentially
useful formats. 

Designed to be used as either a `require`-able module, or as 
a standalone object that can be imported into a normal HTML page.

## Node Installation

`npm install orcid-utils --save`

## Example Node Usage

```javascript
const ORCID = require('orcid-utils');
const orcidNumber = '0000-0000-0000-0001';

if (ORCID.isValid(orcidNumber)) {

    console.log(ORCID.toDashFormat(orcidNumber));
    // 0000-0000-0000-0001
    
    console.log(ORCID.toNoDashFormat(orcidNumber));
    // 0000000000000001
    
    console.log(ORCID.toUriWithoutProtocol(orcidNumber));
    // orcid.org/0000-0000-0000-0001
    
    console.log(ORCID.toUriWithProtocol(orcidNumber));
    // https://orcid.org/0000-0000-0000-0001
    
    // toUriWithProtocol also takes a boolean parameter that
    // specifies whether the URI should use https or not.
    
    console.log(ORCID.toUriWithProtocol(orcidNumber, true));
    // https://orcid.org/0000-0000-0000-0001    
    console.log(ORCID.toUriWithProtocol(orcidNumber, false));
    // http://orcid.org/0000-0000-0000-0001

}
```

## Node Testing

Testing is performed using the `jest` package, and is aliased
to the `test` script.

`npm test`

## Example Browser Usage

```html
<html>
<head>
<script src="lib/orcid.min.js"></script>
</head>

<body>
<input type="text" id="orcidTextInput">
<input type="button" onClick="validateAndLog();">

    <script>
      var validateAndLog = function validateAndLog() {
        var orcidNumber = document.getElementById('orcidTextInput').value;

        if (ORCID.isValid(orcidNumber)) {
          console.log(ORCID.toDashFormat(orcidNumber));
          // 0000-0000-0000-0001
          
          // All the other examples from above work here too!
        } else {
          console.log('Not Valid');
        }

      };
    </script>

</body>
</html>
```

## How to Contribution

Please do report any issues you have with this to the project's
[GitHub Issue Tracker](https://github.com/alexswilliams/orcid-utils/issues).

If you wish to make any modifications or amendments, I'm happy to
review pull requests :).

