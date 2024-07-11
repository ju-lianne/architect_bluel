/***************************************************************
 * 
 * Ce fichier gère l'affichage de la modale d'édition de projets
 * 
 ***************************************************************/
import { openModal, appendProjectsToModal } from './modalFunctions.js';
import { fetchData } from './manageData.js';

const modalLink = document.querySelector('.modal_link');
const modalGallery = document.querySelector('.modal_gallery');

modalLink.addEventListener('click', (element) => openModal(element));

fetchData()
  .then((data) => {
    appendProjectsToModal(data, modalGallery)
  });
