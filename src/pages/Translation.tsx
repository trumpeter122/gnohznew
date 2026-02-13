import { pinyin } from 'pinyin-pro'
import { useState } from 'react'
import TinySegmenter from 'tiny-segmenter'

import { Head } from '@/components/Head'

type SpeechParams = {
  lang: string
  volume: number
  rate: number
  pitch: number
}

const speechLangs = window.speechSynthesis
  .getVoices()
  .map(v => v.lang)
  .toSorted()

const segmenter = new TinySegmenter()

const toTokens = (textChinese: string): string[] => {
  const tokens = segmenter.segment(textChinese)
  return tokens
}

const toPinyins = (textChinese: string) => {
  const pinyins = pinyin(textChinese, {
    toneType: 'symbol',
    type: 'array'
  })
  return pinyins
}

const toReverse = (pinyins: string[]) =>
  pinyins.map(pinyin => pinyin.split('').reverse().join('')).join('')

function Home() {
  const [textInput, setTextInput] = useState('')
  const [textResult, setTextResult] = useState('')
  const [speechParams, setSpeechParams] = useState({
    lang: speechLangs[0],
    volume: 1,
    rate: 1,
    pitch: 1
  } as SpeechParams)

  const translate = () => {
    setTextResult(
      toTokens(textInput)
        .map(t => toReverse(toPinyins(t)))
        .join(' ')
    )
  }

  const read = () => {
    if (!speechLangs.includes(speechParams.lang)) {
      return
    }

    const utterance = new SpeechSynthesisUtterance(textResult)
    utterance.lang = speechParams.lang
    utterance.volume = speechParams.volume
    utterance.rate = speechParams.rate
    utterance.pitch = speechParams.pitch

    window.speechSynthesis.speak(utterance)
  }

  return (
    <>
      <Head title='Gnohznew' />
      <div className='flex h-screen w-screen flex-col justify-start gap-15 bg-purple-200 '>
        <div className='bg-teal-600 p-5 font-extrabold font-sans text-5xl text-purple-200'>
          Gnohznew
        </div>
        <div className='flex grow flex-row items-center justify-evenly p-5'>
          <textarea
            className='h-4/5 w-3/10 bg-blue-100 p-5 rounded-3xl'
            onChange={e => setTextInput(e.target.value)}
            value={textInput}
          />
          <div className='flex flex-col h-4/5 items-center justify-evenly gap-5'>
            <div className='flex flex-col justify-evenly items-center gap-3'>
              <div>
                <label htmlFor='speechLang'>Dialect: </label>
                <select
                  id='speechLang'
                  className='rounded bg-teal-500 text-purple-200 px-4 py-2 font-bold hover:bg-blue-200 hover:text-teal-500'
                  defaultValue=''
                  onChange={e =>
                    setSpeechParams({ ...speechParams, lang: e.target.value })
                  }
                >
                  {speechLangs.map(sd => (
                    <option value={sd}>{sd}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor='speechVolume'>Volume: </label>
                <input
                  id='speechVolume'
                  type='range'
                  min='0'
                  max='1'
                  step='0.1'
                  value={speechParams.volume}
                  onChange={e =>
                    setSpeechParams({
                      ...speechParams,
                      volume: Number(e.target.value)
                    })
                  }
                />
                <div>{speechParams.volume}</div>
              </div>
              <div>
                <label htmlFor='speechRate'>Rate: </label>
                <input
                  id='speechRate'
                  type='range'
                  min='0.1'
                  max='10'
                  step='0.1'
                  value={speechParams.rate}
                  onChange={e =>
                    setSpeechParams({
                      ...speechParams,
                      rate: Number(e.target.value)
                    })
                  }
                />
                <div>{speechParams.rate}</div>
              </div>
              <div>
                <label htmlFor='speechPitch'>Pitch: </label>
                <input
                  id='speechPitch'
                  type='range'
                  min='0'
                  max='2'
                  step='0.1'
                  value={speechParams.pitch}
                  onChange={e =>
                    setSpeechParams({
                      ...speechParams,
                      pitch: Number(e.target.value)
                    })
                  }
                />
                <div>{speechParams.pitch}</div>
              </div>
            </div>
            <div className='flex flex-col justify-evenly items-center gap-3'>
              <button
                className='rounded bg-teal-500 text-purple-200 px-4 py-2 font-bold hover:bg-blue-200 hover:text-teal-500'
                onClick={_ => translate()}
              >
                Translate
              </button>
              <button
                className='rounded bg-teal-500 text-purple-200 px-4 py-2 font-bold hover:bg-blue-200 hover:text-teal-500'
                onClick={_ => read()}
              >
                Read
              </button>
            </div>
          </div>
          <textarea
            className='h-4/5 w-3/10 bg-blue-100 p-5 rounded-3xl'
            disabled={true}
            value={textResult}
          />
        </div>
      </div>
    </>
  )
}

export default Home
