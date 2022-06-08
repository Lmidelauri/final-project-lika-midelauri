

// navigacia
const navigation = [
	{ navItem: "HOME", navlink: 'index.html' },
	{ navItem: "ABOUT", navlink: 'about.html' },
	{ navItem: "PORTFOLIO", navlink: 'portfolio.html' },
	{ navItem: "CONTACT", navlink: 'contact.html' }
];


let text = "<ul>";
navigation.forEach(navfunction);
text += "</ul>";
document.getElementById("navigation").innerHTML = text;
function navfunction(value) {
	text += `<li> <a href="${value.navlink}"> ${value.navItem}  </a>  </ll>`
};






// contact alert

function alertfunction() {
	alert("Thank you for contacting us!!");
}
