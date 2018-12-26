  <!-- Footer -->
  <footer id="footer" class="footer bg-black-222">
    <div class="container">
      <div class="row text-center">
        <div class="col-md-6 col-md-offset-3">
          <div class="widget dark mb-60"> <img src="<?php echo $base_url; ?>/sites/all/themes/custom/vivezacare/images/logo-wide-white.png" alt="" class="mt-10 mb-20">
            <p class="font-12"></p>            
          </div>
        </div>
      </div>
      <div class="row border-bottom-black">
        <div class="col-sm-6 col-md-3">
          <div class="widget dark">
            <h5 class="widget-title line-bottom"><?php print t('Quick Contact') ?></h5>
            <?php $block = module_invoke('webform', 'block_view', 'client-block-4');
              print render($block['content']); 
            ?>            
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="widget dark"> 
          <h5 class="widget-title line-bottom"><?php print t('Locate Us'); ?></h5>
          <?php
            $block = block_load('block', '1');
            $output = drupal_render(_block_get_renderable_array(_block_render_blocks(array($block))));
            print $output;
          ?>                     
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="widget dark">
            <h5 class="widget-title line-bottom">Tags</h5>
            <!-- <div class="tags"> -->
            <?php 
              $footer_menu = menu_navigation_links('menu-footer');
              print theme('links__system_footer_menu', array(
                'links' => $footer_menu, 
                // 'heading' => t('footer menu'),              
              ));
            ?>
            <!-- </div> -->
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="widget dark">
            <h5 class="widget-title line-bottom"><?php print t('VIVEZACARE On Mobile') ?></h5>
            <div class="opening-hours">
              <ul class="list-border">
                <li class="clearfix"> <span><?php print t('Coming Soon : '); ?> </span>
                  <div class="value pull-left"> &nbsp;&nbsp;<img src="<?php echo $base_url; ?>/sites/all/themes/custom/vivezacare/images/android.png"> &nbsp;&nbsp;<img src="<?php echo $base_url; ?>/sites/all/themes/custom/vivezacare/images/ios.png"> </div>
                </li>                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid copy-right p-20 bg-black-333">
      <div class="row text-center">
        <div class="col-md-12 font-11 text-white m-0">
          <?php print render($page['footer']); ?>
        </div>
      </div>
    </div>
  </footer>
  <a class="scrollToTop" href="#"><i class="fa fa-angle-up"></i></a>
</div>
<!-- end wrapper -->
