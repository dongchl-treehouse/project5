//$('#name').focus();
const userurl = 'https://randomuser.me/api/?results=12';
const galleryList = document.getElementById('gallery');


// create a pop-up modal template
var modalContainer = document.createElement("div");   
modalContainer.setAttribute('class','modal-container');

var modal = document.createElement("div");
modal.setAttribute('class','modal');
modalContainer.appendChild(modal);

var close_btn = document.createElement("BUTTON");
close_btn.setAttribute('type','button');
close_btn.setAttribute('id','modal-close-btn');
close_btn.setAttribute('class','modal-close-btn');
close_btn.innerHTML = '<strong>X</strong>';

var modal_info = document.createElement("div");
modal_info.setAttribute('class','modal-info-container');		

modal.appendChild(close_btn);
modal.appendChild(modal_info);

modalContainer.style.display = "none";

//When the user clicks on (x), close the modal
close_btn.onclick = function() {
	modalContainer.style.display = "none";
}
// fetch the API
fetch(userurl)
	.then(response => response.json())
	.then(data => generateEmployeeList(data))
	
document.body.appendChild(modalContainer);
	
	
function generateEmployeeList(data){
	
	//create gallery markup
	var employees = data.results;	
	employees.forEach(myEmplyee);
	
	function myEmplyee(item, index) {
		console.log(item);

		var card = document.createElement("div");   
		card.setAttribute('class','card');
		
		var card_imag = document.createElement("div");
		card_imag.setAttribute('class','card-img-container');
		
		card_imag.innerHTML = createImgHtml(item['picture']['medium']); 
		
		
		var card_info = document.createElement("div");
		card_info.setAttribute('class','card-info-container');
		
		card_info.innerHTML = createInfoHtml(item['name']['first'], 
											 item['name']['last'], 
											 item['email'], 
											 item['location']['city'], 
											 item['location']['state']);
		
		card.appendChild(card_imag);
		card.appendChild(card_info);
		
		card.addEventListener('click', function (event) {
			var d = new Date(item['dob']['date']);
		    var dob = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
		    
		    modal_info.innerHTML = createModalHtml(item['picture']['large'], 
		    		item['name']['first'], item['name']['last'], item['email'], 
		    		item['location']['city'], item['phone'], 
		    		item['location']['street']['number'], item['location']['street']['name'],
		    		item['location']['state'], item['location']['postcode'], dob);
		    
		    modalContainer.style.display = "block";
		    
		});
		
		galleryList.appendChild(card);
				
	};
	
	
}

function createImgHtml(imglink){
	var html = `<img class="card-img" src="${imglink}" alt="profile picture">`;
	console.log(html);
	return html;
}

function createInfoHtml(first, last, email, city, state){
	var html = `<h3 id="name" class="card-name cap">${first} ${last}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city}, ${state}</p>`;
	return html;
}


function createModalHtml(imaglink, first, last, email, city, phone, streetNumber, streetName, state, postcode, dob){
	var html = `<img class="modal-img" src="${imaglink}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${first} ${last}</h3>
    <p class="modal-text">${email}</p>
    <p class="modal-text cap">${city}</p>
    <hr>
    <p class="modal-text">${phone}</p>
    <p class="modal-text">${streetNumber} ${streetName}, ${state} , ${postcode}</p>
    <p class="modal-text">Birthday:  ${dob}</p>`;

	return html;
}

