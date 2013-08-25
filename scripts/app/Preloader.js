define(["jquery","popcorn-complete.min","tween.min","jcanvas.min"], function($) {

  function Preloader() {

			function init() {
        var left = (window.innerWidth / 2) - 250;
        var top = (window.innerHeight/ 2) - 250;

        $("#waveform").css({"margin-left":left+"px", "margin-top":top+"px"});

         $("#waveform").fadeIn();


        $("#loading").height(window.innerHeight);
				var output = document.createElement( 'div' );
        output.style.cssText = 'display:block; width:0px; position: absolute; left: 0px; top: 0px; opacity: 0.05; background-color:#0F0;height:25px;z-index:3';
				document.body.appendChild( output );

				var barTween = new TWEEN.Tween( { x: 0, y: 0 } )
					.to( { x: window.innerWidth }, 84000 )
					.easing( TWEEN.Easing.Linear.None )
					.onUpdate( function () {

						output.style.width = this.x + 'px';
					} )
					.start();

        var wfTween = new TWEEN.Tween( { x: 0 } )
        .to({x: 1800}, 84500 )
        .easing( TWEEN.Easing.Linear.None )
        .onUpdate(function() {
          $("#waveform").drawEllipse({
  fillStyle: "#000",
  x: 140, y: 70,
  width: 155, height: 155
});
         for(i=0; i < 18; i++) {
        $("#waveform").drawImage({
          source: "images/loading.png",
          x: 140, y: 70,
          width:1,
  sWidth: 1,
          scale: 2,
  sx: this.x, sy: 0,
          cropFromCenter:false,
          rotate: i*10
      });

         }

        })
        .start();

			}

			function animate() {

				requestAnimationFrame( animate );
				TWEEN.update();

			}

    var q = document.createElement('canvas');
    q.setAttribute('id', 'matrix');
    $('#loading').html(q);
    var ctx = q.getContext('2d');
    q.width = window.innerWidth;
    q.height = window.innerHeight;

    var p = [];
    function doMatrix() {
      ctx.fillStyle='rgba(0,0,0,.05)';
      ctx.fillRect(0,0,q.width,q.height);
      ctx.fillStyle='#0F0';
      p.map(function(v,i) {
        ctx.fillText(String.fromCharCode(3e4+Math.random()*33),i*10,v);
        var rand = Math.random();
        p[i] = (v > 758 + rand * 1e4) ? 0 : v + 10;
        if(v > 758 + rand * 1e4) {
          $('#matrix').show();
        }
      });

    }

    for(i=0; i<256; i++) {
      p[i]=1;
    }

    window.setInterval(doMatrix,33);


    var o = document.createElement('canvas');
    o.setAttribute('id', 'overlay');
    $('#loading').append(o);

    var seconds = 84;

    var pop = Popcorn("#audio")
    .play()

    .code({
      start: 0,
      end: 84,
      onStart: function( options ) {
        init();
        animate();

        setInterval(function(){
          var octx = o.getContext('2d');
          o.width = window.innerWidth;
          o.height = window.innerHeight;
          // Choose font

          var fontsize = o.width/20;
          octx.font = fontsize+'px "PressStart2P" cursive';
          // Draw black rectangle
          octx.fillStyle = 'rgba(0,0,0,.95)';

          octx.textBaseline = 'top';
          octx.fillRect(0,0,o.width,o.height);

          // Punch out the text!
          octx.fillStyle = 'black';
          octx.globalCompositeOperation = 'destination-out';
          if (seconds >= 70) {
            var textString = "Starting in 1:" + (seconds - 60);
          } else if ( seconds >= 60 ) {
            var textString = "Starting in 1:0" + (seconds - 60);
          } else if (seconds >= 10) {
            var textString = "Starting in  :" + seconds;
          } else {
            var textString = "Starting in  :0" + seconds;
          }


          var textWidth = octx.measureText(textString ).width;

          octx.fillText(textString , (o.width/2) - (textWidth / 2), 100);
          seconds--;

        }, 1000);
      },
      onEnd: function( options ) {
        $('#loading').fadeOut();
      }
    })
    .code({ start: 3,
           end: 5,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">I used to, I used to sing that song I taught ya.</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 5,
           end: 7,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">You remember, Tommy?</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 7,
           end: 9,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">Why, back in the club...</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 9,
           end: 11,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">Why, you kids used to laugh at that song.</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 11,
           end: 17,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">Lazy Joanne, slipped on the ice and broke her——</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 24,
           end: 26,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">I\'m takin\' over this territory.</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 27,
           end: 29,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">From now on, it\'s mine.</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 29,
           end: 32,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">You better quit this racket.</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 33,
           end: 36,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">You can dish it out, but you got so that you can\'t take it no more.</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 42,
           end: 45,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">Hi, my name is Ivona.</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 45,
           end: 48,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">I wanted to show you one of the many of the selectable</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 48,
           end: 51,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">loading screens for a realtime communications application</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 51,
           end: 55,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">created by <a href="http://micahdbolen.wordpress.com/" target="_blank">Micah Delane Bolen</a>.</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
           }
          })
    .code({ start: 55,
           end: 84,
           html: $('<h1 style="margin-top:'+$('#loading').height()*.75+'px">Thank you for taking a look.</h1>'),
           onStart: function( options ) {

             $('#loading').append(options.html);
           },
           onEnd: function(options) {

             options.html.fadeOut();
              var html = '<div id="no-chrome"><h1>End of demo. Contact <a href="http://micahdbolen.wordpress.com/">Micah</a> for more info.</h1></div>';

      $('body').html(html);
           }
          });

  }
  return Preloader;
}

      );