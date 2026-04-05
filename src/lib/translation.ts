import { pinyin } from "pinyin-pro";

export const toneTypes = ["none", "symbol", "num"] as const;
export type ToneType = (typeof toneTypes)[number];

export const isStringChinese = (text: string) => {
  return !(text.length === 0) && /^\p{Script=Han}+$/u.test(text);
};

export const getTokensFromChinese = (chineseText: string) => {
  // const tokens = new TinySegmenter().segment(textChinese);
  const segmenter = new Intl.Segmenter("zh-CN", { granularity: "word" });
  const tokens = [...segmenter.segment(chineseText)[Symbol.iterator]()];

  return tokens.map((s) => {
    return { token: s.segment, isChinese: isStringChinese(s.segment) };
  });
};

export const getPinyinFromChinese = (
  chineseText: string,
  toneType: ToneType,
) => {
  const pinyins = pinyin(chineseText, {
    toneType: toneType,
    type: "array",
  });
  return pinyins;
};

export const getGnohznewFromChinese = (
  chineseText: string,
  toneType: ToneType,
  seperator: string,
) => {
  const tokens = getTokensFromChinese(chineseText);
  const tokenSyllables = tokens.map((t) =>
    t.isChinese ? getPinyinFromChinese(t.token, toneType) : t.token,
  );
  const gnohznewTokenSyllables = tokenSyllables.map((tp) =>
    typeof tp !== "string" ? tp.map((p) => p.split("").reverse().join("")) : tp,
  );
  const gnohznewTokens = gnohznewTokenSyllables.map((rts) =>
    typeof rts !== "string"
      ? { token: rts.join(""), isGnohznew: true }
      : { token: rts, isGnohznew: false },
  );

  let gnohznewText = "";
  for (let i = 0; i < gnohznewTokens.length; i++) {
    const currentToken = gnohznewTokens[i];
    const nextToken = gnohznewTokens[i + 1];
    gnohznewText += currentToken?.token;

    if (
      i < gnohznewTokens.length - 1 &&
      currentToken?.isGnohznew &&
      nextToken?.isGnohznew
    ) {
      gnohznewText += seperator;
    }
  }

  return gnohznewText;
};
