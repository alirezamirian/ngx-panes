import '../../website/src/app/guide/guides/index';
import '../../website/src/app/demo/demo-components';
import {DemoMeta, demos} from '../../website/src/app/demo/demos/demos';
import {Guide, guides} from '../../website/src/app/guide/guides';
import {writeFileSync} from 'fs';
import {resolve} from 'path';
import {sortBy} from 'lodash';

const getOrder = item => item.order;

export const contents = {
  demos: sortBy<DemoMeta>(demos.map(demo => ({...demo.metadata, className: demo.component.name})), getOrder),
  guides: sortBy<Guide>(guides.map(guide => guide.metadata), getOrder)
};

const path = resolve('./website/src/assets/content.json');
writeFileSync(path, JSON.stringify(contents, null, 2), 'utf-8');
