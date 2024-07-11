/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à l'affichage dynamique 
 * des projets sur le site. 
 * 
 *********************************************************************************/
/**
 * Cette fonction crée le HTML du projet à ajouter à la galerie,
 * ajoute le projet à la galerie sur la page d'accueuil du site.
 * @param {object} data : tableau d'objets contenant les projets de l'architecte récupérés via l'API
 * @param {object} gallery : élément DOM parent des projets qu'on souhaites insérer
 * @param {object} categoryNames : tableau d'objets contenant les projets de l'architecte récupérés via l'API
 */
export function appendProjectsToGallery(data, gallery, categoryNames) {
  for (const project of data) {
    let figure = document.createElement('figure');
    const htmlStr = `
      <img src='${project.imageUrl}' alt='${project.title}'>
      <figcaption>${project.title}</figcaption>
    `;
    figure.innerHTML = htmlStr;
    figure.setAttribute('data-category', findCategory(project.category.id, categoryNames));
    gallery.appendChild(figure);
  }
}

/**
 * Cette fonction applique le nom de la catégorie au projet à insérer, qui sera utiles pour
 * le filtrage des projets par catégorie 
 * @param {string} idProject : identifiant du projet
 * @param {string} categoryNames : tableau d'objets contenant les projets de l'architecte récupérés via l'API
*/
function findCategory(idProject, categoryNames) {
  for (let i = 0; i < categoryNames.length; i++) {
    if (categoryNames[i].id === idProject) {
      return categoryNames[i].class;
    }
  }
}