import './styles/main.scss'; // global SCSS
import { main } from './js/app'; // app logic

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  main();
  console.log(' app initialized ');
});


