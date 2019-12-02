import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { MachineService } from 'app/services/machine.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit {
  machines$: Observable<{}[]>;
  machineArray: any[] = [];

  constructor(private router: Router, private machineService: MachineService) {
    this.machines$ = this.machineService.machines$
        .pipe(
          filter(x => x !== null)
          , map(x => x.filter((y: any) => y.machine !== null && y.metricDefinitions != null && y.state != null
            && y.statistics != null))
          , filter(x => x.length > 0)
          , tap((x => {
            this.machineArray = x;
           }))
          );
    this.machines$.subscribe();
  }
  ngOnInit() {
  }

}
