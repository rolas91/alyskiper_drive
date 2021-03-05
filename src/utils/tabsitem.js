import { SceneMap } from "react-native-tab-view"
import PerfilUsuario from "../Screen/PerfilUsuario"
import PerfilVehiculo from '../Screen/PerfilVehiculo'

export const tabs = [
    {
        id: "tabsInfoUser",
        Pestanas: SceneMap({
            tab1:  PerfilUsuario,
            tab2: PerfilVehiculo
        })
    }
]