import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Language } from '../../services/language';

interface PortfolioItem {
  id: number;
  category: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
  alt: string;
}

@Component({
  selector: 'adp-portfolio',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './portfolio.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portfolio {
  protected readonly lang = inject(Language);

  protected readonly activeFilter = signal('all');

  protected readonly categories = [
    { id: 'all', labelKey: 'portfolio.filters.all' },
    { id: 'weddings', labelKey: 'portfolio.filters.weddings' },
    { id: 'portraits', labelKey: 'portfolio.filters.portraits' },
    { id: 'events', labelKey: 'portfolio.filters.events' },
    { id: 'family', labelKey: 'portfolio.filters.family' },
  ] as const;

  private readonly items: PortfolioItem[] = [
    {
      id: 1,
      category: 'weddings',
      image: '/images/portfolio-wedding.jpg',
      titleKey: 'portfolio.items.wedding.title',
      descriptionKey: 'portfolio.items.wedding.description',
      alt: 'Beautiful wedding portrait with bride and groom in romantic lighting',
    },
    {
      id: 2,
      category: 'portraits',
      image: '/images/portfolio-portrait.jpg',
      titleKey: 'portfolio.items.portrait.title',
      descriptionKey: 'portfolio.items.portrait.description',
      alt: 'Professional business portrait with studio lighting',
    },
    {
      id: 3,
      category: 'events',
      image: '/images/portfolio-event.jpg',
      titleKey: 'portfolio.items.event.title',
      descriptionKey: 'portfolio.items.event.description',
      alt: 'Corporate event photography with dynamic lighting',
    },
    {
      id: 4,
      category: 'family',
      image: '/images/portfolio-family.jpg',
      titleKey: 'portfolio.items.family.title',
      descriptionKey: 'portfolio.items.family.description',
      alt: 'Happy family portrait outdoors with natural lighting',
    },
  ];

  protected readonly filteredItems = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all' ? this.items : this.items.filter((item) => item.category === filter);
  });

  protected setFilter(categoryId: string): void {
    this.activeFilter.set(categoryId);
  }
}
