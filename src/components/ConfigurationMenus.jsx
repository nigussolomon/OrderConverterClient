import { UilBook } from "@iconscout/react-unicons";
import { UilDatabaseAlt } from '@iconscout/react-unicons'

export const configurationMenus = [
  {
    id: 1,
    title: "SOURCE MAPPING",
    path: "/config/sm",
    disabled: false,
    icon: <UilBook />,
  },
  {
    id: 2,
    title: "SETUP DATA",
    path: "/config/sd",
    disabled: false,
    icon: <UilDatabaseAlt />,
  },
];
