var path = require('path')
// Инсталира се graphicsmagick и модулът gm
var gm = require('gm');



var strategies = {
  fullsize: {
    w: 800,
    h: 800,
    path: '/fullsize'
  },
  normal : {
    w: 400,
    h: 400,
    path: '/normal'
  },
  small : {
    w: 128,
    h: 128,
    path: '/small'
  },
  //Следващите размери ще са за квадратни thumbnail-и
  xsmall : {
    w: 75,
    h: 75,
    path: '/xsmall'
  }
}


var processImage = function(sourcePath, destPath, imgName) {
    var bufferImgWidth = 1024;

    var sourceImgPath = path.join(sourcePath, imgName);
    
    gm(sourceImgPath).format(function(err, value){
      if (value == 'JPEG') {
        gm(sourceImgPath)
        .resize(bufferImgWidth)
        .stream(function (err, stdout, stderr) {
        // before Resize the width is 1024px
          for (key in strategies) {
            switch (key) {
              default:
                gm(stdout) // gm can read buffers ;)
                .resize(strategies[key].w)
                .write(path.join(destPath, strategies[key].path, imgName), function (err, size) {
                  if (err) 
                    console.log('Error - ', err);
                  else 
                    console.log('Created an image!');
                });
                break;
                case "xsmall":
                  gm(stdout) // gm can read buffers
                  .resize(strategies["small"].w, strategies["small"].h + ">")
                  .gravity('Center')
                  .extent(strategies[key].w, strategies[key].h)
                  .write(path.join(destPath, strategies[key].path, imgName), function (err, size) {
                    if (err)
                      console.log('Error - ', err);
                    else
                      console.log('Created an image!');
                  });
                  break;
                }
              };
            });
      } else {
        console.log('Image is not JPEG');
      }
    });
}

exports.processImage = processImage;
