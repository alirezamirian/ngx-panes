export interface DocItemBase {
  type?: string;
  identifier: string;
  description: string;
  fileName: string;

  [key: string]: any;
}

export interface DirectiveDocItem extends DocItemBase {
  type: 'directive';
  isComponent: boolean;
}
