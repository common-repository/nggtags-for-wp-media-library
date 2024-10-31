/*  
    Copyright 2013-2017  B68C, Magenta Cuda

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

window.nggml = window.nggml || {};

var nggmlAltGallery = ( function() {
  
    var galleryShowingMetaOverlay;   // the gallery currently showing the meta overlay 
    var template;

    function showMetaOverlay( id, element ) {
        var meta           = nggml.images[ id ];                                                                    // get the corresponding meta object using the id
        if ( typeof meta === 'undefined' ) {
            return;
        }
        var $overlay          = jQuery( 'div#nggml-meta-overlay' );                                                 // this will display the meta overlay
        var $container        = jQuery( element ).closest( 'div.nggml-galleries-container' );
        meta.is_fullsize_view = $container.hasClass( 'nggml-galleries-container-full-view' );
        meta.is_titles_view   = $container.hasClass( 'nggml-gallery-titles' );
        meta.is_large_view    = $container.hasClass( 'nggml-gallery-large' );
        meta.is_miro_view     = $container.hasClass( 'nggml-gallery-miro' );
        meta.img_width        = Math.round( meta.is_titles_view ? 
                                                $overlay.width() - 10 : 4 * $overlay.width() / 10 );                // set the image dimensions in the meta object
        meta.img_size         = meta._wp_attachment_metadata.width + ' x ' + meta._wp_attachment_metadata.height;
        //var html        = $overlay.find( 'script#nggml-meta-template' ).text();                                   // the text of the script is the template
        //html            = html.replace( /\{\{(\w+)\}\}/g, function( m0, m1 ) {                                    // instantiate the template using the meta object
        //    return meta.hasOwnProperty( m1 ) ? meta[m1] : 'null';
        //});
        if ( typeof template === 'undefined' ) {
            template = _.template( $overlay.find( 'script#nggml-meta-template' ).html(), null, {                    // the text of the script is the template
                evaluate:    /<#([\s\S]+?)#>/g,
                interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
                escape:      /\{\{([^\}]+?)\}\}(?!\})/g
            } );
        }
        var html = template( meta );                                                                                // instantiate the template using the meta object
        $overlay.find( 'div.nggml-meta-content' ).html( html );                                                     // replace the HTML of the overlay with the instantiated template
        return $overlay;
    }

    var touchOnly  = /Android|Silk|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var altGallery = {
        gallery: function() {        // the gallery constructor
            this.images     = [];
            this.meta       = {};
            this.metaLocked = false;
        },
        touchOnly:          touchOnly,
        loading:            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAEsCAMAAADaaRXwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAICAgQEBAYGBggICAoKCgwMDA4ODhAQEBISEhQUFBYWFhgYGBoaGhwcHB4eHiAgICIiIiQkJCYmJigoKCoqKiwsLC4uLjAwMDIyMjQ0NDY2Njg4ODo6Ojw8PD4+Pj8/P0FBQUNDQ0VFRUdHR0lJSUtLS01NTU9PT1FRUVNTU1VVVVdXV1lZWVtbW11dXV9fX2FhYWNjY2VlZWdnZ2lpaWtra21tbW9vb3FxcXNzc3V1dXd3d3l5eXt7e319fYCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKOadXYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAApBSURBVHhe7ZxrW9pKFEa5VEWLFUUUFBVbrSiK2lpvCOT//6qTzOwks0O49QTPm/O860uZzQDJrMx9bMEjUFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBjzhPQqLjsS/a+RyzFE1yRpw4HE8sc8Id2CS0Wi/zVyOYbomiRtqEksf1AIGBQCBoWAQSFgUAgYFALG/0iITEEMnId8LnI5BpRryggKAYNCwFiJkGH/tFHbqlSqtebxzYcE03i66hwf1r4Grf632n774vZN3kgyuKrvVCpbtaO7YZCUyzFE1/Tg8CSxkaQDJDa6bdWrlcp242fqj33cNGublUqtcf5i0u/y6YBnE1kt2QsZd78VJbulevoubynGd40vksNh5zwl89tB/I2lM9+wvDZE1yRpQzjKepV0gIm9HZYlWSgUm68mk8PgyLn26r0fcQugaTOtlKyFjLubkteh1J4s5bsNeTNJ+WIsWUK+x2UYsH7/90J6+hlYe7DZQq7128XOOO9C3nYkZ4LST8kgjFvyRhrbqpWbzFpUF7WMkLa8jCgGlSDiXKIxjXG+hfTXJOMk55LFcizRdPbcOrIvwWksIWTCh1/dnLr7Q2IuR7kWcqs7D01bMgVcSmwaF5LPJ62UFIsLSfFRKBxLTn+EUZKQYlv+DcibkN+6rU/yQ7L5I5npFcmyPpKc3tMsx4aFhaR/U9kM2wKqEplOzoS8r0uuKRR/S8ZkW12u7jZr2tGV5PTqEpjOwkKmcC1Z+5KeQc6EJDvfcrIebIVdg9sMFDavTXUYd90nuGHyed6LpGfwb4WcSNY9Sc8gX0JeVJNQPPPnYa+XuhHr2pzvkjRsRr3qkUQCvkgs0eyXaodf5WXEvxWya3MOJCmstS4vD5NVPl9CGpLHsCbDyectCRg2bRV5u+r4k2W521sTCrizAYtM2dTHC42gvU+OrJcSUu89P3X1DEg+r369sG1m8YNErcmVkJEao0TF/CQByy+JWl4fe5ff5bXPb8lkeDShD0lZWibmjQ8lbVlGiP21gZq7bpiYdyZJw5ewp9ddWK6EqD6xKkEfNY1wij/B8HpfGbVTaPXYFsPG7V3lXEJIeIRL35SNqcoQ9iuJdjhXQtRU706CPr8kZNiTYIKnC23DxwpRw7G4OFTPsoSQnkTHkrbYWE1ShngVUdXGXAlRN+RMf9XNS/PgMLg7r6esMYqQjqQMMiTweZSIYXEhxWgBQPUiNqSaMRsKuJCIIVdC3NFPUWIGNVSRmGH00KlPnbpYIWokHS87vUnEsLiQ+Oq/ScRgQ64j57lRjWauhLhFq7Kpm4+XDfuHqSsVIVZIU1KGPyZkcFv2xYXEJ5NVdbahiqQCtm0o4FlChlwJkRyGsDgM6ubDDYiHeesUVohqwZ3NC/dxXlxIONtMFeKGnDGJ6gJzJSS1jAJU0UtMjTEt5YZaRkxpsuKeVvVLiwuJyzNFiOs+nJb69CRkyJUQt9xVH+IuoMid/pRkxEarP9KFl9Kp21BAes8gacPyQk4lZYhbVvWU5EqIGsc7o6yRhAz284nF3s0zOwtMEaKKIx5lPUjEkJEQtSMQ/5Sq37kSouYhzj6caoRtK66mERvhaqsuZivkXlKGuDhUi5eRkFtJGWSNJxGNvqBdcwjP5PUlbZETFe+StMSep7OckHU5fqExCyKq7MLy8FEzdbuq7i5Qle3ZjoAbCRmskKGkDMUw64eauGQkRE//j+yGzG89LA+/QH08/H1dUtK+qt8vdGxwJssJScdc0li1Q3I9ybUss2SnGrF4w04PqeQL1NrugTy3egk4IyFqsdkfaN38GT52EntauRKiR0Qbshn1opZrbTEpR/FW+0vKWpZ3IknLXrDmN9Rri5kJWWDrJV9CntXjVAqOob0ljtXYxV7VV0Rzg4GemcgN/ZGkUN5p7iT3ibMSMvc0Rd6E6IGjz1pyx1C6P92K2T59fJ3ILDekNxdTyUyIWiFLJWdChnrjZ4J1mWoP9ZpJ/Uf3sj2xphUOSPS+URqZCZl4oibImRDvceapk6KdbfjMP7jgzATmbnVnJ0RvehrKqRsAeREy20g8CJ/fNjgns57TvtNVmqGQYfJRKT+qDi93QrzHZLcR8SXeO08s4kZsu5PluPBSTt813BFRhkL8+brSv/2sRyD5E+INJmu9oRrP/3zGabkaQ/fq16KjcpMrX7WRmzNTId5LO3qm9m78eU/ehXheL2VctNmN9uos45/JXnzzxg+7I1+nRj2o0ULxbKzuM1sh/rXdXZw0j867dgiSfyGe96upSnt9322tQkYdZ4pSql+ZCuGuHO2bbJaPk0hJ6SCYcq5SiAZOyN/xetNpNWu7zXanO/Wvjj6ebn8c79Wbp51+3DxN5bFz3Nhtnl4OJJ09T6lffS1laTiV4CpZjZA84te+rd1Wp3v/4j4fagPAOZS/MihEcHch1+PzY6p1Cvq5VUMhIe6Adz08uai6kOLq2ssYCglRB7NqdpjeU/Mqd5yxMigkJPHXFDut04PECP4zWiwKiVBbnml8k4yrhUJCxnNW+ovOQb0VQiERc/6c8TPGvD4UEtObZeSTfFCIy+3Uxer1T+nQAyjE5aOduqOzdjLrf9DJFgrRjPqtr2qLuVQ9uk+sVa8UCknhrd/tXnU637vd28/4H5kUFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhYBBIWBQCBgUAgaFgEEhYFAIGBQCBoWAQSFgUAgYFAIGhUDhef8AzRE/I9cMS5cAAAAASUVORK5CYII=',
        transitionInterval: 1.5,
        transition:         '',
        hScrollbarHeight:   touchOnly ? 0 : 20,     // TODO: calculate these for each browser
        vScrollbarWidth:    20,
        scrollContainerToTop: function( item ) {    // scroll the gallery container of item to the top of the browser viewport adjusting for top margin and admin bar if present
            var $body        = jQuery( 'body' );
            var $divAdminBar = jQuery( 'div#wpadminbar' );
            var $container   = jQuery( item ).parents( 'div.nggml-galleries-container' );
            var $navbar      = $container.find( 'div.nggml-alt-gallery-controls ul.nggml-navbar' );
            var $gallery     = $container.find( 'div.nggml-alt-gallery-container' );
            var $view        = $navbar.is( ':visible' ) ? $container: $gallery;
            var top          = $view.offset().top - ( jQuery( window ).height() - $view.height() ) / 2;
            if ( $divAdminBar.length ) {
                top -= $divAdminBar.outerHeight( true );
            }
            $body.scrollTop( top );
            if ( $body.scrollTop() !== top ) {
                jQuery( 'html' ).scrollTop( top );
            }
        },
        setImgSrc: function( img, image, sizes, title ) {
            var src;
            if ( image.attachment_image_src_medium_large ) {
                src = image.attachment_image_src_medium_large[0];
            } else if ( image.attachment_image_src_large ) {
                src = image.attachment_image_src_large[0];
            } else {
                src = image.attachment_url;
            }
            if ( img.src === src ) {
                return true;   // img is already loaded
            }
            img.src = src;
            if ( image.srcset ) {
                img.srcset = image.srcset;
                img.sizes  = sizes ? sizes : jQuery( img.parentNode ).width() + 'px';
            } else {
                img.srcset = '';
                img.sizes  = '';
            }
            var dataset       = img.dataset;
            dataset.title     = title ? title : '';
            dataset.loadState = 'loading';
            return false;   // img needs to be loaded
        },
        preFlipLargeImage: function( divLarge, self, clearOther ) {   // set the css for img element before the flip
            var $divLarge = jQuery( divLarge );
            var $imgs     = $divLarge.find( 'img.nggml-large-image' );
            if ( divLarge.dataset.flippingImg !== '-1' ) {
                // an img is currently being flipped so reuse that one; this happens if the server takes too long to send the image; reusing means abandoning the previous image request
                return $imgs[ parseInt( divLarge.dataset.flippingImg, 10 ) ];
            }
            var image;                                        // the image to be flipped - this image is not currently visible but will become visible after it is flipped
            var other;                                        // this image is currently visible but will become hidden after the flip
            if ( $imgs[0].dataset.flipState === 'other' ) {
                image                        = $imgs[0];
                other                        = $imgs[1];
                divLarge.dataset.flippingImg = '0';
            } else {
                image                        = $imgs[1];
                other                        = $imgs[0];
                divLarge.dataset.flippingImg = '1';
            }
            var style            = image.style;
            var otherStyle       = other.style;
            self.imageTransition = style.transition;
            style.transition     = '';                        // no transitions when setting the pre flipped css
            if ( nggmlTransition === 'slide-left' ) {         // the pre flipped css depends on the the type of transition
                style.zIndex      = '100';
                style.left        = '100%';
                otherStyle.zIndex = '200';
            } else if ( nggmlTransition === 'fade' ) {
                style.zIndex      = '100';
                otherStyle.zIndex = '200';
            } else if ( nggmlTransition === 'flip' ) {
            } else if ( nggmlTransition === 'explode' || nggmlTransition === 'rotation' ) {
                style.zIndex  = '200';
                style.opacity = '1';
                style.height  = style.width = '0';
                if ( nggmlTransition === 'rotation' ) {
                    style.transform = 'translate(-50%,-50%) rotate(90deg)';
                }
                otherStyle.zIndex = '100';
            } else if ( nggmlTransition === 'reveal-left' ) {
                var parentParentStyle         = image.parentNode.parentNode.style;
                self.containerTransition      = parentParentStyle.transition;
                parentParentStyle.transition  = '';
                parentParentStyle.width       = '0%';
                parentParentStyle.opacity     = '1';
                parentParentStyle.zIndex      = style.zIndex = '200';
                image.parentNode.style.width  = $divLarge.width()  + 'px';
                image.parentNode.style.height = $divLarge.height() + 'px';
                otherStyle.zIndex             = other.parentNode.parentNode.style.zIndex = '100';
            }
            if ( clearOther ) {
                other.sizes = other.srcset = other.src = '';
            }
            image.dataset.flipState = 'flipping';
            other.dataset.flipState = 'other';
            return image;
        },
        flipLargeImage: function( divLarge, image, self ) {      // flip images only after the img element has loaded. set the css for the img element after the flip
            if ( image.dataset.flipState !== 'flipping' ) {
                return;
            }
            var $divLarge    = jQuery( divLarge );
            var largeImgs    = $divLarge.find( 'img.nggml-large-image' );
            var other        = image === largeImgs[0] ? largeImgs[1] : largeImgs[0];
            var style        = image.style;
            var otherStyle   = other.style;
            style.display    = 'block';
            style.transition = self.imageTransition;             // restore the transitions
            if ( nggmlTransition === 'slide-left' ) {            // the flipped css depends on the type of transition
                style.left           = '50%';
                style.transform      = 'translate(-50%,-50%)';
                otherStyle.left      = '-100%';
                otherStyle.transform = 'translate(0%,-50%)';
                if ( self.isLarge ) {
                    otherStyle.left = '-10000px';
                    self.isLarge    = false;
                }
            } else if ( nggmlTransition === 'fade' ) {
                style.opacity      = '1';
                otherStyle.opacity = '0';
            } else if ( nggmlTransition === 'flip' ) {
                altGallery.rotation += 180;
                $divLarge.find( 'div.nggml-slide-flip-container' ).css( 'transform', 'rotateY(' + altGallery.rotation + 'deg)' );
            } else if ( nggmlTransition === 'explode' || nggmlTransition === 'rotation' ) {
                var $image         = jQuery( image );
                style.width        = $image.data( 'width' )  + 'px';
                style.height       = $image.data( 'height' ) + 'px';
                style.opacity      = 1;
                otherStyle.opacity = 0;
                if ( nggmlTransition === 'rotation' ) {
                    style.transform = 'translate(-50%,-50%) rotate(360deg)';
                }
            } else if ( nggmlTransition === 'reveal-left' ) {
                var parentParentStyle                     = image.parentNode.parentNode.style;
                parentParentStyle.transition              = self.containerTransition;
                parentParentStyle.width                   = '100%';
                parentParentStyle.opacity                 = '1';
                other.parentNode.parentNode.style.opacity = '0';
            }
            var dataset = image.dataset;
            var title   = dataset.title;
            if ( title ) {
                $divLarge.find( 'div.nggml-slide-title' ).text( title );
            }
            dataset.flipState            = 'flipped';
            divLarge.dataset.flippingImg = '-1';
            return other;
        },
        otherLargeImage: function( divLarge, image ) {           // get the other img element of divLarge
            var $largeImgs = jQuery( divLarge ).find( 'img.nggml-large-image' );
            return image === $largeImgs[0] ? $largeImgs[1] : $largeImgs[0];
        },
        showFullImageInPopup: function( meta ) {
            var img       = document.createElement( 'img' );
            img.src       = meta.attachment_url;
            var dfd       = jQuery.Deferred();                   // dfd is resolved when both the window and img are loaded
            var imgLoaded = false;
            var winLoaded = false;
            jQuery( img ).load(function() {
                if ( winLoaded ) {
                    dfd.resolve();
                } else {
                    imgLoaded = true;
                }
            });
            var W         = screen.width;
            var H         = screen.height;
            var newWin    = window.open( img.src, 'nngml_fullsize', 'width=200,height=200,left=' + (W - 200) / 2 + ',top=' + (H - (200 + 128)) / 2 );
            newWin.onload = function() {
                if ( imgLoaded ) {
                    dfd.resolve();
                }else {
                    winLoaded = true;
                }
            };
            dfd.promise().done(function() {
                var w  = img.naturalWidth;
                var h  = img.naturalHeight;
                var wW = w / W;
                var hH = h / ( H - 128 );
                var r  = Math.max( wW, hH );
                if( r > 1 ) {                                                       // image is too large for screen so shrink it
                    w = Math.floor( w / r );
                    h = Math.floor( h / r );
                }
                var x = ( W - w ) / 2;
                var y = ( H - ( h + 128 ) ) / 2;
                newWin.moveTo( x, y );                                              // center image in screen
                newWin.resizeBy( w - newWin.innerWidth, h - newWin.innerHeight );   // resize window to fit image
                // The above moveTo() and resizeBy() does not work in Microsoft Edge so below is a workaround
                var retries = 0;
                window.setTimeout(function retryResize() {
                    var retry = false;
                    if ( Math.abs( newWin.screenX - x ) > 1 ) {
                        newWin.moveTo( x, y );                                      // moveTo() does not work in Microsoft Edge - Issue #8439370
                        retry = true;
                    }
                    if (  Math.abs( newWin.innerWidth - w ) > 1 ) {
                        newWin.resizeBy( w - newWin.innerWidth, h - newWin.innerHeight );
                        retry = true;
                    }
                    if ( retry && ++retries < 8 ) {
                        window.setTimeout( retryResize, 250 );
                    }
                }, 250 );
                      
            });
        },
        init: function() {
            if ( ! nggmlAltGalleryEnabled ) {
                return;
            }
            var $body = jQuery( 'body' );
            if ( this.touchOnly ) {
                $body.addClass( 'nggml-touch-only' );
            }
            var $divGalleries = jQuery( 'div.gallery' );
            if ( ! $divGalleries.length ) {
                return;
            }
            var fixed               = document.createElement( 'div' );     // container for the full browser viewport slideshow
            fixed.className         = 'tmlFixedOuter';
            var background          = document.createElement( 'div' );
            background.className    = 'tmlFixedInner';
            fixed.appendChild( background );
            var fixedButton         = document.createElement( 'button' );  // the close button for the browser viewport slideshow
            fixedButton.className   = 'nggml-close-button';
            fixedButton.textContent = 'X';
            fixed.appendChild( fixedButton );
            var galleryFixed;                                              // gallery showing full browser viewport slideshow
            var containerFixed;                                            // the HTML div element showing full browser viewport slideshow
            var selectFixed;                                               // the HTML select element showing full browser viewport slideshow
            jQuery( fixedButton ).click(function() {                       // close the browser viewport slideshow
                if ( galleryFixed.metaLocked ) {                           // if the meta overlay is shown then close it
                    jQuery( fixed ).find( 'div.nggml-alt-gallery-large div.nggml-slide-controls button.nggml-info-button' ).click();
                    jQuery( 'div#nggml-meta-overlay' ).css( 'display', 'none' );
                }
                jQuery( 'html' ).css( 'overflow-y', fixed.dataset.htmlOverflowY );                                            // restore the browser viewport scrollbar
                jQuery( fixed ).hide();
                jQuery( containerFixed ).prepend( jQuery( this.parentNode ).find( 'div.nggml-alt-gallery-large' )[0] );       // restore divLarge to its original container
                if ( selectFixed.length > 1 ) {
                    selectFixed.selectedIndex = ( selectFixed[0].value !== 'slideshow' ) ? 0 : 1;                             // use first non slideshow select option
                    jQuery( jQuery( 'ul.nggml-navbar li' ).removeClass( 'nggml-active' )[ selectFixed.selectedIndex + 1 ] )
                                                          .addClass( 'nggml-active' );                                        // sync navbar to the selected option
                    jQuery( selectFixed ).change();                                                                           // trigger the selected option
                }
            });
            $body.append( fixed );
            
            var loadingOuter         = document.createElement( 'div' );
            loadingOuter.id          = 'tmlLoadingOuter';
            var loadingInner         = document.createElement( 'div' );
            loadingInner.id          = 'tmlLoadingInner';
            loadingInner.textContent = 'Loading...';
            loadingOuter.appendChild( loadingInner );
            $body.append( loadingOuter );

            altGallery.doGallery = function( initialView, expanded ) {      // create the gallery controls; call with this as a div.gallery HTML element
                var $divGallery        = jQuery( this );
                var $window            = jQuery( window );
                var body               = document.querySelector( 'body' );
                var cacheImg           = document.createElement( 'img' );   // used for preloading images
                var cacheImgStyle      = cacheImg.style;                    // apparently Microsoft Edge will not load images if the <img> element is not in the DOM
                cacheImgStyle.position = 'fixed';                           // so put cacheImg in the DOM where it will not be visible
                cacheImgStyle.left     = ( $window.width()  - 1 ) + 'px';
                cacheImgStyle.top      = ( $window.height() - 1 ) + 'px';
                cacheImgStyle.zIndex   = '-1000000';
                cacheImgStyle.opacity  = '0.001';
                body.appendChild( cacheImg );
                var self1              = new altGallery.gallery();
                self1.extract( $divGallery );                               // extract images from gallery and store in self1.images
                if ( self1.images.length < 2 ) {
                    return;
                }
                $divGallery.wrap( '<div class="nggml-galleries-container"/>' );
                var divControls        = document.createElement( 'div' );
                divControls.className  = 'nggml-alt-gallery-controls';
                var view;    // the initial view
                var views;   // the allowed views
                this.className.split( ' ' ).forEach(function( v ) {         // extract view and views from classname
                    if ( v.indexOf( 'tml_view-' ) === 0 ) {
                        view = v.substr( 9 );                               // the initial view
                    }
                    if ( v.indexOf( 'tml_views-' ) === 0 ) {
                        views = v.substr( 10 ).split( '_' );                // the array of allowed views
                    }
                });
                var select  = document.createElement( 'select' );
                var options = [
                    //v is the value, l is the select label,         l1 is the navbar label
                    { v: 'standard',  l: 'Standard View',            l1: 'Gallery' },
                    { v: 'miro',      l: "Miro's Justified Gallery", l1: "Miro's"  },
                    { v: 'titles',    l: 'Titles View',              l1: 'Titles'  },
                    { v: 'large',     l: 'Large Image View',         l1: 'Large'   },
                    { v: 'slideshow', l: 'Slide Show',               l1: 'Slide'   }
                ];
                if ( jQuery( 'div#nggml-search-widget-outer-overlay' ).length ) {                              // add option for search widget if the search widget overlay is found
                    if ( altGallery.touchOnly ) {
                        options.push({v: 'search', l: 'Show Search Widget', l1: 'Search' });
                    } else {
                        options.push({v: 'search', l: 'Show Search Widget' });
                    }  
                } else {
                    if ( altGallery.touchOnly ) {
                        options.push({ v: 'search', l1: 'Search' });
                    }
                }
                select.className = 'nggml-gallery-select-view';
                options.forEach(function( o ) {                                                                // create select options for allowed views using l labels
                    if ( typeof views === 'undefined' || views.indexOf( o.v ) !== -1 || o.v === 'search' ) {   // check if option is for an allowed view
                        if ( typeof o.l === 'undefined' ) {
                            return;
                        }
                        var option         = document.createElement( 'option' );
                        option.value       = o.v;
                        option.textContent = o.l;
                        select.appendChild( option );
                    }
                });
                if ( initialView !== undefined ) {
                    view = initialView;
                }
                if ( typeof view !== 'undefined' ) {
                    select.value = view;
                }
                divControls.appendChild( select );
                var buttonColor                   = document.createElement( 'button' );                        // holds the focused background color 
                buttonColor.id                    = 'nggml-alt-gallery-focused';
                buttonColor.style.backgroundColor = nggmlAltGalleryFocusColor;                                 // which the user can set on the settings page
                divControls.appendChild( buttonColor );
                buttonColor                       = document.createElement( 'button' );                        // holds the unfocused background color 
                buttonColor.id                    = 'nggml-alt-gallery-unfocused';                             // which the user can set in the css file
                divControls.appendChild( buttonColor );
                $divGallery.before( divControls );
                self1.select                      = select;
                var containerWidth                = $divGallery.width();
                if ( ! containerWidth ) {
                    // hidden gallery of an album
                    containerWidth = jQuery( $divGallery[0].parentNode.parentNode ).width();
                }
                var $divAltGallery = jQuery( self1.divAltGallery = self1.recreate( containerWidth ) );         // alt gallery window - container of the titles, large and slide views
                for ( var parent = $divGallery[0]; parent.tagName !== 'HTML'; parent = parent.parentNode ) {
                    var background = parent.style.backgroundColor;
                    if ( background && background !== 'transparent' ) {
                        $divAltGallery.css( 'background-color', background );
                    }
                }
                $divGallery.append( $divAltGallery );
                var $galleriesContainer   = $divAltGallery.closest( 'div.nggml-galleries-container' );
                var $divLarge             = $divAltGallery.find( 'div.nggml-alt-gallery-large' );
                var $imgs                 = $divLarge.find( 'img.nggml-large-image' );
                var $overlay              = jQuery( 'div#nggml-meta-overlay' );
                var colorUnfocused        = jQuery( 'button#nggml-alt-gallery-unfocused' ).css( 'background-color' );
                var $select               = jQuery( select );
                var prevSelectedValue     = select.value;
                var prevSelectedIndex     = select.selectedIndex;
                $select.change(function() {
                    if ( $overlay.is( ':visible' ) ) {
                        $overlay.find( 'button.nggml-meta-overlay-close-button' ).click();
                    }
                    jQuery( 'div.nggml-alt-gallery-titles li.nggml-alt-gallery' ).css( 'background-color', colorUnfocused );
                    jQuery( 'div.nggml-alt-gallery-icons img.nggml-alt-gallery' ).parent().css({ 'background-color': colorUnfocused, 'border-color': colorUnfocused });
                    $divLarge.find( 'div.nggml-slide-title' ).hide();
                    $divLarge.find( 'div.nggml-slide-controls').hide();
                    $imgs.css({ 'padding-top': '0', 'padding-bottom': '0' });
                    if ( select.length === 1 ) {   // hide select if there is only one select option
                        select.parentNode.style.display = 'none';
                    }
                    if ( this.value !== 'large' && $divControls.data( 'intervalId' ) ) {
                        window.clearInterval( $divControls.data( 'intervalId' ) );
                        $divControls.data( 'intervalId', 0 );
                        var $playControls = $divControls.find( 'ul.nggml-navbar li.nggml-play-controls' );
                        $playControls.find( 'span.dashicons-controls-play' ).show();
                        $playControls.find( 'span.dashicons-controls-pause' ).hide();
                    }
                    var preExpandOpSlideShowIndex;
                    if ( this.value !== 'slideshow' ) {
                        self1.slideShow       = false;
                        self1.imageTransition = undefined;
                        if ( typeof self1.slideShowId !== 'undefined' ) {
                            window.clearInterval( self1.slideShowId );
                            self1.slideShowId = undefined;
                            $divLarge.find( 'div.nggml-reveal-wrapper' ).css( 'transition', '' );
                            self1.containerTransition = '';
                        }
                    } else if ( self1.expandOp ) {                             // processing expand or contract operation
                        preExpandOpSlideShowIndex = self1.slideShowIndex;      // expand or contract operation on running slide show so save slide index
                        window.clearInterval( self1.slideShowId );
                        self1.slideShowId = undefined;
                    } else if ( typeof self1.slideShowId !== 'undefined' ) {
                        return;                                                // nothing to do since slide show already running
                    }
                    var isFullView        = $galleriesContainer.hasClass( 'nggml-galleries-container-full-view' );
                    $divAltGallery.height( Math.floor( ( isFullView ? 93 : 85 ) * jQuery( window ).height() / 100 ) );
                    var windowHeight      = $divAltGallery.height();
                    var windowOuterHeight = $divAltGallery.outerHeight();
                    var iconsDiv          = $divAltGallery.find( 'div.nggml-alt-gallery-icons' );
                    var titlesDiv         = $divAltGallery.find( 'div.nggml-alt-gallery-titles' );
                    var $imgDiv           = iconsDiv.find( window.nggml.preserveIconAspectRatio ? 'div.nggml-alt-gallery-outer' : 'div.nggml-alt-gallery' );
                    self1.expandOp        = false;
                    var selected          = this.value;
                    if ( selected !== 'search' ) {
                        // tag container and body with a classname that indicates the view type
                        $galleriesContainer.removeClass( 'nggml-gallery-standard nggml-gallery-miro nggml-gallery-titles nggml-gallery-large nggml-gallery-slideshow' )
                                           .addClass( 'nggml-gallery-' + selected );
                        jQuery( 'body' ).removeClass( 'nggml-gallery-standard nggml-gallery-miro nggml-gallery-titles nggml-gallery-large nggml-gallery-slideshow' )
                                        .addClass( 'nggml-gallery-' + selected );
                    }
                    switch ( selected ) {
                    case 'standard':
                        $divGallery.css( 'height', 'auto' ).find( '.gallery-item' ).css( 'opacity', '1.0' );
                        break;
                    case 'miro':
                        var divJustified = self1.divJustifiedGallery;
                        if ( ! divJustified ) {
                            divJustified = self1.divJustifiedGallery = self1.createJustified();
                            $divGallery.append( divJustified );
                            var $divJustified = jQuery( divJustified );
                            $divJustified.justifiedGallery({ rowHeight: nggmlMiroRowHeight, lastRow: 'nojustify', margins: 5 }).on( 'jg.complete', function() {
                                $divJustified.find( 'a div.caption span.dashicons-info' ).click(function( e ) {
                                    var $overlay = showMetaOverlay( jQuery(this).closest( 'a' )[0].id.substr( 11 ), this );
                                    $galleriesContainer.append( $overlay );
                                    $overlay.css( 'left', '10vw' ).show();
                                    e.stopImmediatePropagation();
                                    e.stopPropagation();
                                    e.preventDefault();
                                });
                                $divJustified.find( 'a div.caption span.dashicons-editor-expand' ).click(function( e ) {
                                    altGallery.showFullImageInPopup( nggml.images[ jQuery( this ).closest( 'a' )[0].id.substr( 11 ) ] );
                                    e.stopImmediatePropagation();
                                    e.stopPropagation();
                                    e.preventDefault();
                                });
                                // the mouseleave handler has to work if is installed before or after justifiedGallery's mouseleave handler 
                                $divJustified.find( 'a' ).mouseleave(function( e ) {
                                    if ( self1.$toggleCaptions.data( 'on' ) ) {
                                        jQuery( this ).find( 'div.caption' ).stop().css({ display: 'block', opacity: '0.7' });
                                        e.stopImmediatePropagation();
                                        e.stopPropagation();
                                    }
                                });
                            });
                            if ( altGallery.touchOnly ) {
                                $divJustified.find( 'a' ).click(function( e ) {                        // for touch devices first touch shows caption second touch opens link
                                    var caption = jQuery( this ).find( 'div.caption' );
                                    if ( caption.length > 0 && ( caption.css( 'display' ) !== 'block' || caption.css( 'opacity' ) == 0 ) ) {
                                        $divJustified.find( 'a div.caption' ).css( 'opacity', '0' );   // this is the first touch
                                        caption.css({ display: 'block', opacity: '0.7' });
                                        e.preventDefault();
                                        return;
                                    }
                                });
                            }
                            $divJustified.on( 'jg.complete jg.resize', function() {
                                $divGallery.innerHeight( $divJustified.outerHeight() );        // divJustified is absolutely positioned in divGallery so must resize divGallery
                            });
                        } else {
                            $divGallery.innerHeight( jQuery( divJustified ).outerHeight() );   // divJustified is absolutely positioned in divGallery so must resize divGallery
                        }
                        break;
                    case 'titles':
                        if ( window.matchMedia( '(orientation:landscape)' ).matches ) {
                            iconsDiv.css( 'height', '100%' );                                                               // landscape mode
                            titlesDiv.css( 'height', '100%' );
                        } else {
                            var rows        = 3;                                                                            // portrait mode
                            var width       = Math.ceil( $imgDiv.length / rows ) * $imgDiv.outerWidth() + 24;               // width required to exactly contain the rows of icons
                            var bottomWidth = $divAltGallery.width();
                            if ( width < bottomWidth ) {                                                                    // the width must be at least as the window width
                                width = bottomWidth;
                            }
                            iconsDiv.height( rows * $imgDiv.outerHeight() + altGallery.hScrollbarHeight ).width( width );   // height of the rows of icons
                            titlesDiv.height( windowHeight - iconsDiv.outerHeight() - 10 );
                        }
                        $divGallery.innerHeight( windowOuterHeight ).find( '.gallery-item' ).css( 'opacity', '0.0' );
                        break;
                    case 'large':
                        // the logic for large is complicated because the configuration changes depending on the size of the window and the aspect ratio
                        var rows      = 1;
                        var landscape = window.matchMedia( '(orientation:landscape)' ).matches;
                        if ( landscape ) {
                            rows = 2;                                                                                       // landscape mode
                            if ( rows * $imgDiv.outerHeight() > 4 * windowHeight / 10 ) {
                                rows = 1;
                            }
                        } else {
                            rows = 1;                                                                                       // portrait mode
                        }
                        if ( isFullView ) {                                                                                 // full view has icons on left side
                            var iconsDivWidth  = 2 * $imgDiv.outerWidth() + altGallery.vScrollbarWidth;                     // show 2 columns of icons
                            iconsDiv.css({ width: iconsDivWidth, height: '100%' });
                            var titlesDivWidth = 250;                                                                       // show titles in 250px width column 
                            titlesDiv.css({ width: titlesDivWidth + 'px', height: '100%' });                               
                            $divLarge.css({ width: ( $divLarge.parent().width() - ( titlesDivWidth + iconsDivWidth + 1 ) ) + 'px', height: '100%' });
                        } else {                                                                                            // not full view has icons on bottom
                            var width       = Math.ceil( $imgDiv.length / rows ) * $imgDiv.outerWidth() + 24;               // width required to exactly contain the rows of icons
                            var bottomWidth = $divAltGallery.width();
                            if ( width < bottomWidth ) {                                                                    // the width must be at least as the window width
                                width = bottomWidth;
                            }
                            iconsDiv.height( rows * $imgDiv.outerHeight() + altGallery.hScrollbarHeight ).width( width );   // height of the rows of icons
                            if ( landscape ) {
                                var topHeight = windowHeight - iconsDiv.outerHeight();                                      // height of the large image pane
                                $divLarge.height( topHeight );
                                titlesDiv.height( topHeight - 10 );
                            } else {
                                $divLarge.height( 3 * bottomWidth / 4 );
                                titlesDiv.height( windowHeight - $divLarge.outerHeight() - iconsDiv.outerHeight() - 10 - 2 );
                            }
                            $divLarge.find( 'div.nggml-span' ).show();                                                      // show initial hint message
                            var dim = Math.floor( Math.min( $divLarge.width(), $divLarge.height() ) ) - 10;
                            $imgs.prop({ src: '', width: dim, height: dim }).css({ width: dim + 'px', height: dim + 'px' });
                        }
                        $imgs.css( 'transition', '' );
                        if( nggmlTransition === 'reveal-left' ) {
                            $imgs.parent().parent().css({ top: '0', left: '0', right: 'auto', transition: '' });
                            $imgs.parent().css({ width: $divLarge.width(), height: $divLarge.height() });
                        } else if ( nggmlTransition === 'flip' ) {
                            $divLarge.find( 'div.nggml-slide-flip-container' ).addClass( 'nggml-large-view' );
                        }
                        $divGallery.innerHeight( windowOuterHeight ).find( '.gallery-item' ).css( 'opacity', '0.0' );
                        break;
                    case 'slideshow':
                        if ( ! nggmlUseFullScreenSlideShow ) {
                            $divLarge.innerHeight( windowHeight );
                            $divGallery.innerHeight( windowOuterHeight ).find( '.gallery-item' ).css( 'opacity', '0.0' );
                        } else {
                            galleryFixed   = self1;
                            containerFixed = $divAltGallery[0];
                            selectFixed    = this;
                            $divLarge.css({ width: '100%', height: '100%', display: 'block' });
                            fixed.appendChild( $divLarge[0] );
                            var $html=jQuery("html");
                            fixed.dataset.htmlOverflowY=$html.css("overflow-y");
                            $html.css("overflow-y","hidden");
                            jQuery(fixed).show();
                            fixedButton.style.display=this.length===1?"none":"inline";
                            jQuery("body").addClass("nggml-full-viewport-slideshow");
                        }
                        imgDiv = $divAltGallery.find( 'div.nggml-alt-gallery-icons div.nggml-alt-gallery' );
                        if ( nggmlTransition === 'flip' ) {
                            $divLarge.find( 'div.nggml-slide-flip-container' ).removeClass( 'nggml-large-view' );
                            // reset the rotation back to zero without transition
                            $imgs[0].dataset.flipState = '';
                            var $flipContainer = $divLarge.find( 'div.nggml-slide-flip-container' );
                            altGallery.rotation = 0;
                            $flipContainer.css({ transition: 'unset', transform: 'rotateY(0deg)' });
                            window.setTimeout(function() {
                                $flipContainer.css( 'transition', '' );
                            }, 100 );
                        } else if ( nggmlTransition === 'reveal-left' ) {
                            $imgs.parent().parent().css({ top: 'auto', left: 'auto', right: '0', transition: altGallery.revealTransition });
                        } else {
                            $imgs.css( 'transition', altGallery.transition );
                        }
                        var $playButton      = $divLarge.find( 'div.nggml-slide-controls button.nggml-play-stop-button' );
                        self1.slideShow      = true;
                        self1.slideShowIndex = typeof preExpandOpSlideShowIndex !== 'undefined' ? preExpandOpSlideShowIndex : 0;
                        self1.imagesCount    = imgDiv.length;
                        function showSlideShow() {   // show next image in slideshow
                            if ( $divAltGallery.is( ':hidden' ) ) {
                                if(typeof self1.slideShowId!=="undefined"){window.clearInterval(self1.slideShowId);}
                                $playButton.removeClass("nggml-slide-pause").addClass("nggml-slide-play");
                                return;
                            }
                            var image = altGallery.preFlipLargeImage( $divLarge[0], self1 );
                            try{
                                var metaId=imgDiv.slice(self1.slideShowIndex,self1.slideShowIndex+1)
                                    .find("div.nggml-alt-gallery-meta")[0].id.substr(11);
                                var meta=nggml.images[metaId];
                                if ( ! altGallery.setImgSrc( image, meta, undefined, meta.post_title ) ) {
                                } else {
                                    // image already loaded because next image is the previous image
                                    window.setTimeout(function() {
                                        altGallery.flipLargeImage( $divLarge[0], image, self1 );
                                    }, 100 );
                                }
                                // divLarge.find("div.nggml-slide-title")[0].textContent=meta.post_title;
                                $divLarge.find( 'div.nggml-slide-controls button.nggml-info-button').data( 'meta-id', metaId );
                                self1.slideShowIndex = ( self1.slideShowIndex + 1 ) % imgDiv.length;                              // set next slide image
                            }catch(e){
                                image.src=altGallery.loading;
                            }
                            if(!nggmlUseFullScreenSlideShow){
                                altGallery.scrollContainerToTop( $divLarge[0] );
                            }
                        }
                        self1.showSlideShow=showSlideShow;
                        $playButton.removeClass("nggml-slide-play").addClass("nggml-slide-pause");
                        $divLarge.find("div.nggml-span").hide();
                        $imgs.css( 'padding-top', '2em' );
                        $divLarge.find( 'div.nggml-slide-title' ).show();
                        showSlideShow();
                        if ( ! $divAltGallery.is( ':hidden' ) ) {
                            if ( typeof self1.slideShowId !== 'undefined' ) {
                                window.clearInterval( self1.slideShowId );
                            }
                            self1.slideShowId = window.setInterval( showSlideShow, nggmlSlideShowInterval );
                            $playButton.removeClass("nggml-slide-play").addClass("nggml-slide-pause");
                        }else{
                            $playButton.removeClass("nggml-slide-pause").addClass("nggml-slide-play");
                        }
                        if(altGallery.touchOnly){
                            //divLarge.find("div.nggml-slide-title").show();
                            $divLarge.find( 'div.nggml-slide-controls').show().css( 'opacity', '1.0' );
                            if(window.matchMedia("(orientation:landscape)").matches){ 
                                $imgs.css( 'padding-bottom', '2em' );
                            }
                        }
                        break;
                    case "search":
                        var $outer  = jQuery( 'div#nggml-search-widget-outer-overlay' );
                        var $submit = $outer.find( 'input[type="submit"]#nggml-search-fields-submit' ).data( 'gallery', $divGallery ).data( 'ajax', true )
                                                                                                      .data( 'view', prevSelectedValue );
                        if ( isFullView ) {
                            $submit.data( 'expanded', true );
                        } else {
                            $submit.removeData( 'expanded' );
                        }
                        $outer.find( 'input[type="button"]#nggml-search-fields-cancel' ).show();
                        $outer.find( 'form.nggml-search-fields-form' ).show();
                        $outer.show();
                        this.selectedIndex=prevSelectedIndex;
                        jQuery(jQuery("ul.nggml-navbar li").removeClass("nggml-active")[prevSelectedIndex+1]).addClass("nggml-active");
                        $select.change();
                        break;
                    }
                    prevSelectedValue=this.value;
                    prevSelectedIndex=this.selectedIndex;
                });   // $select.change(function() {
                var ul         = document.createElement( 'ul' );                                               // create navbar view items
                ul.className   = 'nggml-navbar';
                var li         = document.createElement( 'li' );
                li.className   = 'nggml-view';
                li.textContent = 'View: ';
                ul.appendChild( li );
                options.forEach(function( o ) {                                                                // create navbar items for allowed views using l1 labels
                    if ( typeof views === 'undefined' || views.indexOf( o.v ) !== -1 || o.v === 'search' ) {   // check if view is allowed
                        if ( typeof o.l1 === 'undefined' ) {
                            return;
                        }
                        var li           = document.createElement( 'li' );
                        li.className     = 'nggml-view';
                        li.textContent   = o.l1;
                        li.dataset.value = o.v;
                        if ( typeof view !== 'undefined' ) {
                            if ( o.v === view ) {
                                li.className += ' nggml-active';                                               // set initial view from view
                            }
                        } else {
                            if ( o.v === options[0].v ) {
                                li.className += ' nggml-active';                                               // set initial view to first element
                            }
                        }
                        ul.appendChild( li );
                    }
                });
                if ( ! altGallery.touchOnly ) {                                                                // add navbar items available on interface with mouse support
                    li            = document.createElement( 'li' );
                    li.className  = 'nggml-icons nggml-full-view';
                    li.title      = 'Toggle Full Screen';
                    li.innerHTML  = '<span class="dashicons dashicons-editor-expand"></span>';
                    li.innerHTML += '<span class="dashicons dashicons-editor-contract" style="display:none;"></span>';
                    ul.appendChild( li );
                    li            = document.createElement( 'li' );
                    li.className  = 'nggml-icons nggml-view-settings';
                    li.title      = 'Settings';
                    li.innerHTML  = '<span class="dashicons dashicons-admin-generic"></span>';
                    ul.appendChild( li );
                    li            = document.createElement( 'li' );
                    li.className  = 'nggml-icons nggml-play-controls';
                    li.title      = 'Play/Pause Slide Show';
                    li.innerHTML  = '<span class="dashicons dashicons-controls-play"></span>';
                    li.innerHTML += '<span class="dashicons dashicons-controls-pause" style="display:none;"></span>';
                    ul.appendChild( li );
                    li            = document.createElement( 'li' );
                    li.className  = 'nggml-icons nggml-toggle-captions';
                    li.title      = 'Toggle Captions';
                    li.dataset.on = false;
                    li.innerHTML  = '<span class="dashicons dashicons-tag"></span>';
                    ul.appendChild( li );
                    self1.$toggleCaptions = jQuery( li );
                    li            = document.createElement( 'li' );
                    li.className  = 'nggml-icons nggml-search-widget';
                    li.title      = 'Search';
                    li.innerHTML  = '<span class="dashicons dashicons-search"></span>';
                    ul.appendChild( li );
                }
                divControls.appendChild( ul );
                var $divControls = jQuery( divControls );
                $divControls.data( 'index', 0 );               // the image index for the large view slide show
                $divControls.data( 'intervalId', 0 );          // the timer interval id for the large view slide show
                jQuery( ul ).find( 'li' ).click(function() {
                    var $li = jQuery( this );
                    if ( this.textContent === 'View: ' ) {
                        return;
                    }
                    if ( $li.hasClass( 'nggml-search-widget' ) ) {
                        var $controls = $li.closest( 'div.nggml-alt-gallery-controls' );
                        var $overlay  = jQuery( 'div#nggml-search-widget-outer-overlay' );
                        var $submit   = $overlay.find( 'input[type="submit"]#nggml-search-fields-submit' ).data( 'gallery', $divGallery ).data( 'ajax', true )
                                                                                                          .data( 'view', $controls.find( 'select' ).val() );
                        if ( $galleriesContainer.hasClass( 'nggml-galleries-container-full-view' ) ) {
                            $submit.data( 'expanded', true );
                        } else {
                            $submit.removeData( 'expanded' );
                        }
                        $overlay.find( 'input[type="button"]#nggml-search-fields-cancel' ).show();
                        $overlay.find( 'form.nggml-search-fields-form' ).show();
                        $overlay.show();
                        return;
                    }
                    if ( $li.hasClass( 'nggml-view-settings' ) ) {
                        jQuery( 'div#nggml-view-settings-outer-overlay' ).show();
                        return;
                    }
                    if ( $li.hasClass( 'nggml-full-view' ) ) {                                         // toggle full browser viewport view
                        var $expand   = $li.find( 'span.dashicons-editor-expand' );
                        var $contract = $li.find( 'span.dashicons-editor-contract' );
                        if ( $expand.is( ':visible' ) ) {                                              // in full browser viewport view
                            $expand.hide();
                            $contract.show();
                            $galleriesContainer.addClass( 'nggml-galleries-container-full-view' );
                            jQuery( 'body,html' ).addClass( 'nggml-galleries-container-full-view' );
                        } else {                                                                       // not in full browser viewport view
                            $expand.show();
                            $contract.hide();
                            $galleriesContainer.removeClass('nggml-galleries-container-full-view' );
                            jQuery( 'body,html' ).removeClass( 'nggml-galleries-container-full-view' );
                        }
                        self1.expandOp = true;
                        $select.change();
                        return;
                    }  
                    if ( $li.hasClass( 'nggml-play-controls' ) ) {                                     // toggle slide play / pause
                        var $play      = $li.find( 'span.dashicons-controls-play' );
                        var $pause     = $li.find( 'span.dashicons-controls-pause' );
                        var $divTitles = $galleriesContainer.find( 'div.nggml-alt-gallery-container div.nggml-alt-gallery-titles' );
                        var $titles    = $divTitles.find( 'li.nggml-alt-gallery' );
                        if ( $play.is( ':visible' ) ) {                                                // start playing slide show
                            $play.hide();
                            $pause.show();
                            jQuery( $titles[ $divControls.data( 'index' ) ] ).mouseenter();
                            $divControls.data( 'intervalId', window.setInterval(function() {
                                // var t0=performance.now();
                                if ( self1.metaLocked ) {
                                    return;
                                }
                                var index = $divControls.data( 'index' );
                                if ( index >= 0 ) {
                                    jQuery( $titles[ index ] ).mouseleave();                           // stop showing previous image by simulating a hover off on its title
                                }
                                if ( ++index >= $titles.length ) {
                                    index = 0;
                                }
                                var nextIndex = index + 1 < $titles.length ? index + 1 : 0;            // preload next image
                                var nextId    = $titles[ nextIndex ].id.substr( 9 );
                                altGallery.setImgSrc( cacheImg, self1.images[ nextId ].image, $divLarge.width() + 'px' );
                                $divTitles.scrollTop( jQuery( $titles[ ( index - 3 >= 0 ) ? index - 3 : 0 ] ).position().top + $divTitles.scrollTop() );
                                $divControls.data( 'index', index );
                                jQuery( $titles[index] ).mouseenter();                                 // show next image by simulating a hover on its title 
                                // console.log("large view go to next image",performance.now()-t0);
                            }, nggmlSlideShowInterval ) );
                        } else {                                                                       // pause slide show
                            jQuery( $titles[ $divControls.data( 'index') ] ).mouseleave();
                            window.clearInterval( $divControls.data( 'intervalId' ) );
                            $divControls.data( 'intervalId', 0 );
                            $play.show();
                            $pause.hide();
                        }
                        return;
                    }
                    if ( $li.hasClass( 'nggml-toggle-captions' ) ) {                                   // toggle Miro's caption visibility
                        var on = $li.data( 'on' );
                        $li.data( 'on', ! on );
                        $galleriesContainer.find( 'div.nggml-justified-gallery-container div.caption' ).each(function() {
                            var style = this.style;
                            if ( on ) {
                                style.opacity = '0';                                                   // hide captions
                            } else {
                                style.display = 'block';                                               // show captions
                                style.opacity = '0.7';
                            }
                        });
                        return;
                    }                                                                          
                    jQuery( this.parentNode ).find( 'li' ).removeClass( 'nggml-active' );              // this is a view selection
                    $li.addClass( 'nggml-active' );
                    select.value = this.dataset.value;
                    $select.change();                                                                  // select the corresponding option on the select element
                });
                self1.slideShow=false;
                if ( expanded ) {
                    $divControls = jQuery( divControls );
                    $divControls.find( 'span.dashicons-editor-expand' ).hide();
                    $divControls.find( 'span.dashicons-editor-contract' ).show();
                    $galleriesContainer.addClass( 'nggml-galleries-container-full-view' );
                    jQuery( 'body, html' ).addClass( 'nggml-galleries-container-full-view' );
                }
                jQuery( window ).resize( function() {
                    $select.change();
                });
                $select.change();
            };   // altGallery.doGallery = function( initialView, expanded ) {               // create the gallery controls; call with this as a div.gallery HTML element
            $divGalleries.each(function() {
                altGallery.doGallery.call( this );
            });
            jQuery( 'div#nggml-meta-overlay' ).click(function( e ) {
                // click on background does a click on close button
                var $src = jQuery( e.srcElement );
                if ( $src.is( 'div#nggml-meta-overlay-left-col' ) || $src.is( 'div#nggml-meta-overlay-right-col' ) || $src.is( 'div#nggml-meta-overlay' ) ||
                    $src.is( 'div.nggml-meta-content h3' ) || $src.is( 'div.nggml-meta-content' ) ) {
                    jQuery( 'button.nggml-meta-overlay-close-button' ).click();
                }
                e.stopPropagation();
            });
            jQuery( 'button.nggml-meta-overlay-close-button' ).click(function( e ) {
                var $this = jQuery( this );
                $this.closest( 'div#nggml-meta-overlay' ).removeClass( 'nggml-locked' ).hide();
                var $container=jQuery(this.parentNode.parentNode);
                if($container.hasClass("nggml-alt-gallery-large")){$container.removeClass("nggml-show-meta");}
                if ( galleryShowingMetaOverlay ) {
                    if( galleryShowingMetaOverlay.slideShow ) {                              // overlay is from the slideshow so click on the slide show info button to properly close it
                        var $button = jQuery( galleryShowingMetaOverlay.divAltGallery ).find( 'div.nggml-alt-gallery-large div.nggml-slide-controls button.nggml-info-button' );
                        if ( ! $button.length ) {
                            $button = jQuery( fixed ).find( 'div.nggml-alt-gallery-large div.nggml-slide-controls button.nggml-info-button' );
                        }
                        $button.click();
                    } else {                                                                 // overlay from icon or titles meta button so remove the highlighting on them
                        jQuery( galleryShowingMetaOverlay.divAltGallery ).find( 'div.nggml-alt-gallery-meta,span.nggml-alt-gallery-meta' ).removeClass( 'nggml-red' );
                    }
                    galleryShowingMetaOverlay.metaLocked = false;                            // no meta overlay is showing
                }
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
                return false;
            });
            jQuery("button.nggml-meta-overlay-fullsize-button").click(function(e){
                var img=jQuery("div#nggml-meta-overlay img.nggml-meta-overlay-img")[0];
                if(img.srcset){
                    var img1=document.createElement("img");
                    jQuery( img1 ).load(function() {
                        showFullsize(img1.naturalWidth,img1.naturalHeight);
                    });
                    img1.src=img.src;
                }else{
                    showFullsize(img.naturalWidth,img.naturalHeight);
                }
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
                return false;
                function showFullsize(w,h){
                    var W=screen.width;
                    var H=screen.height-128;
                    var wW=w/W;
                    var hH=h/H;
                    var r=Math.max(wW,hH);
                    if(r>1){
                        w=Math.floor(w/r);
                        h=Math.floor(h/r);
                    }
                    window.open(img.src,"nngml_fullsize","width="+w+",height="+h+",left="+(W-w)/2+",top="+((H+64)-(h+64))/2);
                }
            });
            jQuery(window).on( 'orientationchange', function() {
                window.location.reload(false);
            });
        }   // init: function() {
    };  // altGallery={

    switch(nggmlTransition){
    case "slide-left":
        altGallery.transitionInterval=0.5;
        break;
    case "fade":
        altGallery.transitionInterval=2.0;
        break;
    case "explode":
    case "rotation":
        altGallery.transitionInterval=0.5;
        break;
    case "reveal-left":
        altGallery.transitionInterval=1.0;
        break;
    case 'flip':
        altGallery.transitionInterval = 2;
        altGallery.rotation = 0;
        break;
    default:
        altGallery.transitionInterval=1.0;
        break;
    }

    altGallery.transition = 'opacity ' + altGallery.transitionInterval + 's,left ' + altGallery.transitionInterval + 's linear,top ' +
        altGallery.transitionInterval + 's linear,transform ' + altGallery.transitionInterval + 's linear';
    altGallery.revealTransition = 'width ' + altGallery.transitionInterval + 's linear,opacity ' + altGallery.transitionInterval +
        's step-end';
        
    var imgBorderWidth        = 2;
    var imgFocusedBorderWidth = 7;
    var windowWidth           = Math.min( jQuery( window ).width(), jQuery( window ).height() );
    if ( windowWidth < 4 * ( nggmlAltGalleryImageWidth  + 2 * imgBorderWidth + 2 * imgFocusedBorderWidth ) ) {
        // adjust icon width so at least 4 icons will be shown
        nggmlAltGalleryImageWidth = Math.floor( windowWidth / 4 ) - ( 2 * imgBorderWidth + 2 * imgFocusedBorderWidth );
    }
        
    altGallery.gallery.prototype.image = function( src, href, text, id, image ) {
        this.src   = src;
        this.href  = href;
        this.text  = text;
        this.id    = id;
        this.image = image;
        this.width = nggmlAltGalleryImageWidth;
    };

    altGallery.gallery.prototype.extract = function( $gallery ) {                                                                       // extract images from gallery
        var gallery = this;                                                                                                             // and store in this.images
        $gallery.find( 'img' ).each(function() {
            if(this.dataset.nggmlImageId){
                var image = nggml.images[ this.dataset.nggmlImageId ];                                                                  // get the image object from global nggml.images
                var label;
                for(var i=0;i<nggml.labelOrder.length;i++){
                    if(image[nggml.labelOrder[i]]){
                        label=image[nggml.labelOrder[i]];
                        break;
                    }
                }
                gallery.images.push( new gallery.image( this.src, image.attachment_link, label, this.dataset.nggmlImageId, image ) );   // create an image object and save in gallery.images
                if(nggml.sortByLabel){
                    gallery.images.sort(function( a, b ) {
                        if(a.text.toLowerCase()<b.text.toLowerCase()){return -1;}
                        if(a.text.toLowerCase()>b.text.toLowerCase()){return 1;}
                        return 0;
                    });
                }
            }
        });
    };

    altGallery.gallery.prototype.recreate = function( containerWidth ) {   // create the base HTML for the gallery
        var self = this;                                                   // this is an object of type new altGallery.gallery()
        var divTitles=document.createElement("div");
        divTitles.className="nggml-alt-gallery-titles";
        var divIcons=document.createElement("div");
        divIcons.className="nggml-alt-gallery-icons";
        var divLarge=document.createElement("div");
        divLarge.className="nggml-alt-gallery-large";
        divLarge.dataset.flippingImg="-1";
        var spanLarge=document.createElement("div");
        spanLarge.className="nggml-span";
        spanLarge.textContent="Please mouse over an image or a title to select the large image to display. On touch screen devices please click on an image or title.";
        divLarge.appendChild(spanLarge);
        divLarge.style.zIndex=10;
        // divLarge.style.display="none";
        for ( var i = 0; i < 2; i++ ) {
            var largeImg=document.createElement("img");
            largeImg.id="nggml-large-image-"+i;
            largeImg.className="nggml-large-image";
            var style=largeImg.style;
            style.position="absolute";
            style.left="50%";
            style.top="50%";
            style.transform="translate(-50%,-50%)";
            style.zIndex=100+i*100;
            style.borderWidth="0";
            if(nggmlTransition==="slide-left"){
                if(i){
                    style.left="100%";
                    style.transform="translate(0%,-50%)";
                }
            }else if(nggmlTransition==="fade"){
                style.opacity=1-i;
            } else if ( nggmlTransition === 'flip' ) {
                altGallery.rotation = 0;
                style.zIndex        = 'auto';
                style.transition    = 'unset';
                if ( i ) {
                    style.transform = 'translate(-50%,-50%) rotateY(180deg)';
                } else {
                    style.transform = 'translate(-50%,-50%) rotateY(0deg)';
                }
            }else if(nggmlTransition==="explode"||nggmlTransition==="rotation"){
                altGallery.transition += ',width ' + altGallery.transitionInterval + 's linear,height ' + altGallery.transitionInterval + 's linear';
            }else if(nggmlTransition==="reveal-left"){
                jQuery( largeImg ).wrap( '<div class="nggml-reveal-wrapper" style="position:absolute;right:0px;height:100%;overflow:hidden;">' +
                    '<div style="position:absolute;right:0px;"></div></div>' );
                var parentParent=largeImg.parentNode.parentNode;
                var parentParentStyle=parentParent.style;  
                parentParentStyle.zIndex=style.zIndex;
                parentParentStyle.transition=altGallery.revealTransition;
                divLarge.appendChild(parentParent);
                continue;
            }
            divLarge.appendChild(largeImg);
        }   // for ( var i = 0; i < 2; i++ ) {
        var divSlideTitle=document.createElement("div");
        divSlideTitle.className="nggml-slide-title";
        divLarge.appendChild(divSlideTitle);
        var divSlideControls=document.createElement("div");
        divSlideControls.className="nggml-slide-controls";
        var button=document.createElement("button");
        button.className="nggml-slide-button nggml-slide-start";
        divSlideControls.appendChild(button);
        divLarge.appendChild(divSlideControls);
        button = document.createElement( 'button' );
        button.className="nggml-slide-button nggml-slide-left";
        divSlideControls.appendChild(button);
        divLarge.appendChild(divSlideControls);
        button = document.createElement( 'button' );
        button.className="nggml-slide-button nggml-slide-pause nggml-play-stop-button";
        divSlideControls.appendChild(button);
        divLarge.appendChild(divSlideControls);
        button = document.createElement( 'button' );
        button.className="nggml-slide-button nggml-slide-info nggml-info-button";
        divSlideControls.appendChild(button);
        divLarge.appendChild(divSlideControls);
        button = document.createElement( 'button' );
        button.className="nggml-slide-button nggml-slide-right";
        divSlideControls.appendChild(button);
        divLarge.appendChild(divSlideControls);
        button = document.createElement( 'button' );
        button.className="nggml-slide-button nggml-slide-end";
        divSlideControls.appendChild(button);
        divLarge.appendChild(divSlideControls);
        var $divLarge             = jQuery( divLarge );
        var colorFocused          = jQuery( 'button#nggml-alt-gallery-focused' ).css( 'background-color' );     // this is nggmlAltGalleryFocusColor in canonical css format
        var colorUnfocused        = jQuery( 'button#nggml-alt-gallery-unfocused' ).css( 'background-color' );   // unfocused color can be set in the css file
        var imgBorderWidth        = 2;
        var imgFocusedBorderWidth = 7;
        var liFocused             = null;                                                                       // image title with the focus
        var imgFocused            = null;                                                                       // image icon with the focus
        var image                 = this.images[0];
        containerWidth           -= 6;
        var fittedWidth = Math.floor( ( 0.74 * containerWidth - 20 ) / Math.floor( ( 0.74 * containerWidth - 20 ) / ( image.width + 2 * imgBorderWidth + 2 * imgFocusedBorderWidth ) ) ) -
                              2 * imgBorderWidth - 2 * imgFocusedBorderWidth - 1;
        var t0=null;
        function imgClick( e ) {
            if(jQuery(img.parentNode.parentNode).hasClass("nggml-alt-gallery-icons")||jQuery(img.parentNode.parentNode.parentNode).hasClass("nggml-alt-gallery-icons")){
                if(e.timeStamp-t0<250){
                    window.open(self.images[this.id.substr(10)].href,"_blank");
                }
            } else if(jQuery(img.parentNode.parentNode.parentNode).hasClass("nggml-alt-gallery-container")){
                window.open(self.images[this.id.substr(10)].href,"_blank");
            }
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
            e.returnValue=false;
            return false;
        }
        function flipLarge( $imgParent ) {
            var image = altGallery.preFlipLargeImage( divLarge, self, nggmlTransition === 'flip' ? false : true );      // find next img to use
            try {
                self.isLarge = true;
                if ( ! altGallery.setImgSrc(image, nggml.images[ $imgParent.find( 'div.nggml-alt-gallery-meta' )[0].id.substr( 11 ) ] ) ) {
                    if ( nggmlTransition !== 'flip' ) {                                                                 // image needs to be loaded
                        image.style.display = 'none';                                                                   // backface must be visible before rotateY transitions
                    }
                } else {                                                                                                // image src already set to new src
                    if ( image.dataset.loadState === 'loaded' && image.dataset.flipState !== 'flipped' ) {
                        altGallery.flipLargeImage( divLarge, image, self );
                    }
                }
            } catch ( e ) {
                image.src = altGallery.loading;
            }
            jQuery( spanLarge ).hide();
        }
        function imgHoverOn( e ) {
            if ( self.metaLocked ) {
                return;
            }
            if ( e.fromElement && jQuery( e.fromElement ).hasClass( 'nggml-alt-gallery-meta-image' ) ) {
                // no transition when entering from image icon
                return;
            }
            var $img                = jQuery( this );
            var $galleriesContainer = $img.closest( 'div.nggml-galleries-container' );
            $galleriesContainer.find( 'div.nggml-alt-gallery-titles li.nggml-alt-gallery' ).css( { backgroundColor: colorUnfocused } );
            $galleriesContainer.find( 'div.nggml-alt-gallery-icons div.nggml-alt-gallery' ).css( { backgroundColor: colorUnfocused, borderColor: colorUnfocused } );
            var id       = this.id.substr( 10 );
            var hasLarge = $galleriesContainer.hasClass( 'nggml-gallery-large' );
            if ( hasLarge ) {
                handleMouseEnterForLargeSlideShow( $img, id );
            }
            this.parentNode.style.borderColor        = colorFocused;
            this.parentNode.style.backgroundColor    = colorFocused;
            self.images[id].li.style.backgroundColor = colorFocused;
            id -= 2;
            jQuery( divTitles ).scrollTop( id > 0 ? jQuery( self.images[ id ].li ).position().top + jQuery( divTitles ).scrollTop() : 0 );
            altGallery.scrollContainerToTop( this );
            if ( hasLarge ) {
                flipLarge( $img.parent() );
            }
        }
        function imgHoverOff( e ) {
            if ( self.metaLocked ) {
                return;
            }
            if ( e.toElement && jQuery( e.toElement ).hasClass( 'nggml-alt-gallery-meta-image' ) ) {
                // no transition when leaving to image icon
                return;
            }
            var id   = this.id.substr( 10 );
            var $img = jQuery( this );
            if ( $img.closest( 'div.nggml-galleries-container' ).hasClass( 'nggml-gallery-large' ) ) {
                handleMouseLeaveForLargeSlideShow( $img, id );
            }
        }
        function metaClick( e ) {
            var $this    = jQuery( this );
            var $span    = jQuery( 'span#nggml-span-meta-' + this.id.substr( 11 ) );
            var $overlay = jQuery( 'div#nggml-meta-overlay' );
            if( self.metaLocked && $this.hasClass( 'nggml-red' ) ) {                              // meta overlay for this item is locked so unlock it
                self.metaLocked           = false;
                self.metaClicked          = null;
                //galleryShowingMetaOverlay = null;
                $this.removeClass( 'nggml-red' );
                $span.removeClass( 'nggml-red' );
                $overlay.removeClass( 'nggml-locked' );                
            } else {                                                                              // meta overlay for this item is not locked so lock it
                if ( self.metaLocked ) {                                                          // if meta overlay is locked by some other item
                    metaClick.call( self.metaClicked );                                           // then unlock the meta overlay
                    metaHoverOn.call( this );                                                     // and reload the meta overlay from the meta object of this item
                }
                self.metaLocked           = true;                                                 // lock meta overlay
                self.metaClicked          = this;
                galleryShowingMetaOverlay = self;
                $this.addClass( 'nggml-red' );
                $span.addClass( 'nggml-red' );
                $overlay.addClass( 'nggml-locked' );                
            }
            if ( e ) {
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
            }
            return false;
        }
        var isTitlesView;
        var isGoogleChromeAndScrollBarNeeded;
        var $divIcons;
        function metaHoverOn() {
            // var t0=performance.now();
            if ( self.metaLocked ) {                                                                               // ignore hover if meta overlay is already locked
                return;
            }
            var $container     = jQuery( this ).closest( 'div.nggml-galleries-container' );
            var isFullsizeView = $container.hasClass( 'nggml-galleries-container-full-view' );
            isTitlesView       = $container.hasClass( 'nggml-gallery-titles' );
            if ( ! isTitlesView ) {
                $divLarge.append( jQuery( 'div#nggml-meta-overlay' ) );
            }
            var $overlay       = showMetaOverlay( this.id.substr( 11 ), this );
            if ( isTitlesView ) {                                                                                  // position the meta overlay in titles view
                var $parent   = jQuery( window.nggml.preserveIconAspectRatio ? this.parentNode.parentNode : this.parentNode );
                $parent.offsetParent().append( $overlay );
                $divIcons     = $parent.closest( 'div.nggml-alt-gallery-icons' );
                var thisLeft  = $parent.offset().left;
                var divide    = ( isFullsizeView ? 0.35 : 0.55 ) * $divIcons.width();
                var left      = $parent.position().left > divide ? thisLeft - $overlay.outerWidth() : thisLeft + $parent.outerWidth();
                var userAgent = navigator.userAgent.toLowerCase();
                $overlay.css( 'left', left ).show();
                if ( isGoogleChromeAndScrollBarNeeded = userAgent.indexOf( 'chrome' ) !== -1 && userAgent.indexOf( 'edge' ) === -1 &&
                    $divIcons[0].scrollHeight > $divIcons[0].clientHeight ) {
                    $divIcons.css( { 'overflow-y': 'hidden', 'padding-right': '17px' } );
                }
            } else {                                                                                               // position the meta overlay in large view
                $divLarge.append( $overlay ).addClass( 'nggml-show-meta' );
                var $body = jQuery( 'body' );
                $overlay.css( 'left', $body.hasClass( 'nggml-galleries-container-full-view' ) && $body.hasClass( 'nggml-gallery-slideshow' ) ? '20%' : '5%' ).show();
            }
            // console.log("metaHoverOn()",performance.now()-t0);
        }   // function metaHoverOn() {
        function metaHoverOff() {
            // var t0=performance.now();
            if ( ! self.metaLocked ) {                                                                             // ignore if meta overlay is locked
                var $container = jQuery( 'div#nggml-meta-overlay' ).hide().parent();                               // otherwise hide the meta overlay
                if ( $container.hasClass( 'nggml-alt-gallery-large' ) ) {
                    $container.removeClass( 'nggml-show-meta' );
                }
            }
            if ( isTitlesView && isGoogleChromeAndScrollBarNeeded ) {
                $divIcons.css( { 'overflow-y': 'auto', 'padding-right': '0' } );
            }
            isTitlesView = isGoogleChromeAndScrollBarNeeded = $divIcons = undefined;
            // console.log("metaHoverOff()",performance.now()-t0);
        }   // function metaHoverOff() {
        function handleMouseEnterForLargeSlideShow( $item, id ) {
            // var t0=performance.now();
            if ( typeof id === 'string' ) {
                id = parseInt( id, 10 );
            }
            var $controls=$item.closest("div.nggml-galleries-container").find("div.nggml-alt-gallery-controls");
            if($controls.data("intervalId")){
                var $playIndex=$controls.data("index");
                if ( $playIndex !== id ) {
                    jQuery(self.images[$playIndex].li).mouseleave();
                    window.clearInterval($controls.data("intervalId"));
                    $controls.data("intervalId",0);
                    var $playControls = $controls.find( 'ul.nggml-navbar li.nggml-play-controls' );
                    $playControls.find("span.dashicons-controls-play").show();
                    $playControls.find("span.dashicons-controls-pause").hide();
                    $controls.data( 'pausedTimeStamp', (new Date()).getTime() );
                    $controls.data("pausedIndex",$playIndex);
                }
            }else{
                $controls.data( 'enterTimeStamp', (new Date()).getTime() );
                // console.log("entered:",(new Date).getTime());
                // console.log("entered:",e.timeStamp);
            }
            // console.log("handleMouseEnterForLargeSlideShow():",performance.now()-t0);
        }
        function handleMouseLeaveForLargeSlideShow( $item, id ) {
            // var t0=performance.now();
            var $controls=$item.closest("div.nggml-galleries-container").find("div.nggml-alt-gallery-controls");
            if(!$controls.data("intervalId")){
                if ( ( new Date() ).getTime() - $controls.data( 'pausedTimeStamp' ) < 1000 ) {
                    $controls.data("index",$controls.data("pausedIndex"));
                    $controls.find("ul.nggml-navbar li.nggml-play-controls").click();
                }
                // console.log("left:",(new Date).getTime()-$controls.data("enterTimeStamp"));
                if ( ( new Date() ).getTime() - $controls.data( 'enterTimeStamp' ) > 1000 ) {
                    $controls.data("index",id);
                }
            }
            // console.log("handleMouseLeaveForLargeSlideShow():",performance.now()-t0);
        }
        function liClick( e ) {
            if(e.timeStamp-t0<250){
                window.open(self.images[this.id.substr(9)].href,"_blank");
            }
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
            e.returnValue=false;
            return false;
        }
        function liHoverOn() {
            // var t0=performance.now();
            if ( self.metaLocked ) {
                return;
            }
            var $li                        = jQuery( this );
            var $galleriesContainer        = $li.closest( "div.nggml-galleries-container" );
            $galleriesContainer.find( "div.nggml-alt-gallery-titles li.nggml-alt-gallery" ).css( { backgroundColor: colorUnfocused } );
            $galleriesContainer.find( "div.nggml-alt-gallery-icons div.nggml-alt-gallery" ).css( { backgroundColor: colorUnfocused, borderColor: colorUnfocused } );
            var id                         = this.id.substr( 9 );
            var hasLarge                   = $galleriesContainer.hasClass( "nggml-gallery-large" );
            if ( hasLarge ) {
                handleMouseEnterForLargeSlideShow( $li, id );
            }
            var img                        = self.images[id].img;
            var imgParent                  = img.parentNode;
            var hasTitles                  = $galleriesContainer.hasClass( "nggml-gallery-titles" );
            var isExpanded                 = $galleriesContainer.hasClass( "nggml-galleries-container-full-view" );
            this.style.backgroundColor     = colorFocused;
            var imgParentStyle             = imgParent.style;
            imgParentStyle.backgroundColor = imgParentStyle.borderColor=colorFocused;
            // make the matching icon visible in its scrollview 
            if ( hasTitles || ( isExpanded && hasLarge ) ) {
                // In the titles view the icons are scrolled vertically
                id -= 4;
                jQuery( divIcons ).scrollTop( id > 0 ?
                    jQuery( window.nggml.preserveIconAspectRatio ? self.images[ id ].img.parentNode.parentNode : self.images[ id ].img.parentNode ).position().top +
                        jQuery( divIcons ).scrollTop() :
                    0 );
            } else if ( hasLarge ) {
                // In the large view the icons are scrolled horizontally
                var offset       = window.matchMedia( 'screen and (max-aspect-ratio: 4/5)' ).matches ? 1 : 2;
                var leftAdjacent = jQuery( window.nggml.preserveIconAspectRatio ? self.images[ id>=offset ? id-offset : 0 ].img.parentNode.parentNode :
                                                                                  self.images[ id>=offset ? id-offset : 0 ].img.parentNode );
                // console.log('leftAdjacent[0].firstChild.src=',leftAdjacent[0].firstChild.src);
                // console.log('leftAdjacent.position().left=',leftAdjacent.position().left);
                // console.log('leftAdjacent[0].offsetLeft=',leftAdjacent[0].offsetLeft);
                leftAdjacent.parent().scrollLeft( leftAdjacent[0].offsetLeft );
            }
            // Also center the gallery container in browser viewport
            altGallery.scrollContainerToTop( this );
            if ( hasLarge ) {
                // show the matching image in the large view
                flipLarge( jQuery( img.parentNode ) );
            }
            // console.log("liHoverOn()",performance.now()-t0);
        }
        function liHoverOff() {
            // var t0=performance.now();
            if(self.metaLocked){return;}
            var id  = this.id.substr( 9 );
            var $li = jQuery(this);
            if($li.closest("div.nggml-galleries-container").hasClass("nggml-gallery-large")){handleMouseLeaveForLargeSlideShow($li,id);}
            // console.log("liHoverOff()",performance.now()-t0);
        }
        for ( i = 0; i < this.images.length; i++ ) {
            /* jshint loopfunc: true */
            image = this.images[ i ];
            var div=document.createElement("div");
            div.className="nggml-alt-gallery";
            var divSize=(fittedWidth+2*imgBorderWidth);
            div.style.width=divSize+"px";
            var div1;
            if(window.nggml.preserveIconAspectRatio){
                div1 = document.createElement( 'div' );
                div1.className="nggml-alt-gallery-outer";
                div1.style.height=div1.style.width=divSize+2*imgFocusedBorderWidth+"px";
            }else{
                div.style.height=divSize+"px";
            }
            var img=document.createElement("img");
            img.className="nggml-alt-gallery";
            img.id="nggml-img-"+i;
            img.src=image.src;
            img.width=fittedWidth;
            img.height=fittedWidth;
            img.style.width=fittedWidth+"px";
            if(!window.nggml.preserveIconAspectRatio){
                img.style.height=fittedWidth+"px";
            }
            div.appendChild(img);
            var id=image.id;
            var meta=document.createElement("div");
            meta.id="nggml-meta-"+id;
            meta.className="nggml-alt-gallery-meta nggml-alt-gallery-meta-image nggml-gray";
            div.appendChild(meta);
            var full=document.createElement("div");
            full.id="nggml-full-"+id;
            full.className="nggml-alt-gallery-full nggml-alt-gallery-full-image";
            div.appendChild(full);
            if(window.nggml.preserveIconAspectRatio){
                div1.appendChild(div);
                divIcons.appendChild(div1);
            }else{
                divIcons.appendChild(div);
            }
            image.img=img;
            var li=document.createElement("li");
            li.className="nggml-alt-gallery";
            li.id="nggml-li-"+i;
            var spanMeta;
            var span;
            if(id!==null){
                span = document.createElement( 'span' );
                span.id="nggml-span-"+id;
                span.className="nggml-alt-gallery-full nggml-alt-gallery-full-image";
                li.appendChild(span);
                spanMeta = document.createElement( 'span' );
                spanMeta.id="nggml-span-meta-"+id;
                spanMeta.className="nggml-alt-gallery-meta nggml-alt-gallery-meta-image nggml-black";
                li.appendChild(spanMeta);
            }
            li.appendChild(document.createTextNode(image.text));
            divTitles.appendChild(li);
            image.li=li;
            jQuery( img ).each(function() {
                var $img = jQuery( this );
                if ( altGallery.touchOnly ) {                                         // if touch only device first touch simulates hover second touch simulates click
                    $img.click( function( e ) {
                        if ( self.metaLocked ) {
                            return;
                        }
                        if ( this.parentNode.style.borderColor !== colorFocused ) {   // border not highlighted so this is first touch
                            if ( liFocused ) {                                        // remove focus from previously focused image title
                                liHoverOff.call( liFocused, e );
                            }
                            if ( imgFocused ) {                                       // remove focus from previously focused image icon
                                imgHoverOff.call( imgFocused, e );
                            }
                            imgFocused = this;
                            return imgHoverOn.call( this, e );                        // simulate hover
                        } else {                                                      // this is second touch
                            return imgClick.call( this, e );
                        }
                    });
                } else {                                                              // mouse device
                    $img.click( imgClick );
                    $img.hover( imgHoverOn, imgHoverOff );
                }
            });
            jQuery(meta).each(function(){
                var meta=jQuery(this);
                if(altGallery.touchOnly){
                    meta.click(function(e){
                        if(this.parentNode.style.borderColor!==colorFocused){
                            jQuery(this.parentNode).find("img").click();
                        }
                        if(!jQuery("div#nggml-meta-overlay").is(":visible")){
                            metaHoverOn.call(this,e);
                            metaClick.call(this,e);
                        }else{
                            metaClick.call(this,e);
                            metaHoverOff.call(this,e);
                        }
                    });
                }else{
                    meta.hover(metaHoverOn,metaHoverOff);
                    meta.click(metaClick);
                }
            });
            jQuery( full ).click(function() {
                altGallery.showFullImageInPopup( nggml.images[ this.id.substr( 11 ) ] );
            });
            jQuery( li ).each(function() {
                var $li = jQuery( this );
                if ( altGallery.touchOnly ) {                                 // if device is touchonly first touch simulates hover and second touch simulates click
                    $li.click(function( e ) {
                       if ( self.metaLocked ) {
                          return;
                       }
                       if ( this.style.backgroundColor !== colorFocused ) {   // background not highlighted so this is the first touch
                            if ( imgFocused ) {                               // remove focus from previously focused image icon
                                imgHoverOff.call( imgFocused, e );
                            }
                            if ( liFocused ) {                                // remove focus from previously focused image title
                                liHoverOff.call( liFocused,e );
                            }
                            liFocused = this;
                            return liHoverOn.call( this, e );                 // simulate hover
                        } else {                                              // this is the second touch
                            return liClick.call( this, e );                   // simulate click
                        }
                    });
                } else {                                                      // mouse device
                    $li.hover( liHoverOn, liHoverOff );
                    $li.click( liClick );
                }
            });
            jQuery( span ).click(function( e ) {
                jQuery( 'div#nggml-full-' + this.id.substr( 11 ) ).click();         // click the corresponding full icon
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
            });
            jQuery( spanMeta ).mouseenter(function( e ) {                           // events on the meta span will trigger events on the corresponding meta icon
                jQuery( 'div#nggml-meta-' + this.id.substr( 16 ) ).mouseenter();    // mousenter the corresponding meta icon
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
            }).mouseleave(function( e ) {
                jQuery( 'div#nggml-meta-' + this.id.substr( 16 ) ).mouseleave();    // mouseleave the corresponding meta icon
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
            });
            jQuery( spanMeta ).click(function( e ) {
                jQuery( 'div#nggml-meta-' + this.id.substr( 16 ) ).click();         // click the corresponding meta icon
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
            });
        }   // for(var i=0;i<this.images.length;i++){
        var x0=null;
        var y0=null;
        var fullView=null;
        var titlesView=null;
        var $scrollable=jQuery(divIcons)
            .mousedown(function(e){
                var $container=$scrollable.closest("div.nggml-galleries-container");
                fullView=$container.hasClass("nggml-galleries-container-full-view");
                titlesView=$container.hasClass("nggml-gallery-titles");
                x0=e.clientX;
                y0=e.clientY;
                t0=e.timeStamp;
                e.preventDefault();
            })
            .mousemove(function( e ) {
                if ( e.currentTarget === $scrollable[0] && x0 !== null ) {
                    if(fullView||titlesView){
                        $scrollable.scrollTop($scrollable.scrollTop()-(e.clientY-y0));
                    }else{
                        $scrollable.scrollLeft($scrollable.scrollLeft()-(e.clientX-x0));
                    }
                    x0=e.clientX;
                    y0=e.clientY;
                    e.preventDefault();
                }
            })
            .mouseup(function(e){
                if(e.currentTarget===$scrollable[0]){
                    titlesView=fullView=y0=x0=null;
                    e.preventDefault();
                }
            })
            .mouseleave(function(e){
                if(e.currentTarget===$scrollable[0]){t0=titlesView=fullView=y0=x0=null;}
            });
            
        var titlesY0=null;
        var titlesScrollable=jQuery(divTitles)
            .mousedown(function(e){
                titlesY0=e.clientY;
                t0=e.timeStamp;
                e.preventDefault();
            })
            .mousemove(function(e){
                if(titlesY0!==null){
                    titlesScrollable.scrollTop(titlesScrollable.scrollTop()-(e.clientY-titlesY0));
                    titlesY0=e.clientY;
                }
                e.preventDefault();
            })
            .mouseup(function(e){
                titlesY0=null;
                e.preventDefault();
            })
            .mouseleave(function(e){
                if(e.currentTarget!==titlesScrollable[0]){
                    return;
                }
                titlesY0=null;
            });
        $divLarge.find( 'img.nggml-large-image' ).load(function() {   // on img load resize image then flip it
            var container=jQuery(this.parentNode);
            var W=container.width()-50;
            var H=container.height()-50;
            var w=this.naturalWidth;
            var h=this.naturalHeight;
            var width;
            var height;
            var rw;
            var rh;
            var r;
            if(!nggmlStretchToFit){
                rw = 1;
                rh = 1;
                if(w>W){rw=W/w;}
                if(h>H){rh=H/h;}
                if(rw<rh){r=rw;}else{r=rh;}
                this.width=width=Math.floor(r*w);
                this.height=height=Math.floor(r*h);
            }else{
                if(nggmlPreserveAspectRatio){
                  rw = W / w;
                  rh = H / h;
                  r = rw <= rh ? rw : rh;
                  this.width=width=Math.floor(r*w);
                  this.height=height=Math.floor(r*h);
                }else{
                  this.width=width=W;
                  this.height=height=H;
                }
            }
            jQuery(this).css({width:width+"px",height:height+"px"});
            jQuery(this).data({width:width,height:height});
            this.dataset.loadState="loaded";
            if ( nggmlTransition !== 'flip' ) {
                altGallery.flipLargeImage( divLarge, this, self );
            } else {
                var img                  = this;           // flip sometimes does not seem to render the backface until after the rotation (why?) so ...
                var style                = img.style;
                style.backfaceVisibility = 'visible';      // force backface to render before rotateY transition by making it visible with low opacity
                style.opacity            = '0.0001';       // I don't understand why this is neccessary but it seems to work!
                window.setTimeout(function() {
                    style.backfaceVisibility = 'hidden';   // restore original css
                    style.opacity            = '1.0';
                    altGallery.flipLargeImage( divLarge, img, self );
                }, 100 );
            }
        });
        if ( ! altGallery.touchOnly ) {
            $divLarge.hover(
                function() {
                    if(self.slideShow){
                        //jQuery(this).find("div.nggml-slide-title").show();
                        jQuery(this).find("div.nggml-slide-controls").show();
                    }
                },
                function() {
                    //jQuery(this).find("div.nggml-slide-title").hide();
                    jQuery(this).find("div.nggml-slide-controls").hide();
                }        
            );
        }
        $divLarge.click( function( e ) {
            e.stopPropagation();
        });
        $divLarge.find( 'div.nggml-slide-controls button.nggml-slide-button' ).click(function( e ) {
            var $this  = jQuery( this );
            var button = this;
            function showSlideAt(i){
                if(typeof self.slideShowId!=="undefined"){
                    window.clearInterval(self.slideShowId);
                    self.slideShowId = undefined;
                }
                var largeImg=jQuery(divLarge).find("img.nggml-large-image").css("transition","");
                if(nggmlTransition==="reveal-left"){largeImg.parent().parent().css("transition","");}
                self.slideShowIndex=i;
                self.showSlideShow();
                jQuery(button.parentNode).find("button.nggml-play-stop-button").removeClass("nggml-slide-pause").addClass("nggml-slide-play");
            }
            var largeImg;
            if($this.hasClass("nggml-slide-pause")){
                window.clearInterval(self.slideShowId);
                self.slideShowId = undefined;
                largeImg = jQuery( divLarge ).find( 'img.nggml-large-image' ).css( 'transition', '' );
                if(nggmlTransition==="reveal-left"){largeImg.parent().parent().css("transition","");}
                $this.removeClass("nggml-slide-pause").addClass("nggml-slide-play");
            }else if($this.hasClass("nggml-slide-play")){
                largeImg = jQuery( divLarge ).find( 'img.nggml-large-image' ).css( 'transition', altGallery.transition );
                if(nggmlTransition==="reveal-left"){largeImg.parent().parent().css("transition",altGallery.revealTransition);}
                self.showSlideShow();
                self.slideShowId=window.setInterval(self.showSlideShow,nggmlSlideShowInterval);
                $this.removeClass("nggml-slide-play").addClass("nggml-slide-pause");
            }else if($this.hasClass("nggml-slide-right")){
                showSlideAt(self.slideShowIndex);
            }else if($this.hasClass("nggml-slide-left")){
                showSlideAt((self.imagesCount+self.slideShowIndex-2)%self.imagesCount);
            }else if($this.hasClass("nggml-slide-start")){
                showSlideAt(0);
            }else if($this.hasClass("nggml-slide-end")){
                showSlideAt(self.imagesCount-1);
            }
            e.stopPropagation();
        });
        $divLarge.find( 'div.nggml-slide-controls button.nggml-info-button' ).hover(
            function() {                                                                                     // show meta overlay
                if ( self.metaLocked ) {
                    return;
                }
                if ( typeof self.slideShowId !== 'undefined' ) {                                             // the slide show is running
                    window.clearInterval( self.slideShowId );                                                // so stop the slide show
                    self.slideShowId = undefined;
                }
                var $overlay = showMetaOverlay( jQuery( this ).data( 'meta-id' ), this );
                $divLarge.append( $overlay );                                                                // position meta overlay in large view
                var $body    = jQuery( 'body' );
                $overlay.css( 'left', window.matchMedia( '(min-width:1200px)' ).matches &&
                    ( $body.hasClass( 'nggml-galleries-container-full-view' ) || $body.hasClass( 'nggml-full-viewport-slideshow' ) ) ? '20%' : '5%' ).show();
            },
            function() {
                if ( self.metaLocked ) {
                    return;
                }
                jQuery( 'div#nggml-meta-overlay' ).hide();
                if ( $divLarge.find( 'button.nggml-play-stop-button' ).hasClass( 'nggml-slide-pause' ) ) {   // the slide show was running
                    self.slideShowId = window.setInterval( self.showSlideShow,nggmlSlideShowInterval );      // so restart the slide show
                }
            }
        ).click(function() {
            var $this    = jQuery( this );
            var $overlay = jQuery( 'div#nggml-meta-overlay' );
            if ( ! self.metaLocked ) {                                                                       // meta overlay is not locked so lock it
                self.metaLocked           = true;
                galleryShowingMetaOverlay = self;
                $this.addClass( 'nggml-red' );
                $overlay.addClass( 'nggml-locked' ).show();
                $divLarge.find( 'div.nggml-slide-controls button.nggml-slide-button' ).prop( 'disabled', true );
                $this.prop( 'disabled', false );
                var $playButton = $divLarge.find( 'div.nggml-slide-controls button.nggml-play-stop-button' );
                if ( $playButton.hasClass( 'nggml-slide-pause' ) ) {                                         // slide show is running
                    if ( typeof self.slideShowId !== 'undefined' ) {                                         // so turn it off
                        window.clearInterval( self.slideShowId );
                        self.slideShowId = undefined;
                    }
                    $divLarge.find( 'img.nggml-large-image' ).css('transition', '' );                        // turn off transitions
                    $playButton.removeClass( 'nggml-slide-pause' ).addClass( 'nggml-slide-play' );           // flip button label from pause to play
                }
            } else {                                                                                         // meta overlay is locked so unlock it 
                self.metaLocked           = false;
                //galleryShowingMetaOverlay = null;
                $this.removeClass( 'nggml-red' );
                $overlay.removeClass( 'nggml-locked' ).hide();
                $divLarge.find( 'div.nggml-slide-controls button.nggml-slide-button' ).prop( 'disabled', false );
            }
        });
        var divContainer=document.createElement("div");
        divContainer.className="nggml-alt-gallery-container";
        divContainer.appendChild(divTitles);
        divContainer.appendChild(divIcons);
        divContainer.appendChild(divLarge);
        jQuery(divContainer).find("*").css("boxSizing","border-box");
        jQuery(divIcons).find("*").css("boxSizing","content-box");
        if ( nggmlTransition === 'flip' ) {
            var $flipDiv = jQuery( document.createElement( 'div' ) );
            $flipDiv.addClass( 'nggml-slide-flip-container' );
            $flipDiv.append( $divLarge.find( 'img.nggml-large-image' ).addClass( 'nggml-slide-flip' ) );
            $divLarge.addClass( 'nggml-slide-flip' ).append( $flipDiv );
            
        }
        return divContainer;
    };  // altGallery.gallery.prototype.recreate = function( containerWidth ) {    // create the base HTML for the gallery
      
    altGallery.gallery.prototype.createJustified = function() {
        var div       = document.createElement( 'div' );
        div.className = 'nggml-justified-gallery-container';
        for ( var i = 0; i < this.images.length; i++ ) {                           // create HTML elements for jQuery Justified Gallery
            var image         = this.images[ i ];
            var a             = document.createElement( 'a' );
            a.id              = 'nggml-miro-' + image.id;
            a.href            = image.href;
            a.target          = '_blank';
            var img           = document.createElement( 'img' );
            img.src           = image.image.attachment_image_src_medium[0];
            img.alt           = image.text;
            a.appendChild( img );
            var caption       = document.createElement( 'div' );                 // caption for image
            caption.className = 'caption';
            var span          = document.createElement( 'span' );
            span.textContent  = image.text;
            caption.appendChild( span );
            span              = document.createElement( 'span' );                // icon for full screen popup image
            span.className    = 'dashicons dashicons-editor-expand';
            caption.appendChild( span );
            if ( ! altGallery.touchOnly ) {
                span              = document.createElement( 'span' );            // icon for image meta info overlay
                span.className    = 'dashicons dashicons-info';
                caption.appendChild( span );
            }
            a.appendChild( caption );
            div.appendChild( a );
        }
        return div;
    };   // altGallery.gallery.prototype.createJustified = function() {

    return altGallery;
}() );   // var nggmlAltGallery=function(){

jQuery(document).ready(function(){
    jQuery( 'div.nggml-search-fields-show-button' ).click(function() {
        var $this = jQuery( this );
        if ( $this.text() === 'Open' ) {
            $this.text( 'Close' );
            jQuery("div.nggml-search-fields-values",this.parentNode).css("display","block");
        }else{
            $this.text( 'Open' );
            jQuery("div.nggml-search-fields-values",this.parentNode).css("display","none");
        }
        return false;
    });
    jQuery("div.nggml-search-fields-values input[type='checkbox']").change(function(){
      this.parentNode.parentNode.style.backgroundColor = ( jQuery( 'input[type="checkbox"]:checked', this.parentNode ).size() +
          jQuery( 'input[type="text"]', this.parentNode ).filter(function() {
              return jQuery( this ).val();
          }).size() ) ? 'white' : this.parentNode.parentNode.parentNode.style.backgroundColor;
    });
    jQuery("div.nggml-search-fields-values input[type='text']").change(function(){
      this.parentNode.parentNode.style.backgroundColor = ( jQuery( 'input[type="checkbox"]:checked',this.parentNode).size() +
          jQuery( 'input[type="text"]', this.parentNode ).filter(function() {
              return jQuery(this).val();
          }).size() ) ? 'white' : this.parentNode.parentNode.parentNode.style.backgroundColor;
    });
    jQuery("input[type='button']#nggml-search-fields-reset").click(function(){
      jQuery("div.nggml-search-fields-values input[type='checkbox']").prop("checked",false);
      jQuery("div.nggml-search-fields-values input[type='text']").val("");
      jQuery("div.nggml-search-fields").css("background-color",jQuery("div#nggml-search-fields-parameters").css("background-color"));
    });
    jQuery("input[type='button']#nggml-search-fields-cancel").click(function(){
        jQuery("div#nggml-search-widget-outer-overlay").hide();
    });
    jQuery( 'input[type="submit"]#nggml-search-fields-submit' ).click(function( e ) {
        var $this = jQuery( this );
        if ( $this.data( 'ajax' ) ) {
            e.preventDefault();
            document.body.appendChild( document.querySelector( 'div#nggml-meta-overlay' ) );
            jQuery( 'div#tmlLoadingOuter' ).show();
            jQuery( 'div#nggml-search-widget-outer-overlay' ).hide();
            var query = 'action=nggml_search&' + $this.closest( 'form.nggml-search-fields-form' ).serialize();
            jQuery.get( $this.data( 'ajax-url' ), query, function( r ) {
                var $container = $this.data( 'gallery' ).parent();
                var $newGallery = jQuery( r );
                $container.replaceWith( $newGallery );
                window.setTimeout(function() {
                    nggmlAltGallery.doGallery.call( $newGallery.filter( 'div.gallery' ).css({position:"relative",paddingTop:"15px"})[0], $this.data( 'view' ),
                                                    $this.data( 'expanded' ) );
                    jQuery( 'div#tmlLoadingOuter' ).hide();
                }, 1000 );
            });
        }
    });
    jQuery("input[type='button']#nggml-search-fields-reset").click();
    jQuery("div.nggml-image-label-draggable").draggable({cursor:"crosshair",revert:true});
    jQuery("div.nggml-image-label-droppable").droppable({accept:"div.nggml-image-label-draggable",tolerance:"touch",
        hoverClass:"mf2tk-hover",drop:function(e,u){
            jQuery(this.parentNode).before(u.draggable);
    }});
    try{
        nggml.labelOrder=JSON.parse(window.localStorage.getItem("nggmlImageLabelOrder"));
        nggml.sortByLabel=JSON.parse(window.localStorage.getItem("nggmlSortByLabel"));
    }catch(e){
    }
    var orderBox=jQuery("div#nggml-image-label-order-box");
    if(nggml.labelOrder){
        nggml.labelOrder.reverse();
        nggml.labelOrder.forEach(function(field){
            orderBox.prepend(jQuery("div.nggml-image-label-draggable#nggml-image-label-"+field));
        });
        nggml.labelOrder.reverse();
    }else{
        nggml.labelOrder=['post_excerpt','post_title','_wp_attachment_image_alt'];
    }
    if(nggml.sortByLabel){
        jQuery("input#nggml-view-settings-sort").prop("checked",true);
    }
    jQuery( 'input#nggml-view-settings-save' ).click(function() {
        nggml.labelOrder=[];
        jQuery("div#nggml-image-label-order-box div.nggml-image-label-draggable").each(function(){
            if(this.dataset.labelField){
                nggml.labelOrder.push(this.dataset.labelField);
            }
        });
        nggml.sortByLabel=jQuery("input#nggml-view-settings-sort").prop("checked");
        try{
            window.localStorage.setItem("nggmlImageLabelOrder",JSON.stringify(nggml.labelOrder));
            window.localStorage.setItem("nggmlSortByLabel",JSON.stringify(nggml.sortByLabel));
        }catch(e){
        }
        jQuery("div#nggml-view-settings-outer-overlay").hide();
        document.location.reload();
    });
    jQuery( 'input[type="button"]#nggml-view-settings-cancel' ).click(function() {
        jQuery("div#nggml-view-settings-outer-overlay").hide();
    });
    var $nggmlMetaOverlay = jQuery( 'div#nggml-meta-overlay' );
    document.addEventListener( 'wheel', function( e ) {                                    // when the meta overlay is visible let the overlay capture the wheel events
        if ( $nggmlMetaOverlay.is( ':visible' ) ) {
            e.stopPropagation();
            e.preventDefault();
            var top          = $nggmlMetaOverlay.scrollTop();
            var height       = $nggmlMetaOverlay.outerHeight();
            var scrollHeight = $nggmlMetaOverlay[0].scrollHeight;
            if ( e.deltaY > 0 && scrollHeight - top > height ) {                           // the bottom of the overlay is hidden so scroll down by 20px
                top += 20;
            } else if ( e.deltaY < 0 && top > 0 ) {                                        // the top of the overlay is hidden so scroll up by 20px
                top -= 20;
            }
            $nggmlMetaOverlay.scrollTop( top );
        }
    });
    nggmlAltGallery.init();
});
