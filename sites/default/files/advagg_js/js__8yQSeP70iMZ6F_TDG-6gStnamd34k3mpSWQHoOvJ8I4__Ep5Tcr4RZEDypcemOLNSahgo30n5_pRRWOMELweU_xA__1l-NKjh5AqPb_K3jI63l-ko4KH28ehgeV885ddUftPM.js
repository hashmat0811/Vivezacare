(function ($) {

Drupal.behaviors.tableSelect = {
  attach: function (context, settings) {
    // Select the inner-most table in case of nested tables.
    $('th.select-all', context).closest('table').once('table-select', Drupal.tableSelect);
  }
};

Drupal.tableSelect = function () {
  // Do not add a "Select all" checkbox if there are no rows with checkboxes in the table
  if ($('td input:checkbox', this).length == 0) {
    return;
  }

  // Keep track of the table, which checkbox is checked and alias the settings.
  var table = this, checkboxes, lastChecked;
  var strings = { 'selectAll': Drupal.t('Select all rows in this table'), 'selectNone': Drupal.t('Deselect all rows in this table') };
  var updateSelectAll = function (state) {
    // Update table's select-all checkbox (and sticky header's if available).
    $(table).prev('table.sticky-header').andSelf().find('th.select-all input:checkbox').each(function() {
      $(this).attr('title', state ? strings.selectNone : strings.selectAll);
      this.checked = state;
    });
  };

  // Find all <th> with class select-all, and insert the check all checkbox.
  $('th.select-all', table).prepend($('<input type="checkbox" class="form-checkbox" />').attr('title', strings.selectAll)).click(function (event) {
    if ($(event.target).is('input:checkbox')) {
      // Loop through all checkboxes and set their state to the select all checkbox' state.
      checkboxes.each(function () {
        this.checked = event.target.checked;
        // Either add or remove the selected class based on the state of the check all checkbox.
        $(this).closest('tr').toggleClass('selected', this.checked);
      });
      // Update the title and the state of the check all box.
      updateSelectAll(event.target.checked);
    }
  });

  // For each of the checkboxes within the table that are not disabled.
  checkboxes = $('td input:checkbox:enabled', table).click(function (e) {
    // Either add or remove the selected class based on the state of the check all checkbox.
    $(this).closest('tr').toggleClass('selected', this.checked);

    // If this is a shift click, we need to highlight everything in the range.
    // Also make sure that we are actually checking checkboxes over a range and
    // that a checkbox has been checked or unchecked before.
    if (e.shiftKey && lastChecked && lastChecked != e.target) {
      // We use the checkbox's parent TR to do our range searching.
      Drupal.tableSelectRange($(e.target).closest('tr')[0], $(lastChecked).closest('tr')[0], e.target.checked);
    }

    // If all checkboxes are checked, make sure the select-all one is checked too, otherwise keep unchecked.
    updateSelectAll((checkboxes.length == $(checkboxes).filter(':checked').length));

    // Keep track of the last checked checkbox.
    lastChecked = e.target;
  });

  // If all checkboxes are checked on page load, make sure the select-all one
  // is checked too, otherwise keep unchecked.
  updateSelectAll((checkboxes.length == $(checkboxes).filter(':checked').length));
};

Drupal.tableSelectRange = function (from, to, state) {
  // We determine the looping mode based on the order of from and to.
  var mode = from.rowIndex > to.rowIndex ? 'previousSibling' : 'nextSibling';

  // Traverse through the sibling nodes.
  for (var i = from[mode]; i; i = i[mode]) {
    // Make sure that we're only dealing with elements.
    if (i.nodeType != 1) {
      continue;
    }

    // Either add or remove the selected class based on the state of the target checkbox.
    $(i).toggleClass('selected', state);
    $('input:checkbox', i).each(function () {
      this.checked = state;
    });

    if (to.nodeType) {
      // If we are at the end of the range, stop.
      if (i == to) {
        break;
      }
    }
    // A faster alternative to doing $(i).filter(to).length.
    else if ($.filter(to, [i]).r.length) {
      break;
    }
  }
};

})(jQuery);

;/*})'"*/
;/*})'"*/
(function($){Drupal.behaviors.tableHeader={attach:function(context,settings){if(!$.support.positionFixed)return;$('table.sticky-enabled',context).once('tableheader',function(){$(this).data("drupal-tableheader",new Drupal.tableHeader(this))})}};Drupal.tableHeader=function(table){var self=this;this.originalTable=$(table);this.originalHeader=$(table).children('thead');this.originalHeaderCells=this.originalHeader.find('> tr > th');this.displayWeight=null;this.originalTable.bind('columnschange',function(e,display){self.widthCalculated=(self.displayWeight!==null&&self.displayWeight===display);self.displayWeight=display});this.stickyTable=$('<table class="sticky-header"/>').insertBefore(this.originalTable).css({position:'fixed',top:'0px'});this.stickyHeader=this.originalHeader.clone(true).hide().appendTo(this.stickyTable);this.stickyHeaderCells=this.stickyHeader.find('> tr > th');this.originalTable.addClass('sticky-table');$(window).bind('scroll.drupal-tableheader',$.proxy(this,'eventhandlerRecalculateStickyHeader')).bind('resize.drupal-tableheader',{calculateWidth:true},$.proxy(this,'eventhandlerRecalculateStickyHeader')).bind('drupalDisplaceAnchor.drupal-tableheader',function(){window.scrollBy(0,-self.stickyTable.outerHeight())}).bind('drupalDisplaceFocus.drupal-tableheader',function(event){if(self.stickyVisible&&event.clientY<(self.stickyOffsetTop+self.stickyTable.outerHeight())&&event.$target.closest('sticky-header').length===0)window.scrollBy(0,-self.stickyTable.outerHeight())}).triggerHandler('resize.drupal-tableheader');this.stickyHeader.show()};Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader=function(event){var self=this,calculateWidth=event.data&&event.data.calculateWidth;this.stickyOffsetTop=Drupal.settings.tableHeaderOffset?eval(Drupal.settings.tableHeaderOffset+'()'):0;this.stickyTable.css('top',this.stickyOffsetTop+'px');var viewHeight=document.documentElement.scrollHeight||document.body.scrollHeight;if(calculateWidth||this.viewHeight!==viewHeight){this.viewHeight=viewHeight;this.vPosition=this.originalTable.offset().top-4-this.stickyOffsetTop;this.hPosition=this.originalTable.offset().left;this.vLength=this.originalTable[0].clientHeight-100;calculateWidth=true};var hScroll=document.documentElement.scrollLeft||document.body.scrollLeft,vOffset=(document.documentElement.scrollTop||document.body.scrollTop)-this.vPosition;this.stickyVisible=vOffset>0&&vOffset<this.vLength;this.stickyTable.css({left:(-hScroll+this.hPosition)+'px',visibility:this.stickyVisible?'visible':'hidden'});if(this.stickyVisible&&(calculateWidth||!this.widthCalculated)){this.widthCalculated=true;var $that=null,$stickyCell=null,display=null,cellWidth=null;for(var i=0,il=this.originalHeaderCells.length;i<il;i+=1){$that=$(this.originalHeaderCells[i]);$stickyCell=this.stickyHeaderCells.eq($that.index());display=$that.css('display');if(display!=='none'){cellWidth=$that.css('width');if(cellWidth==='auto')cellWidth=$that[0].clientWidth+'px';$stickyCell.css({width:cellWidth,display:display})}else $stickyCell.css('display','none')};this.stickyTable.css('width',this.originalTable.outerWidth())}}})(jQuery);;/*})'"*/
