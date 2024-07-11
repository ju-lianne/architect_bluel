/*********************************************************************************
 * 
 * Ce fichier contient les fonctions concernant le stockage en local storage et à
 * la récupération des données récupérées de l'API
 * 
 *********************************************************************************/
/**
 * Cette fonction récupère les données des projets del'architecte depuis l'API
 * et remplit la page d'accueil du site avec les visuels & infos desdits projets.
*/
export async function fetchData() {
    try {
      const response = await fetch('http://localhost:5678/api/works');
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
}

/**
 * 
 * @param {string} id 
 * @param {string} authToken 
 * @param {object} event 
 */
export async function deleteData(id, authToken, event) {
  event.preventDefault();
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
       },
      body: ''
    });
    if (!response.ok) {
      throw new Error('Request failed');
    }
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param {object} projectData 
 * @param {string} authToken 
 * @param {object} event 
 */
export async function addData(projectData, authToken, event) {
  event.preventDefault();
  try {
    const formData = new FormData();

    formData.append('image', projectData.imageFile);

    formData.append('title', projectData.title);
    formData.append('category', projectData.category);

    const response = await fetch('http://localhost:5678/api/works', {
      method: "POST",
      headers: { 
        'Authorization': `Bearer ${authToken}`
       },
      body: formData
    });
    if (!response.ok) {
      throw new Error('Request failed');
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Stocker les infos des projets
 * @param {object} data les données sur les projets de l'architecte
*/
export function storeData(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

/**
 * Stocker le nom des catégories
 * @param {object} data les données sur les projets de l'architecte
*/
export function storeCategories(data) {
    const categoryNames = getCategoryNames(data);
    localStorage.setItem('categories', JSON.stringify(categoryNames));
}

/**
 * Récupérer le nom des catégories
 * @returns un array de catégories uniques, chacune est un objet contenant un id, un nom de classe, un titre
*/
export function retrieveCategories() {
    const categories = window.localStorage.getItem('categories');
    return JSON.parse(categories); 
}

/**
 * Récupérer le token d'identification
 * @returns le token d'authentification utilisateur
*/
export function retrieveToken() {
    const token = localStorage.getItem('token');
    return JSON.parse(token);
}

/**
 * Cette fonction parcourt le tableau des projets de l'architecte, 
 * élimine les doublons, et renvoie un tableau contenant les classes définies
 * à utiliser dans dans la génération des filtres
 * @param {object} data : tableau d'objets contenant les projets de l'architecte récupérés via l'API
*/
function getCategoryNames(data) {
    const categoryNames = [];
    const categoryNamesSet = new Set();
  
    for (const project of data) {
        const formattedCategoryName = formatCategoryName(project.category.name);
        const categoryAndId = {
            id: project.category.id,
            class: formattedCategoryName,
            title: project.category.name,
        };
        const categoryAndIdString = JSON.stringify(categoryAndId);
  
        if (!categoryNamesSet.has(categoryAndIdString)) {
            categoryNames.push(categoryAndId);
            categoryNamesSet.add(categoryAndIdString);
        }
    }
    return categoryNames;
}

/**
 * 
 * @param {object} data 
 * @param {string} classToFind 
 * @returns 
*/
export function getCategoryIdByClass(data, classToFind) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].class === classToFind) {
            return data[i].id;
        }
    }
}

/**
 * Cette fonction formate le nom des catégories pour en faire des noms de classes HTML 
 * (pas d'espaces, pas d'accents, pas de caractères spéciaux),
 * @param {string} categoryName : nom de la catégorie à laquelle appartient le projet
*/
function formatCategoryName(categoryName) {
    return categoryName
     .toLowerCase()
     .normalize('NFD')
     .replaceAll(/[\u0300-\u036f\s]/g, '')
     .replaceAll(/[^a-zA-Z0-9-]/g, '-');
}
  