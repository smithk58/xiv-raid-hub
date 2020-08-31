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
      themeElement.href = theme + '-theme.css';
    }
  }
}
