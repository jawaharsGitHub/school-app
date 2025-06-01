import { Injectable } from '@angular/core';
import { Remult } from 'remult';

@Injectable({
  providedIn: 'root'
})
export class RemultService {
  public readonly remult = new Remult();

  constructor() {
    // Optional: Configure Remult here if needed (e.g., for authentication)
    // this.remult.apiClient.baseURL = '/api'; // If not using proxy, specify full URL
  }
}