<?php global $base_url; ?>
<!-- <body class=""> -->
<div id="wrapper">
  <!-- Header -->
  <header id="header" class="header">
    <div class="header-top sm-text-center bg-theme-colored">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="widget m-0">
              <?php               
                print render($page['featured']);
              ?>              
            </div>
          </div>
          <div class="col-md-6">
		      <div class="pull-right mt-5"><a href="#promoModal1" data-lightbox="inline"><i class="fa fa-bars font-24 text-white"></i></a></div>
            <div class="widget no-border m-0">
              <ul class="list-inline pull-right flip sm-pull-none sm-text-center mt-5">
                <li>
                  <div class="header-widget text-white"><i class="fa fa-phone"></i> +918043744701 </div>
                </li>
                <li class="text-white">|</li>
                <li>
                  <div class="header-widget text-white"><i class="fa fa-envelope-o"></i> Info@vivezacare.com </div>
                </li>
                <li class="text-white">|</li>
                <li>
                  <a href="#promoModal1" data-lightbox="inline" class="text-white">Get Quote</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Header Menu -->
    <div class="header-nav">
      <div class="header-nav-wrapper navbar-scrolltofixed bg-lighter">
        <div class="container d-flex justify-content-between">
          <nav id="menuzord-right" class="menuzord orange no-bg"> 
            <a class="menuzord-brand flip" href="<?php print $front_page; ?>"><img src="<?php print $logo; ?>" alt=""></a>
            <!-- main menu starts -->
            <?php print theme('links__system_main_menu', array(
              'links' => $main_menu,
              'attributes' => array(
                // 'id' => 'main-menu-links',
                'class' => array('menuzord-menu'),
              ),
              // 'heading' => array(
              //   'text' => t('Main menu'),
              //   'level' => 'h2',
              //   'class' => array('element-invisible'),
              // ),
            )); ?>
          </nav>
        </div>
      </div>
    </div>
  </header>
  <div id="promoModal1" class="modal-promo-box mfp-hide" data-bg-img="http://placehold.it/1920x1275">
    <div class="row">
      <div class="col-md-12">
        <div class="border-6px p-30 pt-10 pb-0">
          <h5><i class="fa fa-pencil-square-o text-theme-colored"></i> Need Help?</h5>
          <p class="mt-0 text-uppercase">Just make an appointment to get help from our experts</p>

          <!-- Appontment Form Starts -->
          <?php $block = module_invoke('webform', 'block_view', 'client-block-14');
            print render($block['content']); 
          ?>      
          <!-- Appontment Form Ends -->
        </div>
      </div>
    </div>        
    <a href="#" class="button" onClick="$.magnificPopup.close(); return false;">Don't Show me Again</a>
  </div>

  <?php print render($page['content']['metatags']); ?>
