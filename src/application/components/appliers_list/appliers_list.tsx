import './appliers_list.scss';
import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { Applicant } from '@/application/models/applicant';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';

export interface AppliersListProps {
  elementClass: string;
  appliers: Applicant[];
}

export class AppliersList extends Component {
  constructor({ elementClass, appliers = [] }: AppliersListProps) {
    super({ elementClass, appliers });
  }
  render() {
    const appliersList = (this.props.appliers as Applicant[]).map((applier) => {
      return (
        <li key={applier.id}>
          <a
            key={applier.id}
            className="appliers-list__list-item"
            href={`${resolveUrl('profile', null)}?id=${applier.id}&userType=applicant`}
          >
            {`${applier.firstName} ${applier.secondName}`}
          </a>
        </li>
      );
    });
    return (
      <div className={`${this.props.elementClass} appliers-list`}>
        <h1 className="appliers-list__header">Откликнулись</h1>
        <div className="appliers-list__divider"></div>
        <ol className="appliers-list__list">{...appliersList}</ol>
      </div>
    );
  }
}
