=== Tags for Media Library ===
Contributors: Black 68 Charger,Magenta Cuda
Tags: taxonomy tags,media library,NextGEN Gallery,nggtags,convertor,alternative,replacement
Requires at least: 4.6
Tested up to: 4.8
Stable tag: 1.2.3.7.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Features for using taxonomy tags with Media Library. Also converts NextGEN Gallery images to WordPress Media Library images.

== Description ==
TML - [Tags for Media Library](http://nggtagsforwpml.wordpress.com/) may be useful to anyone trying to use taxonomy tags on WordPress Media Library items. TML supports [dynamically generating galleries](http://nggtagsforwpml.wordpress.com/#nggtags) using a criteria based on taxonomy tags, [multiple tag taxonomies](http://nggtagsforwpml.wordpress.com/#additional-taxonomies) for media items, [bulk assignment/removal](http://nggtagsforwpml.wordpress.com/#bulk-tag-edit) of taxonomy tags to/from media items, filtering the Media Library [by taxonomy tags](http://nggtagsforwpml.wordpress.com/#media-library-for-nggtags), sorting the media items based on a [priority tag](http://nggtagsforwpml.wordpress.com/#bulk-priority-edit), a [search widget](http://nggtagsforwpml.wordpress.com/a-widget-for-searching-the-media-library-by-taxonomy) for media items using a criteria based on taxonomy tags and an [alternate high density view](http://nggtagsforwpml.wordpress.com/#hi-density-media-library) of the Media Library. The website for this plugin is [here](http://nggtagsforwpml.wordpress.com/).  **This version requires WordPress 4.6 and PHP 5.4.**

= A Multi-View Gallery Viewer =

TML also includes a gallery viewer. [TML's gallery viewer](http://tml.magentacuda.com/) is a plug compatible replacement for the standard WordPress gallery viewer for the WordPress &#91;gallery&#93; shortcode. It can be used independently of the other features of TML and supports five different views of a gallery.

= Converting NextGEN Gallery 1.9 to WordPress Media Library =

For NextGEN Gallery 1.9 users: This plugin first converts NextGEN Gallery's image database to a WordPress Media Library image database. After the conversion NextGEN Gallery images and galleries have become WordPress Media Library images and galleries. A WordPress taxonomy 'ngg_tag' is created and the NextGEN Gallery image tags are saved in this taxonomy. This plugin implements the NextGEN Gallery shortcodes [nggtags], [nggallery], [slideshow], [album] and [singlepic] by dynamically translating them into an equivalent standard WordPress [gallery] shortcode so post content with these shortcodes will still work without editing the post content. NextGEN Gallery's sortorder is implemented using a tag taxonomy to hold priorities. **This plugin works with NextGEN Gallery 1.9.13.**

== Installation ==
1. Upload 'nggtags-for-wp-media-library to the '/wp-content/plugins' directory.
2. For NextGEN Gallery 1.9 users: Backup your MySQL WordPress tables.
3. For NextGEN Gallery 1.9 users: Deactivate NextGEN Gallery.
4. Activate this plugin through the 'Plugins' menu in WordPress.
5. For NextGEN Gallery 1.9 users: Run the conversion utility using the Dashboard menu item 'nggtags for Media Library'.

== Frequently Asked Questions ==
= What if you do not have NextGEN Gallery installed? =
No conversion is necessary and the plugin can still be used as implementation of the shortcode 'nggtags' which allows you to have dynamically generated galleries based on tags.

== Screenshots ==
1. TML Large Image View
2. Miro's Justified View
3. TML Slide Show View
4. TML Titles View
5. Media Library with NGG Tags
6. Edit Media with NGG Tags
7. Search Media using NGG Tags
8. The Conversion Log
9. The Enhanced WordPress Media Library Page
10. The Bulk Tag Taxonomy Editor
11. Search Widget Administrator's Interface
12. Search Widget User's Interface
13. The Bulk Priority Editor
14. High Density Media Library View

== Changelog ==
= 1.2.3.7.2 =
* fix syntax error in the underscore.js template for the meta overlay
* fix HTML errors reported by validator.w3.org
= 1.2.3.7.1 =
* fix scrollbar bug in titles view of Microsoft Edge browser
* fix transition bug when entering/leaving info icon
* clicking on overlay background closes overlay
= 1.2.3.7 =
* added meta info overlay to miro view
* redesigned layout of titles view and large view in portrait mode
* fix layout problems with mobile phones
= 1.2.3.6.3 =
* workaround for bug in Google Chrome where scrollbar shows in overlay
* fix rotation bug for flip transitions on reload of a gallery
* enhanced overlay for fullsize large view
= 1.2.3.6.2 =
* enhanced overlay view for fullsize titles view
* fix blank screen bug
* fix access bug for Tags for Media Library page on GoDaddy hosted sites
* fix truncated HTTP GET url bug

= 1.2.3.6.1 =
* meta overlay now captures mouse wheel events
* load user meta template from theme directory
= 1.2.3.6 =
* rewrote the meta overlay code
* replaced my proprietary templates for the meta overlay with underscore.js templates
* apply the 'the_content' filters to the image description in the meta overlay
* include taxonomy tags in the meta overlay
* add instructions for the user to modify the meta overlay template, 'nggtags-meta-overlay-template.php'
= 1.2.3.5.1 =
* fix bottom alignment bug for full browser viewport titles and slide views
= 1.2.3.5 =
* added flip card transition for slide show
= 1.2.3.4.1 =
* fix incorrectly hard coded time interval for slide show in large view - use time interval from settings
* (partial) work arounds for quirks in Microsoft Edge - does not preload image, does not resize browser window
= 1.2.3.4 =
* settings field for Miro's gallery row height
* toggle for showing captions on Miro's gallery
* full size popup button for Miro's gallery images
* preload next image for large view slide show to reduce stuttering
* some bad code replaced
= 1.2.3.3.1 =
* fix bug where meta overlay is sometimes not displayed after a search is done.
= 1.2.3.3 =
* integration of the search widget directly into the gallery viewer
* search widget results are returned using AJAX and used to refresh the existing gallery view instead of loading a new page
= 1.2.3.2 =
* added option to preserve aspect ratio for gallery thumbnails
* added option to sort images by priority, date or title in admin media library view - see Screen Options
* added lock to title items in admin media library view
* fix bug in admin media library view where layout is confused after a new image is inserted
* show no image instead of stale image when remote server does not respond quickly in large view
= 1.2.3.1 =
* optimize the info overlay for the full browser viewport view
* bug fixes and css tweaks
= 1.2.3 =
* now supports a full browser viewport view of all views: standard, miro's, titles, large and slideshow
* the large view now supports an embedded slideshow
* titles and large view modernize to use the CCS3 flexbox which allows a prettier layout
* fixed a nasty bug which caused the large image to not load correctly when the server took a long time to respond
* many CSS tweaks to fix alignment problems with some themes that used box-sizing = content-box
= 1.2.1 =
* added [Miro's Justified Gallery](http://miromannino.github.io/Justified-Gallery/)
* enhancements and bug fixes to Titles and Large views
* compatible up to WordPress 4.7-RC1
= 1.2 =
* added sorting by caption
* obsolete code rewritten to use new HTML features
* bug fixes
= 1.1.1.8 =
* fix 'Loading...' bug
= 1.1.1.7 =
* cosmetic and usability enhancements
= 1.1.1.6 =
* more bug fixes and css tweaks
* prettify the gallery output
* add the missing TML views options to the gallery shortcode
= 1.1.1.5 =
* compatibility with 4.6
* bug fixes
* css tweaks for fit and finish
= 1.1.1.4 =
* fixed broken individual image update
= 1.1.1.3 =
* fixed broken bulk priority editor
* added mobile support for 'titles' and 'large image' gallery views
* re-styled 'titles' and 'large image' gallery views
= 1.1.1.2 =
* fixed broken admin gallery view again
= 1.1.1.1 =
* fixed broken admin gallery view
= 1.1.1 =
* added fade in, explode, rotate and reveal transitions to slideshow
= 1.1 =
* added full browser window mode for slideshow
* added image details popup to slideshow view
* added preserve aspect ratio option
* added shortcode option tml_views to configure gallery mode selection
* conversion from NextGEN Gallery now stores NextGEN galleries and albums in its own post type - "tml_galleries_albums"
= 1.0 =
* implements a slideshow view
* so now also converts the NextGEN Gallery slideshow shortcode
* fix some bugs
= 0.10 =
* fix captions for [nggtags album] shortcode
* fix alternate gallery view to work with themes using non default css box-sizing
* fix various other bugs
* conversion from NextGEN Gallery now also does albums
* conversion from NextGEN Gallery now also does the exclude flag
* use NextGEN Gallery shortcode parameters as HTML class attributes to the converted WordPress gallery
* bulk operations now support attach to post
* admin media view now supports filtering by gallery (i.e. uploaded to)
* another alternate gallery view
* edit/view/delete links now accessible in row view
= 0.8.1.2 =
* show meta data for images in overlay
= 0.8.1.1 =
* enhanced to work better with WordPress 4.0
= 0.8.1 =
* added optional high density view to WordPress standard gallery
= 0.8 =
* added optional high density media list view
= 0.7.1.1 =
* add optional checkboxes overlay for multiple select
* added help for Media Library for NGG Tags page
* reset button for search widget
= 0.7.1 =
* sort images in Media Library for nggtags by priority
* change taxonomy select boxes in Media Library for nggtags to multiple selection
* show existing priorities in Bulk Priority Editor
* make images in Bulk Priority Editor removable
= 0.7 =
* added bulk priority (sort order) editor
* fix problem with backslashes (\) in file paths on Windows servers causing wp_generate_attachment_metadata() to fail in conversion process
= 0.6 =
* added search widget for Media Library
= 0.5 =
* modified WordPress media library page to filter by tags and bulk add/remove tags
= 0.4 =
* support for multiple taxonomies and boolean expressions 
= 0.3.1 =
* change conversion logic to prevent timeout on larger databases 
= 0.3.0.1 =
* fix sort order bug on Media Library screen
= 0.3 =
* Added support for NextGEN Gallery's sort order and shortcodes nggallery and singlepic
= 0.2 =
* Modified Media Library's 'Search Media' to search by NGG Tags or gallery
= 0.1 =
* Initial release.

== Upgrade Notice ==
= 1.2.3.7.2 =
* fix syntax error in the underscore.js template for the meta overlay
* fix HTML errors reported by validator.w3.org
= 1.2.3.7.1 =
* fix scrollbar bug in titles view of Microsoft Edge browser
* fix transition bug when entering/leaving info icon
* clicking on overlay background closes overlay
= 1.2.3.7 =
* added meta info overlay to miro view
* redesigned layout of titles view and large view in portrait mode
* fix layout problems with mobile phones
= 1.2.3.6.3 =
* workaround for bug in Google Chrome where scrollbar shows in overlay
* fix rotation bug for flip transitions on reload of a gallery
* enhanced overlay for fullsize large view
= 1.2.3.6.2 =
* enhanced overlay view for fullsize titles view
* fix blank screen bug
* fix access bug for Tags for Media Library page on GoDaddy hosted sites
* fix truncated HTTP GET url bug
= 1.2.3.6.1 =
* meta overlay now captures mouse wheel events
* load user meta template from theme directory
= 1.2.3.6 =
* rewrote the meta overlay code
* replaced my proprietary templates for the meta overlay with underscore.js templates
* apply the 'the_content' filters to the image description in the meta overlay
* include taxonomy tags in the meta overlay
* add instructions for the user to modify the meta overlay template, 'nggtags-meta-overlay-template.php'
= 1.2.3.5.1 =
* fix bottom alignment bug for full browser viewport titles and slide views
= 1.2.3.5 =
* added flip card transition for slide show
= 1.2.3.4.1 =
* fix incorrectly hard coded time interval for slide show in large view - use time interval from settings
* (partial) work arounds for quirks in Microsoft Edge - does not preload image, does not resize browser window
= 1.2.3.4 =
* settings field for Miro's gallery row height
* toggle for showing captions on Miro's gallery
* full size popup button for Miro's gallery images
* preload next image for large view slide show to reduce stuttering
* some bad code replaced
= 1.2.3.3.1 =
* fix bug where meta overlay is sometimes not displayed after a search is done.
= 1.2.3.3 =
* integration of the search widget directly into the gallery viewer
* search widget results are returned using AJAX and used to refresh the existing gallery view instead of loading a new page
= 1.2.3.2 =
* added option to preserve aspect ratio for gallery thumbnails
* added option to sort images by priority, date or title in admin media library view - see Screen Options
* added lock to title items in admin media library view
* fix bug in admin media library view where layout is confused after a new image is inserted
* show no image instead of stale image when remote server does not respond quickly in large view
= 1.2.3.1 =
* optimize the info overlay for the full browser viewport view
* bug fixes and css tweaks
= 1.2.3 =
* now supports a full browser viewport view of all views: standard, miro's, titles, large and slideshow
* the large view now supports an embedded slideshow
* titles and large view modernize to use the CCS3 flexbox which allows a prettier layout
* fixed a nasty bug which caused the large image to not load correctly when the server took a long time to respond
* many CSS tweaks to fix alignment problems with some themes that used box-sizing = content-box
= 1.2.1 =
* added [Miro's Justified Gallery](http://miromannino.github.io/Justified-Gallery/)
* enhancements and bug fixes to Titles and Large views
* compatible up to WordPress 4.7-RC1
= 1.2 =
* added sorting by caption
* obsolete code rewritten to use new HTML features
* bug fixes
= 1.1.1.8 =
* fix 'Loading...' bug
= 1.1.1.7 =
* cosmetic and usability enhancements
= 1.1.1.6 =
* more bug fixes and css tweaks
* prettify the gallery output
* add the missing TML views options to the gallery shortcode
= 1.1.1.5 =
* compatibility with 4.6
* bug fixes
* css tweaks for fit and finish
= 1.1.1.4 =
* fixed broken individual image update
= 1.1.1.3 =
* fixed broken bulk priority editor
* added mobile support for 'titles' and 'large image' gallery views
* re-styled 'titles' and 'large image' gallery views
= 1.1.1.2 =
* fixed broken admin gallery view again
= 1.1.1.1 =
* fixed broken admin gallery view
= 1.1.1 =
* added fade in, explode, rotate and reveal transitions to slideshow
= 1.1 =
* added full browser window mode for slideshow
* added image details popup to slideshow view
* added preserve aspect ratio option
* added shortcode option tml_views to configure gallery mode selection
* conversion from NextGEN Gallery now stores NextGEN galleries and albums in its own post type - "tml_galleries_albums"
= 1.0 =
* implements a slideshow view
* so now also converts the NextGEN Gallery slideshow shortcode
* fix some bugs
= 0.10 =
* fix captions for [nggtags album] shortcode
* fix alternate gallery view to work with themes using non default css box-sizing
* fix various other bugs
* conversion from NextGEN Gallery now also does albums
* conversion from NextGEN Gallery now also does the exclude flag
* use NextGEN Gallery shortcode parameters as HTML class attributes to the converted WordPress gallery
* bulk operations now support attach to post
* admin media view now supports filtering by gallery (i.e. uploaded to)
* another alternate gallery view
* edit/view/delete links now accessible in row view
= 0.8.1.2 =
* show meta data for images in overlay
= 0.8.1.1 =
* enhanced to work better with WordPress 4.0
= 0.8.1 =
* added optional high density view to WordPress standard gallery
= 0.8 =
* added optional high density media list view
= 0.7.1.1 =
* add optional checkboxes overlay for multiple select
* added help for Media Library for NGG Tags page
* reset button for search widget
= 0.7.1 =
* sort images in Media Library for nggtags by priority
* change taxonomy select boxes in Media Library for nggtags to multiple selection
* show existing priorities in Bulk Priority Editor
* make images in Bulk Priority Editor removable
= 0.7 =
* added bulk priority (sort order) editor
* fix problem with backslashes (\) in file paths on Windows servers causing wp_generate_attachment_metadata() to fail in conversion process
= 0.6 =
* added search widget for Media Library
= 0.5 =
* modified WordPress media library page to filter by tags and bulk add/remove tags
= 0.4 =
* support for multiple taxonomies and boolean expressions 
= 0.3.1 =
* change conversion tasks to prevent timeout on larger databases
= 0.3.0.1 =
* fix sort order bug on Media Library screen
= 0.3 =
* Added support for NextGEN Gallery's sort order and shortcodes nggallery and singlepic
= 0.2 =
* Modified Media Library's 'Search Media' to search by NGG Tags or gallery
= 0.1 =
* Initial release.

