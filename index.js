//Import dependencies
var fs = require('fs');
var zlib = require('zlib');

//Process the file
var process_file = function(input, output, stream, cb)
{
  //Check the input file
  if(typeof input !== 'string'){ return cb(new Error('No input file string provided')); }

  //Check the output file
  if(typeof output !== 'string'){ return cb(new Error('No output file string provided')); }

  //Create the read stream
  var reader = fs.createReadStream(input);

  //Create the write stream
  var writer = fs.createWriteStream(output);

  //Completed boolean
  var completed = false;

  //Done method
  var done = function(error)
  {
    //Check the error
    if(typeof error === 'undefined'){ error = null; }

    //Check if process is completed
    if(completed === false)
    {
      //Set completed as true
      completed = true;

      //Destroy the streams
      reader.destroy();
      writer.destroy();

      //Do the callback
      return cb(error);
    }
  };

  //Compress or decompress the input file and save to the output file
  reader.pipe(stream).pipe(writer);

  //Reader process error
  reader.on('error', done);

  //Stream process error
  stream.on('error', done);

  //Handle the error
  writer.on('error', done);

  //Finish event
  writer.on('finish', done);
};

//Compress a file
module.exports.compress = function(input, output, cb)
{
  //Check the callback method
  if(typeof cb !== 'function'){ throw new Error('No callback method provided'); }

  //Process the file
  return process_file(input, output, zlib.createGzip(), cb);
};

//Decompress a file
module.exports.decompress = function(input, output, cb)
{
  //Check the callback method
  if(typeof cb !== 'function'){ throw new Error('No callback method provided'); }

  //Decompress the input file
  return process_file(input, output, zlib.createGunzip(), cb);
};
