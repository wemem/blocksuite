import { createUniComponentFromWebComponent } from '../../../components/uni-component/uni-component.js';
import { CheckboxCell } from '../../table/components/column-type/checkbox.js';
import {
  DateCell,
  DateCellEditing,
} from '../../table/components/column-type/date.js';
import {
  LinkCell,
  LinkCellEditing,
} from '../../table/components/column-type/link.js';
import {
  MultiSelectCell,
  MultiSelectCellEditing,
} from '../../table/components/column-type/multi-select.js';
import {
  NumberCell,
  NumberCellEditing,
} from '../../table/components/column-type/number.js';
import {
  ProgressCell,
  ProgressCellEditing,
} from '../../table/components/column-type/progress.js';
import {
  RichTextCell,
  RichTextCellEditing,
} from '../../table/components/column-type/rich-text.js';
import {
  SelectCell,
  SelectCellEditing,
} from '../../table/components/column-type/select.js';
import {
  TextCell,
  TextCellEditing,
} from '../../table/components/column-type/text.js';
import { TitleCell } from '../../table/components/column-type/title.js';
import {
  checkboxHelper,
  dateHelper,
  linkHelper,
  multiSelectHelper,
  numberHelper,
  progressHelper,
  richTextHelper,
  selectHelper,
  textHelper,
  titleHelper,
} from './define.js';
import type { CellRenderer } from './manager.js';

export interface Renderer<
  Data extends NonNullable<unknown> = NonNullable<unknown>,
  Value = unknown
> {
  type: string;
  cellRenderer: CellRenderer<Data, Value>;
}

export class ColumnRendererHelper {
  private _columns = new Map<string, Renderer>();

  register(renderer: Renderer) {
    const columns = this._columns;
    if (columns.has(renderer.type)) {
      throw new Error('cannot register twice for ' + renderer.type);
    }
    columns.set(renderer.type, renderer);
  }

  get(type: Renderer['type']): Renderer {
    const renderer = this._columns.get(type);
    if (!renderer) {
      throw new Error('cannot find renderer');
    }
    return renderer;
  }

  list(): Renderer[] {
    return [...this._columns.values()];
  }
}

export const columnRenderer = new ColumnRendererHelper();

columnRenderer.register({
  type: titleHelper.type,
  cellRenderer: {
    view: createUniComponentFromWebComponent(TitleCell),
  },
});
columnRenderer.register({
  type: richTextHelper.type,
  cellRenderer: {
    view: createUniComponentFromWebComponent(RichTextCell),
    edit: createUniComponentFromWebComponent(RichTextCellEditing),
  },
});
columnRenderer.register({
  type: selectHelper.type,
  cellRenderer: {
    view: createUniComponentFromWebComponent(SelectCell),
    edit: createUniComponentFromWebComponent(SelectCellEditing),
  },
});
columnRenderer.register({
  type: multiSelectHelper.type,
  cellRenderer: {
    view: createUniComponentFromWebComponent(MultiSelectCell),
    edit: createUniComponentFromWebComponent(MultiSelectCellEditing),
  },
});
columnRenderer.register({
  type: numberHelper.type,
  cellRenderer: {
    view: createUniComponentFromWebComponent(NumberCell),
    edit: createUniComponentFromWebComponent(NumberCellEditing),
  },
});
columnRenderer.register({
  type: checkboxHelper.type,
  cellRenderer: {
    view: createUniComponentFromWebComponent(CheckboxCell),
  },
});
columnRenderer.register({
  type: progressHelper.type,
  cellRenderer: {
    view: createUniComponentFromWebComponent(ProgressCell),
    edit: createUniComponentFromWebComponent(ProgressCellEditing),
  },
});
columnRenderer.register({
  type: linkHelper.type,
  cellRenderer: {
    view: createUniComponentFromWebComponent(LinkCell),
    edit: createUniComponentFromWebComponent(LinkCellEditing),
  },
});

columnRenderer.register({
  type: textHelper.type,
  cellRenderer: {
    view: createUniComponentFromWebComponent(TextCell),
    edit: createUniComponentFromWebComponent(TextCellEditing),
  },
});

columnRenderer.register({
  type: dateHelper.type,
  cellRenderer: {
    view: createUniComponentFromWebComponent(DateCell),
    edit: createUniComponentFromWebComponent(DateCellEditing),
  },
});