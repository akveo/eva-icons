/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const path = require('path');
const cheerio = require('cheerio');
const htmlMinifier = require('html-minifier');

const processSvg = require('./process-svg');

const getSvgContents = (svg) => {
  const $ = cheerio.load(svg, { xmlMode: true });

  return htmlMinifier.minify(
    $('svg').html(),
    {
      collapseWhitespace: true,
      keepClosingSlash : true,
    });
};

const buildIconsObject = (svgFiles, getSvg) => {
  return Promise.all(svgFiles.map((svgFile) => {
    const name = path.basename(svgFile, '.svg');

    return processSvg(getSvg(svgFile))
      .then((svg) => {
        const contents = getSvgContents(svg);

        return { name, contents };
      });
  }))
    .then((processed) => {
      return processed.reduce((icons, icon) => {
        icons[icon.name] = icon.contents;

        return icons;
      }, {});
    });
};

module.exports = buildIconsObject;
