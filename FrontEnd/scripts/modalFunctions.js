/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à la gestion de la modale
 * pour ajouter / supprimer des projets dans la galerie
 * 
 *********************************************************************************/
import { deleteData, addData, retrieveToken, retrieveCategories, getCategoryIdByClass } from './manageData.js';


let modal = null;

/**
 * Fonction qui permet d'ouvrir la modale et d'y ajouter le
 * bouton pour accéder à l'ajout d'image et celui de fermeture de la modale
*/
export function openModal() {
  const modalBox = document.getElementById('modalEditPGallery');
  modalBox.style.display = null;
  modalBox.removeAttribute('aria-hidden');
  modalBox.setAttribute('aria-modal', 'true');
  modal = modalBox;

  const btnAccessAddPicture = document.getElementById('btn-access_add_picture');
  btnAccessAddPicture.addEventListener('click', () => displayAddPictureView());

  const btnClose = document.querySelector('.close_modal');
  btnClose.addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', () => closeModal(modal));
  modal.querySelector('.modal_wrapper').addEventListener('click', (element) => stopPropagation(element));
}

/**
 * Fonction qui permet de générer la galerie de miniatures des projets dans la modale et
 * de gérer la suppression de projets via cette galerie
 * @param {object} data 
 * @param {object} modalGallery 
*/
export function appendProjectsToModal(data, modalGallery) {
  for (const project of data) {
    let figure = document.createElement('figure');
    const htmlStr = `
      <img src='${project.imageUrl}' alt='${project.title}'>
      <div class='icon_background'>
        <i class="fa-solid fa-trash-can fa-xs"></i>
      </div>
    `;
    
    figure.innerHTML = htmlStr;
    modalGallery.appendChild(figure);
    
    let token = localStorage.getItem('token');
    token = JSON.parse(token);
    
    const trash = figure.querySelector('.icon_background');
    trash.addEventListener('click', (event) => {
      event.preventDefault();
      deleteData(parseInt(project.id, 10), token, event)
    ,token });
  }
}

/**
 * Gérer le changement de contenu de la modale pour passer de la galerie de suppression
 * au formulaire d'ajout d'un nouveau projet
*/
function displayAddPictureView() {
  /** Onrécupère le token pour autoriser l'ajout de projets dans la DB */
  let token = retrieveToken();

  /** On récupère les catégories pour pouvoir ajouter un projet et choisir sa catégorie */
  let categories = retrieveCategories();

  /** Stocker le contenu de la modale (suppression de projet)
   * Puis remplacer ce contenu pour afficher la vue d'ajout de projet
   */
  const modalBody = document.getElementById('modal_body');
  const modalGallery = modalBody.innerHTML;
  createAddPictureForm(modalBody);

  /* Gérer le formaulaire d'ajout de projet */
  const btnSubmitPicture = document.getElementById('btn-submit_picture');
  btnSubmitPicture.addEventListener('click', (event) => {
    handlePictureSubmission(categories, token, event);
  });
  addCategoriesOption(categories, 'categories');

  /* Gérer la vue 'Ajouter une photo' de la modale */
  const btnAccessAddPicture = document.getElementById('btn-access_add_picture');
  const arrowPrevious = document.querySelector('.previous_modal');
  const modalTitle = document.getElementById('modal_title'); 
  const modalElements = {
    body: modalBody,
    arrow: arrowPrevious,
    btnGallery: btnAccessAddPicture,
    btnSubmit: btnSubmitPicture,
    title: modalTitle
  }
  displayViewFeatures(modalElements);
  arrowPrevious.addEventListener('click', () => {
    handleModalPreviousBtn(modalElements, modalGallery);
  });

  /* Gérer le visuel de l'upload de la photo du projet */
  document.getElementById('photo').addEventListener('change', function (event) {
    displayUploadedPicture(btnSubmitPicture, event);
  });
}

/**
 * Créer le formulaire d'ajout de projet à la galerie
 * @param {object} formParent élément du DOM où on veut insérer le formulaire
*/
function createAddPictureForm(formParent) {
  const modalContentAddPicture = `
    <form action="#" method="post" id="add_picture_form">
      <div id="block_add_picture">
        <i class="fa-regular fa-image fa-4x js_hide"></i>
        <label id="btn-add_picture" class="full-color-btn rounded-btn js_hide" for="photo">+ Ajouter photo</label>
        <input type="file" id="photo" class="hidden" accept="image/*" name="photo">
        <img id="new_image" style="height: 190px;">
        <p class="js_hide">jpg, png : 4mo max</p>
      </div>
      <label for="title" class="label_weight">Titre</label>
      <p id="new_image_title_error_message" class="error_message"></p>
      <input type="text" name="title" id="title">
      <label for="categories" class="label_weight">Catégories</label><br>
      <select name="categories" id="categories">
        <option value="empty" selected></option>
      </select>
    </form>
  `
  formParent.innerHTML = '';
  formParent.innerHTML = modalContentAddPicture;
}

/**
 * Ajouter de nouveaux projets à la galerie
 * @param {object} categories : array des categories de projets uniques, chaque categorie est un objet avec
 * un id, un nom mis en forme et un nom de classe
 * @param {string} token : token d'authentification administrateur
 * @param {object} event : clic sur le bouton de soumission du formulaire d'ajout de projet
*/
function handlePictureSubmission(categories, token, event) {
  const titleInput = document.getElementById('title');
  const selectCategory = document.getElementById('categories');
  const errorMessage = document.getElementById('new_image_title_error_message');

  const title = titleInput.value.trim();
  const categoryClass = selectCategory.value;
  
  const categoryId = getCategoryIdByClass(categories, categoryClass);

    if (title === '') {
      errorMessage.innerText = 'Veuillez ajouter un titre.';
    } else {  
      errorMessage.innerText = '';
      const imageFile = document.getElementById('photo').files[0];
      const title = document.getElementById('title').value;
      const newProject = {
        title: title,
        imageFile: imageFile,
        category: parseInt(categoryId),
      };
      console.log(newProject);
      console.debug('image File : ', imageFile);
      addData(newProject, token, event);
    }
}

/**
 * Ajouter les options de catégories au menu déroulant dans le formulaire 
 * d'ajout de proket
 * @param {object} categories : array des categories de projets uniques, chaque categorie est un objet avec
 * un id, un nom mis en forme et un nom de classe
 * @param {string} idOfSelectInput : identifiant de la balise du menu déroulant des catégories
*/
function addCategoriesOption(categories, idOfSelectInput) {
  const formCategoriesElement = document.getElementById(idOfSelectInput);
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.class; 
    option.innerText = category.title;
    formCategoriesElement.appendChild(option);
  });
}

/**
 * Gérer le retour à la vue des suppressions de projet
 * @param {object} modalElements : objet contenant les différents éléments à gérer lors du changement de vue
 * @param {object} previousContent : contenu HTML de la vue de suppression de projets
 */
function handleModalPreviousBtn(modalElements, previousContent) {
  modalElements.body.innerHTML = previousContent;
  modalElements.arrow.style.display = 'none';
  modalElements.btnGallery.style.display = 'block';
  modalElements.btnSubmit.style.display = 'none';
  modalElements.title.innerText = 'Galerie photo'
}

/**
 * Gère quelles features afficher ou non dans la modale quand on est sur la vue
 * d'ajout de projets
 * @param {object} modalElements : objet contenant les différents éléments à gérer lors du changement de vue
 */
function displayViewFeatures(modalElements) {
  modalElements.arrow.style.display = 'block';
  modalElements.title.innerText = 'Ajout photo'
  modalElements.btnGallery.style.display = 'none';
  modalElements.btnSubmit.style.display = 'block';
}

/**
 * Gère l'upload de l'image d'illustration du projet à ajouter
 * @param {object} btnSubmit : élément DOM, bouton de soumissions du formulaire
 * @param {object} event : clic sur le bouton de soumission
 */
function displayUploadedPicture(btnSubmit, event) {
  const fileInput = event.target;
  const file = fileInput.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataUrl = e.target.result;
      const elementsToHide = document.querySelectorAll('.js_hide');
      document.getElementById('new_image').src = imageDataUrl;
      
      for (const elementTohide of elementsToHide) {
        elementTohide.style.display = 'none';
      }
    };
    btnSubmit.classList.remove('btn_inactive');
    reader.readAsDataURL(file);
  }
}

/**
 * Fermer la modale
 * @param {object} modal : élément de la modale
 * @returns la fonction stoppe immédiatement si la modale n'est pas ouverte
*/
function closeModal(modal) {
  if(modal === null) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
}

/**
 * Empêche la propagation d'un comportement à ses éléments enfants
 * @param {object} element 
*/
function stopPropagation(element) {
  element.stopPropagation();
}