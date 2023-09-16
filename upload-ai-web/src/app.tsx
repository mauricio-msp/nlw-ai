import { useState } from 'react'

import { Github } from 'lucide-react'
import { useCompletion } from 'ai/react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

import { ToggleTheme } from '@/components/toggle-theme'
import { VideoInputForm } from '@/components/video-input-form'
import { PromptInputForm } from '@/components/prompt-input-form'
import { AvatarUser } from './components/avatar-user'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover'

export function App() {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [temperature, setTemperature] = useState<number>(0.5)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-3 border-b">
        <h1 className="flex items-center gap-2 text-xl font-extrabold text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text">
          <Popover>
            <PopoverTrigger>
              <AvatarUser />
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <p className="font-medium uppercase">
                Maurício Porfírio | Front-End Engineer
              </p>
              <span className="text-muted-foreground">
                Web developer. Thirsty for knowledge <br />
                in new technologies 💻🔥. <br />
                <Separator className="my-2" />
                Javascript · Typescript · React · NextJS · NodeJS
              </span>
            </PopoverContent>
          </Popover>
          upload.ai
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com 💟 no {'<NLW />'} IA da Rocketseat
          </span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
          <ToggleTheme />
        </div>
      </header>

      <main className="flex flex-1 gap-6 p-6">
        <div className="flex flex-col flex-1 gap-4">
          <section className="grid flex-1 grid-rows-2 gap-4">
            <Textarea
              className="p-4 leading-relaxed resize-none"
              placeholder="Inclua o prompt para a IA..."
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              readOnly
              className="p-4 leading-relaxed resize-none"
              placeholder="Resultado gerado pela IA..."
              value={completion}
            />
          </section>

          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável{' '}
            <code className="text-violet-400">{'{transcription}'}</code> no seu
            prompt para adicionar o conteúdo da transcrição do video
            selecionado.
          </p>
        </div>

        <aside className="space-y-6 w-80">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <PromptInputForm
            temperature={temperature}
            onChangeTemperature={setTemperature}
            onChangeSelectInput={setInput}
            onSubmitForm={handleSubmit}
            isSubmitting={isLoading}
          />
        </aside>
      </main>
    </div>
  )
}
