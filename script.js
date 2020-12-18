const main = document.querySelector(".main");
const url = "https://randomuser.me/api/?results=50";

const fetchFriends = async (url) => {
	let response = await fetch(url);
	let data = await response.json();
	console.log(data.results);
	return data.results;
};

fetchFriends(url).then((friends) =>
	friends.forEach((friend) => render(friend))
);

function render(friend) {
	const card = document.createElement("div");
	const img = document.createElement("img");
	const name = document.createElement("p");
	img.setAttribute("src", friend.picture.large);
	img.classList.add("card__img");
	name.textContent = `${friend.name.first} ${friend.name.last}`;
    name.classList.add("card__name");
    card.classList.add("card");
	card.append(img, name);
	main.append(card);
}
