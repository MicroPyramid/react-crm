import React from 'react'

export default function FormateTime(props: any) {
    // console.log(props,'tttt')
    // const { inputDate } = props;
    const formatDate = (inputDate: string): string => {
        const currentDate = new Date();
        const targetDate = new Date(inputDate);
        const timeDifference = currentDate.getTime() - targetDate.getTime();

        const secondsDifference = Math.floor(timeDifference / 1000);
        const minutesDifference = Math.floor(secondsDifference / 60);
        const hoursDifference = Math.floor(minutesDifference / 60);
        const daysDifference = Math.floor(hoursDifference / 24);
        const monthsDifference = Math.floor(daysDifference / 30);

        if (monthsDifference >= 12) {
            const yearsDifference = Math.floor(monthsDifference / 12);
            return `${yearsDifference} ${yearsDifference === 1 ? 'year' : 'years'} ago`;
        } else if (monthsDifference >= 1) {
            return `${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'} ago`;
        } else if (daysDifference >= 1) {
            return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
        } else if (hoursDifference >= 1) {
            return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
        } else if (minutesDifference >= 1) {
            return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            return `${secondsDifference} ${secondsDifference === 1 ? 'second' : 'seconds'} ago`;
        }
    };
    return (
        <div>
            {formatDate(props)}
        </div>
    )
}
