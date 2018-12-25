<?php 
  global $language ;
  $langcode = $language->language;
  include 'page.header.inc' 
?>
 <!-- Start main-content -->
 <div class="main-content">
    <!-- Section: home -->
    <section id="home" class="divider">
      <div class="container-fluid p-0">
        
        <!-- Slider Revolution Start -->
        <div class="rev_slider_wrapper">
          <div class="rev_slider" data-version="5.0">
            <ul>
              <?php 
                $x = 1;
                foreach ($node->field_banner_slider[$langcode] as $slide) {
                $field_details = field_collection_item_load($slide['value']);
              ?>
              <!-- SLIDE <?php echo $x; ?> -->
              <li data-index="rs-<?php echo $x; ?>" data-transition="slidehorizontal" data-slotamount="default" data-easein="default" data-easeout="default" data-masterspeed="default" data-thumb="<?php print file_create_url($field_details->field_banner_image[$langcode][0]['uri']) ?>" data-rotate="0" data-saveperformance="off" data-title="Web Show" data-description="">
                <!-- MAIN IMAGE -->
                <img src="<?php print file_create_url($field_details->field_banner_image['und'][0]['uri']) ?>"  alt="<?php print $field_details->field_banner_image['und'][0]['alt'] ?>"  data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" class="rev-slidebg" data-bgparallax="6" data-no-retina>
                <!-- LAYERS -->

                <!-- LAYER NR. 1 -->
                <div class="tp-caption tp-resizeme text-uppercase font-raleway text-center text-white" 
                  id="rs-<?php echo $x; ?>-layer-1"

                  data-x="['center']"
                  data-hoffset="['0']"
                  data-y="['middle']"
                  data-voffset="['-80']"
                  data-fontsize="['64','64','54','24']"
                  data-lineheight="['95']"

                  data-width="none"
                  data-height="none"
                  data-whitespace="nowrap"
                  data-transform_idle="o:1;s:500"
                  data-transform_in="y:100;scaleX:1;scaleY:1;opacity:0;"
                  data-transform_out="x:left(R);s:1000;e:Power3.easeIn;s:1000;e:Power3.easeIn;"
                  data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
                  data-mask_out="x:inherit;y:inherit;s:inherit;e:inherit;"
                  data-start="1000" 
                  data-splitin="none" 
                  data-splitout="none" 
                  data-responsive_offset="on"
                  style="z-index: 5; white-space: nowrap; font-weight:700;"><?php print $field_details->field_title[$langcode][0]['value'].' '; ?><span class="text-theme-colored"><?php print $field_details->field_speciality[$langcode][0]['value'] ?></span>
                </div>

                <!-- LAYER NR. 2 -->
                <div class="tp-caption tp-resizeme text-center font-raleway text-white" 
                  id="rs-<?php echo $x; ?>-layer-2"

                  data-x="['center']"
                  data-hoffset="['0']"
                  data-y="['middle']"
                  data-voffset="['0']"
                  data-fontsize="['18']"
                  data-lineheight="['34']"

                  data-width="none"
                  data-height="none"
                  data-whitespace="nowrap"
                  data-transform_idle="o:1;s:500"
                  data-transform_in="y:100;scaleX:1;scaleY:1;opacity:0;"
                  data-transform_out="x:left(R);s:1000;e:Power3.easeIn;s:1000;e:Power3.easeIn;"
                  data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
                  data-mask_out="x:inherit;y:inherit;s:inherit;e:inherit;"
                  data-start="1400" 
                  data-splitin="none" 
                  data-splitout="none" 
                  data-responsive_offset="on"
                  style="z-index: 5; white-space: nowrap; font-weight:500;"><?php print $field_details->field_description[$langcode][0]['value'] ?>
                </div>

                <!-- LAYER NR. 3 -->
                <div class="tp-caption tp-resizeme" 
                  id="rs-<?php echo $x; ?>-layer-3"

                  data-x="['center']"
                  data-hoffset="['0']"
                  data-y="['middle']"
                  data-voffset="['80']"

                  data-width="none"
                  data-height="none"
                  data-whitespace="nowrap"
                  data-transform_idle="o:1;s:500"
                  data-transform_in="y:100;scaleX:1;scaleY:1;opacity:0;"
                  data-transform_out="x:left(R);s:1000;e:Power3.easeIn;s:1000;e:Power3.easeIn;"
                  data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
                  data-mask_out="x:inherit;y:inherit;s:inherit;e:inherit;"
                  data-start="1600" 
                  data-splitin="none" 
                  data-splitout="none" 
                  data-responsive_offset="on"
                  style="z-index: 5; white-space: nowrap; letter-spacing:1px;"><a class="btn btn-default btn-lg btn-circled mr-10" href="contact"><?php print t('Signup Now'); ?></a> <a class="btn btn-colored btn-lg btn-circled btn-theme-colored" href="specialization"><?php print t('View Details'); ?></a>
                </div>
              </li>
              <?php $x++; } ?>


            </ul>
          </div><!-- end .rev_slider -->
        </div>
        <!-- end .rev_slider_wrapper -->
        <script>
          $(document).ready(function(e) {
            var revapi = $(".rev_slider").revolution({
              sliderType:"standard",
              jsFileLocation: "sites/all/themes/custom/vivezacare/revolution-slider/js/",
              sliderLayout: "auto",
              dottedOverlay: "none",
              delay: 5000,
              navigation: {
                  keyboardNavigation: "off",
                  keyboard_direction: "horizontal",
                  mouseScrollNavigation: "off",
                  onHoverStop: "off",
                  touch: {
                      touchenabled: "on",
                      swipe_threshold: 75,
                      swipe_min_touches: 1,
                      swipe_direction: "horizontal",
                      drag_block_vertical: false
                  },
                  arrows: {
                      style: "gyges",
                      enable: true,
                      hide_onmobile: false,
                      hide_onleave: true,
                      hide_delay: 200,
                      hide_delay_mobile: 1200,
                      tmp: '',
                      left: {
                          h_align: "left",
                          v_align: "center",
                          h_offset: 0,
                          v_offset: 0
                      },
                      right: {
                          h_align: "right",
                          v_align: "center",
                          h_offset: 0,
                          v_offset: 0
                      }
                  },
                    bullets: {
                    enable: true,
                    hide_onmobile: true,
                    hide_under: 800,
                    style: "hebe",
                    hide_onleave: false,
                    direction: "horizontal",
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 30,
                    space: 5,
                    tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-imageoverlay"></span><span class="tp-bullet-title"></span>'
                }
              },
              responsiveLevels: [1240, 1024, 778],
              visibilityLevels: [1240, 1024, 778],
              gridwidth: [1170, 1024, 778, 480],
              gridheight: [720, 768, 960, 720],
              lazyType: "none",
              parallax:"mouse",
              parallaxBgFreeze:"off",
              parallaxLevels:[2,3,4,5,6,7,8,9,10,1],
              shadow: 0,
              spinner: "off",
              stopLoop: "on",
              stopAfterLoops: 0,
              stopAtSlide: -1,
              shuffle: "off",
              autoHeight: "off",
              fullScreenAutoWidth: "off",
              fullScreenAlignForce: "off",
              fullScreenOffsetContainer: "",
              fullScreenOffset: "0",
              hideThumbsOnMobile: "off",
              hideSliderAtLimit: 0,
              hideCaptionAtLimit: 0,
              hideAllCaptionAtLilmit: 0,
              debugMode: false,
              fallbacks: {
                  simplifyAll: "off",
                  nextSlideOnWindowFocus: "off",
                  disableFocusListener: false,
              }
            });
          });
        </script>
        <!-- Slider Revolution Ends -->
      </div>
    </section>

    <!-- Section: about -->
	<section id="about">
    <div class="container pt-0">
      <div class="section-content">
        <div class="row">
          <?php 
            $x = 1;
            foreach ($node->field_service_teasers[$langcode] as $value) {
              $field_details = field_collection_item_load($value['value']);
          ?>
            <div class="col-md-4">
              <div class="icon-box bg-lighter text-center p-30 mt-sm-0" data-margin-top="-90px" style="margin-top: -90px;">
                <a href="<?php print $field_details->field_link['und'][0]['url']; ?>" class="icon icon-gray icon-circled icon-xl">
                  <img class="img-circle border-7px" src="<?php print file_create_url($field_details->field_image['und'][0]['uri']) ?>"  alt="<?php print $field_details->field_image['und'][0]['alt'] ?>">
                </a>
                <h4 class="icon-box-title text-uppercase letter-space-3"><a class="text-theme-colored" href="<?php print $field_details->field_link['und'][0]['url']; ?>"><?php print $field_details->field_title[$langcode][0]['value']; ?></a></h4>
                <?php $field_details->field_description[$langcode][0]['value'] ?>
                <a href="<?php print $field_details->field_link[$langcode][0]['url']; ?>" class="btn btn-theme-colored btn-flat btn-sm text-uppercase mt-10"><?php print t('More info') ?></a>
              </div>
            </div>
          <?php } ?>
		  <section id="newabout">
        <div class="container">
          <div class="row" >
            <div class="col-md-7">
              <h2 class="text-uppercase mt-20 letter-space-3"><?php print $node->field_title[$langcode][0]['value']; ?><span class="text-theme-colored"><?php print $node->field_speciality[$langcode][0]['value']; ?></span></h2>
              <?php print $node->field_description[$langcode][0]['value'] ?>              
              <a href="about-vivezacare" class="btn btn-flat btn-theme-colored text-uppercase mt-20"><?php print t('Read More'); ?></a>
            </div>
        
            <div class="col-md-5">
              <div class="p-20 mt-30">
                <ul id="myTab" class="nav nav-tabs boot-tabs">
                  <li class="active"><a href="#profile" data-toggle="tab"><?php print t('Indian'); ?></a></li>
                  <li><a href="#profile1" data-toggle="tab"><?php print t('International'); ?></a></li>
                </ul>
                <div id="myTabContent" class="tab-content">
                  <div class="tab-pane fade in active" id="profile">
                    <p><iframe width="560" height="315" src="<?php print $node->field_embedded_link['und'][0]['value']; ?>https://www.youtube.com/embed/xNeIdfFTTzg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></p>
                  </div>
                  <div class="tab-pane fade" id="profile1">
                    <p><iframe width="560" height="315" src="<?php print $node->field_embedded_link['und'][1]['value']; ?>https://www.youtube.com/embed/WwKwtzJH4SI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</section>	
	<!--get Goute form-->
     

	 
    <!-- Section: Services -->
    <section id="services">
      <?php
        foreach ($node->field_services[$langcode] as $key => $value) {
          $top_level = field_collection_item_load($value['value']);
      ?>
        <div class="container pb-40">
          <div class="section-title text-center">
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <h2 class="title text-uppercase"><?php print $top_level->field_speciality[$langcode][0]['value'].' '; ?> <span class="text-black font-weight-300"><?php print $top_level->field_title[$langcode][0]['value']; ?></span></h2>
                <p class="text-uppercase letter-space-4"><?php print $top_level->field_description[$langcode][0]['value']; ?></p>
              </div>
            </div>
          </div>
          <div class="section-content">
            <div class="row">
              <?php 
                foreach ($top_level->field_service_details[$langcode] as $key => $service_details) {
                  $second_level = field_collection_item_load($service_details['value']);                 
              ?>
                <div class="col-md-4">
                  <div class="icon-box text-center p-0 mb-40">
                    <a class="icon mb-10 mr-30 ml-30 mt-10" href="<?php print $second_level->field_link['und'][0]['url'] ?>">
                      <img src="<?php print file_create_url($second_level->field_image['und'][0]['uri']); ?>" alt="<?php print $second_level->field_image['und'][0]['alt']; ?>" />
                      <!-- <i class="flaticon-medical-ambulance9 font-54 text-theme-colored"></i> -->
                    </a>
                    <div>
                      <h5 class="icon-box-title mt-15 mb-10 text-uppercase letter-space-2"><strong><?php print $second_level->field_title[$langcode][0]['value']; ?></strong></h5>
                      <?php print $second_level->field_description[$langcode][0]['value']; ?>
                    </div>
                  </div>
                </div>
              <?php } ?>
              
            </div>
          </div>
          <p align="center"><a href="specialization.html" class="btn btn-theme-colored btn-flat btn-sm text-uppercase text-center mt-10"><?php print t('More info') ?></a></p>
        </div>
      <?php } ?>
    </section>
   
	  <!-- <section id="services">
      <div class="container pb-40">
        <div class="section-title text-center">
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <h2 class="title text-uppercase">ALTERNATIVE <span class="text-black font-weight-300">MEDICINE</span></h2>
              <p class="text-uppercase letter-space-4">Affordable Healthcare Solutions</p>
            </div>
          </div>
        </div>

		    <div class="section-content">
          <div class="row">

            <div class="col-md-4">
              <div class="icon-box text-center p-0 mb-40">
                <a class="icon mb-10 mr-30 ml-30 mt-10" href="#">
                  <i class="flaticon-medical-mother19 font-54 text-theme-colored"></i>
                </a>
                <div>
                  <h5 class="icon-box-title mt-15 mb-10 text-uppercase letter-space-2"><strong>CHELATION THERAPY</strong></h5>
                  <p>Chelation therapy is a medical procedure that involves the administration of chelating agents to remove heavy metals from the body</p>				  
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="icon-box text-center p-0 mb-40">
                <a class="icon mb-10 mr-30 ml-30 mt-10" href="#">
                  <i class="flaticon-medical-mother19 font-54 text-theme-colored"></i>
                </a>
                <div>
                  <h5 class="icon-box-title mt-15 mb-10"><strong>EECP</strong></h5>
                  <p>EECP is an outpatient treatment for patients suffering from chest pain and poor heart function. During the treatment the patient lies on a comfortable with large BP</p>      
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="icon-box text-center p-0 mb-40">
                <a class="icon mb-10 mr-30 ml-30 mt-10" href="#">
                  <i class="flaticon-medical-mother19 font-54 text-theme-colored"></i>
                </a>
                <div>
                  <h5 class="icon-box-title mt-15 mb-10"><strong>OZONE THERAPY</strong></h5>
                  <p>Ozone therapy is a form of alternative medicine treatment that purports to increase the amount of oxygen to the body through the introduction of ozone into the body.</p>				 
                </div>
              </div>
            </div>  
            <div class="col-md-4">
              <div class="icon-box text-center p-0 mb-40">
                <a class="icon mb-10 mr-30 ml-30 mt-10" href="#">
                  <i class="flaticon-medical-mother19 font-54 text-theme-colored"></i>
                </a>
                <div>
                   <h5 class="icon-box-title mt-15 mb-10"><strong>GLUTHATHIONE</strong></h5>
                  <p>GLUTATHIONE is the most important molecule you need to stay healthy and prevent aging, cancer, heart disease, dementia and more, and necessary to treat everything</p>
				 
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="icon-box text-center p-0 mb-40">
                <a class="icon mb-10 mr-30 ml-30 mt-10" href="#">
                  <i class="flaticon-medical-mother19 font-54 text-theme-colored"></i>
                </a>
                <div>
                  <h5 class="icon-box-title mt-15 mb-10"><strong>COLON HYDROTHERAPY</strong></h5>
                  <p>Athletes have opted for colon therapy to improve metabolic efficiency. Many receive the treatments during a period of lifestyle change or as a preventive measure.</p>
				  
                </div>
              </div>
            </div> 
          </div>
        </div><p align="center"><a href="alternate.html" class="btn btn-theme-colored btn-flat btn-sm text-uppercase text-center mt-10">More info</a></p>
       
      </div>
    </section>       -->
  </div>
  <!-- end main-content -->

<?php include 'page.footer.inc' ?>