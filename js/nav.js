/*global YC*/
// ==========================================================================
// YourCare Core Module
// ==========================================================================
YC.Debug = true; // TODO


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
    this.setupHomeButton();
    this.setupStatusMenu();
    this.setupMainNav();
    this.setupSubNav();
    // Alt Nav
    this.setupStatusSearch();
  },


  /*  Primary Nav *****************************/
  /*  *****************************************/

  // Setup Home-Link Click/Tap
  setupHomeButton : function () {
    this.home_link.bind('click', function () {
      YC.Nav.clearActiveLinks( YC.Nav.status_nav_links );
      YC.Nav.toggleStatusSearch('kill');
    });
  },

  // Setup Status-Bar-Links Clicks/Taps
  setupStatusMenu : function () {
    this.status_nav_links.each(function () {
      $(this).bind('click', function (e) {
        e.preventDefault();
        YC.Nav.clearActiveLinks( YC.Nav.status_nav_links );
        if ( !$(this).hasClass('search') ) {
          YC.Nav.toggleStatusSearch('kill');
          $(this).addClass('active');
        }
      });
    });
  },

  // Setup Main-Nav-Links Clicks/Taps
  setupMainNav : function () {
    this.main_nav_links.each(function () {
      $(this).bind('click', function () {
        YC.Nav.clearActiveLinks( YC.Nav.status_nav_links );
        YC.Nav.sub_nav.addClass('active');
      });
    });
  },

  // Setup Sub-Nav-Links Clicks/Taps
  setupSubNav : function () {
    this.sub_nav_links.each( function () {
      $(this).bind('click', function (e) {
        e.preventDefault();
        YC.Nav.sub_nav_links.removeClass( 'active' );
        $(this).addClass('active');
      });
    });
  },

  // Clear Active Menu-Links [link_set : status-menu || main-menu]
  clearActiveLinks : function (link_set) {
    // Status Nav Links
    if ( link_set === this.status_nav_links ) {
      link_set.removeClass('active');
    // Main Menu Links
    // TODO: Remove this + Add Debug-Logger
    } else if ( link_set === this.main_nav_links ) {
      link_set.removeClass('active');
      YC.Nav.sub_nav.removeClass('active');
    } else if ( YC.Debug ) {
      console.error('nav.js : YC.Nav.clearActiveLinks() - Fail');
    }
  },


  /*  Alt Nav *********************************/
  /*  *****************************************/

  // Setup Status-Bar Quick-Search Clicks|Focus|Blur
  setupStatusSearch : function () {
    this.status_search_link.bind('click', function (e) {
      e.preventDefault();
      YC.Nav.toggleStatusSearch();
    });
    this.status_search_input.on('focus blur', function() {
      YC.Nav.toggleAutofill($(this));
    });
  },

  // Display Quick-Search [CSS-Anim, jQuery-FadeIn]
  showStatusSearch : function () {
    this.status_nav_links.addClass('inactive');
    this.status_search_panel.addClass('active');
    setTimeout( function () {
      YC.Nav.status_search_box.fadeIn();
      YC.Nav.status_search_flag = true;
    }, this.nav_timer_delay );
  },

  // Hide Quick-Search [jQuery-FadeOut, CSS-Anim]
  hideStatusSearch : function () {
    this.status_search_box.fadeOut();
    setTimeout( function () {
      YC.Nav.status_search_panel.removeClass('active');
      YC.Nav.status_nav_links.removeClass('inactive');
      YC.Nav.status_search_flag = false;
    }, this.nav_timer_delay);
  },

  // Flip Quick-Search Display Status
  toggleStatusSearch : function (kill) {
    if ( kill && !this.status_search_flag ) {
      this.hideStatusSearch();
    } else if( !this.status_search_flag ) {
      this.showStatusSearch();
    } else {
      this.hideStatusSearch();
    }
  },

  // Flip Quick-Search Watermark
  toggleAutofill : function (input) {
    if ( input.val() === '' ) {
      input.val('Search');
    } else if ( input.val() === 'Search' ) {
      input.val('');
    }
  },
};
