import { UilExchange } from '@iconscout/react-unicons'
import { UilBook } from '@iconscout/react-unicons'
// import { UilSlidersV } from '@iconscout/react-unicons'
import { UilSignout } from '@iconscout/react-unicons'

export const landingMenus = [
  {
    id: 0,
    title: "ORDER CONVERTER",
    path: "/oc",
    disabled: false,
    icon: <UilExchange/>,
    navigate: false
  },
  {
    id: 1,
    title: "ORDER MANAGER",
    path: "/om",
    disabled: false,
    icon: <UilBook/>,
    navigate: false
  },
  // {
  //   id: 3,
  //   title: "SYSTEM CONFIGURATION",
  //   path: "/config",
  //   disabled: false,
  //   icon: <UilSlidersV/>,
  //   navigate: true
  // },
  {
    id: 4,
    title: "EXIT SYSTEM",
    path: "/auth",
    disabled: false,
    icon: <UilSignout/>,
    navigate: true,
    logout: true
  },
]