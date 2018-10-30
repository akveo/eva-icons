/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import classnames from 'classnames/dedupe';

import DEFAULT_ATTRS from './default-attrs.json';
const defaultAnimationOptions = {
  hover: true,
};

const isString = (value) => typeof value === 'string' || value instanceof String;

class Icon {
  constructor(name, contents) {
    this.name = name;
    this.contents = contents;
    this.attrs = {
      ...DEFAULT_ATTRS,
      ...{ class: `eva eva-${name}` },
    };
  }

  toSvg(attrs = {}) {
    const { animation, ...remAttrs } = attrs;
    const animationOptions = getAnimationOptions(animation);
    const animationClasses = animationOptions ? animationOptions.class : '';
    const combinedAttrs = {
      ...this.attrs,
      ...remAttrs,
      ...{ class: classnames(this.attrs.class, attrs.class, animationClasses) },
    };
    const svg = `<svg ${attrsToString(combinedAttrs)}>${this.contents}</svg>`;

    return !!animationOptions ? animationOptions.hover ? `<i class="eva-hover">${svg}</i>` : svg : svg;
  }

  toString() {
    return this.contents;
  }
}

function getAnimationOptions(animation) {
  if (!animation) {
    return null;
  }

  if (animation.hover) {
    animation.hover = isString(animation.hover) ? JSON.parse(animation.hover) : animation.hover;
  }

  const mergedAnimationOptions = {
    ...defaultAnimationOptions,
    ...animation,
  };
  const animationType = mergedAnimationOptions.hover ?
    `eva-icon-hover-${mergedAnimationOptions.type}` :
    `eva-icon-${mergedAnimationOptions.type}`;
  mergedAnimationOptions.class = classnames(
    {
      'eva-animation': true,
      'eva-infinite': isString(animation.infinite) ? JSON.parse(animation.infinite) : animation.infinite,
    },
    animationType,
  );

  return mergedAnimationOptions;
}

function attrsToString(attrs) {
  return Object.keys(attrs)
    .map(key => `${key}="${attrs[key]}"`)
    .join(' ');
}

export default Icon;
