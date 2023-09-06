import { UilExchange } from '@iconscout/react-unicons'
import { UilFolderCheck } from '@iconscout/react-unicons'
import { UilClipboardNotes } from '@iconscout/react-unicons'
import { UilSlidersV } from '@iconscout/react-unicons'
import { UilLabelAlt } from '@iconscout/react-unicons'
import { UilTruckLoading } from '@iconscout/react-unicons'

export const landingMenus = [
  {
    id: 1,
    title: "ORDER CONVERTER",
    path: "/oc-home",
    disabled: false,
    icon: <UilExchange/>
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
    title: "INVOICE FOLLOWUP",
    path: "/orderConverter",
    disabled: true,
    icon: <UilClipboardNotes/>
  },
  {
    id: 4,
    title: "PRICE LIST MANAGEMENT",
    path: "/orderConverter",
    disabled: true,
    icon: <UilLabelAlt/>
  },
  {
    id: 5,
    title: "INVENTORY MANAGEMENT",
    path: "/orderConverter",
    disabled: true,
    icon: <UilTruckLoading/>
  },
  {
    id: 6,
    title: "CONFIGURE SYSTEM",
    path: "/orderConverter",
    disabled: true,
    icon: <UilSlidersV/>
  }
]