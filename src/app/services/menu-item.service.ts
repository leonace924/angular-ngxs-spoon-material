import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  apiUrl: string = 'https://stg-api.rockspoon.io';
  options: any = {
    headers: {
      key: '56e379ffa58d2ac1a854abd75b2d76e5ff401a98642c55b01b1a9c194f1d79fcee11d4f8c5f40e86f806fc2d2b488cd015399991884f5c3e34e1a3ff69c8742baca8e94d931a390e4884db2d78a7a368ceb01236c1f0c14f24803c14ca5602b0'
    }
  }

  constructor(private http: HttpClient) { }

  fetchMenuItems(page, limit = 10, terms, tags, sortKey, isAscending) {
    return this.http.post<any>(`${this.apiUrl}/search/v2/composed`, {
      entity: "item",
      page: page,
      size: limit,
      params: {
        term: terms,
        tags: tags,
        returnConditions: {
          sorting: {
            field: sortKey,
            ascendingOrder: isAscending
          },
        }
      }
    }, this.options);
  }

  getItemDetail(itemId) {
    return this.http.get<any>(`${this.apiUrl}/catalog/consumer/item/${itemId}`, this.options);
  }
}
