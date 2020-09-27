import PropTypes from 'prop-types';

/* 
    All common validation for React props will be here. 
    Use 'valid' prefix in all definition. E.g, validImageSizes
*/

export const validAscents = PropTypes.oneOf([
    "primary",
    "secondary",
    "orange",
    "green",
    "honey",
    "systemWhite",
    "systemWash",
    "systemMetalLight",
    "systemMetalDark",
    "systemSkyLight",
    "systemSkyDark",
]);