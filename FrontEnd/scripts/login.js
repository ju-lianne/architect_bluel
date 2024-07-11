/*********************************************************************************
 * 
 * Ce fichier contient la gestion du login utilisateur pour accéder à
 * la vue administrateur du site
 * 
 *********************************************************************************/
const loginForm = document.getElementById('login_form');
const errorMessage = document.getElementById('login_error_message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('password').value;
  const authJSON = JSON.stringify({ email, password });

  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: authJSON
  });

  if(response.status === 200) {
    const data = await response.json();
    const token = data.token;
    localStorage.setItem('token', JSON.stringify(token));
    
    window.location.href = '/FrontEnd'
  } else if (response.status === 401) {
    console.log('response not OK : ', response.status);
    errorMessage.innerText = 'Identifiants incorrects. Veuillez réessayer.';
  } else {
    errorMessage.innerText = 'Une erreur s\'est produite lors de la connexion.';
  }
});
