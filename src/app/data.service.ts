import {computed, effect, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Product} from "./Product";
import {UserServiceService} from "./user-service.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {Delivery} from "./delivery";
import {DatePipe} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class DataService {


  allDeliveries= signal<Delivery[]>([]);
  allProducts = signal<Product[]>([]);
  selectedCategory = signal('ALL');


  productsFilter = signal('');
  selectedProduct = signal<Product>(this.allProducts()[0]);

   stock = signal<number>(0);
   price = signal<number>( 0);
   amount = signal<number>( 0);


  filteredProducts = computed<Product[]>(() => {
    if (this.selectedCategory() === 'ALL' && this.productsFilter() =='') {
      return this.allProducts();
    }else if(this.productsFilter() != '' && this.selectedCategory() === 'ALL' ){
      return this.filterAllProducts(this.productsFilter());
    }

    return this.filterLetters(this.productsFilter());
  })

  //isAmountOk = computed(() => this.amount() > 0);
  totalPrice = computed(() => this.selectedProduct() ? this.amount() * this.price() :0 );

  categories = computed(() => {
    const products = this.allProducts();
    const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
    console.log(uniqueCategories);

    return ['ALL', ...uniqueCategories];
  });

  allCategories = computed(() => {
    const uniqueCategories: string[] = [];
    this.allProducts().forEach((product) => {
      const category = product.category;
      if (!uniqueCategories.includes(category)) {
        uniqueCategories.push(category);
      }
    });
    console.log('Category' +uniqueCategories);
    return uniqueCategories;
  });
  constructor(httpClient: HttpClient, public userService: UserServiceService,public datePipe: DatePipe) {
    httpClient.get<Product[]>('./assets/products.json').subscribe((products) => {
      this.allProducts.set(products); // Set the value of allUsers signal
      console.log('Fetched Products:', products.map((x) => x.name));
    });
    effect(() => console.log(this.selectedCategory()));
    effect(() => console.log(this.productsFilter()));
    effect(() => console.log(this.filteredProducts()));
    effect(() => console.log(this.amount()));
    effect(()=> console.log('Total price'+this.totalPrice()));
  }

  setCategory(category: string) {
    console.log(category);
    this.selectedCategory.set(category);

  }

  filterLetters(value: string):Product[] {
    console.log(value);
    //this.productsFilter.set(value);

    console.log(this.productsFilter());
    const filtered = this.allProducts();

    const filteredOfCategory = filtered.filter(category => this.selectedCategory() === category.category);
    console.log(filteredOfCategory);

    return this.extracted(filteredOfCategory, value);

  }

  filterAllProducts(value: string) {
    const filtered = this.allProducts();

    return this.extracted(filtered, value);
  }

  private extracted(filtered: Product[], value: string) {
    const filteredProducts = Array.from(new Set(filtered.filter(product => this.productsFilter() === '' || product.name.replace(' ', '').toLowerCase().includes(value.toLowerCase()))));
    console.log(filteredProducts);
    return filteredProducts;
  }

  setProduct(value: string) {
    console.log(value);
    const products = this.allProducts();
    if (!!products) {
      const product = products.find((x) => x.name === value);
      // @ts-ignore
      console.log(product);
      //@ts-ignore
      this.selectedProduct.set(product);
      //@ts-ignore
      this.stock.set(product.stock);
      // @ts-ignore
      this.price.set(product.price);
    }

    console.log('Selected product ' + this.selectedProduct());
  }


  addNewDelivery(show: boolean) {
    const existingData = localStorage.getItem('deliveryList');

    const deliveryList = existingData ? JSON.parse(existingData) : [];

    if (show){
      const newDelivery = {
        id: this.selectedProduct().id,
        name: this.selectedProduct().name,
        amount: this.amount(),
        user: this.userService.currentUser()?.name,
        date: <string>this.datePipe.transform(new Date().getTime(), 'dd.MM.yyyy HH:mm:ss'),
        price: this.totalPrice(),
        role: this.userService.currentUser()?.role,
      };

      deliveryList.push(newDelivery);

      const updatedData = JSON.stringify(deliveryList);

      localStorage.setItem('deliveryList', updatedData);
    }


    this.allDeliveries.set(deliveryList);

    console.log(this.allDeliveries());

  }

  filteredDelivery = computed(()=>{
    const allDeliveriesFiltered = this.allDeliveries();
    console.log(allDeliveriesFiltered);
    if (this.userService.currentUser()?.role == 'Admin'){
      console.log('userIs Admin');
      return allDeliveriesFiltered;
    }else

    return allDeliveriesFiltered.filter(x=> x.user == <string>this.userService.currentUser()?.name);
  })


}
