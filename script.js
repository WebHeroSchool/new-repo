let body = document.body;
let url = window.location.toString();
let date = new Date();
let preloader = document.getElementById('preloader');

setTimeout(() => {
preloader.classList.add('hidden');
let getNameUser = (url) => {
 let getUrl = url.split('=');
 let nameUser = getUrl[1];
 if(nameUser == undefined) {
 	nameUser = 'CheplaginaNadezhda';
 }
 return nameUser;
}
let userUrl = `https://api.github.com/users/${getNameUser(url)}`;

let getDate = new Promise((resolve, reject) => {
	setTimeout(() => date ? resolve(date) : reject("Дата не определена"), 2000)
});
let getUrl = new Promise((resolve, reject) => {
	setTimeout(() => userUrl ? resolve(userUrl) : reject("Ссылка не найдена"), 3000)
});

Promise.all([getUrl, getDate])
.then(([userUrl, date]) => fetch(userUrl))
.then(res => res.json())
.then(json => {

let photo = new Image();
photo.src = json.avatar_url;
body.append(photo);

let name = document.createElement('a');
if(json.name != null){
	name.innerHTML = json.name;
	name.href = json.html_url;
} else{
	name.innerHTML = "Информации нет"
	name.href = json.html_url;
}
body.append(name);

let info = document.createElement('p');
if(json.bio != null){
	info.innerHTML = json.bio;
} else{
	info.innerHTML = "Информации нет";
}
body.append(info);
body.append(date);
})

.catch(err => alert('Информация о пользователе недоступна'));
}, 5000);
