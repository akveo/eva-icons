/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

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
