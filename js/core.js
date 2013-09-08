// ==========================================================================
// YourCare Core Module
// ==========================================================================

var YC = {

  init : function () {
    this.Nav.init();
  },

  // Navigation Module
  Nav : {

    home_link         : $('header a.home'),
    main_nav_links    : $('header nav.main ul a'),
    status_nav_links  : $('header .statusbar ul a'),
    sub_nav           : $('header .submenu'),
    sub_nav_links     : $('header .submenu ul a'),


    // Initialize Navigation
    init : function () {

      // Setup 'home_link' click-event
      this.home_link.bind( 'click', function ( e ) {
        e.preventDefault();

        YC.Nav.status_nav_links.each( function () {
          $(this).removeClass( 'active' );
        });

        YC.Nav.main_nav_links.each( function () {

          if( $(this).hasClass( 'active' ) ) {
            $(this).removeClass( 'active' );

            $(this).parent().animate({
              'background-position-y': '43px'
            });

            YC.Nav.sub_nav.animate({
              height: 'toggle',
              opacity: 'toggle'
            });
          }
        });
      });

      // Setup 'status_nav_links' click-events
      this.status_nav_links.each( function () {

        $(this).bind( 'click', function ( e ) {
          e.preventDefault();

          YC.Nav.main_nav_links.each( function () {

            if( $(this).hasClass( 'active' ) ) {
              $(this).removeClass( 'active' );

              $(this).parent().animate({
                'background-position-y': '43px'
              });

              YC.Nav.sub_nav.animate({
                height: 'toggle',
                opacity: 'toggle'
              });
            }
          });

          YC.Nav.status_nav_links.each( function () {

            $(this).removeClass( 'active' );

            YC.Nav.main_nav_links.each( function () {
              $(this).removeClass( 'active' );
            });
          });

          $(this).addClass( 'active' );
        });
      });

      // Setup 'main_nav_links' click-events
      this.main_nav_links.each( function () {

        $(this).bind( 'click', function ( e ) {
          e.preventDefault();

          YC.Nav.main_nav_links.each( function () {

            if( $(this).hasClass( 'active' ) ) {
              $(this).removeClass( 'active' );

              $(this).parent().animate({
                'background-position-y': '43px'
              });

              YC.Nav.sub_nav.animate({
                height: 'toggle',
                opacity: 'toggle'
              });
            }
          });

          $(this).parent().animate({
            'background-position-y': '34px'
          });

          YC.Nav.main_nav_links.each( function () {

            $(this).removeClass( 'active' );

            YC.Nav.status_nav_links.each( function () {
              $(this).removeClass( 'active' );
            });
          });

          YC.Nav.sub_nav.animate({
            height: 'toggle',
            opacity: 'toggle'
          });

          $(this).addClass( 'active' );
        });
      });

      // Setup 'sub_nav_links' click-events
      this.sub_nav_links.each( function () {

        $(this).bind( 'click', function ( e ) {
          e.preventDefault();

          YC.Nav.sub_nav_links.each( function () {

            if( $(this).hasClass( 'active' ) ) {
              $(this).removeClass( 'active' );
            }
          });

          $(this).addClass( 'active' );
        });
      });
    }
  }
};

$(document).ready( function() {
  YC.init();
});
