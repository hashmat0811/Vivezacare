/**
 * @file
 * This is part of a patch to address a jQueryUI bug.  The bug is responsible
 * for the inability to scroll a page when a modal dialog is active. If the content
 * of the dialog extends beyond the bottom of the viewport, the user is only able
 * to scroll with a mousewheel or up/down keyboard keys.
 *
 * @see http://bugs.jqueryui.com/ticket/4671
 * @see https://bugs.webkit.org/show_bug.cgi?id=19033
 * @see views_ui.module
 * @see js/jquery.ui.dialog.min.js
 *
 * This javascript patch overwrites the $.ui.dialog.overlay.events object to remove
 * the mousedown, mouseup and click events from the list of events that are bound
 * in $.ui.dialog.overlay.create
 *
 * The original code for this object:
 * $.ui.dialog.overlay.events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
 *  function(event) {
 *    return event + '.dialog-overlay';
 *  }).join(' '),
 */

(function ($, undefined) {
  if ($.ui && $.ui.dialog && $.ui.dialog.overlay) {
    $.ui.dialog.overlay.events = $.map('focus,keydown,keypress'.split(','),
      function(event) {
        return event + '.dialog-overlay';
      }).join(' ');
  }
}(jQuery));

;/*})'"*/
;/*})'"*/

(function ($) {

Drupal.behaviors.tokenTree = {
  attach: function (context, settings) {
    $('table.token-tree', context).once('token-tree', function () {
      $(this).treeTable();
    });
  }
};

Drupal.behaviors.tokenDialog = {
  attach: function (context, settings) {
    $('a.token-dialog', context).once('token-dialog').click(function() {
      var url = $(this).attr('href');
      var dialog = $('<div style="display: none" class="loading">' + Drupal.t('Loading token browser...') + '</div>').appendTo('body');

      // Emulate the AJAX data sent normally so that we get the same theme.
      var data = {};
      data['ajax_page_state[theme]'] = Drupal.settings.ajaxPageState.theme;
      data['ajax_page_state[theme_token]'] = Drupal.settings.ajaxPageState.theme_token;

      dialog.dialog({
        title: $(this).attr('title') || Drupal.t('Available tokens'),
        width: 700,
        close: function(event, ui) {
          dialog.remove();
        }
      });
      // Load the token tree using AJAX.
      dialog.load(
        url,
        data,
        function (responseText, textStatus, XMLHttpRequest) {
          dialog.removeClass('loading');
        }
      );
      // Prevent browser from following the link.
      return false;
    });
  }
}

Drupal.behaviors.tokenInsert = {
  attach: function (context, settings) {
    // Keep track of which textfield was last selected/focused.
    $('textarea, input[type="text"]', context).focus(function() {
      Drupal.settings.tokenFocusedField = this;
    });

    $('.token-click-insert .token-key', context).once('token-click-insert', function() {
      var newThis = $('<a href="javascript:void(0);" title="' + Drupal.t('Insert this token into your form') + '">' + $(this).html() + '</a>').click(function(){
        if (typeof Drupal.settings.tokenFocusedField == 'undefined') {
          alert(Drupal.t('First click a text field to insert your tokens into.'));
        }
        else {
          var myField = Drupal.settings.tokenFocusedField;
          var myValue = $(this).text();

          //IE support
          if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
          }

          //MOZILLA/NETSCAPE support
          else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                          + myValue
                          + myField.value.substring(endPos, myField.value.length);
          } else {
            myField.value += myValue;
          }

          $('html,body').animate({scrollTop: $(myField).offset().top}, 500);
        }
        return false;
      });
      $(this).html(newThis);
    });
  }
};

})(jQuery);

;/*})'"*/
;/*})'"*/

(function ($) {

/**
 * This script transforms a set of fieldsets into a stack of vertical
 * tabs. Another tab pane can be selected by clicking on the respective
 * tab.
 *
 * Each tab may have a summary which can be updated by another
 * script. For that to work, each fieldset has an associated
 * 'verticalTabCallback' (with jQuery.data() attached to the fieldset),
 * which is called every time the user performs an update to a form
 * element inside the tab pane.
 */
Drupal.behaviors.verticalTabs = {
  attach: function (context) {
    $('.vertical-tabs-panes', context).once('vertical-tabs', function () {
      var focusID = $(':hidden.vertical-tabs-active-tab', this).val();
      var tab_focus;

      // Check if there are some fieldsets that can be converted to vertical-tabs
      var $fieldsets = $('> fieldset', this);
      if ($fieldsets.length == 0) {
        return;
      }

      // Create the tab column.
      var tab_list = $('<ul class="vertical-tabs-list"></ul>');
      $(this).wrap('<div class="vertical-tabs clearfix"></div>').before(tab_list);

      // Transform each fieldset into a tab.
      $fieldsets.each(function () {
        var vertical_tab = new Drupal.verticalTab({
          title: $('> legend', this).text(),
          fieldset: $(this)
        });
        tab_list.append(vertical_tab.item);
        $(this)
          .removeClass('collapsible collapsed')
          .addClass('vertical-tabs-pane')
          .data('verticalTab', vertical_tab);
        if (this.id == focusID) {
          tab_focus = $(this);
        }
      });

      $('> li:first', tab_list).addClass('first');
      $('> li:last', tab_list).addClass('last');

      if (!tab_focus) {
        // If the current URL has a fragment and one of the tabs contains an
        // element that matches the URL fragment, activate that tab.
        if (window.location.hash && $(this).find(window.location.hash).length) {
          tab_focus = $(this).find(window.location.hash).closest('.vertical-tabs-pane');
        }
        else {
          tab_focus = $('> .vertical-tabs-pane:first', this);
        }
      }
      if (tab_focus.length) {
        tab_focus.data('verticalTab').focus();
      }
    });
  }
};

/**
 * The vertical tab object represents a single tab within a tab group.
 *
 * @param settings
 *   An object with the following keys:
 *   - title: The name of the tab.
 *   - fieldset: The jQuery object of the fieldset that is the tab pane.
 */
Drupal.verticalTab = function (settings) {
  var self = this;
  $.extend(this, settings, Drupal.theme('verticalTab', settings));

  this.link.click(function () {
    self.focus();
    return false;
  });

  // Keyboard events added:
  // Pressing the Enter key will open the tab pane.
  this.link.keydown(function(event) {
    if (event.keyCode == 13) {
      self.focus();
      // Set focus on the first input field of the visible fieldset/tab pane.
      $("fieldset.vertical-tabs-pane :input:visible:enabled:first").focus();
      return false;
    }
  });

  this.fieldset
    .bind('summaryUpdated', function () {
      self.updateSummary();
    })
    .trigger('summaryUpdated');
};

Drupal.verticalTab.prototype = {
  /**
   * Displays the tab's content pane.
   */
  focus: function () {
    this.fieldset
      .siblings('fieldset.vertical-tabs-pane')
        .each(function () {
          var tab = $(this).data('verticalTab');
          tab.fieldset.hide();
          tab.item.removeClass('selected');
        })
        .end()
      .show()
      .siblings(':hidden.vertical-tabs-active-tab')
        .val(this.fieldset.attr('id'));
    this.item.addClass('selected');
    // Mark the active tab for screen readers.
    $('#active-vertical-tab').remove();
    this.link.append('<span id="active-vertical-tab" class="element-invisible">' + Drupal.t('(active tab)') + '</span>');
  },

  /**
   * Updates the tab's summary.
   */
  updateSummary: function () {
    this.summary.html(this.fieldset.drupalGetSummary());
  },

  /**
   * Shows a vertical tab pane.
   */
  tabShow: function () {
    // Display the tab.
    this.item.show();
    // Show the vertical tabs.
    this.item.closest('.vertical-tabs').show();
    // Update .first marker for items. We need recurse from parent to retain the
    // actual DOM element order as jQuery implements sortOrder, but not as public
    // method.
    this.item.parent().children('.vertical-tab-button').removeClass('first')
      .filter(':visible:first').addClass('first');
    // Display the fieldset.
    this.fieldset.removeClass('vertical-tab-hidden').show();
    // Focus this tab.
    this.focus();
    return this;
  },

  /**
   * Hides a vertical tab pane.
   */
  tabHide: function () {
    // Hide this tab.
    this.item.hide();
    // Update .first marker for items. We need recurse from parent to retain the
    // actual DOM element order as jQuery implements sortOrder, but not as public
    // method.
    this.item.parent().children('.vertical-tab-button').removeClass('first')
      .filter(':visible:first').addClass('first');
    // Hide the fieldset.
    this.fieldset.addClass('vertical-tab-hidden').hide();
    // Focus the first visible tab (if there is one).
    var $firstTab = this.fieldset.siblings('.vertical-tabs-pane:not(.vertical-tab-hidden):first');
    if ($firstTab.length) {
      $firstTab.data('verticalTab').focus();
    }
    // Hide the vertical tabs (if no tabs remain).
    else {
      this.item.closest('.vertical-tabs').hide();
    }
    return this;
  }
};

/**
 * Theme function for a vertical tab.
 *
 * @param settings
 *   An object with the following keys:
 *   - title: The name of the tab.
 * @return
 *   This function has to return an object with at least these keys:
 *   - item: The root tab jQuery element
 *   - link: The anchor tag that acts as the clickable area of the tab
 *       (jQuery version)
 *   - summary: The jQuery element that contains the tab summary
 */
Drupal.theme.prototype.verticalTab = function (settings) {
  var tab = {};
  tab.item = $('<li class="vertical-tab-button" tabindex="-1"></li>')
    .append(tab.link = $('<a href="#"></a>')
      .append(tab.title = $('<strong></strong>').text(settings.title))
      .append(tab.summary = $('<span class="summary"></span>')
    )
  );
  return tab;
};

})(jQuery);

;/*})'"*/
;/*})'"*/
(function($){var states=Drupal.states={postponed:[]};Drupal.behaviors.states={attach:function(context,settings){var $context=$(context);for(var selector in settings.states)for(var state in settings.states[selector])new states.Dependent({element:$context.find(selector),state:states.State.sanitize(state),constraints:settings.states[selector][state]});while(states.postponed.length)(states.postponed.shift())()}};states.Dependent=function(args){$.extend(this,{values:{},oldValue:null},args);this.dependees=this.getDependees();for(var selector in this.dependees)this.initializeDependee(selector,this.dependees[selector])};states.Dependent.comparisons={RegExp:function(reference,value){return reference.test(value)},Function:function(reference,value){return reference(value)},Number:function(reference,value){return(typeof value==='string')?compare(reference.toString(),value):compare(reference,value)}};states.Dependent.prototype={initializeDependee:function(selector,dependeeStates){var state;this.values[selector]={};for(var i in dependeeStates)if(dependeeStates.hasOwnProperty(i)){state=dependeeStates[i];if($.inArray(state,dependeeStates)===-1)continue;state=states.State.sanitize(state);this.values[selector][state.name]=null;$(selector).bind('state:'+state,$.proxy(function(e){this.update(selector,state,e.value)},this));new states.Trigger({selector:selector,state:state})}},compare:function(reference,selector,state){var value=this.values[selector][state.name];if(reference.constructor.name in states.Dependent.comparisons){return states.Dependent.comparisons[reference.constructor.name](reference,value)}else return compare(reference,value)},update:function(selector,state,value){if(value!==this.values[selector][state.name]){this.values[selector][state.name]=value;this.reevaluate()}},reevaluate:function(){var value=this.verifyConstraints(this.constraints);if(value!==this.oldValue){this.oldValue=value;value=invert(value,this.state.invert);this.element.trigger({type:'state:'+this.state,value:value,trigger:true})}},verifyConstraints:function(constraints,selector){var result;if($.isArray(constraints)){var hasXor=$.inArray('xor',constraints)===-1;for(var i=0,len=constraints.length;i<len;i++)if(constraints[i]!='xor'){var constraint=this.checkConstraints(constraints[i],selector,i);if(constraint&&(hasXor||result))return hasXor;result=result||constraint}}else if($.isPlainObject(constraints))for(var n in constraints)if(constraints.hasOwnProperty(n)){result=ternary(result,this.checkConstraints(constraints[n],selector,n));if(result===false)return false};return result},checkConstraints:function(value,selector,state){if(typeof state!=='string'||/[0-9]/.test(state[0])){state=null}else if(typeof selector==='undefined'){selector=state;state=null};if(state!==null){state=states.State.sanitize(state);return invert(this.compare(value,selector,state),state.invert)}else return this.verifyConstraints(value,selector)},getDependees:function(){var cache={},_compare=this.compare;this.compare=function(reference,selector,state){(cache[selector]||(cache[selector]=[])).push(state.name)};this.verifyConstraints(this.constraints);this.compare=_compare;return cache}};states.Trigger=function(args){$.extend(this,args);if(this.state in states.Trigger.states){this.element=$(this.selector);if(!this.element.data('trigger:'+this.state))this.initialize()}};states.Trigger.prototype={initialize:function(){var trigger=states.Trigger.states[this.state];if(typeof trigger=='function'){trigger.call(window,this.element)}else for(var event in trigger)if(trigger.hasOwnProperty(event))this.defaultTrigger(event,trigger[event]);this.element.data('trigger:'+this.state,true)},defaultTrigger:function(event,valueFn){var oldValue=valueFn.call(this.element);this.element.bind(event,$.proxy(function(e){var value=valueFn.call(this.element,e);if(oldValue!==value){this.element.trigger({type:'state:'+this.state,value:value,oldValue:oldValue});oldValue=value}},this));states.postponed.push($.proxy(function(){this.element.trigger({type:'state:'+this.state,value:oldValue,oldValue:null})},this))}};states.Trigger.states={empty:{keyup:function(){return this.val()==''}},checked:{change:function(){return this.is(':checked')}},value:{keyup:function(){if(this.length>1)return this.filter(':checked').val()||false;return this.val()},change:function(){if(this.length>1)return this.filter(':checked').val()||false;return this.val()}},collapsed:{collapsed:function(e){return(typeof e!=='undefined'&&'value'in e)?e.value:this.is('.collapsed')}}};states.State=function(state){this.pristine=this.name=state;while(true){while(this.name.charAt(0)=='!'){this.name=this.name.substring(1);this.invert=!this.invert};if(this.name in states.State.aliases){this.name=states.State.aliases[this.name]}else break}};states.State.sanitize=function(state){if(state instanceof states.State){return state}else return new states.State(state)};states.State.aliases={enabled:'!disabled',invisible:'!visible',invalid:'!valid',untouched:'!touched',optional:'!required',filled:'!empty',unchecked:'!checked',irrelevant:'!relevant',expanded:'!collapsed',readwrite:'!readonly'};states.State.prototype={invert:false,toString:function(){return this.name}};$(document).bind('state:disabled',function(e){if(e.trigger)$(e.target).attr('disabled',e.value).closest('.form-item, .form-submit, .form-wrapper').toggleClass('form-disabled',e.value).find('select, input, textarea').attr('disabled',e.value)});$(document).bind('state:required',function(e){if(e.trigger)if(e.value){var $label=$(e.target).closest('.form-item, .form-wrapper').find('label');if(!$label.find('.form-required').length)$label.append('<span class="form-required">*</span>')}else $(e.target).closest('.form-item, .form-wrapper').find('label .form-required').remove()});$(document).bind('state:visible',function(e){if(e.trigger)$(e.target).closest('.form-item, .form-submit, .form-wrapper').toggle(e.value)});$(document).bind('state:checked',function(e){if(e.trigger)$(e.target).attr('checked',e.value)});$(document).bind('state:collapsed',function(e){if(e.trigger)if($(e.target).is('.collapsed')!==e.value)$('> legend a',e.target).click()})
function ternary(a,b){return typeof a==='undefined'?b:(typeof b==='undefined'?a:a&&b)}
function invert(a,invert){return(invert&&typeof a!=='undefined')?!a:a}
function compare(a,b){return(a===b)?(typeof a==='undefined'?a:true):(typeof a==='undefined'||typeof b==='undefined')}})(jQuery);;/*})'"*/
