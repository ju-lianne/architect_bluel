/*********************************************************************************
 * 
 * Ce fichier contient les fonctions pour gérer le fonctionnement et l'affichage
 * des filtres de la galerie
 * 
 *********************************************************************************/
/**
 * Cette fonction gère l'affichage ou non des projets dans la galerie
 * selon leur tag + le bouton d'affichage de tou sles projets
 * @param {string} category : nom de la category du projet évalué pour déterminer
 * s'il est affiché ou non
*/
export function filterImages(category) {
    const figures = document.querySelectorAll('.gallery figure');
    
    figures.forEach(figure => {
      if (category === 'all' || figure.getAttribute('data-category') === category) {
        figure.style.display = 'block';
      } else {
        figure.style.display = 'none';
      }
    });
}

/**
 * Cette fonction applique le nom de la catégorie au projet à insérer, qui sera utiles pour
 * le filtrage des projets par catégorie 
 * @param {object} portfolio : élément DOM parent de la galerie de projets
 * @param {object} gallery : élément DOM parent des projets qu'on souhaites insérer
 * @param {string} categoryNames : tableau d'objets contenant les projets de l'architecte récupérés via l'API
*/
export function addFiltersBtns(portfolio, gallery, categoryNames) {
  const div = document.createElement('div');
  div.classList.add('filters-container');
  
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Tous';
  button.classList.add('full-color-btn', 'rounded-btn', 'all-projects');
  div.appendChild(button);
    
  for (const className of categoryNames) {
    let button = document.createElement('button');
    button.type = 'button';
    button.textContent = `${className.title}`;
    button.classList.add('filter-btn', 'rounded-btn');
    button.setAttribute('data-category', `${className.class}`),
    div.appendChild(button);
  }
  portfolio.insertBefore(div, gallery);
}

/**
 * Cette fonction rend les filtres des projets de la galerie fonctionnels
 */
export function manageFilters() {
  const boxFilters = document.querySelector('.filters-container');
  const showAllButton = boxFilters.querySelector('button.all-projects');
  showAllButton.addEventListener('click', () => {
    filterImages('all');
  });
  const categoryButtons = boxFilters.querySelectorAll('button.filter-btn');
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterImages(button.getAttribute('data-category'));
    });
  });
}
      