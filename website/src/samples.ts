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
