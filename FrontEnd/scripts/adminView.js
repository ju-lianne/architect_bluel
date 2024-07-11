/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à la gestion de la vue
 * administrateur du site
 * 
 *********************************************************************************/
/**
 * Afficher la vue administrateur si le token d'authentification est stocké
 * @param {string} tokenLogin 
 */
export function isAdminViewEnabled(tokenLogin) {
    if(tokenLogin) {
        document.addEventListener("DOMContentLoaded", () => {
            displayAdminView();
            logOut();
        });
    }
}

/**
 * Gérer l'affichage de la vue administrateur
 */
export function displayAdminView() {
    const adminBanner = document.querySelector('.admin_view.black_banner');
    adminBanner.style.display = 'flex';

    const portfolioEdit = document.querySelector('.admin_view.portfolio_edit');
    portfolioEdit.style.display = 'flex';

    const blankSpace = document.querySelector('.admin_view.blank_space');
    blankSpace.style.display = 'block';

    const logLink = document.querySelector('#nav_login');
    logLink.innerText = 'logout';
}

/**
 * Gérer la déconnexion de l'admin (supprimer le token d'authentification du local storage)
 */
export function logOut() {
    const logLink = document.querySelector('#nav_login');
    logLink.setAttribute('href', '#')
    logLink.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
}