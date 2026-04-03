import {Component, signal, computed, inject, OnInit} from '@angular/core';
import {ThemeService} from './services/theme.service';

interface WeekNode {
  isPassed: boolean;
  isCurrentWeek: boolean;
}

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  template: `
    <div
      class="container"
      [class.azure-mode]="!isLiliTheme()"
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

  private totalWeeks = computed(() =>
    this.getDifferenceInWeeks(this.startDate, this.endDate)
  );
  private totalWeeksPassed = computed(() =>
    this.getDifferenceInWeeks(this.startDate, this.currentDate)
  );
  protected weeks = computed(() => {
    const total = this.totalWeeks();
    const passed = this.totalWeeksPassed();

    return Array.from({length: total}).map((_, i) => ({
      isPassed: i < passed,
      isCurrentWeek: i === passed
    }));
  });

  ngOnInit(): void {
    this.isLiliTheme.set(this.themeService.getTheme());
  }

  protected toggleTheme(): void {
    const newTheme = !this.isLiliTheme();
    this.isLiliTheme.set(newTheme);
    this.themeService.storeTheme(newTheme);
  }

  private getDifferenceInWeeks(startDate: Date, endDate: Date): number {
    return Math.floor(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
  }
}
