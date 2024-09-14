import logo from '../assets/logo.svg'
import letsStart from '../assets/lets-start.svg'
import { DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

export function EmptyGoals() {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center gap-8'>

      <img src={logo} className='' alt='logo in.orbit' />
      <img src={letsStart} className='' alt='lets start in.orbit' />
      <p className='text-zinc-300 leading-relaxed max-w-80 text-center'>
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className='size-4' />
          Cadastrar meta
        </Button>

      </DialogTrigger>

    </div>
  )
}
