<div class="post clearfix">

<?php
				 $blog_slides = get_post_meta( get_the_ID( ), 'rnr_blogitemslides', false );	
				 
				 if(!empty($blog_slides)) { ?>           
                   <div class="post-gallery flexslider">
                            <ul class="slides">
                            <?php global $wpdb, $post;
                            if ( !is_array( $blog_slides ) )
                                $blog_slides = ( array ) $blog_slides;
                            if ( !empty( $blog_slides ) ) {
                                $blog_slides = implode( ',', $blog_slides );
                                $images = $wpdb->get_col( "
                                SELECT ID FROM $wpdb->posts
                                WHERE post_type = 'attachment'
                                AND ID IN ( $blog_slides )
                                ORDER BY menu_order ASC
                                " );
                                foreach ( $images as $att ) {
                                    // Get image's source based on size, can be 'thumbnail', 'medium', 'large', 'full' or registed post thumbnails sizes
                                    $image_src = wp_get_attachment_image_src( $att, 'full' );
                                    $image_src2= wp_get_attachment_image_src( $att, '');
                                    $image_src = $image_src[0];
                                    $image_src2 = $image_src2[0];
                                    // Show image
                                    echo '<li><a href="'. $image_src2 . '" data-rel="prettyPhoto"><img src="'.$image_src.'"></a></li>';

                                }
                            } ?>
                            </ul>
                        </div>
<?php } ?>
	
	<div class="post-single-content">
		<div class="post-excerpt"><?php the_content(); ?></div>	    
                 <?php wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>       
			<div class="post-single-meta"><?php get_template_part( 'includes/meta-single' ); ?></div>
		
        
        <div class="post-tags styled-list">
            <ul>
                <?php the_tags( '<ul> <li><i class="fa fa-tags"></i> ', ',&nbsp; </li><li><i class="fa fa-tags"></i> ', ' </li> </ul>'); ?>
            </ul>
        </div><!-- End of Tags -->
	</div>

</div>
