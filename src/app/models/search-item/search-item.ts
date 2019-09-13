import { ISearchItem } from './isearch-item';

export class SearchItem implements ISearchItem {
  id: number;
  city: string;
  days: number;
  periodLabel: string;

  constructor(id: number, city: string, days: number) {
    this.id = id;
    this.days = days;
    this.city = city;
    this.periodLabel = this.getPeriodLabel(days);
  }

  getPeriodLabel(days: number): string {
    return (days === 1) ? 'today' : days + ' days';
  }

}
