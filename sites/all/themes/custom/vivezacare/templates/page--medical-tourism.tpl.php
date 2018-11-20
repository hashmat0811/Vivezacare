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
            <h2 class="title"><?php print $title; ?></h2>
        <!-- <p class="text-uppercase letter-space-4">Affordable Healthcare Solutions</p> -->
          </div>
        </div>
      </div>
    </div>
  </section>
    
	<section>
    <div class="container">
      <div class="section-content">
        <div class="row">
          <div class="col-md-12">
            <?php print $node->body[$langcode][0]['value']; ?>
            <span><a href="contact.html" class="btn btn-theme-colored btn-flat btn-sm text-uppercase text-center mt-10">Reach Us</a></span>
          </div>
		    </div><br>
        <div class="row">
          <!-- List of Doctors -->
          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-heading"><?php print $node->field_title[$langcode][0]['value']; ?></div>
              <div class="panel-body">
                <?php print $node->field_description[$langcode][0]['value']; ?>
              </div>
              <table class="table">
                <?php foreach ($node->field_list_of_doctors[$langcode] as $list) {
                  $field_details = field_collection_item_load($list['value']);
                ?>                
                  <tr>
                    <td><?php print $field_details->field_title[$langcode][0]['value']; ?></td>
                    <td><?php print $field_details->field_speciality[$langcode][0]['value']; ?></td>
                  </tr>
                <?php } ?>
              </table>
            </div>
          </div>

          <!-- List of hospitals -->
          <div class="col-md-6">
            <?php foreach ($node->field_hospitals_list[$langcode] as $list) {
              $field_details = field_collection_item_load($list['value']);
            ?> 
            <div class="panel panel-default">
              <div class="panel-heading"><?php print $field_details->field_title[$langcode][0]['value']; ?></div>
              <div class="panel-body">
                <?php print $field_details->field_description[$langcode][0]['value']; ?>
              </div>
              <table class="table">
              <?php foreach ($field_details->field_list[$langcode] as $key => $value) { ?>
                <tr>
                  <td><?php print $value['value'] ?></td>
                </tr>              
              <?php } ?>
              </table>
            </div>
            <?php } ?>              
          </div>
        </div>

    </div>
  </section>
	
<?php include 'page.footer.inc' ?>