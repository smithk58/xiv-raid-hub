import { Component, OnInit } from '@angular/core';
import { TierRanking } from 'src/app/pages/my-raid/fflogs-ranking/tier-ranking';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FFLogsApiService } from 'src/app/shared/api/fflogs/fflogs-api.service';

@Component({
  selector: 'app-fflogs-ranking',
  templateUrl: './fflogs-ranking.component.html',
  styleUrls: ['./fflogs-ranking.component.scss']
})
export class FflogsRankingComponent implements OnInit {
  faChevronRight = faChevronRight; faChevronDown = faChevronDown;
  displayDialog: boolean;
  rankings: TierRanking[];

  constructor(private ffLogsService: FFLogsApiService) { }

  ngOnInit() {
    this.ffLogsService.getRegions().subscribe((regions) => {
      console.log('regions', regions);
    });
    this.rankings = [];
    this.rankings.push({
      name: 'Tier 1',
      expansion: 'Made up expansion',
      bestPerfAvg: 50,
      medianPerfAvg: 49,
      totalKills: 48,
      encounters: [
        {
          name: 'Boss 1',
          bestPercent: 47,
          medPercent: 46,
          highestRDPS: 1000,
          totalKills: 3
        }
      ]
    });
    this.rankings.push({
      name: 'Tier 2',
      expansion: 'Made up expansion',
      bestPerfAvg: 100,
      medianPerfAvg: 99,
      totalKills: 98,
      encounters: [
        {
          name: 'Boss 1',
          bestPercent: 97,
          medPercent: 96,
          highestRDPS: 1000,
          totalKills: 3
        },
        {
          name: 'Boss 2',
          bestPercent: 97,
          medPercent: 96,
          highestRDPS: 1000,
          totalKills: 3
        }
      ]
    });
  }

  showDialogToAdd() {
    /*this.newCar = true;
    this.car = new PrimeCar();
    this.displayDialog = true;*/
  }

  save() {
    /*const cars = [...this.cars];
    if (this.newCar) {
      cars.push(this.car);
    } else {
      cars[this.findSelectedCarIndex()] = this.car;
    }
    this.cars = cars;
    this.car = null;
    this.displayDialog = false;*/
  }

  delete() {
    /*const index = this.findSelectedCarIndex();
    this.cars = this.cars.filter((val, i) => i !== index);
    this.car = null;
    this.displayDialog = false;*/
  }

  onRowSelect(event) {
    /*this.newCar = false;
    this.car = {...event.data};
    this.displayDialog = true;*/
  }
}
