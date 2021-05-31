const defaultTheme = require('@qlik/sense-themes-default/dist/sense/theme.json');

module.exports = {
  serve: {
    themes: [{ id: 'sense', theme: defaultTheme }],
  },
};
