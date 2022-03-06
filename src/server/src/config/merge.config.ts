/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import _ from 'lodash';
function getObjectType(target: any): string {
  const type = typeof target;

  // If not object return the type.
  if (type !== 'object') {
    return type;
  }

  // check if is an array
  if (Array.isArray(target)) {
    const ArrayOfType = getObjectType(target[0]);
    return `arrayOf${ArrayOfType.charAt(0).toUpperCase() + ArrayOfType.slice(1)}`;
  }

  return type;
}

function mergeArraysOfObjects(target: any, source: any): any[] {
  const firstElement = target.length === 0 ? source[0] : target[0];
  const keyToMergeWith = Object.keys(firstElement)[0];

  const merged = _.merge(_.keyBy(target, keyToMergeWith), _.keyBy(source, keyToMergeWith));
  const values = _.values(merged);
  return values;
}

function cleanComments(target: any): void {
  Object.keys(target).forEach((key) => {
    if (key.includes('_comment_')) {
      delete target[key];
    }
  });
}

export default function mergeObjects(target: any, source: any): any {
  const merged: any = {};

  Object.keys(target).forEach((key) => {
    if (key.includes('_comment_')) {
      return;
    }

    switch (getObjectType(target[key])) {
      case 'object':
        if (!Object.prototype.hasOwnProperty.call(source, key)) {
          // Clean comments from objects
          cleanComments(target[key]);
          merged[key] = target[key];
        } else {
          merged[key] = mergeObjects(target[key], source[key]);
        }
        break;

      case 'arrayOfObject':
        merged[key] = mergeArraysOfObjects(target[key], source[key]);
        break;

      // system types
      default:
        if (!Object.prototype.hasOwnProperty.call(source, key)) {
          merged[key] = target[key];
        } else {
          merged[key] = source[key];
        }
        break;
    }
  });

  return merged;
}

// Extension Methods.
//  Define {str.format(...)} method.
declare global {
  interface String {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    format(...args: any[]): string;
  }
}

if (!String.prototype.format) {
  String.prototype.format = function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}
