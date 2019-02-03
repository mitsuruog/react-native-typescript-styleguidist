import React, { Component } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome';

// Generate required css
import iconFont from 'react-native-vector-icons/Fonts/Ionicons.ttf';

const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Ionicons;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

export default class Wrapper extends Component {
  render() {
    return this.props.children;
  }
}
