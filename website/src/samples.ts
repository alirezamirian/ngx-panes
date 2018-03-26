export const themeMixinBasicUsage = `@import '~ngx-panes/theming.scss';

// The most important options are primaryColor and backgroundColor. 
// Default values for other option will probably work well.
$options: (
  primaryColor: #d2d123,
  backgroundColor: #fafafa
);

@include ngx-panes-theme($options);`;
