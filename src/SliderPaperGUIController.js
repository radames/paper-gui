/*!
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
import AbstractPaperGUIController from './AbstractPaperGUIController';

export default class SliderPaperGUIController extends AbstractPaperGUIController {
  constructor(object, propertyName, opt_args) {
    // Supported optional arguments: minValue, maxValue.

    if (typeof object[propertyName] !== 'number') {
      throw new TypeError('Invalid property type, expecting a number.');
    }
    super(object, propertyName, opt_args);
  }

  createElement_(object, propertyName, opt_args) {
    if (this.el_) {
      return;
    }
    this.el_ = document.createElement('div');
    this.labelEl_ = document.createElement('label');
    this.el_.appendChild(this.labelEl_);
    this.sliderEl_ = document.createElement('paper-slider');
    this.sliderEl_.editable = true;
    this.sliderEl_.addEventListener('change', evt => {
      object[propertyName] = evt.target.value;
      this.changeCallback_(evt.target.value);
    });
    // Set max and min prior to setting the value.
    if (typeof opt_args[2] == 'number') {
      this.min(opt_args[2]);
      if (typeof opt_args[3] == 'number') {
        this.max(opt_args[3]);
      }
    }
    this.sliderEl_.value = object[propertyName];

    this.el_.appendChild(this.sliderEl_);
  }

  name(label) {
    this.labelEl_.hidden = !label || label == '';
    this.labelEl_.innerHTML = label;
    return this;
  }

  max(num = 100) {
    if (typeof num == 'number') {
      this.sliderEl_.max = num;
    }
    return this;
  }

  min(num = 0) {
    if (typeof num == 'number') {
      this.sliderEl_.min = num;
    }
    return this;
  }

  step(num = 1) {
    if (typeof num == 'number') {
      this.sliderEl_.step = num;
    }
    return this;
  }
}
