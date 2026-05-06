import {Component, computed, inject, OnInit, Signal, signal} from '@angular/core';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  template: `
    <div
      class="container"
      [class.azure-mode]="!isLiliTheme()"
      [class.dark-mode]="isDarkMode()"
      [class.midway-point]="isMidwayPoint()"
      (click)="toggleTheme()"
    >
      <div class="node-container">
        @for (week of weeks(); track $index) {
          <div
            class="node"
            [class.node-passed]="week.isPassed"
            [class.node-anticipated]="!week.isPassed"
            [class.node-current-week]="week.isCurrentWeek"
          >
          </div>
        }
      </div>
    </div>
  `
})
export class App implements OnInit {
  private readonly themeService = inject(ThemeService);

  private readonly startDate = new Date(2025, 11, 19);
  private readonly endDate = new Date(2026, 9, 1);
  private readonly currentDate = new Date();

  protected isLiliTheme = signal(true);
  protected isDarkMode = signal(false);

  private totalWeeks: Signal<number> = computed(() =>
    this.getDifferenceInWeeks(this.startDate, this.endDate)
  );
  private totalWeeksPassed: Signal<number> = computed(() =>
    this.getDifferenceInWeeks(this.startDate, this.currentDate)
  );
  protected weeks: Signal<{ isPassed: boolean; isCurrentWeek: boolean; }[]> = computed(() => {
    const total = this.totalWeeks();
    const passed = this.totalWeeksPassed();

    return Array.from({length: total}).map((_, i) => ({
      isPassed: i < passed,
      isCurrentWeek: i === passed
    }));
  });
  protected isMidwayPoint: Signal<boolean> = computed(() => {
    const total = this.totalWeeks();
    const passed = this.totalWeeksPassed();

    return total / passed === 2;
  })

  ngOnInit(): void {
    this.isLiliTheme.set(this.themeService.getTheme());
    this.isDarkMode.set(this.getDarkModePreference());
  }

  protected toggleTheme(): void {
    const newTheme = !this.isLiliTheme();
    this.isLiliTheme.set(newTheme);
    this.themeService.storeTheme(newTheme);
  }

  private getDarkModePreference(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private getDifferenceInWeeks(startDate: Date, endDate: Date): number {
    return Math.floor(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
  }
}
