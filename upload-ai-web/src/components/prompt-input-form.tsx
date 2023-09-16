import { type FormEvent } from 'react'
import { Wand2 } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'

import { PromptSelect } from '@/components/prompt-select'

interface PromptInputFormProps {
  temperature: number
  onChangeTemperature: (value: number) => void
  onChangeSelectInput: (template: string) => void
  onSubmitForm: (event: FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
}

export function PromptInputForm({
  temperature,
  onChangeTemperature,
  onChangeSelectInput,
  onSubmitForm,
  isSubmitting,
}: PromptInputFormProps) {
  return (
    <form onSubmit={onSubmitForm} className="space-y-6">
      <div className="space-y-2">
        <Label>Prompt</Label>
        <PromptSelect onPromptSelected={onChangeSelectInput} />
      </div>

      <div className="space-y-2">
        <Label>Modelo</Label>
        <Select disabled defaultValue="gpt3.5">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
          </SelectContent>
        </Select>
        <span className="block text-xs italic text-muted-foreground">
          Você poderá customizar essa opção em breve
        </span>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Temperatura</Label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[temperature]}
          onValueChange={(value) => {
            onChangeTemperature(value[0])
          }}
        />
        <span className="block text-xs italic leading-relaxed text-muted-foreground">
          Valores mais altos tendem a deixar o resultado mais criativo e com
          possíveis erros
        </span>
      </div>

      <Separator />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Executar
        <Wand2 className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}
