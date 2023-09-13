import { UilExchange } from '@iconscout/react-unicons'
import { UilBook } from '@iconscout/react-unicons'
import { UilSlidersV } from '@iconscout/react-unicons'

export const landingMenus = [
  {
    id: 0,
    title: "ORDER CONVERTER",
    path: "/oc/home",
    disabled: false,
    icon: <UilExchange/>
  },
  {
    id: 1,
    title: "ORDER MANAGER",
    path: "/om/home",
    disabled: false,
    icon: <UilBook/>
  },
  {
    id: 3,
    title: "SYSTEM CONFIGURATION",
    path: "/config",
    disabled: false,
    icon: <UilSlidersV/>
  },
]