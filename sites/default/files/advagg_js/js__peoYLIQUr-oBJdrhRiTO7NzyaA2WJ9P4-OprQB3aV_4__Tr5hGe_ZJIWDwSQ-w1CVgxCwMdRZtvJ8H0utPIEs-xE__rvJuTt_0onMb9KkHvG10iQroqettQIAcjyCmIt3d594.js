(function($){Drupal.admin=Drupal.admin||{};Drupal.admin.behaviors=Drupal.admin.behaviors||{};Drupal.admin.behaviors.toolbarActiveTrail=function(context,settings,$adminMenu){if(settings.admin_menu.toolbar&&settings.admin_menu.toolbar.activeTrail)$adminMenu.find('> div > ul > li > a[href="'+settings.admin_menu.toolbar.activeTrail+'"]').addClass('active-trail')};Drupal.admin.behaviors.shortcutToggle=function(context,settings,$adminMenu){var $shortcuts=$adminMenu.find('.shortcut-toolbar');if(!$shortcuts.length)return;var storage=window.localStorage||false,storageKey='Drupal.admin_menu.shortcut',$body=$(context).find('body'),$toggle=$adminMenu.find('.shortcut-toggle');$toggle.click(function(){var enable=!$shortcuts.hasClass('active');$shortcuts.toggleClass('active',enable);$toggle.toggleClass('active',enable);if(settings.admin_menu.margin_top)$body.toggleClass('admin-menu-with-shortcuts',enable);storage&&enable?storage.setItem(storageKey,1):storage.removeItem(storageKey);this.blur();return false});if(!storage||storage.getItem(storageKey))$toggle.trigger('click')}})(jQuery);;/*})'"*/
(function($){Drupal.behaviors.devel={attach:function(context,settings){$('.krumo-footnote .krumo-call',context).once().before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="'+settings.basePath+'misc/help.png"/>');var krumo_name=[],krumo_type=[]
function krumo_traverse(el){krumo_name.push($(el).html());krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);if($(el).closest('.krumo-nest').length>0)krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'))};$('.krumo-child > div:first-child',context).once('krumo_path',function(){$('.krumo-child > div:first-child',context).dblclick(function(e){if($(this).find('> .krumo-php-path').length>0){$(this).find('> .krumo-php-path').remove()}else{krumo_traverse($(this).find('> a.krumo-name'));var krumo_path_string='';for(var i=krumo_name.length-1;i>=0;--i){if((krumo_name.length-1)==i)krumo_path_string+='$'+krumo_name[i];if(typeof krumo_name[(i-1)]!=='undefined'){if(krumo_type[i]=='Array'){krumo_path_string+="[";if(!/^\d*$/.test(krumo_name[(i-1)]))krumo_path_string+="'";krumo_path_string+=krumo_name[(i-1)];if(!/^\d*$/.test(krumo_name[(i-1)]))krumo_path_string+="'";krumo_path_string+="]"};if(krumo_type[i]=='Object')krumo_path_string+='->'+krumo_name[(i-1)]}};$(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">'+krumo_path_string+'</div>');krumo_name=[];krumo_type=[]}})});$('.krumo-element').once('krumo-events',function(){$(this).click(function(){krumo.toggle(this)}).mouseover(function(){krumo.over(this)}).mouseout(function(){krumo.out(this)})})}}})(jQuery);;/*})'"*/
