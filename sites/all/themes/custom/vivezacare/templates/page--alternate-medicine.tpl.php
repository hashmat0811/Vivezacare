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
            <h2 class="title"><?php echo $node->title; ?></h2>
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
            <?php $x = 1; ?>
              <?php foreach ($node->field_department_lists[$langcode] as $key => $a_field_department_lists) {
                $top_level = field_collection_item_load($a_field_department_lists['value']);
              ?>                  
              <?php //print_r($top_level->field_faq); ?>
                <li class='<?php if ($key == 0){ echo 'active'; } ?>'><a href="#tab<?php echo $x; ?>" data-toggle="tab" style="color:#000"><?php print $top_level->field_title[$langcode][0]['value']; ?></a></li>                    
              <?php $x++; } ?>
            </ul> 
          </div>
        </div>

        <div class="col-md-9">
          <div class="tab-content">
            <?php
              $y = 1;
              foreach ($node->field_department_lists[$langcode] as $key2 => $a_field_specialization_department) {              
              $top_level = field_collection_item_load($a_field_specialization_department['value']);
            ?>                          
              <div class="tab-pane fade <?php if ($key2 == 0){ echo 'in active'; } ?>" id="tab<?php echo $y; ?>">
                <div class="row">
                  <div class="col-md-12 ">
                    <?php                      
                      foreach ($top_level->field_therapy_details[$langcode] as $a_field_disease_list) {
                      $second_level = field_collection_item_load($a_field_disease_list['value']);
                    ?>
                      <h4 class="title"><?php print $second_level->field_title[$langcode][0]['value']; ?></h4>
                      <p style="font-size:16px;"><?php print $second_level->field_description[$langcode][0]['value']; ?></p>
                      <!-- Accordion starts -->
                      <div id="accordion1" class="panel-group accordion transparent">
                        <?php
                          $child = 1; 
                          foreach ($second_level->field_faq[$langcode] as $value) { ?>
                                                  
                          <div class="panel">
                            <div class="panel-title"> <a data-parent="#accordion<?php echo $key2; ?>" data-toggle="collapse" href="#accordion<?php echo $key2.$child; ?>" class="collapsed" aria-expanded="false"> <span class="open-sub"></span> <strong><?php echo 'Q. '.$value['question']; ?></strong></a></div>
                            <div id="accordion<?php echo $key2.$child; ?>" class="panel-collapse collapse" role="tablist" aria-expanded="true" style="height: 0px;">
                              <div class="panel-content">
                                <p><?php echo $value['answer']; ?></p>
                              </div>
                            </div>
                          </div>
                          
                        <?php $child++; } ?>
                      </div>

                      <!-- Accordion ends -->
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

<div class="language">
<?php 
  // print '<pre>'; print_r($node); print '</pre>';
  // print $node->translations->data->language; 
  // $block = module_invoke('locale', 'block_view', 'language');
  // print render($block); 
    $names = array();
    foreach (array_filter($conf['language']) as $language) {
      $names[] = $languages[$language];
      return array('object'=>$names);
      print_r($object);
    }
?>
</div>
<?php include 'page.footer.inc' ?>

<script>
  $(function(){
    var hash = window.location.hash;
    hash && $('ul.nav a[href="' + hash + '"]').tab('show');

    $('.nav-tabs a').click(function (e) {
      $(this).tab('show');
      var scrollmem = $('body').scrollTop() || $('html').scrollTop();
      window.location.hash = this.hash;
      $('html,body').scrollTop(scrollmem);
    });
  });
</script>