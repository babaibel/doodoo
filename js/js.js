$(function() {

	$(window).resize(function(){
		fixed_offset = $('.header__main').height();
	});

	$(".js-catalog-link").on("click", function (event) {
		
		event.preventDefault();
		var id = $(this).attr('href').split('#')[1], 
			top = $('#' + id).offset().top;
		
		$('body,html').animate({scrollTop: top}, 1000);
	});

});

$(function() {

	var $modalPopup = $('.js-popup-modal');
	if(!$modalPopup.length) return;

	$modalPopup.magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#username',
		showCloseBtn: false,
		mainClass: 'popup-modal-overlay'
	});

	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
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
		}, 500);


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
							$.magnificPopup.close();
							$.magnificPopup.open({
								showCloseBtn: false,
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
		});
	});
});

// $(function() {

// 	var $contactForm = $('.js-form');
// 	if(!$contactForm.length) return;

// 	$contactForm.submit(function () {
// 		$.magnificPopup.close();
// 		$.magnificPopup.open({
// 			showCloseBtn: false,
// 			callbacks: {
// 				open: function() { $('.header__topline').css('padding-right', swidth + "px"); }, 
// 				close: function() { $('.header__topline').css('padding-right', 0); },
// 			},
// 			items: {
// 				src: '#after-modal'
// 			},
// 			type: 'inline'
// 			}, 
// 		0);
// 		return false;
// 	});
// });


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
		appendArrows: $sliderControls
	});
});
