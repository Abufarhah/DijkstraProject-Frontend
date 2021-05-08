import { AgmMap, AgmMarker } from '@agm/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Country } from './country';
import { DijkstraService } from './dijkstra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public countries: Country[];
  public path: Country[];
  public selectedInput: string;
  @ViewChild('map') map: AgmMap;

  constructor(private dijkstraService: DijkstraService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  public getCountries(): void {
    this.dijkstraService.getCountries().subscribe(
      (response: Country[]) => {
        this.countries = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public markerClicked(country: Country): void {
    if (this.selectedInput != null) {
      (<HTMLInputElement>document.getElementById(this.selectedInput)).value = country.countryName;
    }
  }

  public click(id: string): void {
    this.selectedInput = id;
  }

  public findPath(): void {
    var source = (<HTMLInputElement>document.getElementById('source')).value;
    var destination = (<HTMLInputElement>document.getElementById('destination')).value;
    if(source==""&&destination==""){
      alert("you should select source and destinaton");
      return;
    }else if(source==""){
      alert("you should select source");
      return;
    }else if(destination==""){
      alert("you should select destinaton");
      return;
    }
    this.dijkstraService.getPath(source, destination).subscribe(
      (response: Country[]) => {
        this.path = response;
        var result = "";
        this.path.forEach(element => {
            result+=element.countryName;
        });
        alert(result);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
