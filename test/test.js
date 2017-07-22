//Import dependencies
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var gzipy = require('../index.js');

//Test
describe('Testing gzipy library', function()
{
  it('should compress and decompress a file', function(done)
  {
    var file_original = path.join(__dirname, 'file-original.txt');
    var file_compressed = path.join(__dirname, 'file-compressed.txt.gz');
    var file_decompressed = path.join(__dirname, 'file-decompressed.txt');
    fs.writeFileSync(file_original, 'This is the content\nof the original file', 'utf8');
    gzipy.compress(file_original, file_compressed, function(error)
    {
      assert.equal(null, error);
      assert.equal(true, fs.existsSync(file_compressed));
      gzipy.decompress(file_compressed, file_decompressed, function(error)
      {
        assert.equal(null, error);
        assert.equal(true, fs.existsSync(file_decompressed));
        assert.equal(fs.readFileSync(file_original, 'utf8'), fs.readFileSync(file_decompressed, 'utf8'));
        done();
      });
    });
  });
});