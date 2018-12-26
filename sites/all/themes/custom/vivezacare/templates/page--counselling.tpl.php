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
            <h2 class="title"><?php echo $node->field_banner_title[$langcode][0]['value']; ?></h2>
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
             <!-- Professional counselors help clients identify goals and potential solutions to problems which cause emotional turmoil and as a consequence abnormal tendencies. Counseling improves communication, strengthens self-esteem and promotes behavior changes to obtain optimal mental balance. 
          <h4 class="title">For all maladies like </h4>
          <ul>
            <li>• Exam Fever in children</li> 
            <li>• Drug and Alcohol abuse</li>
            <li>• Family strife and resolving personal</li>
            <li>• Social and psychological problems.</li>
          </ul>
          <br/>
            Complete secrecy assured.</br> 
            Experienced, Trained Counselors.</br> 
            Contact Us to lead a Fuller, Healthier, Fruitful life.<br/> -->
          <span><a href="contact.html" class="btn btn-theme-colored btn-flat btn-sm text-uppercase text-center mt-10"><?php echo t('Reach Us'); ?></a></span>
        </div>
      </div>
    </div>
  </div>
</section>


<?php include 'page.footer.inc' ?>
	