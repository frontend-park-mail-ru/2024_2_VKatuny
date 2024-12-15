import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import geopositionIconSvg from '@static/img/geoposition-icon.svg';
import fallbackUserIconSvg from '@static/img/user-icon-80.svg';
import './profile_minicard.scss';

export interface ProfileMinicardProps {
  elementClass?: string;
  fullName: string;
  city?: string;
  contacts?: string;
}

export class ProfileMinicard extends Component {
  constructor({ elementClass = '', fullName, city, contacts }: ProfileMinicardProps) {
    super({ elementClass, fullName, city, contacts });
  }

  render() {
    return (
      <div className={`${this.props.elementClass} profile-minicard`}>
        <img
          className="profile-minicard__user-icon"
          src={this.props.avatar ?? fallbackUserIconSvg}
        />
        <div className="profile-minicard__user-name">{this.props.fullName}</div>
        <div className="profile-minicard__geoposition-container">
          <img className="profile-minicard__geoposition-icon" src={geopositionIconSvg} />
          <span className="profile-minicard__geoposition">{this.props.city && 'Неизвестно'}</span>
        </div>
        <div className="profile-minicard__contacts-container">
          <h3 className="profile-minicard__contacts-header">Контакты</h3>
          <div className="profile-minicard__contacts">{this.props.contacts && 'Не указаны'}</div>
        </div>
      </div>
    );
  }
}
