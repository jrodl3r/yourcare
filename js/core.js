// ==========================================================================
// YourCare Core Module
// ==========================================================================

var YC = {

  init : function () {
    this.Nav.init();
  },

  // Navigation Module
  Nav : {

    sub_nav             :   $('header .submenu'),
    home_link           :   $('header a.home'),
    main_nav_links      :   $('header nav.main ul a'),
    status_nav_links    :   $('header .statusbar ul a'),
    sub_nav_links       :   $('header .submenu ul a'),

    // Initialize Navigation
    init : function () {
      this.setupHomeLinks();
      this.setupStatusMenuLinks();
      this.setupMainMenuLinks();
      this.setupSubNavLinks();
    },

    // Setup Home-Link Click/Tap
    setupHomeLinks : function () {
      this.home_link.bind( 'click', function ( e ) {
        e.preventDefault();
        YC.Nav.clearActiveLinks( YC.Nav.status_nav_links );
        YC.Nav.clearActiveLinks( YC.Nav.main_nav_links );
      });
    },

    // Setup Status Menu Clicks/Taps
    setupStatusMenuLinks : function () {
      this.status_nav_links.each( function () {
        $(this).bind( 'click', function ( e ) {
          e.preventDefault();
          YC.Nav.clearActiveLinks( YC.Nav.main_nav_links );
          YC.Nav.clearActiveLinks( YC.Nav.status_nav_links );
          $(this).addClass( 'active' );
        });
      });
    },

    // Setup Main Menu Clicks/Taps
    setupMainMenuLinks : function () {
      this.main_nav_links.each( function () {
        $(this).bind( 'click', function ( e ) {
          e.preventDefault();
          YC.Nav.clearActiveLinks( YC.Nav.main_nav_links );
          YC.Nav.clearActiveLinks( YC.Nav.status_nav_links );

          $(this).parent().animate({
            'background-position-y': '34px'
          });
          YC.Nav.sub_nav.animate({
            height: 'toggle',
            opacity: 'toggle'
          });
          $(this).addClass( 'active' );
        });
      });
    },

    // Setup Sub-Nav Menu Clicks/Taps
    setupSubNavLinks : function () {
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
    },

    // Clear Active Links ON [link_set]
    clearActiveLinks : function (link_set) {
      // Status Nav Links
      if ( link_set === this.status_nav_links ) {
        link_set.each( function () {
          $(this).removeClass( 'active' );
        });
      // Main Menu Links
      } else if ( link_set === this.main_nav_links ) {
        link_set.each( function () {
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
      } else {
        console.error('YC.Nav.clearActiveLinks() : Fall-Through Error (Failed)');
      }
    }
  }
};


$(document).ready( function() {
  YC.init();
});
