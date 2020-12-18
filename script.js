const main = document.querySelector(".main");
const url = "https://randomuser.me/api/?results=70";
const errMessage = "server is not responding";
const handler = document.querySelector(".search-panel");

const fetchFriends = async (url) => {
	try {
		let response = await fetch(url);
		let data = await response.json();
		return data.results;
	} catch (err) {
		main.innerHTML = `<div class="error">${errMessage}<br>(error: ${err})</div>`;
	}
};

const init = async () => {
	const results = await fetchFriends(url);
	render(results);
};

init();

function sortBySearch(arr, str) {
	return arr.filter((elem) =>
		`${elem.name.first}${elem.name.last}`
			.toLowerCase()
			.includes(str.toLowerCase())
	);
}

function sortByGender(arr, gender) {
	return arr.filter((elem) => elem.gender === gender);
}

function sortByName(arr, type) {
	if (type === "name_a-z") {
		return arr.sort((a, b) => a.name.first.localeCompare(b.name.first));
	} else if (type === "name_z-a")
		return arr.sort((a, b) => b.name.first.localeCompare(a.name.first));
}

function sortByAge(arr, type) {
	if (type === "age_up") {
		return arr.sort((a, b) => a.dob.age - b.dob.age);
	} else if (type === "age_down") {
		return arr.sort((a, b) => b.dob.age - a.dob.age);
	}
}

function render(arr) {
	arr.forEach((elem) => createCard(elem));
}

function createCard(friend) {
	const card = document.createElement("div");
	card.innerHTML = `
		<div class="card ${friend.gender}">
			<img src="${friend.picture.large}" alt="photo" class="card__img">
			<p class="card__name">${friend.name.first}<br> ${friend.name.last}</p>
			<p class="card__age">${friend.dob.age} y.o.</p>
		</div>`;
	main.append(card);
}
