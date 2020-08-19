import {ExcelComponent} from './../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize} from './table.functions';
export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }
  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    // 1-  способ
    // console.log('mousedown', event.target.getAttribute('data-resize'));
    // 2-й способ
    // console.log('mousedown', event.target.dataset);
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
