import { runAllMarkedSpecTests } from '@markedjs/testutils';
import justifiedParagraphs from '../src/index.js';

runAllMarkedSpecTests({ addExtension: (marked) => { marked.use({ extensions: [justifiedParagraphs] }); }, outputCompletionTables: true });
