requirejs.config({
  //By default load any module IDs from js/lib
  baseUrl: 'scripts/libs',
  //except, if the module ID starts with "app",
  //load it from the scripts/app directory. paths
  //config is relative to the baseUrl, and
  //never includes a ".js" extension since
  //the paths config could be for a directory.
  paths: {
    app: '../app',
    jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
  },
  "shim": {
        "jquery.fittext": ["jquery"]

    }
});

// Start the main app logic.
define(["jquery","app/Preloader","jquery.fittext"], function($,Preloader) {

  $(function() {

    $('h1').fitText();

    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

    if(is_chrome) {

      var preloader = new Preloader();

    } else {

      var html = '<div id="no-chrome"><h1><a href="http://chrome.google.com/" target="_blank">Chrome</a> is required to view this demo.</h1></div>';

      $('body').html(html);

    }


  });
});