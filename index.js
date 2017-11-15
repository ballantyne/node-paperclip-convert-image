const Jimp           = require('jimp');
const klass          = require('klass');

module.exports       = klass(function(paperclip) {
  this.paperclip     = paperclip;
}).methods({

  perform: function(options, next) {
    var self = this;
    var mime;
    
    if (options.extension == 'png') {
      mime = Jimp.MIME_PNG;
    }

    if (options.extension == 'jpg') {
      mime = Jimp.MIME_JPG;
    }

    if (options.extension == 'bmp') {
      mime = Jimp.MIME_BMP;
    }   

 
    if (options != undefined && 
       (['jpg', 'png', 'bmp'].indexOf(options.extension) > -1) && 
        mime != self.paperclip.file().file.content_type) {

      Jimp.read(self.buffer, function (err, image) {
	image.getBuffer(mime, function(err, buffer) {
	  next(err, buffer);
	});
      }); 

    } else {
      next(null, self.buffer);
    }
  }
})
