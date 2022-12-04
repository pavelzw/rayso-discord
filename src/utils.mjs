import {
  CardTheme,
  CardPadding,
  CardProgrammingLanguage,
} from 'rayso-api';

const lookup = (key, map) => {
  const value = map[key.toLowerCase()];

  if (value === undefined) {
    console.log(typeof(key));
    throw new Error(`Invalid value: ${key}`);
  }
  return value;
};

const booleanMap = {
  'false': false,
  'no': false,
  '0': false,
  'true': true,
  'yes': true,
  '1': true
};

const cardThemeMap = {
  'breeze': CardTheme.BREEZE,
  'candy': CardTheme.CANDY,
  'crimson': CardTheme.CRIMSON,
  'falcon': CardTheme.FALCON,
  'meadow': CardTheme.MEADOW,
  'midnight': CardTheme.MIDNIGHT,
  'raindrop': CardTheme.RAINDROP,
  'sunset': CardTheme.SUNSET
}

const cardPaddingMap = {
  'small': CardPadding.sm,
  'sm': CardPadding.sm,
  '16': CardPadding.sm,
  'medium': CardPadding.md,
  'md': CardPadding.md,
  '32': CardPadding.md,
  'large': CardPadding.lg,
  'lg': CardPadding.lg,
  '64': CardPadding.lg,
  'xlarge': CardPadding.xl,
  'xl': CardPadding.xl,
  '128': CardPadding.xl
}

const cardProgrammingLanguageMap = {
  'auto': CardProgrammingLanguage.AUTO,
  'bash': CardProgrammingLanguage.BASH,
  'c++': CardProgrammingLanguage.CPP,
  'cpp': CardProgrammingLanguage.CPP,
  'csharp': CardProgrammingLanguage.CSHARP,
  'c#': CardProgrammingLanguage.CSHARP,
  'csh': CardProgrammingLanguage.CSHARP,
  'clojure': CardProgrammingLanguage.CLOJURE,
  'coffeescript': CardProgrammingLanguage.COFFEESCRIPT,
  'crystal': CardProgrammingLanguage.CRYSTAL,
  'css': CardProgrammingLanguage.CSS,
  'd': CardProgrammingLanguage.D,
  'dart': CardProgrammingLanguage.DART,
  'diff': CardProgrammingLanguage.DIFF,
  'dockerfile': CardProgrammingLanguage.DOCKER,
  'docker': CardProgrammingLanguage.DOCKER,
  'elm': CardProgrammingLanguage.ELM,
  'fortran': CardProgrammingLanguage.FORTRAN,
  'fsharp': CardProgrammingLanguage.FSHARP,
  'f#': CardProgrammingLanguage.FSHARP,
  'fsh': CardProgrammingLanguage.FSHARP,
  'gerkin': CardProgrammingLanguage.GERKIN,
  'go': CardProgrammingLanguage.GO,
  'groovy': CardProgrammingLanguage.GROOVY,
  'haskell': CardProgrammingLanguage.HASKELL,
  'html': CardProgrammingLanguage.HTML,
  'java': CardProgrammingLanguage.JAVA,
  'javascript': CardProgrammingLanguage.JS,
  'js': CardProgrammingLanguage.JS,
  'json': CardProgrammingLanguage.JSON,
  'jsx': CardProgrammingLanguage.JSX,
  'julia': CardProgrammingLanguage.JULIA,
  'kotlin': CardProgrammingLanguage.KOTLIN,
  'latex': CardProgrammingLanguage.LATEX,
  'lisp': CardProgrammingLanguage.LISP,
  'lua': CardProgrammingLanguage.LUA,
  'markdown': CardProgrammingLanguage.MARKDOWN,
  'mathematica': CardProgrammingLanguage.MATHEMATICA,
  'nginx': CardProgrammingLanguage.NGINX,
  'objectivec': CardProgrammingLanguage.OBJECTIVEC,
  'objective-c': CardProgrammingLanguage.OBJECTIVEC,
  'objective c': CardProgrammingLanguage.OBJECTIVEC,
  'ocaml': CardProgrammingLanguage.OCAML,
  'perl': CardProgrammingLanguage.PERL,
  'php': CardProgrammingLanguage.PHP,
  'powershell': CardProgrammingLanguage.POWERSHELL,
  'python': CardProgrammingLanguage.PYTHON,
  'r': CardProgrammingLanguage.R,
  'ruby': CardProgrammingLanguage.RUBY,
  'rust': CardProgrammingLanguage.RUST,
  'scala': CardProgrammingLanguage.SCALA,
  'scss': CardProgrammingLanguage.SCSS,
  'smalltalk': CardProgrammingLanguage.SMALLTALK,
  'sql': CardProgrammingLanguage.SQL,
  'swift': CardProgrammingLanguage.SWIFT,
  'typescript': CardProgrammingLanguage.TS,
  'ts': CardProgrammingLanguage.TS,
  'tsx': CardProgrammingLanguage.TSX,
  'twig': CardProgrammingLanguage.TWIG,
  'verliog': CardProgrammingLanguage.VERILOG,
  'vhdl': CardProgrammingLanguage.VHDL,
  'xquery': CardProgrammingLanguage.XQUERY,
  'yaml': CardProgrammingLanguage.YAML
}

export default {
  lookup: lookup,
  booleanMap: booleanMap,
  cardThemeMap: cardThemeMap,
  cardPaddingMap: cardPaddingMap,
  cardProgrammingLanguageMap: cardProgrammingLanguageMap
}
