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

	$('.modals__close').on('click', function () {
		$('.modals, #consultation, #order, #thanks').fadeOut('slow');
	});

	$('.catalog-item__btn').each(function (i) {
		$(this).on('click', function () {
			$('#order .modals__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.modals, #order').fadeIn('slow');
		});
	});

	function valideForm(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				tel: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: 'Пожалуйста введите свое имя',
					minlength: jQuery.validator.format('Введите пожалуйста не менее {0} символов')
				},
				tel: 'Пожалуйста введите свой номер телефона',
				email: {
					required: 'Пожалуйста введите свою почту',
					email: 'Неправильно введена почта'
				}
			}
		});
	}

	valideForm('#consultation-form');
	valideForm('#consultation .feed-form');
	valideForm('#order .feed-form');

	$('input[name=tel]').mask("+7(999) 999-9999");

	$('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

	// Scroll
	$(window).scroll(function () {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href^='#']").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	new WOW().init();
});