(function($){Drupal.behaviors.devel={attach:function(context,settings){$('.krumo-footnote .krumo-call',context).once().before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="'+settings.basePath+'misc/help.png"/>');var krumo_name=[],krumo_type=[]
function krumo_traverse(el){krumo_name.push($(el).html());krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);if($(el).closest('.krumo-nest').length>0)krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'))};$('.krumo-child > div:first-child',context).once('krumo_path',function(){$('.krumo-child > div:first-child',context).dblclick(function(e){if($(this).find('> .krumo-php-path').length>0){$(this).find('> .krumo-php-path').remove()}else{krumo_traverse($(this).find('> a.krumo-name'));var krumo_path_string='';for(var i=krumo_name.length-1;i>=0;--i){if((krumo_name.length-1)==i)krumo_path_string+='$'+krumo_name[i];if(typeof krumo_name[(i-1)]!=='undefined'){if(krumo_type[i]=='Array'){krumo_path_string+="[";if(!/^\d*$/.test(krumo_name[(i-1)]))krumo_path_string+="'";krumo_path_string+=krumo_name[(i-1)];if(!/^\d*$/.test(krumo_name[(i-1)]))krumo_path_string+="'";krumo_path_string+="]"};if(krumo_type[i]=='Object')krumo_path_string+='->'+krumo_name[(i-1)]}};$(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">'+krumo_path_string+'</div>');krumo_name=[];krumo_type=[]}})});$('.krumo-element').once('krumo-events',function(){$(this).click(function(){krumo.toggle(this)}).mouseover(function(){krumo.over(this)}).mouseout(function(){krumo.out(this)})})}}})(jQuery);;/*})'"*/
(function($){Drupal.behaviors.textarea={attach:function(context,settings){$('.form-textarea-wrapper.resizable',context).once('textarea',function(){var staticOffset=null,textarea=$(this).addClass('resizable-textarea').find('textarea'),grippie=$('<div class="grippie"></div>').mousedown(startDrag);grippie.insertAfter(textarea)
function startDrag(e){staticOffset=textarea.height()-e.pageY;textarea.css('opacity',0.25);$(document).mousemove(performDrag).mouseup(endDrag);return false}
function performDrag(e){textarea.height(Math.max(32,staticOffset+e.pageY)+'px');return false}
function endDrag(e){$(document).unbind('mousemove',performDrag).unbind('mouseup',endDrag);textarea.css('opacity',1)}})}}})(jQuery);;/*})'"*/

(function ($) {

/**
 * Auto-hide summary textarea if empty and show hide and unhide links.
 */
Drupal.behaviors.textSummary = {
  attach: function (context, settings) {
    $('.text-summary', context).once('text-summary', function () {
      var $widget = $(this).closest('div.field-type-text-with-summary');
      var $summaries = $widget.find('div.text-summary-wrapper');

      $summaries.once('text-summary-wrapper').each(function(index) {
        var $summary = $(this);
        var $summaryLabel = $summary.find('label').first();
        var $full = $widget.find('.text-full').eq(index).closest('.form-item');
        var $fullLabel = $full.find('label').first();

        // Create a placeholder label when the field cardinality is
        // unlimited or greater than 1.
        if ($fullLabel.length == 0) {
          $fullLabel = $('<label></label>').prependTo($full);
        }

        // Setup the edit/hide summary link.
        var $link = $('<span class="field-edit-link">(<a class="link-edit-summary" href="#">' + Drupal.t('Hide summary') + '</a>)</span>');
        var $a = $link.find('a');
        var toggleClick = true;
        $link.bind('click', function (e) {
          if (toggleClick) {
            $summary.hide();
            $a.html(Drupal.t('Edit summary'));
            $link.appendTo($fullLabel);
          }
          else {
            $summary.show();
            $a.html(Drupal.t('Hide summary'));
            $link.appendTo($summaryLabel);
          }
          toggleClick = !toggleClick;
          return false;
        }).appendTo($summaryLabel);

        // If no summary is set, hide the summary field.
        if ($(this).find('.text-summary').val() == '') {
          $link.click();
        }
      });
    });
  }
};

})(jQuery);

;/*})'"*/
;/*})'"*/
(function ($) {

/**
 * Automatically display the guidelines of the selected text format.
 */
Drupal.behaviors.filterGuidelines = {
  attach: function (context) {
    $('.filter-guidelines', context).once('filter-guidelines')
      .find(':header').hide()
      .closest('.filter-wrapper').find('select.filter-list')
      .bind('change', function () {
        $(this).closest('.filter-wrapper')
          .find('.filter-guidelines-item').hide()
          .siblings('.filter-guidelines-' + this.value).show();
      })
      .change();
  }
};

})(jQuery);

;/*})'"*/
;/*})'"*/
(function($){Drupal.progressBar=function(id,updateCallback,method,errorCallback){var pb=this;this.id=id;this.method=method||'GET';this.updateCallback=updateCallback;this.errorCallback=errorCallback;this.element=$('<div class="progress" aria-live="polite"></div>').attr('id',id);this.element.html('<div class="bar"><div class="filled"></div></div><div class="percentage"></div><div class="message">&nbsp;</div>')};Drupal.progressBar.prototype.setProgress=function(percentage,message){if(percentage>=0&&percentage<=100){$('div.filled',this.element).css('width',percentage+'%');$('div.percentage',this.element).html(percentage+'%')};$('div.message',this.element).html(message);if(this.updateCallback)this.updateCallback(percentage,message,this)};Drupal.progressBar.prototype.startMonitoring=function(uri,delay){this.delay=delay;this.uri=uri;this.sendPing()};Drupal.progressBar.prototype.stopMonitoring=function(){clearTimeout(this.timer);this.uri=null};Drupal.progressBar.prototype.sendPing=function(){if(this.timer)clearTimeout(this.timer);if(this.uri){var pb=this;$.ajax({type:this.method,url:this.uri,data:'',dataType:'json',success:function(progress){if(progress.status==0){pb.displayError(progress.data);return};pb.setProgress(progress.percentage,progress.message);pb.timer=setTimeout(function(){pb.sendPing()},pb.delay)},error:function(xmlhttp){pb.displayError(Drupal.ajaxError(xmlhttp,pb.uri))}})}};Drupal.progressBar.prototype.displayError=function(string){var error=$('<div class="messages error"></div>').html(string);$(this.element).before(error).hide();if(this.errorCallback)this.errorCallback(this)}})(jQuery);;/*})'"*/
(function($){Drupal.toggleFieldset=function(fieldset){var $fieldset=$(fieldset);if($fieldset.is('.collapsed')){var $content=$('> .fieldset-wrapper',fieldset).hide();$fieldset.removeClass('collapsed').trigger({type:'collapsed',value:false}).find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));$content.slideDown({duration:'fast',easing:'linear',complete:function(){Drupal.collapseScrollIntoView(fieldset);fieldset.animating=false},step:function(){Drupal.collapseScrollIntoView(fieldset)}})}else{$fieldset.trigger({type:'collapsed',value:true});$('> .fieldset-wrapper',fieldset).slideUp('fast',function(){$fieldset.addClass('collapsed').find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));fieldset.animating=false})}};Drupal.collapseScrollIntoView=function(node){var h=document.documentElement.clientHeight||document.body.clientHeight||0,offset=document.documentElement.scrollTop||document.body.scrollTop||0,posY=$(node).offset().top,fudge=55;if(posY+node.offsetHeight+fudge>h+offset)if(node.offsetHeight>h){window.scrollTo(0,posY)}else window.scrollTo(0,posY+node.offsetHeight-h+fudge)};Drupal.behaviors.collapse={attach:function(context,settings){$('fieldset.collapsible',context).once('collapse',function(){var $fieldset=$(this),anchor=location.hash&&location.hash!='#'?', '+location.hash:'';if($fieldset.find('.error'+anchor).length)$fieldset.removeClass('collapsed');var summary=$('<span class="summary"></span>');$fieldset.bind('summaryUpdated',function(){var text=$.trim($fieldset.drupalGetSummary());summary.html(text?' ('+text+')':'')}).trigger('summaryUpdated');var $legend=$('> legend .fieldset-legend',this);$('<span class="fieldset-legend-prefix element-invisible"></span>').append($fieldset.hasClass('collapsed')?Drupal.t('Show'):Drupal.t('Hide')).prependTo($legend).after(' ');var $link=$('<a class="fieldset-title" href="#"></a>').prepend($legend.contents()).appendTo($legend).click(function(){var fieldset=$fieldset.get(0);if(!fieldset.animating){fieldset.animating=true;Drupal.toggleFieldset(fieldset)};return false});$legend.append(summary)})}}})(jQuery);;/*})'"*/
(function($){Drupal.behaviors.tableHeader={attach:function(context,settings){if(!$.support.positionFixed)return;$('table.sticky-enabled',context).once('tableheader',function(){$(this).data("drupal-tableheader",new Drupal.tableHeader(this))})}};Drupal.tableHeader=function(table){var self=this;this.originalTable=$(table);this.originalHeader=$(table).children('thead');this.originalHeaderCells=this.originalHeader.find('> tr > th');this.displayWeight=null;this.originalTable.bind('columnschange',function(e,display){self.widthCalculated=(self.displayWeight!==null&&self.displayWeight===display);self.displayWeight=display});this.stickyTable=$('<table class="sticky-header"/>').insertBefore(this.originalTable).css({position:'fixed',top:'0px'});this.stickyHeader=this.originalHeader.clone(true).hide().appendTo(this.stickyTable);this.stickyHeaderCells=this.stickyHeader.find('> tr > th');this.originalTable.addClass('sticky-table');$(window).bind('scroll.drupal-tableheader',$.proxy(this,'eventhandlerRecalculateStickyHeader')).bind('resize.drupal-tableheader',{calculateWidth:true},$.proxy(this,'eventhandlerRecalculateStickyHeader')).bind('drupalDisplaceAnchor.drupal-tableheader',function(){window.scrollBy(0,-self.stickyTable.outerHeight())}).bind('drupalDisplaceFocus.drupal-tableheader',function(event){if(self.stickyVisible&&event.clientY<(self.stickyOffsetTop+self.stickyTable.outerHeight())&&event.$target.closest('sticky-header').length===0)window.scrollBy(0,-self.stickyTable.outerHeight())}).triggerHandler('resize.drupal-tableheader');this.stickyHeader.show()};Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader=function(event){var self=this,calculateWidth=event.data&&event.data.calculateWidth;this.stickyOffsetTop=Drupal.settings.tableHeaderOffset?eval(Drupal.settings.tableHeaderOffset+'()'):0;this.stickyTable.css('top',this.stickyOffsetTop+'px');var viewHeight=document.documentElement.scrollHeight||document.body.scrollHeight;if(calculateWidth||this.viewHeight!==viewHeight){this.viewHeight=viewHeight;this.vPosition=this.originalTable.offset().top-4-this.stickyOffsetTop;this.hPosition=this.originalTable.offset().left;this.vLength=this.originalTable[0].clientHeight-100;calculateWidth=true};var hScroll=document.documentElement.scrollLeft||document.body.scrollLeft,vOffset=(document.documentElement.scrollTop||document.body.scrollTop)-this.vPosition;this.stickyVisible=vOffset>0&&vOffset<this.vLength;this.stickyTable.css({left:(-hScroll+this.hPosition)+'px',visibility:this.stickyVisible?'visible':'hidden'});if(this.stickyVisible&&(calculateWidth||!this.widthCalculated)){this.widthCalculated=true;var $that=null,$stickyCell=null,display=null,cellWidth=null;for(var i=0,il=this.originalHeaderCells.length;i<il;i+=1){$that=$(this.originalHeaderCells[i]);$stickyCell=this.stickyHeaderCells.eq($that.index());display=$that.css('display');if(display!=='none'){cellWidth=$that.css('width');if(cellWidth==='auto')cellWidth=$that[0].clientWidth+'px';$stickyCell.css({width:cellWidth,display:display})}else $stickyCell.css('display','none')};this.stickyTable.css('width',this.originalTable.outerWidth())}}})(jQuery);;/*})'"*/
(function ($) {

Drupal.behaviors.menuFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.menu-link-form', context).drupalSetSummary(function (context) {
      if ($('.form-item-menu-enabled input', context).is(':checked')) {
        return Drupal.checkPlain($('.form-item-menu-link-title input', context).val());
      }
      else {
        return Drupal.t('Not in menu');
      }
    });
  }
};

/**
 * Automatically fill in a menu link title, if possible.
 */
Drupal.behaviors.menuLinkAutomaticTitle = {
  attach: function (context) {
    $('fieldset.menu-link-form', context).each(function () {
      // Try to find menu settings widget elements as well as a 'title' field in
      // the form, but play nicely with user permissions and form alterations.
      var $checkbox = $('.form-item-menu-enabled input', this);
      var $link_title = $('.form-item-menu-link-title input', context);
      var $title = $(this).closest('form').find('.form-item-title input');
      // Bail out if we do not have all required fields.
      if (!($checkbox.length && $link_title.length && $title.length)) {
        return;
      }
      // If there is a link title already, mark it as overridden. The user expects
      // that toggling the checkbox twice will take over the node's title.
      if ($checkbox.is(':checked') && $link_title.val().length) {
        $link_title.data('menuLinkAutomaticTitleOveridden', true);
      }
      // Whenever the value is changed manually, disable this behavior.
      $link_title.keyup(function () {
        $link_title.data('menuLinkAutomaticTitleOveridden', true);
      });
      // Global trigger on checkbox (do not fill-in a value when disabled).
      $checkbox.change(function () {
        if ($checkbox.is(':checked')) {
          if (!$link_title.data('menuLinkAutomaticTitleOveridden')) {
            $link_title.val($title.val());
          }
        }
        else {
          $link_title.val('');
          $link_title.removeData('menuLinkAutomaticTitleOveridden');
        }
        $checkbox.closest('fieldset.vertical-tabs-pane').trigger('summaryUpdated');
        $checkbox.trigger('formUpdated');
      });
      // Take over any title change.
      $title.keyup(function () {
        if (!$link_title.data('menuLinkAutomaticTitleOveridden') && $checkbox.is(':checked')) {
          $link_title.val($title.val());
          $link_title.val($title.val()).trigger('formUpdated');
        }
      });
    });
  }
};

})(jQuery);

;/*})'"*/
;/*})'"*/
(function ($) {

Drupal.behaviors.pathFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.path-form', context).drupalSetSummary(function (context) {
      var path = $('.form-item-path-alias input', context).val();
      var automatic = $('.form-item-path-pathauto input', context).attr('checked');

      if (automatic) {
        return Drupal.t('Automatic alias');
      }
      else if (path) {
        return Drupal.t('Alias: @alias', { '@alias': path });
      }
      else {
        return Drupal.t('No alias');
      }
    });
  }
};

})(jQuery);

;/*})'"*/
;/*})'"*/
/**
 * @file
 * Custom JS for controlling the Metatag vertical tab.
 */

(function ($) {
  'use strict';

  Drupal.behaviors.metatagFieldsetSummaries = {
    attach: function (context) {
      $('fieldset.metatags-form', context).drupalSetSummary(function (context) {
        var vals = [];
        $("input[type='text'], select, textarea", context).each(function() {
          var input_field = $(this).attr('name');
          // Verify the field exists before proceeding.
          if (input_field === undefined) {
            return false;
          }
          var default_name = input_field.replace(/\[value\]/, '[default]');
          var default_value = $("input[type='hidden'][name='" + default_name + "']", context);
          if (default_value.length && default_value.val() === $(this).val()) {
            // Meta tag has a default value and form value matches default
            // value.
            return true;
          }
          else if (!default_value.length && !$(this).val().length) {
            // Meta tag has no default value and form value is empty.
            return true;
          }
          var label = $("label[for='" + $(this).attr('id') + "']").text();
          vals.push(Drupal.t('@label: @value', {
            '@label': $.trim(label),
            '@value': Drupal.truncate($(this).val(), 25) || Drupal.t('None')
          }));
        });
        if (vals.length === 0) {
          return Drupal.t('Using defaults');
        }
        else {
          return vals.join('<br />');
        }
      });
    }
  };

  /**
   * Encode special characters in a plain-text string for display as HTML.
   */
  Drupal.truncate = function (str, limit) {
    if (str.length > limit) {
      return str.substr(0, limit) + '...';
    }
    else {
      return str;
    }
  };

})(jQuery);

;/*})'"*/
;/*})'"*/

(function ($) {

Drupal.behaviors.commentFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.comment-node-settings-form', context).drupalSetSummary(function (context) {
      return Drupal.checkPlain($('.form-item-comment input:checked', context).next('label').text());
    });

    // Provide the summary for the node type form.
    $('fieldset.comment-node-type-settings-form', context).drupalSetSummary(function(context) {
      var vals = [];

      // Default comment setting.
      vals.push($(".form-item-comment select option:selected", context).text());

      // Threading.
      var threading = $(".form-item-comment-default-mode input:checked", context).next('label').text();
      if (threading) {
        vals.push(threading);
      }

      // Comments per page.
      var number = $(".form-item-comment-default-per-page select option:selected", context).val();
      vals.push(Drupal.t('@number comments per page', {'@number': number}));

      return Drupal.checkPlain(vals.join(', '));
    });
  }
};

})(jQuery);

;/*})'"*/
;/*})'"*/
(function ($) {

/**
 * Attaches the autocomplete behavior to all required fields.
 */
Drupal.behaviors.autocomplete = {
  attach: function (context, settings) {
    var acdb = [];
    $('input.autocomplete', context).once('autocomplete', function () {
      var uri = this.value;
      if (!acdb[uri]) {
        acdb[uri] = new Drupal.ACDB(uri);
      }
      var $input = $('#' + this.id.substr(0, this.id.length - 13))
        .attr('autocomplete', 'OFF')
        .attr('aria-autocomplete', 'list');
      $($input[0].form).submit(Drupal.autocompleteSubmit);
      $input.parent()
        .attr('role', 'application')
        .append($('<span class="element-invisible" aria-live="assertive"></span>')
          .attr('id', $input.attr('id') + '-autocomplete-aria-live')
        );
      new Drupal.jsAC($input, acdb[uri]);
    });
  }
};

/**
 * Prevents the form from submitting if the suggestions popup is open
 * and closes the suggestions popup when doing so.
 */
Drupal.autocompleteSubmit = function () {
  return $('#autocomplete').each(function () {
    this.owner.hidePopup();
  }).length == 0;
};

/**
 * An AutoComplete object.
 */
Drupal.jsAC = function ($input, db) {
  var ac = this;
  this.input = $input[0];
  this.ariaLive = $('#' + this.input.id + '-autocomplete-aria-live');
  this.db = db;

  $input
    .keydown(function (event) { return ac.onkeydown(this, event); })
    .keyup(function (event) { ac.onkeyup(this, event); })
    .blur(function () { ac.hidePopup(); ac.db.cancel(); });

};

/**
 * Handler for the "keydown" event.
 */
Drupal.jsAC.prototype.onkeydown = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 40: // down arrow.
      this.selectDown();
      return false;
    case 38: // up arrow.
      this.selectUp();
      return false;
    default: // All other keys.
      return true;
  }
};

/**
 * Handler for the "keyup" event.
 */
Drupal.jsAC.prototype.onkeyup = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 16: // Shift.
    case 17: // Ctrl.
    case 18: // Alt.
    case 20: // Caps lock.
    case 33: // Page up.
    case 34: // Page down.
    case 35: // End.
    case 36: // Home.
    case 37: // Left arrow.
    case 38: // Up arrow.
    case 39: // Right arrow.
    case 40: // Down arrow.
      return true;

    case 9:  // Tab.
    case 13: // Enter.
    case 27: // Esc.
      this.hidePopup(e.keyCode);
      return true;

    default: // All other keys.
      if (input.value.length > 0 && !input.readOnly) {
        this.populatePopup();
      }
      else {
        this.hidePopup(e.keyCode);
      }
      return true;
  }
};

/**
 * Puts the currently highlighted suggestion into the autocomplete field.
 */
Drupal.jsAC.prototype.select = function (node) {
  this.input.value = $(node).data('autocompleteValue');
  $(this.input).trigger('autocompleteSelect', [node]);
};

/**
 * Highlights the next suggestion.
 */
Drupal.jsAC.prototype.selectDown = function () {
  if (this.selected && this.selected.nextSibling) {
    this.highlight(this.selected.nextSibling);
  }
  else if (this.popup) {
    var lis = $('li', this.popup);
    if (lis.length > 0) {
      this.highlight(lis.get(0));
    }
  }
};

/**
 * Highlights the previous suggestion.
 */
Drupal.jsAC.prototype.selectUp = function () {
  if (this.selected && this.selected.previousSibling) {
    this.highlight(this.selected.previousSibling);
  }
};

/**
 * Highlights a suggestion.
 */
Drupal.jsAC.prototype.highlight = function (node) {
  if (this.selected) {
    $(this.selected).removeClass('selected');
  }
  $(node).addClass('selected');
  this.selected = node;
  $(this.ariaLive).html($(this.selected).html());
};

/**
 * Unhighlights a suggestion.
 */
Drupal.jsAC.prototype.unhighlight = function (node) {
  $(node).removeClass('selected');
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Hides the autocomplete suggestions.
 */
Drupal.jsAC.prototype.hidePopup = function (keycode) {
  // Select item if the right key or mousebutton was pressed.
  if (this.selected && ((keycode && keycode != 46 && keycode != 8 && keycode != 27) || !keycode)) {
    this.select(this.selected);
  }
  // Hide popup.
  var popup = this.popup;
  if (popup) {
    this.popup = null;
    $(popup).fadeOut('fast', function () { $(popup).remove(); });
  }
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Positions the suggestions popup and starts a search.
 */
Drupal.jsAC.prototype.populatePopup = function () {
  var $input = $(this.input);
  var position = $input.position();
  // Show popup.
  if (this.popup) {
    $(this.popup).remove();
  }
  this.selected = false;
  this.popup = $('<div id="autocomplete"></div>')[0];
  this.popup.owner = this;
  $(this.popup).css({
    top: parseInt(position.top + this.input.offsetHeight, 10) + 'px',
    left: parseInt(position.left, 10) + 'px',
    width: $input.innerWidth() + 'px',
    display: 'none'
  });
  $input.before(this.popup);

  // Do search.
  this.db.owner = this;
  this.db.search(this.input.value);
};

/**
 * Fills the suggestion popup with any matches received.
 */
Drupal.jsAC.prototype.found = function (matches) {
  // If no value in the textfield, do not show the popup.
  if (!this.input.value.length) {
    return false;
  }

  // Prepare matches.
  var ul = $('<ul></ul>');
  var ac = this;
  for (key in matches) {
    $('<li></li>')
      .html($('<div></div>').html(matches[key]))
      .mousedown(function () { ac.hidePopup(this); })
      .mouseover(function () { ac.highlight(this); })
      .mouseout(function () { ac.unhighlight(this); })
      .data('autocompleteValue', key)
      .appendTo(ul);
  }

  // Show popup with matches, if any.
  if (this.popup) {
    if (ul.children().length) {
      $(this.popup).empty().append(ul).show();
      $(this.ariaLive).html(Drupal.t('Autocomplete popup'));
    }
    else {
      $(this.popup).css({ visibility: 'hidden' });
      this.hidePopup();
    }
  }
};

Drupal.jsAC.prototype.setStatus = function (status) {
  switch (status) {
    case 'begin':
      $(this.input).addClass('throbbing');
      $(this.ariaLive).html(Drupal.t('Searching for matches...'));
      break;
    case 'cancel':
    case 'error':
    case 'found':
      $(this.input).removeClass('throbbing');
      break;
  }
};

/**
 * An AutoComplete DataBase object.
 */
Drupal.ACDB = function (uri) {
  this.uri = uri;
  this.delay = 300;
  this.cache = {};
};

/**
 * Performs a cached and delayed search.
 */
Drupal.ACDB.prototype.search = function (searchString) {
  var db = this;
  this.searchString = searchString;

  // See if this string needs to be searched for anyway. The pattern ../ is
  // stripped since it may be misinterpreted by the browser.
  searchString = searchString.replace(/^\s+|\.{2,}\/|\s+$/g, '');
  // Skip empty search strings, or search strings ending with a comma, since
  // that is the separator between search terms.
  if (searchString.length <= 0 ||
    searchString.charAt(searchString.length - 1) == ',') {
    return;
  }

  // See if this key has been searched for before.
  if (this.cache[searchString]) {
    return this.owner.found(this.cache[searchString]);
  }

  // Initiate delayed search.
  if (this.timer) {
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(function () {
    db.owner.setStatus('begin');

    // Ajax GET request for autocompletion. We use Drupal.encodePath instead of
    // encodeURIComponent to allow autocomplete search terms to contain slashes.
    $.ajax({
      type: 'GET',
      url: db.uri + '/' + Drupal.encodePath(searchString),
      dataType: 'json',
      success: function (matches) {
        if (typeof matches.status == 'undefined' || matches.status != 0) {
          db.cache[searchString] = matches;
          // Verify if these are still the matches the user wants to see.
          if (db.searchString == searchString) {
            db.owner.found(matches);
          }
          db.owner.setStatus('found');
        }
      },
      error: function (xmlhttp) {
        Drupal.displayAjaxError(Drupal.ajaxError(xmlhttp, db.uri));
      }
    });
  }, this.delay);
};

/**
 * Cancels the current autocomplete request.
 */
Drupal.ACDB.prototype.cancel = function () {
  if (this.owner) this.owner.setStatus('cancel');
  if (this.timer) clearTimeout(this.timer);
  this.searchString = '';
};

})(jQuery);

;/*})'"*/
;/*})'"*/

(function ($) {

Drupal.behaviors.nodeFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.node-form-revision-information', context).drupalSetSummary(function (context) {
      var revisionCheckbox = $('.form-item-revision input', context);

      // Return 'New revision' if the 'Create new revision' checkbox is checked,
      // or if the checkbox doesn't exist, but the revision log does. For users
      // without the "Administer content" permission the checkbox won't appear,
      // but the revision log will if the content type is set to auto-revision.
      if (revisionCheckbox.is(':checked') || (!revisionCheckbox.length && $('.form-item-log textarea', context).length)) {
        return Drupal.t('New revision');
      }

      return Drupal.t('No revision');
    });

    $('fieldset.node-form-author', context).drupalSetSummary(function (context) {
      var name = $('.form-item-name input', context).val() || Drupal.settings.anonymous,
        date = $('.form-item-date input', context).val();
      return date ?
        Drupal.t('By @name on @date', { '@name': name, '@date': date }) :
        Drupal.t('By @name', { '@name': name });
    });

    $('fieldset.node-form-options', context).drupalSetSummary(function (context) {
      var vals = [];

      $('input:checked', context).parent().each(function () {
        vals.push(Drupal.checkPlain($.trim($(this).text())));
      });

      if (!$('.form-item-status input', context).is(':checked')) {
        vals.unshift(Drupal.t('Not published'));
      }
      return vals.join(', ');
    });
  }
};

})(jQuery);

;/*})'"*/
;/*})'"*/

(function($) {

/**
 * Drupal FieldGroup object.
 */
Drupal.FieldGroup = Drupal.FieldGroup || {};
Drupal.FieldGroup.Effects = Drupal.FieldGroup.Effects || {};
Drupal.FieldGroup.groupWithfocus = null;

Drupal.FieldGroup.setGroupWithfocus = function(element) {
  element.css({display: 'block'});
  Drupal.FieldGroup.groupWithfocus = element;
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processFieldset = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.fieldset', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $('legend span.fieldset-legend', $(this)).eq(0).append(' ').append($('.form-required').eq(0).clone());
        }
        if ($('.error', $(this)).length) {
          $('legend span.fieldset-legend', $(this)).eq(0).addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processAccordion = {
  execute: function (context, settings, type) {
    $('div.field-group-accordion-wrapper', context).once('fieldgroup-effects', function () {
      var wrapper = $(this);

      // Get the index to set active.
      var active_index = false;
      wrapper.find('.accordion-item').each(function(i) {
        if ($(this).hasClass('field-group-accordion-active')) {
          active_index = i;
        }
      });

      wrapper.accordion({
        heightStyle: "content",
        active: active_index,
        collapsible: true,
        changestart: function(event, ui) {
          if ($(this).hasClass('effect-none')) {
            ui.options.animated = false;
          }
          else {
            ui.options.animated = 'slide';
          }
        }
      });

      if (type == 'form') {

        var $firstErrorItem = false;

        // Add required fields mark to any element containing required fields
        wrapper.find('div.field-group-accordion-item').each(function(i) {

          if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
            $('h3.ui-accordion-header a').eq(i).append(' ').append($('.form-required').eq(0).clone());
          }
          if ($('.error', $(this)).length) {
            // Save first error item, for focussing it.
            if (!$firstErrorItem) {
              $firstErrorItem = $(this).parent().accordion("activate" , i);
            }
            $('h3.ui-accordion-header').eq(i).addClass('error');
          }
        });

        // Save first error item, for focussing it.
        if (!$firstErrorItem) {
          $('.ui-accordion-content-active', $firstErrorItem).css({height: 'auto', width: 'auto', display: 'block'});
        }

      }
    });
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processHtabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any element containing required fields
      $('fieldset.horizontal-tabs-pane', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('horizontalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');
        }
        if ($('.error', $(this)).length) {
          $(this).data('horizontalTab').link.parent().addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
          $(this).data('horizontalTab').focus();
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processTabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {

      var errorFocussed = false;

      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.vertical-tabs-pane', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('verticalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');
        }
        if ($('.error', $(this)).length) {
          $(this).data('verticalTab').link.parent().addClass('error');
          // Focus the first tab with error.
          if (!errorFocussed) {
            Drupal.FieldGroup.setGroupWithfocus($(this));
            $(this).data('verticalTab').focus();
            errorFocussed = true;
          }
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 *
 * TODO clean this up meaning check if this is really
 *      necessary.
 */
Drupal.FieldGroup.Effects.processDiv = {
  execute: function (context, settings, type) {

    $('div.collapsible', context).once('fieldgroup-effects', function() {
      var $wrapper = $(this);

      // Turn the legend into a clickable link, but retain span.field-group-format-toggler
      // for CSS positioning.

      var $toggler = $('span.field-group-format-toggler:first', $wrapper);
      var $link = $('<a class="field-group-format-title" href="#"></a>');
      $link.prepend($toggler.contents());

      // Add required field markers if needed
      if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
        $link.append(' ').append($('.form-required').eq(0).clone());
      }

      $link.appendTo($toggler);

      // .wrapInner() does not retain bound events.
      $link.click(function () {
        var wrapper = $wrapper.get(0);
        // Don't animate multiple times.
        if (!wrapper.animating) {
          wrapper.animating = true;
          var speed = $wrapper.hasClass('speed-fast') ? 300 : 1000;
          if ($wrapper.hasClass('effect-none') && $wrapper.hasClass('speed-none')) {
            $('> .field-group-format-wrapper', wrapper).toggle();
          }
          else if ($wrapper.hasClass('effect-blind')) {
            $('> .field-group-format-wrapper', wrapper).toggle('blind', {}, speed);
          }
          else {
            $('> .field-group-format-wrapper', wrapper).toggle(speed);
          }
          wrapper.animating = false;
        }
        $wrapper.toggleClass('collapsed');
        return false;
      });

    });
  }
};

/**
 * Behaviors.
 */
Drupal.behaviors.fieldGroup = {
  attach: function (context, settings) {
    settings.field_group = settings.field_group || Drupal.settings.field_group;
    if (settings.field_group == undefined) {
      return;
    }

    // Execute all of them.
    $.each(Drupal.FieldGroup.Effects, function (func) {
      // We check for a wrapper function in Drupal.field_group as
      // alternative for dynamic string function calls.
      var type = func.toLowerCase().replace("process", "");
      if (settings.field_group[type] != undefined && $.isFunction(this.execute)) {
        this.execute(context, settings, settings.field_group[type]);
      }
    });

    // Fixes css for fieldgroups under vertical tabs.
    $('.fieldset-wrapper .fieldset > legend').css({display: 'block'});
    $('.vertical-tabs fieldset.fieldset').addClass('default-fallback');

    // Add a new ID to each fieldset.
    $('.group-wrapper .horizontal-tabs-panes > fieldset', context).once('group-wrapper-panes-processed', function() {
      // Tats bad, but we have to keep the actual id to prevent layouts to break.
      var fieldgroupID = 'field_group-' + $(this).attr('id');
      $(this).attr('id', fieldgroupID);
    });
    // Set the hash in url to remember last userselection.
    $('.group-wrapper ul li').once('group-wrapper-ul-processed', function() {
      var fieldGroupNavigationListIndex = $(this).index();
      $(this).children('a').click(function() {
        var fieldset = $('.group-wrapper fieldset').get(fieldGroupNavigationListIndex);
        // Grab the first id, holding the wanted hashurl.
        var hashUrl = $(fieldset).attr('id').replace(/^field_group-/, '').split(' ')[0];
        window.location.hash = hashUrl;
      });
    });

  }
};

})(jQuery);

;/*})'"*/
;/*})'"*/
