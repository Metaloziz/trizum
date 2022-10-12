import { RequestCoursesForFilter } from "app/viewModels/CourseViewModel";

export const getConditionalParams = (obj:any)  => 
Object.keys(obj).reduce((acc, val) => 
    !!obj[val]?.toString() ? {
      ...acc,
      [val]: obj[val]
    } : acc, {})