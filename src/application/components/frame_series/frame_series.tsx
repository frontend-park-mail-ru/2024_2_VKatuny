import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './frame_series.scss';
import { VirtualNodeSpec } from '@/modules/vdom/virtual_node';

export interface FrameSeriesProps {
  elementClass?: string;
  childrenLabels: Array<string>;
  activeFrameIndex: number;
  setActiveFrameIndex: (index: number) => void;
}

export class FrameSeries extends Component {
  constructor(
    { elementClass, childrenLabels, activeFrameIndex, setActiveFrameIndex }: FrameSeriesProps,
    children: Array<VirtualNodeSpec | string>,
  ) {
    super({ elementClass, childrenLabels, activeFrameIndex, setActiveFrameIndex }, children);
  }

  render() {
    const activeFrameIndex = this.props.activeFrameIndex ?? 0;
    const childrenLabels = this.props.childrenLabels as Array<string>;
    return (
      <div className={`${this.props.elementClass} frame-series`}>
        <nav className="frame-series__frame-selector frame-selector">
          {childrenLabels.map((frameCaption, index) => (
            <div
              className={`frame-series__frame-choice ${index === activeFrameIndex ? 'frame-choice_active' : ''} frame-choice`}
              onClick={() => {
                (this.props.setActiveFrameIndex as (index: number) => void)(index);
              }}
            >
              {frameCaption}
            </div>
          ))}
        </nav>
        <div className="frame-series__divider"></div>
        <div className="frame-series__frame-container frame-container">
          {this.children[this.props.activeFrameIndex as number]}
        </div>
      </div>
    );
  }
}
