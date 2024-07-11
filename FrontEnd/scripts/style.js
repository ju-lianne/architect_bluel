/*********************************************************************************
 * 
 * Ce fichier contient la gestion des changements dynamiques de style des éléments 
 * du site
 * 
 *********************************************************************************/
/** Supprimer la mise en gras d'un élément */
export function removeFontWeight(selector) {
    const element = document.querySelector(selector);
    element.classList.remove('weight600');
};

/** Supprimer la mise en gras de l'onglet de navigation "login"
 * quand on est sur une autre page que celle du login
 */
document.addEventListener('DOMContentLoaded', () => {
    removeFontWeight('#nav_login');
});