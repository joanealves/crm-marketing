'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import clsx from 'clsx'

export function CustomDatePicker() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={clsx(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : 'Escolha uma data'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          inline
          calendarClassName="!bg-white !text-black dark:!bg-neutral-900 dark:!text-white p-2 rounded-md"
        />
      </PopoverContent>
    </Popover>
  )
}
