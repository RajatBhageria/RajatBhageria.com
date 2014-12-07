 <?php global $smof_data; ?> 
 
 

           <!-- START AJAX SECTION -->  
            <div id="ajax-section">     
             <div class="container">  
                         
             <div class="row">

                
                  <!-- START PROJECT NAVIGATION --> 
                  <div id="project-navigation">
                      <ul>
                          <li id="nextProject"><a href="#"></a></li>
                          <li id="prevProject"><a href="#"></a></li>
                       </ul>  
                   </div>
                   <!-- END PROJECT NAVIGATION --> 
                
                   <!-- START PROJECT CLOSE BUTTON -->
                   <div id="closeProject">
                        <a href="#loader"><i class="fa fa-times"></i></a>               
    
                   </div>  
                   <!-- START PROJECT CLOSE BUTTON -->
                 
                   <!-- START PROJECT LOADER SECTION -->
                   <div id="loader"></div>
                   <!-- END PROJECT CLOSE BUTTON -->
                         
                   <!-- START AJAX CONTENT -->
                   <div id="ajax-content-outer">
                        <div id="ajax-content-inner"></div>
                   </div>
                   <!-- END AJAX CONTENT -->
                      
         </div><!-- END ROW -->        
       </div><!-- END CONTAINER -->
        
     </div>
           <!-- END AJAX SECTION -->          
              
          <div class="clear"></div>  
          

 <?php      global $root, $post_id, $portfolio_grid;

	  $portfolio_filters = get_terms('portfolio_filter');
	
	
	  $portfolio_grid_size = get_post_meta(get_the_ID(), 'rnr_portfolio_grid',true);

		switch($portfolio_grid_size) {
			case '1' : $portfolio_grid = 'port-grid2'; break;
			case '2' : $portfolio_grid = 'port-grid3'; break;
			case '3' : $portfolio_grid = 'port-grid4'; break;
			case '4' : $portfolio_grid = 'port-grid5'; break;
			case '5' : $portfolio_grid = 'port-grid6'; break;			
			default : $portfolio_grid = 'port-grid5'; break;		
			
		} 	  
   

 if($smof_data['rnr_enable_portfolio_filter']==true) { ?>    
     <div class="container clearfix">  
   
   <!-- START PORTFOLIO FILTERING -->   
   <div  id="filters" class="sixteen columns">
    <ul class="clearfix">
<?php
								
		
		if($portfolio_filters): ?>
			<ul class="styled-list clearfix">
				<li><a href="#" data-filter="*" class="active"><h3><?php _e('All', 'rocknrolla'); ?></h3></a></li>	
				<?php foreach($portfolio_filters as $portfolio_filter): ?>
					<li><a href="#" data-filter=".term-<?php echo $portfolio_filter->slug; ?>"><h3><?php echo $portfolio_filter->name; ?></h3></a></li>					
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>
    </div><!-- END PORTFOLIO FILTERING -->    
   </div><!-- END CONTAINER --> 
  <?php } ?>	


	

    <?php
       
       $temp = $wp_query;
		$paged = get_query_var('page') ? get_query_var('page') : 1;
	    $port_args = array(
            'post_type' 		=> 'portfolio',
            'posts_per_page' 	=> $smof_data['rnr_portfolio_number'],
            'post_status' 		=> 'publish',
            'orderby' 			=> 'menu_order',
            'order' 			=> 'DESC',
            'paged' 			=> $paged
        );
     
        
        $wp_query = new WP_Query($port_args);
        if( $wp_query->have_posts() ) : ?>
		<div id="portfolio-wrap">
        <?php while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>

        <?php $terms = get_the_terms( get_the_ID(), 'portfolio_filter' ); ?>      
                    
        <div class="<?php if($terms) : foreach ($terms as $term) { echo 'term-'.$term->slug.' '; } endif; ?>portfolio-item <?php echo $portfolio_grid; ?>">
            
            <?php 
                   $taxonomy = strip_tags( get_the_term_list($post->ID, 'portfolio_filter', '', ', ', '') );
			        $port_gallery = get_post_meta( get_the_ID( ), 'rnr_project_item_slides', false );

					if( get_post_meta( get_the_ID(), 'rnr_project_video_embed', true ) != "") {							
						 $lightboxtype = '<div class="thumb-info"></i><h3>'. get_the_title() .'</h3><p class="portfolio-tags">'.$taxonomy.'</p></div>';
				     }
					 
					  else if(!empty($port_gallery)) {
                      $lightboxtype = '<div class="thumb-info"><h3>'. get_the_title() .'</h3><p class="portfolio-tags">'.$taxonomy.'</p></div>';						
		    	     }

				      else{
				      $lightboxtype = '<div class="thumb-info"><h3>'. get_the_title() .'</h3><p class="portfolio-tags">'.$taxonomy.'</p></div>';

				     } 
					 
					 if($smof_data['rnr_disable_portfolio_ajax']==true) {
						 
						 $link = '<a href="' .get_permalink().'" title="'. get_the_title() .'" class="portfolio-image">';
				     }  else { 
					     $link = '<a href="' . home_url('/') . '#!'.__("portfolio-item","portfolio").'/'.$post->post_name.'/" title="'. get_the_title() .'" class="portfolio-image">';
					 }
					
					
					
					 ?>
               
        
            
            
          
            
            
            
                
            <?php
              // IF PORTFOLIO TYPE IS IMAGE					 
              if ( has_post_thumbnail()) { ?>				
                <div class="portfolio">

                  <?php echo $link;
                     $att=get_post_thumbnail_id();
					 if( $portfolio_grid =='port-grid2') {
						 $image_src = wp_get_attachment_image_src( $att, 'span6' );
					 } else {
						 $image_src = wp_get_attachment_image_src( $att, 'span4' );
					 }
					 
					 $image_src = $image_src[0];
                     echo '<img class="portfolio-lazyLoad" src="'.RNR_INDEX_CSS.'/i?w=400&amp;h=250" width="400" height="250" data-original="' .$image_src. '"/><div class="portfolio-overlay">' .$lightboxtype. '</div></a>';
                   } ?>

                </div>
            
                        
        </div> <!-- END OF TERMS -->	
     
    <?php
	
	endwhile; 
	  ?>

	  
  </div><!-- END OF PORTFOLIO WRAP -->

    <div id="port-pagination">
	    <?php posts_nav_link('','',__('Load More Posts', 'rocknrolla')); ?>
        </div>    <?php endif;
       ?>
    <?php 
	
	   $wp_query = null; 
	$wp_query = $temp; ?>

  
               


