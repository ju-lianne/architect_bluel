/*********************************************************************************
 * 
 * Ce fichier génère le contenu des <head>, <header> et <footer> des fichiers HTML
 * 
 *********************************************************************************/

document.addEventListener("DOMContentLoaded", function () {
    /**
     * Injection du contenu de la balise <head>
    */
    const head = document.querySelector('head');
    const headCommonContent = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Work+Sans&display=swap" rel="stylesheet">
        <meta name="description" content="">
        <link rel="stylesheet" href="./assets/style.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <title>Sophie Bluel - Architecte d'intérieur</title>
    `
    head.insertAdjacentHTML('beforeend', headCommonContent);
    /**
     * Injection du contenu du <header>
    */
    const header = document.querySelector('header');
    const headerContent = `
    <h1 id="banner_title" class="cursor_pointer">Sophie Bluel <span>Architecte d'intérieur</span></h1>
    <nav>
        <ul>
            <li>projets</li>
            <li>contact</li>
            <li><a href="login.html" id="nav_login" class="weight600">login</a></li>
            <li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
        </ul>
    </nav>
    `
    header.innerHTML = headerContent;
    const bannerTitle = document.getElementById('banner_title');

    bannerTitle.addEventListener('click', () => {
    window.location.href = '/FrontEnd/';
    });
    /**
     * Injection du contenu du <footer>
    */
    const footer = document.querySelector('footer');
    const footerContent = `
    <nav>
        <ul>
            <li>Mentions Légales</li>
        </ul>
    </nav>
    `
    footer.innerHTML = footerContent;
});