import { Component, OnChanges, ViewChild } from "@angular/core";
import { AgmPolygon, GoogleMapsAPIWrapper } from "@agm/core";
import { PolygonOptions } from "@agm/core/services/google-maps-types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnChanges {
  subCoordsMarkers: any;
  markCordsTerritory: boolean;
  markTerritory: boolean;
  title = "maps";

  // zoom level
  zoom: any = 20;
  lat: any = 51.678418;
  lng: any = 7.809007;
  markers: Marker[] = [
    /* {
      name: "Tampa",
      lat: 27.9506,
      lng: 82.4572,
      draggable: true
    },
    {
      name: "Miami",
      lat: 25.7617,
      lng: 80.1918,
      draggable: true
    },
    {
      name: "Orlando",
      lat: 28.5383,
      lng: 81.3792,
      draggable: true
    } */
  ];
  restaurant: any = {
    latitude: 51.678418,
    longitude: 7.809007,
    delivery_zones: [25, 56, 57, 9, 5]
  };
  public paths = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 }
  ];
  locationChoosen: Boolean = false;

  constructor(private mapsWrapper: GoogleMapsAPIWrapper) {
    this.subCoordsMarkers = [];
    this.markTerritory = false;
  }

  public polyClicked(event) {
    console.log("Cliked inside Polygon");
    console.log(
      "Latitude: ",
      event.latLng.lat(),
      "\tLatitude: ",
      event.latLng.lat()
    );
  }
  public manageSelect(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    console.log("mapClicked Event: ", event);
    const newMarker: Marker = {
      name: "New Coord",
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: true
    };
    this.markers.push(newMarker);
  }

  public markerClicked(event, i) {
    console.log("markerClicked Event: ", event, " on index:", i);
  }

  public mapReadyTrigger($event) {
    console.log("mapReadyTrigger: ", $event);
  }

  public markerDragEnd(m, $event) {
    console.log("Before Drag update: ", m);
    for (let i = 0; i < this.markers.length; i++) {
      if (m.lat === this.markers[i].lat && m.lng === this.markers[i].lng) {
        const updatedAfterDrag: Marker = {
          lat: $event.coords.lat,
          lng: $event.coords.lng,
          draggable: this.markers[i].draggable,
          name: this.markers[i].name
        };
        this.markers[i] = Object.assign({}, updatedAfterDrag);
      }
    }
    this.markTerritory = false;
    setTimeout(() => {
      this.markTerritory = true;
    }, 0);
  }

  public saveCoords() {
    this.markTerritory = true;
    console.log("Coords are: ", this.markers);
    this.generateSubCoords();
    this.markCordsTerritory = true;
  }

  public generateSubCoords() {
    for (let i = 0; i < this.markers.length; i++) {
      const tempSubCoords: Marker = {
        lat: this.markers[i].lat * 0.8,
        lng: this.markers[i].lng * 0.8,
        draggable: this.markers[i].draggable,
        name: "Sub MArkers"
      };
      this.subCoordsMarkers.push(tempSubCoords);
    }
    console.log("subCoordsMarkers: ", this.subCoordsMarkers);
  }
  public mapRightClicked($event, m) {
    console.log("mapRightClicked: ", $event, m);
  }

  public deleteMarker(m) {
    for (let i = 0; i < this.markers.length; i++) {
      if (m.lat === this.markers[i].lat && m.lng === this.markers[i].lng) {
        this.markers.splice(i, 1);
      }
    }

    this.markTerritory = false;
    setTimeout(() => {
      this.markTerritory = true;
    }, 0);
  }

  removeCoords() {
    this.markers = [];
    this.markTerritory = false;
  }

  ngOnChanges(changes: any) {
    console.log("Changes Detected: ", changes);
  }
}

interface Marker {
  name?: string;
  lat: number;
  lng: number;
  draggable?: boolean;
}
