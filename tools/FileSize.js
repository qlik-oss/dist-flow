/* eslint class-methods-use-this: 0 */

class FileSize {
  apply(compiler) {
    compiler.hooks.done.tap('Stats', (stats) => {
      const { assets } = stats.toJson();
      const rows = assets.map((a) => ({ filename: a.name, size: `${(a.size / 1024).toFixed(1)} KB` }));
      const longest = rows.reduce((prev, curr) => Math.max(curr.filename.length, prev), 0);
      console.log(' ');
      console.log(`${'Asset'.padStart(longest)}  Size`);
      console.log(`${''.padStart(longest + 12, '-')}`);
      rows.forEach((row) => {
        console.log(`\x1b[1m\x1b[33m${row.filename.padStart(longest)}  ${row.size}\x1b[0m`);
      });
      console.log(`${''.padStart(longest + 12, '-')}`);
      console.log(' ');
    });
  }
}

module.exports = FileSize;
