## ngx-panes
- [ ] Add support for animating panes on close
- [x] Add support for pane reordering
- [x] Add support for custom pane label
- [x] Implement 'top' and 'bottom' alignment modes
- [ ] shortcut support (Alt+1, Alt+2, etc.)

# Active TODO list:
## high priority
- [x] Fix and test align options
- [x] Remove ngx-panes
- [x] Update docs
- [x] Decide for ngx-pane group being a component or directive
- [x] Update demos to use new pane-area, or ngx-pane-group if it end up being an stand alone component
- [x] fix ngx-pane-area-content s
- [ ] Resolve theming issues (also add theming for pane-area. its content)
- [ ] Add support for scrollbar customization in theme. Use a cool scrollbar like Jetbrain's by default
- [ ] Clean up styles
- [ ] Decide for height of ngx-pane-area
- [ ] Provide necessary outputs (like widthChange for pane and so on), and add outputs to api doc pages

## Low priority
- [x] Add option for pane reordering
- [x] Add support for cross pane-group pane reordering inside a pane-area
- [x] Add support for passing state as an input
- [ ] Warn user of missing ids
- [x] Add support for custom state management services
- [x] Add support for NoHistory directive (which provides a noop paneAreaStateManager)

## Least priority
- [ ] Explore onPush change detection possibility

