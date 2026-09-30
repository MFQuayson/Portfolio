# Mcloyd Fiifi Quayson Portfolio

Complete portable export of the published portfolio, version 3, exported on 30 September 2026.

## Included

* index.html: page layout, text, metadata and navigation.
* style.css: orange and charcoal design, responsive layouts and motion.
* app.js: project stories, filters, tabs, video playback, dialogs and contact controls.
* assets/: original portfolio images, six videos, posters, favicon, CV and strategy sample PDF.

There is no build step and no package installation required. This website uses HTML, CSS and JavaScript.

## Preview locally

Extract this ZIP. Open index.html in a modern browser, or run the following command from the extracted folder:

    python3 -m http.server 8000

Then open http://localhost:8000 in your browser. Keep the assets folder alongside index.html, style.css and app.js.

## Make changes

Edit index.html for the homepage and career content.
Edit the stories and films objects in app.js for project detail text and media references.
Edit the colour variables near the beginning of style.css for the palette.
Replace media in assets/ and update any corresponding filenames in index.html and app.js.

No backend or database is required. Contact buttons open the visitor's email or phone application. Video files are loaded when a visitor selects a video.

## Publish elsewhere

Upload index.html, style.css, app.js and the entire assets folder to a static website host. The archive places index.html directly at its root so there is no build configuration to set.

For Netlify manual deployment, extract the ZIP and upload the folder containing index.html and assets. Confirm the project's visitor access is public before sharing its address.

If you use a new website address, update the canonical link and og:url value in index.html. The export preserves the currently published address:

https://mcloyd-quayson-portfolio.mcloyd.chatgpt.site

Changing this downloaded copy does not automatically change the existing hosted portfolio. Upload the updated files to your selected host, or request an update in the PORTFOLIO - BACKEND conversation.

## Source provenance

Published source commit: c98e027c50491779411730b24b68dade91f6719d.

The export contains the website files and assets, with no credentials, repository history or hosting account configuration.
