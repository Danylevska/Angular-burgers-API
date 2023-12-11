import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}

// Создали компонент app.service.ts (npx ng genetate service APP)
// В app.module.ts добавили HttpClientModule и его импорт import { HttpClientModule } from '@angular/common/http';
// Подключаем app.service.ts в конструктор компонента app.componrnts.ts (constructor(private fb: FormBuilder, private appService: AppService) )
    sendOrder(data: any) {
      return this.http.post('https://testologia.site/burgers-order', data)
    }

    //Получение данных карточек с сервера
    // getData() {
    //   return this.http.get('https://testologia.site/burgers-data')
    // }

    getData() {
      return this.http.get('https://testologia.site/burgers-data?extra=black')
    }


   }

