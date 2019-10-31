/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import icons from './icons';
import replace from './replace';
import style from './animation.scss';

if (typeof window !== 'undefined') {
  style._insertCss();
}

export { icons, replace };
