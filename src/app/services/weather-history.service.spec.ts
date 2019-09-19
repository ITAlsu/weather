import { WeatherHistoryService } from './weather-history.service';
import { SearchItem } from '@models/search-item/search-item';

describe('WeatherHistoryService', () => {
  let service: WeatherHistoryService;
  const testItem = new SearchItem(0, 'Test', 1000);

  beforeEach(() => { service = new WeatherHistoryService(); });

  it('should init items', () => {
    service.initSearchHistoryItems();
    expect(service.historyItems).toBeTruthy();
  });

  it('should set items', () => {
    service.historyItems = [testItem];
    service.setSearchHistoryItems();
    service.historyItems = null;
    service.initSearchHistoryItems();
    expect(service.historyItems).toBeTruthy();
  });

  it('should get items', () => {
    service.historyItems = [testItem];
    const items = service.getSearchHistoryItems();
    expect(items).toContain(testItem);
  });

  it('should add item', () => {
    service.historyItems = [];
    service.addSearchHistoryItem(testItem);
    expect(service.historyItems).toContain(testItem);
  });

  it('should delete locally item', () => {
    service.historyItems = [testItem];
    service.deleteLocally(0, 1000);
    expect(service.historyItems.length).toEqual(0);
  });

  it('should not delete locally item', () => {
    service.historyItems = [testItem];
    service.deleteLocally(0, 0);
    expect(service.historyItems.length).toBeGreaterThan(0);
  });

  it('should delete item', () => {
    service.historyItems = [testItem];
    service.addSearchHistoryItem(testItem);
    service.deleteSearchHistoryItem(0, 1000);
    expect(service.historyItems.length).toEqual(0);
  });

  it('should not delete item', () => {
    service.historyItems = [testItem];
    service.addSearchHistoryItem(testItem);
    service.deleteSearchHistoryItem(0, 1);
    expect(service.historyItems.length).toBeGreaterThan(0);
  });

});
