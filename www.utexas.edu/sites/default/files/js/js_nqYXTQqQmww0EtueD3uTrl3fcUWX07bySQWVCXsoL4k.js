(function ($, Drupal, window, document, undefined) {

Drupal.behaviors.utexasExpandCollapseAllAccordion = {
  attach: function(context, settings) {
    // Add expand/collapse functionallity when accordion and buttons match.
    if ($('body').has('ul.accordion').length &&
        $('body').has('#expand-all').length &&
        $('body').has('#collapse-all').length)
    {
      // Adjusting the accordion settings to allow bulk expand/collapse.
      $(document).foundation({
        accordion: {
          // Allow multiple accordion panels to be active at the same time.
          multi_expand: true,
          // Allow accordion panels to be closed by clicking on their headers,
          // setting it to false closes accordion panels when another is opened.
          toggleable: true
        }
      });
      // Adding the event to expand and collapse to the buttons in the form.
      $('#expand-all').click(function(){
        utexasSetAccordionToggle('expand');
      });
      $('#collapse-all').click(function(){
        utexasSetAccordionToggle('collapse');
      });
    }
  }
};

function utexasSetAccordionToggle(op) {
  /*
  We do a switch to either expand or collapse all items. Three things need
  to happen based on Foundation's accordion behavior:
    1. Add/remove the active class from li item.
    2. Toggle true/false aria-expanded value from a child item.
    3. Add/remove the active class from div child item.
  */
  switch(op) {
    case 'expand':
      $('.accordion li').each(function(){
        $(this).addClass('active');
        $(this).children('a:first').attr('aria-expanded', 'true');
        $(this).children('div.content').addClass('active');
      });
      break;
    case 'collapse':
      $('.accordion li').each(function(){
        $(this).removeClass('active');
        $(this).children('a:first').attr('aria-expanded', 'false');
        $(this).children('div.content').removeClass('active');
      });
      break;
  }
}

})(jQuery, Drupal, this, this.document);
;
