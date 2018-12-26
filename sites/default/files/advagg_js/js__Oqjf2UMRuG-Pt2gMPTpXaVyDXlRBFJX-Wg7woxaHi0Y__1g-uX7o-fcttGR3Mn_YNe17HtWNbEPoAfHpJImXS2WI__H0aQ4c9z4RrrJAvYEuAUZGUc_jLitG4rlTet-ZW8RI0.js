/**
 * @file
 * Attaches behaviors for the Contextual module.
 */

(function ($) {

Drupal.contextualLinks = Drupal.contextualLinks || {};

/**
 * Attaches outline behavior for regions associated with contextual links.
 */
Drupal.behaviors.contextualLinks = {
  attach: function (context) {
    $('div.contextual-links-wrapper', context).once('contextual-links', function () {
      var $wrapper = $(this);
      var $region = $wrapper.closest('.contextual-links-region');
      var $links = $wrapper.find('ul.contextual-links');
      var $trigger = $('<a class="contextual-links-trigger" href="#" />').text(Drupal.t('Configure')).click(
        function () {
          $links.stop(true, true).slideToggle(100);
          $wrapper.toggleClass('contextual-links-active');
          return false;
        }
      );
      // Attach hover behavior to trigger and ul.contextual-links.
      $trigger.add($links).hover(
        function () { $region.addClass('contextual-links-region-active'); },
        function () { $region.removeClass('contextual-links-region-active'); }
      );
      // Hide the contextual links when user clicks a link or rolls out of the .contextual-links-region.
      $region.bind('mouseleave click', Drupal.contextualLinks.mouseleave);
      $region.hover(
        function() { $trigger.addClass('contextual-links-trigger-active'); },
        function() { $trigger.removeClass('contextual-links-trigger-active'); }
      );
      // Prepend the trigger.
      $wrapper.prepend($trigger);
    });
  }
};

/**
 * Disables outline for the region contextual links are associated with.
 */
Drupal.contextualLinks.mouseleave = function () {
  $(this)
    .find('.contextual-links-active').removeClass('contextual-links-active')
    .find('ul.contextual-links').hide();
};

})(jQuery);

;/*})'"*/
;/*})'"*/
(function($){Drupal.admin=Drupal.admin||{};Drupal.admin.behaviors=Drupal.admin.behaviors||{};Drupal.admin.behaviors.toolbarActiveTrail=function(context,settings,$adminMenu){if(settings.admin_menu.toolbar&&settings.admin_menu.toolbar.activeTrail)$adminMenu.find('> div > ul > li > a[href="'+settings.admin_menu.toolbar.activeTrail+'"]').addClass('active-trail')};Drupal.admin.behaviors.shortcutToggle=function(context,settings,$adminMenu){var $shortcuts=$adminMenu.find('.shortcut-toolbar');if(!$shortcuts.length)return;var storage=window.localStorage||false,storageKey='Drupal.admin_menu.shortcut',$body=$(context).find('body'),$toggle=$adminMenu.find('.shortcut-toggle');$toggle.click(function(){var enable=!$shortcuts.hasClass('active');$shortcuts.toggleClass('active',enable);$toggle.toggleClass('active',enable);if(settings.admin_menu.margin_top)$body.toggleClass('admin-menu-with-shortcuts',enable);storage&&enable?storage.setItem(storageKey,1):storage.removeItem(storageKey);this.blur();return false});if(!storage||storage.getItem(storageKey))$toggle.trigger('click')}})(jQuery);;/*})'"*/
