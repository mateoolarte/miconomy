import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { checkEnv } from '../../../utils/checkEnv';

interface MonthDatesRes {
  monthName: string;
  currentMonth: string;
}

export function useGetMonthDates(): MonthDatesRes {
  const currentMonth = checkEnv() && localStorage.getItem('currentMonth');

  if (currentMonth) {
    const formatDate = format(new Date(currentMonth), 'MMMM yyyy', {
      locale: es,
    });

    return {
      monthName: formatDate,
      currentMonth: currentMonth,
    };
  }

  if (!currentMonth) {
    const date = new Date();
    // TODO: Remove 1
    const firstDay = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      1
    ).toISOString();
    const formatDate = format(date, 'MMMM yyyy', {
      locale: es,
    });

    if (checkEnv()) {
      localStorage.setItem('currentMonth', firstDay);
    }

    return {
      monthName: formatDate,
      currentMonth: firstDay,
    };
  }
}
