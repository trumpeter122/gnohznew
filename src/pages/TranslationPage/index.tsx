import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

import type { ToneType } from "@/lib/translation";
import { getGnohznewFromChinese, toneTypes } from "@/lib/translation";

type TranslationParams = {
  toneType: ToneType;
};

type SpeechSynthesisParams = {
  lang: string;
  volume: number;
  rate: number;
  pitch: number;
};

export default () => {
  const speechSynthesisLangs = window.speechSynthesis
    .getVoices()
    .map((v) => v.lang)
    .toSorted();

  const defaultSpeechSynthesisLang = speechSynthesisLangs[0];
  if (defaultSpeechSynthesisLang === undefined)
    throw Error("No available speech synthesis language found");
  const defaultSpeechSynthesisParams = {
    lang: defaultSpeechSynthesisLang,
    volume: 1,
    rate: 1,
    pitch: 1,
  };

  const defaultTranslationParams = {
    toneType: toneTypes[0],
  };

  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [translationParams, setTranslationParams] = useState<TranslationParams>(
    defaultTranslationParams,
  );
  const [speechSynthesisParams, setSpeechSynthesisParams] =
    useState<SpeechSynthesisParams>(defaultSpeechSynthesisParams);
  const [isReading, setIsReading] = useState(false);
  const isMd = useMediaQuery({ minWidth: 768 });

  const handleStartRead = () => {
    const utterance = new SpeechSynthesisUtterance(textOutput);
    utterance.lang = speechSynthesisParams.lang;
    utterance.volume = speechSynthesisParams.volume;
    utterance.rate = speechSynthesisParams.rate;
    utterance.pitch = speechSynthesisParams.pitch;
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCancelRead = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  const handleTranslate = () => {
    setTextOutput(
      getGnohznewFromChinese(textInput, translationParams.toneType),
    );
  };

  const handleReset = () => {
    setTranslationParams(defaultTranslationParams);
    setSpeechSynthesisParams(defaultSpeechSynthesisParams);
  };

  const handleClear = () => {
    setTextInput("");
    setTextOutput("");
  };

  useEffect(() => {
    return () => {
      handleCancelRead();
    };
  }, [handleCancelRead]);

  return (
    <div className="flex-1 flex flex-col md:flex-row justify-evenly items-center gap-9">
      <Textarea
        className="h-50 md:h-150 bg-secondary"
        placeholder="Input: Chinese"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />

      <Card>
        <CardHeader>
          <CardTitle>Options</CardTitle>
        </CardHeader>
        <CardContent>
          <Field className="flex flex-row md:flex-col items-start">
            <Field>
              <FieldLabel htmlFor="tone-type">Tone Type</FieldLabel>
              <Select
                value={translationParams.toneType}
                onValueChange={(v) => {
                  setTranslationParams({
                    ...translationParams,
                    toneType: v as ToneType,
                  });
                }}
              >
                <SelectTrigger id="tone-type">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {toneTypes.map((tt) => (
                      <SelectItem key={tt} value={tt}>
                        {tt}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="speech-synthesis-lang">Dialect</FieldLabel>
              <Select
                value={speechSynthesisParams.lang}
                onValueChange={(v) => {
                  setSpeechSynthesisParams({
                    ...speechSynthesisParams,
                    lang: v,
                  });
                }}
              >
                <SelectTrigger id="speech-synthesis-lang">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {speechSynthesisLangs.map((sl) => (
                      <SelectItem key={sl} value={sl}>
                        {sl}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldLabel htmlFor="speech-volume">Volume</FieldLabel>
              <Slider
                id="speech-volume"
                min={0}
                max={1}
                step={0.1}
                value={[speechSynthesisParams.volume]}
                onValueChange={([v, _]) => {
                  setSpeechSynthesisParams({
                    ...speechSynthesisParams,
                    volume: v ?? 0,
                  });
                }}
              />
              <FieldLabel htmlFor="speech-rate">Rate</FieldLabel>
              <Slider
                id="speech-rate"
                min={0.1}
                max={10}
                step={0.1}
                value={[speechSynthesisParams.rate]}
                onValueChange={([v, _]) => {
                  setSpeechSynthesisParams({
                    ...speechSynthesisParams,
                    rate: v ?? 0.1,
                  });
                }}
              />
              <FieldLabel htmlFor="speech-pitch">Pitch</FieldLabel>
              <Slider
                id="speech-pitch"
                min={0.1}
                max={10}
                step={0.1}
                value={[speechSynthesisParams.pitch]}
                onValueChange={([v, _]) => {
                  setSpeechSynthesisParams({
                    ...speechSynthesisParams,
                    pitch: v ?? 0.1,
                  });
                }}
              />
            </Field>

            <Field orientation={isMd ? "horizontal" : "vertical"}>
              <Button
                onClick={() => {
                  handleTranslate();
                }}
                disabled={textInput.length === 0}
              >
                Translate
              </Button>
              {isReading ? (
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleCancelRead();
                  }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleStartRead();
                  }}
                  disabled={textOutput.length === 0}
                >
                  Read
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => handleReset()}
                disabled={
                  !!(
                    JSON.stringify(translationParams) ===
                      JSON.stringify(defaultTranslationParams) &&
                    JSON.stringify(speechSynthesisParams) ===
                      JSON.stringify(defaultSpeechSynthesisParams)
                  )
                }
              >
                Reset
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleClear()}
                disabled={!!(textInput === "" && textOutput === "")}
              >
                Clear
              </Button>
            </Field>
          </Field>
        </CardContent>
      </Card>

      <Textarea
        className="h-50 md:h-150 bg-secondary font-mono"
        placeholder="Output: Gnohznew"
        value={textOutput}
        onChange={(e) => {
          setTextOutput(e.target.value);
        }}
      />
    </div>
  );
};
