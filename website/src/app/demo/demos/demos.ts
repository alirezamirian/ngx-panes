/**
 * Created by alireza on 5/26/17.
 */
import {Type} from '@angular/core';
import {Tag} from '../tag';
import {Ordered} from '../../core/core-types';


export interface Demo extends Ordered {
  /**
   * Defines an identifier to be used by router to the demo at /demos/{id}
   */
  id: string;
  /**
   * Defines an string to be used as the title of the demo (in demo list page)
   */
  title: string;
  /**
   * Defines an additional piece of information to be shown as a description for demo
   */
  description?: string;

  /**
   * Defines a set of tags associated with the demo
   */
  tags?: Array<Tag>;

  defaultPath?: string;
}

export interface DemoMeta extends Demo {
  className: string;
}

export class DemoModel {
  get metadata(): DemoMeta {
    return this._metadata;
  }

  get component(): Type<{}> {
    return this._component;
  }

  constructor(private _component: Type<{}>, private _metadata: DemoMeta) {
  }
}

class DuplicateDemoError extends Error {
}

export const demos: Array<DemoModel> = [];

// TODO: is there a way to prevent application of @Demo to non-component classes?
export function Demo(demo: Demo) {
  return function (demoComponent: Type<{}>) {
    if (demos.find(aDemo => aDemo.metadata.id === demo.id)) {
      throw new DuplicateDemoError(`A demo with id ${demo.id} is already declared`);
    }
    demos.push(new DemoModel(demoComponent, {...demo, className: null}));
  };
}

