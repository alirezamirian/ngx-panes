export const themeMixinBasicUsage = `@import '~ngx-panes/theming.scss';

// The most important options are primaryColor and backgroundColor. 
// Default values for other option will probably work well.
$options: (
  primaryColor: #d2d123,
  backgroundColor: #fafafa
);

@include ngx-panes-theme($options);`;

export const themeMixinMinimalUsage = `@import '~ngx-panes/theming.scss';
@include ngx-panes-theme();
`;

export const breBuildThemeUsage = `@import '~ngx-panes/themes/default.css';`;


export const themeFromMaterialTheme = `@import '~ngx-panes/theming.scss';
@include ngx-panes-theme(from-material-theme($your-angular-material-theme));`;

export const customStateManagerExample = `@Injectable()
export class CustomPaneAreaStateManager extends PaneAreaStateManager {
  constructor(private userPreferencesService: UserPreferencesService) {
    super();
  }

  /**
   * Given an instance of PaneAreaComponent, \`getSavedState\` is responsible for providing its last saved state.
   * It can return that state or a promise of that state.
   * @param {PaneAreaComponent} paneArea
   * @returns {Promise<PaneAreaState>}
   */
  getSavedState(paneArea: PaneAreaComponent): Promise<PaneAreaState> {
    return this.userPreferencesService.getPaneAreaState();
  }

  /**
   * Given the observable of state changes for an specific instance of PaneAreaComponent, 
   * \`trackChanges\` is responsible for persisting latest state.
   * @param {PaneAreaComponent} paneArea
   * @param {Observable<PaneAreaState>} state$
   */
  trackChanges(paneArea: PaneAreaComponent, state$: Observable<PaneAreaState>): void {
    state$.subscribe(state => {
      this.userPreferencesService.setPaneAreaState(state);
    });
  }
  
  clearHistory(paneArea: PaneAreaComponent): void {
    this.userPreferencesService.clearPaneAreaState();
  }
}`;
