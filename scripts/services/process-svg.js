const Svgo = require('svgo');

const optimize = (svg) => {
  const svgo = new Svgo({
    plugins: [
      { convertShapeToPath: false },
      { mergePaths: false },
      { inlineStyles: { onlyMatchedOnce: false } },
      { removeAttrs: { attrs: '(fill|stroke.*)' } },
      { removeTitle: true },
    ],
  });

  return svgo.optimize(svg)
    .then(({ data }) => data );
};

const processSvg = (svg) => optimize(svg);

module.exports = processSvg;
