var path = require('path')
// Инсталира се graphicsmagick и модулът gm
var gm = require('gm');

var inputImg = {
  imgPath: 'images',
  rawImgPath: 'raw',
  imgName: process.argv[2],
  bufferImgWidth: 1024
}

var inputImgPath = path.join(inputImg.imgPath, inputImg.rawImgPath, inputImg.imgName)

var thumbs = [
  { w: 800, h: 800, path: path.join(inputImg.imgPath, '/fullsize', inputImg.imgName) },
  { w: 400, h: 400, path: path.join(inputImg.imgPath, '/normal', inputImg.imgName) },
  { w: 128, h: 128, path: path.join(inputImg.imgPath, '/small', inputImg.imgName) },
  //Следващите размери ще са за квадратни thumbnail-и
  { w: 75,  h: 75,  path: path.join(inputImg.imgPath, '/xsmall', inputImg.imgName) }
]

gm(inputImgPath).format(function(err, value){
  if (value == 'JPEG') {
    gm(inputImgPath)
    .resize(inputImg.bufferImgWidth)
    .stream(function (err, stdout, stderr) {
    // before Resize the width is 1024px 
      for (var i = 0; i < 3; i++) {
      gm(stdout) // gm can read buffers ;)
      .resize(thumbs[i].w)
      .write(thumbs[i].path, function (err, size) {
        if (err) console.log('Error - ', error);
        console.log('Created an image!');
      });
    };
      for (var i = 3; i < thumbs.length; i++) {
      gm(stdout) // gm can read buffers
      .resize(thumbs[2].w, thumbs[2].h + ">")
      .gravity('Center')
      .extent(thumbs[3].w, thumbs[3].h)
      .write(thumbs[i].path, function (err, size) {
        if (err) console.log('Error - ', error);
        console.log('Created an image!');
      });
      };
    });
  } else {
    console.log('Image is not JPEG');
  }
});