import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { UserType } from '@/application/models/user-type';
import './user_type_select.scss';

export interface UserTypeSelectProps {
  elementClass?: string;
}

export class UserTypeSelect extends Component {
  private checked: UserType = UserType.Applicant;
  constructor({ elementClass = '' }: UserTypeSelectProps) {
    super({ elementClass });
  }

  private setActive = (userType: UserType) => {
    this.checked = userType;
    vdom.updateNode(this.domNode, vdom.createElement('UserTypeSelect', this.props));
  };
  render() {
    return (
      <div className={`${this.props.elementClass} user-type-select `}>
        <div
          className={`user-type-select__applicant user-type-radiobutton ${this.checked === UserType.Applicant ? 'user-type-radiobutton_checked' : ''}`}
          onClick={() => this.setActive(UserType.Applicant)}
        >
          <input
            type="radio"
            className="user-type-radiobutton__input"
            id={UserType.Applicant}
            name="userType"
            value={UserType.Applicant}
            checked={this.checked === UserType.Applicant}
            required
          />
          <label for={UserType.Applicant} className="user-type-radiobutton__label">
            Соискатель
          </label>
        </div>
        <div
          className={`user-type-select__employer user-type-radiobutton ${this.checked === UserType.Employer ? 'user-type-radiobutton_checked' : ''}`}
          onClick={() => this.setActive(UserType.Employer)}
        >
          <input
            type="radio"
            className="user-type-radiobutton__input"
            id={UserType.Employer}
            name="userType"
            value={UserType.Employer}
            checked={this.checked === UserType.Employer}
            required
          />
          <label for={UserType.Employer} className="user-type-radiobutton__label">
            Работодатель
          </label>
        </div>
      </div>
    );
  }
}
