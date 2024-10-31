<?php
# This file configures the meta overlay.
# The template in script#nggml-meta-template is an underscore.js template with WordPress Mustache style delimiters, i.e.
#       evaluate:    /<#([\s\S]+?)#>/g,
#       interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
#       escape:      /\{\{([^\}]+?)\}\}(?!\})/g
# You may edit this template to customize the meta overlay.
# The data used in the template is from the members of the JavaScript global object nggml.images.
# Please view this object in the JavaScript console to learn what fields are available to use in the template.
# The object nggml.images is created by the function emit_meta_for_images() in the file nggtags-for-wp-media-library.php.
# The 'the_content' and the 'tml_the_content' filters will be applied to the post_content.
# You can override this template by creating a file <your active theme>/tml/tml-meta-overlay-template.php.
?>
<div id="nggml-meta-overlay" style="display:none;">
    <span id="nggml-meta-overlay-usage">Click the <span class="nggml-alt-gallery-meta" style="display:inline-block;"></span> icon to lock. Turn the wheel to scroll.</span>
    <span id="nggml-meta-overlay-close-hint">Click anywhere in the background to close this window.</span>
    <button class="nggml-meta-overlay-close-button" style="float:right;">X</button>
    <div class="nggml-meta-content">
Lorem ipsum dolor sit amet, utinam nusquam alienum cum ei, no maluisset constituam nec. Eam omnium conclusionemque ea, alia partem consequuntur per ut. Ea has viris mandamus patrioque, vim vidit dolore accommodare ne. Purto doctus constituam qui eu, scripta qualisque has ei, id mea solum verear invidunt. Nec vidit bonorum ea, te minimum fierent sadipscing vix.    
    </div>
    <!-- <button class="nggml-meta-overlay-fullsize-button" style="float:right;">Show Full Size</button> -->
    <!-- You can modify the contents of script#nggml-meta-template to suit your application.                               -->
    <!-- The template in script#nggml-meta-template is an underscore.js template with WordPress Mustache style delimiters. -->
    <!-- The data for the template is provided by the members of the global JavaScript object nggml.images.  Currently:    -->
    <!-- "ID", "post_content", "post_title", "post_excerpt", "post_author", "post_name", "guid", "post_mime_type",         -->
    <!-- "attachment_url", "attachment_image_src_thumbnail", "attachment_image_src_medium",                                -->
    <!-- "attachment_image_src_medium_large", "attachment_image_src_large", "attachment_image_src_full", "srcset",         -->
    <!-- "attachment_link", "taxonomy", "_wp_attached_file", "_wp_attachment_metadata", "_edit_lock",                      -->
    <!-- "_wp_attachment_image_alt", "_edit_last", "img_width", "img_size", "is_titles_view", "is_large_view",             -->
    <!-- "is_miro_view", "is_fullsize_view"                                                                                -->
    <script type="text/html" id="nggml-meta-template">
<h3 style="text-align:center;margin:0.5em;">{{post_title}}</h3>
<# if ( is_titles_view ) { #>
<img class="nggml-meta-overlay-img" src="{{attachment_url}}" width="{{img_width}}" srcset="{{srcset}}" sizes="{{img_width}}px" style="margin-bottom:20px;">
<# } #>
<# if ( ( is_large_view && is_fullsize_view ) || is_miro_view ) { #>
<div id="nggml-meta-overlay-left-col" style="box-sizing:content-box;width:{{img_width}}px;height:100%;padding:0px 10px 0 10px;border:0;margin:0;float:left;">
    <# if ( typeof _wp_attachment_image_alt === 'string' && _wp_attachment_image_alt ) { #>
    <h6 style="text-transform:none;text-align:center;margin:0.5em;">{{_wp_attachment_image_alt}}</h6>
    <# } #>
    <img class="nggml-meta-overlay-img" src="{{attachment_url}}" width="{{img_width}}" srcset="{{srcset}}" sizes="{{img_width}}px"
        style="width:{{img_width}}px;padding:0;border:2px solid black;border-radius:7px;margin:0;">
    <# if ( typeof post_excerpt === 'string' && post_excerpt ) { #>
    <h6 style="text-transform:none;text-align:center;margin:0.5em;">{{post_excerpt}}</h6>
    <# } else { #>
    <br>
    <# } #>
    <# Object.keys( taxonomy ).sort().forEach(function( tax ) { #>
    <span style="font-weight:bold;"><# print( tax ); #>:</span> <# print( taxonomy[ tax ].join( ', ' ) ); #><br>
    <# }); #>
</div>
<div id="nggml-meta-overlay-right-col" style="box-sizing:border-box;width:calc(100% - {{img_width+24+10}}px);border:0;padding:0 0 0 10px;margin:0;float:left;">
<# } #>
<# if ( ( ! is_large_view || ! is_fullsize_view ) && ! is_miro_view ) { #>
    <# if ( typeof post_excerpt === 'string' && post_excerpt ) { #>
    <h6 style="text-transform:none;text-align:center;margin:0.5em;">{{post_excerpt}}</h6>
    <# } #>
    <# if ( typeof _wp_attachment_image_alt === 'string' && _wp_attachment_image_alt ) { #>
    <h6 style="text-transform:none;text-align:center;margin:0.5em;">{{_wp_attachment_image_alt}}</h6>
    <# } #>
    <# Object.keys( taxonomy ).sort().forEach(function( tax ) { #>
    <span style="font-weight:bold;"><# print( tax ); #>:</span> <# print( taxonomy[ tax ].join( ', ' ) ); #><br>
    <# }); #>
<# } #>
<# if ( typeof post_content === 'string' && post_content ) { #>
<div class="nggml-meta-overlay-desc" style="border:1px solid black;padding:5px;margin:5px;overflow:auto;min-height:1em;">{{{post_content}}}</div>
<# } #>
Mime Type: {{post_mime_type}}<br>
Size: {{img_size}}<br>
File: {{_wp_attached_file}}<br> 
Author: {{post_author}}<br>
Image: <a href="{{attachment_url}}" target="blank">{{attachment_url}}</a><br>
Page: <a href="{{attachment_link}}" target="blank">{{attachment_link}}</a><br>
<# if ( ( is_large_view && is_fullsize_view ) || is_miro_view ) { #>
</div>
<# } #>
    </script>
</div>
