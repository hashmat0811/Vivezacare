(function($){Drupal.admin=Drupal.admin||{};Drupal.admin.behaviors=Drupal.admin.behaviors||{};Drupal.admin.hashes=Drupal.admin.hashes||{};Drupal.behaviors.adminMenu={attach:function(context,settings){settings.admin_menu=$.extend({suppress:false,margin_top:false,position_fixed:false,tweak_modules:false,tweak_permissions:false,tweak_tabs:false,destination:'',basePath:settings.basePath,hash:0,replacements:{}},settings.admin_menu||{});if(settings.admin_menu.suppress)return;var $adminMenu=$('#admin-menu:not(.admin-menu-processed)',context);if(!$adminMenu.length&&settings.admin_menu.hash){Drupal.admin.getCache(settings.admin_menu.hash,function(response){if(typeof response=='string'&&response.length>0)$('body',context).append(response);var $adminMenu=$('#admin-menu:not(.admin-menu-processed)',context);Drupal.admin.attachBehaviors(context,settings,$adminMenu);$(window).triggerHandler('resize')})}else Drupal.admin.attachBehaviors(context,settings,$adminMenu)}};Drupal.behaviors.adminMenuCollapseModules={attach:function(context,settings){if(settings.admin_menu.tweak_modules)$('#system-modules fieldset:not(.collapsed)',context).addClass('collapsed')}};Drupal.behaviors.adminMenuCollapsePermissions={attach:function(context,settings){if(settings.admin_menu.tweak_permissions){$('#permissions th:first',context).css({width:$('#permissions th:first',context).width()});$modules=$('#permissions tr:has(td.module)',context).once('admin-menu-tweak-permissions',function(){var $module=$(this);$module.bind('click.admin-menu',function(){$module.nextAll().each(function(){var $row=$(this);if($row.is(':has(td.module)'))return false;$row.toggleClass('element-hidden')})})});if(window.location.hash.length)$modules=$modules.not(':has('+window.location.hash+')');$modules.trigger('click.admin-menu')}}};Drupal.behaviors.adminMenuMarginTop={attach:function(context,settings){if(!settings.admin_menu.suppress&&settings.admin_menu.margin_top)$('body:not(.admin-menu)',context).addClass('admin-menu')}};Drupal.admin.getCache=function(hash,onSuccess){if(Drupal.admin.hashes.hash!==undefined)return Drupal.admin.hashes.hash;$.ajax({cache:true,type:'GET',dataType:'text',global:false,url:Drupal.settings.admin_menu.basePath.replace(/admin_menu/,'js/admin_menu/cache/'+hash),success:onSuccess,complete:function(XMLHttpRequest,status){Drupal.admin.hashes.hash=status}})};Drupal.admin.height=function(){var $adminMenu=$('#admin-menu'),height=$adminMenu.outerHeight();if($adminMenu.css('filter')&&$adminMenu.css('filter').match(/DXImageTransform\.Microsoft\.Shadow/))height-=$adminMenu.get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength;return height};Drupal.admin.attachBehaviors=function(context,settings,$adminMenu){if($adminMenu.length){$adminMenu.addClass('admin-menu-processed');$.each(Drupal.admin.behaviors,function(){this(context,settings,$adminMenu)})}};Drupal.admin.behaviors.positionFixed=function(context,settings,$adminMenu){if(settings.admin_menu.position_fixed){$adminMenu.addClass('admin-menu-position-fixed');$adminMenu.css('position','fixed')}};Drupal.admin.behaviors.pageTabs=function(context,settings,$adminMenu){if(settings.admin_menu.tweak_tabs){var $tabs=$(context).find('ul.tabs.primary');$adminMenu.find('#admin-menu-wrapper > ul').eq(1).append($tabs.find('li').addClass('admin-menu-tab'));$(context).find('ul.tabs.secondary').appendTo('#admin-menu-wrapper > ul > li.admin-menu-tab.active').removeClass('secondary');$tabs.remove()}};Drupal.admin.behaviors.replacements=function(context,settings,$adminMenu){for(var item in settings.admin_menu.replacements)$(item,$adminMenu).html(settings.admin_menu.replacements[item])};Drupal.admin.behaviors.destination=function(context,settings,$adminMenu){if(settings.admin_menu.destination)$('a.admin-menu-destination',$adminMenu).each(function(){this.search+=(!this.search.length?'?':'&')+Drupal.settings.admin_menu.destination})};Drupal.admin.behaviors.hover=function(context,settings,$adminMenu){$('li.expandable',$adminMenu).hover(function(){clearTimeout(this.sfTimer);$('> ul',this).css({left:'auto',display:'block'}).parent().siblings('li').children('ul').css({left:'-999em',display:'none'})},function(){var uls=$('> ul',this);this.sfTimer=setTimeout(function(){uls.css({left:'-999em',display:'none'})},400)})};Drupal.admin.behaviors.search=function(context,settings,$adminMenu){var $input=$('input.admin-menu-search',$adminMenu),needle=$input.val(),links,needleMinLength=2,$results=$('<div />').insertAfter($input)
function keyupHandler(){var matches,$html,value=$(this).val();if(value!==needle){needle=value;if(!links&&needle.length>=needleMinLength)links=buildSearchIndex($adminMenu.find('li:not(.admin-menu-action, .admin-menu-action li) > a'));if(needle.length<needleMinLength)$results.empty();if(needle.length>=needleMinLength&&links){matches=findMatches(needle,links);$html=buildResultsList(matches);$results.empty().append($html)}}}
function buildSearchIndex($links){return $links.map(function(){var text=(this.textContent||this.innerText);if(typeof text==='undefined')return;return{text:text,textMatch:text.toLowerCase(),element:this}})}
function findMatches(needle,links){var needleMatch=needle.toLowerCase();return $.grep(links,function(link){return link.textMatch.indexOf(needleMatch)!==-1})}
function buildResultsList(matches){var $html=$('<ul class="dropdown admin-menu-search-results" />');$.each(matches,function(){var result=this.text,$element=$(this.element),$category=$element.closest('#admin-menu-wrapper > ul > li'),categoryText=$category.find('> a').text();if($category.length&&categoryText)result=categoryText+': '+result;var $result=$('<li><a href="'+$element.attr('href')+'">'+result+'</a></li>');$result.data('original-link',$(this.element).parent());$html.append($result)});return $html}
function resultsHandler(e){var $this=$(this),show=e.type==='mouseenter'||e.type==='focusin';$this.trigger(show?'showPath':'hidePath',[this])}
function resultsClickHandler(e,link){var $original=$(this).data('original-link');$original.trigger('mouseleave');$input.val('').trigger('keyup')}
function highlightPathHandler(e,link){if(link){var $original=$(link).data('original-link'),show=e.type==='showPath';$original.toggleClass('highlight',show);$original.trigger(show?'mouseenter':'mouseleave')}};$results.delegate('li','mouseenter mouseleave focus blur',resultsHandler);$results.delegate('li','click',resultsClickHandler);$adminMenu.delegate('.admin-menu-search-results li','showPath hidePath',highlightPathHandler);$input.bind('keyup search',keyupHandler)}})(jQuery);;/*})'"*/
/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
if (typeof window.CKEDITOR_BASEPATH === 'undefined') {
  window.CKEDITOR_BASEPATH = Drupal.settings.ckeditor.editor_path;
}
(function ($) {
  Drupal.ckeditor = (typeof(CKEDITOR) != 'undefined');
  Drupal.ckeditor_ver = false;

  Drupal.ckeditorToggle = function(textarea_ids, TextTextarea, TextRTE){
    if (!CKEDITOR.env.isCompatible) {
      return;
    }

    for (i=0; i<textarea_ids.length; i++){
      if (typeof(CKEDITOR.instances) != 'undefined' && typeof(CKEDITOR.instances[textarea_ids[i]]) != 'undefined'){
        Drupal.ckeditorOff(textarea_ids[i]);
        $('#switch_' + textarea_ids[i]).text(TextRTE);
      }
      else {
        Drupal.ckeditorOn(textarea_ids[i]);
        $('#switch_' + textarea_ids[i]).text(TextTextarea);
      }
    }
  };

  /**
 * CKEditor starting function
 *
 * @param string textarea_id
 */
  Drupal.ckeditorInit = function(textarea_id) {
    var ckeditor_obj = Drupal.settings.ckeditor;
    $("#" + textarea_id).next(".grippie").css("display", "none");
    $("#" + textarea_id).addClass("ckeditor-processed");

    var textarea_settings = false;
    ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].toolbar = eval(ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].toolbar);
    textarea_settings = ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]];

    var drupalTopToolbar = $('#toolbar, #admin-menu', Drupal.overlayChild ? window.parent.document : document);

    textarea_settings['on'] =
    {
      configLoaded  : function(ev)
      {
        Drupal.ckeditor_ver = CKEDITOR.version.split('.')[0];
        if (Drupal.ckeditor_ver == 3) {
          ev.editor.addCss(ev.editor.config.extraCss);
        }
        else {
          CKEDITOR.addCss(ev.editor.config.extraCss);
        }
        // Let Drupal trigger formUpdated event [#1895278]
        ev.editor.on('change', function(ev) {
          $(ev.editor.element.$).trigger('change');
        });
        ev.editor.on('blur', function(ev) {
          $(ev.editor.element.$).trigger('blur');
        });
        ev.editor.on('focus', function(ev) {
          $(ev.editor.element.$).trigger('click');
        });
      },
      instanceReady : function(ev)
      {
        var body = $(ev.editor.document.$.body);
        if (typeof(ev.editor.dataProcessor.writer.setRules) != 'undefined') {
          ev.editor.dataProcessor.writer.setRules('p', {
            breakAfterOpen: false
          });

          if (typeof(ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].custom_formatting) != 'undefined') {
            var dtd = CKEDITOR.dtd;
            for ( var e in CKEDITOR.tools.extend( {}, dtd.$block, dtd.$listItem, dtd.$tableContent ) ) {
              ev.editor.dataProcessor.writer.setRules( e, ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].custom_formatting);
            }
            ev.editor.dataProcessor.writer.setRules( 'pre',
            {
              indent: ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].output_pre_indent
            });
          }
        }

        if (ev.editor.config.bodyClass)
          body.addClass(ev.editor.config.bodyClass);
        if (ev.editor.config.bodyId)
          body.attr('id', ev.editor.config.bodyId);
        if (typeof(Drupal.smileysAttach) != 'undefined' && typeof(ev.editor.dataProcessor.writer) != 'undefined')
          ev.editor.dataProcessor.writer.indentationChars = '    ';

        // Let Drupal trigger formUpdated event [#1895278]
        ((ev.editor.editable && ev.editor.editable()) || ev.editor.document.getBody()).on( 'keyup', function() {
          $(ev.editor.element.$).trigger('keyup');
        });
        ((ev.editor.editable && ev.editor.editable()) || ev.editor.document.getBody()).on( 'keydown', function() {
          $(ev.editor.element.$).trigger('keydown');
        });
      },
      focus : function(ev)
      {
        Drupal.ckeditorInstance = ev.editor;
        Drupal.ckeditorActiveId = ev.editor.name;
      },
      afterCommandExec: function(ev)
      {
        if (ev.data.name != 'maximize') {
          return;
        }
        if (ev.data.command.state == CKEDITOR.TRISTATE_ON) {
          drupalTopToolbar.hide();
        } else {
          drupalTopToolbar.show();
        }
      }
    };

    if (typeof Drupal.settings.ckeditor.scayt_language != 'undefined'){
      textarea_settings['scayt_sLang'] = Drupal.settings.ckeditor.scayt_language;
    }

    if (typeof textarea_settings['js_conf'] != 'undefined'){
      for (var add_conf in textarea_settings['js_conf']){
        textarea_settings[add_conf] = eval(textarea_settings['js_conf'][add_conf]);
      }
    }

    //remove width 100% from settings because this may cause problems with theme css
    if (textarea_settings.width == '100%') textarea_settings.width = '';

    if (CKEDITOR.loadFullCore) {
      CKEDITOR.on('loaded', function() {
        textarea_settings = Drupal.ckeditorLoadPlugins(textarea_settings);
        Drupal.ckeditorInstance = CKEDITOR.replace(textarea_id, textarea_settings);
      });
      CKEDITOR.loadFullCore();
    }
    else {
      textarea_settings = Drupal.ckeditorLoadPlugins(textarea_settings);
      Drupal.ckeditorInstance = CKEDITOR.replace(textarea_id, textarea_settings);
    }
  }

  Drupal.ckeditorOn = function(textarea_id, run_filter) {

    run_filter = typeof(run_filter) != 'undefined' ? run_filter : true;

    if (typeof(textarea_id) == 'undefined' || textarea_id.length == 0 || $("#" + textarea_id).length == 0) {
      return;
    }
    if ((typeof(Drupal.settings.ckeditor.load_timeout) == 'undefined') && (typeof(CKEDITOR.instances[textarea_id]) != 'undefined')) {
      return;
    }
    if (typeof(Drupal.settings.ckeditor.elements[textarea_id]) == 'undefined') {
      return;
    }
    var ckeditor_obj = Drupal.settings.ckeditor;

    if (!CKEDITOR.env.isCompatible) {
      return;
    }

    if (run_filter && ($("#" + textarea_id).val().length > 0) && typeof(ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]]) != 'undefined' && ((ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]]['ss'] == 1 && typeof(Drupal.settings.ckeditor.autostart) != 'undefined' && typeof(Drupal.settings.ckeditor.autostart[textarea_id]) != 'undefined') || ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]]['ss'] == 2)) {
      $.ajax({
        type: 'POST',
        url: Drupal.settings.ckeditor.xss_url,
        async: false,
        data: {
          text: $('#' + textarea_id).val(),
          input_format: ckeditor_obj.textarea_default_format[textarea_id],
          token: Drupal.settings.ckeditor.ajaxToken
        },
        success: function(text){
          $("#" + textarea_id).val(text);
          Drupal.ckeditorInit(textarea_id);
        }
      })
    }
    else {
      Drupal.ckeditorInit(textarea_id);
    }
  };

  /**
 * CKEditor destroy function
 *
 * @param string textarea_id
 */
  Drupal.ckeditorOff = function(textarea_id) {
    if (!CKEDITOR.instances || typeof(CKEDITOR.instances[textarea_id]) == 'undefined') {
      return;
    }
    if (!CKEDITOR.env.isCompatible) {
      return;
    }
    if (Drupal.ckeditorInstance && Drupal.ckeditorInstance.name == textarea_id)
      delete Drupal.ckeditorInstance;

    $("#" + textarea_id).val(CKEDITOR.instances[textarea_id].getData());
    CKEDITOR.instances[textarea_id].destroy(true);

    $("#" + textarea_id).next(".grippie").css("display", "block");
  };

  /**
* Loading selected CKEditor plugins
*
* @param object textarea_settings
*/
  Drupal.ckeditorLoadPlugins = function(textarea_settings) {
    if (typeof(textarea_settings.extraPlugins) == 'undefined') {
      textarea_settings.extraPlugins = '';
    }
    if (typeof CKEDITOR.plugins != 'undefined') {
      for (var plugin in textarea_settings['loadPlugins']) {
        textarea_settings.extraPlugins += (textarea_settings.extraPlugins) ? ',' + textarea_settings['loadPlugins'][plugin]['name'] : textarea_settings['loadPlugins'][plugin]['name'];
        CKEDITOR.plugins.addExternal(textarea_settings['loadPlugins'][plugin]['name'], textarea_settings['loadPlugins'][plugin]['path']);
      }
    }
    return textarea_settings;
  };

  /**
 * Returns true if CKEDITOR.version >= version
 */
  Drupal.ckeditorCompareVersion = function (version){
    var ckver = CKEDITOR.version;
    ckver = ckver.match(/(([\d]\.)+[\d]+)/i);
    version = version.match(/((\d+\.)+[\d]+)/i);
    ckver = ckver[0].split('.');
    version = version[0].split('.');
    for (var x in ckver) {
      if (ckver[x]<version[x]) {
        return false;
      }
      else if (ckver[x]>version[x]) {
        return true;
      }
    }
    return true;
  };

  Drupal.ckeditorInsertHtml = function(html) {
    if (!Drupal.ckeditorInstance)
      return false;

    if (Drupal.ckeditorInstance.mode == 'wysiwyg') {
      Drupal.ckeditorInstance.insertHtml(html);
      return true;
    }
    else {
      alert(Drupal.t('Content can only be inserted into CKEditor in the WYSIWYG mode.'));
      return false;
    }
  };

  /**
 * Ajax support
 */
  if (typeof(Drupal.Ajax) != 'undefined' && typeof(Drupal.Ajax.plugins) != 'undefined') {
    Drupal.Ajax.plugins.CKEditor = function(hook, args) {
      if (hook === 'submit' && typeof(CKEDITOR.instances) != 'undefined') {
        for (var i in CKEDITOR.instances)
          CKEDITOR.instances[i].updateElement();
      }
      return true;
    };
  }

  //Support for Panels [#679976]
  Drupal.ckeditorSubmitAjaxForm = function () {
    if (typeof(CKEDITOR.instances) != 'undefined' && typeof(CKEDITOR.instances['edit-body']) != 'undefined') {
      Drupal.ckeditorOff('edit-body');
    }
  };

  function attachCKEditor(context) {
    // make sure the textarea behavior is run first, to get a correctly sized grippie
    if (Drupal.behaviors.textarea && Drupal.behaviors.textarea.attach) {
      Drupal.behaviors.textarea.attach(context);
    }

    $(context).find("textarea.ckeditor-mod:not(.ckeditor-processed)").each(function () {
      var ta_id=$(this).attr("id");
      if (CKEDITOR.instances && typeof(CKEDITOR.instances[ta_id]) != 'undefined'){
        Drupal.ckeditorOff(ta_id);
      }

      if ((typeof(Drupal.settings.ckeditor.autostart) != 'undefined') && (typeof(Drupal.settings.ckeditor.autostart[ta_id]) != 'undefined')) {
        Drupal.ckeditorOn(ta_id);
      }

      if (typeof(Drupal.settings.ckeditor.input_formats[Drupal.settings.ckeditor.elements[ta_id]]) != 'undefined') {
        $('.ckeditor_links').show();
      }

      var sel_format = $("#" + ta_id.substr(0, ta_id.lastIndexOf("-")) + "-format--2");
      if (sel_format && sel_format.not('.ckeditor-processed')) {
        sel_format.addClass('ckeditor-processed').change(function() {
          Drupal.settings.ckeditor.elements[ta_id] = $(this).val();
          if (CKEDITOR.instances && typeof(CKEDITOR.instances[ta_id]) != 'undefined') {
            $('#'+ta_id).val(CKEDITOR.instances[ta_id].getData());
          }
          Drupal.ckeditorOff(ta_id);
          if (typeof(Drupal.settings.ckeditor.input_formats[$(this).val()]) != 'undefined'){
            if ($('#'+ta_id).hasClass('ckeditor-processed')) {
              Drupal.ckeditorOn(ta_id, false);
            }
            else {
              Drupal.ckeditorOn(ta_id);
            }
            $('#switch_'+ta_id).show();
          }
          else {
            $('#switch_'+ta_id).hide();
          }
        });
      }
    });
  }

  /**
 * Drupal behaviors
 */
  Drupal.behaviors.ckeditor = {
    attach:
    function (context) {
      // If CKEDITOR is undefined and script is loaded from CDN, wait up to 15 seconds until it loads [#2244817]
      if ((typeof(CKEDITOR) == 'undefined') && Drupal.settings.ckeditor.editor_path.match(/^(http(s)?:)?\/\//i)) {
        if (typeof(Drupal.settings.ckeditor.loadAttempts) == 'undefined') {
          Drupal.settings.ckeditor.loadAttempts = 50;
        }
        if (Drupal.settings.ckeditor.loadAttempts > 0) {
          Drupal.settings.ckeditor.loadAttempts--;
          window.setTimeout(function() {
            Drupal.behaviors.ckeditor.attach(context);
          }, 300);
        }
        return;
      }
      if ((typeof(CKEDITOR) == 'undefined') || !CKEDITOR.env.isCompatible) {
        return;
      }
      attachCKEditor(context);
    },
    detach:
    function(context, settings, trigger){
      $(context).find("textarea.ckeditor-mod.ckeditor-processed").each(function () {
        var ta_id=$(this).attr("id");
        if (CKEDITOR.instances[ta_id])
          $('#'+ta_id).val(CKEDITOR.instances[ta_id].getData());
        if(trigger != 'serialize') {
          Drupal.ckeditorOff(ta_id);
          $(this).removeClass('ckeditor-processed');
        }
      });
    }
  };

  // Support CTools detach event.
  $(document).bind('CToolsDetachBehaviors', function(event, context) {
    Drupal.behaviors.ckeditor.detach(context, {}, 'unload');
  });
})(jQuery);

/**
 * IMCE support
 */
var ckeditor_imceSendTo = function (file, win){
  var cfunc = win.location.href.split('&');

  for (var x in cfunc) {
    if (cfunc[x].match(/^CKEditorFuncNum=\d+$/)) {
      cfunc = cfunc[x].split('=');
      break;
    }
  }
  CKEDITOR.tools.callFunction(cfunc[1], file.url);
  win.close();
}


;/*})'"*/
;/*})'"*/
