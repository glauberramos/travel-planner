const metaAssets = () => {
  return [
    { charset: 'utf-8' },
    { name: 'description', content: 'Your One-Stop solution for a full-stack universal Redux App' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'msapplication-tap-highlight', content: 'no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'apple-mobile-web-app-title', content: 'reactGo' },
    { name: 'msapplication-TileColor', content: '#3372DF' }
  ];
};

export const title = 'Travel planner';
export const meta = metaAssets();
