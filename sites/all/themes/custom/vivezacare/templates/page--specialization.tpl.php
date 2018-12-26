<?php 
  global $language ;
  $langcode = $language->language;
  include 'page.header.inc' 
?>

<div class="main-content">
  <section class="inner-header divider parallax layer-overlay overlay-white-8" data-bg-img="http://placehold.it/1920x1275" style="background-image: url(&quot;http://placehold.it/1920x1275&quot;); background-position: 50% 62px;">
    <div class="container pt-60 pb-60">
      <!-- Section Content -->
      <div class="section-content">
        <div class="row">
          <div class="col-md-12 text-center">
            <h2 class="title"><?php echo $node->field_banner_title[$langcode][0]['value']; ?></h2>
            <!-- <p class="text-uppercase letter-space-4">Affordable Healthcare Solutions</p> -->
          </div>
        </div>
      </div>
    </div>
  </section>
	
  <section>
    <div class="container">
      <div class="row">                  
        <div class="col-md-3">
          <div class="vertical-tab">
            <ul class="nav nav-tabs">
            <?php $x = 16; ?>
              <?php foreach ($node->field_specialization_department[$langcode] as $key => $a_field_specialization_department) {
                $top_level = field_collection_item_load($a_field_specialization_department['value']);
              ?>                  
                <li class='<?php if ($key == 0){ echo 'active'; } ?>'><a href="#tab<?php echo $x; ?>" data-toggle="tab" style="color:#000"><?php print $top_level->field_title[$langcode][0]['value']; ?></a></li>                    
              <?php $x++; } ?>
            </ul> 
          </div>
        </div>
        
          
        <div class="col-md-9">
          <div class="tab-content">
            <?php $y = 16; ?>
            <?php foreach ($node->field_specialization_department[$langcode] as $key2 => $a_field_specialization_department) {
              $top_level = field_collection_item_load($a_field_specialization_department['value']);
            ?>                          
              <div class="tab-pane fade <?php if ($key2 == 0){ echo 'in active'; } ?>" id="tab<?php echo $y; ?>">
                <div class="row">
                  <div class="col-md-12 ">
                    <?php foreach ($top_level->field_disease_list[$langcode] as $a_field_disease_list) {
                      $second_level = field_collection_item_load($a_field_disease_list['value']);
                    ?>
                      <h4 class="title"><?php print $second_level->field_title[$langcode][0]['value']; ?></h4>
                      <p style="font-size:16px;"><?php print $second_level->field_description[$langcode][0]['value']; ?></p>
                    <?php } ?>
                  </div>                  
                </div>
              </div>
            <?php $y++; } ?>
          </div>
        </div>
      </div>
    </div>
  </section>

  
<?php include 'page.footer.inc' ?> 