//exports.onNavigatingTo = onNavigatingTo;
var ocr = require("nativescript-ocr");
var camera = require("camera");
var dialogs = require("ui/dialogs");
var Observable = require("data/observable").Observable;
//var img = require()

var page;
var pageData = new Observable();

exports.loaded = function(args){
  page = args.object;

  page.bindingContext = pageData;
}

exports.analyse = function(){
  camera.takePicture().then(result => {
    //extracting the text from the image
    pageData.set("isLoading", true);
    ocr.retrieveText({
      image : result
    }).then(function(res){
      //done with extracting text from image
      pageData.set("isLoading", false);
      dialogs.alert({
        title: "Scan OK",
        message: res.text,
        OkButtonText: "Sweet"
      });
    },
    function(error){
      dialogs.alert({
        title: "Scan failed",
        message: error,
        OkButtonText: "Mmmmh"
      });
    });
  });
};
