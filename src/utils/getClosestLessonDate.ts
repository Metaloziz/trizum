import { ScheduleT } from "app/types/ScheduleT"

const now = new Date()
export const currentMomentOfTime = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`

export const getClosestLessonDate = (schedule: ScheduleT[], value: string) => {
    if (!schedule.length) { return 'нет занятий' }

    const date = schedule.reduce((acc, el) => acc = el.from > value ? [...acc, el.from] : acc, [''])
    if (!date[1]) {
        const prevDate = schedule.reduce((acc, el) => acc = el.from < value ? [...acc, el.from] : acc, [''])
        const [lessonDate, lessonTime] = prevDate[prevDate.length - 1].split(' ');
        return `${lessonDate} в ${lessonTime}`
    }
    
    const [lessonDate, lessonTime] = date[1].split(' ');
    return `${lessonDate} в ${lessonTime}`
}



// const someSchedule: ScheduleT[] = [
//     {
//         date: "12.10.2022",
//         from: "12.10.2022 09:45",
//         name: "Lesson 1",
//         to: "12.10.2022 10:30"
//     },
//     {
//         date: "15.10.2022",
//         from: "15.10.2022 09:45",
//         name: "Lesson 2",
//         to: "15.10.2022 10:30"
//     },
//     {
//         date: "17.10.2022",
//         from: "17.10.2022 09:45",
//         name: "Lesson 2",
//         to: "17.10.2022 10:30"
//     },
//     {
//         date: "17.10.2022",
//         from: "17.10.2022 11:45",
//         name: "Lesson 2",
//         to: "17.10.2022 12:30"
//     },
//     {
//         date: "18.10.2022",
//         from: "18.10.2022 09:45",
//         name: "Lesson 2",
//         to: "18.10.2022 10:30"
//     }
// ]

// getClosestLessonDate(someSchedule, currentTime)
