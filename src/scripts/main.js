window.$ = require('@bower_components/jquery/dist/jquery');
var wowjs = require('@bower_components/wowjs/dist/wow');

$(function(){
  var wow = new wowjs.WOW();

  /**
   * media-query
   **/

  var footerHeight = $( '.footer' ).height();
  var windowResize = function () {
    if ( $( window ).width() > 768 ) {
      // If screen is medium
      $( '.chart__data' ).addClass( 'wow' ).addClass( 'slideInLeft' ).attr( 'data-wow-offset', 200 );
      $( '.chart__data-bar' ).removeClass( 'slideInLeft' );
      $( '.timeline__content' ).removeClass( 'fadeInRight' );
      $( '.timeline__block:odd .timeline__content' ).addClass( 'wow' ).addClass( 'fadeInRight' );
      $( '.timeline__block:even .timeline__content' ).addClass( 'wow' ).addClass( 'fadeInLeft' );

      $( '.footer .lead, .socials' ).show();
      $( '.footer' ).css('height', footerHeight + 'px');
    } else {
      // Screen is small
      $( '.chart__data' ).removeClass( 'slideInLeft' );
      $( '.chart__data-bar' ).addClass( 'wow' ).addClass( 'slideInLeft' );
      $( '.timeline__content' ).addClass( 'wow' ).addClass( 'fadeInRight' );
      if ( $(window).height()  < 500  ) {
        $( '.footer' ).css('height', '350px');
        $( '.footer .lead, .socials' ).hide();
      }
    }
  }

  windowResize();

  $(window).resize( windowResize );

  wow.init();

  $( 'body' ).removeClass( 'hidden' ).addClass( 'fadeIn' );

  /**
   * HEADER
   **/

  $( '.slider__item').hide();
  $( '.slider__item:first-child').show();

  $( '.header__icons' ).show();

  $( '.header__icon-link' ).click(function ( e ) {
    e.preventDefault();
  });

  $( '.header__icon-link' ).hover( function () {
    changeSelectedIconLink( this );
  } );

  $( '.header__icon-link' ).focus( function () {
    changeSelectedIconLink( this );
  } );

  var changeSelectedIconLink = function ( el ) {
    $( '.header__icon-link' ).removeClass( 'header__icon-link--activated' );
    $( el ).addClass( 'header__icon-link--activated' );

    $( '.slider__item').hide();
    $( '.slider__item').eq( el.dataset.n ).show();

    $( '.header' ).removeClass( 'header--dev header--graph header--photo' );
    $( '.header' ).addClass( 'header--' + el.dataset.name );
  };


  /**
   * Menu
   **/

   $( '#openMenu' ).click( function () {
     $( '.navigation' ).toggleClass( 'navigation--open' );
   } );

  var menu = $('.menu'),
  	menuTopPosition = menu.offset().top;

  $(window).on('scroll', function(){
  	if( $(window).scrollTop() > menuTopPosition ) {
  		menu.addClass('menu--sticked');
      $( '#main' ).css( 'padding-top', '3.75em' );
  	} else {
  		menu.removeClass('menu--sticked');
      $( '#main' ).css( 'padding-top', '0' );
  	}
  });

  $( '.navigation__link' ).click( function () {
    $( '.navigation' ).removeClass( 'navigation--open' );
    $( '#main' ).css( 'padding-top', '0' );
  } );

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        if ( target[0].id == 'section-contact' ) {
          $("html, body").animate({
            scrollTop: $(document).height()
          }, 750);
        } else {
          $('html,body').animate({
            scrollTop: target.offset().top - $('.menu').height() - 100
          }, 500);
        }
        return false;
      }
    }
  });

  /**
   * Get the shows informations
   */

  var getLastWatchedShow = function () {
    $.ajax({
      type: 'GET',
      url: 'https://api-v2launch.trakt.tv/users/quelu/history/episode?extended=images&limit=1',
      contentType: 'application/json',

      xhrFields: {
        withCredentials: false
      },

      headers: {
        'trakt-api-version': '2',
        'trakt-api-key': '9c8f8c27b883b02248364512148d981fffb7d8681eb8f30ce03a1087b0f20e24'
      },

      success: function( data ) {
        $( '#section-shows' ).removeClass( 'hidden' );
        var episode = data[0].episode;
        var show = data[0].show;

        $( '#show-title' ).text( show.title + ' : ' );
        $( '#episode-image' ).attr( 'src', episode.images.screenshot.full );
        $( '#episode-title' ).text( episode.title );
        $( '#episode-number' ).text( 'S' + twoDigitNumber( episode.season ) + 'E' + twoDigitNumber( episode.number ) );
      },

      error: function() {

      }
    });
  }

  function twoDigitNumber( n ){
    return n > 9 ? "" + n: "0" + n;
  }

  getLastWatchedShow();

});
