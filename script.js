let body = document.body;
let url = window.location.toString();

let getNameUser = (url) => {
 let getUrl = url.split('=');
 let nameUser = getUrl[1];
 if(nameUser == undefined) {
 	nameUser = 'CheplaginaNadezhda';
 }
 return nameUser;
}

fetch(`https://api.github.com/users/${getNameUser(url)}`)
.then(res => res.json())
.then(json => {
	console.log(json.avatar_url);
    console.log(json.name);
    console.log(json.bio);
    console.log(json.html_url);

let photo = new Image();
photo.src = json.avatar_url;
body.append(photo);

let name = document.createElement('a');
if(json.name != null){
	name.innerHTML = json.name;
	name.href = json.html_url;
} else{
	name.innerHTML = "Информация о пользователе недоступна"
	name.href = json.html_url;
}
body.append(name);

let info = document.createElement('p');
if(json.bio != null){
	info.innerHTML = json.bio;
} else{
	info.innerHTML = "Информация о пользователе недоступна"
}
body.append(info);
})

.catch(err => alert('Информация о пользователе недоступна'));
