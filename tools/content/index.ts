import '../../website/src/app/guide/guides/index';
import '../../website/src/app/demo/demo-components';
import {demos} from '../../website/src/app/demo/demos/demos';
import {guides} from '../../website/src/app/guide/guides';
import {writeFileSync} from 'fs';
import {resolve} from 'path';

export const contents = {
  demos: demos.map(demo => demo.metadata),
  guides: guides.map(guide => guide.metadata)
};

const path = resolve('./website/src/assets/content.json');
writeFileSync(path, JSON.stringify(contents, null, 2), 'utf-8');
