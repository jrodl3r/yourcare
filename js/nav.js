/*global YC*/
// ==========================================================================
// YourCare Core Module
// ==========================================================================

YC.Debug = true;

// YC.Page = {
//   content_area          :   $('#content > .inner')
// };

YC.Nav = {

  sub_nav               :   $('header .submenu'),
  home_link             :   $('header a.home'),
  main_nav_links        :   $('header nav.main ul a'),
  status_nav_links      :   $('header .statusbar ul a'),
  status_search_link    :   $('header .statusbar ul a.search'),
  status_search_panel   :   $('header .statusbar ul li.status-search'),
  status_search_box     :   $('header .statusbar ul li.status-search .searchbox'),
  status_search_input   :   $('header .statusbar ul li.status-search .searchbox input'),
  sub_nav_links         :   $('header .submenu ul a'),

  status_search_flag    :   false,
  nav_timer_delay       :   600,

  // Load Navigation
  init : function () {
    // Primary Nav
    this.setupHomeLinks();
    this.setupStatusMenuLinks();
    this.setupMainMenuLinks();
    this.setupSubNavLinks();
    // Alt Nav
    this.setupStatusSearch();
  },


  /*  Primary Nav *****************************/
  /*  *****************************************/

  // Setup Home-Link Click/Tap
  setupHomeLinks : function () {
    this.home_link.bind( 'click', function () {
      YC.Nav.clearActiveLinks( YC.Nav.status_nav_links );
      YC.Nav.clearActiveLinks( YC.Nav.main_nav_links );
      YC.Nav.toggleStatusSearch('kill');
    });
  },

  // Setup Status Menu Clicks/Taps
  setupStatusMenuLinks : function () {
    this.status_nav_links.each( function () {
      $(this).bind( 'click', function (e) {
        e.preventDefault();
        YC.Nav.clearActiveLinks( YC.Nav.status_nav_links );
        if ( !$(this).hasClass( 'search' ) ) {
          YC.Nav.toggleStatusSearch('kill');
          $(this).addClass( 'active' );
        }
      });
    });
  },

  // Setup Main Menu Clicks/Taps
  setupMainMenuLinks : function () {
    this.main_nav_links.each( function () {
      $(this).bind( 'click', function () {
        YC.Nav.clearActiveLinks( YC.Nav.main_nav_links );
        YC.Nav.clearActiveLinks( YC.Nav.status_nav_links );
        YC.Nav.sub_nav.addClass( 'active' );
        $(this).addClass( 'active' );
      });
    });
  },

  // Setup Sub-Nav Menu Clicks/Taps
  setupSubNavLinks : function () {
    this.sub_nav_links.each( function () {
      $(this).bind( 'click', function (e) {
        e.preventDefault();
        YC.Nav.sub_nav_links.removeClass( 'active' );
        $(this).addClass( 'active' );
      });
    });
  },

  // Clear Active Links ON [link_set]
  clearActiveLinks : function (link_set) {
    // Status Nav Links
    if ( link_set === this.status_nav_links ) {
      link_set.removeClass( 'active' );
    // Main Menu Links
    } else if ( link_set === this.main_nav_links ) {
      link_set.removeClass( 'active' );
      YC.Nav.sub_nav.removeClass( 'active' );
    } else if ( YC.Debug ) {
      console.error('YC.Nav.clearActiveLinks() : Fall-Through Error (Failed)');
    }
  },


  /*  Alt Nav *********************************/
  /*  *****************************************/

  //
  setupStatusSearch : function () {
    this.status_search_link.bind( 'click', function (e) {
      e.preventDefault();
      YC.Nav.toggleStatusSearch();
    });
    this.status_search_input.on( 'focus blur', function () {
      YC.Nav.toggleAutofill( $(this) );
    });
  },

  //
  showStatusSearch : function () {
    this.status_nav_links.addClass( 'inactive' );
    this.status_search_panel.addClass( 'active' );
    setTimeout( function () {
      YC.Nav.status_search_box.fadeIn();
      YC.Nav.status_search_flag = true;
    }, this.nav_timer_delay );
  },

  //
  hideStatusSearch : function () {
    this.status_search_box.fadeOut();
    setTimeout( function () {
      YC.Nav.status_search_panel.removeClass( 'active' );
      YC.Nav.status_nav_links.removeClass( 'inactive' );
      YC.Nav.status_search_flag = false;
    }, this.nav_timer_delay );
  },

  //
  toggleStatusSearch : function ( kill ) {
    if ( kill && !this.status_search_flag ) {
      this.hideStatusSearch();
    } else if( !this.status_search_flag ) {
      this.showStatusSearch();
    } else {
      this.hideStatusSearch();
    }
  },

  //
  toggleAutofill : function ( input ) {
    if ( input.val() === '' ) {
      input.val( 'Search' );
    } else if ( input.val() === 'Search' ) {
      input.val('');
    }
  },
};
