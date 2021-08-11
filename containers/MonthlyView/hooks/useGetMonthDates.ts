import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface MonthDatesRes {
  monthName: string;
  currentMonth: number;
  currentYear: number;
}

export function useGetMonthDates(): MonthDatesRes {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [monthName, setMonthName] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    setCurrentMonth(currentDate.getMonth());
    setCurrentYear(currentDate.getFullYear());
    setMonthName(
      format(currentDate, 'MMMM yyyy', {
        locale: es,
      })
    );
  }, []);

  return {
    monthName,
    currentMonth,
    currentYear,
  };
}
