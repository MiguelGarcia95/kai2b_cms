(function($) {
  'use strict';
  $(function() {
    // Remove pro banner on close
    if (document.querySelector('#proBanner_success')) {
      document.querySelector('#bannerClose_success').addEventListener('click',function() {
        document.querySelector('#proBanner_success').classList.add('d-none');
      });
    }

    if (document.querySelector('#proBanner_error')) {
      document.querySelector('#bannerClose_error').addEventListener('click',function() {
        document.querySelector('#proBanner_error').classList.add('d-none');
      });
    }


    if ($("#inline-datepicker").length) {
      $('#inline-datepicker').datepicker({
        enableOnReadonly: true,
        todayHighlight: true,
      });
    }
  });
})(jQuery);
