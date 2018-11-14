  <!-- Footer -->
  <footer id="footer" class="footer bg-black-222">
    <div class="container">
      <div class="row text-center">
        <div class="col-md-6 col-md-offset-3">
          <div class="widget dark mb-60"> <img src="sites/all/themes/custom/vivezacare/images/logo-wide-white.png" alt="" class="mt-10 mb-20">
            <p class="font-12"></p>            
          </div>
        </div>
      </div>
      <div class="row border-bottom-black">
        <div class="col-sm-6 col-md-3">
          <div class="widget dark">
            <h5 class="widget-title line-bottom">Quick Contact</h5>
             <form method="post" action="quick.php" class="quick-contact-form" name="quick">
              <div class="form-group">
                <input type="text" placeholder="Enter Name" required="" class="form-control" name="form_name" aria-required="true">
              </div>
               <div class="form-group">
                <input type="text" placeholder="Enter Email" required="" class="form-control" name="form_email" aria-required="true">
              </div>
              <div class="form-group">
                <textarea rows="3" placeholder="Enter Message" required="" class="form-control" name="form_message" aria-required="true"></textarea>
              </div>
              <div class="form-group">
                <input type="hidden" value="" class="form-control" name="form_botcheck">
                <button data-loading-text="Please wait..." class="btn btn-default btn-transparent btn-xs btn-flat mt-0" type="submit">Send Message</button>
              </div>
            </form>

            <!-- Quick Contact Form Validation-->
            <script type="text/javascript">
              $("#quick_contact_form2").validate({
                submitHandler: function(form) {
                  var form_btn = $(form).find('button[type="submit"]');
                  var form_result_div = '#form-result';
                  $(form_result_div).remove();
                  form_btn.before('&lt;div id="form-result" class="alert alert-success" role="alert" style="display: none;"&gt;&lt;/div&gt;');
                  var form_btn_old_msg = form_btn.html();
                  form_btn.html(form_btn.prop('disabled', true).data("loading-text"));
                  $(form).ajaxSubmit({
                    dataType:  'json',
                    success: function(data) {
                      if( data.status == 'true' ) {
                        $(form).find('.form-control').val('');
                      }
                      form_btn.prop('disabled', false).html(form_btn_old_msg);
                      $(form_result_div).html(data.message).fadeIn('slow');
                      setTimeout(function(){ $(form_result_div).fadeOut('slow') }, 6000);
                    }
                  });
                }
              });
            </script>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="widget dark"> 
          <h5 class="widget-title line-bottom">Locate Us</h5>          
            <p>No 22 1st Floor, Rear wing Nj Chambers
Venkatswamy naidu road
Bangalore, Karnataka 560051</p>
            <ul class="list-inline mt-5">
              <li class="m-0 pl-10 pr-10"> <i class="fa fa-phone text-theme-colored mr-5"></i> <a class="text-gray" href="#">+918043744701</a> </li>
              <li class="m-0 pl-10 pr-10"> <i class="fa fa-envelope-o text-theme-colored mr-5"></i> <a class="text-gray" href="#"> Info@vivezacare.com</a> </li>
              
            </ul>            
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="widget dark">
            <h5 class="widget-title line-bottom">Tags</h5>
            <div class="tags">
               <a href="specialization.html">CARDIAC</a>
              <a href="specialization.html">ORTHOPEDIC</a>
              <a href="specialization.html">CANCER</a>
              <a href="specialization.html">LIVER DISEASES</a>
              <a href="specialization.html">NEUROLOGY</a>
              <a href="specialization.htmll">GYNAECOLOGY</a>
              <a href="alternate.html">CHELATION THERAPY</a>
              <a href="alternate.html">EECP</a>
              <a href="alternate.html">OZONE THERAPY</a>
              <a href="alternate.html">GLUTHATHIONE</a>
              <a href="alternate.html">COLON HYDROTHERAPY</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="widget dark">
            <h5 class="widget-title line-bottom">VIVEZACARE On Mobile</h5>
            <div class="opening-hours">
                <ul class="list-border">
                  <li class="clearfix"> <span> Coming Soon :  </span>
                    <div class="value pull-left"> &nbsp;&nbsp;<img src="sites/all/themes/custom/vivezacare/images/android.png"> &nbsp;&nbsp;<img src="sites/all/themes/custom/vivezacare/images/ios.png"> </div>
                  </li>
                  
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid copy-right p-20 bg-black-333">
      <div class="row text-center">
        <div class="col-md-12">
          <p class="font-11 text-white m-0">Copyright &copy;2018 VIVEZACARE. All Rights Reserved. Powered By Pentamount Technologies</p>
        </div>
      </div>
    </div>
  </footer>
  <a class="scrollToTop" href="#"><i class="fa fa-angle-up"></i></a>
</div>
<!-- end wrapper -->

<!-- Footer Scripts -->
<!-- JS | Custom script for all pages -->
<!-- <script src="js/custom.js"></script> -->

</body>
</html>