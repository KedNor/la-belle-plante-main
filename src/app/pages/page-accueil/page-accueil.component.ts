import { Component, OnInit } from '@angular/core';
import { PlantouneService } from 'src/app/services/plantoune.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss'],
})
export class PageAccueilComponent implements OnInit {
  public listData: any[];
  public listDataAll: any[];
  public listCategoriesFilter: string[];
  public categoriesClicked: string[];
  public listSearchInput: any[];
  public listDataByCat: string[];
  public listCateg: string[];
  public searchInput: string;
  public prices: number[];
  public counterOrdre: any;
  public counterAvis: any;
  public counterPrix: any;
  public arowPrix: boolean;
  public arowOrdre: boolean;
  public arowAvis: boolean;
  public rating: number;

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listDataAll = [];
    this.listCategoriesFilter = [];
    this.categoriesClicked = [];
    this.listSearchInput = [];
    this.listDataByCat = [];
    this.listCateg = [];
    this.searchInput = '';
    this.prices = [];
    this.counterOrdre = 0;
    this.counterAvis = 0;
    this.counterPrix = 0;
    this.arowOrdre = false;
    this.arowPrix = false;
    this.arowAvis = false;
    this.rating = 0;
  }
  /**
   * equivalent de la ligne du dessus
   *
   * plantouneService;
   *
   * constructor(plantouneService: PlantouneService) {
   *   this.plantouneService = plantouneService;
   * }
   */

  ngOnInit(): void {
    this.plantouneService.getData().subscribe((listPlant: any[]) => {
      //console.log(listPlant);

      /**
       * Technique avec Underscore JS pour recupérer les catégories uniques de nos plantes
       */
      const listAllCategories = listPlant.map(
        (product) => product.product_breadcrumb_label
      );
      //console.log(listAllCategories);

      const listUniqCategories = _.uniq(listAllCategories);
      //console.log(listUniqCategories);

      /**
       * Technique native JS pour recupérer les catégories uniques de nos plantes
       */

      const listUniqJsCategories = [...new Set(listAllCategories)];
      //console.log(listUniqJsCategories);

      this.listCategoriesFilter = listUniqJsCategories;
      this.listData = [...listPlant];
      this.listDataAll = [...listPlant];
      this.listData.length = 150;
      this.listSearchInput = [...listPlant];
    });
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('');
  }

  onCategoriesClicked(listCategory: string[], listData: any[]): any[] {
    if (listCategory.length === 0) {
      return listData;
    } else {
      return listData.filter((product) =>
        listCategory.includes(product.product_breadcrumb_label)
      );
    }
  }

  onSearchFilter(searchInput: string, listData: any[]): any[] {
    //const search = inputEvent.target.value;
    if (searchInput) {
      return listData.filter((element) => {
        return element.product_name
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
    } else {
      return listData;
    }
  }

  filterPrice(prices: number[], listData: any[]) {
    if (prices.length === 0) {
      return listData;
    } else {
      return listData.filter(
        (product) =>
          prices[0] < parseInt(product.product_price) &&
          prices[1] > parseInt(product.product_price)
      );
    }
  }

  filterRating(rating: number, listData: any[]) {
    if (rating === 0) {
      return listData;
    } else {
      return listData.filter((product) => rating <= product.product_rating);
    }
  }

  //searchAllJb($event, null, null, null);
  searchAllJb(
    newListCateg: string[] | null,
    newFilterPrice: any | null,
    newFilterRating: number | null,
    newSearchInput: any | null
  ) {
    //si != null => this.listCateg = newListCateg;
    if (newListCateg != null) {
      this.listCateg = newListCateg;
    } else if (newSearchInput != null) {
      this.searchInput = newSearchInput.target.value;
    } else if (newFilterPrice != null) {
      this.prices = newFilterPrice;
    } else if (newFilterRating != null) {
      this.rating = newFilterRating;
    }

    const dataFilterCategory = this.onCategoriesClicked(
      this.listCateg,
      this.listDataAll
    );
    //console.log(dataFilterCategory);

    const dataFilterSearchInput = this.onSearchFilter(
      this.searchInput,
      dataFilterCategory
    );

    const dataFilterPrice = this.filterPrice(
      this.prices,
      dataFilterSearchInput
    );

    const dataRating = this.filterRating(this.rating, dataFilterPrice);

    this.listData = dataRating;

    //this.sortAlpha();

    // onfilterCategorie() => plant[] =>result

    // onfilterSearch(result) => plant()
  }

  sortAlpha() {
    this.counterOrdre++;
    if (this.counterOrdre % 2) {
      this.arowOrdre = true;
      this.listData.sort((a, b) => {
        if (b.product_name < a.product_name) {
          return -1;
        } else if (b.product_name > a.product_name) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.arowOrdre = false;
      this.listData.sort((a, b) => {
        if (a.product_name < b.product_name) {
          return -1;
        } else if (a.product_name > b.product_name) {
          return 1;
        } else {
          return 0;
        }
      });

      //   this.counter++;
      //   if (this.counter === 0) {
      //     this.listData.sort((a, b) =>
      //       a.product_name.localeCompare(b.product_name)
      //     );
      //     this.counter = 1;
      //   } else {
      //     this.listData.sort((a, b) =>
      //       b.product_name.localeCompare(a.product_name)
      //     );
      //     this.counter = 0;
      //   }
      // }
    }
  }

  sortAvis() {
    this.counterAvis++;
    if (this.counterAvis % 2) {
      this.arowAvis = true;
      this.listData.sort((a, b) => {
        if (b.product_rating < a.product_rating) {
          return -1;
        } else if (b.product_rating > a.product_rating) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.arowAvis = false;
      this.listData.sort((a, b) => {
        if (a.product_rating < b.product_rating) {
          return -1;
        } else if (a.product_rating > b.product_rating) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  sortPrix() {
    this.counterPrix++;
    if (this.counterPrix % 2) {
      this.arowPrix = true;
      this.listData.sort((a, b) => {
        if (parseFloat(b.product_price) < parseFloat(a.product_price)) {
          return -1;
        } else if (parseFloat(b.product_price) < parseFloat(a.product_price)) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.arowPrix = false;
      this.listData.sort((a, b) => {
        if (parseFloat(a.product_price) < parseFloat(b.product_price)) {
          return -1;
        } else if (parseFloat(a.product_price) < parseFloat(b.product_price)) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    // this.counterPrix++;
    // if (this.counterPrix === 0) {
    //   this.listData.sort((a, b) =>
    //     a.product_price.localeCompare(b.product_price)
    //   );
    //   this.counterPrix = 1;
    // } else {
    //   this.listData.sort((a, b) =>
    //     b.product_price.localeCompare(a.product_price)
    //   );
    //   this.counterPrix = 0;
    // }
  }
}
