$(function() {

	$(window).resize(function(){
		fixed_offset = $('.header__main').height();
	});

	$(".js-catalog-link, .js-menu-link").on("click", function (event) {
		
		event.preventDefault();
		var id = $(this).attr('href').split('#')[1], 
			top = $('#' + id).offset().top;

		$(".js-menu-btn").removeClass('_active');
		$('.js-menu').slideUp();
		
		$('body,html').animate({scrollTop: top}, 1000);
	});

	$(".js-menu-btn").on("click", function (event) {
		$(this).toggleClass('_active');
		$('.js-menu').slideToggle();
	});

	$(".js-more-reviews").on("click", function (event) {
		var $reviews = $('body').find('.js-review-hide');
		$reviews.first().slideDown().removeClass('js-review-hide');
		if($reviews.length <= 1){
			$(this).hide();
		}
		return false;
	});

});

$(function() {

	var $modalPopup = $('.js-popup-modal');
	if(!$modalPopup.length) return;

	var dataReview,
		$reviewSrc,
		dataProduct,
		$productSrc,
		productName,
		dataPrice,
		magnificPopup,
		curElement;

	$modalPopup.magnificPopup({
		type: 'inline',
		preloader: false,
		showCloseBtn: false,
		mainClass: 'mfp-fade popup-modal-overlay',
		removalDelay: 300,
		callbacks: {
			elementParse: function(item) {
				console.log(item.src);
				if(item.src!=="#after-modal" && item.src!=="#sertifikat"){
					dataReview = item.el.data('review');
					dataProduct = item.el.data('product');
					dataPrice = item.el.data('price');
					console.log(dataPrice);
					productName = item.el.closest('.catalog-item').find('.catalog-item__title').text();
					$reviewSrc = $(item.src);
					$productSrc = $(item.src);
					if(dataReview!==undefined){
						$reviewSrc.addClass(dataReview);
					}
					if(dataProduct!==undefined){
						$productSrc.addClass(dataProduct);
						$productSrc.find('.item-title').text(productName);
						if(dataPrice!==undefined){
							$productSrc.find('.item-price').text(dataPrice);
						}
					}
				}
			},
			open: function() {
				magnificPopup = $.magnificPopup.instance;
				curElement = magnificPopup.st.el;
				$('.js-popup-slider:visible, .js-popup-slider-preview:visible').slick('reinit');
			},
			close: function() {
				if(dataReview!==undefined){
					$reviewSrc.removeClass(dataReview);
				}
				if(dataProduct!==undefined){
					$productSrc.removeClass(dataProduct);
					dataPrice = undefined;
				}
			}
		}
		
	});

	$(document).on('click', '.js-order-second', function (e) {
		e.preventDefault();
		$(this).closest('.popup-block').addClass('_second');
	});

	$(document).on('click', '.popup-modal-dismiss', function (e) {
		if($(this).closest('.popup-block').is('#sertifikat')){
			curElement.click();
		}
		else{
			$(this).closest('.popup-block').removeClass('_second');
			e.preventDefault();
			$.magnificPopup.close();
		}
	});
});

$(function() {

	$('.js-form-phone').each(function(){
		// Объявляем переменные (форма и кнопка отправки)
		var form = $(this),
				btn = form.find('.phone-btn');

		// Добавляем каждому проверяемому полю, указание что поле пустое
		form.find('.rfield').addClass('empty_field');

		// Функция проверки полей формы
		function checkInput(){
			form.find('.rfield').each(function(){
				if($(this).val() != ''){
						// Если поле не пустое удаляем класс-указание
					$(this).removeClass('empty_field');
				} else {
						// Если поле пустое добавляем класс-указание
					$(this).addClass('empty_field');
				}
			});
		}

		// Функция подсветки незаполненных полей
		function lightEmpty(){
			form.find('.empty_field').addClass('error');
			// Через полсекунды удаляем подсветку
			setTimeout(function(){
			form.find('.empty_field').removeClass('error');
			},500);
		}

		// Проверка в режиме реального времени
		setInterval(function(){
			// Запускаем функцию проверки полей на заполненность
			checkInput();
			// Считаем к-во незаполненных полей
			var sizeEmpty = form.find('.empty_field').length;
			// Вешаем условие-тригер на кнопку отправки формы
			if(sizeEmpty > 0){
			if(btn.hasClass('disabled')){
				return false
			} else {
				btn.addClass('disabled')
			}
			} else {
				btn.removeClass('disabled')
			}
		}, 800);


		// Событие клика по кнопке отправить
		btn.click(function(){
			if($(this).hasClass('disabled')){
				// подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
			lightEmpty();
			return false
			} else {
				form.submit(function (){

					var data = form.serialize();

					$.ajax({ 
						// инициaлизируeм ajax зaпрoс
						type: 'POST', // oтпрaвляeм в POST фoрмaтe, мoжнo GET
						url: 'mail.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe
						data: data, // дaнныe для oтпрaвки
						error: function(xhr, status, error) {
							console.log(xhr.responseText + '|\n' + status + '|\n' +error);
						},
						success: function(data){ // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
							form[0].reset();
							$.magnificPopup.open({
								items: {
									src: '#after-modal'
								},
								type: 'inline',
								showCloseBtn: false,
								removalDelay: 300,
								mainClass: 'mfp-fade'
							}, 0);
						}
					});
					return false;
				});
			}
		});
	});

	$('.js-order-form').each(function(){
		// Объявляем переменные (форма и кнопка отправки)
		var form = $(this),
				btn = form.find('.js-order-form-btn');

		// Добавляем каждому проверяемому полю, указание что поле пустое
		form.find('.rfield').addClass('empty_field');

		// Функция проверки полей формы
		function checkInput(){
			form.find('.rfield').each(function(){
				if($(this).val() != ''){
						// Если поле не пустое удаляем класс-указание
					$(this).removeClass('empty_field');
				} else {
						// Если поле пустое добавляем класс-указание
					$(this).addClass('empty_field');
				}
			});
		}

		// Функция подсветки незаполненных полей
		function lightEmpty(){
			form.find('.empty_field').addClass('error');
			// Через полсекунды удаляем подсветку
			setTimeout(function(){
			form.find('.empty_field').removeClass('error');
			},500);
		}

		// Проверка в режиме реального времени
		setInterval(function(){
			// Запускаем функцию проверки полей на заполненность
			checkInput();
			// Считаем к-во незаполненных полей
			var sizeEmpty = form.find('.empty_field').length;
			// Вешаем условие-тригер на кнопку отправки формы
			if(sizeEmpty > 0){
			if(btn.hasClass('disabled')){
				return false
			} else {
				btn.addClass('disabled')
			}
			} else {
				btn.removeClass('disabled')
			}
		}, 500);


		// Событие клика по кнопке отправить
		btn.click(function(){
			if($(this).hasClass('disabled')){
				// подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
			lightEmpty();
			return false
			} else {
				form.find('#product').val(form.find('.item-title').text());
				var pay = form.find('.js-pay:checked').val();
				if(pay == 'online'){
					// сделать оплату онлайн через сервис
					alert('Надо сделать');
				} else{
					form.submit(function (){

						var data = form.serialize();

						$.ajax({ 
							// инициaлизируeм ajax зaпрoс
							type: 'POST', // oтпрaвляeм в POST фoрмaтe, мoжнo GET
							url: 'mail2.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe
							data: data, // дaнныe для oтпрaвки
							error: function(xhr, status, error) {
								console.log(xhr.responseText + '|\n' + status + '|\n' +error);
							},
							success: function(data){ // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
								form[0].reset();
								$.magnificPopup.open({
									showCloseBtn: false,
									removalDelay: 300,
									mainClass: 'mfp-fade',
									items: {
										src: '#after-modal'
									},
									type: 'inline'
									}, 
								0);
							}
						});
						return false;
					});
				}
			}
		});
	});
});

$(function() {

	var $slider = $('.js-slider');
	if(!$slider.length) return;

	var $sliderControls = $slider.siblings('.js-slider-controls');

	$slider.slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		appendArrows: $sliderControls,
		responsive: [
		{
			breakpoint: 767,
			settings: {
				adaptiveHeight: true,
				dots: false
			}
		}
	]
	});
});

$(function() {

	var $reviews = $('.js-reviews');
	if(!$reviews.length) return;

	var settings_slider = {
		dots: false,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		adaptiveHeight: true,
		arrows: true,
		initialSlide: 1
	}
	slick_on_mobile( $reviews, settings_slider);

	function slick_on_mobile(slider, settings){
		$(window).on('load resize', function() {
			if ($(window).width() > 767) {
				if (slider.hasClass('slick-initialized')) {
					slider.slick('unslick');
				}
				return
			}
			if (!slider.hasClass('slick-initialized')) {
				return slider.slick(settings);
			}
		});
	};
});

$(function() {

	$('.js-popup-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.js-popup-slider-preview'
	});
	$('.js-popup-slider-preview').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.js-popup-slider',
		dots: false,
		focusOnSelect: true
	});
});

$(window).stellar({
	horizontalScrolling: false
});


$('.js-phone').mask("+375 (999) 999-99-99");

$(function() {
	var hash = window.location.hash;
	if(hash !== ""){
		$('html,body').animate({
			scrollTop: $(window.location.hash).offset().top
		});
	}
});
