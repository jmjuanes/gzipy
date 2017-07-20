# gzipy

> A basic GZip compress and decompress library

[![npm](https://img.shields.io/npm/v/gzipy.svg?style=flat-square)](https://www.npmjs.com/package/gzipy)
[![npm](https://img.shields.io/npm/dt/gzipy.svg?style=flat-square)](https://www.npmjs.com/package/gzipy)

## Install

You can install the latest version of the package using **npm**:

```
$ npm install --save gzipy
```

## Usage 

```javascript
//Import gzipy 
var gzipy = require('gzipy');

//Compress a file 
gzipy.compress('./file.txt', './file.txt.gz', function(error)
{
  //Handle the error 
  if(error){ /* Something went wrong... */ } 
  
  console.log('File compressed!');
});

//Decompress a file
gzipy.decompress('./document.pdf.gz', './document.pdf', function(error)
{
  //Handle the error 
  if(error){ /* Something went wrong... */ } 
  
  console.log('File decompressed');
});
```

## License 

Under the [MIT LICENSE](./LICENSE).