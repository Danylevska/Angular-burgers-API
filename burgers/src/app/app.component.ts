import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currency = "$";

/*чтобы работать с формами нужно в app.module.ts добавить модуль ReactiveFormsModule (также нужен его импорт), 
в app.components.ts добавили import { FormBuilder, FormGroup, Validators } from '@angular/forms';
также добавляем constructor(private fb: FormBuilder) {}
fb - переменная, которую дальше используем*/

// Создаем форму:
  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  });

  //Создаем переменную для получения данных с сервера
  productsData: any;
  
//Картинки тоже удаляются и будут приходить с бекенд

//   productsData = [
// {
//   image: "1.png",
//   title: "Burger chedder & bacon",
//   text: "Beef cutlet crispy, bun, tomato, Cheddar cheese, brisket, red onion, iceberg lettuce, mayonnaise, ketchup, cheese sauce",
//   price: 8,
//   basePrice: 8,
//   grams: 360

// },
// {
//   image: "2.png",
//   title: "BBQ with bacon and chicken",
//   text: "Brioche bun with sesame seeds, chicken cutlet, cheddar cheese, tomato, pickled cucumber, bacon, sauce BBQ",
//   price: 7,
//   basePrice: 7,
//   grams: 390

// },
// {
//   image: "3.png",
//   title: "Double beef burger",
//   text: "Two beef patties, cheddar cheese, romaine lettuce, pickled cucumbers, fresh tomato, bacon, red onion, burger sauce, mustard",
//   price: 10,
//   basePrice: 10,
//   grams: 420

// },
// {
//   image: "4.png",
//   title: "Bavarian burger",
//   text: "Burger bun, beef patty, red onion, cheese, hunting sausage, BBQ sauce, cheese sauce, iceberg lettuce",
//   price: 7,
//   basePrice: 7,
//   grams: 220

// },
// {
//   image: "5.png",
//   title: "Bacon cheeseburger",
//   text: "Burger bun, beef patty, brisket, tomato, pickled cucumber, cheese, cheese sauce, ketchup, greens",
//   price: 8,
//   basePrice: 8,
//   grams: 220

// },
// {
//   image: "6.png",
//   title: "Indiana burger",
//   text: "Burger bun, chicken cutlet, brisket, egg, pickled cucumber, crispy onions, ketchup, cheese sauce, mustard, greens",
//   price: 9,
//   basePrice: 9,
//   grams: 320

// },
// {
//   image: "7.png",
//   title: "Veggie burger",
//   text: "Burger bun, vegetarian patty, red onion, cheese, fresh tomato, barbecue sauce, cheese sauce, iceberg lettuce",
//   price: 8,
//   basePrice: 8,
//   grams: 280

// },
// {
//   image: "8.png",
//   title: "Weepy Joe",
//   text: "Burger bun, beef patty, brisket, tomato, pickled cucumber, red onion, cheese, jalapeno pepper, ketchup, greens",
//   price: 7,
//   basePrice: 7,
//   grams: 380

// },
// {
//   image: "9.png",
//   title: "Double cheese burger",
//   text: "Burger bun, two beef patties, double cheddar cheese, pickled cucumber, ketchup, cheese sauce, mustard, greens",
//   price: 11,
//   basePrice: 11,
//   grams: 400

// },
// {
//   image: "10.png",
//   title: "Freshburger",
//   text: "Burger bun, beef patty, bacon, cheddar cheese, egg, salami, bbq sauce, cheese sauce, iceberg lettuce, fresh tomato",
//   price: 9,
//   basePrice: 9,
//   grams: 300

// },
// {
//   image: "11.png",
//   title: "Zucchini burger",
//   text: "Burger bun, vegetarian cutlet from chickpeas, grilled zucchini, tomato, cheese, mustard sauce, ketchup, greens",
//   price: 8,
//   basePrice: 8,
//   grams: 320

// },
// {
//   image: "12.png",
//   title: "Double cheddar burger",
//   text: "Burger bun, beef cutlet, brisket, red onion, pickled cucumber, tomato, ketchup, double cheddar cheese, mustard, greens",
//   price: 9,
//   basePrice: 9,
//   grams: 360

// },
//   ];

constructor(private fb: FormBuilder, private appService: AppService) {

}

//Функция для получения данных с сервера

ngOnInit() {
  this.appService.getData().subscribe(data => this.productsData = data)
}



  scrollTo(target: HTMLElement, burger?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (burger) {
      this.form.patchValue({order: burger.title + ' (' + burger.price + ' ' + this.currency + ')'});
    }
  }

  // this.form.valid - проверка формы на валидность средствами ангулар
  // this.form.reset(); - очистить поля в форме средствами ангулар
confirmOrder() {
  if (this.form.valid) {
this.appService.sendOrder(this.form.value)
.subscribe(
  {
    next: (response: any) => {
      alert(response.message);
      this.form.reset();
    },
    error: (response) => {
alert(response.error.message)
    },
  }
);

    
  }
}

changeCurrency() {

  let newCurrency = "$";
  let coefficient = 1;
  
  if (this.currency === '$') {
      newCurrency = '£';
      coefficient = 0.7;
  } 
      if (this.currency === '£') {
          newCurrency = 'BIN';
      coefficient = 15;
      } 
  
      if (this.currency === 'BIN') {
          newCurrency = '€';
      coefficient = 0.9;
      } 
  
      if (this.currency === '€') {
          newCurrency = '¥';
      coefficient = 6.9;
      } 
  
      this.currency = newCurrency;
  
 this.productsData.forEach((item:any) => {
  item.price = +(item.basePrice * coefficient).toFixed(1);
 })
  


}



}
