import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_THEME_KEY = 'theme';
  private readonly STORAGE_THEME_VALUE_LILI = 'lili';
  private readonly STORAGE_THEME_VALUE_AZURE = 'azure';

  getTheme(): boolean {
    const storedTheme = localStorage.getItem(this.STORAGE_THEME_KEY);
    return storedTheme !== this.STORAGE_THEME_VALUE_AZURE;
  }

  storeTheme(isLiliTheme: boolean): void {
    localStorage.setItem(
      this.STORAGE_THEME_KEY,
      isLiliTheme ? this.STORAGE_THEME_VALUE_LILI : this.STORAGE_THEME_VALUE_AZURE
    );
  }
}

