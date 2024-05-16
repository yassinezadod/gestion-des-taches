

const firebaseConfig = {
    apiKey: "AIzaSyBKagsHoLcuUYSf0xmLctBq96ByKpa-Bl0",
    authDomain: "gestion-des-utilisateur-d17dc.firebaseapp.com",
    databaseURL: "https://gestion-des-utilisateur-d17dc-default-rtdb.firebaseio.com",
    projectId: "gestion-des-utilisateur-d17dc",
    storageBucket: "gestion-des-utilisateur-d17dc.appspot.com",
    messagingSenderId: "319678934610",
    appId: "1:319678934610:web:29a306a04513d54a81798b",
    measurementId: "G-5K5G0PX9EE"
  };


  firebase.initializeApp(firebaseConfig);

  var contactFormDB = firebase.database().ref("contactForm");

  // Fetch and display messages
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  function submitForm(e) {
      e.preventDefault(); // Prevent default form submission
  
      var name = document.getElementById("name").value;
      var emailid = document.getElementById("emailid").value;
      var msgContent = document.getElementById("msgContent").value;
      var date = document.getElementById("date").value;
  
      // Check if we're updating an existing message or adding a new one
      
          saveMessages(name, emailid, msgContent, date);
  }
  
  // Save a new message to Firebase
  function saveMessages(name, emailid, msgContent, date) {
      var newContactForm = contactFormDB.push();
      newContactForm.set({
          name: name,
          emailid: emailid,
          msgContent: msgContent,
          date: date
      });
  }


  function fetchMessages() {
    contactFormDB.on('value', function(snapshot) {
        document.getElementById('messagesList').innerHTML = '<tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th><th>Actions</th></tr>';
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            document.getElementById('messagesList').innerHTML += `<tr id="${childKey}">
                <td>${childData.name}</td>
                <td>${childData.emailid}</td>
                <td>${childData.msgContent}</td>
                <td>${childData.date}</td>
                <td>
                    <button onclick="deleteMessage('${childKey}')">Delete</button>
                    <button onclick="editMessage('${childKey}', '${childData.name}', '${childData.emailid}', '${childData.msgContent}')">Edit</button>
                </td>
            </tr>`;
        });
    });
}

fetchMessages();


function deleteMessage(id) {
    contactFormDB.child(id).remove();
}


function editMessage(id, name, email, message) {
    document.getElementById('name').value = name;
    document.getElementById('emailid').value = email;
    document.getElementById('msgContent').value = message;
// Set current editing ID to enable 
    currentEditingId = id; 
}


// Update an existing message in Firebase
function updateMessage(id) {
    var updatedName = document.getElementById('name').value;
    var updatedEmail = document.getElementById('emailid').value;
    var updatedMessage = document.getElementById('msgContent').value;
    var updatedDate= document.getElementById('date').value;
    contactFormDB.child(id).update({
        name: updatedName,
        emailid: updatedEmail,
        msgContent: updatedMessage,
        date: updatedDate
    });
// Clear form after update
    clearForm(); 
}


function clearForm() {
    document.getElementById("name").value = '';
    document.getElementById("emailid").value = '';
    document.getElementById("msgContent").value = '';
    document.getElementById("date").value = '';
// Reset to "add new" mode
    currentEditingId = null; 
}