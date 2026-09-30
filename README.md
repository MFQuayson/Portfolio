# Mcloyd Fiifi Quayson Portfolio

Personal portfolio website of Mcloyd Fiifi Quayson, digital marketing lead based in Accra, Ghana.

## Included

* index.html: page layout, text, metadata and navigation.
* style.css: orange and charcoal design, responsive layouts and motion.
* app.js: project stories, filters, tabs, video playback, dialogs and contact controls.
* assets/: original portfolio images, six videos, posters, favicon, CV and strategy sample PDF.

There is no build step and no package installation required. This website uses HTML, CSS and JavaScript.

## Preview locally

Open index.html in a modern browser, or run this command from the project folder:

    python3 -m http.server 8000

Then open http://localhost:8000. Keep the assets folder alongside index.html, style.css and app.js.

## Make changes

Edit index.html for the homepage and career content.
Edit the stories and films objects in app.js for project detail text and media references.
Edit the colour variables near the beginning of style.css for the palette.
Replace media in assets/ and update any corresponding filenames in index.html and app.js.

No backend or database is required. Contact buttons open the visitor's email or phone application. Video files are loaded when a visitor selects a video.

## Publish

Upload index.html, style.css, app.js and the entire assets folder to any static host, such as GitHub Pages or Netlify. There is no build step.

Once the site has its own address, add a canonical link and og:url tag with that address to the head of index.html.
