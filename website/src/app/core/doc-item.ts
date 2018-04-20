export interface DocItemBase {
  type?: string;
  identifier: string;
  fqn?: string;
  description: string;
  fileName: string;

  [key: string]: any;
}

export interface DirectiveDocItem extends DocItemBase {
  type: 'directive';
  isComponent: boolean;
}
