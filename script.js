const MAX_FRIENDS_VALUE = 100;
const URL = `https://randomuser.me/api/?results=${MAX_FRIENDS_VALUE}&noinfo`;

const main = document.querySelector('.main');
const navbar = document.querySelector('.navbar');
const form = document.querySelector('#form');

const phoneImg = './img/phone.png';
const mailImg = './img/mail.png';
const errMessage = 'server is not responding';

const resetButton = document.querySelector('#reset');
const popupButton = document.querySelector('.popup');

const filterState = {
	search: null,
	gender: null,
	sort: null,
	reset() {
		this.search = null;
		this.gender = null;
		this.sort = null;
	},
};

const fetchFriends = async (url) => {
	try {
		let response = await fetch(url);
		let usersData = await response.json();
		return usersData.results;
	} catch (err) {
		main.innerHTML = `<div class="error">${errMessage}<br>(error: ${err})</div>`;
	}
};

const init = (results) => {
	render(results);
	const users = results.slice();

	form.addEventListener('input', ({ target }) => {
		filterState[target.name] = target.value;
		filterCards(users, filterState);
	});

	resetButton.addEventListener('click', () => {
		filterState.reset();
		render(results);
	});
};

const filterCards = (usersToFilter, filters) => {
	let users = usersToFilter;

	if (filterState.search) {
		users = filterBySearch(users, filters.search);
	}
	if (filterState.gender) {
		users = filterByGender(users, filters.gender);
	}
	if (filterState.sort) {
		let [type, direction] = filters.sort.split(' ');
		users = sortUsers(users, type, direction);
	}
	render(users);
};

const filterBySearch = (dataToFilter, searchValue) => {
	return dataToFilter.filter((elem) =>
		`${elem.name.first}${elem.name.last}${elem.location.country}${elem.location.city}`
			.toLowerCase()
			.includes(searchValue.toLowerCase()),
	);
};

const filterByGender = (usersToFilter, gender) => {
	if (gender === 'all') {
		return usersToFilter;
	}
	return usersToFilter.filter((user) => user.gender === gender);
};

const sortUsers = (usersToSort, sortType, sortDirection) => {
	let users = usersToSort;
	switch (sortType) {
		case 'age':
			users = sortByAge(usersToSort, sortDirection);
			break;
		case 'name':
			users = sortByName(usersToSort, sortDirection);
			break;
		case 'date':
			users = sortByDate(usersToSort, sortDirection);
			break;
	}
	return users;
};

const sortByName = (usersToFilter, direction) => {
	if (direction === 'asc') {
		return usersToFilter.sort((a, b) => a.name.first.localeCompare(b.name.first));
	} else if (direction === 'desc')
		return usersToFilter.sort((a, b) => b.name.first.localeCompare(a.name.first));
};

const sortByAge = (usersToFilter, direction) => {
	if (direction === 'asc') {
		return usersToFilter.sort((a, b) => a.dob.age - b.dob.age);
	} else if (direction === 'desc') {
		return usersToFilter.sort((a, b) => b.dob.age - a.dob.age);
	}
};

const sortByDate = (usersToFilter, direction) => {
	if (direction === 'asc') {
		return usersToFilter.sort((a, b) => a.registered.age - b.registered.age);
	} else if (direction === 'desc') {
		return usersToFilter.sort((a, b) => b.registered.age - a.registered.age);
	}
};

const render = (usersToRender) => {
	main.innerHTML = '';
	const usersContainer = document.createDocumentFragment();
	usersToRender.forEach((user) => usersContainer.append(createCard(user)));
	main.append(usersContainer);
};

const createCard = (user) => {
	const card = document.createElement('div');
	card.innerHTML = `
		<article class="card">
			<img src="${user.picture.large}" alt="photo" class="card__img">
			<h2 class="card__name">${user.name.first} ${user.name.last}</h2>
			<p class="card__age">${user.dob.age} years</p>
			<p class="card__location">${user.location.country}<br>${user.location.city}</p>
			<address class="card__contacts">
				<a class="card__link" href="tel: ${user.cell}">
					<img class="card__phone__img" src="${phoneImg}" alt = "phone to">
				</a>
				<a class="card__link" href="mailto: ${user.email}">
					<img class="card__mail__img" src="${mailImg}" alt = "mail to">
				</a>
			</address>
		</article>`;
	return card;
};

popupButton.addEventListener('click', () => {
	popupButton.classList.toggle('popup-active');
	navbar.classList.toggle('navbar-active');
});

document.addEventListener('DOMContentLoaded', () => {
	fetchFriends(URL).then(init);
});
