import { AgmMap, AgmMarker } from '@agm/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country } from './country';
import { DijkstraService } from './dijkstra.service';
import { pathDto } from './path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public countries: Country[];
  public path: Country[];
  public distance: number;
  public selectedInput: string;
  public previous: any;
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

  public markerClicked(country: Country, infowindow: any): void {
    if (this.selectedInput != null) {
      var options = (<HTMLSelectElement>document.getElementById(this.selectedInput)).options;
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        if (option.text == country.countryName) {
          option.selected = true;
          break;
        }

      }
      if (this.previous) {
        this.previous.close();
      }
      this.previous = infowindow;
    }
  }

  public click(id: string): void {
    this.selectedInput = id;
  }

  public reset(): void {
    this.path = [];
  }

  public findPath(): void {
    var options = (<HTMLSelectElement>document.getElementById("source")).options;
    var sourceIndex = options.selectedIndex;
    var source = (<HTMLSelectElement><unknown>options[sourceIndex]).value;
    var options = (<HTMLSelectElement>document.getElementById("destination")).options;
    var destinationIndex = options.selectedIndex;
    var destination = (<HTMLSelectElement><unknown>options[destinationIndex]).value;
    if (source == "" && destination == "") {
      alert("you should select source and destinaton");
      return;
    } else if (source == "") {
      alert("you should select source");
      return;
    } else if (destination == "") {
      alert("you should select destinaton");
      return;
    }
    this.dijkstraService.getPath(source, destination).subscribe(
      (response: pathDto) => {
        this.path = response.countries;
        this.distance = Math.round(response.distance);
        if (this.path.length != 0) {
          this.showPath();
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public showPath(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#showPathModal');
    if (container != null) {
      container.appendChild(button);
      button.click();
    }

  }

}
