/* eslint-disable no-void */
import _defineProperty from '@babel/runtime/helpers/defineProperty'
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator'
import _slicedToArray from '@babel/runtime/helpers/slicedToArray'
import _regeneratorRuntime from '@babel/runtime/regenerator'
import React, { createContext, useState, useContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import { styled, useTheme, alpha } from '@mui/material/styles'
import { Autocomplete, Box, TextField, Toolbar, Grid, Typography, Hidden, IconButton, Button, Menu, Stack, ToggleButtonGroup, ToggleButton, MenuItem, ListItemIcon, Divider, Collapse, Alert, Paper, TableCell, tableCellClasses, TableRow, TableContainer, Table, TableHead, TableBody, Tooltip, Zoom, Fade, Slide } from '@mui/material'
import { format, parse, getDaysInMonth, sub, add, differenceInMinutes, isValid, getWeeksInMonth, startOfMonth, getDay, isSameDay, startOfWeek, startOfDay } from 'date-fns'
import _extends from '@babel/runtime/helpers/extends'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TodayIcon from '@mui/icons-material/Today'
import SettingsIcon from '@mui/icons-material/Settings'
import ArchiveIcon from '@mui/icons-material/Archive'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import GridViewIcon from '@mui/icons-material/GridView'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import { styled as styled$1 } from '@mui/system'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { enAU, fr, ko, de, es, ar, ja, ru, zhCN } from 'date-fns/locale'
import moment from 'moment-timezone'
moment.tz.setDefault('America/Mexico_City')

const day$7 = 'Day'
const week$7 = 'Week'
const month$7 = 'Month'
const timeline$7 = 'Timeline'
const mon$7 = 'Mon'
const tue$7 = 'Tue'
const wed$7 = 'Wed'
const thu$7 = 'Thu'
const fri$7 = 'Fri'
const sat$7 = 'Sat'
const sun$7 = 'Sun'
const search$7 = 'Search...'
const trEN = {
  day: day$7,
  week: week$7,
  month: month$7,
  timeline: timeline$7,
  mon: mon$7,
  tue: tue$7,
  wed: wed$7,
  thu: thu$7,
  fri: fri$7,
  sat: sat$7,
  sun: sun$7,
  search: search$7
}

const day$6 = 'Jour'
const week$6 = 'Semaine'
const month$6 = 'Mois'
const timeline$6 = 'Chronologie'
const mon$6 = 'Lun'
const tue$6 = 'Mar'
const wed$6 = 'Mer'
const thu$6 = 'Jeu'
const fri$6 = 'Ven'
const sat$6 = 'Sam'
const sun$6 = 'Dim'
const search$6 = 'Chercher...'
const trFR = {
  day: day$6,
  week: week$6,
  month: month$6,
  timeline: timeline$6,
  mon: mon$6,
  tue: tue$6,
  wed: wed$6,
  thu: thu$6,
  fri: fri$6,
  sat: sat$6,
  sun: sun$6,
  search: search$6
}

const day$5 = '낮'
const week$5 = '주'
const month$5 = '월'
const timeline$5 = '타임라인'
const mon$5 = '월'
const tue$5 = '화요일'
const wed$5 = '수'
const thu$5 = '목'
const fri$5 = '금'
const sat$5 = '앉았다'
const sun$5 = '해'
const search$5 = '검색...'
const trKO = {
  day: day$5,
  week: week$5,
  month: month$5,
  timeline: timeline$5,
  mon: mon$5,
  tue: tue$5,
  wed: wed$5,
  thu: thu$5,
  fri: fri$5,
  sat: sat$5,
  sun: sun$5,
  search: search$5
}

const day$4 = 'Tag'
const week$4 = 'Woche'
const month$4 = 'Monat'
const timeline$4 = 'Zeitleiste'
const mon$4 = 'Mo'
const tue$4 = 'Diens'
const wed$4 = 'Mitt'
const thu$4 = 'Donner'
const fri$4 = 'Frei'
const sat$4 = 'Sam'
const sun$4 = 'Sonn'
const search$4 = 'Suchen...'
const trDE = {
  day: day$4,
  week: week$4,
  month: month$4,
  timeline: timeline$4,
  mon: mon$4,
  tue: tue$4,
  wed: wed$4,
  thu: thu$4,
  fri: fri$4,
  sat: sat$4,
  sun: sun$4,
  search: search$4
}

const day$3 = 'Día'
const week$3 = 'Semana'
const month$3 = 'Mes'
const timeline$3 = 'Cronología'
const mon$3 = 'Lun'
const tue$3 = 'Mar'
const wed$3 = 'Mié'
const thu$3 = 'Jue'
const fri$3 = 'Vie'
const sat$3 = 'Sáb'
const sun$3 = 'Dom'
const search$3 = 'Buscar...'
const trES = {
  day: day$3,
  week: week$3,
  month: month$3,
  timeline: timeline$3,
  mon: mon$3,
  tue: tue$3,
  wed: wed$3,
  thu: thu$3,
  fri: fri$3,
  sat: sat$3,
  sun: sun$3,
  search: search$3
}

const day$2 = 'يوم'
const week$2 = 'أسبوع'
const month$2 = 'شهر'
const timeline$2 = 'الجدول الزمني'
const mon$2 = 'الإثنين'
const tue$2 = 'الثلاثاء'
const wed$2 = 'تزوج'
const thu$2 = 'خميس'
const fri$2 = 'الجمعة'
const sat$2 = 'قعد'
const sun$2 = 'شمس'
const search$2 = 'بحث'
const trAR = {
  day: day$2,
  week: week$2,
  month: month$2,
  timeline: timeline$2,
  mon: mon$2,
  tue: tue$2,
  wed: wed$2,
  thu: thu$2,
  fri: fri$2,
  sat: sat$2,
  sun: sun$2,
  search: search$2
}

const day$1 = '日'
const week$1 = '週'
const month$1 = '月'
const timeline$1 = '年表'
const mon$1 = '月曜日'
const tue$1 = '3月'
const wed$1 = '海'
const thu$1 = 'ゲーム'
const fri$1 = '金'
const sat$1 = '土'
const sun$1 = '太陽'
const search$1 = '探す...'
const trJA = {
  day: day$1,
  week: week$1,
  month: month$1,
  timeline: timeline$1,
  mon: mon$1,
  tue: tue$1,
  wed: wed$1,
  thu: thu$1,
  fri: fri$1,
  sat: sat$1,
  sun: sun$1,
  search: search$1
}

const day = '天'
const week = '星期'
const month = '月'
const timeline = '年表'
const mon = '星期一'
const tue = '三月'
const wed = '海'
const thu = '游戏'
const fri = '周五'
const sat = '星期六'
const sun = '太阳'
const search = '寻找...'
const trZH = {
  day,
  week,
  month,
  timeline,
  mon,
  tue,
  wed,
  thu,
  fri,
  sat,
  sun,
  search
}

const resources = {
  en: {
    common: trEN
  },
  fr: {
    common: trFR
  },
  ko: {
    common: trKO
  },
  de: {
    common: trDE
  },
  es: {
    common: trES
  },
  ar: {
    common: trAR
  },
  ja: {
    common: trJA
  },
  zh: {
    common: trZH
  }
}
i18n // pass the i18n instance to react-i18next.
  .use(initReactI18next) // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng'),
    ns: ['common'],
    defaultNS: 'common',
    fallbackNS: 'common',
    fallbackLng: ['en', 'fr', 'dev'],
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default

    },
    react: {
      wait: true,
      useSuspense: false
    }
  })

const DateFnsLocaleContext = /* #__PURE__ */createContext()

function ownKeys$4 (object, enumerableOnly) { const keys = Object.keys(object); if (Object.getOwnPropertySymbols) { let symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable })), keys.push.apply(keys, symbols) } return keys }

function _objectSpread$4 (target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)) }) } return target }
const StyledAutoComplete = styled(Autocomplete)(function (_ref) {
  let _ref2

  const theme = _ref.theme
  return _ref2 = {
    color: 'inherit',
    width: '94%',
    display: 'inline-flex',
    margin: theme.spacing(0.5, 1.5),
    transition: theme.transitions.create('width')
  }, _defineProperty(_ref2, theme.breakpoints.up('sm'), {
    width: '100%'
  }), _defineProperty(_ref2, theme.breakpoints.up('md'), {
    width: '27ch'
  }), _defineProperty(_ref2, theme.breakpoints.up('lg'), {
    width: '27ch'
  }), _ref2
})

function ToolbarSearchbar (props) {
  const events = props.events
  const _onInputChange = props.onInputChange

  const _useTranslation = useTranslation(['common'])
  const t = _useTranslation.t

  const _useState = useState('')
  const _useState2 = _slicedToArray(_useState, 2)
  const value = _useState2[0]
  const setValue = _useState2[1]

  useContext(DateFnsLocaleContext)

  const _useState3 = useState('')
  const _useState4 = _slicedToArray(_useState3, 2)
  const inputValue = _useState4[0]
  const setInputValue = _useState4[1]

  const handleOnChange = function handleOnChange (event, newValue) {
    setValue(newValue)
    if (_onInputChange) _onInputChange(newValue)
  }

  return /* #__PURE__ */React.createElement(StyledAutoComplete, {
    value,
    id: 'scheduler-autocomplete',
    inputValue,
    sx: {
      mb: 0,
      display: 'inline-flex'
    },
    onChange: handleOnChange,
    options: events === null || events === void 0
      ? void 0
      : events,
      // events.sort(function (a, b) {
      //   return -b.groupLabel.localeCompare(a.groupLabel)
      // }),
    groupBy: function groupBy (option) {
      return option ? option === null || option === void 0 ? void 0 : option.groupLabel : null
    }, /*
    (
        <Box sx={{display: "flex", alignItems: "center"}}>
          <Box
            component="span"
            sx={{
              width: 16,
              height: 16,
              mr: 1,
              borderRadius: "50%",
              backgroundColor: option?.color || theme.palette.secondary.main
            }}
          />
          {option?.groupLabel}
        </Box>
      )
     */

    getOptionLabel: function getOptionLabel (option) {
      return option ? ''.concat(option.groupLabel || '', ' | (').concat(option.startHour || '', ' - ').concat(option.endHour || '', ')') : ''
    },
    isOptionEqualToValue: function isOptionEqualToValue (option, value) {
      return option.id === value.id
    },
    onInputChange: function onInputChange (event, newInputValue) {
      setInputValue(newInputValue)

      _onInputChange(newInputValue)
    },
    renderOption: function renderOption (props, option) {
      return /* #__PURE__ */React.createElement(Box, _extends({
        component: 'li',
        sx: {
          fontSize: 12
        }
      }, props), format(parse(option === null || option === void 0 ? void 0 : option.date, 'yyyy-MM-dd', new Date()), 'dd-MMMM-yyyy'), '(', (option === null || option === void 0 ? void 0 : option.startHour) || '', ' - ', (option === null || option === void 0 ? void 0 : option.endHour) || '', ')')
    },
    renderInput: function renderInput (params) {
      return /* #__PURE__ */React.createElement(TextField, _extends({}, params, {
        size: 'small',
        label: t('search'),
        InputProps: _objectSpread$4({}, params.InputProps)
      }))
    }
  })
}

ToolbarSearchbar.propTypes = {
  events: PropTypes.array,
  onInputChange: PropTypes.func
}
ToolbarSearchbar.defaultProps = {}

function SchedulerToolbar (props) {
  props.locale
  const events = props.events
  const today = props.today
  const switchMode = props.switchMode
  const alertProps = props.alertProps
  const toolbarProps = props.toolbarProps
  const onModeChange = props.onModeChange
  const onDateChange = props.onDateChange
  const onSearchResult = props.onSearchResult
  const onAlertCloseButtonClicked = props.onAlertCloseButtonClicked
  const theme = useTheme()

  const _useTranslation = useTranslation(['common'])
  const t = _useTranslation.t

  const _useState = useState(switchMode)
  const _useState2 = _slicedToArray(_useState, 2)
  const mode = _useState2[0]
  const setMode = _useState2[1]

  const _useState3 = useState()
  const _useState4 = _slicedToArray(_useState3, 2)
  const searchResult = _useState4[0]
  const setSearchResult = _useState4[1]

  const _useState5 = useState(null)
  const _useState6 = _slicedToArray(_useState5, 2)
  const anchorMenuEl = _useState6[0]
  const setAnchorMenuEl = _useState6[1]

  const _useState7 = useState(null)
  const _useState8 = _slicedToArray(_useState7, 2)
  const anchorDateEl = _useState8[0]
  const setAnchorDateEl = _useState8[1]

  const _useState9 = useState(today || new Date())
  const _useState10 = _slicedToArray(_useState9, 2)
  const selectedDate = _useState10[0]
  const setSelectedDate = _useState10[1]

  const _useState11 = useState(getDaysInMonth(selectedDate))
  const _useState12 = _slicedToArray(_useState11, 2)
  const daysInMonth = _useState12[0]
  const setDaysInMonth = _useState12[1]

  const openMenu = Boolean(anchorMenuEl)
  const openDateSelector = Boolean(anchorDateEl)
  const dateFnsLocale = useContext(DateFnsLocaleContext)
  const isDayMode = mode.toLowerCase() === 'day'
  const isWeekMode = mode.toLowerCase() === 'week'
  const isMonthMode = mode.toLowerCase() === 'month'
  const commonIconButtonProps = {
    size: 'medium',
    edge: 'start',
    color: 'inherit',
    'aria-label': 'menu'
  }
  const menus = [{
    label: 'Read events',
    icon: /* #__PURE__ */React.createElement(PlayCircleOutlineIcon, {
      fontSize: 'small'
    })
  }, {
    label: 'Refresh',
    icon: /* #__PURE__ */React.createElement(AutorenewIcon, {
      fontSize: 'small'
    })
  }, {
    label: 'Export',
    icon: /* #__PURE__ */React.createElement(ArchiveIcon, {
      fontSize: 'small'
    })
  }, {
    label: 'Print',
    icon: /* #__PURE__ */React.createElement(LocalPrintshopIcon, {
      fontSize: 'small'
    })
  }]

  const handleCloseMenu = function handleCloseMenu () {
    setAnchorMenuEl(null)
  }

  const handleOpenDateSelector = function handleOpenDateSelector (event) {
    setAnchorDateEl(event.currentTarget)
  }

  const handleCloseDateSelector = function handleCloseDateSelector () {
    setAnchorDateEl(null)
  }
  /**
   * @name handleChangeDate
   * @description
   * @param method
   * @return void
   */

  const handleChangeDate = function handleChangeDate (method) {
    if (typeof method !== 'function') {
      return
    }

    let options = {
      months: 1
    }

    if (isWeekMode) {
      options = {
        weeks: 1
      }
    }

    if (isDayMode) {
      options = {
        days: 1
      }
    }

    const newDate = method(selectedDate, options)
    setDaysInMonth(getDaysInMonth(newDate))
    setSelectedDate(newDate)
  }

  const handleCloseAlert = function handleCloseAlert (e) {
    onAlertCloseButtonClicked && onAlertCloseButtonClicked(e)
  }

  useEffect(function () {
    if (mode && onModeChange) {
      onModeChange(mode)
    } // eslint-disable-next-line
  }, [mode])
  useEffect(function () {
    onDateChange && onDateChange(daysInMonth, selectedDate) // eslint-disable-next-line
  }, [daysInMonth, selectedDate]);
  useEffect(function () {
    onSearchResult && onSearchResult(searchResult) // eslint-disable-next-line
  }, [searchResult]);
  useEffect(function () {
    if (switchMode !== mode) {
      setMode(switchMode)
    }
  }, [switchMode])
  return /* #__PURE__ */React.createElement(Toolbar, {
    variant: 'dense',
    sx: {
      px: '0px !important',
      display: 'block',
      borderBottom: '1px '.concat(theme.palette.divider, ' solid')
    }
  }, /* #__PURE__ */React.createElement(Grid, {
    container: true,
    spacing: 0,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }, /* #__PURE__ */React.createElement(Grid, {
    item: true,
    xs: 1,
    sm: true,
    md: true
  }, toolbarProps.showDatePicker && /* #__PURE__ */React.createElement(Typography, {
    component: 'div',
    sx: {
      display: 'flex'
    }
  }, /* #__PURE__ */React.createElement(Hidden, {
    smDown: true
  }, /* #__PURE__ */React.createElement(IconButton, _extends({
    sx: {
      ml: 0,
      mr: -0.1
    }
  }, commonIconButtonProps, {
    onClick: function onClick () {
      return handleChangeDate(sub)
    }
  }), /* #__PURE__ */React.createElement(ChevronLeftIcon, null)), /* #__PURE__ */React.createElement(Button, {
    size: 'small',
    id: 'basic-button',
    'aria-haspopup': 'true', // endIcon={<TodayIcon />}
    'aria-controls': 'basic-menu',
    onClick: handleOpenDateSelector,
    sx: {
      color: 'text.primary'
    },
    'aria-expanded': openDateSelector ? 'true' : undefined
  }, format(selectedDate, isMonthMode ? 'MMMM-yyyy' : 'PPP', {
    locale: dateFnsLocale
  })), /* #__PURE__ */React.createElement(IconButton, _extends({
    sx: {
      ml: 0.2
    }
  }, commonIconButtonProps, {
    onClick: function onClick () {
      return handleChangeDate(add)
    }
  }), /* #__PURE__ */React.createElement(ChevronRightIcon, null))), /* #__PURE__ */React.createElement(Hidden, {
    smUp: true
  }, /* #__PURE__ */React.createElement(IconButton, _extends({
    sx: {
      ml: 0,
      'aria-label': 'menu'
    }
  }, commonIconButtonProps, {
    size: 'small',
    onClick: handleOpenDateSelector
  }), /* #__PURE__ */React.createElement(TodayIcon, null))), /* #__PURE__ */React.createElement(Menu, {
    id: 'date-menu',
    anchorEl: anchorDateEl,
    open: openDateSelector,
    onClose: handleCloseDateSelector,
    MenuListProps: {
      'aria-labelledby': 'basic-button'
    }
  }, /* #__PURE__ */React.createElement(LocalizationProvider, {
    locale: dateFnsLocale,
    dateAdapter: AdapterDateFns
  }, /* #__PURE__ */React.createElement(StaticDatePicker, {
    displayStaticWrapperAs: 'desktop',
    value: selectedDate,
    onChange: function onChange (newValue) {
      setDaysInMonth(getDaysInMonth(newValue))
      setSelectedDate(newValue)
      handleCloseDateSelector()
    },
    renderInput: function renderInput (params) {
      return /* #__PURE__ */React.createElement(TextField, params)
    }
  }))))), /* #__PURE__ */React.createElement(Grid, {
    item: true,
    xs: true,
    sm: true,
    md: true,
    sx: {
      textAlign: 'right'
    }
  }, /* #__PURE__ */React.createElement(Stack, {
    direction: 'row',
    sx: {
      pr: 0.5,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  }, (toolbarProps === null || toolbarProps === void 0 ? void 0 : toolbarProps.showSearchBar) && /* #__PURE__ */React.createElement(ToolbarSearchbar, {
    events,
    onInputChange: function onInputChange (newValue) {
      let newDate = new Date()

      if (newValue !== null && newValue !== void 0 && newValue.date) {
        newDate = parse(newValue.date, 'yyyy-MM-dd', today)
      }

      setDaysInMonth(getDaysInMonth(newDate))
      setSelectedDate(newDate)
      setSearchResult(newValue)
    }
  }), /* #__PURE__ */React.createElement(Hidden, {
    mdUp: true
  }, /* #__PURE__ */React.createElement(IconButton, _extends({
    sx: {
      mr: 0,
      'aria-label': 'menu'
    }
  }, commonIconButtonProps, {
    size: 'small',
    onClick: handleOpenDateSelector
  }), /* #__PURE__ */React.createElement(GridViewIcon, null))), /* #__PURE__ */React.createElement(Hidden, {
    mdDown: true
  }, (toolbarProps === null || toolbarProps === void 0 ? void 0 : toolbarProps.showSwitchModeButtons) && /* #__PURE__ */React.createElement(ToggleButtonGroup, {
    exclusive: true,
    value: mode,
    size: 'small',
    color: 'primary',
    'aria-label': 'text button group',
    sx: {
      mt: 0.2,
      mr: 1.3,
      display: 'contents'
    },
    onChange: function onChange (e, newMode) {
      setMode(newMode)
    }
  }, [{
    label: t('month'),
    value: 'month'
  }, {
    label: t('week'),
    value: 'week'
  }, {
    label: t('day'),
    value: 'day'
  }, {
    label: t('timeline'),
    value: 'timeline'
  }].map(function (tb) {
    return /* #__PURE__ */React.createElement(ToggleButton, {
      sx: {
        mt: 0.5
      },
      key: tb.value,
      value: tb.value
    }, tb.label)
  }))))), /* #__PURE__ */React.createElement(Grid, {
    item: true,
    xs: 12,
    sx: {}
  }, /* #__PURE__ */React.createElement(Menu, {
    id: 'menu-menu',
    open: openMenu,
    anchorEl: anchorMenuEl,
    onClose: handleCloseMenu,
    onClick: handleCloseMenu,
    transformOrigin: {
      horizontal: 'right',
      vertical: 'top'
    },
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom'
    }
  }, menus.map(function (menu, index) {
    return /* #__PURE__ */React.createElement(MenuItem, {
      key: menu.label
    }, /* #__PURE__ */React.createElement(ListItemIcon, null, menu.icon), /* #__PURE__ */React.createElement(Typography, {
      variant: 'body2'
    }, menu.label))
  }), /* #__PURE__ */React.createElement(Divider, null), /* #__PURE__ */React.createElement(MenuItem, null, /* #__PURE__ */React.createElement(ListItemIcon, null, /* #__PURE__ */React.createElement(SettingsIcon, {
    fontSize: 'small'
  })), /* #__PURE__ */React.createElement(Typography, {
    variant: 'body2'
  }, 'Settings'))), /* #__PURE__ */React.createElement(Collapse, {
    in: alertProps === null || alertProps === void 0 ? void 0 : alertProps.open
  }, /* #__PURE__ */React.createElement(Alert, {
    color: alertProps === null || alertProps === void 0 ? void 0 : alertProps.color,
    severity: alertProps === null || alertProps === void 0 ? void 0 : alertProps.severity,
    sx: {
      borderRadius: 0,
      mb: 0
    },
    action: alertProps !== null && alertProps !== void 0 && alertProps.showActionButton ? /* #__PURE__ */React.createElement(IconButton, {
      'aria-label': 'close',
      color: 'inherit',
      size: 'small',
      onClick: handleCloseAlert
    }, /* #__PURE__ */React.createElement(CloseIcon, {
      fontSize: 'inherit'
    })) : null
  }, alertProps === null || alertProps === void 0 ? void 0 : alertProps.message)))))
}

SchedulerToolbar.propTypes = {
  today: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  switchMode: PropTypes.string.isRequired,
  alertProps: PropTypes.object,
  toolbarProps: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  onSearchResult: PropTypes.func.isRequired,
  onAlertCloseButtonClicked: PropTypes.func.isRequired
}
SchedulerToolbar.defaultProps = {
  alertProps: {
    open: false,
    message: '',
    color: 'info',
    severity: 'info',
    showActionButton: true
  },
  toolbarProps: {
    showSearchBar: true,
    showSwitchModeButtons: true,
    showDatePicker: true,
    showOptions: false
  }
}

function EventItem (props) {
  const event = props.event
  const rowId = props.rowId
  const sx = props.sx
  const boxSx = props.boxSx
  const elevation = props.elevation
  props.isMonthMode
  const onClick = props.onClick
  const onDragStart = props.onDragStart
  return /* #__PURE__ */React.createElement(Paper, {
    sx,
    draggable: true,
    onClick,
    onDragStart,
    elevation: elevation || 0,
    key: 'item-d-'.concat(event === null || event === void 0 ? void 0 : event.id, '-').concat(rowId)
  }, /* #__PURE__ */React.createElement(Box, {
    sx: boxSx
  }, /* #__PURE__ */React.createElement(Typography, {
    variant: 'body2',
    sx: {
      fontSize: 11
    }
  }, event === null || event === void 0 ? void 0 : event.label)))
}

EventItem.propTypes = {
  sx: PropTypes.object,
  boxSx: PropTypes.object,
  event: PropTypes.object.isRequired,
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isMonthMode: PropTypes.bool,
  onClick: PropTypes.func,
  handleTaskClick: PropTypes.func,
  onCellDragStart: PropTypes.func
}

function ownKeys$3 (object, enumerableOnly) { const keys = Object.keys(object); if (Object.getOwnPropertySymbols) { let symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable })), keys.push.apply(keys, symbols) } return keys }

function _objectSpread$3 (target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)) }) } return target }
const StyledTableCell$2 = styled(TableCell)(function (_ref) {
  let _$concat2, _ref2

  const theme = _ref.theme
  return _ref2 = {}, _defineProperty(_ref2, '&.'.concat(tableCellClasses.head), _defineProperty({
    borderTop: '1px '.concat(theme.palette.divider, ' solid !important'),
    borderBottom: '1px '.concat(theme.palette.divider, ' solid !important'),
    borderLeft: '1px '.concat(theme.palette.divider, ' solid !important')
  }, '&:nth-of-type(1)', {
    borderLeft: '0px !important'
  })), _defineProperty(_ref2, '&.'.concat(tableCellClasses.body), (_$concat2 = {
    fontSize: 12,
    height: 96,
    width: 64,
    maxWidth: 64,
    cursor: 'pointer',
    verticalAlign: 'top',
    borderLeft: '1px '.concat(theme.palette.divider, ' solid')
  }, _defineProperty(_$concat2, '&:nth-of-type(7n+1)', {
    borderLeft: 0
  }), _defineProperty(_$concat2, '&:nth-of-type(even)', {// backgroundColor: theme.palette.action.hover
  }), _$concat2)), _defineProperty(_ref2, '&.'.concat(tableCellClasses.body, ':hover'), {// backgroundColor: "#eee"
  }), _ref2
})
const StyledTableRow$2 = styled(TableRow)(function (_ref3) {
  _ref3.theme
  return _defineProperty({}, '&:last-child td, &:last-child th', {
    border: 0
  })
})

function MonthModeView (props) {
  const rows = props.rows
  props.locale
  const options = props.options
  const columns = props.columns
  const legacyStyle = props.legacyStyle
  const searchResult = props.searchResult
  const onTaskClick = props.onTaskClick
  const onCellClick = props.onCellClick
  const onEventsChange = props.onEventsChange
  const theme = useTheme()

  const _useState = useState({})
  const _useState2 = _slicedToArray(_useState, 2)
  const state = _useState2[0]
  const setState = _useState2[1]

  const _useTranslation = useTranslation(['common'])
  _useTranslation.t

  const today = new Date()
  const currentDaySx = {
    width: 24,
    height: 22,
    margin: 'auto',
    display: 'block',
    paddingTop: '2px',
    borderRadius: '50%' // padding: '1px 7px',
    // width: 'fit-content'

  }

  const onCellDragOver = function onCellDragOver (e) {
    e.preventDefault()
  }

  const onCellDragStart = function onCellDragStart (e, item, rowIndex) {
    setState(_objectSpread$3(_objectSpread$3({}, state), {}, {
      itemTransfert: {
        item,
        rowIndex
      }
    }))
  }

  const onCellDragEnter = function onCellDragEnter (e, elementId, rowIndex) {
    e.preventDefault()
    setState(_objectSpread$3(_objectSpread$3({}, state), {}, {
      transfertTarget: {
        elementId,
        rowIndex
      }
    }))
  }

  const onCellDragEnd = function onCellDragEnd (e) {
    e.preventDefault()
    if (!state.itemTransfert && !state.transfertTarget) return
    const transfert = state.itemTransfert
    const transfertTarget = state.transfertTarget
    const rowsCopy = Array.from(rows)
    const rowInd = rowsCopy.findIndex(function (d) {
      return d.id === transfertTarget.rowIndex
    })

    if (rowInd !== -1) {
      let _rowsCopy$rowInd, _rowsCopy$rowInd$days

      const dayInd = (_rowsCopy$rowInd = rowsCopy[rowInd]) === null || _rowsCopy$rowInd === void 0
        ? void 0
        : (_rowsCopy$rowInd$days = _rowsCopy$rowInd.days) === null || _rowsCopy$rowInd$days === void 0
            ? void 0
            : _rowsCopy$rowInd$days.findIndex(function (d) {
              return d.id === transfertTarget.elementId
            })

      if (dayInd !== -1) {
        let _rowsCopy$rowInd2, _transfert$item, _transfert$item$date, _transfert$item2

        const day = (_rowsCopy$rowInd2 = rowsCopy[rowInd]) === null || _rowsCopy$rowInd2 === void 0 ? void 0 : _rowsCopy$rowInd2.days[dayInd]
        const splittedDate = transfert === null || transfert === void 0 ? void 0 : (_transfert$item = transfert.item) === null || _transfert$item === void 0 ? void 0 : (_transfert$item$date = _transfert$item.date) === null || _transfert$item$date === void 0 ? void 0 : _transfert$item$date.split('-')

        if (!(transfert !== null && transfert !== void 0 && (_transfert$item2 = transfert.item) !== null && _transfert$item2 !== void 0 && _transfert$item2.day)) {
          // Get day of the date (DD)
          transfert.item.day = parseInt(splittedDate[2])
        }

        if (transfert.item.day !== (day === null || day === void 0 ? void 0 : day.day)) {
          const itemCheck = day.data.findIndex(function (item) {
            return item.day === transfert.item.day && item.label === transfert.item.label
          })

          if (itemCheck === -1) {
            let _prevDayEvents$data, _prevDayEvents$data2

            const prevDayEvents = rowsCopy[transfert.rowIndex].days.find(function (d) {
              return d.day === transfert.item.day
            })
            const itemIndexToRemove = prevDayEvents === null || prevDayEvents === void 0
              ? void 0
              : (_prevDayEvents$data = prevDayEvents.data) === null || _prevDayEvents$data === void 0
                  ? void 0
                  : _prevDayEvents$data.findIndex(function (i) {
                    return i.id === transfert.item.id
                  })

            if (itemIndexToRemove === undefined || itemIndexToRemove === -1) {
              return
            }

            prevDayEvents === null || prevDayEvents === void 0 ? void 0 : (_prevDayEvents$data2 = prevDayEvents.data) === null || _prevDayEvents$data2 === void 0 ? void 0 : _prevDayEvents$data2.splice(itemIndexToRemove, 1)
            transfert.item.day = day === null || day === void 0 ? void 0 : day.day
            transfert.item.date = format(day === null || day === void 0 ? void 0 : day.date, 'yyyy-MM-dd')
            day.data.push(transfert.item)
            setState(_objectSpread$3(_objectSpread$3({}, state), {}, {
              rows: rowsCopy,
              itemTransfert: null,
              transfertTarget: null
            }))
            onEventsChange && onEventsChange(transfert.item)
          }
        }
      }
    }
  }

  const handleCellClick = function handleCellClick (event, row, day) {
    let _day$data

    event.preventDefault()
    event.stopPropagation()

    if ((day === null || day === void 0 ? void 0 : (_day$data = day.data) === null || _day$data === void 0 ? void 0 : _day$data.length) === 0 && onCellClick) {
      onCellClick(event, row, day)
    }
  }
  /**
   * @name renderTask
   * @description
   * @param tasks
   * @param rowId
   * @return {unknown[] | undefined}
   */

  const renderTask = function renderTask () {
    const tasks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
    const rowId = arguments.length > 1 ? arguments[1] : undefined
    return tasks === null || tasks === void 0 ? void 0 : tasks.map(function (task, index) {
      const condition = searchResult ? (task === null || task === void 0 ? void 0 : task.groupLabel) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.groupLabel) || (task === null || task === void 0 ? void 0 : task.user) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.user) : !searchResult
      return condition && /* #__PURE__ */React.createElement(EventItem, {
        isMonthMode: true,
        event: task,
        rowId,
        elevation: 0,
        boxSx: {
          px: 0.5
        },
        key: 'item-d-'.concat(task === null || task === void 0 ? void 0 : task.id, '-').concat(rowId),
        onClick: function onClick (e) {
          return handleTaskClick(e, task)
        },
        onDragStart: function onDragStart (e) {
          return onCellDragStart(e, task, rowId)
        },
        sx: {
          width: '100%',
          py: 0,
          my: 0.3,
          color: '#fff',
          display: 'inline-flex',
          backgroundColor: (task === null || task === void 0 ? void 0 : task.color) || theme.palette.primary.light
        }
      })
    })
  }
  /**
   * @name handleTaskClick
   * @description
   * @param event
   * @param task
   * @return void
   */

  var handleTaskClick = function handleTaskClick (event, task) {
    event.preventDefault()
    event.stopPropagation()
    onTaskClick && onTaskClick(event, task)
  }

  return /* #__PURE__ */React.createElement(TableContainer, {
    component: Paper,
    sx: {
      boxShadow: 'none'
    }
  }, /* #__PURE__ */React.createElement(Table, {
    size: 'small',
    'aria-label': 'simple table',
    stickyHeader: true,
    sx: {
      minWidth: (options === null || options === void 0 ? void 0 : options.minWidth) || 650
    }
  }, legacyStyle && /* #__PURE__ */React.createElement(TableHead, {
    sx: {
      height: 24
    }
  }, /* #__PURE__ */React.createElement(StyledTableRow$2, null, columns === null || columns === void 0 ? void 0 : columns.map(function (column, index) {
    return /* #__PURE__ */React.createElement(StyledTableCell$2, {
      align: 'center',
      key: (column === null || column === void 0 ? void 0 : column.headerName) + '-' + index
    }, column === null || column === void 0 ? void 0 : column.headerName)
  }))), /* #__PURE__ */React.createElement(TableBody, null, rows === null || rows === void 0 ? void 0 : rows.map(function (row, index) {
    let _row$days

    return /* #__PURE__ */React.createElement(StyledTableRow$2, {
      key: 'row-'.concat(row.id, '-').concat(index),
      sx: {
        '&:last-child th': {
          border: 0,
          borderLeft: '1px '.concat(theme.palette.divider, ' solid'),
          '&:firs-child': {
            borderLeft: 0
          }
        }
      }
    }, row === null || row === void 0 ? void 0 : (_row$days = row.days) === null || _row$days === void 0 ? void 0 : _row$days.map(function (day, indexD) {
      let _columns$indexD, _columns$indexD$heade, _day$data2, _day$data3
      // Suponiendo que 'day.date' es un objeto Date en la zona horaria UTC
      // y quieres compararlo con la fecha actual en la zona horaria de la Ciudad de México

      const today = new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' })
      const mexicoToday = new Date(today)

      // Función para verificar si es el mismo mes y año (ajustar según sea necesario)
      function isSameMonthAndYear (date1, date2) {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
      }

      // Ahora, usando mexicoToday para comparaciones
      const currentDay = day.date.getDate() === mexicoToday.getDate() && isSameMonthAndYear(day.date, mexicoToday)

      return /* #__PURE__ */React.createElement(StyledTableCell$2, {
        scope: 'row',
        align: 'center',
        component: 'th',
        sx: {
          px: 0.5,
          position: 'relative'
        },
        key: 'day-'.concat(day.id),
        onDragEnd: onCellDragEnd,
        onDragOver: onCellDragOver,
        onDragEnter: function onDragEnter (e) {
          return onCellDragEnter(e, day.id, row.id)
        },
        onClick: function onClick (event) {
          return handleCellClick(event, row, day)
        }
      }, /* #__PURE__ */React.createElement(Box, {
        sx: {
          height: '100%',
          overflowY: 'visible'
        }
      }, !legacyStyle && index === 0 && ((_columns$indexD = columns[indexD]) === null || _columns$indexD === void 0 ? void 0 : (_columns$indexD$heade = _columns$indexD.headerName) === null || _columns$indexD$heade === void 0 ? void 0 : _columns$indexD$heade.toUpperCase()), '.', /* #__PURE__ */React.createElement(Typography, {
        variant: 'body2',
        sx: _objectSpread$3(_objectSpread$3({}, currentDaySx), {}, {
          background: currentDay && alpha(theme.palette.primary.main, 1),
          color: currentDay && '#fff'
        })
      }, day.day), (day === null || day === void 0 ? void 0 : (_day$data2 = day.data) === null || _day$data2 === void 0 ? void 0 : _day$data2.length) > 0 && renderTask(day === null || day === void 0 ? void 0 : day.data, row.id), legacyStyle && (day === null || day === void 0 ? void 0 : (_day$data3 = day.data) === null || _day$data3 === void 0 ? void 0 : _day$data3.length) === 0 && /* #__PURE__ */React.createElement(EventNoteRoundedIcon, {
        fontSize: 'small',
        htmlColor: theme.palette.divider
      })))
    }))
  }))))
}

MonthModeView.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  date: PropTypes.string,
  options: PropTypes.object,
  onDateChange: PropTypes.func,
  onTaskClick: PropTypes.func,
  onCellClick: PropTypes.func
}
MonthModeView.defaultProps = {
  columns: [],
  rows: []
}

function ownKeys$2 (object, enumerableOnly) { const keys = Object.keys(object); if (Object.getOwnPropertySymbols) { let symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable })), keys.push.apply(keys, symbols) } return keys }

function _objectSpread$2 (target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)) }) } return target }
const StyledTableCell$1 = styled(TableCell)(function (_ref) {
  let _$concat2, _ref2

  _ref.theme
  return _ref2 = {}, _defineProperty(_ref2, '&.'.concat(tableCellClasses.head), _defineProperty({
    paddingLeft: 4,
    paddingRight: 4,
    borderTop: '1px solid #ccc !important',
    borderBottom: '1px solid #ccc !important',
    borderLeft: '1px solid #ccc !important'
  }, '&:nth-of-type(1)', {
    borderLeft: '0px !important'
  })), _defineProperty(_ref2, '&.'.concat(tableCellClasses.body), (_$concat2 = {
    fontSize: 12,
    height: 16,
    width: 128,
    maxWidth: 128,
    cursor: 'pointer',
    borderLeft: '1px solid #ccc'
  }, _defineProperty(_$concat2, '&:nth-of-type(1)', {
    width: 80,
    maxWidth: 80
  }), _defineProperty(_$concat2, '&:nth-of-type(8n+1)', {
    borderLeft: 0
  }), _$concat2)), _defineProperty(_ref2, '&.'.concat(tableCellClasses.body, ':hover'), {
    backgroundColor: '#eee'
  }), _ref2
})
const StyledTableRow$1 = styled(TableRow)(function (_ref3) {
  _ref3.theme
  return _defineProperty({}, '&:last-child td, &:last-child th', {
    border: 0
  })
})
const StyledTableContainer$1 = styled(TableContainer)(function (_ref5) {
  let _ref6

  _ref5.theme
  return _ref6 = {}, _defineProperty(_ref6, '&::-webkit-scrollbar', {
    width: 7,
    height: 6
  }), _defineProperty(_ref6, '&::-webkit-scrollbar-track', {
    WebkitBoxShadow: 'inset 0 0 6px rgb(125, 161, 196, 0.5)'
  }), _defineProperty(_ref6, '&::-webkit-scrollbar-thumb', {
    WebkitBorderRadius: 4,
    borderRadius: 4,
    background: 'rgba(0, 172, 193, .5)',
    WebkitBoxShadow: 'inset 0 0 6px rgba(25, 118, 210, .5)'
  }), _defineProperty(_ref6, '&::-webkit-scrollbar-thumb:window-inactive', {
    background: 'rgba(125, 161, 196, 0.5)'
  }), _ref6
})

function WeekModeView (props) {
  const options = props.options
  const columns = props.columns
  const rows = props.rows
  const searchResult = props.searchResult
  const onTaskClick = props.onTaskClick
  const onCellClick = props.onCellClick
  const onEventsChange = props.onEventsChange
  const theme = useTheme()

  const _useState = useState({
    columns,
    rows
  })
  const _useState2 = _slicedToArray(_useState, 2)
  const state = _useState2[0]
  const setState = _useState2[1]

  const onCellDragOver = function onCellDragOver (e) {
    e.preventDefault()
  }

  const onCellDragStart = function onCellDragStart (e, item, rowLabel, rowIndex, dayIndex) {
    setState(_objectSpread$2(_objectSpread$2({}, state), {}, {
      itemTransfert: {
        item,
        rowLabel,
        rowIndex,
        dayIndex
      }
    }))
  }

  const onCellDragEnter = function onCellDragEnter (e, rowLabel, rowIndex, dayIndex) {
    e.preventDefault()
    setState(_objectSpread$2(_objectSpread$2({}, state), {}, {
      transfertTarget: {
        rowLabel,
        rowIndex,
        dayIndex
      }
    }))
  }

  const onCellDragEnd = function onCellDragEnd (e) {
    let _rowsData$transfertTa

    e.preventDefault()

    if (!state.itemTransfert || !state.transfertTarget) {
      return
    }

    const transfert = state.itemTransfert
    const transfertTarget = state.transfertTarget
    const rowsData = Array.from(rows)
    const day = (_rowsData$transfertTa = rowsData[transfertTarget.rowIndex]) === null || _rowsData$transfertTa === void 0 ? void 0 : _rowsData$transfertTa.days[transfertTarget.dayIndex]

    if (day) {
      let _transfertTarget$rowL, _prevEventCell$data

      const hourRegExp = /[0-9]{2}:[0-9]{2}/
      const foundEventIndex = day.data.findIndex(function (e) {
        return e.id === transfert.item.id && e.startHour === transfert.item.startHour && e.endHour === transfert.item.endHour
      }) // Task already exists in the data array of the chosen cell

      if (foundEventIndex !== -1) {
        return
      } // Event cell item to transfert

      const prevEventCell = rowsData[transfert.rowIndex].days[transfert.dayIndex] // Timeline label (00:00 am, 01:00 am, etc.)

      const label = (_transfertTarget$rowL = transfertTarget.rowLabel) === null || _transfertTarget$rowL === void 0 ? void 0 : _transfertTarget$rowL.toUpperCase()
      const hourLabel = hourRegExp.exec(label)[0] // Event's end hour

      const endHour = hourRegExp.exec(transfert.item.endHour)[0]
      const endHourDate = parse(endHour, 'HH:mm', day.date) // Event start hour

      const startHour = hourRegExp.exec(transfert.item.startHour)[0]
      let startHourDate = parse(startHour, 'HH:mm', day.date) // Minutes difference between end and start event hours

      let minutesDiff = differenceInMinutes(endHourDate, startHourDate) // New event end hour according to it new cell

      let newEndHour = add(parse(hourLabel, 'HH:mm', day.date), {
        minutes: minutesDiff
      })

      if (!isValid(startHourDate)) {
        startHourDate = day.date
        minutesDiff = differenceInMinutes(endHourDate, startHourDate)
        newEndHour = add(parse(hourLabel, 'HH:mm', day.date), {
          minutes: minutesDiff
        })
      }

      prevEventCell === null || prevEventCell === void 0 ? void 0 : (_prevEventCell$data = prevEventCell.data) === null || _prevEventCell$data === void 0 ? void 0 : _prevEventCell$data.splice(transfert.item.itemIndex, 1)
      transfert.item.startHour = label
      transfert.item.endHour = format(newEndHour, 'HH:mm aaa')
      transfert.item.date = format(day.date, 'yyyy-MM-dd')
      day.data.push(transfert.item)
      setState(_objectSpread$2(_objectSpread$2({}, state), {}, {
        rows: rowsData
      }))
      onEventsChange && onEventsChange(transfert.item)
    }
  }

  const handleCellClick = function handleCellClick (event, row, day) {
    event.preventDefault()
    event.stopPropagation() // setState({...state, activeItem: day})

    onCellClick && onCellClick(event, row, day)
  }
  /**
   * @name renderTask
   * @description
   * @param tasks
   * @param rowLabel
   * @param rowIndex
   * @param dayIndex
   * @return {unknown[] | undefined}
   */

  const renderTask = function renderTask (tasks, rowLabel, rowIndex, dayIndex) {
    return tasks === null || tasks === void 0 ? void 0 : tasks.map(function (task, itemIndex) {
      const condition = searchResult ? (task === null || task === void 0 ? void 0 : task.groupLabel) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.groupLabel) || (task === null || task === void 0 ? void 0 : task.user) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.user) : !searchResult
      return condition && /* #__PURE__ */React.createElement(EventItem, {
        event: task,
        elevation: 0,
        boxSx: {
          px: 0.3
        },
        onClick: function onClick (e) {
          return handleTaskClick(e, task)
        },
        key: 'item_id-'.concat(itemIndex, '_r-').concat(rowIndex, '_d-').concat(dayIndex),
        onDragStart: function onDragStart (e) {
          return onCellDragStart(e, _objectSpread$2(_objectSpread$2({}, task), {}, {
            itemIndex
          }), rowLabel, rowIndex, dayIndex)
        },
        sx: {
          py: 0,
          mb: 0.5,
          color: '#fff',
          backgroundColor: (task === null || task === void 0 ? void 0 : task.color) || theme.palette.primary.light
        }
      })
    })
  }
  /**
   * @name handleTaskClick
   * @description
   * @param event
   * @param task
   * @return void
   */

  var handleTaskClick = function handleTaskClick (event, task) {
    event.preventDefault()
    event.stopPropagation()
    onTaskClick && onTaskClick(event, task)
  }

  return /* #__PURE__ */React.createElement(StyledTableContainer$1, {
    component: Paper,
    sx: {
      maxHeight: (options === null || options === void 0 ? void 0 : options.maxHeight) || 540
    }
  }, /* #__PURE__ */React.createElement(Table, {
    size: 'small',
    'aria-label': 'simple table',
    stickyHeader: true,
    sx: {
      minWidth: options.minWidth || 540
    }
  }, /* #__PURE__ */React.createElement(TableHead, {
    sx: {
      height: 24
    }
  }, /* #__PURE__ */React.createElement(StyledTableRow$1, null, /* #__PURE__ */React.createElement(StyledTableCell$1, {
    align: 'left'
  }), columns === null || columns === void 0 ? void 0 : columns.map(function (column, index) {
    return /* #__PURE__ */React.createElement(StyledTableCell$1, {
      align: 'center',
      key: 'weekday-'.concat(column === null || column === void 0 ? void 0 : column.day, '-').concat(index)
    }, column === null || column === void 0 ? void 0 : column.weekDay, ' ', column === null || column === void 0 ? void 0 : column.month, '/', column === null || column === void 0 ? void 0 : column.day)
  }))), /* #__PURE__ */React.createElement(TableBody, null, rows === null || rows === void 0 ? void 0 : rows.map(function (row, rowIndex) {
    let _row$days, _row$data, _row$days2

    const lineTasks = (_row$days = row.days) === null || _row$days === void 0
      ? void 0
      : _row$days.reduce(function (prev, curr) {
        let _curr$data

        return prev + (curr === null || curr === void 0 ? void 0 : (_curr$data = curr.data) === null || _curr$data === void 0 ? void 0 : _curr$data.length)
      }, 0)
    return /* #__PURE__ */React.createElement(StyledTableRow$1, {
      key: 'timeline-'.concat(rowIndex),
      sx: {
        '&:last-child td, &:last-child th': {
          border: 0
        }
      }
    }, /* #__PURE__ */React.createElement(Tooltip, {
      placement: 'right',
      title: ''.concat(lineTasks, ' event').concat(lineTasks > 1 ? 's' : '', ' on this week timeline')
    }, /* #__PURE__ */React.createElement(StyledTableCell$1, {
      scope: 'row',
      align: 'center',
      component: 'th',
      sx: {
        px: 1
      },
      onClick: function onClick (event) {
        return handleCellClick(event, row)
      }
    }, /* #__PURE__ */React.createElement(Typography, {
      variant: 'body2'
    }, row === null || row === void 0 ? void 0 : row.label), (row === null || row === void 0 ? void 0 : (_row$data = row.data) === null || _row$data === void 0 ? void 0 : _row$data.length) > 0 && renderTask(row === null || row === void 0 ? void 0 : row.data, row.id))), row === null || row === void 0 ? void 0 : (_row$days2 = row.days) === null || _row$days2 === void 0 ? void 0 : _row$days2.map(function (day, dayIndex) {
      let _day$data

      return /* #__PURE__ */React.createElement(StyledTableCell$1, {
        key: day === null || day === void 0 ? void 0 : day.id,
        scope: 'row',
        align: 'center',
        component: 'th',
        sx: {
          px: 0.3,
          py: 0.5 // backgroundColor: (
          //  state?.activeItem?.id === day?.id ? theme.palette.action.hover : 'inherit'
          // )

        },
        onDragEnd: onCellDragEnd,
        onDragOver: onCellDragOver,
        onDragEnter: function onDragEnter (e) {
          return onCellDragEnter(e, row === null || row === void 0 ? void 0 : row.label, rowIndex, dayIndex)
        },
        onClick: function onClick (event) {
          return handleCellClick(event, _objectSpread$2({
            rowIndex
          }, row), _objectSpread$2({
            dayIndex
          }, day))
        }
      }, (day === null || day === void 0 ? void 0 : (_day$data = day.data) === null || _day$data === void 0 ? void 0 : _day$data.length) > 0 && renderTask(day === null || day === void 0 ? void 0 : day.data, row === null || row === void 0 ? void 0 : row.label, rowIndex, dayIndex))
    }))
  }))))
}

WeekModeView.propTypes = {
  events: PropTypes.array,
  columns: PropTypes.array,
  rows: PropTypes.array,
  date: PropTypes.string,
  options: PropTypes.object,
  searchResult: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onCellClick: PropTypes.func.isRequired,
  onEventsChange: PropTypes.func.isRequired
}
WeekModeView.defaultProps = {}

function ownKeys$1 (object, enumerableOnly) { const keys = Object.keys(object); if (Object.getOwnPropertySymbols) { let symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable })), keys.push.apply(keys, symbols) } return keys }

function _objectSpread$1 (target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)) }) } return target }
const StyledTableCell = styled$1(TableCell)(function (_ref) {
  let _ref2

  _ref.theme
  return _ref2 = {}, _defineProperty(_ref2, '&.'.concat(tableCellClasses.head), _defineProperty({
    paddingLeft: 4,
    paddingRight: 4,
    borderTop: '1px solid #ccc !important',
    borderBottom: '1px solid #ccc !important',
    borderLeft: '1px solid #ccc !important'
  }, '&:nth-of-type(1)', {
    borderLeft: '0px !important'
  })), _defineProperty(_ref2, '&.'.concat(tableCellClasses.body), _defineProperty({
    fontSize: 12,
    height: 16,
    width: 128,
    maxWidth: 128,
    cursor: 'pointer',
    borderLeft: '1px solid #ccc'
  }, '&:nth-of-type(1)', {
    borderLeft: 0
  })), _defineProperty(_ref2, '&.'.concat(tableCellClasses.body, ':hover'), {
    backgroundColor: '#eee'
  }), _ref2
})
const StyledTableRow = styled$1(TableRow)(function (_ref3) {
  _ref3.theme
  return _defineProperty({}, '&:last-child td, &:last-child th', {
    border: 0
  })
})
const StyledTableContainer = styled$1(TableContainer)(function (_ref5) {
  let _ref6

  _ref5.theme
  return _ref6 = {}, _defineProperty(_ref6, '&::-webkit-scrollbar', {
    width: 7,
    height: 6
  }), _defineProperty(_ref6, '&::-webkit-scrollbar-track', {
    WebkitBoxShadow: 'inset 0 0 6px rgb(125, 161, 196, 0.5)'
  }), _defineProperty(_ref6, '&::-webkit-scrollbar-thumb', {
    WebkitBorderRadius: 4,
    borderRadius: 4,
    background: 'rgba(0, 172, 193, .5)',
    WebkitBoxShadow: 'inset 0 0 6px rgba(25, 118, 210, .5)'
  }), _defineProperty(_ref6, '&::-webkit-scrollbar-thumb:window-inactive', {
    background: 'rgba(125, 161, 196, 0.5)'
  }), _ref6
})

function DayModeView (props) {
  const options = props.options
  const columns = props.columns
  const rows = props.rows
  const searchResult = props.searchResult
  const onTaskClick = props.onTaskClick
  const onCellClick = props.onCellClick
  const onEventsChange = props.onEventsChange
  const theme = useTheme()

  const _useState = useState({
    columns,
    rows
  })
  const _useState2 = _slicedToArray(_useState, 2)
  const state = _useState2[0]
  const setState = _useState2[1]
  /**
   * @name onCellDragOver
   * @param e
   * @return void
   */

  const onCellDragOver = function onCellDragOver (e) {
    e.preventDefault()
  }
  /**
   * @name onCellDragStart
   * @description
   * @param e
   * @param item
   * @param rowLabel
   * @param rowIndex
   * @param dayIndex
   * @return void
   */

  const onCellDragStart = function onCellDragStart (e, item, rowLabel, rowIndex, dayIndex) {
    setState(_objectSpread$1(_objectSpread$1({}, state), {}, {
      itemTransfert: {
        item,
        rowLabel,
        rowIndex,
        dayIndex
      }
    }))
  }
  /**
   * @name onCellDragEnter
   * @description
   * @param e
   * @param rowLabel
   * @param rowIndex
   * @param dayIndex
   * @return void
   */

  const onCellDragEnter = function onCellDragEnter (e, rowLabel, rowIndex, dayIndex) {
    e.preventDefault()
    setState(_objectSpread$1(_objectSpread$1({}, state), {}, {
      transfertTarget: {
        rowLabel,
        rowIndex,
        dayIndex
      }
    }))
  }
  /**
   * @name onCellDragEnd
   * @description
   * @param e
   * @return void
   */

  const onCellDragEnd = function onCellDragEnd (e) {
    let _rowsData$transfertTa

    e.preventDefault()

    if (!state.itemTransfert || !state.transfertTarget) {
      return
    }

    const transfert = state.itemTransfert
    const transfertTarget = state.transfertTarget
    const rowsData = Array.from(rows)
    const day = (_rowsData$transfertTa = rowsData[transfertTarget.rowIndex]) === null || _rowsData$transfertTa === void 0 ? void 0 : _rowsData$transfertTa.days[transfertTarget.dayIndex]

    if (day) {
      let _transfertTarget$rowL, _prevEventCell$data, _transfert$item

      const hourRegExp = /[0-9]{2}:[0-9]{2}/
      const foundEventIndex = day.data.findIndex(function (e) {
        return e.id === transfert.item.id && e.startHour === transfert.item.startHour && e.endHour === transfert.item.endHour
      }) // Task already exists in the data array of the chosen cell

      if (foundEventIndex !== -1) {
        return
      } // Event cell item to transfert

      const prevEventCell = rowsData[transfert.rowIndex].days[transfert.dayIndex] // Timeline label (00:00 am, 01:00 am, etc.)

      const label = (_transfertTarget$rowL = transfertTarget.rowLabel) === null || _transfertTarget$rowL === void 0 ? void 0 : _transfertTarget$rowL.toUpperCase()
      const hourLabel = hourRegExp.exec(label)[0] // Event's end hour

      const endHour = hourRegExp.exec(transfert.item.endHour)[0]
      const endHourDate = parse(endHour, 'HH:mm', day.date) // Event start hour

      const startHour = hourRegExp.exec(transfert.item.startHour)[0]
      let startHourDate = parse(startHour, 'HH:mm', day.date) // Minutes difference between end and start event hours

      let minutesDiff = differenceInMinutes(endHourDate, startHourDate) // New event end hour according to it new cell

      let newEndHour = add(parse(hourLabel, 'HH:mm', day.date), {
        minutes: minutesDiff
      })

      if (!isValid(startHourDate)) {
        startHourDate = day.date
        minutesDiff = differenceInMinutes(endHourDate, startHourDate)
        newEndHour = add(parse(hourLabel, 'HH:mm', day.date), {
          minutes: minutesDiff
        })
      }

      prevEventCell === null || prevEventCell === void 0 ? void 0 : (_prevEventCell$data = prevEventCell.data) === null || _prevEventCell$data === void 0 ? void 0 : _prevEventCell$data.splice(transfert === null || transfert === void 0 ? void 0 : (_transfert$item = transfert.item) === null || _transfert$item === void 0 ? void 0 : _transfert$item.itemIndex, 1)
      transfert.item.startHour = label
      transfert.item.endHour = format(newEndHour, 'HH:mm aaa')
      transfert.item.date = format(day.date, 'yyyy-MM-dd')
      day.data.push(transfert.item)
      setState(_objectSpread$1(_objectSpread$1({}, state), {}, {
        rows: rowsData
      }))
      onEventsChange && onEventsChange(transfert.item)
    }
  }
  /**
   * @name handleCellClick
   * @description
   * @param event
   * @param row
   * @param day
   * @return void
   */

  const handleCellClick = function handleCellClick (event, row, day) {
    event.preventDefault()
    event.stopPropagation() // setState({...state, activeItem: day})

    onCellClick && onCellClick(event, row, day)
  }
  /**
   * @name renderTask
   * @description
   * @param tasks
   * @param rowLabel
   * @param rowIndex
   * @param dayIndex
   * @return {unknown[] | undefined}
   */

  const renderTask = function renderTask (tasks, rowLabel, rowIndex, dayIndex) {
    return tasks === null || tasks === void 0 ? void 0 : tasks.map(function (task, itemIndex) {
      const condition = searchResult ? (task === null || task === void 0 ? void 0 : task.groupLabel) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.groupLabel) || (task === null || task === void 0 ? void 0 : task.user) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.user) : !searchResult
      return condition && /* #__PURE__ */React.createElement(EventItem, {
        draggable: true,
        event: task,
        elevation: 0,
        boxSx: {
          px: 0.3
        },
        onClick: function onClick (e) {
          return handleTaskClick(e, task)
        },
        key: 'item_id-'.concat(itemIndex, '_r-').concat(rowIndex, '_d-').concat(dayIndex),
        onDragStart: function onDragStart (e) {
          return onCellDragStart(e, _objectSpread$1(_objectSpread$1({}, task), {}, {
            itemIndex
          }), rowLabel, rowIndex, dayIndex)
        },
        sx: {
          py: 0,
          mb: 0.5,
          color: '#fff',
          backgroundColor: (task === null || task === void 0 ? void 0 : task.color) || theme.palette.primary.light
        }
      })
    })
  }
  /**
   * @name handleTaskClick
   * @description
   * @param event
   * @param task
   * @return void
   */

  var handleTaskClick = function handleTaskClick (event, task) {
    event.preventDefault()
    event.stopPropagation()
    onTaskClick && onTaskClick(event, task)
  }

  return /* #__PURE__ */React.createElement(StyledTableContainer, {
    component: Paper,
    sx: {
      maxHeight: (options === null || options === void 0 ? void 0 : options.maxHeight) || 540
    }
  }, /* #__PURE__ */React.createElement(Table, {
    size: 'small',
    'aria-label': 'simple table',
    stickyHeader: true,
    sx: {
      minWidth: options.minWidth || 540
    }
  }, /* #__PURE__ */React.createElement(TableHead, {
    sx: {
      height: 24
    }
  }, /* #__PURE__ */React.createElement(StyledTableRow, null, /* #__PURE__ */React.createElement(StyledTableCell, {
    align: 'left'
  }), columns === null || columns === void 0 ? void 0 : columns.map(function (column, index) {
    return /* #__PURE__ */React.createElement(StyledTableCell, {
      align: 'center',
      colSpan: 2,
      key: 'weekday-'.concat(column === null || column === void 0 ? void 0 : column.day, '-').concat(index)
    }, column === null || column === void 0 ? void 0 : column.weekDay, ' ', column === null || column === void 0 ? void 0 : column.month, '/', column === null || column === void 0 ? void 0 : column.day)
  }))), /* #__PURE__ */React.createElement(TableBody, null, rows === null || rows === void 0 ? void 0 : rows.map(function (row, rowIndex) {
    let _row$days, _row$data, _row$days2

    const lineTasks = (_row$days = row.days) === null || _row$days === void 0
      ? void 0
      : _row$days.reduce(function (prev, curr) {
        let _curr$data

        return prev + (curr === null || curr === void 0 ? void 0 : (_curr$data = curr.data) === null || _curr$data === void 0 ? void 0 : _curr$data.length)
      }, 0)
    return /* #__PURE__ */React.createElement(StyledTableRow, {
      key: 'timeline-'.concat(rowIndex),
      sx: {
        '&:last-child td, &:last-child th': {
          border: 0
        }
      }
    }, /* #__PURE__ */React.createElement(Tooltip, {
      placement: 'right',
      title: ''.concat(lineTasks, ' event').concat(lineTasks > 1 ? 's' : '', ' on this week timeline')
    }, /* #__PURE__ */React.createElement(StyledTableCell, {
      scope: 'row',
      align: 'center',
      component: 'th',
      sx: {
        px: 1
      },
      onClick: function onClick (event) {
        return handleCellClick(event, row)
      }
    }, /* #__PURE__ */React.createElement(Typography, {
      variant: 'body2'
    }, row === null || row === void 0 ? void 0 : row.label), (row === null || row === void 0 ? void 0 : (_row$data = row.data) === null || _row$data === void 0 ? void 0 : _row$data.length) > 0 && renderTask(row === null || row === void 0 ? void 0 : row.data, row.id))), row === null || row === void 0 ? void 0 : (_row$days2 = row.days) === null || _row$days2 === void 0 ? void 0 : _row$days2.map(function (day, dayIndex) {
      let _day$data

      return /* #__PURE__ */React.createElement(StyledTableCell, {
        key: day === null || day === void 0 ? void 0 : day.id,
        scope: 'row',
        align: 'center',
        component: 'th',
        colSpan: 2,
        sx: {
          px: 0.3,
          py: 0.5
        },
        onDragEnd: onCellDragEnd,
        onDragOver: onCellDragOver,
        onDragEnter: function onDragEnter (e) {
          return onCellDragEnter(e, row === null || row === void 0 ? void 0 : row.label, rowIndex, dayIndex)
        },
        onClick: function onClick (event) {
          return handleCellClick(event, _objectSpread$1({
            rowIndex
          }, row), _objectSpread$1({
            dayIndex
          }, day))
        }
      }, (day === null || day === void 0 ? void 0 : (_day$data = day.data) === null || _day$data === void 0 ? void 0 : _day$data.length) > 0 && renderTask(day === null || day === void 0 ? void 0 : day.data, row === null || row === void 0 ? void 0 : row.label, rowIndex, dayIndex))
    }))
  }))))
}

DayModeView.propTypes = {
  events: PropTypes.array,
  columns: PropTypes.array,
  rows: PropTypes.array,
  date: PropTypes.string,
  options: PropTypes.object,
  searchResult: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onCellClick: PropTypes.func.isRequired,
  onEventsChange: PropTypes.func.isRequired
}
DayModeView.defaultProps = {}

const StyledContainer = styled(Typography)(function (_ref) {
  let _ref2

  _ref.theme
  return _ref2 = {}, _defineProperty(_ref2, '&::-webkit-scrollbar', {
    width: 7,
    height: 6
  }), _defineProperty(_ref2, '&::-webkit-scrollbar-track', {
    WebkitBoxShadow: 'inset 0 0 6px rgb(125, 161, 196, 0.5)'
  }), _defineProperty(_ref2, '&::-webkit-scrollbar-thumb', {
    WebkitBorderRadius: 4,
    borderRadius: 4,
    background: 'rgba(0, 172, 193, .5)',
    WebkitBoxShadow: 'inset 0 0 6px rgba(25, 118, 210, .5)'
  }), _defineProperty(_ref2, '&::-webkit-scrollbar-thumb:window-inactive', {
    background: 'rgba(125, 161, 196, 0.5)'
  }), _ref2
})

function TimeLineModeView (props) {
  let _fileredEvents2

  const options = props.options
  const rows = props.rows
  const searchResult = props.searchResult
  const onTaskClick = props.onTaskClick
  const dateFnsLocale = useContext(DateFnsLocaleContext)
  /**
   * @name handleTaskClick
   * @description
   * @param e
   * @param event
   * @return void
   */

  const handleTaskClick = function handleTaskClick (event, task) {
    event.preventDefault()
    event.stopPropagation()
    onTaskClick && onTaskClick(event, task)
  }

  let fileredEvents = rows === null || rows === void 0
    ? void 0
    : rows.sort(function (a, b) {
      let _b$startHour

      return -(b === null || b === void 0 ? void 0 : (_b$startHour = b.startHour) === null || _b$startHour === void 0 ? void 0 : _b$startHour.localeCompare(a === null || a === void 0 ? void 0 : a.startHour))
    })

  if (searchResult) {
    let _fileredEvents

    fileredEvents = (_fileredEvents = fileredEvents) === null || _fileredEvents === void 0
      ? void 0
      : _fileredEvents.filter(function (event) {
        return (event === null || event === void 0 ? void 0 : event.groupLabel) === (searchResult === null || searchResult === void 0 ? void 0 : searchResult.groupLabel)
      })
  }

  return /* #__PURE__ */React.createElement(StyledContainer, {
    component: 'div',
    sx: {
      overflowY: 'auto',
      height: (options === null || options === void 0 ? void 0 : options.height) || 540,
      maxHeight: (options === null || options === void 0 ? void 0 : options.maxHeight) || 540
    }
  }, /* #__PURE__ */React.createElement(Timeline, {
    position: 'alternate'
  }, (_fileredEvents2 = fileredEvents) === null || _fileredEvents2 === void 0 ? void 0 : _fileredEvents2.map(function (task, index) {
    return /* #__PURE__ */React.createElement(TimelineItem, {
      key: 'timeline-'.concat(index),
      sx: {
        cursor: 'pointer'
      },
      onClick: function onClick (event) {
        return handleTaskClick(event, task)
      }
    }, /* #__PURE__ */React.createElement(TimelineOppositeContent, {
      sx: {
        m: 'auto 0'
      },
      align: 'right',
      variant: 'body2',
      color: 'text.secondary'
    }, (task === null || task === void 0 ? void 0 : task.date) && format(parse(task === null || task === void 0 ? void 0 : task.date, 'yyyy-MM-dd', new Date()), 'PPP', {
      locale: dateFnsLocale
    }), /* #__PURE__ */React.createElement('br', null), /* #__PURE__ */React.createElement(Typography, {
      variant: 'caption'
    }, task === null || task === void 0 ? void 0 : task.startHour, ' - ', task === null || task === void 0 ? void 0 : task.endHour)), /* #__PURE__ */React.createElement(TimelineSeparator, null, /* #__PURE__ */React.createElement(TimelineConnector, null), /* #__PURE__ */React.createElement(TimelineDot, {
      color: 'secondary',
      sx: {
        backgroundColor: task === null || task === void 0 ? void 0 : task.color
      }
    }, (task === null || task === void 0 ? void 0 : task.icon) || /* #__PURE__ */React.createElement(ScheduleIcon, null)), /* #__PURE__ */React.createElement(TimelineConnector, null)), /* #__PURE__ */React.createElement(TimelineContent, {
      sx: {
        py: '12px',
        px: 2
      }
    }, /* #__PURE__ */React.createElement(Typography, {
      variant: 'body1',
      component: 'span'
    }, task === null || task === void 0 ? void 0 : task.label), /* #__PURE__ */React.createElement(Typography, null, task === null || task === void 0 ? void 0 : task.groupLabel)))
  })))
}

TimeLineModeView.propTypes = {
  events: PropTypes.array,
  columns: PropTypes.array,
  rows: PropTypes.array,
  date: PropTypes.string,
  options: PropTypes.object,
  searchResult: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onCellClick: PropTypes.func.isRequired,
  onEventsChange: PropTypes.func.isRequired
}
TimeLineModeView.defaultProps = {}

function ownKeys (object, enumerableOnly) { const keys = Object.keys(object); if (Object.getOwnPropertySymbols) { let symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable })), keys.push.apply(keys, symbols) } return keys }

function _objectSpread (target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)) }) } return target }
/**
 * @name Scheduler
 * @description
 * @param props
 * @constructor
 */

function Scheduler (props) {
  const events = props.events
  const locale = props.locale
  const options = props.options
  const alertProps = props.alertProps
  const onCellClick = props.onCellClick
  const legacyStyle = props.legacyStyle
  const onTaskClick = props.onTaskClick
  const toolbarProps = props.toolbarProps
  const onEventsChange = props.onEventsChange
  const onAlertCloseButtonClicked = props.onAlertCloseButtonClicked
  const today = new Date()
  useTheme()

  const _useTranslation = useTranslation(['common'])
  const t = _useTranslation.t
  const i18n = _useTranslation.i18n

  const weeks = [t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat'), t('sun')]

  const _useState = useState({})
  const _useState2 = _slicedToArray(_useState, 2)
  const state = _useState2[0]
  const setState = _useState2[1]

  const _useState3 = useState()
  const _useState4 = _slicedToArray(_useState3, 2)
  const searchResult = _useState4[0]
  const setSearchResult = _useState4[1]

  const _useState5 = useState(today)
  const _useState6 = _slicedToArray(_useState5, 2)
  const selectedDay = _useState6[0]
  const setSelectedDay = _useState6[1]

  const _useState7 = useState(alertProps)
  const _useState8 = _slicedToArray(_useState7, 2)
  const alertState = _useState8[0]
  const setAlertState = _useState8[1]

  const _useState9 = useState((options === null || options === void 0 ? void 0 : options.defaultMode) || 'month')
  const _useState10 = _slicedToArray(_useState9, 2)
  const mode = _useState10[0]
  const setMode = _useState10[1]

  const _useState11 = useState(getDaysInMonth(today))
  const _useState12 = _slicedToArray(_useState11, 2)
  const daysInMonth = _useState12[0]
  const setDaysInMonth = _useState12[1]

  const _useState13 = useState((options === null || options === void 0 ? void 0 : options.startWeekOn) || 'mon')
  const _useState14 = _slicedToArray(_useState13, 2)
  const startWeekOn = _useState14[0]
  const setStartWeekOn = _useState14[1]

  const _useState15 = useState(format(today, 'MMMM-yyyy'))
  const _useState16 = _slicedToArray(_useState15, 2)
  const selectedDate = _useState16[0]
  const setSelectedDate = _useState16[1]

  const _useReducer = useReducer(function (state) {
    let _options$startWeekOn

    if ((options === null || options === void 0 ? void 0 : (_options$startWeekOn = options.startWeekOn) === null || _options$startWeekOn === void 0 ? void 0 : _options$startWeekOn.toUpperCase()) === 'SUN') {
      return [t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')]
    }

    return weeks
  }, weeks)
  const _useReducer2 = _slicedToArray(_useReducer, 2)
  const weekDays = _useReducer2[0]
  const updateWeekDays = _useReducer2[1]

  const isDayMode = mode.toLowerCase() === 'day'
  const isWeekMode = mode.toLowerCase() === 'week'
  const isMonthMode = mode.toLowerCase() === 'month'
  const isTimelineMode = mode.toLowerCase() === 'timeline'
  const TransitionMode = (options === null || options === void 0 ? void 0 : options.transitionMode) === 'zoom' ? Zoom : (options === null || options === void 0 ? void 0 : options.transitionMode) === 'fade' ? Fade : Slide
  let dateFnsLocale = enAU

  if (locale === 'fr') {
    dateFnsLocale = fr
  }

  if (locale === 'ko') {
    dateFnsLocale = ko
  }

  if (locale === 'de') {
    dateFnsLocale = de
  }

  if (locale === 'es') {
    dateFnsLocale = es
  }

  if (locale === 'ar') {
    dateFnsLocale = ar
  }

  if (locale === 'ja') {
    dateFnsLocale = ja
  }

  if (locale === 'ru') {
    dateFnsLocale = ru
  }

  if (locale === 'zh') {
    dateFnsLocale = zhCN
  }
  /**
   * @name getMonthHeader
   * @description
   * @return {{headerClassName: string, headerAlign: string, headerName: string, field: string, flex: number, editable: boolean, id: string, sortable: boolean, align: string}[]}
   */

  const getMonthHeader = function getMonthHeader () {
    // if (startWeekOn?.toUpperCase() === 'SUN') {
    // weekDays[0] = t('sun')
    // weekDays[1] = t('mon')
    // }
    return weekDays.map(function (day, i) {
      return {
        id: 'row-day-header-'.concat(i + 1),
        flex: 1,
        sortable: false,
        editable: false,
        align: 'center',
        headerName: day,
        headerAlign: 'center',
        field: 'rowday'.concat(i + 1),
        headerClassName: 'scheduler-theme--header'
      }
    })
  }
  /**
   * @name getMonthRows
   * @description
   * @return {[id: string,  day: number, date: date, data: array]}
   */

  const getMonthRows = function getMonthRows () {
    let _lastRow$days

    const rows = []
    const daysBefore = []
    const iteration = getWeeksInMonth(selectedDay)
    const startOnSunday = (startWeekOn === null || startWeekOn === void 0 ? void 0 : startWeekOn.toUpperCase()) === 'SUN' && t('sun').toUpperCase() === weekDays[0].toUpperCase()
    const monthStartDate = startOfMonth(selectedDay) // First day of month

    const monthStartDay = getDay(monthStartDate) // Index of the day in week

    let dateDay = parseInt(format(monthStartDate, 'dd')) // Month start day
    // Condition check helper

    const checkCondition = function checkCondition (v) {
      return startOnSunday ? v <= monthStartDay : v < monthStartDay
    }

    if (monthStartDay >= 1) {
      const _loop = function _loop (i) {
        const subDate = sub(monthStartDate, {
          days: monthStartDay - i + (startOnSunday ? 1 : 0)
        })
        const day = parseInt(format(subDate, 'dd'))
        const data = events.filter(function (event) {
          return isSameDay(subDate, parse(event === null || event === void 0 ? void 0 : event.date, 'yyyy-MM-dd', new Date()))
        })
        daysBefore.push({
          id: 'day_-'.concat(day),
          day,
          date: subDate,
          data
        })
      }

      // Add days of precedent month
      // If Sunday is the first day of week, apply b <= monthStartDay
      // and days: (monthStartDay-b) + 1
      for (let i = 1; checkCondition(i); i++) {
        _loop(i)
      }
    } else if (!startOnSunday) {
      const _loop2 = function _loop2 (_i) {
        const subDate = sub(monthStartDate, {
          days: _i
        })
        const day = parseInt(format(subDate, 'dd'))
        const data = events.filter(function (event) {
          return isSameDay(subDate, parse(event === null || event === void 0 ? void 0 : event.date, 'yyyy-MM-dd', new Date()))
        })
        daysBefore.push({
          id: 'day_-'.concat(day),
          day,
          date: subDate,
          data
        })
      }

      for (let _i = 6; _i > 0; _i--) {
        _loop2(_i)
      }
    }

    if (daysBefore.length > 0) {
      rows.push({
        id: 0,
        days: daysBefore
      })
    } // Add days and events data

    for (let _i2 = 0; _i2 < iteration; _i2++) {
      var obj = []

      const _loop3 = function _loop3 (j) {
        const date = parse(''.concat(dateDay, '-').concat(selectedDate), 'dd-MMMM-yyyy', new Date())
        const data = events.filter(function (event) {
          return isSameDay(date, parse(event === null || event === void 0 ? void 0 : event.date, 'yyyy-MM-dd', new Date()))
        })
        obj.push({
          id: 'day_-'.concat(dateDay),
          date,
          data,
          day: dateDay
        })
        dateDay++
      }

      for (let j = 0; // This condition ensure that days will not exceed 31
        // i === 0 ? 7 - daysBefore?.length means that we substract inserted days
        // in the first line to 7
        j < (_i2 === 0 ? 7 - daysBefore.length : 7) && dateDay <= daysInMonth; j++) {
        _loop3(j)
      }

      if (_i2 === 0 && daysBefore.length > 0) {
        rows[0].days = rows[0].days.concat(obj)
        continue
      }

      if (obj.length > 0) {
        rows.push({
          id: _i2,
          days: obj
        })
      }
    } // Check if last row is not fully filled

    const lastRow = rows[iteration - 1]
    const lastRowDaysdiff = 7 - (lastRow === null || lastRow === void 0 ? void 0 : (_lastRow$days = lastRow.days) === null || _lastRow$days === void 0 ? void 0 : _lastRow$days.length)
    const lastDaysData = []

    if (lastRowDaysdiff > 0) {
      (function () {
        let _lastRow$days2

        const day = lastRow.days[(lastRow === null || lastRow === void 0 ? void 0 : (_lastRow$days2 = lastRow.days) === null || _lastRow$days2 === void 0 ? void 0 : _lastRow$days2.length) - 1]
        let addDate = day.date

        for (let _i3 = dateDay; _i3 < dateDay + lastRowDaysdiff; _i3++) {
          addDate = add(addDate, {
            days: 1
          })
          const d = format(addDate, 'dd') // eslint-disable-next-line

          const data = events.filter(function (event) {
            return isSameDay(addDate, parse(event === null || event === void 0 ? void 0 : event.date, 'yyyy-MM-dd', new Date()))
          })
          lastDaysData.push({
            id: 'day_-'.concat(d),
            date: addDate,
            day: d,
            data
          })
        }

        rows[iteration - 1].days = rows[iteration - 1].days.concat(lastDaysData)
      })()
    }

    return rows
  }
  /**
   * @name getWeekHeader
   * @description
   * @return {{headerClassName: string, headerAlign: string, headerName: string, field: string, flex: number, editable: boolean, id: string, sortable: boolean, align: string}[]}
   */

  const getWeekHeader = function getWeekHeader () {
    const data = []
    const weekStart = startOfWeek(selectedDay, {
      weekStartsOn: startWeekOn === 'mon' ? 1 : 0
    })

    for (let i = 0; i < 7; i++) {
      const date = add(weekStart, {
        days: i
      })
      data.push({
        date,
        weekDay: format(date, 'iii', {
          locale: dateFnsLocale
        }),
        day: format(date, 'dd', {
          locale: dateFnsLocale
        }),
        month: format(date, 'MM', {
          locale: dateFnsLocale
        })
      })
    }

    return data
  }

  const getWeekRows = function getWeekRows () {
    const HOURS = 24 //* 2

    const data = []
    let dayStartHour = startOfDay(selectedDay)

    const _loop4 = function _loop4 (i) {
      const id = 'line_'.concat(i)
      const label = format(dayStartHour, 'HH:mm aaa') // TODO Add everyday event capability
      // if (i === 0) {
      // id = `line_everyday`; label = 'Everyday'
      // }
      // TODO Place the processing bloc here if everyday capability is available
      // ...

      if (i > 0) {
        // Start processing bloc
        const obj = {
          id,
          label,
          days: []
        }
        const columns = getWeekHeader() // eslint-disable-next-line

        columns.map(function (column, index) {
          const data = events.filter(function (event) {
            let _event$startHour

            const eventDate = parse(event === null || event === void 0 ? void 0 : event.date, 'yyyy-MM-dd', new Date())
            return isSameDay(column === null || column === void 0 ? void 0 : column.date, eventDate) && (event === null || event === void 0 ? void 0 : (_event$startHour = event.startHour) === null || _event$startHour === void 0 ? void 0 : _event$startHour.toUpperCase()) === (label === null || label === void 0 ? void 0 : label.toUpperCase())
          })
          obj.days.push({
            id: 'column-'.concat(index, '_m-').concat(column.month, '_d-').concat(column.day, '_').concat(id),
            date: column === null || column === void 0 ? void 0 : column.date,
            data
          })
        }) // Label affectation

        data.push(obj) // End processing bloc

        dayStartHour = add(dayStartHour, {
          minutes: 60
        }) // 30
      } // if (i > 0) {
      //  dayStartHour = add(dayStartHour, {minutes: 30})
      // }
    }

    for (let i = 0; i <= HOURS; i++) {
      _loop4(i)
    }

    return data
  }

  const getDayHeader = function getDayHeader () {
    return [{
      date: selectedDay,
      weekDay: format(selectedDay, 'iii', {
        locale: dateFnsLocale
      }),
      day: format(selectedDay, 'dd', {
        locale: dateFnsLocale
      }),
      month: format(selectedDay, 'MM', {
        locale: dateFnsLocale
      })
    }]
  }

  const getDayRows = function getDayRows () {
    const HOURS = 24
    const data = []
    let dayStartHour = startOfDay(selectedDay)

    const _loop5 = function _loop5 (i) {
      const id = 'line_'.concat(i)
      const label = format(dayStartHour, 'HH:mm aaa')

      if (i > 0) {
        const obj = {
          id,
          label,
          days: []
        }
        const columns = getDayHeader()
        const column = columns[0]
        const matchedEvents = events.filter(function (event) {
          let _event$startHour2

          const eventDate = parse(event === null || event === void 0 ? void 0 : event.date, 'yyyy-MM-dd', new Date())
          return isSameDay(column === null || column === void 0 ? void 0 : column.date, eventDate) && (event === null || event === void 0 ? void 0 : (_event$startHour2 = event.startHour) === null || _event$startHour2 === void 0 ? void 0 : _event$startHour2.toUpperCase()) === (label === null || label === void 0 ? void 0 : label.toUpperCase())
        })
        obj.days.push({
          id: 'column-_m-'.concat(column === null || column === void 0 ? void 0 : column.month, '_d-').concat(column === null || column === void 0 ? void 0 : column.day, '_').concat(id),
          date: column === null || column === void 0 ? void 0 : column.date,
          data: matchedEvents
        })
        data.push(obj)
        dayStartHour = add(dayStartHour, {
          minutes: 60
        })
      }
    }

    for (let i = 0; i <= HOURS; i++) {
      _loop5(i)
    }

    return data
  }

  const getTimeLineRows = function getTimeLineRows () {
    return (// events.filter((event) => {
      // let eventDate = parse(event?.date, 'yyyy-MM-dd', new Date())
      // return isSameDay(selectedDay, eventDate)
      // })
      events
    )
  }
  /**
   * @name handleDateChange
   * @description
   * @param day
   * @param date
   * @return void
   */

  // eslint-disable-next-line space-before-function-paren
  const handleDateChange = function handleDateChange(day, date) {
    setDaysInMonth(day)
    setSelectedDay(date)
    setSelectedDate(format(date, 'MMMM-yyyy'))
  }
  /**
   * @name handleModeChange
   * @description
   * @param newMode
   * @return void
   */

  const handleModeChange = function handleModeChange (newMode) {
    setMode(newMode)
  }
  /**
   * @name onSearchResult
   * @description
   * @param item
   * @return void
   */

  const onSearchResult = function onSearchResult (item) {
    setSearchResult(item)
  }

  const handleEventsChange = /* #__PURE__ */(function () {
    const _ref = _asyncToGenerator(/* #__PURE__ */_regeneratorRuntime.mark(function _callee (item) {
      let eventIndex, oldObject
      return _regeneratorRuntime.wrap(function _callee$ (_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onEventsChange(item)
              eventIndex = events.findIndex(function (e) {
                return e.id === (item === null || item === void 0 ? void 0 : item.id)
              })

              if (eventIndex !== -1) {
                oldObject = Object.assign({}, events[eventIndex])

                if (alertState !== null && alertState !== void 0 && alertState.showNotification && !alertState.open) {
                  setAlertState(_objectSpread(_objectSpread({}, alertState), {}, {
                    open: true,
                    message: '\n            '.concat(item === null || item === void 0 ? void 0 : item.label, ' successfully moved from ').concat(oldObject === null || oldObject === void 0 ? void 0 : oldObject.date, '\n            ').concat(oldObject === null || oldObject === void 0 ? void 0 : oldObject.startHour, ' to ').concat(item === null || item === void 0 ? void 0 : item.date, ' ').concat(item === null || item === void 0 ? void 0 : item.startHour, '\n          ')
                  }))
                  setTimeout(function () {
                    setAlertState(_objectSpread(_objectSpread({}, alertState), {}, {
                      open: false,
                      message: ''
                    }))
                  }, alertState.delay)
                }
              }

            case 3:
            case 'end':
              return _context.stop()
          }
        }
      }, _callee)
    }))

    return function handleEventsChange (_x) {
      return _ref.apply(this, arguments)
    }
  }())

  useEffect(function () {
    if (isMonthMode) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        columns: getMonthHeader(),
        rows: getMonthRows()
      }))
    }

    if (isWeekMode) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        columns: getWeekHeader(),
        rows: getWeekRows()
      }))
    }

    if (isDayMode) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        columns: getDayHeader(),
        rows: getDayRows()
      }))
    }

    if (isTimelineMode) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        columns: getDayHeader(),
        rows: getTimeLineRows()
      }))
    } // eslint-disable-next-line
  }, [mode, weekDays, daysInMonth, selectedDay, selectedDate, dateFnsLocale, i18n.language, startWeekOn])
  useEffect(function () {
    if (locale !== i18n.language) {
      // localStorage.getItem('i18nextLng')
      localStorage.setItem('i18nextLng', locale.toLowerCase())
      i18n.changeLanguage(locale.toLowerCase())
      updateWeekDays()
    }
  }, [locale])
  useEffect(function () {
    if ((options === null || options === void 0 ? void 0 : options.defaultMode) !== mode) {
      setMode(options === null || options === void 0 ? void 0 : options.defaultMode)
    }
  }, [options === null || options === void 0 ? void 0 : options.defaultMode])
  useEffect(function () {
    if ((options === null || options === void 0 ? void 0 : options.startWeekOn) !== startWeekOn) {
      setStartWeekOn(options === null || options === void 0 ? void 0 : options.startWeekOn)
    }

    updateWeekDays()
  }, [options === null || options === void 0 ? void 0 : options.startWeekOn])
  return /* #__PURE__ */React.createElement(Paper, {
    variant: 'outlined',
    elevation: 0,
    sx: {
      p: 0
    }
  }, /* #__PURE__ */React.createElement(DateFnsLocaleContext.Provider, {
    value: dateFnsLocale
  }, /* #__PURE__ */React.createElement(SchedulerToolbar, {
    today,
    events,
    locale,
    switchMode: mode,
    alertProps: alertState,
    toolbarProps,
    onDateChange: handleDateChange,
    onModeChange: handleModeChange,
    onSearchResult,
    onAlertCloseButtonClicked
  }), /* #__PURE__ */React.createElement(Grid, {
    container: true,
    spacing: 0,
    alignItems: 'center',
    justifyContent: 'start'
  }, isMonthMode && /* #__PURE__ */React.createElement(TransitionMode, {
    in: true
  }, /* #__PURE__ */React.createElement(Grid, {
    item: true,
    xs: 12
  }, /* #__PURE__ */React.createElement(MonthModeView, {
    locale,
    options,
    date: selectedDate,
    rows: state === null || state === void 0 ? void 0 : state.rows,
    columns: state === null || state === void 0 ? void 0 : state.columns,
    legacyStyle,
    onTaskClick,
    onCellClick,
    searchResult,
    onDateChange: handleDateChange,
    onEventsChange: handleEventsChange
  }))), isWeekMode && /* #__PURE__ */React.createElement(TransitionMode, {
    in: true
  }, /* #__PURE__ */React.createElement(Grid, {
    item: true,
    xs: 12
  }, /* #__PURE__ */React.createElement(WeekModeView, {
    locale,
    events,
    options,
    date: selectedDate,
    rows: state === null || state === void 0 ? void 0 : state.rows,
    columns: state === null || state === void 0 ? void 0 : state.columns,
    onTaskClick,
    onCellClick,
    searchResult,
    onDateChange: handleDateChange,
    onEventsChange: handleEventsChange
  }))), isDayMode && /* #__PURE__ */React.createElement(TransitionMode, {
    in: true
  }, /* #__PURE__ */React.createElement(Grid, {
    item: true,
    xs: 12
  }, /* #__PURE__ */React.createElement(DayModeView, {
    locale,
    events,
    options,
    date: selectedDate,
    rows: state === null || state === void 0 ? void 0 : state.rows,
    columns: state === null || state === void 0 ? void 0 : state.columns,
    onTaskClick,
    onCellClick,
    searchResult,
    onDateChange: handleDateChange,
    onEventsChange: handleEventsChange
  })))), isTimelineMode && /* #__PURE__ */React.createElement(TransitionMode, {
    in: true
  }, /* #__PURE__ */React.createElement(Grid, {
    container: true,
    spacing: 2,
    alignItems: 'start'
  }, /* #__PURE__ */React.createElement(Grid, {
    item: true,
    xs: 12
  }, /* #__PURE__ */React.createElement(TimeLineModeView, {
    events,
    locale,
    options,
    date: selectedDate,
    rows: state === null || state === void 0 ? void 0 : state.rows,
    columns: state === null || state === void 0 ? void 0 : state.columns,
    onTaskClick,
    onCellClick,
    searchResult,
    onDateChange: handleDateChange,
    onEventsChange
  }))))))
}

Scheduler.propTypes = {
  events: PropTypes.array,
  options: PropTypes.object,
  alertProps: PropTypes.object,
  toolbarProps: PropTypes.object,
  onEventsChange: PropTypes.func,
  onCellClick: PropTypes.func,
  onTaskClick: PropTypes.func,
  onAlertCloseButtonClicked: PropTypes.func
}
Scheduler.defaultProps = {
  locale: 'en',
  legacyStyle: false
}

export default Scheduler
