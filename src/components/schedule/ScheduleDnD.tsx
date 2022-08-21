import React, { FC, SyntheticEvent, useState, useEffect } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { Calendar, momentLocalizer, stringOrDate } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import styles from './Schedule.module.scss';

import appStore, { Roles } from 'app/stores/appStore';
import teacherMainStore from 'app/stores/scheduleStore';
import BasicModal from 'components/basic-modal/BasicModal';
import AddEditGroup from 'components/classes-page/AddEditGroup';
import InformationItem from 'components/information-item/InformationItem';
import { CustomEvent, ScheduleHeader, Toolbar } from 'components/schedule/ScheduleComponents';
import ScheduleModal from 'components/schedule/ScheduleModal';
import CustomSelect from 'components/select/CustomSelect';
import { getOption, getOptionMui } from 'utils/getOption';
import { FormControl, Grid, InputLabel, Select } from '@mui/material';
import _ from 'lodash';

require('moment/locale/ru');

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export interface EventProps {
  event: any;
  title: string;
}

export type ScheduleEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  lesson: string;
  class: string;
};

const formats = {
  eventTimeRangeFormat: () => '',
};

const ChildrenToolbar: FC = observer(() => {
  const { role } = appStore;
  const { groups, setFilters, filters, teachers } = teacherMainStore;

  const selectGroupOption = groups.length
    ? [{ groupId: '*', groupName: 'Все' }, ...groups].map(el =>
        getOptionMui(el.groupId, el.groupName),
      )
    : [];

  const teacherOptions = teachers.length
    ? [{ teacherId: '*', teacherName: 'Все' }, ...teachers].map(el =>
        getOptionMui(el.teacherId, el.teacherName),
      )
    : [];

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="select">Группа</InputLabel>
          <Select
            labelId="select"
            label="Группа"
            value={filters.groupId || '*'}
            fullWidth
            onChange={({ target: { value } }) => setFilters('groupId', value)}
          >
            {selectGroupOption}
          </Select>
        </FormControl>
      </Grid>

      {(role === Roles.FranchiseeAdmin || role === Roles.Franchisee) && (
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="teacher">ФИО Учителя</InputLabel>
            <Select
              labelId="teacher"
              label="ФИО Учителя"
              value={filters.teacherId || '*'}
              fullWidth
              onChange={({ target: { value } }) => setFilters('teacherId', value)}
            >
              {teacherOptions}
            </Select>
          </FormControl>
        </Grid>
      )}

      {role === Roles.Admin && (
        <>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="city">Город</InputLabel>
              <Select
                labelId="city"
                label="Город"
                value=""
                fullWidth
                onChange={({ target: { value } }) => console.log(value)}
              >
                {selectGroupOption}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="franchise">Франшиза</InputLabel>
              <Select
                labelId="franchise"
                label="Франшиза"
                value=""
                fullWidth
                onChange={({ target: { value } }) => console.log(value)}
              >
                {selectGroupOption}
              </Select>
            </FormControl>
          </Grid>
        </>
      )}
    </Grid>
  );
});

const ScheduleDnD: FC = observer(() => {
  const { role } = appStore;
  const { getGroups, actualSchedule, getTeachers } = teacherMainStore;
  const [events, setEvents] = useState<(ScheduleEvent | object)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<ScheduleEvent | null | object>(null);

  const changeVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    getGroups();
    if (role === Roles.Franchisee || role === Roles.FranchiseeAdmin) {
      getTeachers();
    }
  }, []);

  const moveEvent = ({
    event,
    start,
    end,
  }: {
    event: object;
    start: stringOrDate;
    end: stringOrDate;
  }) => {
    const idx = events.findIndex(e => (e as ScheduleEvent).id === (event as ScheduleEvent).id);
    const updatedEvent = { ...event, start, end };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);
  };

  const resizeEvent = ({
    event,
    start,
    end,
  }: {
    event: {
      id?: number;
    };
    start: stringOrDate;
    end: stringOrDate;
    isAllDay: boolean;
  }) => {
    const nextEvents = events.map(existingEvent => {
      if ('id' in existingEvent && existingEvent.id === event.id) {
        const startAsAr = moment(start).format('HH-mm').split('-');
        const startMinutes = Number(startAsAr[0]) * 60 + Number(startAsAr[1]);
        const endAsAr = moment(end).format('HH-mm').split('-');
        const endMinutes = Number(endAsAr[0]) * 60 + Number(endAsAr[1]);
        if (endMinutes - startMinutes < 45) {
          const hours = Math.trunc((startMinutes + 45) / 60);
          const minutes = (startMinutes + 45) % 60;
          const newEnd = new Date(
            (end as Date).getFullYear(),
            (end as Date).getMonth(),
            (end as Date).getDate(),
            hours,
            minutes,
          );
          return { ...existingEvent, start, end: newEnd };
        }
        return { ...existingEvent, start, end };
      }
      return existingEvent;
    });
    setEvents(nextEvents);
  };
  const onSelectEvent = (event: object | ScheduleEvent, e: SyntheticEvent<HTMLElement, Event>) => {
    const { target } = e;
    if ((target as HTMLImageElement).alt === 'Delete') {
      e.stopPropagation();
      const newEvents = events.filter(ev => {
        if ('id' in event && 'id' in ev) {
          return ev.id !== event.id;
        }
        return false;
      });
      // TODO: request for delete and request for new data
      setEvents(newEvents);
    } else {
      setCurrentEvent(event);
      changeVisibility();
    }
  };

  return (
    <div className={styles.wrapper}>
      <DnDCalendar
        localizer={localizer}
        events={actualSchedule}
        step={15}
        min={new Date(2022, 0, 1, 8, 0)}
        max={new Date(2022, 0, 5, 20, 30)}
        defaultView="week"
        views={['week']}
        messages={{ next: 'next', previous: 'last', today: 'Текущая' }}
        selectable
        // @ts-ignore
        tooltipAccessor={null}
        resizable
        formats={formats}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        onSelectEvent={onSelectEvent}
        components={{
          event: CustomEvent,
          header: ScheduleHeader,
          toolbar: props => (
            <Toolbar {...props}>
              <ChildrenToolbar />
            </Toolbar>
          ),
        }}
      />
      <AddEditGroup />
    </div>
  );
});

export default ScheduleDnD;
