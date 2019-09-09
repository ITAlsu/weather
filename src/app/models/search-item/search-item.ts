import { ISearchItem } from './isearch-item';

export class SearchItem implements ISearchItem{
   id: number;
   city: string;
   days: number;

   constructor(id: number, city: string, days: number){
      this.id = id;
      this.days = days;
      this.city = city;
   }
}

