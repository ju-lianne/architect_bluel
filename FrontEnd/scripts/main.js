/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à l'affichage dynamique sur
 * le site
 * 
 *********************************************************************************/
import { fetchData, storeData, storeCategories, retrieveCategories } from './manageData.js';
import { appendProjectsToGallery } from './gallery.js';
import { addFiltersBtns, manageFilters } from './filters.js';
import { isAdminViewEnabled } from './adminView.js';

const portfolio = document.querySelector('#portfolio');
const gallery = portfolio.querySelector('.gallery');
let tokenLogin = localStorage.getItem('token');
tokenLogin = JSON.parse(tokenLogin);

/* Déterminer si la page s'affiche en vue administrateur ou non */
isAdminViewEnabled(tokenLogin);

/** Récupérer les projets depuis l'API et les insérer dans la galerie */
fetchData()
  .then((data) => {
    storeData(data);
    storeCategories(data);
    const categoryNames = retrieveCategories();
    if(!tokenLogin) {
      addFiltersBtns(portfolio, gallery, categoryNames);
    }
    appendProjectsToGallery(data, gallery, categoryNames);
  })
  .then(() => {    
    if(!tokenLogin) {
      manageFilters();
    }
  })
  .catch((error) => {
    console.error('An error occurred :', error);
  });