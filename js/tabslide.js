$.fn.TabSlide = function() {

	var TabSlide = this;

	this.goTo = function(n) {

		var tabs_n = TabSlide.find('.tab').length;

		if (n >= tabs_n || n < 0)
			return;

		var left = -n*TabSlide.width();

		TabSlide.find('.tabs').css('transform', 'translate('+left+'px,0px)' );
		TabSlide.find('.tabs').css('-webkit-transform', 'translate('+left+'px,0px)' );

		left = parseInt(60/100*left);
		TabSlide.find('.labels li').css('transform', 'translate('+left+'px,0px)' );
		TabSlide.find('.labels li').css('-webkit-transform', 'translate('+left+'px,0px)' );

		TabSlide.find('.labels li').removeClass('current');
		TabSlide.find('.labels li:eq('+n+')').addClass('current');

		TabSlide.current = n;
	}

	this.eventAssign = function() {

		//labels
		TabSlide.find('.labels li').hammer().on('tap', function() {
			TabSlide.goTo( $(this).attr('data-goto') );
		});

		//swipe
		TabSlide.hammer().on('swipeleft', function() {
			TabSlide.goTo( TabSlide.current + 1 );
		});

		TabSlide.hammer().on('swiperight', function() {
			TabSlide.goTo( TabSlide.current - 1 );
		});

	}

	this.refresh = function() {
		
		var tab_w = TabSlide.width();
		TabSlide.find('.tab').width(tab_w);

		TabSlide.find('.labels').html('');

		//ridimensiona contenitore
		tabs_w = tab_w * TabSlide.find('.tab').length;
		TabSlide.find('.tabs').width(tabs_w);
		TabSlide.find('.labels').width(tabs_w);

		//posiziona tabs
		TabSlide.find('.tab').each( function(k) {
			var el = $(this);
			var left = k*tab_w;
			el.css('left', left);

			if (typeof TabSlide.current == "undefined") {
				var title = el.attr('data-title');
				if (k == 0)
					var html = '<li class="current" data-goto="'+k+'">'+title+'</li>';
				else
					var html = '<li data-goto="'+k+'">'+title+'</li>';

				TabSlide.find('.labels').append(html);
			}

		});

		var li_width = tab_w*60/100;
		var pad_l = TabSlide.find('.labels li').css('padding-left');
		var pad_r = TabSlide.find('.labels li').css('padding-right');
		li_width = li_width - parseInt(pad_l) - parseInt(pad_r);

		TabSlide.find('.labels li').width(li_width);
		TabSlide.find('.labels li').css('left', tab_w/100*20+'px');

		if (typeof TabSlide.current == "undefined")
			TabSlide.current = 0;

		TabSlide.eventAssign();

	}

	this.refresh();
	return this;
}