// var swidth=(window.innerWidth-$(window).width());

// $(function() {

// 	var fixed_offset = $('.header__topline').height();

// 	$(window).resize(function(){
// 		fixed_offset = $('.header__topline').height();
// 	});

// 	$(".js-main-nav a, .js-botbtn").on("click", function (event) {
		
// 		event.preventDefault();
// 		var id = $(this).attr('href').split('#')[1], 
// 			top = $('#' + id).offset().top;
		
// 		$('body,html').animate({scrollTop: top - fixed_offset}, 1000);
// 	});

// });

// $(function() {

// 	var $modalPopup = $('.js-popup-modal');
// 	if(!$modalPopup.length) return;

// 	$modalPopup.magnificPopup({
// 		type: 'inline',
// 		preloader: false,
// 		focus: '#username',
// 		showCloseBtn: false,
// 		mainClass: 'popup-modal-overlay',
// 		callbacks: {
// 			open: function() { $('.header__topline').css('padding-right', swidth + "px"); }, 
// 			close: function() { $('.header__topline').css('padding-right', 0); },
// 		}
// 	});

// 	$(document).on('click', '.popup-modal-dismiss', function (e) {
// 		e.preventDefault();
// 		$.magnificPopup.close();
// 	});
// });

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

// $(function() {

// 	var $contactMap = $('.js-contact-map');
// 	if(!$contactMap.length) return;

// 	var map,
// 		center = {lat: 55.873569, lng: 37.458601},
// 		point = {lat: 55.874022, lng: 37.467957};

// 	(function initMap() {
// 		map = new google.maps.Map(document.getElementById('contact-map'), {
// 		center: center,
// 		zoom: 15,
// 		scrollwheel: true
// 		});
// 		var marker = new google.maps.Marker({
// 			position: point,
// 			map: map
// 		});
// 	})();

// });