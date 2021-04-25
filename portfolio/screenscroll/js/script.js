const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu');
const menuHeader = document.querySelector('.header');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		iconMenu.classList.toggle('_active');
		menuHeader.classList.toggle('_activeH');
		menuBody.classList.toggle('_activeM');
	});
}

// Прокрутка при клике
const menuLinks1 = document.querySelectorAll('.menu__link');

if (menuLinks1.length > 0) {
	menuLinks1.forEach(menuLink1 => {
		menuLink1.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink1 = e.target;
			if (iconMenu.classList.contains('_active')) {
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
				menuHeader.classList.remove('_activeH');
				menuBody.classList.remove('_activeM');
			}
			e.preventDefault();
		
	}
}





let wrapper = document.querySelector('.wrapper');

let pageSlider = new Swiper('.page', {
	// Свои классы
	wrapperClass: "page__wrapper",
	slideClass: "page__screen",

	// Вертикальный слайдер
	direction: 'vertical',

	// Количество слайдов для показа
	slidesPerView: 'auto',

	// Включаем параллакс
	parallax: true,


	// Управление клавиатурой
	keyboard: {
		// Включить\выключить
		enabled: true,
		// Включить\выключить
		// только когда слайдер
		// в пределах вьюпорта
		onlyInViewport: true,
		// Включить\выключить
		// управление клавишами
		// pageUp, pageDown
		pageUpDown: true,
	},

	// Управление колесом мыши
	mousewheel: {
		// Чувствительность колеса мыши
		sensitivity: 1,
		// Класс объекта на котором
		// будет срабатывать прокрутка мышью.
		//eventsTarget: ".image-slider"
	},

	// Отключение функционала
	// если слайдов меньше чем нужно
	watchOverflow: true,

	// Скорость
	speed: 800,

	// Обновить свайпер
	// при изменении элементов слайдера
	observer: true,

	// Обновить свайпер
	// при изменении родительских
	// элементов слайдера
	observeParents: true,

	// Обновить свайпер
	// при изменении дочерних
	// элементов слайда
	observeSlideChildren: true,

	// Навигация 
	// Буллеты, текущее положение, прогрессбар
	pagination: {
		el: '.page__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: "page__bullet",
		bulletActiveClass: "page__bullet_active",
	},
	// Скролл
	scrollbar: {
		el: '.page__scroll',
		dragClass: "page__drag-scroll",
		// Возможность перетаскивать скролл
		draggable: true
	},

	// Отключаем автоинициализацию
	init: false,

	// События
	on: {
		// Событие инициализации
		init: function () {
			menuSlider();
			setScrollType();
			wrapper.classList.add('_loaded');
		},
		// Событие смены слайда
		slideChange: function () {
			menuSliderRemove();
			menuLinks[pageSlider.realIndex].classList.add('_active');
		},
		resize: function () {
			setScrollType();
		}
	},
});

let menuLinks = document.querySelectorAll('.menu__link');
	// Переход по кнопке Обо мне
let btnAbout = document.querySelector('.about__btn')
	btnAbout.addEventListener("click", function (e) {
		pageSlider.slideTo(1, 800);
		e.preventDefault();
	});

function menuSlider() {
	if (menuLinks.length > 0) {
		menuLinks[pageSlider.realIndex].classList.add('_active');
		for (let index = 0; index < menuLinks.length; index++) {
			const menuLink = menuLinks[index];
			menuLink.addEventListener("click", function (e) {
				menuSliderRemove();
				pageSlider.slideTo(index, 800);
				menuLink.classList.add('_active');
				e.preventDefault();
			});
		}
	}
}

function menuSliderRemove() {
	let menuLinkActive = document.querySelector('.menu__link._active');
	if (menuLinkActive) {
		menuLinkActive.classList.remove('_active');
	}
}

function setScrollType() {
	if (wrapper.classList.contains('_free')) {
		wrapper.classList.remove('_free');
		pageSlider.params.freeMode = false;
	}
	for (let index = 0; index < pageSlider.slides.length; index++) {
		const pageSlide = pageSlider.slides[index];
		const pageSlideContent = pageSlide.querySelector('.screen__content');
		if (pageSlideContent) {
			const pageSlideContentHeight = pageSlideContent.offsetHeight;
			if (pageSlideContentHeight > window.innerHeight) {
				wrapper.classList.add('_free');
				pageSlider.params.freeMode = true;
				break;
			}
		}
	}
}

pageSlider.init();
