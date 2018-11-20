<?php 
  global $language ;
  $langcode = $language->language;
  include 'page.header.inc' 
?>

<!-- Start main-content -->
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
        <div class="section-content">
          <div class="row">
            <div class="col-md-12">
              <?php print $node->body[$langcode][0]['value']; ?>
              <span><a href="contact.html" class="btn btn-theme-colored btn-flat btn-sm text-uppercase text-center mt-10"><?php echo t('Reach Us'); ?></a></span>
            </div>
		</div><br>
		<div class="row">
			<div class="col-md-7">
				<div class="info-box divider p-20 mt-30" data-bg-img="" style="background-image: url(&quot;&quot;);">
            <h3 class=""><?php echo t('Why Us'); ?></h3>
            <ul class="list list-border check">
              <?php foreach ($node->field_list[$langcode] as $key => $value) { ?>
              <li><a class="" href="#">
                <?php print $value['value'];?>
              </a></li>
              <?php } ?>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



<?php include 'page.footer.inc' ?>