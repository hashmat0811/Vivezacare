<?php include 'page.header.inc' ?>

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
              <?php echo $node->body['und'][0]['value']; ?>
<span><a href="contact.html" class="btn btn-theme-colored btn-flat btn-sm text-uppercase text-center mt-10">Reach Us</a></span>
            </div>
		</div><br>
		<div class="row">
			<div class="col-md-7">
				<div class="info-box divider p-20 mt-30" data-bg-img="" style="background-image: url(&quot;&quot;);">
               <h3 class="">Why Us</h3>

               <ul class="list list-border check">
                 <li><a class="" href="#">Assured treatment at reputed hospitals by highly qualified Doctors.</a></li>
                 <li><a class="" href="#">Complete clarity in treatment procedures.</a></li>
                 <li><a class="" href="#">Transparent financials.</a></li>
				  <li><a class="" href="#">Video Conference with the Doctor/s can be arranged if necessary
Facere similique voluptatum Sit amet consectetur adipisicing</a></li>
                 <li><a class="" href="#">Complete assistance from preliminary assessment to final treatment. Inclusive of Transport, accommodation for members accompanying the patients, food, Visa formalities (for foreign patients) and everything else to help you recuperate.</a></li>
               </ul>

             </div>
			</div>
          </div>
        </div>
      </div>
    </section>



<?php include 'page.footer.inc' ?>