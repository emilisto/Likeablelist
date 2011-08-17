/*
  Likeablelist jQuery plugin
  Author: Emil Stenqvist <emsten@gmail.com>
  
  Licensed under the MIT license
  
  Keep it free, and it's free for you.
*/
(function($) {
  var defaults = {
    nFold: 3,
    verb: 'like this',
    verbSingular: 'likes this',
    separator: ',',
    lastSeparator: 'and',
    qnty: 'others',
    qntySingular: 'other'
  };
  
  $.fn.likeablelist = function(options) {

    options = _.extend({}, defaults, options);

    var beforeFold,
        afterFold,
        excess,
        n,
        expandLink,
        self = this;

    $('li:not(:last)', this).append(function() {
      return $('<span/>')
        .addClass('separator')
        .html(', ');
    });

    n = $('li', this).length;

    $('li:nth-last-child(2) span', this)
      .addClass('last-separator')
      .html(' ' + options.lastSeparator);

    // Create fold only if there are more items than the fold limit
    excess = n - options.nFold;
    if(excess > 0) {
      afterFold = $('li:gt(' + (options.nFold - 1) + ')', this)
        .addClass('after-fold')
      beforeFold = $('li:lt(' + options.nFold + ')')
        .addClass('before-fold');

      $(beforeFold.get(-1), this)
        .addClass('last-before-fold')
        .after(
          $('<li/>')
            .addClass('fold-counter')
            .html(' ' + options.lastSeparator + ' ' + excess + ' ' + (excess > 1 ? options.qnty : options.qntySingular))
            .click(function() {
              self.toggleClass('folded');
            })
        );

      $(afterFold.get(-1), this).addClass('last');
      $(afterFold.get(-2), this).addClass('second-last');
    }

    var expandLink = $('<li/>')
      .addClass('verb')
      .html(n > 1 ? options.verb : options.verbSingular)
      .click(function() {
        self.toggleClass('folded');
      });
    $('ul', self).append(expandLink);
    
    return this;
  };
})(jQuery);
