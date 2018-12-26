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
	
	<section class="position-inherit">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <?php print $node->body[$langcode][0]['value']; ?>          
        </div>
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-12">
                  
                  <!-- /.box-header -->
                  <div class="box-body table-responsive">
                    <table id="example1" cellspacing="1" cellpadding="1" style="width: 100%;" class="table table-striped table-hover table-bordered table-hd">
                      <thead>
                        <tr class="gridheader">
                            <td align="center"><?php print t('Sl.No'); ?></td>
                            <td align="center"><?php print t('Services'); ?></td>
                            <td align="center"><?php print t('Prices'); ?></td>
                        </tr>
                      </thead>
                      <tbody>                        
                        <?php $x = 1; ?>
                        <?php foreach ($node->field_test_details[$langcode] as $key => $value) {
                          $field_details = field_collection_item_load($value['value']);
                        ?>
                          <tr>
                            <td align="center"><?php echo $x; ?></td>
                            <td align="center"><?php print $field_details->field_title[$langcode][0]['value']; ?></td>
                            <td align="center"><?php print $field_details->field_speciality[$langcode][0]['value'].'* Onwards'; ?></td>
                          </tr>  
                        <?php $x++; } ?>                              
                      </tbody>
                    </table>
                  </div>
                  <!-- /.box-body -->
                
                </div>
                <!-- /.col -->
              </div>
            </div>
		    <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Read More</h4>
              </div>
              <div class="modal-body">
                <p>At this point of time, this service is available in Bangalore city only. We will be expanding our network to other cities in India shortly.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
		  <div class="col-md-4">
            <div class="">
				<div class="border-6px p-30 pt-10 pb-0">
                <h5><i class="fa fa-pencil-square-o text-theme-colored"></i> Need Help?</h5>
                <p class="mt-0 text-uppercase">Please fill up the form below. We will get back to you with the quotes</p>

                <!-- Appontment Form Starts -->
                <?php $block = module_invoke('webform', 'block_view', 'client-block-9');
                  print render($block['content']); 
                ?>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  

<?php include 'page.footer.inc' ?>