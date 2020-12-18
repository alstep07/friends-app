const main = document.querySelector(".main");
const url = "https://randomuser.me/api/?results=70";

const fetchFriends = async (url) => {
	try {
		let response = await fetch(url);
		let data = await response.json();
		return data.results;
	} catch (err) {
		main.innerHTML = `<div class="error">server not responding<br>(error: ${err})</div>`;
	}
};

const init = async () => {
	const results = await fetchFriends(url);
	results.forEach((elem) => render(elem));
};

init();

function render(friend) {
	const card = document.createElement("div");
	const img = document.createElement("img");
	const name = document.createElement("p");
	const age = document.createElement("p");

	name.innerHTML = `${friend.name.first}<br> ${friend.name.last}`;
	age.innerHTML = `age: ${friend.dob.age} years`;
	img.setAttribute("src", friend.picture.large);

	card.classList.add("card");
	card.classList.add(`${friend.gender}`);
	img.classList.add("card__img");
	name.classList.add("card__name");
	age.classList.add("card__age");

	card.append(img, name, age);
	main.append(card);
}
