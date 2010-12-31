/*!
 * jQuery Display Message Plugin
 *
 * Copyright 2010, Andrey Voev
 * http://www.andreyvoev.com
 *
 * Date: Fri Dec 12 16:12 2010 -0800
 */

(function( $ ){

   $.fn.displayMessage = function(options) {

        // Default configuration properties.
         var defaults = {
                  message       : 'Error message',
                  background    : '#111111',
                  color         : '#FFFFFF',
                  speed         : 'fast',
                  skin          : 'plain',
                  position      : 'relative', // relative, absolute, fixed
                  autohide      : false
         }

        var options = $.extend( defaults, options );
        $(this).slideUp('fast');
        $(this).removeClass().empty();
        return this.each(function() {

          var sticky = (options.sticky == false) ? 'relative' : 'absolute';
          $(this).addClass('messagebar-skin-'+options.skin+'_bar').css('position',options.position).css('background-color',options.background);
          $(this).append('<div class="messagebar-skin-'+options.skin+'_inner"><span class="messagebar-skin-'+options.skin+'_text"></span><a href="#" id="close" class="messagebar-skin-'+options.skin+'_close"></a></div>').css('color',options.color);
          $(this).find('span').html(options.message);

          $(this).slideDown(options.speed ,function(){

             var parent = ($(this).attr('id')) ? "#"+$(this).attr('id') : "."+$(this).attr('class');
             var close_button = ($(this).find('a').attr('id')) ? "#"+$(this).find('a').attr('id') : "."+$(this).find('a').attr('class');

             if(options.autohide == true)
             {
                $(this).delay(2400).slideUp('slow');
             }

             $(parent+">div>"+close_button).bind("click", function (event) {
            	event.preventDefault();
                $(parent+">div>"+close_button).animate({"opacity": "hide"}, function(){
                    $(parent+">div>span").fadeOut("slow").html("");
                    $(parent+">div>"+close_button).parent().parent().slideUp(options.speed);
                });
             });

      });

   });

   };
})( jQuery );
