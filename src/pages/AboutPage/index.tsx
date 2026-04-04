import Markdown from "react-markdown";

export default () => {
  return (
    <div className="flex-1 flex flex-col items-center">
      <article className="prose text-secondary-foreground">
        <Markdown>
          {`
# About

## What is Gnohznew?

Gnohznew is an artificial language built upon [mandarin Chinese](https://en.wikipedia.org/wiki/Mandarin_Chinese) and [pinyin](https://en.wikipedia.org/wiki/Pinyin). It can be translated from Chinese by spelling the Chinese characters' pinyins backwards.

A Chinese character can be mapped to one or many pinyin syllables. Given proper context, for example, when placed in a sentence, a chinese character can be uniquelly mapped to one pinyin syllables. Spell the syllables backwards for each character in a Chinese sentence and you get Gnohznew.

\`\`\`javascript
> '这是一句中文'
'这是一句中文'

> toPinyin('这是一句中文')
['zhè','shì','yí','jù','zhōng','wén']

> toPinyin('这是一句中文').map(s => s.split('').reverse().join(''))
['èhz', 'ìhs', 'íy', 'ùj', 'gnōhz', 'néw']

> _.join('')
'èhzìhsíyùjgnōhznéw'
\`\`\`

Gnohznew is __*open*__. Which is to say, it has only a minimum set of rules, including the one foundational rule defined above. How it is to be written or spoken is open to your choice. However, for the purpose of seamless communication with others, a small set of conventions are recommended to follow.

## Writing

For the sake of convenience, tonal symbols are often ommitted, as tones can be largely implied by the context.

For better readability, words are separated with spaces as is often done in alphabetic languages' writing systems.

## Speaking

Though spelled backwards, it is recommended to preserve the tones of the syllables while speaking, in order to achive better understandability.

There is no fixed pronunciation rule for Gnohznew. Often times, speakers would adopted rules from other languages. These different pronunciations of Gnohznew are referred to as __*dialects*__. Below is an example from Leslie, one of the founders of Gnohznew.

> ### Gnohznew 的发音规则
>
> 1. **“Gn”读作鼻浊音**
>
> 当词首出现 “Gn” 时，读作一种带鼻音的浊辅音。
> 它不是把 g 和 n 完全分开来读，而是作为一个整体发音，听起来要连贯一些
>
> 2. **“x”读作“ks”**
>
> 字母 “x” 在 Gnohznew 中一般读作 “ks”。
> 也就是说，看到 x 时，可以按照英文 “x” 常见的读法来处理。
>
> 3. **“q”读作“ch”**
>
> 字母 “q” 在 Gnohznew 中读作 “ch”。
> 因此它不按照汉语拼音里的 q 来念，而更接近英文或普通直觉中的 ch 音。
>
> 4. **“h”的读音根据位置变化**
>
> 字母 “h” 的发音需要看它所在的位置：
> ①当 h 位于词尾，或 h 后面接元音 时，正常发音；
> ②当 h 后面接辅音 时，h 不单独读出，而是变成一个轻微的停顿。
>
> 也就是说，这种情况下的 h 更像是用来断开音节、制造停顿感，而不是一个完整发音的辅音。
>
> 5. **某些特殊字母组合按英文习惯发音**
>
> 在一些特殊字母组合中，例如 “nāusiǎn”、“náitiǎn” 这类形式，
> 其中的 “sian” 和 “tian” 可以不按普通拼音规则处理，而是参考英文习惯发音。
>
> 换句话说，这类组合的读法具有特殊性，可以视为约定俗成的例外。
`}
        </Markdown>
      </article>
    </div>
  );
};
