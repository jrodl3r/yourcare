// ==========================================================================
// YourCare Core Module
// ==========================================================================

var YC = {

  init : function () {
    this.Nav.init();
  },

  // Navigation Module
  Nav : {

    home_link   : $('header a.home'),
    main_nav    : $('header nav.main a'),
    sub_nav     : $('header nav.submenu a'),
    status_nav  : $('header .statusbar ul a'),

    // Initialize Navigation
    init : function () {

      // Setup 'home_link' click-event
      this.home_link.bind( 'click', function ( e ) {
        e.preventDefault();
        YC.Nav.main_nav.each( function () {
          $(this).removeClass( 'active' );
        });
        YC.Nav.status_nav.each( function () {
          $(this).removeClass( 'active' );
        });
      });

      // Setup 'main_nav' click-events
      this.main_nav.each( function () {
        $(this).bind( 'click', function ( e ) {
          e.preventDefault();
          YC.Nav.main_nav.each( function () {
            $(this).removeClass( 'active' );
            YC.Nav.status_nav.each( function () {
              $(this).removeClass( 'active' );
            });
          });
          //$(this).fadeTo( 'fast', 0.4 ).addClass( 'active' ).fadeTo( 'fast', 0.9 );
          $(this).addClass( 'active' );
        });
      });

      // Setup 'status_nav' click-events
      this.status_nav.each( function () {
        $(this).bind( 'click', function ( e ) {
          e.preventDefault();
          YC.Nav.status_nav.each( function () {
            $(this).removeClass( 'active' );
            YC.Nav.main_nav.each( function () {
              $(this).removeClass( 'active' );
            });
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
