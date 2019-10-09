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

    if (document.querySelector('#proBanner_title')) {
      document.querySelector('#bannerClose_title').addEventListener('click',function() {
        document.querySelector('#proBanner_title').classList.add('d-none');
      });
    }

    if (document.querySelector('#proBanner_category')) {
      document.querySelector('#bannerClose_category').addEventListener('click',function() {
        document.querySelector('#proBanner_category').classList.add('d-none');
      });
    }

    if (document.querySelector('#proBanner_status')) {
      document.querySelector('#bannerClose_status').addEventListener('click',function() {
        document.querySelector('#proBanner_status').classList.add('d-none');
      });
    }

    if (document.querySelector('#proBanner_description')) {
      document.querySelector('#bannerClose_description').addEventListener('click',function() {
        document.querySelector('#proBanner_description').classList.add('d-none');
      });
    }

    if (document.querySelector('#proBanner_user')) {
      document.querySelector('#bannerClose_user').addEventListener('click',function() {
        document.querySelector('#proBanner_user').classList.add('d-none');
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
