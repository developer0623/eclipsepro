import { Api } from './api';
import { HttpClient } from '@angular/common/http';

describe('Api', () => {
   const api = new Api(new HttpClient(null));

   it('should be able to successfully reach all these api endpoints', () => {
      expect(api).toBeTruthy();
      api.getAlerts().subscribe(console.table);
   });

});
