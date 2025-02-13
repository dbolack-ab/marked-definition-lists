export default function() {
  return {
    extensions: [
      {
        name  : 'definitionListsSingleLine',
        level : 'block',
        start(src) { return src.match(/\n[^\n]*?::[^\n]*/m)?.index; }, // Hint to Marked.js to stop and check for a match
        tokenizer(src, tokens) {
          const regex = /^([^\n]*?)::([^\n]*)(?:\n|$)/ym;
          let match;
          let endIndex = 0;
          const definitions = [];
          while (match = regex.exec(src)) {
            const originalLine = match[0];											// This line and below to handle conflict with emojis
            let firstLine = originalLine;											// Remove in V4 when definitionListsInline updated to
            this.lexer.inlineTokens(firstLine.trim())					// require spaces around `::`
              .filter((t)=>t.type == 'emoji')
              .map((emoji)=>firstLine = firstLine.replace(emoji.raw, 'x'.repeat(emoji.raw.length)));
      
            const newMatch = /^([^\n]*?)::([^\n]*)(?:\n|$)/ym.exec(firstLine);
            if(newMatch) {
              definitions.push({
                dt : this.lexer.inlineTokens(originalLine.slice(0, newMatch[1].length).trim()),
                dd : this.lexer.inlineTokens(originalLine.slice(newMatch[1].length + 2).trim())
              });
            }																									// End of emoji hack.
            endIndex = regex.lastIndex;
          }
          if(definitions.length) {
            return {
              type : 'definitionListsSingleLine',
              raw  : src.slice(0, endIndex),
              definitions
            };
          }
        },
        renderer(token) {
          return `<dl>${token.definitions.reduce((html, def)=>{
            return `${html}<dt>${this.parser.parseInline(def.dt)}</dt>`
                        + `<dd>${this.parser.parseInline(def.dd)}</dd>\n`;
          }, '')}</dl>`;
        }
      },
      {
        name  : 'definitionListsMultiLine',
        level : 'block',
        start(src) { return src.match(/\n[^\n]*\n::[^:\n]/m)?.index; },  // Hint to Marked.js to stop and check for a match
        tokenizer(src, tokens) {
          const regex = /(\n?\n?(?!::)[^\n]+?(?=\n::[^:\n]))|\n::([^:\n](?:.|\n)*?(?=(?:\n::)|(?:\n\n)|$))/y;
          let match;
          let endIndex = 0;
          const definitions = [];
          while (match = regex.exec(src)) {
            if(match[1]) {
              if(this.lexer.blockTokens(match[1].trim())[0]?.type !== 'paragraph') // DT must not be another block-level token besides <p>
                break;
              definitions.push({
                dt  : this.lexer.inlineTokens(match[1].trim()),
                dds : []
              });
            }
            if(match[2] && definitions.length) {
              definitions[definitions.length - 1].dds.push(
                this.lexer.inlineTokens(match[2].trim().replace(/\s/g, ' '))
              );
            }
            endIndex = regex.lastIndex;
          }
          if(definitions.length) {
            return {
              type : 'definitionListsMultiLine',
              raw  : src.slice(0, endIndex),
              definitions
            };
          }
        },
        renderer(token) {
          let returnVal = `<dl>`;
          token.definitions.forEach((def)=>{
            const dds = def.dds.map((s)=>{
              return `\n<dd>${this.parser.parseInline(s).trim()}</dd>`;
            }).join('');
            returnVal += `<dt>${this.parser.parseInline(def.dt)}</dt>${dds}\n`;
          });
          returnVal = returnVal.trim();
          return `${returnVal}</dl>`;
        }
      }
    ]
  };
}
