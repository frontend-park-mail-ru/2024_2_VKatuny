// import { Component } from '@/modules/vdom/virtual_node';
// import * as vdom from '@/modules/vdom/virtual_dom';
// import { vacancyActionCreators } from '@/application/action_creators/vacancy_action_creators';
// import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
// import { vacancyStore } from '@/application/stores/vacancy_store/vacancy_store';
// import { routerActionCreators } from '@/application/action_creators/router_action_creators';

// export enum VacancyEditPageParams {
//   Id = 'id',
// }

// export class VacancyEditPage extends Component {
//   private lastUrl: URL;
//   private failedToLoadVacancy: boolean = false;
//   private isCreatingVacancy: boolean = false;
//   private vacancyId?: number;
//   private invokedLoadingVacancy: boolean = false;

//   constructor({ url }: { url: URL }) {
//     super({ url });
//     this.parseUrl();
//     if (this.isCreatingVacancy) {
//       vacancyActionCreators.clearVacancy();
//     }
//   }

//   private parseUrl(): void {
//     const url = this.props.url as URL;
//     this.isCreatingVacancy = url.pathname === resolveUrl('createVacancy', null).pathname;
//     if (!this.isCreatingVacancy) {
//       if (this.lastUrl === url) {
//         return;
//       }
//       this.vacancyId = Number(url.searchParams.get(VacancyEditPageParams.Id));
//       if (!this.vacancyId) {
//         this.failedToLoadVacancy = true;
//         return;
//       }
//       const vacancyData = vacancyStore.getData();
//       const vacancySuccessfullyLoaded =
//         vacancyData.loadedVacancy &&
//         vacancyData.vacancy &&
//         vacancyData.vacancy.id === this.vacancyId;
//       if (!vacancySuccessfullyLoaded && !this.invokedLoadingVacancy) {
//         vacancyActionCreators.loadVacancy(this.vacancyId);
//         this.invokedLoadingVacancy = true;
//       } else {
//         if (this.invokedLoadingVacancy) {
//           this.failedToLoadVacancy = true;
//         }
//       }
//       this.lastUrl = url;
//     }
//   }

//   private handleSubmit = (ev: Event) => {
//     ev.preventDefault();
//     const formData = Object.fromEntries(new FormData(ev.target as HTMLFormElement));
//     if (this.isCreatingVacancy) {
//       vacancyActionCreators.createVacancy(formData).then(() => {
//         const vacancy = vacancyStore.getData().vacancy;
//         routerActionCreators.redirect(
//           resolveUrl('vacancy', { [VacancyEditPageParams.Id]: vacancy.id.toString() }),
//         );
//       });
//     } else {
//       vacancyActionCreators
//         .updateVacancy(this.vacancyId, formData)
//         .then(() =>
//           routerActionCreators.redirect(
//             resolveUrl('vacancy', { [VacancyEditPageParams.Id]: this.vacancyId.toString() }),
//           ),
//         );
//     }
//   };

//   handleFocusOut = (ev: Event) => {
//     const target = ev.target as HTMLInputElement;
//     const name = target.name;
//     const value = target.value;
//     vacancyActionCreators.submitVacancyFields({ [name]: value });
//   };
// }
