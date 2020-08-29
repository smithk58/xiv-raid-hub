import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css']
})
export class ThemeSelectorComponent implements OnInit {
  themes = ['default', 'slate', 'spacelab'];
  selectedTheme = 'default';
  @Input() labelForId: string;
  constructor() { }
  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.selectedTheme = theme;
    }
  }
  themeChange(theme: string) {
    // Save the theme if it's not the default, otherwise clear it so it isn't overriden on page load
    if (theme !== 'default') {
      localStorage.setItem('theme', theme);
    } else {
      localStorage.removeItem('theme');
    }
    // Update the current path to a specific theme, or default bootstrap
    const themeElement = document.getElementById('bootstrap-theme') as HTMLLinkElement;
    if (themeElement) {
      // Note that the default bootstrap path exists in the index.html as well, update both
      const url = theme !== 'default' ?
        'assets/themes/' + theme + '.min.css' : 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
      themeElement.href = url;
      // Add theme class to body for misc. overrides, clean up previous one. 'selectedTheme' will still be the previous theme at ths point
      const html = document.querySelector('html');
      if (this.selectedTheme !== 'default') {
        html.classList.remove('theme-' + this.selectedTheme);
      }
      if (theme !== 'default') {
        html.classList.add('theme-' + theme);
      }
    }
  }
}
