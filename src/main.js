import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import Navigation from './components/Navigation';

const NavigationWidget = wrap(Vue, Navigation);

window.customElements.define('navigation-widget', NavigationWidget);
