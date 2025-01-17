// modified from wp-admin\js\inline-edit-post.js

/* global inlineEditL10n, ajaxurl, typenow */

var inlineEditPost;
(function($) {
inlineEditPost = {

	init : function(){
		var t = this, qeRow = $('#inline-edit'), bulkRow = $('#bulk-edit');

		t.type = $('table.widefat').hasClass('pages') ? 'page' : 'post';
		t.what = '#post-';

		// prepare the edit rows
		qeRow.keyup(function(e){
			if ( e.which === 27 ) {
				return inlineEditPost.revert();
			}
		});
		bulkRow.keyup(function(e){
			if ( e.which === 27 ) {
				return inlineEditPost.revert();
			}
		});

		$('a.cancel', qeRow).click(function(){
			return inlineEditPost.revert();
		});
		$('a.save', qeRow).click(function(){
			return inlineEditPost.save(this);
		});
		$('td', qeRow).keydown(function(e){
			if ( e.which === 13 ) {
				return inlineEditPost.save(this);
			}
		});

		$('a.cancel', bulkRow).click(function(){
            var media=$("[name='media']");
			return inlineEditPost.revert();
		});

		$('#inline-edit .inline-edit-private input[value="private"]').click( function(){
			var pw = $('input.inline-edit-password-input');
			if ( $(this).prop('checked') ) {
				pw.val('').prop('disabled', true);
			} else {
				pw.prop('disabled', false);
			}
		});

		// add events
		$('#the-list').on('click', 'a.editinline', function(){
			inlineEditPost.edit(this);
			return false;
		});

		$('#bulk-title-div').parents('fieldset').after(
			$('#inline-edit fieldset.inline-edit-categories').clone()
		).siblings( 'fieldset:last' ).prepend(
			$('#inline-edit label.inline-edit-tags').clone()
		);

		$('select[name="_status"] option[value="future"]', bulkRow).remove();

		$('#doaction, #doaction2').click(function(e){
			var n = $(this).attr('id').substr(2);
			var a = $( 'select[name="' + n + '"]' ).val();
            if ( 'delete' === a ) {
                if ( !confirm( "You are about to permanently delete these items.\n  'Cancel' to stop, 'OK' to delete." ) ) {
                    e.preventDefault();
                    return;
                }
            }
			if ( 'add-tags' === a || 'edit-priority' === a || 'attach-to' === a || 'detach' === a ) {
				e.preventDefault();
				t.setBulk(a);
                if ( 'add-tags' === a ) {
                    tagBox.cleanTagsInitial();
                } else if ( 'edit-priority' === a ) {
                    var reorder=tagBox.cleanImages();
                    jQuery('div#nggml-bulk-priority-edit-button-reorder').click(function(e){
                        reorder();
                    });
                    jQuery('div#nggml-bulk-priority-edit-button-revert').click(function(e){
                        tagBox.cleanImages();
                    });
                }
			} else if ( $('form#posts-filter tr.inline-editor').length > 0 ) {
				t.revert();
			}
		});
	},

	toggle : function(el){
		var t = this;
		$( t.what + t.getId( el ) ).css( 'display' ) === 'none' ? t.revert() : t.edit( el );
	},
    
	setBulk : function(a){
		var te = '', type = this.type, tax, c = true;
		this.revert();

		$('#bulk-edit td').attr('colspan', $('.widefat:first thead th:visible').length);
		$('table.widefat tbody').prepend( $('#bulk-edit') );
		$('#bulk-edit').addClass('inline-editor').show();
        if ( 'add-tags' === a ) {
            $('#bulk-edit .bulk-edit-taxonomy').show();
            jQuery( "input.button#bulk_edit[type='submit'][name='bulk_edit']" ).prop( "disabled", false ).val("Add/Remove Tags").show( );
        } else if ( 'edit-priority' === a ) {
            $('#bulk-edit .bulk-edit-priority').show();
            jQuery( "input.button#bulk_edit[type='submit'][name='bulk_edit']" ).prop( "disabled", false ).val("Set Priorities").show( );
        } else if ( 'attach-to' === a ) {
            $('#bulk-edit .bulk-attach-to').show();
            nggmlFindPosts.open();
            jQuery( "input.button#bulk_edit[type='submit'][name='bulk_edit']" ).prop( "disabled", true ).hide( );
        } else if ( 'detach' === a ) {
            $( '#bulk-edit .bulk-detach' ).show( );
            jQuery( "input.button#bulk_edit[type='submit'][name='bulk_edit']" ).prop( "disabled", false ).val("Detach").show( );
        }
		$( 'tbody th.check-column input[type="checkbox"]' ).each( function() {
			if ( $(this).prop('checked') ) {
				c = false;
				var id = $(this).val(), theTitle;
				//theTitle = $('#inline_'+id+' .post_title').html() || inlineEditL10n.notitle;
				theTitle = $('#inline_'+id+' .post_title').html() || '(no title)';
				//te += '<div id="ttle'+id+'"><a id="_'+id+'" class="ntdelbutton" title="'+inlineEditL10n.ntdeltitle+'">X</a>'+theTitle+'</div>';
				te += '<div id="ttle'+id+'"><a id="_'+id+'" class="ntdelbutton" title="'+'Remove From Bulk Edit'+'">X</a>'+theTitle+'</div>';
			}
		});

		if ( c ) {
			return this.revert();
		}

    var bt;
    switch ( a ) {
      case 'attach-to':
        bt = '#attach-to-bulk-titles';
        break;
      case 'detach':
        bt = '#detach-bulk-titles';
        break;
      default:
        bt = '#bulk-titles';
        break;
    }
		$(bt).html(te).find("a").click(function(){
			var id = $(this).attr('id').substr(1);
			$('table.widefat input[value="' + id + '"]').prop('checked', false);
			$('#ttle'+id).remove();
		});

		// enable autocomplete for tags
		if ( 'post' === type ) {
			// support multi taxonomies?
			tax = 'post_tag';
			//$('tr.inline-editor textarea[name="tax_input['+tax+']"]').suggest( ajaxurl + '?action=ajax-tag-search&tax=' + tax, { delay: 500, minchars: 2, multiple: true, multipleSep: inlineEditL10n.comma + ' ' } );
			$('tr.inline-editor textarea[name="tax_input['+tax+']"]').suggest( ajaxurl + '?action=ajax-tag-search&tax=' + tax, { delay: 500, minchars: 2, multiple: true, multipleSep: ',' + ' ' } );
		}
		$('html, body').animate( { scrollTop: 0 }, 'fast' );
	},

	edit : function(id) {
		var t = this, fields, editRow, rowData, status, pageOpt, pageLevel, nextPage, pageLoop = true, nextLevel, cur_format, f;
		t.revert();

		if ( typeof(id) === 'object' ) {
			id = t.getId(id);
		}

		fields = ['post_title', 'post_name', 'post_author', '_status', 'jj', 'mm', 'aa', 'hh', 'mn', 'ss', 'post_password', 'post_format', 'menu_order'];
		if ( t.type === 'page' ) {
			fields.push('post_parent', 'page_template');
		}

		// add the new blank row
		editRow = $('#inline-edit').clone(true);
		$('td', editRow).attr('colspan', $('.widefat:first thead th:visible').length);

		if ( $( t.what + id ).hasClass( 'alternate' ) ) {
			$(editRow).addClass('alternate');
		}
		$(t.what+id).hide().after(editRow);

		// populate the data
		rowData = $('#inline_'+id);
		if ( !$(':input[name="post_author"] option[value="' + $('.post_author', rowData).text() + '"]', editRow).val() ) {
			// author no longer has edit caps, so we need to add them to the list of authors
			$(':input[name="post_author"]', editRow).prepend('<option value="' + $('.post_author', rowData).text() + '">' + $('#' + t.type + '-' + id + ' .author').text() + '</option>');
		}
		if ( $( ':input[name="post_author"] option', editRow ).length === 1 ) {
			$('label.inline-edit-author', editRow).hide();
		}

		// hide unsupported formats, but leave the current format alone
		cur_format = $('.post_format', rowData).text();
		$('option.unsupported', editRow).each(function() {
			var $this = $(this);
			if ( $this.val() !== cur_format ) {
				$this.remove();
			}
		});

		for ( f = 0; f < fields.length; f++ ) {
			$(':input[name="' + fields[f] + '"]', editRow).val( $('.'+fields[f], rowData).text() );
		}

		if ( $( '.comment_status', rowData ).text() === 'open' ) {
			$( 'input[name="comment_status"]', editRow ).prop( 'checked', true );
		}
		if ( $( '.ping_status', rowData ).text() === 'open' ) {
			$( 'input[name="ping_status"]', editRow ).prop( 'checked', true );
		}
		if ( $( '.sticky', rowData ).text() === 'sticky' ) {
			$( 'input[name="sticky"]', editRow ).prop( 'checked', true );
		}

		// hierarchical taxonomies
		$('.post_category', rowData).each(function(){
			var taxname,
				term_ids = $(this).text();

			if ( term_ids ) {
				taxname = $(this).attr('id').replace('_'+id, '');
				$('ul.'+taxname+'-checklist :checkbox', editRow).val(term_ids.split(','));
			}
		});

		//flat taxonomies
		$('.tags_input', rowData).each(function(){
			var terms = $(this).text(),
				taxname = $(this).attr('id').replace('_' + id, ''),
				textarea = $('textarea.tax_input_' + taxname, editRow),
				comma = inlineEditL10n.comma;

			if ( terms ) {
				if ( ',' !== comma ) {
					terms = terms.replace(/,/g, comma);
				}
				textarea.val(terms);
			}

			textarea.suggest( ajaxurl + '?action=ajax-tag-search&tax=' + taxname, { delay: 500, minchars: 2, multiple: true, multipleSep: inlineEditL10n.comma + ' ' } );
		});

		// handle the post status
		status = $('._status', rowData).text();
		if ( 'future' !== status ) {
			$('select[name="_status"] option[value="future"]', editRow).remove();
		}

		if ( 'private' === status ) {
			$('input[name="keep_private"]', editRow).prop('checked', true);
			$('input.inline-edit-password-input').val('').prop('disabled', true);
		}

		// remove the current page and children from the parent dropdown
		pageOpt = $('select[name="post_parent"] option[value="' + id + '"]', editRow);
		if ( pageOpt.length > 0 ) {
			pageLevel = pageOpt[0].className.split('-')[1];
			nextPage = pageOpt;
			while ( pageLoop ) {
				nextPage = nextPage.next('option');
				if ( nextPage.length === 0 ) {
					break;
				}

				nextLevel = nextPage[0].className.split('-')[1];

				if ( nextLevel <= pageLevel ) {
					pageLoop = false;
				} else {
					nextPage.remove();
					nextPage = pageOpt;
				}
			}
			pageOpt.remove();
		}

		$(editRow).attr('id', 'edit-'+id).addClass('inline-editor').show();
		$('.ptitle', editRow).focus();

		return false;
	},

	save : function(id) {
		var params, fields, page = $('.post_status_page').val() || '';

		if ( typeof(id) === 'object' ) {
			id = this.getId(id);
		}

		$('table.widefat .spinner').show();

		params = {
			action: 'inline-save',
			post_type: typenow,
			post_ID: id,
			edit_date: 'true',
			post_status: page
		};

		fields = $('#edit-'+id).find(':input').serialize();
		params = fields + '&' + $.param(params);

		// make ajax request
		$.post( ajaxurl, params,
			function(r) {
				$('table.widefat .spinner').hide();

				if (r) {
					if ( -1 !== r.indexOf( '<tr' ) ) {
						$(inlineEditPost.what+id).remove();
						$('#edit-'+id).before(r).remove();
						$(inlineEditPost.what+id).hide().fadeIn();
					} else {
						r = r.replace( /<.[^<>]*?>/g, '' );
						$('#edit-'+id+' .inline-edit-save .error').html(r).show();
					}
				} else {
					$('#edit-'+id+' .inline-edit-save .error').html(inlineEditL10n.error).show();
				}

				if ( $('#post-'+id).prev().hasClass('alternate') ) {
					$('#post-'+id).removeClass('alternate');
				}
			},
		'html');
		return false;
	},

	revert : function(){
		var id = $('table.widefat tr.inline-editor').attr('id');
    
		if ( id ) {
			$('table.widefat .spinner').hide();

			if ( 'bulk-edit' === id ) {
                $('table.widefat #bulk-edit').removeClass('inline-editor').hide();
                $('#bulk-edit .bulk-edit-taxonomy').hide();
                $('#bulk-edit .bulk-edit-priority').hide();
                $('#bulk-edit .bulk-attach-to').hide();
                $( '#bulk-edit .bulk-detach' ).hide( );
                $('#bulk-titles').html('');
                $('#attach-to-bulk-titles').html('');
                $( '#detach-bulk-titles' ).html( '' );
                $('#nggml-find-posts-response').html('');
                $('#inlineedit').append( $('#bulk-edit') );
			} else {
				$('#'+id).remove();
				id = id.substr( id.lastIndexOf('-') + 1 );
				$(this.what+id).show();
			}
		}

		return false;
	},

	getId : function(o) {
		var id = $(o).closest('tr').attr('id'),
			parts = id.split('-');
		return parts[parts.length - 1];
	}
};

$( document ).ready( function(){ inlineEditPost.init(); } );

// Show/hide locks on posts
$( document ).on( 'heartbeat-tick.wp-check-locked-posts', function( e, data ) {
	var locked = data['wp-check-locked-posts'] || {};

	$('#the-list tr').each( function(i, el) {
		var key = el.id, row = $(el), lock_data, avatar;

		if ( locked.hasOwnProperty( key ) ) {
			if ( ! row.hasClass('wp-locked') ) {
				lock_data = locked[key];
				row.find('.column-title .locked-text').text( lock_data.text );
				row.find('.check-column checkbox').prop('checked', false);

				if ( lock_data.avatar_src ) {
					avatar = $('<img class="avatar avatar-18 photo" width="18" height="18" />').attr( 'src', lock_data.avatar_src.replace(/&amp;/g, '&') );
					row.find('.column-title .locked-avatar').empty().append( avatar );
				}
				row.addClass('wp-locked');
			}
		} else if ( row.hasClass('wp-locked') ) {
			// Make room for the CSS animation
			row.removeClass('wp-locked').delay(1000).find('.locked-info span').empty();
		}
	});
}).on( 'heartbeat-send.wp-check-locked-posts', function( e, data ) {
	var check = [];

	$('#the-list tr').each( function(i, el) {
		if ( el.id ) {
			check.push( el.id );
		}
	});

	if ( check.length ) {
		data['wp-check-locked-posts'] = check;
	}
}).ready( function() {
	// Set the heartbeat interval to 15 sec.
	if ( typeof wp !== 'undefined' && wp.heartbeat ) {
		wp.heartbeat.interval( 15 );
	}
});

}(jQuery));
