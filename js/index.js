// slaideri mtavar gverdze 

console.clear();

const { gsap, imagesLoaded } = window;

const isrebi = {
	prev: document.querySelector(".gilaki-left"),
	next: document.querySelector(".gilaki-right"),
};
const cardsContainerEl = document.querySelector(".photos_wr");
const appBgContainerEl = document.querySelector(".slider_bg");

const cardInfosContainerEl = document.querySelector(".info_wr");

isrebi.next.addEventListener("click", () => swapCards("right"));

isrebi.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".mtavari-photo");
	const previousCardEl = cardsContainerEl.querySelector(".wina-photo");
	const nextCardEl = cardsContainerEl.querySelector(".shemdegi-photo");

	const currentBgImageEl = appBgContainerEl.querySelector(".mtavari-image");
	const previousBgImageEl = appBgContainerEl.querySelector(".wina-image");
	const nextBgImageEl = appBgContainerEl.querySelector(".shemdegi-image");

	changeInfo(direction);
	swapCardsClass();

	removeCardEvents(currentCardEl);

	function swapCardsClass() {
		currentCardEl.classList.remove("mtavari-photo");
		previousCardEl.classList.remove("wina-photo");
		nextCardEl.classList.remove("shemdegi-photo");

		currentBgImageEl.classList.remove("mtavari-image");
		previousBgImageEl.classList.remove("wina-image");
		nextBgImageEl.classList.remove("shemdegi-image");

		currentCardEl.style.zIndex = "50";
		currentBgImageEl.style.zIndex = "-2";

		if (direction === "right") {
			previousCardEl.style.zIndex = "20";
			nextCardEl.style.zIndex = "30";

			nextBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("wina-photo");
			previousCardEl.classList.add("shemdegi-photo");
			nextCardEl.classList.add("mtavari-photo");

			currentBgImageEl.classList.add("wina-image");
			previousBgImageEl.classList.add("shemdegi-image");
			nextBgImageEl.classList.add("mtavari-image");
		} else if (direction === "left") {
			previousCardEl.style.zIndex = "30";
			nextCardEl.style.zIndex = "20";

			previousBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("shemdegi-photo");
			previousCardEl.classList.add("mtavari-photo");
			nextCardEl.classList.add("wina-photo");

			currentBgImageEl.classList.add("shemdegi-image");
			previousBgImageEl.classList.add("mtavari-image");
			nextBgImageEl.classList.add("wina-image");
		}
	}
}

function changeInfo(direction) {
	let currentInfoEl = cardInfosContainerEl.querySelector(".mtavari-info");
	let previousInfoEl = cardInfosContainerEl.querySelector(".wina-info");
	let nextInfoEl = cardInfosContainerEl.querySelector(".shemdegi-info");

	gsap.timeline()
		.to([isrebi.prev, isrebi.next], {
			duration: 0.2,
			opacity: 0.5,
			pointerEvents: "none",
		})
		.to(
			currentInfoEl.querySelectorAll(".text"),
			{
				duration: 0.4,
				stagger: 0.1,
				translateY: "-120px",
				opacity: 0,
			},
			"-="
		)
		.call(() => {
			swapInfosClass(direction);
		})
		.call(() => initCardEvents())
		.fromTo(
			direction === "right"
				? nextInfoEl.querySelectorAll(".text")
				: previousInfoEl.querySelectorAll(".text"),
			{
				opacity: 0,
				translateY: "40px",
			},
			{
				duration: 0.4,
				stagger: 0.1,
				translateY: "0px",
				opacity: 1,
			}
		)
		.to([isrebi.prev, isrebi.next], {
			duration: 0.2,
			opacity: 1,
			pointerEvents: "all",
		});

	function swapInfosClass() {
		currentInfoEl.classList.remove("mtavari-info");
		previousInfoEl.classList.remove("wina-info");
		nextInfoEl.classList.remove("shemdegi-info");

		if (direction === "right") {
			currentInfoEl.classList.add("wina-info");
			nextInfoEl.classList.add("mtavari-info");
			previousInfoEl.classList.add("shemdegi-info");
		} else if (direction === "left") {
			currentInfoEl.classList.add("shemdegi-info");
			nextInfoEl.classList.add("wina-info");
			previousInfoEl.classList.add("mtavari-info");
		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2,
	};
	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
	gsap.set(card, {
		"--mtavari-photo-rotation-offset": `${angle}deg`,
	});
	const currentInfoEl = cardInfosContainerEl.querySelector(".mtavari-info");
	gsap.set(currentInfoEl, {
		rotateY: `${angle}deg`,
	});
}

function resetCardTransforms(e) {
	const card = e.currentTarget;
	const currentInfoEl = cardInfosContainerEl.querySelector(".mtavari-info");
	gsap.set(card, {
		"--mtavari-photo-rotation-offset": 0,
	});
	gsap.set(currentInfoEl, {
		rotateY: 0,
	});
}

function initCardEvents() {
	const currentCardEl = cardsContainerEl.querySelector(".mtavari-photo");
	currentCardEl.addEventListener("pointermove", updateCard);
	currentCardEl.addEventListener("pointerout", (e) => {
		resetCardTransforms(e);
	});
}

initCardEvents();

function removeCardEvents(card) {
	card.removeEventListener("pointermove", updateCard);
}

function init() {

	let tl = gsap.timeline();

	tl.to(cardsContainerEl.children, {
		delay: 0.15,
		duration: 0.5,
		stagger: {
			ease: "power4.inOut",
			from: "right",
			amount: 0.1,
		},
		"--photo-translateY-offset": "0%",
	})
		.to(cardInfosContainerEl.querySelector(".mtavari-info").querySelectorAll(".text"), {
			delay: 0.5,
			duration: 0.4,
			stagger: 0.1,
			opacity: 1,
			translateY: 0,
		})
		.to(
			[isrebi.prev, isrebi.next],
			{
				duration: 0.4,
				opacity: 1,
				pointerEvents: "all",
			},
			"-=0.4"
		);
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	gsap.set(cardsContainerEl.children, {
		"--photo-translateY-offset": "100vh",
	});
	gsap.set(cardInfosContainerEl.querySelector(".mtavari-info").querySelectorAll(".text"), {
		translateY: "40px",
		opacity: 0,
	});
	gsap.set([isrebi.prev, isrebi.next], {
		pointerEvents: "none",
		opacity: "0",
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
				});

				if (totalImages == loadedImages) {
					gsap.timeline()
						.to(".loading_wr", {
							duration: 0.8,
							opacity: 0,
							pointerEvents: "none",
						})
						.call(() => init());
				}
			}
		});
	});
};

waitForImages();

//   chatis chartva/gaTiSva

const chartva = document.getElementById('open-button');

chartva.addEventListener('click', () => {

	chartva.style.display = 'none';


	const popup = document.getElementById('chatcontact');
	popup.style.display = 'block';

});
const gatishva = document.getElementById('cancelbutton');

gatishva.addEventListener('click', () => {


	const popup = document.getElementById('chatcontact');
	popup.style.display = 'none';

	const visiblebutton = document.getElementById('open-button');
	visiblebutton.style.display = 'block';

});
