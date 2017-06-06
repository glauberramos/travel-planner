import assets from '../../../public/assets/manifest.json';

const createAppScript = () => `<script type="text/javascript" charset="utf-8" src="/assets/${assets['app.js']}"></script>`;

const createStylesheets = () => `
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" />
<link rel="stylesheet" href="/assets/${assets['app.css']}" />
`;

export { createAppScript, createStylesheets };
