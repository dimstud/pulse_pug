$(document).ready(function() {
	
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.col-12').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleTabs(tab) {
		$(tab).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	}

	toggleTabs('.catalog-item__link');
	toggleTabs('.catalog-item__back');

	//Modals
	$('[data-modal=consultation]').on('click', function () {
		$('.modals, #consultation').fadeIn('slow');
	});

	$('.modals, .modals__close').on('click', function () {
		$('.modals, #consultation, #order, #thanks').fadeOut('slow');
	});

	// $('.catalog-item__btn').on('click', function () {
	// 	$('.modals, #order').fadeIn('slow');
	// });

	$('.catalog-item__btn').each(function (i) {
		$(this).on('click', function () {
			$('#order .modals__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.modals, #order').fadeIn('slow');
		});
	});
});