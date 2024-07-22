import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';


export const NAV_ITEMS_TYPES = {
    INFRASTRUCTURE: "Infrastructure",
    RESERVATIONS: "Reservations",
    SIMULATION: "Simulation",
    CHARGE_PLAN: "Charge Plan",
    SHOP: "Shop"
}

export const NAV_ITEMS = [
    {
        title: NAV_ITEMS_TYPES.INFRASTRUCTURE,
        icon: HomeIcon,
        route: "/app"
    },
    {
        title: NAV_ITEMS_TYPES.RESERVATIONS,
        icon: BarChartIcon,
        route: "/app/reservations"
    },
    {
        title: NAV_ITEMS_TYPES.SIMULATION,
        icon: SettingsOutlinedIcon,
        route: "/app/simulation"
    },
    {
        title: NAV_ITEMS_TYPES.CHARGE_PLAN,
        icon: LanguageOutlinedIcon,
        route: "/app/chargePlan",
    },
    {
        title: NAV_ITEMS_TYPES.SHOP,
        icon: ShoppingBasketIcon,
        route: "/app/shop",
    }
]