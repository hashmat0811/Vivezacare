(function($){Drupal.behaviors.tableHeader={attach:function(context,settings){if(!$.support.positionFixed)return;$('table.sticky-enabled',context).once('tableheader',function(){$(this).data("drupal-tableheader",new Drupal.tableHeader(this))})}};Drupal.tableHeader=function(table){var self=this;this.originalTable=$(table);this.originalHeader=$(table).children('thead');this.originalHeaderCells=this.originalHeader.find('> tr > th');this.displayWeight=null;this.originalTable.bind('columnschange',function(e,display){self.widthCalculated=(self.displayWeight!==null&&self.displayWeight===display);self.displayWeight=display});this.stickyTable=$('<table class="sticky-header"/>').insertBefore(this.originalTable).css({position:'fixed',top:'0px'});this.stickyHeader=this.originalHeader.clone(true).hide().appendTo(this.stickyTable);this.stickyHeaderCells=this.stickyHeader.find('> tr > th');this.originalTable.addClass('sticky-table');$(window).bind('scroll.drupal-tableheader',$.proxy(this,'eventhandlerRecalculateStickyHeader')).bind('resize.drupal-tableheader',{calculateWidth:true},$.proxy(this,'eventhandlerRecalculateStickyHeader')).bind('drupalDisplaceAnchor.drupal-tableheader',function(){window.scrollBy(0,-self.stickyTable.outerHeight())}).bind('drupalDisplaceFocus.drupal-tableheader',function(event){if(self.stickyVisible&&event.clientY<(self.stickyOffsetTop+self.stickyTable.outerHeight())&&event.$target.closest('sticky-header').length===0)window.scrollBy(0,-self.stickyTable.outerHeight())}).triggerHandler('resize.drupal-tableheader');this.stickyHeader.show()};Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader=function(event){var self=this,calculateWidth=event.data&&event.data.calculateWidth;this.stickyOffsetTop=Drupal.settings.tableHeaderOffset?eval(Drupal.settings.tableHeaderOffset+'()'):0;this.stickyTable.css('top',this.stickyOffsetTop+'px');var viewHeight=document.documentElement.scrollHeight||document.body.scrollHeight;if(calculateWidth||this.viewHeight!==viewHeight){this.viewHeight=viewHeight;this.vPosition=this.originalTable.offset().top-4-this.stickyOffsetTop;this.hPosition=this.originalTable.offset().left;this.vLength=this.originalTable[0].clientHeight-100;calculateWidth=true};var hScroll=document.documentElement.scrollLeft||document.body.scrollLeft,vOffset=(document.documentElement.scrollTop||document.body.scrollTop)-this.vPosition;this.stickyVisible=vOffset>0&&vOffset<this.vLength;this.stickyTable.css({left:(-hScroll+this.hPosition)+'px',visibility:this.stickyVisible?'visible':'hidden'});if(this.stickyVisible&&(calculateWidth||!this.widthCalculated)){this.widthCalculated=true;var $that=null,$stickyCell=null,display=null,cellWidth=null;for(var i=0,il=this.originalHeaderCells.length;i<il;i+=1){$that=$(this.originalHeaderCells[i]);$stickyCell=this.stickyHeaderCells.eq($that.index());display=$that.css('display');if(display!=='none'){cellWidth=$that.css('width');if(cellWidth==='auto')cellWidth=$that[0].clientWidth+'px';$stickyCell.css({width:cellWidth,display:display})}else $stickyCell.css('display','none')};this.stickyTable.css('width',this.originalTable.outerWidth())}}})(jQuery);;/*})'"*/
(function($){Drupal.progressBar=function(id,updateCallback,method,errorCallback){var pb=this;this.id=id;this.method=method||'GET';this.updateCallback=updateCallback;this.errorCallback=errorCallback;this.element=$('<div class="progress" aria-live="polite"></div>').attr('id',id);this.element.html('<div class="bar"><div class="filled"></div></div><div class="percentage"></div><div class="message">&nbsp;</div>')};Drupal.progressBar.prototype.setProgress=function(percentage,message){if(percentage>=0&&percentage<=100){$('div.filled',this.element).css('width',percentage+'%');$('div.percentage',this.element).html(percentage+'%')};$('div.message',this.element).html(message);if(this.updateCallback)this.updateCallback(percentage,message,this)};Drupal.progressBar.prototype.startMonitoring=function(uri,delay){this.delay=delay;this.uri=uri;this.sendPing()};Drupal.progressBar.prototype.stopMonitoring=function(){clearTimeout(this.timer);this.uri=null};Drupal.progressBar.prototype.sendPing=function(){if(this.timer)clearTimeout(this.timer);if(this.uri){var pb=this;$.ajax({type:this.method,url:this.uri,data:'',dataType:'json',success:function(progress){if(progress.status==0){pb.displayError(progress.data);return};pb.setProgress(progress.percentage,progress.message);pb.timer=setTimeout(function(){pb.sendPing()},pb.delay)},error:function(xmlhttp){pb.displayError(Drupal.ajaxError(xmlhttp,pb.uri))}})}};Drupal.progressBar.prototype.displayError=function(string){var error=$('<div class="messages error"></div>').html(string);$(this.element).before(error).hide();if(this.errorCallback)this.errorCallback(this)}})(jQuery);;/*})'"*/
/**
 * @file
 * Attaches the behaviors for the Field UI module.
 */
 
(function($) {

Drupal.behaviors.fieldUIFieldOverview = {
  attach: function (context, settings) {
    $('table#field-overview', context).once('field-overview', function () {
      Drupal.fieldUIFieldOverview.attachUpdateSelects(this, settings);
    });
  }
};

Drupal.fieldUIFieldOverview = {
  /**
   * Implements dependent select dropdowns on the 'Manage fields' screen.
   */
  attachUpdateSelects: function(table, settings) {
    var widgetTypes = settings.fieldWidgetTypes;
    var fields = settings.fields;

    // Store the default text of widget selects.
    $('.widget-type-select', table).each(function () {
      this.initialValue = this.options[0].text;
    });

    // 'Field type' select updates its 'Widget' select.
    $('.field-type-select', table).each(function () {
      this.targetSelect = $('.widget-type-select', $(this).closest('tr'));

      $(this).bind('change keyup', function () {
        var selectedFieldType = this.options[this.selectedIndex].value;
        var options = (selectedFieldType in widgetTypes ? widgetTypes[selectedFieldType] : []);
        this.targetSelect.fieldUIPopulateOptions(options);
      });

      // Trigger change on initial pageload to get the right widget options
      // when field type comes pre-selected (on failed validation).
      $(this).trigger('change', false);
    });

    // 'Existing field' select updates its 'Widget' select and 'Label' textfield.
    $('.field-select', table).each(function () {
      this.targetSelect = $('.widget-type-select', $(this).closest('tr'));
      this.targetTextfield = $('.label-textfield', $(this).closest('tr'));
      this.targetTextfield
        .data('field_ui_edited', false)
        .bind('keyup', function (e) {
          $(this).data('field_ui_edited', $(this).val() != '');
        });

      $(this).bind('change keyup', function (e, updateText) {
        var updateText = (typeof updateText == 'undefined' ? true : updateText);
        var selectedField = this.options[this.selectedIndex].value;
        var selectedFieldType = (selectedField in fields ? fields[selectedField].type : null);
        var selectedFieldWidget = (selectedField in fields ? fields[selectedField].widget : null);
        var options = (selectedFieldType && (selectedFieldType in widgetTypes) ? widgetTypes[selectedFieldType] : []);
        this.targetSelect.fieldUIPopulateOptions(options, selectedFieldWidget);

        // Only overwrite the "Label" input if it has not been manually
        // changed, or if it is empty.
        if (updateText && !this.targetTextfield.data('field_ui_edited')) {
          this.targetTextfield.val(selectedField in fields ? fields[selectedField].label : '');
        }
      });

      // Trigger change on initial pageload to get the right widget options
      // and label when field type comes pre-selected (on failed validation).
      $(this).trigger('change', false);
    });
  }
};

/**
 * Populates options in a select input.
 */
jQuery.fn.fieldUIPopulateOptions = function (options, selected) {
  return this.each(function () {
    var disabled = false;
    if (options.length == 0) {
      options = [this.initialValue];
      disabled = true;
    }

    // If possible, keep the same widget selected when changing field type.
    // This is based on textual value, since the internal value might be
    // different (options_buttons vs. node_reference_buttons).
    var previousSelectedText = this.options[this.selectedIndex].text;

    var html = '';
    jQuery.each(options, function (value, text) {
      // Figure out which value should be selected. The 'selected' param
      // takes precedence.
      var is_selected = ((typeof selected != 'undefined' && value == selected) || (typeof selected == 'undefined' && text == previousSelectedText));
      html += '<option value="' + value + '"' + (is_selected ? ' selected="selected"' : '') + '>' + text + '</option>';
    });

    $(this).html(html).attr('disabled', disabled ? 'disabled' : false);
  });
};

Drupal.behaviors.fieldUIDisplayOverview = {
  attach: function (context, settings) {
    $('table#field-display-overview', context).once('field-display-overview', function() {
      Drupal.fieldUIOverview.attach(this, settings.fieldUIRowsData, Drupal.fieldUIDisplayOverview);
    });
  }
};

Drupal.fieldUIOverview = {
  /**
   * Attaches the fieldUIOverview behavior.
   */
  attach: function (table, rowsData, rowHandlers) {
    var tableDrag = Drupal.tableDrag[table.id];

    // Add custom tabledrag callbacks.
    tableDrag.onDrop = this.onDrop;
    tableDrag.row.prototype.onSwap = this.onSwap;

    // Create row handlers.
    $('tr.draggable', table).each(function () {
      // Extract server-side data for the row.
      var row = this;
      if (row.id in rowsData) {
        var data = rowsData[row.id];
        data.tableDrag = tableDrag;

        // Create the row handler, make it accessible from the DOM row element.
        var rowHandler = new rowHandlers[data.rowHandler](row, data);
        $(row).data('fieldUIRowHandler', rowHandler);
      }
    });
  },

  /**
   * Event handler to be attached to form inputs triggering a region change.
   */
  onChange: function () {
    var $trigger = $(this);
    var row = $trigger.closest('tr').get(0);
    var rowHandler = $(row).data('fieldUIRowHandler');

    var refreshRows = {};
    refreshRows[rowHandler.name] = $trigger.get(0);

    // Handle region change.
    var region = rowHandler.getRegion();
    if (region != rowHandler.region) {
      // Remove parenting.
      $('select.field-parent', row).val('');
      // Let the row handler deal with the region change.
      $.extend(refreshRows, rowHandler.regionChange(region));
      // Update the row region.
      rowHandler.region = region;
    }

    // Ajax-update the rows.
    Drupal.fieldUIOverview.AJAXRefreshRows(refreshRows);
  },

  /**
   * Lets row handlers react when a row is dropped into a new region.
   */
  onDrop: function () {
    var dragObject = this;
    var row = dragObject.rowObject.element;
    var rowHandler = $(row).data('fieldUIRowHandler');
    if (typeof rowHandler !== 'undefined') {
      var regionRow = $(row).prevAll('tr.region-message').get(0);
      var region = regionRow.className.replace(/([^ ]+[ ]+)*region-([^ ]+)-message([ ]+[^ ]+)*/, '$2');

      if (region != rowHandler.region) {
        // Let the row handler deal with the region change.
        refreshRows = rowHandler.regionChange(region);
        // Update the row region.
        rowHandler.region = region;
        // Ajax-update the rows.
        Drupal.fieldUIOverview.AJAXRefreshRows(refreshRows);
      }
    }
  },

  /**
   * Refreshes placeholder rows in empty regions while a row is being dragged.
   *
   * Copied from block.js.
   *
   * @param table
   *   The table DOM element.
   * @param rowObject
   *   The tableDrag rowObject for the row being dragged.
   */
  onSwap: function (draggedRow) {
    var rowObject = this;
    $('tr.region-message', rowObject.table).each(function () {
      // If the dragged row is in this region, but above the message row, swap
      // it down one space.
      if ($(this).prev('tr').get(0) == rowObject.group[rowObject.group.length - 1]) {
        // Prevent a recursion problem when using the keyboard to move rows up.
        if ((rowObject.method != 'keyboard' || rowObject.direction == 'down')) {
          rowObject.swap('after', this);
        }
      }
      // This region has become empty.
      if ($(this).next('tr').is(':not(.draggable)') || $(this).next('tr').length == 0) {
        $(this).removeClass('region-populated').addClass('region-empty');
      }
      // This region has become populated.
      else if ($(this).is('.region-empty')) {
        $(this).removeClass('region-empty').addClass('region-populated');
      }
    });
  },

  /**
   * Triggers Ajax refresh of selected rows.
   *
   * The 'format type' selects can trigger a series of changes in child rows.
   * The #ajax behavior is therefore not attached directly to the selects, but
   * triggered manually through a hidden #ajax 'Refresh' button.
   *
   * @param rows
   *   A hash object, whose keys are the names of the rows to refresh (they
   *   will receive the 'ajax-new-content' effect on the server side), and
   *   whose values are the DOM element in the row that should get an Ajax
   *   throbber.
   */
  AJAXRefreshRows: function (rows) {
    // Separate keys and values.
    var rowNames = [];
    var ajaxElements = [];
    $.each(rows, function (rowName, ajaxElement) {
      rowNames.push(rowName);
      ajaxElements.push(ajaxElement);
    });

    if (rowNames.length) {
      // Add a throbber next each of the ajaxElements.
      var $throbber = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
      $(ajaxElements)
        .addClass('progress-disabled')
        .after($throbber);

      // Fire the Ajax update.
      $('input[name=refresh_rows]').val(rowNames.join(' '));
      $('input#edit-refresh').mousedown();

      // Disabled elements do not appear in POST ajax data, so we mark the
      // elements disabled only after firing the request.
      $(ajaxElements).attr('disabled', true);
    }
  }
};


/**
 * Row handlers for the 'Manage display' screen.
 */
Drupal.fieldUIDisplayOverview = {};

/**
 * Constructor for a 'field' row handler.
 *
 * This handler is used for both fields and 'extra fields' rows.
 *
 * @param row
 *   The row DOM element.
 * @param data
 *   Additional data to be populated in the constructed object.
 */
Drupal.fieldUIDisplayOverview.field = function (row, data) {
  this.row = row;
  this.name = data.name;
  this.region = data.region;
  this.tableDrag = data.tableDrag;

  // Attach change listener to the 'formatter type' select.
  this.$formatSelect = $('select.field-formatter-type', row);
  this.$formatSelect.change(Drupal.fieldUIOverview.onChange);

  return this;
};

Drupal.fieldUIDisplayOverview.field.prototype = {
  /**
   * Returns the region corresponding to the current form values of the row.
   */
  getRegion: function () {
    return (this.$formatSelect.val() == 'hidden') ? 'hidden' : 'visible';
  },

  /**
   * Reacts to a row being changed regions.
   *
   * This function is called when the row is moved to a different region, as a
   * result of either :
   * - a drag-and-drop action (the row's form elements then probably need to be
   *   updated accordingly)
   * - user input in one of the form elements watched by the
   *   Drupal.fieldUIOverview.onChange change listener.
   *
   * @param region
   *   The name of the new region for the row.
   * @return
   *   A hash object indicating which rows should be Ajax-updated as a result
   *   of the change, in the format expected by
   *   Drupal.displayOverview.AJAXRefreshRows().
   */
  regionChange: function (region) {

    // When triggered by a row drag, the 'format' select needs to be adjusted
    // to the new region.
    var currentValue = this.$formatSelect.val();
    switch (region) {
      case 'visible':
        if (currentValue == 'hidden') {
          // Restore the formatter back to the default formatter. Pseudo-fields do
          // not have default formatters, we just return to 'visible' for those.
          var value = (typeof this.defaultFormatter !== 'undefined') ? this.defaultFormatter : this.$formatSelect.find('option').val();
        }
        break;

      default:
        var value = 'hidden';
        break;
    }
    if (value != undefined) {
      this.$formatSelect.val(value);
    }

    var refreshRows = {};
    refreshRows[this.name] = this.$formatSelect.get(0);

    return refreshRows;
  }
};

})(jQuery);

;/*})'"*/
;/*})'"*/

(function($) {

Drupal.behaviors.fieldUIFieldsOverview = {
  attach: function (context, settings) {
    $('table#field-overview', context).once('field-field-overview', function() {
      Drupal.fieldUIOverview.attach(this, settings.fieldUIRowsData, Drupal.fieldUIFieldOverview);
    });
  }
};
  
/**
 * Row handlers for the 'Manage fields' screen.
 */
Drupal.fieldUIFieldOverview = Drupal.fieldUIFieldOverview || {};

Drupal.fieldUIFieldOverview.group = function(row, data) {
  this.row = row;
  this.name = data.name;
  this.region = data.region;
  this.tableDrag = data.tableDrag;

  // Attach change listener to the 'group format' select.
  this.$formatSelect = $('select.field-group-type', row);
  this.$formatSelect.change(Drupal.fieldUIOverview.onChange);

  return this;
};

Drupal.fieldUIFieldOverview.group.prototype = {
  getRegion: function () {
    return 'main';
  },
  
  regionChange: function (region, recurse) {
    return {};
  },

  regionChangeFields: function (region, element, refreshRows) {

    // Create a new tabledrag rowObject, that will compute the group's child
    // rows for us.
    var tableDrag = element.tableDrag;
    rowObject = new tableDrag.row(element.row, 'mouse', true);
    // Skip the main row, we handled it above.
    rowObject.group.shift();

    // Let child rows handlers deal with the region change - without recursing
    // on nested group rows, we are handling them all here.
    $.each(rowObject.group, function() {
      var childRow = this;
      var childRowHandler = $(childRow).data('fieldUIRowHandler');
      $.extend(refreshRows, childRowHandler.regionChange(region, false));
    });
  }  
};
  
  
/**
 * Row handlers for the 'Manage display' screen.
 */
Drupal.fieldUIDisplayOverview = Drupal.fieldUIDisplayOverview || {};

Drupal.fieldUIDisplayOverview.group = function(row, data) {
  this.row = row;
  this.name = data.name;
  this.region = data.region;
  this.tableDrag = data.tableDrag;

  // Attach change listener to the 'group format' select.
  this.$formatSelect = $('select.field-group-type', row);
  this.$formatSelect.change(Drupal.fieldUIOverview.onChange);

  return this;
};

Drupal.fieldUIDisplayOverview.group.prototype = {
  getRegion: function () {
    return (this.$formatSelect.val() == 'hidden') ? 'hidden' : 'visible';
  },

  regionChange: function (region, recurse) {

    // Default recurse to true.
    recurse = (recurse == undefined) || recurse;

    // When triggered by a row drag, the 'format' select needs to be adjusted to
    // the new region.
    var currentValue = this.$formatSelect.val();
    switch (region) {
      case 'visible':
        if (currentValue == 'hidden') {
          // Restore the group format back to 'fieldset'.
          var value = 'fieldset';
        }
        break;

      default:
        var value = 'hidden';
        break;
    }
    if (value != undefined) {
      this.$formatSelect.val(value);
    }

    var refreshRows = {};
    refreshRows[this.name] = this.$formatSelect.get(0);

    if (recurse) {
      this.regionChangeFields(region, this, refreshRows);
    }

    return refreshRows;
  },

  regionChangeFields: function (region, element, refreshRows) {

    // Create a new tabledrag rowObject, that will compute the group's child
    // rows for us.
    var tableDrag = element.tableDrag;
    rowObject = new tableDrag.row(element.row, 'mouse', true);
    // Skip the main row, we handled it above.
    rowObject.group.shift();

    // Let child rows handlers deal with the region change - without recursing
    // on nested group rows, we are handling them all here.
    $.each(rowObject.group, function() {
      var childRow = this;
      var childRowHandler = $(childRow).data('fieldUIRowHandler');
      $.extend(refreshRows, childRowHandler.regionChange(region, false));
    });
    
  }
  
};

})(jQuery);
;/*})'"*/
;/*})'"*/
(function($){$.fn.drupalGetSummary=function(){var callback=this.data('summaryCallback');return(this[0]&&callback)?$.trim(callback(this[0])):''};$.fn.drupalSetSummary=function(callback){var self=this;if(typeof callback!='function'){var val=callback;callback=function(){return val}};return this.data('summaryCallback',callback).unbind('formUpdated.summary').bind('formUpdated.summary',function(){self.trigger('summaryUpdated')}).trigger('summaryUpdated')};Drupal.behaviors.formUpdated={attach:function(context){var events='change.formUpdated click.formUpdated blur.formUpdated keyup.formUpdated';$(context).find(':input').andSelf().filter(':input').unbind(events).bind(events,function(){$(this).trigger('formUpdated')})}};Drupal.behaviors.fillUserInfoFromCookie={attach:function(context,settings){$('form.user-info-from-cookie').once('user-info-from-cookie',function(){var formContext=this;$.each(['name','mail','homepage'],function(){var $element=$('[name='+this+']',formContext),cookie=$.cookie('Drupal.visitor.'+this);if($element.length&&cookie)$element.val(cookie)})})}}})(jQuery);;/*})'"*/
(function($){Drupal.toggleFieldset=function(fieldset){var $fieldset=$(fieldset);if($fieldset.is('.collapsed')){var $content=$('> .fieldset-wrapper',fieldset).hide();$fieldset.removeClass('collapsed').trigger({type:'collapsed',value:false}).find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));$content.slideDown({duration:'fast',easing:'linear',complete:function(){Drupal.collapseScrollIntoView(fieldset);fieldset.animating=false},step:function(){Drupal.collapseScrollIntoView(fieldset)}})}else{$fieldset.trigger({type:'collapsed',value:true});$('> .fieldset-wrapper',fieldset).slideUp('fast',function(){$fieldset.addClass('collapsed').find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));fieldset.animating=false})}};Drupal.collapseScrollIntoView=function(node){var h=document.documentElement.clientHeight||document.body.clientHeight||0,offset=document.documentElement.scrollTop||document.body.scrollTop||0,posY=$(node).offset().top,fudge=55;if(posY+node.offsetHeight+fudge>h+offset)if(node.offsetHeight>h){window.scrollTo(0,posY)}else window.scrollTo(0,posY+node.offsetHeight-h+fudge)};Drupal.behaviors.collapse={attach:function(context,settings){$('fieldset.collapsible',context).once('collapse',function(){var $fieldset=$(this),anchor=location.hash&&location.hash!='#'?', '+location.hash:'';if($fieldset.find('.error'+anchor).length)$fieldset.removeClass('collapsed');var summary=$('<span class="summary"></span>');$fieldset.bind('summaryUpdated',function(){var text=$.trim($fieldset.drupalGetSummary());summary.html(text?' ('+text+')':'')}).trigger('summaryUpdated');var $legend=$('> legend .fieldset-legend',this);$('<span class="fieldset-legend-prefix element-invisible"></span>').append($fieldset.hasClass('collapsed')?Drupal.t('Show'):Drupal.t('Hide')).prependTo($legend).after(' ');var $link=$('<a class="fieldset-title" href="#"></a>').prepend($legend.contents()).appendTo($legend).click(function(){var fieldset=$fieldset.get(0);if(!fieldset.animating){fieldset.animating=true;Drupal.toggleFieldset(fieldset)};return false});$legend.append(summary)})}}})(jQuery);;/*})'"*/
