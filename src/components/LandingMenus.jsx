import { UilExchange } from '@iconscout/react-unicons'
import { UilFolderCheck } from '@iconscout/react-unicons'
import { UilBook } from '@iconscout/react-unicons'
import { UilSlidersV } from '@iconscout/react-unicons'

export const landingMenus = [
  {
    id: 0,
    title: "ORDER CONVERTER",
    path: "/oc-home",
    disabled: false,
    icon: <UilExchange/>
  },
  {
    id: 1,
    title: "ORDER MANAGER",
    path: "/oc-home",
    disabled: true,
    icon: <UilBook/>
  },
  {
    id: 2,
    title: "ORDER CONFIRMATION",
    path: "/orderConverter",
    disabled: true,
    icon: <UilFolderCheck/>
  },
  {
    id: 3,
    title: "SETUP",
    path: "/orderConverter",
    disabled: true,
    icon: <UilSlidersV/>
  },
]