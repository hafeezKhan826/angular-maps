import { Component, OnChanges, ViewChild } from "@angular/core";
import { AgmPolygon, GoogleMapsAPIWrapper } from "@agm/core";
import { PolygonOptions } from "@agm/core/services/google-maps-types";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnChanges {
  circleLng: number;
  circleLat: number;
  tempFarm: any[];
  stopCrops: boolean;
  tempMarker: any[];
  form: NgForm;
  farmName: any;
  closeResult: string;
  displaySubCoords: boolean;
  subCoordsMarkers: any;
  markCordsTerritory: boolean;
  markTerritory: boolean;
  generateFields: boolean;
  generateSubs: boolean;
  title = "Google Maps";
  renderPolygon: boolean;

  zoom: any = 13;
  lat: any = 12.916521825860583;
  lng: any = 77.59995460760251;

  newFarm: any;
  name: any = "Markers";

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
  locationChoosen: Boolean = false;
  farms: Farm[] = [
    {
      name: "Kenny's",
      draggable: false,
      fillColor: "green",
      markers: [
        {
          name: "BTM Layout",
          lat: 12.916521825860583,
          lng: 77.59995460760251,
          draggable: true
        },
        {
          name: "BSK",
          lat: 12.926149945960534,
          lng: 77.54459381353513,
          draggable: true
        },
        {
          name: "KS Layout",
          lat: 12.90423119871411,
          lng: 77.5633907343115,
          draggable: true
        }
      ],
      crops: [
        {
          name: "Grapes",
          draggable: true,
          fillColor: "pink",
          markers: [
            {
              name: "Al-bek",
              lat: 12.916537665702698,
              lng: 77.5982888177216,
              draggable: true
            },
            {
              name: "BNM Inst of tech",
              lat: 12.9219509,
              lng: 77.56713909999996,
              draggable: true
            },
            {
              name: "SURI FANCY & GIFT CENTER",
              lat: 12.904774510023325,
              lng: 77.56338746988854,
              draggable: true
            }
          ]
        },
        {
          name: "Pines",
          draggable: true,
          fillColor: "yellow",
          markers: [
            {
              name: "Cake Kraft in Kathriguppe",
              lat: 12.92446,
              lng: 77.54948579999996,
              draggable: true
            },
            {
              name: "BNM Degree college",
              lat: 12.9223963,
              lng: 77.56583049999995,
              draggable: true
            },
            {
              name: "Poojashree Apartment",
              lat: 12.9093696,
              lng: 77.56106109999996,
              draggable: true
            }
          ]
        }
      ]
    },
    {
      name: "Lenny's",
      draggable: false,
      fillColor: "red",
      markers: [
        {
          name: "Bop'Square R",
          lat: 12.934869561228275,
          lng: 77.63612089658773,
          draggable: true
        },
        {
          name: "Sagar Hospital",
          lat: 12.931078049448248,
          lng: 77.60004043829099,
          draggable: true
        },
        {
          name: "Hsr Layout",
          lat: 12.910489485254363,
          lng: 77.64882383848226,
          draggable: true
        }
      ],
      crops: [
        {
          name: "Grapes",
          draggable: true,
          fillColor: "beige",
          markers: [
            {
              name: "Prost",
              lat: 12.933118,
              lng: 77.63070649999997,
              draggable: true
            },
            {
              name: "St.John's Medical College Hospital",
              lat: 12.930812,
              lng: 77.61992090000001,
              draggable: true
            },
            {
              name: "City clinic",
              lat: 12.9273337,
              lng: 77.61599960000001,
              draggable: true
            },
            {
              name: "Barbeque Nation Koramangala",
              lat: 12.9255622,
              lng: 77.63709010000002,
              draggable: true
            }
          ]
        }
      ]
    }
  ];
  updateDragPoints(m, $event) {
    for (let i = 0; i < this.farms.length; i++) {
      for (let j = 0; j < this.farms[i].markers.length; j++) {
        const tempMarker = this.farms[i].markers[j];
        if (tempMarker.lat === m.lat && tempMarker.lng === m.lng) {
          const updatedAfterDrag: Marker = {
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: tempMarker.draggable,
            name: tempMarker.name
          };

          this.farms[i].markers[j] = Object.assign({}, updatedAfterDrag);

          this.reDraw();
        }
      }
    }

    for (let i = 0; i < this.farms.length; i++) {
      for (let j = 0; j < this.farms[i].crops.length; j++) {
        for (let k = 0; k < this.farms[i].crops[j].markers.length; k++) {
          const tempMarker = this.farms[i].crops[j].markers[k];
          if (m.lat === tempMarker.lat && m.lng === tempMarker.lng) {
            const updatedAfterDrag: Marker = {
              lat: $event.coords.lat,
              lng: $event.coords.lng,
              draggable: tempMarker.draggable,
              name: tempMarker.name
            };

            this.farms[i].crops[j].markers[k] = Object.assign(
              {},
              updatedAfterDrag
            );

            this.reDraw();
          }
        }
      }
    }
  }

  private reDraw() {
    this.renderPolygon = false;
    setTimeout(() => {
      this.renderPolygon = true;
    }, 0);
  }

  mapClicked(event) {
    if (this.form) {
      const newMarker: Marker = {
        lat: event.coords.lat,
        lng: event.coords.lng,
        name: "New Farm Coords",
        draggable: true
      };
      this.tempMarker.push(newMarker);
      const recentlyAddedFarm: Farm = this.farms[this.farms.length - 1];
      recentlyAddedFarm.markers = this.tempMarker;
    } else {
      alert("name Your farm");
    }
  }
  stopCreatingSubCoords() {
    this.tempMarker = [];
    this.stopCrops = true;
  }
  addNewFarm(form: NgForm) {
    this.form = form;
    const newFarm: Farm = {
      name: form.value.farmName,
      crops: [],
      draggable: true,
      fillColor: form.value.color,
      markers: []
    };
    this.farms.push(newFarm);
    this.reDraw();
  }
  /* constructor(private modalService: NgbModal) { */
  constructor() {
    this.subCoordsMarkers = [];
    this.markTerritory = false;
    this.displaySubCoords = false;
    this.generateSubs = false;
    this.generateFields = true;
    this.renderPolygon = true;
    this.newFarm = {};
    this.form = null;
    this.tempMarker = [];
    this.tempFarm = [];
    this.circleLat = 12.9597914;
    this.circleLng = 77.52897970000004;
  }
  public polyClicked(event) {
    const subCoords: Marker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      name: "Sub Coords",
      draggable: true
    };
    this.subCoordsMarkers.push(subCoords);
    setTimeout(() => {
      this.displaySubCoords = true;
    }, 0);
  }
  public manageSelect(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
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
    for (let i = 0; i < this.markers.length; i++) {
      if (m.lat === this.markers[i].lat && m.lng === this.markers[i].lng) {
        const updatedAfterDrag: Marker = {
          lat: $event.coords.lat,
          lng: $event.coords.lng,
          draggable: this.markers[i].draggable,
          name: this.markers[i].name
        };
        this.markers[i] = Object.assign([], updatedAfterDrag);
      }
    }
    this.markTerritory = false;
    setTimeout(() => {
      this.markTerritory = true;
    }, 0);
  }

  public saveCoords() {
    const recentlyAddedFarm: Farm = this.farms[this.farms.length - 1];
    console.log(recentlyAddedFarm);
    this.tempMarker = [];
    this.generateSubs = true;
    this.reDraw();
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

  deleteFarmMarker(marker, splicerFrom, farmIndex, markerIndex) {
    if (splicerFrom === "farm") {
      this.farms[farmIndex].markers.splice(markerIndex, 1);
    } else if (splicerFrom === "crop") {
      this.farms[farmIndex].crops[0].markers.splice(markerIndex, 1);
    }
    this.reDraw();
  }

  polygonClicked($event, farmIndex) {
    console.log(this.farms[farmIndex], this.farms[farmIndex].crops);
    const marker: Marker = {
      draggable: true,
      lat: $event.latLng.lat(),
      lng: $event.latLng.lng(),
      name: "New Sub Coords"
    };
    this.tempMarker.push(marker);
    const crop: Farm = {
      name: "Kiki",
      draggable: true,
      fillColor: "cinamon",
      markers: this.tempMarker
    };
    this.tempFarm.push(crop);
    if (this.stopCrops) {
      this.tempFarm = [];
    }
    this.farms[farmIndex].crops = this.tempFarm;
    this.reDraw();
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

interface Farm {
  name: string;
  draggable?: boolean;
  markers: Marker[];
  crops?: Farm[];
  fillColor: string;
}
