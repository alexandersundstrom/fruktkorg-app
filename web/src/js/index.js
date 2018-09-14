import '../sass/common.scss';
import '../sass/content.scss';
import '../sass/footer.scss';
import '../sass/glass.scss';
import '../sass/header.scss';
import '../sass/navigation.scss';
import '../sass/themes/standard.scss';

import { dom } from './main/transpiler';

import { forkster } from './main/test.jsx';

const foo = () => {
  console.log('bar');
};

foo();

document.getElementById('content-inner').appendChild(forkster());
