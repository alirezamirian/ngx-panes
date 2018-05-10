import {PaneGroupComponent} from '../pane-group/pane-group.component';
import {Subscription} from 'rxjs/Subscription';

/**
 * @private
 */
export interface Side {
  paneGroup: PaneGroupComponent;
  subscriptions?: Subscription[];
}

/**
 * Represents position of {@link PaneComponent pane} inside a {@link PaneAreaComponent paneArea}.
 * Used in {@link PanePositions}.
 * @experimental
 */
export interface PanePosition {
  /**
   * Id of the {@link PaneGroupComponent paneGroup} this pane should be placed into.
   */
  groupId: string;
  /**
   * Position (index) of the pane inside the parent {@link PaneGroupComponent paneGroup}
   */
  index: number;
}


/**
 * A dictionary from {@link PaneComponent pane} component ids to {@link PanePosition} objects.
 * Used to represent position of panes inside {@link PaneAreaComponent pane area}, for overriding default
 * positioning based on template. An object of this type can be passed to {@link PaneAreaComponent pane area}
 * as {@link PaneAreaComponent#panePositions input} or via {@link PaneAreaStateManager}.
 *
 * Used in {@link PaneAreaState}
 * @experimental
 */
export interface PanePositions {
  [id: string]: PanePosition;
}

/**
 * An object for holding state of pane area. it's currently limited to position of panes
 */
export interface PaneAreaState {
  panePositions: PanePositions;
}
