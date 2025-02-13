import { marked } from 'marked';
import definitionLists from '../src/index.js';

function trimLines(s) {
  return s.split('\n').map(l => l.trim()).join('\n');
}

describe('Single Line Definition Lists', () => {
  test('Single Definition Term', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('My term :: My First Definition\n\n'))).toMatchSnapshot();
  });

  test('Multiple Definition Terms', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1::Definition of Term 1\nTerm 2::Definition of Term 2\n\n'))).toMatchSnapshot();
  });
});

describe('Multiline Definition Lists', () => {
  test('Single Term, Single Definition', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1\n::Definition 1\n\n'))).toMatchSnapshot();
  });

  test('Single Term, Plural Definitions', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1\n::Definition 1\n::Definition 2\n\n'))).toMatchSnapshot();
  });

  test('Multiple Term, Single Definitions', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1\n::Definition 1\n\nTerm 2\n::Definition 1\n\n'))).toMatchSnapshot();
  });

  test('Multiple Term, Plural Definitions', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1\n::Definition 1\n::Definition 2\n\nTerm 2\n::Definition 1\n::Definition 2\n\n'))).toMatchSnapshot();
  });

  test('Single Term, Single multi-line definition', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1\n::Definition 1\nand more and\nmore and more\n\n'))).toMatchSnapshot();
  });

  test('Single Term, Plural multi-line definitions', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1\n::Definition 1\nand more and more\n::Definition 2\nand more\nand more\n::Definition 3\n\n'))).toMatchSnapshot();
  });

  test('Multiple Term, Single multi-line definition', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1\n::Definition 1\nand more and more\n\nTerm 2\n::Definition 1\n::Definition 2\n\n'))).toMatchSnapshot();
  });

  test('Multiple Term, Single multi-line definition, followed by an inline dl', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1\n::Definition 1\nand more and more\n\nTerm 2\n::Definition 1\n::Definition 2\n\n::Inline Definition (no term)'))).toMatchSnapshot();
  });

  test('Multiple Term, Single multi-line definition, followed by paragraph', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1\n::Definition 1\nand more and more\n\nTerm 2\n::Definition 1\n::Definition 2\n\nParagraph'))).toMatchSnapshot();
  });

  test('Block Token cannot be the Term of a multi-line definition', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('## Header\n::Definition 1 of a single-line DL\n::Definition 1 of another single-line DL'))).toMatchSnapshot();
  });

  test('Inline DL has priority over Multiline', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1 :: Inline definition 1\n:: Inline definition 2 (no DT)'))).toMatchSnapshot();
  });

  test('Multiline Definition Term must have at least one non-empty Definition', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1\n::'))).toMatchSnapshot();
  });

  test('Multiline Definition List must have at least one non-newline character after ::', function() {
    marked.use(definitionLists());
    expect(marked(trimLines('Term 1\n::\nDefinition 1\n\n'))).toMatchSnapshot();
  });
});
