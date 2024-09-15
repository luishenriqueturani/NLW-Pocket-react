import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import logo from "../assets/Frame 1.svg";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";


dayjs.locale(ptBR);


export function Summary() {

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 1 minute
  })

  if (!data) return null

  const firstDayOfWeek = dayjs().startOf('week').format('DD MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('DD MMM')

  const completedPorcentagem = Math.round(data?.completed * 100 / data?.total)

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">

        <img src={logo} className="w-16 h-16" alt="logo in.orbit" />
        <span className="text-lg font-semibold capitalize">{firstDayOfWeek} à {lastDayOfWeek}</span>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className='size-4' />
            Cadastrar meta
          </Button>

        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPorcentagem}%` }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Você completou
            <span className="text-zinc-100">{data?.completed}</span> de
            <span className="text-zinc-100">{data?.total}</span>
            metas nessa semana
          </span>
          <span>{completedPorcentagem}%</span>
        </div>

      </div>

      <Separator />

      <div className="flex flex-wrap flex-col gap-3">
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Meditar
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          nadar
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Praticar exercícios
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2>Sua Semana</h2>

        {Object.entries(data?.goalsPerDay).map(([day, goals]) => {
          const weekday = dayjs(day).format('dddd')
          const formattedDate = dayjs(day).format('DD[ de ]MMMM')

          return (
            <div key={day} className="flex flex-col gap-3">
              <h3 className="font-medium">
                <span className="capitalize">{weekday} </span>
                <span className="text-zinc-400 text-xs">({formattedDate})</span>
              </h3>
              <ul className="flex flex-col gap-3">
                {goals.map((goal) => {
                  const time = dayjs(goal.completedAt).format('HH:mm')

                  return (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às
                        <span className="text-zinc-100">{time}h</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}

      </div>
    </div>
  )
}
