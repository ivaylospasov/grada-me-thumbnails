"use strict"

var thumbnailer = require('../index')

var imgName = process.argv[2];
var sourcePath = "source";
var destPath = "dest";

thumbnailer.processImage(sourcePath, destPath, imgName);
