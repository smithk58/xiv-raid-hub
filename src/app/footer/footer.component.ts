import {Component, OnInit} from '@angular/core';

import { faGithub  } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  gitHubIcon = faGithub;
  constructor() { }
}
