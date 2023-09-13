import { UilExchange } from '@iconscout/react-unicons'
import { UilBook } from '@iconscout/react-unicons'

export const configurationMenus = [
  {
    id: 0,
    title: "ORDER SOURCE",
    path: "/config/os",
    disabled: false,
    icon: <UilExchange/>
  },
  {
    id: 1,
    title: "SOURCE MAPPING",
    path: "/config/sm",
    disabled: false,
    icon: <UilBook/>
  },
]