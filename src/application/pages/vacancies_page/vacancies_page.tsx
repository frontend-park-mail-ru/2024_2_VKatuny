import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { PageContainer } from '@/application/components/page_container/page_container';
import { ComplexSearch } from '@/application/components/complex_search/complex_search';
import './vacancies_page.scss';
import { AlertWindow } from '@/application/components/alert_window/alert_window';
import { userStore } from '@/application/stores/user_store/user_store';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import vacanciesPageOptions from '@/config/vacancy_search.json';
import { feedStore } from '@/application/stores/feed_store/feed_store';
import { throttle } from '@/modules/common_utils/decorators/decorators';
import { Vacancy } from '@/application/models/vacancy';
import { VacancyCard } from '@/application/components/vacancy_card/vacancy_card';
import { feedActionCreators } from '@/application/action_creators/feed_action_creators';
import { Loadable } from '@/application/stores/feed_store/feed_actions';
import { LoadingScreen } from '@/application/components/loading_screen/loading_screen';

export class VacanciesPage extends Component {
  private static FEED_LOAD_TIMEOUT = 1000; // ms
  private static AMOUNT_LOAD_PER_ONCE = 5;

  private searchBy: string = '';
  private searchCategory: string = '';
  private searchQuery: string = '';

  constructor({ url }: { url: URL }) {
    super({ url });
    this.fetchVacancies();
  }

  private handleScroll = throttle(() => {
    const feedData = feedStore.getData();
    if (feedData.loadedData === undefined) {
      return;
    }
    if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight) {
      feedActionCreators.loadMore({ whatToLoad: Loadable.Vacancies });
    }
  }, VacanciesPage.FEED_LOAD_TIMEOUT);

  didMount(): void {
    super.didMount();
    window.addEventListener('scroll', this.handleScroll as { (ev: Event): void });
  }

  willDestroy(): void {
    super.willDestroy();
    window.removeEventListener('scroll', this.handleScroll as { (ev: Event): void });
  }

  private fetchVacancies() {
    feedActionCreators.loadFeed({
      whatToLoad: Loadable.Vacancies,
      startFrom: 0,
      searchQuery: this.searchQuery,
      searchBy: this.searchBy,
      searchCategory: this.searchCategory,
      numToLoadAtOnce: VacanciesPage.AMOUNT_LOAD_PER_ONCE,
    });
  }

  private handleSubmitSearch(ev: SubmitEvent) {
    ev.preventDefault();
    const formData = Object.fromEntries(new FormData(ev.target as HTMLFormElement));
    this.searchBy = formData.searchBy as string;
    this.searchCategory = formData.searchCategory as string;
    this.searchQuery = formData.searchQuery as string;
    this.fetchVacancies();
  }

  getVacancyHeader(searchQuery: string, searchGroup: string) {
    if (!searchQuery) {
      if (searchGroup) {
        return `Вакансии в категории «${searchGroup}»`;
      }
      return `Вакансии на сегодня`;
    }
    if (searchGroup) {
      return `Вакансии по запросу «${searchQuery}» в категории «${searchGroup}»`;
    }
    return `Вакансии по запросу «${searchQuery}»`;
  }

  render() {
    const userData = userStore.getData();
    const feedData = feedStore.getData();
    if (!feedData.loadedData || feedData.contentType !== Loadable.Vacancies) {
      return (
        <PageContainer key="page-container" elementClass="vacancies-page__page-container">
          <LoadingScreen key="loading-screen" />
        </PageContainer>
      );
    }
    const vacancies = (feedData.loadedData as Vacancy[]) || [];
    const vacancyCards = vacancies.map((vacancy) => {
      return (
        <VacancyCard
          key={vacancy.id}
          elementClass="vacancies-page__vacancy-card"
          vacancy={vacancy}
        />
      );
    });
    return (
      <PageContainer key="page-container" elementClass="vacancies-page__page-container">
        <div key="vacancies-page" className="vacancies-page vacancies-page_theme-dark">
          <div className="vacancies-page__side-column">
            <ComplexSearch
              key="complex-search"
              elementClass="vacancies-page__complex-search"
              searchByOptions={[
                { value: '', label: 'Всему' },
                ...vacanciesPageOptions.searchByOptions,
              ]}
              searchCategoryOptions={[
                { value: '', label: 'Все' },
                ...vacanciesPageOptions.searchGroupOptions,
              ]}
              onSubmit={this.handleSubmitSearch.bind(this)}
              searchQuery={this.searchQuery}
              searchBy={this.searchBy}
              searchCategory={this.searchCategory}
            />
            {!userData.isLoggedIn && (
              <AlertWindow
                key="alert-window"
                elementClass="vacancies-page__alert-window"
                buttonText="Регистрация"
                href={resolveUrl('register', null)}
                text="Привет! Добро пожаловать на сайт для поиска работы для творческих специалистов uArt. Можете здесь осмотреться, но для полного функционала нужно зарегистрироваться"
              />
            )}
          </div>
          <div className="vacancies-page__content content-body content-body_theme-dark">
            <h1 className="content-body__header">
              {this.getVacancyHeader(this.searchQuery, this.searchCategory)}
            </h1>
            <div className="content-body__vacancy-container vacancy-container ruler ruler_theme-dark ruler_direction-vertical">
              {...vacancyCards}
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  private isInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const html = document.documentElement;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    );
  };
}
